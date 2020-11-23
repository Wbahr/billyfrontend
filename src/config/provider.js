import React, { useState, useEffect, useRef } from 'react'
import Context from './context'
import { useLazyQuery, useMutation } from '@apollo/client'
import {
    UPDATE_CART, BEGIN_IMPERSONATION, END_IMPERSONATION, GET_TAXES, GET_ORDERS, GET_WEB_USER_CONTACTS, GET_INVOICES,
    GET_PURCHASE_HISTORY, GET_ITEM_PRICE, GET_ITEM_AVAILABILITY, GET_SHOPPING_LISTS, UPDATE_SHOPPING_LISTS, GET_PRICE_REASONS
} from './providerGQL'
import { getRidOf__typename, logout, distinct } from '../pageComponents/_common/helpers/generalHelperFunctions'

export default function Provider(props) {
    const didMountRef = useRef(false)
    const invoicesLoaded = useRef(false)
    const [shoppingCart, setShoppingCart] = useState([])
    const [orderNotes, setOrderNotes] = useState('')
    const [shoppingCartPricing, setShoppingCartPricing] = useState({ state: 'stable', subTotal: '--', tariff: '--' })
    const [userInfo, setUserInfo] = useState(null)
    const handleSetUserInfo = newUserInfo => setUserInfo(newUserInfo ? {
        ...newUserInfo,
        isAirlineUser: newUserInfo?.role === 'AirlineEmployee' || newUserInfo?.role === 'Impersonator'
    } : null);
    const [impersonatedCompanyInfo, setImpersonatedCompanyInfo] = useState(null)
    const [userType, setUserType] = useState({ current: null, previous: null })
    const [topAlert, setTopAlert] = useState({ show: false, message: '' })
    const [ordersCache, setOrdersCache] = useState([])
    const [invoiceCache, setInvoiceCache] = useState([])
    const [invoiceBatchNumber, setInvoiceBatchNumber] = useState(0)
    const [purchaseHistory, setPurchaseHistory] = useState([])
    const [itemPrices, setItemPrices] = useState([])
    const [itemAvailabilities, setItemAvailabilities] = useState([])
    const [shoppingLists, setShoppingLists] = useState([])
    const [webUserContacts, setWebUserContacts] = useState([])
    const [editPriceReasonCodes, setEditPriceReasonCodes] = useState([])
  
    const invoiceBatchSize = 1000
  
    useEffect(() => {
        if (!didMountRef.current) { // If page refreshed or first loaded, check to see if any tokens exist and update Context accordingly
            manageUserInfo('load-context')
            retrieveShoppingCart()
					  userInfo?.isAirlineUser && getPriceReasons()
        }
			  didMountRef.current = true
    })
  
    const [getPriceReasons] = useLazyQuery(GET_PRICE_REASONS, {
        fetchPolicy: 'no-cache',
        onCompleted: data => {
          setEditPriceReasonCodes(data.priceReasons.map(({__typename, ...rest}) => rest))
        }
    })

    const [startImpersonation] = useLazyQuery(BEGIN_IMPERSONATION, {
        fetchPolicy: 'no-cache',
        onCompleted: data => {
            let requestData = data.impersonationBegin
            if (requestData.success) {
                const { userInfo, impersonationUserInfo, token } = requestData.authorizationInfo
                localStorage.setItem('apiToken', token)
                manageUserInfo('begin-impersonation', userInfo, impersonationUserInfo)
                getOrders()
                retrieveShoppingCart()
                showTopAlert('You are now impersonating a customer')
                window.setTimeout(removeTopAlert, 2000)
            }
        }
    })

    const [cancelImpersonation] = useLazyQuery(END_IMPERSONATION, {
        fetchPolicy: 'no-cache',
        onCompleted: ({impersonationEnd: requestData}) => {
            if (requestData.success) {
                const { userInfo, impersonationUserInfo, token } = requestData.authorizationInfo
                localStorage.setItem('apiToken', token)
                manageUserInfo('end-impersonation', userInfo, impersonationUserInfo)
                retrieveShoppingCart('retrieve')
                props.history.push('/')
            } else {
                //setErrorMessage(requestData.message) //this function doesn't exist... why? what happened? when? such mystery.
            }
        }
    })

    const [updateTaxesApiCall] = useLazyQuery(GET_TAXES, {
        fetchPolicy: 'no-cache',
        onCompleted: data => {
            console.log('got taxes ->', data)
        }
    })
  
    const updateTaxes = (zipcode, shipToId) => {
			updateTaxesApiCall({
        variables: {
          anonymousCartToken: localStorage.getItem('shoppingCartToken'),
          shipToId: shipToId,
          zipcode: zipcode
        }
      })
    }

    const [getOrders, getOrdersState] = useLazyQuery(GET_ORDERS, {
        fetchPolicy: 'no-cache',
        onCompleted: data => {
            setOrdersCache(data.accountOrders)
        }
    })

    const [handleGetInvoices] = useLazyQuery(GET_INVOICES, {
        fetchPolicy: 'no-cache',
        onCompleted: data => {
            setInvoiceCache([...invoiceCache, ... data.accountInvoices])
            if ( data.accountInvoices.length >= invoiceBatchSize) {
                getInvoices()
            } else {
                invoicesLoaded.current = true
            }
        }
    })

    const [getPurchaseHistory, getPurchaseHistoryState] = useLazyQuery(GET_PURCHASE_HISTORY, {
        fetchPolicy: 'no-cache',
        onCompleted: data => {
            setPurchaseHistory(data.purchaseHistory)
        }
    })

    const [handleGetItemPrices] = useLazyQuery(GET_ITEM_PRICE, {
        fetchPolicy: 'no-cache',
        onCompleted: data => {
            setItemPrices([...data.getItemPrices, ...itemPrices].filter(distinct))
        }
    })

    const [handleGetItemAvailabilities] = useLazyQuery(GET_ITEM_AVAILABILITY, {
        fetchPolicy: 'no-cache',
        onCompleted: data => {
            setItemAvailabilities([...data.itemAvailability, ...itemAvailabilities].filter(distinct))
        }
    })

    function getItemPrices(items) {
        handleGetItemPrices({ variables: { items: items.map(({ invMastUid, frecno }) => ({ invMastUid: invMastUid || frecno, quantity: 1 })) } })
    }

    function getItemAvailabilities(items) {
        handleGetItemAvailabilities({ variables: { invMastUids: items.map(({ invMastUid, frecno }) => invMastUid || frecno) } })
    }

    const [getShoppingLists, getShoppingListsState] = useLazyQuery(GET_SHOPPING_LISTS, {
        fetchPolicy: 'no-cache',
        onCompleted: ({ shoppingList }) => {
            setShoppingLists(shoppingList.map(getRidOf__typename))
        }
    })

    const [handleUpdateShoppingList, upsertShoppingListState] = useMutation(UPDATE_SHOPPING_LISTS, {
        fetchPolicy: 'no-cache',
        onCompleted: ({shoppingListEdit}) => {
            const distinctShoppingLists = (list, idx, self) => self.findIndex(l => l.id === list.id) === idx
            if (shoppingListEdit.deleted) {
                const foundListIdx = shoppingLists.findIndex(list => list.id === shoppingListEdit.id)
                if (foundListIdx !== -1) {
                    const shoppingListCopy = shoppingLists.slice()
                    shoppingListCopy.splice(foundListIdx, 1)
                    setShoppingLists(shoppingListCopy)
                }
            } else {
                setShoppingLists([getRidOf__typename(shoppingListEdit), ...shoppingLists].filter(distinctShoppingLists))
            }
            return Promise.resolve(data)
        }
    })

    const upsertShoppingList = (shoppingList) => { // if shoppingList.id === null then this will insert otherwise it will update
        const items = shoppingList.items.map(({ itemCode, frecno, invMastUid, quantity, customerPartNumberId }) => (
          { itemCode, invMastUid: invMastUid || frecno, quantity, customerPartNumberId }
        ))
        return handleUpdateShoppingList({ variables: { shoppingList: { ...shoppingList, items } } })
    }

    const [getWebUserContacts, getWebUserContactsState] = useLazyQuery(GET_WEB_USER_CONTACTS, {
        fetchPolicy: 'no-cache',
        onCompleted: data => {
            setWebUserContacts(data.webUsers)
        }
    })

    function manageUserInfo(action, userInfo, impersonationInfo) {
        let currentUserType
        let userInfoStorage = localStorage.getItem('userInfo')
        let imperInfoStorage = localStorage.getItem('imperInfo')
        switch (action) {
            case 'load-context':
                handleSetUserInfo(JSON.parse(userInfoStorage))
                setImpersonatedCompanyInfo(JSON.parse(imperInfoStorage))
                if (!userInfoStorage) {
                    currentUserType = 'Anon'
                } else {
                    currentUserType = JSON.parse(userInfoStorage).role
                }
                break
            case 'begin-impersonation':
                localStorage.setItem('userInfo', JSON.stringify(userInfo))
                localStorage.setItem('imperInfo', JSON.stringify(impersonationInfo))
                localStorage.removeItem('shoppingCartToken')
                handleSetUserInfo(userInfo)
                if (userType.current === 'Impersonator') { //User switched companies they are impersonating
                    props.history.push('/')
                }
                setOrdersCache([])
                setInvoiceCache([])
                setInvoiceBatchNumber(0)
                setPurchaseHistory([])
                setShoppingLists([])
                setWebUserContacts([])
                setImpersonatedCompanyInfo(impersonationInfo)
                currentUserType = 'Impersonator'
                break
            case 'end-impersonation':
                localStorage.setItem('userInfo', JSON.stringify(userInfo))
                localStorage.removeItem('imperInfo')
                handleSetUserInfo(userInfo)
                setImpersonatedCompanyInfo(null)
                currentUserType = 'AirlineEmployee'
                setInvoiceCache([])
                setInvoiceBatchNumber(0)
                setOrdersCache([])
                setPurchaseHistory([])
                break
            case 'login':
                handleSetUserInfo(userInfo)
                currentUserType = userInfo.role
                break
            case 'logout':
                logout()
                handleSetUserInfo(null)
                setImpersonatedCompanyInfo(null)
                currentUserType = 'Anon'
                setOrdersCache([])
                setInvoiceCache([])
                setPurchaseHistory([])
                setInvoiceBatchNumber(0)
                break
        }
        setUserType({ current: currentUserType, previous: !userType.current ? 'Anon' : userType.current })
    }

    function removeTopAlert() {
        setTopAlert({
            show: false,
            message: ''
        })
    }
    
    function showTopAlert(message) {
        setTopAlert({ show: true, message })
    }

    function loginUser(userInfo, mergeToken) {
        if (shoppingCart.length > 0) {
            mergeShoppingCart(mergeToken)
        } else {
            retrieveShoppingCart('retrieve')
        }
        manageUserInfo('login', userInfo)
        let drift = drift || null;
        if (drift && userInfo.role === 'AirlineEmployee') {
            drift?.api?.widget?.hide();
        }
        getOrders()
			  showTopAlert('You have been successfully logged in.')
        window.setTimeout(removeTopAlert, 3000)
    }

    function logoutUser() {
        if (drift) { drift.api.widget.show(); }
        manageUserInfo('logout')
        props.history.push('/')
        emptyCart()
        showTopAlert('You have been logged out.')
        window.setTimeout(removeTopAlert, 3500)
    }
    
    const [shoppingCartApiCall] = useMutation(UPDATE_CART, {
        fetchPolicy: 'no-cache',
        onCompleted: data => {
            const result = data.shoppingCart
            if (result.action === 'merge' || result.action === 'retrieve') {
                localStorage.setItem('shoppingCartToken', result.token)
                let cartItems = result.cartItems
                cartItems.forEach(elem => delete elem.__typename)
                setShoppingCart(cartItems)
                setOrderNotes(result.orderNotes)
            }
            setShoppingCartPricing({ state: 'stable', subTotal: result.subtotal.toFixed(2), tariff: result.tariff.toFixed(2) })
        }
  })

    const addItem = (item) => updateShoppingCart([...shoppingCart, item])

    const addItems = (items) => updateShoppingCart([...shoppingCart, ...items])
  
    function removeItem(itemLocation) {
        const newCart = shoppingCart.slice()
			  newCart.splice(itemLocation, 1)
			  updateShoppingCart(newCart)
    }

    function moveItem(itemLocation, newLocation) {
        const newCart = shoppingCart.slice()
        const movedItem = newCart.splice(itemLocation, 1)
			  newCart.splice(newLocation, 0, movedItem[0])
			  updateShoppingCart(newCart)
    }

    function splitItem(index, lineCount, lineQuantity) {
        const splitItems = []
        for (let i = 0; i < lineCount; i++) {
            splitItems.push({
                frecno: shoppingCart[index].frecno,
                quantity: parseInt(lineQuantity),
                itemNotes: shoppingCart[index].itemNotes,
            })
        }
        const frontCart = shoppingCart.slice(0, index) // returns cart item before split item
        const backCart = shoppingCart.slice(index + 1) // returns cart item after split item
        updateShoppingCart([...frontCart, ...splitItems, ...backCart])
    }

    const updateCartItem = (index, newItem) => {
			  updateShoppingCart(shoppingCart.map((item, idx) => idx === index ? newItem : item))
    }
    
    const updateCartItemField = (index, field, value) => {
			  updateShoppingCart(shoppingCart.map((item, idx) => idx === index ? { ...item, [field]: value } : item))
    }
    
    const updateCartWrapper = cartInfo => {
			const shoppingCartToken = localStorage.getItem('shoppingCartToken')
			setShoppingCartPricing({ state: 'loading', subTotal: '--', tariff: '--' })
			shoppingCartApiCall({
				variables: {
					cartInfo: {
						token: shoppingCartToken,
            ...cartInfo
					}
				}
			})
    }
    
    const updateOrderNotes = newOrderNotes => {
        setOrderNotes(newOrderNotes)
			  updateCartWrapper({ actionString: 'update', orderNotes: newOrderNotes, cartItems: shoppingCart })
    }
    
    const updateShoppingCart = cartItems => {
        setShoppingCart(cartItems)
			  updateCartWrapper({ actionString: 'update', orderNotes, cartItems })
    }
    
    const saveShoppingCart = () => updateCartWrapper({ actionString: 'save' })
    
    const retrieveShoppingCart = () => updateCartWrapper({ actionString: 'retrieve' })
    
    const mergeShoppingCart = token => updateCartWrapper({ actionString: 'retrieve', token })

    const emptyCart = () => updateShoppingCart([])
    
    function getInvoices() {
        if (invoiceBatchNumber === 0) {
            invoicesLoaded.current = false
        }
        handleGetInvoices({
            variables: {
                batchNumber: invoiceBatchNumber,
                batchSize: invoiceBatchSize
            }
        })
        setInvoiceBatchNumber(invoiceBatchNumber + 1)
    }

    return (
        <Context.Provider
            value={{
                impersonatedCompanyInfo,
                startImpersonation: customerId => startImpersonation({ variables: { customerId } }),
                cancelImpersonation,
                topAlert,
                removeTopAlert,
                userInfo,
                loginUser,
                logoutUser,
                cart: shoppingCart,
                cartPricing: shoppingCartPricing,
                orderNotes,
                addItem,
                addItems,
                removeItem,
                moveItem,
                splitItem,
                emptyCart,
                saveShoppingCart,
                updateTaxes,
                updateOrderNotes,
                ordersCache,
                getOrders,
                getOrdersState,
                invoiceCache,
                getInvoices,
                invoicesLoaded: invoicesLoaded.current,
                purchaseHistory,
                getPurchaseHistoryState,
                itemPrices,
                itemAvailabilities,
                getPurchaseHistory,
                getItemPrices,
                getItemAvailabilities,
                getShoppingLists,
                getShoppingListsState,
                upsertShoppingList,
                upsertShoppingListState,
                shoppingLists,
                getWebUserContacts,
                getWebUserContactsState,
                webUserContacts,
                editPriceReasonCodes,
							  updateCartItem,
							  updateCartItemField
            }}
        >
            {props.children}
        </Context.Provider>
    )
}