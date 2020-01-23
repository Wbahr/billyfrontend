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
  const loadCart = useRef(true)
  const justLoadedCart = useRef(false)
  const newUser = useRef(false)
  const [shoppingCart, setShoppingCart] = useState([])
  const [orderNotes, setOrderNotes] = useState('')
  const [userInfo, setUserInfo] = useState(null)
  const [impersonatedCompanyInfo, setImpersonatedCompanyInfo] = useState(null)
  const [topAlert, setTopAlert] = useState({'show': false, 'message': ''}) 
  const [shoppingCartPricing, setShoppingCartPricing] = useState({'subTotal': '--', 'tariff': '--'})

  useEffect(() => {
    if (!didMountRef.current) {
      let shoppingCartToken = localStorage.getItem("shoppingCartToken")
      // If the user doesn't have a shopping cart, create one
      if (_.isNil(shoppingCartToken)){
        handleUpdateShoppingCart(1)
      } else { // If a shopppingCartToken exists, get the existing cart
        handleUpdateShoppingCart(5)
      }
      didMountRef.current = true
      // If userInfo in local storage, update Context
      let userInfo = localStorage.getItem("userInfo")
      setUserInfo(JSON.parse(userInfo))
      // If impersonsatedCompanyInfo in local storage, update Context
      let impersonatedCompanyInfo = localStorage.getItem("impersonatedCompanyInformation")
      setImpersonatedCompanyInfo(JSON.parse(impersonatedCompanyInfo))
    }
  })

  // Update database if shopping cart or order notes  changes
  useEffect(() => {
    if(didMountRef.current && justLoadedCart.current){
      if (newUser.current) {
        newUser.current = false
        handleUpdateShoppingCart(1)
      } else {
        handleUpdateShoppingCart(2)
      }
    } else {
      justLoadedCart.current = false
    }
  },[shoppingCart, orderNotes])

  const [updateShoppingCart] = useMutation(UPDATE_SHOPPING_CART, {
    fetchPolicy: 'no-cache',
    onCompleted: result => {
      let results = result.updateShoppingCart
      localStorage.setItem("shoppingCartToken", results.token)
      setShoppingCartPricing({'subTotal': results.subtotal.toFixed(2), 'tariff': results.tariff.toFixed(2)})
      if(loadCart.current){
        setShoppingCart(JSON.parse(results.cartData))
        setOrderNotes(results.orderNotes)
        loadCart.current = false
        justLoadedCart.current = true
      }
    }
  })

  const [handleStartImpersonation] = useLazyQuery(BEGIN_IMPERSONATION, {
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      let requestData = data.impersonationBegin
      if(requestData.success){
        localStorage.setItem('apiToken', requestData.authorizationInfo.token)
        localStorage.setItem('userInfo', JSON.stringify(requestData.authorizationInfo.userInfo)) 
        localStorage.setItem('impersonatedCompanyInformation', JSON.stringify(requestData.authorizationInfo.impersonationUserInfo)) 
        localStorage.removeItem('shoppingCartToken')
        newUser.current = true
        setUserInfo(requestData.authorizationInfo.userInfo)
        setImpersonatedCompanyInfo(requestData.authorizationInfo.impersonationUserInfo)
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
        localStorage.removeItem('impersonatedCompanyInformation') 
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

  function handleLogin(userInformation) {
    setUserInfo(userInformation)
    loadCart.current = true
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
    newUser.current = true
    handleEmptyCart()
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
    // getItemDetails({ variables: { itemId: item.frecno } })
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
        'requestedShipDate': shoppingCart[index].requestedShipDate
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
      case 'date':
        mutatedCart = shoppingCart
        mutatedCart[index].requestedShipDate = value
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
    let shoppingCartToken = localStorage.getItem("shoppingCartToken")
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
            handleStartImpersonation({ variables: {
              "customerId": customerId
            }
          })
          },
          cancelImpersonation: ()=>{
            handleCancelImpersonation()
          },
          topAlert: topAlert,
          removeTopAlert: ()=>{
            resetTopAlert()
          },
          userInfo: userInfo,
          loginUser: (userInformation)=>{
            handleLogin(userInformation)
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