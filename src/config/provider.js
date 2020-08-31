import React, { useState, useEffect, useRef } from 'react'
import _ from 'lodash'
import {timeoutCollection} from 'time-events-manager'
import Context from './context'
import { useLazyQuery, useMutation } from '@apollo/client'
import {
	UPDATE_CART, BEGIN_IMPERSONATION, END_IMPERSONATION, GET_TAXES, GET_ITEM_BY_ID, GET_ITEMS_BY_ID, GET_ORDERS, GET_WEB_USER_CONTACTS,
	GET_INVOICES, GET_PURCHASE_HISTORY, GET_ITEM_PRICE, GET_ITEM_AVAILABILITY, GET_SHOPPING_LISTS, UPDATE_SHOPPING_LISTS
} from './providerGQL'
import {getRidOf__typename} from '../pageComponents/_common/helpers/generalHelperFunctions'

export default function Provider(props) {
	const didMountRef = useRef(false)
	const justLoadedCart = useRef(false)
	const invoicesLoaded = useRef(false)
	const [shoppingCart, setShoppingCart] = useState([])
	const [itemDetailCache, setItemDetailCache] = useState([])
	const [orderNotes, setOrderNotes] = useState('')
	const [shoppingCartPricing, setShoppingCartPricing] = useState({'state': 'stable','subTotal': '--', 'tariff': '--'})
	const [userInfo, setUserInfo] = useState(null)
	const [impersonatedCompanyInfo, setImpersonatedCompanyInfo] = useState(null)
	const [userType, setUserType] = useState({'current': null, 'previous': null})
	const [topAlert, setTopAlert] = useState({'show': false, 'message': ''})
	const [timeoutId, setTimeoutId] = useState(null)
	const [ordersCache, setOrdersCache] = useState([])
	const [invoiceCache, setInvoiceCache] = useState([])
	const [invoiceBatchNumber, setInvoiceBatchNumber] = useState(0)
	const [purchaseHistory, setPurchaseHistory] = useState([])
	const [itemPrices, setItemPrices] = useState([])
	const [itemAvailabilities, setItemAvailabilities] = useState([])
	const [shoppingLists, setShoppingLists] = useState([])
	const [webUserContacts, setWebUserContacts] = useState([])
	const invoiceBatchSize = 1000
	useEffect(() => {
		if (!didMountRef.current) { // If page refreshed or first loaded, check to see if any tokens exist and update Context accordingly
			manageUserInfo('load-context')
			handleShoppingCart('retrieve')
		}
	})
	
	useEffect(() => { // Update cart in database if shoppingCart or orderNotes changes
		if(didMountRef.current){
			if(!justLoadedCart.current){
				setShoppingCartPricing({'state': 'loading', 'subTotal': '--', 'tariff': '--'})
				let currentTimeoutId
				if(_.isNil(timeoutId)){
					currentTimeoutId = window.setTimeout(()=>{handleShoppingCart('update')}, 500)
				} else {
					timeoutCollection.remove(timeoutId)
					currentTimeoutId = window.setTimeout(()=>{handleShoppingCart('update')}, 800)
				}
				setTimeoutId(currentTimeoutId)
			}
			justLoadedCart.current = false
		}
		didMountRef.current = true
	},[shoppingCart, orderNotes])
	
	const [updateCart] = useMutation(UPDATE_CART, {
		fetchPolicy: 'no-cache',
		onCompleted: data => {
			let result = data.shoppingCart
			if (result.action === 'merge' || result.action === 'retrieve') {
				localStorage.setItem('shoppingCartToken', result.token)
				let cartItems = result.cartItems
				cartItems.forEach(elem => delete elem.__typename)
				setShoppingCart(cartItems)
				setOrderNotes(result.orderNotes)
				if (result.action === 'retrieve' && cartItems.length > 0) { // If the cart was existing, populate cartDisplay
					let cartFrecnos = []
					cartItems.forEach(elem => cartFrecnos.push(elem.frecno))
					getMultiItemData({variables: {'invMastUids': cartFrecnos}})
				}
			}
			setShoppingCartPricing({'state': 'stable', 'subTotal': result.subtotal.toFixed(2), 'tariff': result.tariff.toFixed(2)})
		}
	})
	
	const [handleStartImpersonation] = useLazyQuery(BEGIN_IMPERSONATION, {
		fetchPolicy: 'no-cache',
		onCompleted: data => {
			let requestData = data.impersonationBegin
			if(requestData.success){
				const {
					userInfo,
					impersonationUserInfo,
					token
				} = requestData.authorizationInfo
				localStorage.setItem('apiToken', token)
				manageUserInfo('begin-impersonation', userInfo, impersonationUserInfo)
				handleUpdateOrders()
				handleShoppingCart('retrieve')
				let alertObj = {
					'show': true,
					'message': 'You are now impersonating a customer'
				}
				setTopAlert(alertObj)
				window.setTimeout(()=>{TopAlert()}, 2000)
			}
		}
	})
	
	const [handleCancelImpersonation] = useLazyQuery(END_IMPERSONATION, {
		fetchPolicy: 'no-cache',
		onCompleted: data => {
			let requestData = data.impersonationEnd
			if(requestData.success){
				const {
					userInfo,
					impersonationUserInfo,
					token
				} = requestData.authorizationInfo
				localStorage.setItem('apiToken', token)
				manageUserInfo('end-impersonation', userInfo, impersonationUserInfo)
				handleShoppingCart('retrieve')
				props.history.push('/')
			} else {
				setErrorMessage(requestData.message)
			}
		}
	})
	
	const [getItemData] = useLazyQuery(GET_ITEM_BY_ID, {
		fetchPolicy: 'no-cache',
		onCompleted: result => {
			mutateItemDetailCache('add', result)
		}
	})
	
	const [getMultiItemData] = useLazyQuery(GET_ITEMS_BY_ID, {
		fetchPolicy: 'no-cache',
		onCompleted: data => {
			let itemDetailsBatch = data.itemDetailsBatch
			let customerPartNumbersBatch = data.customerPartNumbersBatch
			let result = []
			for (let i = 0; i < itemDetailsBatch.length; i++) {
				let frecno = itemDetailsBatch[i].invMastUid
				let customerPartNumbers = []
				for (let i = 0; i < customerPartNumbersBatch.length; i++) {
					let customerPartNumberObj = customerPartNumbersBatch[i]
					if ( customerPartNumberObj.invMastUid === frecno) {
						customerPartNumbers.push(customerPartNumberObj)
					}
				}
				let itemDetailsObj = {
					'itemDetails': itemDetailsBatch[i],
					'customerPartNumbers': customerPartNumbers
				}
				result.push(itemDetailsObj)
			}
			mutateItemDetailCache('add-multiple', result)
		}
	})
	
	const [handleUpdateTaxes] = useLazyQuery(GET_TAXES, {
		fetchPolicy: 'no-cache',
		onCompleted: data => {
			console.log('got taxes ->', data)
		}
	})
	
	const [handleGetOrders, getOrdersState] = useLazyQuery(GET_ORDERS, {
		fetchPolicy: 'no-cache',
		onCompleted: data => {
			let requestData = data.accountOrders
			setOrdersCache(requestData)
		}
	})
	
	const [handleGetInvoices] = useLazyQuery(GET_INVOICES, {
		fetchPolicy: 'no-cache',
		onCompleted: data => {
			let requestData = data.accountInvoices
			setInvoiceCache([...invoiceCache, ...requestData])
			if (requestData.length >= invoiceBatchSize) {
				handleUpdateInvoices()
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
	
	const distinct = (obj, idx, self) => self.findIndex(ele => !Object.keys(obj).find(key => ele[key] !== obj[key])) === idx;
	
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
		handleGetItemPrices({ variables: { items: items.map(({invMastUid}) => ({ invMastUid, quantity: 1 })) } })
	}
	
	function getItemAvailabilities(items) {
		handleGetItemAvailabilities({ variables: { invMastUids: items.map(({invMastUid}) => invMastUid) }})
	}
	
	const [getShoppingLists, getShoppingListsState] = useLazyQuery(GET_SHOPPING_LISTS, {
		fetchPolicy: 'no-cache',
		onCompleted: ({shoppingList}) => {
			const data = shoppingList.map(getRidOf__typename)
			setShoppingLists(data)
		}
	})
	
	const [handleUpdateShoppingList, upsertShoppingListState] = useMutation(UPDATE_SHOPPING_LISTS, {
		fetchPolicy: 'no-cache',
		onCompleted: data => {
			const distinctShoppingLists = (list, idx, self) => self.findIndex(l => l.id === list.id) === idx
			if (data.shoppingListEdit.deleted) {
				const foundListIdx = shoppingLists.findIndex(list => list.id === data.shoppingListEdit.id)
				if (foundListIdx !== -1) {
					const shoppingListCopy = shoppingLists.slice()
					shoppingListCopy.splice(foundListIdx, 1)
					setShoppingLists(shoppingListCopy)
				}
			} else {
				setShoppingLists([getRidOf__typename(data.shoppingListEdit), ...shoppingLists].filter(distinctShoppingLists))
			}
			return Promise.resolve(data)
		}
	})
	
	const upsertShoppingList = (shoppingList) => { // if shoppingList.id === null then this will insert otherwise it will update
		const items = shoppingList.items.map(({itemCode, frecno, invMastUid, quantity, customerPartNumberId}) => ({itemCode, invMastUid: invMastUid || frecno, quantity, customerPartNumberId}))
		return handleUpdateShoppingList({ variables: { shoppingList: { ...shoppingList, items } } })
	}
	
	const [getWebUserContacts, getWebUserContactsState] = useLazyQuery(GET_WEB_USER_CONTACTS, {
		fetchPolicy: 'no-cache',
		onCompleted: data => {
			setWebUserContacts(data.webUsers)
		}
	})
	
	function manageUserInfo(action, userInfo, impersonationInfo){
		let currentUserType
		let userInfoStorage = localStorage.getItem('userInfo')
		let imperInfoStorage = localStorage.getItem('imperInfo')
		switch(action) {
			case 'load-context':
				setUserInfo(JSON.parse(userInfoStorage))
				setImpersonatedCompanyInfo(JSON.parse(imperInfoStorage))
				if (_.isNil(userInfoStorage)) {
					currentUserType = 'Anon'
				} else {
					currentUserType = JSON.parse(userInfoStorage).role
				}
				break
			case 'begin-impersonation':
				localStorage.setItem('userInfo', JSON.stringify(userInfo))
				localStorage.setItem('imperInfo', JSON.stringify(impersonationInfo))
				localStorage.removeItem('shoppingCartToken')
				setUserInfo(userInfo)
				if(userType.current === 'Impersonator'){ //User switched companies they are impersonating
					props.history.push('/')
				}
				setItemDetailCache([])
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
				setUserInfo(userInfo)
				setImpersonatedCompanyInfo(null)
				currentUserType = 'AirlineEmployee'
				setItemDetailCache([])
				setInvoiceCache([])
				setInvoiceBatchNumber(0)
				setOrdersCache([])
				setPurchaseHistory([])
				break
			case 'login':
				setItemDetailCache([])
				setUserInfo(userInfo)
				currentUserType = userInfo.role
				break
			case 'logout':
				const keysToRemove = ['userInfo', 'apiToken', 'shoppingCartToken', 'imperInfo']
				keysToRemove.forEach(key => localStorage.removeItem(key))
				setUserInfo(null)
				setImpersonatedCompanyInfo(null)
				currentUserType = 'Anon'
				setOrdersCache([])
				setInvoiceCache([])
				setPurchaseHistory([])
				setInvoiceBatchNumber(0)
				break
		}
		setUserType({'current': currentUserType, 'previous': _.isNil(userType.current) ? 'Anon' : userType.current})
	}
	
	function resetTopAlert(){
		setTopAlert({
			'show': false,
			'message': ''
		})
	}
	
	function handleLogin(userInfo, mergeToken) {
		if(shoppingCart.length > 0) {
			handleShoppingCart('merge', mergeToken)
		} else {
			handleShoppingCart('retrieve')
		}
		manageUserInfo('login', userInfo)
		if(userInfo.role === 'AirlineEmployee' && drift){
			drift.api.widget.hide()
		}
		handleUpdateOrders()
		setTopAlert({
			'show': true,
			'message': 'You have been successfully logged in.'
		})
		window.setTimeout(()=>{resetTopAlert()}, 3000)
	}
	
	function handleLogout(){
		if(drift) { drift.api.widget.show(); }
		manageUserInfo('logout')
		props.history.push('/')
		handleEmptyCart()
		setTopAlert({
			'show': true,
			'message': 'You have been logged out.'
		})
		window.setTimeout(()=>{resetTopAlert()}, 3500)
	}
	
	function handleAddItem (item){
		setShoppingCart([...shoppingCart, item])
		getItemData({variables: { 'itemId': item.frecno }}) // Retrieve the item's data and add it to the display cart
	}
	
	function handleAddItems (items){
		setShoppingCart([...shoppingCart, ...items])
		let itemFrecnos = []
		items.forEach(elem => itemFrecnos.push(elem.frecno))
		getMultiItemData({variables: {'invMastUids': itemFrecnos}})
	}
	
	function handleRemoveItem(itemLocation){
		let mutatedCart = shoppingCart
		mutatedCart.splice(itemLocation, 1)
		setShoppingCart([...mutatedCart])
	}
	
	function handleMoveItem(itemLocation, newLocation){
		let mutatedCart = [...shoppingCart]
		let movedItem = mutatedCart.splice(itemLocation, 1)
		mutatedCart.splice(newLocation, 0, movedItem[0])
		setShoppingCart([...mutatedCart])
	}
	
	function handleSplitItem(index, lineCount, lineQuantity){
		let splitItems = []
		for (let i = 0; i < lineCount ;i++){
			splitItems.push({
				'frecno': shoppingCart[index].frecno,
				'quantity': parseInt(lineQuantity, 10),
				'itemNotes': shoppingCart[index].itemNotes,
			})
		}
		let frontCart = shoppingCart.slice(0,index) // returns cart item before split item
		let backCart = shoppingCart.slice(index + 1) // returns cart item after split item
		setShoppingCart([...frontCart ,...splitItems,...backCart])
	}
	
	function handleUpdateItem(index, type, value){
		let mutatedCart = shoppingCart
		switch(type){
			case 'quantity':
				if (/^\+?(0|[1-9]\d*)$/.test(value) || value === ''){
					let mutatedValue = ''
					if(!isNaN(value) && value.length > 0){
						mutatedValue = parseInt(value, 10)
					}
					mutatedCart[index].quantity = mutatedValue
				}
				break
			case 'notes':
				mutatedCart[index].itemNotes = value
				break
			case 'priceOverride':
				mutatedCart[index].itemUnitPriceOverride = value
				break
			case 'customerPartNumberId':
				mutatedCart[index].customerPartNumberId = value
				break
		}
		setShoppingCart([...mutatedCart])
	}
	
	function mutateItemDetailCache(type, data){
		let mutatedItemDetailCache
		switch(type){
			case 'add':
				mutatedItemDetailCache = [...itemDetailCache, data]
				setItemDetailCache(mutatedItemDetailCache)
				break
			case 'add-multiple':
				mutatedItemDetailCache = [...itemDetailCache, ...data]
				setItemDetailCache(mutatedItemDetailCache)
				break
			case 'update-customer-numbers':
				mutatedItemDetailCache = itemDetailCache.map( elem => {
					if (elem.itemDetails.invMastUid === data.frecno) {
						elem.customerPartNumbers = data.customerPartNumbers
					}
					return(elem)
				})
				setItemDetailCache(mutatedItemDetailCache)
				break
		}
	}
	
	function handleShoppingCart(action, mergeToken) {
		setShoppingCartPricing({'state': 'loading', 'subTotal': '--', 'tariff': '--'})
		let shoppingCartToken = localStorage.getItem('shoppingCartToken')
		let cartInfo
		switch(action) {
			case 'update':
				setTimeoutId(null)
				cartInfo = { 'cartInfo': {
						'token': shoppingCartToken,
						'actionString': action,
						'orderNotes': orderNotes,
						'cartItems': shoppingCart
					}}
				break
			case 'save':
				cartInfo = { 'cartInfo': {
						'token': shoppingCartToken,
						'actionString': action
					}}
				justLoadedCart.current = true
				break
			case 'merge':
				cartInfo = { 'cartInfo': {
						'token': mergeToken,
						'actionString': action
					}}
				justLoadedCart.current = true
				break
			case 'retrieve':
				cartInfo = { 'cartInfo': {
						'token': shoppingCartToken,
						'actionString': action
					}}
				justLoadedCart.current = true
				break
		}
		updateCart({ variables: cartInfo })
	}
	
	function handleEmptyCart(){
		setShoppingCart([])
	}
	
	function handleUpdateOrders() {
		handleGetOrders()
	}
	
	function handleUpdateInvoices() {
		if (invoiceBatchNumber === 0) {
			invoicesLoaded.current = false
		}
		handleGetInvoices({
			variables: {
				'batchNumber': invoiceBatchNumber,
				'batchSize': invoiceBatchSize
			}
		})
		setInvoiceBatchNumber(invoiceBatchNumber + 1)
	}
	
	return (
		<Context.Provider
			value={{
				impersonatedCompanyInfo: impersonatedCompanyInfo,
				startImpersonation: (customerId)=>{
					handleStartImpersonation({ variables: { 'customerId': customerId }})
				},
				cancelImpersonation: ()=>{
					handleCancelImpersonation()
				},
				topAlert: topAlert,
				removeTopAlert: ()=>{
					resetTopAlert()
				},
				userInfo: userInfo,
				loginUser: (userInformation, mergeToken)=>{
					handleLogin(userInformation, mergeToken)
				},
				logoutUser: ()=>{
					handleLogout()
				},
				cart: shoppingCart,
				itemDetailCache: itemDetailCache,
				updateItemDetailCache: (type, data) => {
					mutateItemDetailCache(type, data)
				},
				cartPricing: shoppingCartPricing,
				orderNotes: orderNotes,
				addItem: (item) => {
					handleAddItem(item)
				},
				addItems: (items) => {
					handleAddItems(items)
				},
				removeItem: (itemLocation) => {
					handleRemoveItem(itemLocation)
				},
				moveItem: (itemLocation, newLocation)=>{
					handleMoveItem(itemLocation, newLocation)
				},
				splitItem: (index,lineCount,lineQuantity)=>{
					handleSplitItem(index,lineCount,lineQuantity)
				},
				updateItem: (index, type, value)=>{
					handleUpdateItem(index, type, value)
				},
				emptyCart: () => {
					handleEmptyCart()
				},
				saveCart: ()=> {
					handleShoppingCart('save')
				},
				updateTaxes: (zipcode, shipToId)=> {
					handleUpdateTaxes({
							variables: {
								'anonymousCartToken': localStorage.getItem('shoppingCartToken'),
								'shipToId': shipToId,
								'zipcode': zipcode }
						}
					)},
				setOrderNotes: (orderNotes) => {
					setOrderNotes(orderNotes)
				},
				ordersCache: ordersCache,
				getOrders: () => {
					handleUpdateOrders()
				},
				getOrdersState,
				invoiceCache: invoiceCache,
				getInvoices: () => {
					handleUpdateInvoices()
				},
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
				webUserContacts
			}}
		>
			{props.children}
		</Context.Provider>
	)
}