import React from 'react'
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

// const [performItemDetailSearch, {loading, error, data }] = useLazyQuery(GET_ITEM_BY_ID, {
//   variables: { itemId },
//   onCompleted: result => {
//     return(
//       result.itemDetails
//     )
//   }
// })

class Provider extends React.Component {
  state = {
    shoppingCart: [
      {
        'freqno': 1845077,
        'quantity': 2,
        'itemNotes': '',
        'requestedShipDate': null
      },
      {
        'freqno': 1847612,
        'quantity': 4,
        'itemNotes': '',
        'requestedShipDate': null
      },
      {
        'freqno': 1055269,
        'quantity': 1,
        'itemNotes': '',
        'requestedShipDate': null
      }
    ],
    shoppingCartDisplay: [
      {
        'freqno': 1845077,
        'quantity': 2,
        'itemNotes': '',
        'requestedShipDate': null
      },
      {
        'freqno': 1847612,
        'quantity': 4,
        'itemNotes': '',
        'requestedShipDate': null
      },
      {
        'freqno': 1055269,
        'quantity': 1,
        'itemNotes': '',
        'requestedShipDate': null
      }
    ]
  }

  handleAddItem(item){
    let newDisplayItem = performItemDetailSearch(item.freqno)
    this.setState({shoppingCart: [...this.state.shoppingCart, item], shoppingCartDisplay: [...this.state.shoppingCartDisplay, newDisplayItem]}, ()=> this.updateShoppingCart())
  }

  handleMoveItem(itemLocation, newLocation){
    let mutatedShoppingCart
    let mutatedShoppingCartDisplay
    this.setState({shoppingCart:[...mutatedShoppingCart], shoppingCartDisplay: [...mutatedShoppingCartDisplay]}, () => this.updateShoppingCart()) // itemLocation, newLocation is the integer position of an item to be removed from shoppingCart Context
  }

  handleRemoveItem(itemLocation){
    let mutatedCart = [...this.state.shoppingCart].splice(itemLocation, 1)
    let mutatedShoppingCartDisplay = [...this.state.shoppingCartDisplay].splice(itemLocation, 1)
    this.setState({shoppingCart:[...mutatedCart], shoppingCartDisplay: [...mutatedShoppingCartDisplay]}, () => this.updateShoppingCart()) // itemLocation is the integer position of an item to be removed from shoppingCart Context
  }

  handleSplitItem(itemLocation, splitInformation){
    this.setState({shoppingCart:[...mutatedCart], shoppingCartDisplay: [...mutatedShoppingCartDisplay]}, () => this.updateShoppingCart()) // itemLocation, newLocation is the integer position of an item to be removed from shoppingCart Context
  }

  handleUpdateItem(itemLocation, updateInformation){
    this.setState({shoppingCart:[...mutatedCart], shoppingCartDisplay: [...mutatedShoppingCartDisplay]}, () => this.updateShoppingCart()) // itemLocation, newLocation is the integer position of an item to be removed from shoppingCart Context
  }

  updateShoppingCart = () => {
    // this.state.shoppingCart
  }

  render() {
    return (
      <Context.Provider
        value={{
          cart: this.state.shoppingCart,
          cartDisplay: this.state.shoppingCartDisplay,
          addItem: (item) => {
            this.handleAddItem(item)
          },
          moveItem: (itemLocation, newLocation)=>{
            this.handleMoveItem(itemLocation, newLocation)
          },
          removeItem: (itemLocation) => {
            this.handleRemoveItem(itemLocation)
          },
          splitItem: (itemLocation, splitInformation)=>{
            this.handleSplitItem(itemLocation, splitInformation)
          },
          updateItem: (itemLocation, updateInformation)=>{
            this.handleUpdateItem(itemLocation, updateInformation)
          },
          emptyCart: () => {
            this.setState({shoppingCart: [], shoppingCartDisplay:[]}, () => this.updateShoppingCart())
          }
        }}
      >
        {this.props.children}
      </Context.Provider>
    )
  }
}

export default Provider