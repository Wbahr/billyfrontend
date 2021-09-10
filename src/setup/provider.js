import React, { useState, useEffect, useRef } from 'react'
import Context from './context'
import { useLazyQuery, useMutation } from '@apollo/client'
import {
    UPDATE_CART,
    ADD_CATALOG_ITEM,
    BEGIN_IMPERSONATION,
    END_IMPERSONATION,
    GET_TAX_RATE,
    GET_ORDERS,
    GET_WEB_USER_CONTACTS,
    GET_INVOICES,
    GET_PURCHASE_HISTORY,
    GET_ITEM_PRICE,
    GET_ITEM_AVAILABILITY,
    GET_SHOPPING_LISTS,
    UPDATE_SHOPPING_LISTS,
    GET_PRICE_REASONS,
    GET_ITEMS_BY_ID,
    QUERY_STOCK_AVAILABILITY_BATCH
} from './providerGQL'
import {
    getRidOf__typename,
    logout,
    distinct,
    useDebounceValue
} from '../pageComponents/_common/helpers/generalHelperFunctions'
import { GET_ITEM_CUSTOMER_PART_NUMBERS, GET_ITEM_SOURCE_LOCATIONS } from './gqlQueries/gqlItemQueries'
import { AIRLINE_ENGINEER_USER, GUEST, IMPERSONATOR_USER, WEB_USER } from 'pageComponents/_common/constants/UserTypeConstants'

