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
    }
  }
`

export default function Provider(props) {
  const didMountRef = useRef(false);
  const [shoppingCart, setShoppingCart] = useState([])
  const [shoppingCartDisplay, setShoppingCartDisplay] = useState([])
  const [orderNotes, setOrderNotes] = useState('')

  useEffect(() => {
    if (!didMountRef.current) {
      let shoppingCartToken = localStorage.getItem("shoppingCartToken")
      // If the user doesn't have a shopping cart, create one
      if (_.isNil(shoppingCartToken)){
        updateShoppingCart(1)
      } else { // If a shopppingCartToken exists, get the existing cart
        updateShoppingCart(2)
      }
      didMountRef.current = true
    }
  })

  const [updateShoppingCart] = useMutation(UPDATE_SHOPPING_CART, {
    onCompleted: result => {
      let results = result.updateShoppingCart
      console.log('updateShoppingCart', results)
      localStorage.setItem("shoppingCartToken", results.token)
      setShoppingCart(results.cartData)
      setOrderNotes(results.orderNotes)
    }
  })

  const [performItemDetailSearch] = useLazyQuery(GET_ITEM_BY_ID, {
    onCompleted: result => {
      console.log('result ', result)
      return(
        result.itemDetails
      )
    }
  })

  function handleAddItem (item){
    performItemDetailSearch({ variables: { itemId: item.frecno } })
    // .then((newDisplayItem)=>{
    //   setShoppingCartDisplay([...shoppingCartDisplay, newDisplayItem])
    // })
    setShoppingCart([...shoppingCart, item])
    handleUpdateShoppingCart(2)
  }

  function handleRemoveItem(itemLocation){
    let mutatedCart = shoppingCart
    mutatedCart.splice(itemLocation, 1)
    // let mutatedShoppingCartDisplay = [...shoppingCartDisplay].splice(itemLocation, 1)
    // setShoppingCartDisplay(...mutatedShoppingCartDisplay)
    setShoppingCart([...mutatedCart])
    handleUpdateShoppingCart(2)
  }

  function handleMoveItem(itemLocation, newLocation){
    let mutatedShoppingCart
    let mutatedShoppingCartDisplay
    // this.setState({shoppingCart:[...mutatedShoppingCart], shoppingCartDisplay: [...mutatedShoppingCartDisplay]}, () => updateShoppingCart()) // itemLocation, newLocation is the integer position of an item to be removed from shoppingCart Context
    handleUpdateShoppingCart(2)
  }

  function handleSplitItem(itemLocation, splitInformation){
    // this.setState({shoppingCart:[...mutatedCart], shoppingCartDisplay: [...mutatedShoppingCartDisplay]}, () => updateShoppingCart()) // itemLocation, newLocation is the integer position of an item to be removed from shoppingCart Context
    handleUpdateShoppingCart(2)
  }

  function handleUpdateItem(itemLocation, updateInformation){
    // this.setState({shoppingCart:[...mutatedCart], shoppingCartDisplay: [...mutatedShoppingCartDisplay]}, () => updateShoppingCart()) // itemLocation, newLocation is the integer position of an item to be removed from shoppingCart Context
    handleUpdateShoppingCart(2)
  }

  function handleEmptyCart(){
    setShoppingCart([])
    setShoppingCartDisplay([])
    handleUpdateShoppingCart(2)
  }

  function handleUpdateShoppingCart(action) {
    // Cart Actions
    // 1 - Create Cart
    // 2 - Update Cart
    // 3 - Save Cart
    // 4 - Create Shopping List
    let shoppingCartToken = localStorage.getItem("shoppingCartToken")
    updateShoppingCart({ variables: { cartData: {
         "cartData": {
           "token": shoppingCartToken,
           "action": action,
           "cart": shoppingCart,
           "orderNotes": orderNotes
         }
       }} 
    })
  }

    return (
      <Context.Provider
        value={{
          cart: shoppingCart,
          cartDisplay: shoppingCartDisplay,
          addItem: (item) => {
            handleAddItem(item)
          },
          removeItem: (itemLocation) => {
            handleRemoveItem(itemLocation)
          },
          moveItem: (itemLocation, newLocation)=>{
            handleMoveItem(itemLocation, newLocation)
          },
          splitItem: (itemLocation, splitInformation)=>{
            handleSplitItem(itemLocation, splitInformation)
          },
          updateItem: (itemLocation, updateInformation)=>{
            handleUpdateItem(itemLocation, updateInformation)
          },
          emptyCart: () => {
            handleEmptyCart()
          },
          saveCart: ()=> {
            handleUpdateShoppingCart(3)
          },
          setOrderNotes: (e) => {
            setOrderNotes(e.target.value)
          }
        }}
      >
        {props.children}
      </Context.Provider>
    )
}

