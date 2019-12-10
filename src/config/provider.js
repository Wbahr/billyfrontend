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
      }
    ]
  }

  render() {
    return (
      <Context.Provider
        value={{
          cart: this.state.shoppingCart,
          addItem: (item) => {
            this.setState({shoppingCart: [...this.state.shoppingCart, item]}, console.log('cart', this.state.shoppingCart))// item is an item object
          },
          removeItem: (itemLocation) => {
            let mutatedCart = [...this.state.shoppingCart].splice(itemLocation, 1)
            this.setState([...mutatedCart]) // itemLocation is the integer position of an item to be removed from shoppingCart Context
          },
          emptyCart: () => {
            this.setState({shoppingCart: []})
          }
        }}
      >
        {this.props.children}
      </Context.Provider>
    )
  }
}

export default Provider