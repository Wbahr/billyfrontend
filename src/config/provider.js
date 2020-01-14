import React, { useState, useEffect, useRef } from 'react'
import Context from './context'
import gql from 'graphql-tag'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'

const GET_ITEM_BY_ID = gql`
  query ItemById($itemId: ID){
    itemDetails(invMastUid: $itemId) {
      anonPrice
      assembly
      availability
      availabilityMessage
      invMastUid
      itemCode
      itemDesc
      listPrice
      mfgPartNo
      modelCode
      p21ItemDesc
      p21NonWeb
      tariff
      unitSizeMultiple
      image {
        path
        sequence
        type
      }
    }
  }
`

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

export default function Provider(props) {
  const didMountRef = useRef(false);
  const loadCart = useRef(true)
  const justLoadedCart = useRef(false)
  const [shoppingCart, setShoppingCart] = useState([])
  const [orderNotes, setOrderNotes] = useState('')
  const [userInfo, setUserInfo] = useState(null)
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
    }
  })

  // Update database if shopping cart or order notes  changes
  useEffect(() => {
    if(didMountRef.current && justLoadedCart.current){
      handleUpdateShoppingCart(2)
    } else {
      justLoadedCart.current = false
    }
  },[shoppingCart, orderNotes])

  const [updateShoppingCart] = useMutation(UPDATE_SHOPPING_CART, {
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

  function resetTopAlert(){
    let alertObj = {
      'show': false,
      'message': ''
    }
    setTopAlert(alertObj)
  }

  function handleLogin(userInformation) {
    setUserInfo(userInformation)
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
    getItemDetails({ variables: { itemId: item.frecno } })
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
    // 4 - Create Shopping List
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