export default function Provider({ history, children }) {
    const didMountRef = useRef(false)
    const invoicesLoaded = useRef(false)
    const lastShoppingCartPayload = useRef(null)
    const [shoppingCart, setShoppingCart] = useState(null)
    const debouncedCart = useDebounceValue(shoppingCart, 1000)
    const [orderNotes, setOrderNotes] = useState('')
    const [shoppingCartPricing, setShoppingCartPricing] = useState({ state: 'stable', subTotal: '--', tariff: '--' })
    const [userInfo, setUserInfo] = useState(null)
    const handleSetUserInfo = newUserInfo => setUserInfo(newUserInfo ? {
        ...newUserInfo,
        isAirlineEmployee: newUserInfo?.role === AIRLINE_ENGINEER_USER || newUserInfo?.role === IMPERSONATOR_USER,
        isAirlineEngineerUser: newUserInfo?.role === AIRLINE_ENGINEER_USER,
        isImpersonatorUser: newUserInfo?.role === IMPERSONATOR_USER,
        isWebUser: newUserInfo?.role === WEB_USER
    } : null)
    const [impersonatedCompanyInfo, setImpersonatedCompanyInfo] = useState(null)
    const [userType, setUserType] = useState({ current: null, previous: null })
    const [topAlert, setTopAlert] = useState({ show: false, message: '' })
    const [ordersCache, setOrdersCache] = useState([])
    const [invoiceCache, setInvoiceCache] = useState([])
    const [invoiceBatchNumber, setInvoiceBatchNumber] = useState(0)
    const [purchaseHistory, setPurchaseHistory] = useState([])
    const [itemPrices, setItemPrices] = useState([])
    const [itemAvailabilities, setItemAvailabilities] = useState([])
    const [stockAvailabilities, setStockAvailabilities] = useState([])
    const [itemDetails, setItemDetails] = useState([])
    const [customerPartNumbers, setCustomerPartNumbers] = useState([])
    const [sourceLocations, setSourceLocations] = useState([])
    const [shoppingLists, setShoppingLists] = useState([])
    const [shoppingCartPayload, setShoppingCartPayload] = useState(null)
    const debouncedCartPayload = useDebounceValue(shoppingCartPayload)
    const [webUserContacts, setWebUserContacts] = useState([])
    const [editPriceReasonCodes, setEditPriceReasonCodes] = useState([])
    const [serviceParts, setServiceParts] = useState([])
    const [cartLoading, setCartLoading] = useState(false)
    const [showErrorModal, setShowErrorModal] = useState(false)
    const [passwordResetEmail, setPasswordResetEmail] = useState('')


    const invoiceBatchSize = 1000

    const navAwayRoutes = ['/cart', '/checkout', '/create-quote']
    const partialNavAwayRoutes = ['/account']
    const currentPath = history.location.pathname
    const resetOnImpersonate = navAwayRoutes.includes(currentPath) || partialNavAwayRoutes.some(route => currentPath.includes(route))

    useEffect(() => {
        if (!didMountRef.current) { // If page refreshed or first loaded, check to see if any tokens exist and update Context accordingly
            manageUserInfo('load-context')
            retrieveShoppingCart()
        }
        didMountRef.current = true
    })

    useEffect(() => {
        setCartLoading(true)
        setTimeout(() => setCartLoading(false), 1200)
    }, [shoppingCart])

    useEffect(() => {
        userInfo?.isAirlineEmployee && getPriceReasons()
    }, [userInfo])

    const [getPriceReasons] = useLazyQuery(GET_PRICE_REASONS, {
        fetchPolicy: 'no-cache',
        onCompleted: data => {
            setEditPriceReasonCodes(data.priceReasons.map(({ __typename, ...rest }) => rest))
        }
    })

    const [startImpersonation] = useLazyQuery(BEGIN_IMPERSONATION, {
        fetchPolicy: 'no-cache',
        onCompleted: data => {
            const requestData = data.impersonationBegin
            if (requestData.success) {
                const { userInfo, impersonationUserInfo, token, refreshToken } = requestData.authorizationInfo
                localStorage.setItem('apiToken', token)
                localStorage.setItem('refreshToken', refreshToken)
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
        onCompleted: ({ impersonationEnd: requestData }) => {
            if (requestData.success) {
                const { userInfo, impersonationUserInfo, token, refreshToken } = requestData.authorizationInfo
                localStorage.setItem('apiToken', token)
                localStorage.setItem('refreshToken', refreshToken)
                manageUserInfo('end-impersonation', userInfo, impersonationUserInfo)
                retrieveShoppingCart('retrieve')
                if (resetOnImpersonate) history.push('/')
            }
        }
    })

    const [updateTaxesApiCall] = useLazyQuery(GET_TAX_RATE, {
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
            if (data.accountInvoices.length >= invoiceBatchSize) {
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

    const [handleGetItemDetails] = useLazyQuery(GET_ITEMS_BY_ID, {
        fetchPolicy: 'no-cache',
        onCompleted: data => {
            setItemDetails([...data.itemDetailsBatch, ...itemDetails].filter(distinct))
        }
    })

    const [handleGetCustomerPartNumbers] = useLazyQuery(GET_ITEM_CUSTOMER_PART_NUMBERS, {
        fetchPolicy: 'no-cache',
        onCompleted: data => {
            setCustomerPartNumbers([...data.customerPartNumbersBatch, ...customerPartNumbers].filter(distinct))
        }
    })

    const [handleGetSourceLocations] = useLazyQuery(GET_ITEM_SOURCE_LOCATIONS, {
        fetchPolicy: 'no-cache',
        onCompleted: data => {
            setSourceLocations([...data.sourceLocations, ...sourceLocations].filter(distinct))
        }
    })

    const [handleGetStocks, { variables: stockVariables }] = useLazyQuery(QUERY_STOCK_AVAILABILITY_BATCH, {
        fetchPolicy: 'no-cache',
        onCompleted: data => {
            const airlineStockRecords = data.airlineStockBatch
            const factoryStockRecords = data.factoryStockBatch

            const stockInfoRecords = stockVariables.invMastUids.map(invMastUid => {
                return {
                    invMastUid: invMastUid,
                    airlineStock: airlineStockRecords?.filter(airlineStock => airlineStock.invMastUid === invMastUid) || [],
                    factoryStock: factoryStockRecords?.find(factoryStock => factoryStock.invMastUid === invMastUid) || null
                }
            })

            const duplicateInvMasUids = (sa, i, self) => self.findIndex(s => s.invMastUid === sa.invMastUid) === i
            const newStockRecords = [...stockInfoRecords, ...stockAvailabilities].filter(duplicateInvMasUids)

            setStockAvailabilities(newStockRecords)
        }
    })

    function getItemPrices(items) {
        handleGetItemPrices({ variables: { items: items.map(({ invMastUid, quantity }) => ({
            invMastUid: invMastUid,
            quantity: quantity !== null && quantity !== undefined ? quantity : 1
        })) } })
    }

    function getItemAvailabilities(items) {
        handleGetItemAvailabilities({ variables: { invMastUids: items.map(({ invMastUid }) => invMastUid ) } })
    }

    function getItemDetails(items) {
        handleGetItemDetails({ variables: { invMastUids: items.map(({ invMastUid }) => invMastUid ) } })
    }

    function getCustomerPartNumbers(items) {
        handleGetCustomerPartNumbers({ variables: { invMastUids: items.map(({ invMastUid }) => invMastUid ) } })
    }

    function getSourceLocations(items) {
        handleGetSourceLocations({ variables: { invMastUids: items.map(({ invMastUid }) => invMastUid ) } })
    }

    function getStocks(items) {
        handleGetStocks({ variables: { invMastUids: items.map(({ invMastUid }) => invMastUid ) } })
    }

    const addCustomerPartNumber = newCustomerPartNumber => {
        setCustomerPartNumbers([...customerPartNumbers, newCustomerPartNumber])
    }

    const [getShoppingLists, getShoppingListsState] = useLazyQuery(GET_SHOPPING_LISTS, {
        fetchPolicy: 'no-cache',
        onCompleted: ({ shoppingList }) => {
            setShoppingLists(shoppingList.map(getRidOf__typename))
        }
    })

    const [handleUpdateShoppingList, upsertShoppingListState] = useMutation(UPDATE_SHOPPING_LISTS, {
        fetchPolicy: 'no-cache',
        onCompleted: ({ shoppingListEdit }) => {
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
            return Promise.resolve()
        }
    })

    const upsertShoppingList = (shoppingList) => { // if shoppingList.id === null then this will insert otherwise it will update
        const items = shoppingList.shoppingListItems.map(({ invMastUid, quantity, customerPartNumberId }) => (
            { invMastUid, quantity, customerPartNumberId }
        ))
        return handleUpdateShoppingList({ variables: { shoppingList: { ...shoppingList, shoppingListItems: items } } })
    }

    const [getWebUserContacts, getWebUserContactsState] = useLazyQuery(GET_WEB_USER_CONTACTS, {
        fetchPolicy: 'no-cache',
        onCompleted: data => {
            setWebUserContacts(data.webUsers)
        }
    })

    function manageUserInfo(action, userInfo, impersonationInfo) {
        let currentUserType
        const userInfoStorage = localStorage.getItem('userInfo')
        const imperInfoStorage = localStorage.getItem('imperInfo')
        switch (action) {
        case 'load-context':
            handleSetUserInfo(JSON.parse(userInfoStorage))
            setImpersonatedCompanyInfo(JSON.parse(imperInfoStorage))
            if (!userInfoStorage) {
                currentUserType = GUEST
            } else {
                currentUserType = JSON.parse(userInfoStorage).role
            }
            break
        case 'begin-impersonation':
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
            localStorage.setItem('imperInfo', JSON.stringify(impersonationInfo))
            localStorage.removeItem('shoppingCartToken')
            handleSetUserInfo(userInfo)
            if (resetOnImpersonate) history.push('/')
            setShoppingCart(null)
            setOrdersCache([])
            setInvoiceCache([])
            setInvoiceBatchNumber(0)
            setPurchaseHistory([])
            setShoppingLists([])
            setWebUserContacts([])
            setItemPrices([])
            setCustomerPartNumbers([])
            setImpersonatedCompanyInfo(impersonationInfo)
            currentUserType = IMPERSONATOR_USER
            break
        case 'end-impersonation':
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
            localStorage.removeItem('imperInfo')
            handleSetUserInfo(userInfo)
            setImpersonatedCompanyInfo(null)
            setShoppingCart(null)
            currentUserType = AIRLINE_ENGINEER_USER
            setInvoiceCache([])
            setInvoiceBatchNumber(0)
            setOrdersCache([])
            setPurchaseHistory([])
            setCustomerPartNumbers([])
            setItemPrices([])
            break
        case 'login':
            handleSetUserInfo(userInfo)
            currentUserType = userInfo.role
            break
        case 'logout':
            logout()
            handleSetUserInfo(null)
            setImpersonatedCompanyInfo(null)
            setShoppingCart(null)
            currentUserType = GUEST
            setOrdersCache([])
            setInvoiceCache([])
            setPurchaseHistory([])
            setInvoiceBatchNumber(0)
            setItemPrices([])
            setCustomerPartNumbers([])
            break
        }
        setUserType({ current: currentUserType, previous: !userType.current ? GUEST : userType.current })
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
        if (shoppingCart?.length > 0) {
            mergeShoppingCart(mergeToken)
        } else {
            retrieveShoppingCart('retrieve')
        }
        manageUserInfo('login', userInfo)
        const drift = window.drift || null
        if (drift && userInfo.role === AIRLINE_ENGINEER_USER) {
            drift?.api?.widget?.hide()
        }
        getOrders()
        showTopAlert('You have been successfully logged in.')
        window.setTimeout(removeTopAlert, 3000)
    }

    function logoutUser() {
        if (window.drift?.api) window.drift.api.widget.show()
        manageUserInfo('logout')
        history.push('/')
        emptyCart()
        showTopAlert('You have been logged out.')
        window.setTimeout(removeTopAlert, 3500)
    }

    const [shoppingCartApiCall] = useMutation(UPDATE_CART, {
        fetchPolicy: 'no-cache',
        onError: (error) => {
            setShowErrorModal(true)
        },
        onCompleted: ({ shoppingCart: { token, action, cartItems, subtotal, tariff, orderNotes } }) => {
            if (action === 'merge' || action === 'retrieve' || action === 'update') {
                const lastCartItems = lastShoppingCartPayload.current

                const cartsMatch = lastCartItems && cartItems.length === lastCartItems.length

                const shouldUpdateState = shoppingCart === null || !lastCartItems || cartsMatch
                    && !cartItems.find((item, idx) => item.invMastUid !== lastCartItems[idx]?.invMastUid)
                
                if (shouldUpdateState) {
                    localStorage.setItem('shoppingCartToken', token)
                    setShoppingCart(cartItems.map(({ __typename, ...rest }) => rest))
                    setOrderNotes(orderNotes)
                    setShoppingCartPricing({ state: 'stable', subTotal: subtotal.toFixed(2), tariff: tariff.toFixed(2) })
                }
            }
        }
    })

    const [addCatalogItemApiCall] = useMutation(ADD_CATALOG_ITEM, {
        fetchPolicy: 'no-cache',
        onCompleted: ({ shoppingCartAddCatalogItem: { token, cartItems, subtotal, tariff, orderNotes } }) => {
            localStorage.setItem('shoppingCartToken', token)
            setShoppingCart(cartItems.map(({ __typename, ...rest }) => rest))
            setOrderNotes(orderNotes)
            setShoppingCartPricing({ state: 'stable', subTotal: subtotal.toFixed(2), tariff: tariff.toFixed(2) })
        }
    })
    
    useEffect(() => {
        if (debouncedCartPayload) shoppingCartApiCall(debouncedCartPayload)
    }, [debouncedCartPayload])

    const updateShoppingCart = (cartItems, notes=orderNotes) => {
        setShoppingCart(cartItems) //Needed, or quick cart adds will lose items
        setOrderNotes(notes)
        lastShoppingCartPayload.current = cartItems
        updateCartWrapper({ actionString: 'update', orderNotes: notes, cartItems })
    }

    const updateCartWrapper = cartInfo => {
        const shoppingCartToken = localStorage.getItem('shoppingCartToken')
        setShoppingCartPricing({ state: 'loading', subTotal: '--', tariff: '--' })
        setShoppingCartPayload({
            variables: {
                cartInfo: {
                    token: shoppingCartToken,
                    ...cartInfo
                }
            }
        })
    }

    const addItem = (item) => {
        updateShoppingCart([...shoppingCart, item])
    }

    const addItems = (items) => {
        updateShoppingCart([...shoppingCart, ...items])
    }

    const addCatalogItem = ({ itemCatalogUid, quantity }) => {
        const shoppingCartToken = localStorage.getItem('shoppingCartToken')
        setShoppingCartPricing({ state: 'loading', subTotal: '--', tariff: '--' })
        addCatalogItemApiCall({
            variables: {
                catalogItem: {
                    token: shoppingCartToken,
                    itemCatalogUid: itemCatalogUid,
                    quantity: quantity
                }
            }
        })
    }

    function removeItem(itemLocation) {
        const newCart = shoppingCart?.slice() || []
        newCart.splice(itemLocation, 1)
        updateShoppingCart(newCart)
    }

    function moveItem(itemLocation, newLocation) {
        const newCart = shoppingCart.slice() || []
        const movedItem = newCart.splice(itemLocation, 1)
        newCart.splice(newLocation, 0, movedItem[0])
        updateShoppingCart(newCart)
    }

    function splitItem(index, lineCount, lineQuantity) {
        const splitItems = []
        for (let i = 0; i < lineCount; i++) {
            splitItems.push({
                invMastUid: shoppingCart[index].invMastUid,
                quantity: parseInt(lineQuantity),
                itemNotes: shoppingCart[index].itemNotes,
            })
        }
        const frontCart = shoppingCart?.slice(0, index) || [] // returns cart item before split item
        const backCart = shoppingCart?.slice(index + 1) || [] // returns cart item after split item
        updateShoppingCart([...frontCart, ...splitItems, ...backCart])
    }

    const updateCartItem = (index, newItem) => {
        updateShoppingCart(shoppingCart?.map((item, idx) => idx === index ? newItem : item))
    }

    const updateCartItemField = (index, field, value) => {
        updateShoppingCart(shoppingCart?.map((item, idx) => idx === index ? { ...item, [field]: value } : item))
    }

    const updateOrderNotes = newOrderNotes => {
        setOrderNotes(newOrderNotes)
        updateCartWrapper({ actionString: 'update', orderNotes: newOrderNotes, cartItems: shoppingCart })
    }

    const saveShoppingCart = () => {
        updateCartWrapper({ actionString: 'save' })
    }

    const retrieveShoppingCart = () => {
        lastShoppingCartPayload.current = null
        updateCartWrapper({ actionString: 'retrieve' })
    }

    const mergeShoppingCart = token => {
        lastShoppingCartPayload.current = null
        updateCartWrapper({ actionString: 'merge', token })
    }

    const emptyCart = () => {
        updateShoppingCart(null, '')
    }

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

    function addServicePart(part) {
        setServiceParts({ ...serviceParts, part })
    }

    function removeServicePart(index) {
        setServiceParts(serviceParts?.filter((item, idx) => idx !== index))
    }

    const updateServicePartField = (index, field, value) => {
        setServiceParts(serviceParts?.map((item, idx) => idx === index ? { ...item, [field]: value } : item))
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
                cart: debouncedCart,
                cartPricing: shoppingCartPricing,
                orderNotes,
                addItem,
                addItems,
                addCatalogItem,
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
                stockAvailabilities,
                setStockAvailabilities,
                itemDetails,
                customerPartNumbers,
                sourceLocations,
                getPurchaseHistory,
                getItemPrices,
                setItemPrices,
                getItemAvailabilities,
                getStocks,
                getItemDetails,
                getCustomerPartNumbers,
                addCustomerPartNumber,
                getSourceLocations,
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
                updateCartItemField,
                updateShoppingCart,
                serviceParts,
                addServicePart,
                updateServicePartField,
                removeServicePart,
                cartLoading,
                showErrorModal,
                setShowErrorModal,
                passwordResetEmail,
                setPasswordResetEmail
            }}
        >
            {children}
        </Context.Provider>
    )
}
