import React, { useState } from 'react'
import Context from './context'
import gql from 'graphql-tag'
import { useLazyQuery } from '@apollo/react-hooks'

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


export default function Provider(props) {
  const [shoppingCart, setShoppingCart] = useState([
    {
      'frecno': 1845068,
      'quantity': 1,
      'itemNotes': '',
      'requestedShipDate': null
    }
  ])
  const [shoppingCartDisplay, setShoppingCartDisplay] = useState([])

  const [performItemDetailSearch, {loading, error, data }] = useLazyQuery(GET_ITEM_BY_ID, {
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
    updateShoppingCart()
  }

  function handleRemoveItem(itemLocation){
    console.log('itemLocation',itemLocation)
    console.log('shoppingCart before',shoppingCart)
    let mutatedCart = shoppingCart
    mutatedCart.splice(itemLocation, 1)
    // let mutatedShoppingCartDisplay = [...shoppingCartDisplay].splice(itemLocation, 1)
    // setShoppingCartDisplay(...mutatedShoppingCartDisplay)
    console.log('shoppingCart after',mutatedCart)
    setShoppingCart([...mutatedCart])
    updateShoppingCart()
  }

  function handleMoveItem(itemLocation, newLocation){
    let mutatedShoppingCart
    let mutatedShoppingCartDisplay
    // this.setState({shoppingCart:[...mutatedShoppingCart], shoppingCartDisplay: [...mutatedShoppingCartDisplay]}, () => updateShoppingCart()) // itemLocation, newLocation is the integer position of an item to be removed from shoppingCart Context
  }

  function handleSplitItem(itemLocation, splitInformation){
    // this.setState({shoppingCart:[...mutatedCart], shoppingCartDisplay: [...mutatedShoppingCartDisplay]}, () => updateShoppingCart()) // itemLocation, newLocation is the integer position of an item to be removed from shoppingCart Context
  }

  function handleUpdateItem(itemLocation, updateInformation){
    // this.setState({shoppingCart:[...mutatedCart], shoppingCartDisplay: [...mutatedShoppingCartDisplay]}, () => updateShoppingCart()) // itemLocation, newLocation is the integer position of an item to be removed from shoppingCart Context
  }

  function handleEmptyCart(){
    setShoppingCart([])
    setShoppingCartDisplay([])
    updateShoppingCart()
  }

  function updateShoppingCart() {
    console.log('display shoppingCart ->', shoppingCartDisplay)
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
          }
        }}
      >
        {props.children}
      </Context.Provider>
    )
}

