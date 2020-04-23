import React, { useState, useEffect, useRef } from 'react'
import Context from './context'
import { useLazyQuery, useMutation } from '@apollo/client'
import { UPDATE_CART, BEGIN_IMPERSONATION, END_IMPERSONATION, GET_TAXES, GET_ITEM_BY_ID, GET_ITEMS_BY_ID } from './providerGQL'

export default function Provider(props) {
  const didMountRef = useRef(false)
  const loadingCart = useRef(false)
  const [shoppingCart, setShoppingCart] = useState([])
  const [itemDetailCache, setItemDetailCache] = useState([])
  const [orderNotes, setOrderNotes] = useState('')
  const [shoppingCartPricing, setShoppingCartPricing] = useState({'subTotal': '--', 'tariff': '--'})
  const [userInfo, setUserInfo] = useState(null)
  const [impersonatedCompanyInfo, setImpersonatedCompanyInfo] = useState(null)
  const [userType, setUserType] = useState({'current': null, 'previous': null})
  const [topAlert, setTopAlert] = useState({'show': false, 'message': ''}) 

  useEffect(() => {
    if (!didMountRef.current) { // If page refreshed or first loaded, check to see if any tokens exist and update Context accordingly
      manageUserInfo('load-context')
      handleShoppingCart('retrieve')
    }
  })

  useEffect(() => { // Update cart in database if shoppingCart or orderNotes changes
    if(didMountRef.current){
      handleShoppingCart('update')
    }
    didMountRef.current = true
  },[shoppingCart, orderNotes])

  const [updateCart] = useMutation(UPDATE_CART, {
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      let result = data.shoppingCart
      if (result.action === 'merge' || result.action === 'retrieve') {
        localStorage.setItem("shoppingCartToken", result.token)
        let cartItems = result.cartItems
        cartItems.forEach(elem => delete elem._typename)
        setShoppingCart(cartItems)
        setOrderNotes(result.orderNotes)
        if (result.action === 'retrieve') { // If the cart was existing, populate cartDisplay
          let cartFrecnos = []
          cartItems.forEach(elem => cartFrecnos.push(elem.frecno))
          getMultiItemData({variables: {'invMastUids': cartFrecnos}})
        }
      }
      setShoppingCartPricing({'subTotal': result.subtotal.toFixed(2), 'tariff': result.tariff.toFixed(2)})
      loadingCart.current = false
    }
  })

  const [handleStartImpersonation] = useLazyQuery(BEGIN_IMPERSONATION, {
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      handleShoppingCart('retrieve')
      let requestData = data.impersonationBegin
      if(requestData.success){
        localStorage.setItem('apiToken', requestData.authorizationInfo.token)
        const {
          userInfo,
          impersonationUserInfo
        } = requestData.authorizationInfo
        manageUserInfo('begin-impersonation', userInfo, impersonationUserInfo)
        handleEmptyCart()
        let alertObj = {
          'show': true,
          'message': 'You are now impersonating a customer'
        }
        setTopAlert(alertObj)
        window.setTimeout(()=>{resetTopAlert()}, 2000)
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
        handleEmptyCart()
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

  function manageUserInfo(action, userInfo, impersonationInfo){
    let currentUserType
    let userInfoStorage = localStorage.getItem("userInfo")
    let imperInfoStorage = localStorage.getItem("imperInfo")
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
        if(!_.isNil(impersonatedCompanyInfo)){ //User switched companies they are impersonating
          currentUserType = 'Impersonator'
          props.history.push('/')
        }
        setImpersonatedCompanyInfo(impersonationInfo)
        currentUserType = 'AirlineEmployee'
        break
      case 'end-impersonation':
        localStorage.setItem('userInfo', JSON.stringify(userInfo)) 
        localStorage.removeItem('imperInfo') 
        setUserInfo(userInfo)
        setImpersonatedCompanyInfo(null)
        currentUserType = 'AirlineEmployee'
        break
      case 'login':
        setUserInfo(userInfo)
        currentUserType = userInfo.role
        break
      case 'logout':
        const keysToRemove = ['userInfo', 'apiToken', 'shoppingCartToken', 'imperInfo']
        keysToRemove.forEach(key => localStorage.removeItem(key))
        setUserInfo(null)
        setImpersonatedCompanyInfo(null)
        currentUserType = 'Anon'
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

  function handleLogin(userInfo) {
    handleShoppingCart('retrieve')
    manageUserInfo('login', userInfo)
    if(userInfo.role === 'AirlineEmployee'){
      drift.api.widget.hide()
    }
    setTopAlert({
      'show': true,
      'message': 'You have been successfully logged in.'
    })
    window.setTimeout(()=>{resetTopAlert()}, 3000)
  }

  function handleLogout(){
    drift.api.widget.show()
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
    }
  }

  function handleShoppingCart(action) {
    let shoppingCartToken = localStorage.getItem('shoppingCartToken')
    let cartInfo
    switch(action) {
      case 'update':
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
        break
      case 'merge':
        cartInfo = { 'cartInfo': {
          'token': shoppingCartToken,
          'actionString': action,
          'orderNotes': orderNotes,
          'cartItems': []
        }}
        break
      case 'retrieve':
        cartInfo = { 'cartInfo': {
          'token': shoppingCartToken,
          'actionString': action
        }}
        break
    }
    updateCart({ variables: cartInfo })
  }

  function handleEmptyCart(){
    setShoppingCart([])
  }

    return (
      <Context.Provider
        value={{
          impersonatedCompanyInfo: impersonatedCompanyInfo,
          startImpersonation: (customerId)=>{
            handleStartImpersonation({ variables: { "customerId": customerId }})
          },
          cancelImpersonation: ()=>{
            handleCancelImpersonation()
          },
          topAlert: topAlert,
          removeTopAlert: ()=>{
            resetTopAlert()
          },
          userInfo: userInfo,
          loginUser: (userInformation, token)=>{
            handleLogin(userInformation, token)
          },
          logoutUser: ()=>{
            handleLogout()
          },
          cart: shoppingCart,
          itemDetailCache: itemDetailCache,
          cartPricing: shoppingCartPricing,
          orderNotes: orderNotes,
          addItem: (item) => {
            handleAddItem(item)
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
                "anonymousCartToken": localStorage.getItem('shoppingCartToken'),
                "shipToId": shipToId,
                "zipcode": zipcode }
              }
            )},
          setOrderNotes: (orderNotes) => {
            setOrderNotes(orderNotes)
          }
        }}
      >
        {props.children}
      </Context.Provider>
    )
}