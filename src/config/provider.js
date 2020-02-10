import React, { useState, useEffect, useRef } from 'react'
import Context from './context'
import gql from 'graphql-tag'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'

const UPDATE_SHOPPING_CART = gql`
  mutation UpdateShoppingCart($cartData: ShoppingCartUpdateInputGraphType) {
    updateShoppingCart(cartUpdate: $cartData) {
      token
      cartData
      orderNotes
      subtotal
      tariff
      cartItems{
        frecno
        itemTotalPrice
      }
    }
  }
`
const BEGIN_IMPERSONATION = gql`
  query BeginImpersonation ($customerId: Int){
    impersonationBegin(customerId: $customerId){
      success
      message
      authorizationInfo{
        token
        userInfo{
          companyId
          companyName
          firstName
          lastName
          role
          permissions
          limits{
            limitType
            limitValue
          }
        }
        impersonationUserInfo{
          customerId
          customerName
          customerIdP21
        }
      }
    }
  }
`

const END_IMPERSONATION = gql`
  query EndImpersonation{
    impersonationEnd{
      success
      message
      authorizationInfo{
        token
        userInfo{
          companyId
          companyName
          firstName
          lastName
          role
          permissions
          limits{
            limitType
            limitValue
          }
        }
      }
    }
  }
`


export default function Provider(props) {
  const didMountRef = useRef(false);
  const loadingCart = useRef(false)
  const [cartAction, setCartAction] = useState(null)
  const [prevToken, setPrevToken] = useState(localStorage.getItem("userInfo"))
  const [token, setToken] = useState(_.isNil(localStorage.getItem("imperInfo")) ? localStorage.getItem("userInfo") : localStorage.getItem("imperInfo"))
  const [shoppingCart, setShoppingCart] = useState([])
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
        console.log('the user just logged in from Anon', token, prevToken)
        // If an (api) prevToken is NULL but (api) token is not NULL, the user just logged in from Anon
        // Merge Anon cart with logged in user's cart
        handleUpdateShoppingCart(4)
      } else if (!_.isNil(prevToken) && !_.isNil(token) && (prevToken !== token)) {
        console.log('the user is using begin impersonation / end impersonation')
        // If both (api) prevToken is NULL and (api) token is NULL, the user is using begin impersonation / end impersonation - get their existing cart
        handleUpdateShoppingCart(5)
      }
      setPrevToken(token)
    }
  }, [token])

  // Update database if shopping cart or order notes  changes
  useEffect(() => {
    console.log('Cart or Order Notes changed')
    console.log('didMountRef.current', didMountRef.current)
    console.log('loadingCart', loadingCart.current)
    console.log('tokens equal', prevToken === token)
    if(didMountRef.current && !loadingCart.current && prevToken === token){
      let shoppingCartToken = localStorage.getItem("shoppingCartToken")
      if (_.isNil(shoppingCartToken) && shoppingCart.length > 0) {
        console.log('creating cart from shoppingCart update')
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
      console.log('Bobby',result)
      if (!_.isNil(results.token)) {
        setShoppingCartPricing({'subTotal': results.subtotal.toFixed(2), 'tariff': results.tariff.toFixed(2)})
        // If we are merging or loading an existing cart, the server will have the cart we need, so we need to load it
        console.log('updateShoppingCart', cartAction)
        if (cartAction === 4 || cartAction === 5) {
          localStorage.setItem("shoppingCartToken", results.token)
          setShoppingCart(JSON.parse(results.cartData))
          setOrderNotes(results.orderNotes)
        // If a new cart was just created, set a token in local storage
        } else if (cartAction === 1) {
          console.log('set token action 1')
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
        console.log('data', data)
        localStorage.setItem('apiToken', requestData.authorizationInfo.token)
        localStorage.setItem('userInfo', JSON.stringify(requestData.authorizationInfo.userInfo)) 
        localStorage.setItem('imperInfo', JSON.stringify(requestData.authorizationInfo.impersonationUserInfo)) 
        localStorage.removeItem('shoppingCartToken')
        setToken(requestData.authorizationInfo.token)
        setUserInfo(requestData.authorizationInfo.userInfo)
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
      } else {
        setErrorMessage(requestData.message)
      }
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
    handleUpdateShoppingCart(4)
    let alertObj = {
      'show': true,
      'message': 'You have been successfully logged in.'
    }
    setTopAlert(alertObj)
    window.setTimeout(()=>{resetTopAlert()}, 3000)
  }

  function handleLogout(){
    setUserInfo(null)
    localStorage.removeItem('userInfo')
    localStorage.removeItem('apiToken') 
    localStorage.removeItem('shoppingCartToken')
    localStorage.removeItem('imperInfo') 
    setToken(null)
    handleEmptyCart()
    setImpersonatedCompanyInfo(null)
    props.children.props.history.push('/')
    let alertObj = {
      'show': true,
      'message': 'You have been logged out.'
    }
    setTopAlert(alertObj)
    window.setTimeout(()=>{resetTopAlert()}, 3500)
  }

  function handleAddItem (item){
    setShoppingCart([...shoppingCart, item])
  }

  function handleRemoveItem(itemLocation){
    let mutatedCart = shoppingCart
    mutatedCart.splice(itemLocation, 1)
    setShoppingCart([...mutatedCart])
  }

  function handleMoveItem(itemLocation, newLocation){
    console.log('handleMoveItem')
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
    }
  }

  function handleEmptyCart(){
    setShoppingCart([])
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
    console.log('Cart Action:', action)
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
          setOrderNotes: (orderNotes) => {
            handleSetOrderNotes(orderNotes)
          }
        }}
      >
        {props.children}
      </Context.Provider>
    )
}