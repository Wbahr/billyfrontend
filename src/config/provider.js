import React, { useState, useEffect, useRef } from 'react'
import Context from './context'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import { UPDATE_SHOPPING_CART, BEGIN_IMPERSONATION, END_IMPERSONATION, GET_TAXES, GET_ITEM_BY_ID } from './providerGQL'

export default function Provider(props) {
  const didMountRef = useRef(false);
  const loadingCart = useRef(false)
  const [cartAction, setCartAction] = useState(null)
  const [prevToken, setPrevToken] = useState(localStorage.getItem("userInfo"))
  const [token, setToken] = useState(_.isNil(localStorage.getItem("imperInfo")) ? localStorage.getItem("userInfo") : localStorage.getItem("imperInfo"))
  const [shoppingCart, setShoppingCart] = useState([])
  const [shoppingCartDisplay, setShoppingCartDisplay] = useState([])
  const [orderNotes, setOrderNotes] = useState('')
  const [userInfo, setUserInfo] = useState(null)
  const [impersonatedCompanyInfo, setImpersonatedCompanyInfo] = useState(null)
  const [topAlert, setTopAlert] = useState({'show': false, 'message': ''}) 
  const [shoppingCartPricing, setShoppingCartPricing] = useState({'subTotal': '--', 'tariff': '--'})

  useEffect(() => {
    // If page refreshed or first loaded, check to see if any tokens exist and update Context accordingly
    if (!didMountRef.current) {
      // If userInfo or imperInfo in local storage, update Context
      let userInfoStorage = localStorage.getItem("userInfo")
      let imperInfoStorage = localStorage.getItem("imperInfo")
      setUserInfo(JSON.parse(userInfoStorage))
      setImpersonatedCompanyInfo(JSON.parse(imperInfoStorage))
      let shoppingCartToken = localStorage.getItem("shoppingCartToken")

      // If the user isn't logged in, create a shopping cart
      if (!_.isNil(shoppingCartToken)){
        handleUpdateShoppingCart(5)
      }
      // Set Component Mounted = TRUE
      didMountRef.current = true
    }
  })

  // This Effect manages the shopping cart when users signin / signout
  // Set token on login or impersonation
  // This is the only place to set prevToken
  useEffect(()=> {
    if(didMountRef.current) {
      if (_.isNil(prevToken) && !_.isNil(token)) {
        // console.log('the user just logged in from Anon', token, prevToken)
        // If an (api) prevToken is NULL but (api) token is not NULL, the user just logged in from Anon
        // Merge Anon cart with logged in user's cart
        let shoppingCartToken = localStorage.getItem("shoppingCartToken")
        if(_.isNil(shoppingCartToken)){
          handleUpdateShoppingCart(5)
        } else {
          handleUpdateShoppingCart(4)
        }
      } else if (!_.isNil(prevToken) && !_.isNil(token) && (prevToken !== token)) {
        // console.log('the user is using begin impersonation / end impersonation')
        // If both (api) prevToken is NULL and (api) token is NULL, the user is using begin impersonation / end impersonation - get their existing cart
        handleUpdateShoppingCart(5)
      }
      setPrevToken(token)
    }
  }, [token])

  // Update database if shopping cart or order notes  changes
  useEffect(() => {
    // console.log('Cart or Order Notes changed')
    // console.log('didMountRef.current', didMountRef.current)
    // console.log('loadingCart', loadingCart.current)
    // console.log('tokens equal', prevToken === token)
    if(didMountRef.current && !loadingCart.current && prevToken === token){
      let shoppingCartToken = localStorage.getItem("shoppingCartToken")
      if (_.isNil(shoppingCartToken) && shoppingCart.length > 0) {
        // console.log('creating cart from shoppingCart update')
        handleUpdateShoppingCart(1)
      } else {
        handleUpdateShoppingCart(2)
      }
    }
  },[shoppingCart, orderNotes])

  const [updateShoppingCart] = useMutation(UPDATE_SHOPPING_CART, {
    fetchPolicy: 'no-cache',
    onCompleted: result => {
      let results = result.updateShoppingCart
      // console.log('Bobby',result)
      if (!_.isNil(results.token)) {
        setShoppingCartPricing({'subTotal': results.subtotal.toFixed(2), 'tariff': results.tariff.toFixed(2)})
        // If we are merging or loading an existing cart, the server will have the cart we need, so we need to load it
        // console.log('updateShoppingCart', cartAction)
        if (cartAction === 4 || cartAction === 5) {
          let cartData = JSON.parse(results.cartData)
          localStorage.setItem("shoppingCartToken", results.token)
          setShoppingCart(cartData)
          setOrderNotes(results.orderNotes)
          // If the cart was existing, populate cartDisplay
          if (cartAction === 5) {
            let cartFrecnos = []
            cartData.forEach(elem => cartFrecnos.push(elem.frecno))
            // getMultiItemData({variables: {cartFrecnos}})
          }
        // If a new cart was just created, set a token in local storage
        } else if (cartAction === 1) {
          // console.log('set token action 1')
          localStorage.setItem("shoppingCartToken", results.token)
        }
        loadingCart.current = false
      } else if (_.isNil(results.token) && !_.isNil(impersonatedCompanyInfo)) {
        handleUpdateShoppingCart(1)
      }
    }
  })

  const [handleStartImpersonation] = useLazyQuery(BEGIN_IMPERSONATION, {
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      let requestData = data.impersonationBegin
      if(requestData.success){
        // console.log('data', data)
        localStorage.setItem('apiToken', requestData.authorizationInfo.token)
        localStorage.setItem('userInfo', JSON.stringify(requestData.authorizationInfo.userInfo)) 
        localStorage.setItem('imperInfo', JSON.stringify(requestData.authorizationInfo.impersonationUserInfo)) 
        localStorage.removeItem('shoppingCartToken')
        setToken(requestData.authorizationInfo.token)
        setUserInfo(requestData.authorizationInfo.userInfo)
        if(!_.isNil(impersonatedCompanyInfo)){
          props.history.push('/')
        }
        setImpersonatedCompanyInfo(requestData.authorizationInfo.impersonationUserInfo)
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
        localStorage.setItem('apiToken', requestData.authorizationInfo.token)
        localStorage.setItem('userInfo', JSON.stringify(requestData.authorizationInfo.userInfo)) 
        localStorage.removeItem('imperInfo') 
        handleEmptyCart()
        setToken(requestData.authorizationInfo.token)
        setUserInfo(requestData.authorizationInfo.userInfo)
        setImpersonatedCompanyInfo(null)
        props.history.push('/')
      } else {
        setErrorMessage(requestData.message)
      }
    }
  })

  const [getItemData] = useLazyQuery(GET_ITEM_BY_ID, {
    fetchPolicy: 'no-cache',
    onCompleted: result => {
      mutateShoppingCartDisplay('add', result)
    }
  })

  const [getMultiItemData] = useLazyQuery(GET_ITEM_BY_ID, {
    fetchPolicy: 'no-cache',
    onCompleted: result => {
      mutateShoppingCartDisplay('add', result)
    }
  })

  const [handleUpdateTaxes] = useLazyQuery(GET_TAXES, {
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      console.log('got taxes ->', data)
    }
  })
  
  function resetTopAlert(){
    let alertObj = {
      'show': false,
      'message': ''
    }
    setTopAlert(alertObj)
  }

  function handleLogin(userInformation, token) {
    setToken(token)
    setUserInfo(userInformation)
    if(userInformation.role === 'AirlineEmployee'){
      drift.api.widget.hide()
    }
    // handleUpdateShoppingCart(4)
    let alertObj = {
      'show': true,
      'message': 'You have been successfully logged in.'
    }
    setTopAlert(alertObj)
    window.setTimeout(()=>{resetTopAlert()}, 3000)
  }

  function handleLogout(){
    drift.api.widget.show()
    props.history.push('/')
    setUserInfo(null)
    const keysToRemove = ['userInfo', 'apiToken', 'shoppingCartToken', 'imperInfo']
    keysToRemove.forEach(key => localStorage.removeItem(key))
    setToken(null)
    handleEmptyCart()
    setImpersonatedCompanyInfo(null)
    let alertObj = {
      'show': true,
      'message': 'You have been logged out.'
    }
    setTopAlert(alertObj)
    window.setTimeout(()=>{resetTopAlert()}, 3500)
  }

  async function handleAddItem (item){
    const itemId = item.frecno
    // Add item to the cart
    setShoppingCart([...shoppingCart, item])
    // Retrieve the item's data and add it to the display cart
    getItemData({variables: { itemId }})
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
    let mutatedCart
    switch(type){
      case 'quantity':
        if (/^\+?(0|[1-9]\d*)$/.test(value) || value === ''){
          mutatedCart = shoppingCart
          let mutatedValue = ''
          if(!isNaN(value)  && value.length > 0){
            mutatedValue = parseInt(value, 10)
          }
          mutatedCart[index].quantity = mutatedValue
          setShoppingCart([...mutatedCart])
        }
        break
      case 'notes':
        mutatedCart = shoppingCart
        mutatedCart[index].itemNotes = value
        setShoppingCart([...mutatedCart])
        break
      case 'priceOverride':
        mutatedCart = shoppingCart
        mutatedCart[index].itemUnitPriceOverride = value
        setShoppingCart([...mutatedCart])
      break
      case 'customerPartNumberId':
        mutatedCart = shoppingCart
        mutatedCart[index].customerPartNumberId = value
        setShoppingCart([...mutatedCart])
      break
    }
  }

  function handleEmptyCart(){
    setShoppingCart([])
  }

  function mutateShoppingCartDisplay(type, data){
    let mutatedShoppingCartDisplay
    switch(type){
      // case 'empty':
      //   setShoppingCartDisplay([])
      //   break
      case 'add':
        mutatedShoppingCartDisplay = [...shoppingCartDisplay, data]
        setShoppingCartDisplay(mutatedShoppingCartDisplay)
        break
      // case 'remove':
      //   mutatedShoppingCartDisplay = shoppingCartDisplay
      //   mutatedShoppingCartDisplay.splice(index, 1)
      //   setShoppingCartDisplay([...mutatedShoppingCartDisplay])
      //   break
      // case 'split':
      //   console.log('split')
      //   break
    }
  }

  function handleSetOrderNotes(orderNotes){
    setOrderNotes(orderNotes)
  }

  function handleUpdateShoppingCart(action) {
    // Cart Actions
    // 1 - Create Cart
    // 2 - Update Cart
    // 3 - Save Cart
    // 4 - Merge Cart
    // 5 - Get existing cart 
    setCartAction(action)
    // console.log('Cart Action:', action)
    let shoppingCartToken = localStorage.getItem("shoppingCartToken")
    if (action === 1 || action === 4 || action === 5) {
      loadingCart.current = true
    }
    updateShoppingCart({ variables: { cartData: {
        "token": shoppingCartToken,
        "action": action,
        "cart": JSON.stringify(shoppingCart),
        "orderNotes": orderNotes
       }} 
    })
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
          cartDisplay: shoppingCartDisplay,
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
            handleUpdateShoppingCart(3)
          },
          updateTaxes: (zipcode, shipToId)=> {
            handleUpdateTaxes(
              { variables:  
                {
                  "anonymousCartToken": localStorage.getItem('shoppingCartToken'),
                  "shipToId": shipToId,
                  "zipcode": zipcode
                }
              }
            )
          },
          setOrderNotes: (orderNotes) => {
            handleSetOrderNotes(orderNotes)
          }
        }}
      >
        {props.children}
      </Context.Provider>
    )
}