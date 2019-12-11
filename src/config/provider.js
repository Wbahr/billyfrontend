import React from 'react'
import Context from './context'

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
    shoppingCartDisplay: []
  }

  updateShoppingCart = () => {

  }

  render() {
    return (
      <Context.Provider
        value={{
          cart: this.state.shoppingCart,
          cartDisplay: this.state.shoppingCartDisplay,
          addItem: (item) => {
            this.setState({shoppingCart: [...this.state.shoppingCart, item]}, ()=>updateShoppingCart())// item is an item object
          },
          moveItem: (itemLocation, newLocation)=>{

            this.setState({shoppingCart:[...mutatedCart]}, ()=>updateShoppingCart()) // itemLocation, newLocation is the integer position of an item to be removed from shoppingCart Context
          },
          removeItem: (itemLocation) => {
            let mutatedCart = [...this.state.shoppingCart].splice(itemLocation, 1)
            this.setState({shoppingCart:[...mutatedCart]}, ()=>updateShoppingCart()) // itemLocation is the integer position of an item to be removed from shoppingCart Context
          },
          splitItem: (itemLocation, splitInformation)=>{

            this.setState({shoppingCart:[...mutatedCart]}, ()=>updateShoppingCart()) // itemLocation, newLocation is the integer position of an item to be removed from shoppingCart Context
          },
          updateItem: (itemLocation, updateInformation)=>{

            this.setState({shoppingCart:[...mutatedCart]}, ()=>updateShoppingCart()) // itemLocation, newLocation is the integer position of an item to be removed from shoppingCart Context
          },
          emptyCart: () => {
            this.setState({shoppingCart: []}, ()=>updateShoppingCart())
          }
        }}
      >
        {this.props.children}
      </Context.Provider>
    )
  }
}

export default Provider