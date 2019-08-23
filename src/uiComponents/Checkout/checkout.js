import React from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements'
import styled from 'styled-components'
import CardSection from './cardSection'
import BillingAddressSection from './addressSection'

const DivStripeCard = styled.div`
  width: 300px;
  background-color: white;
  padding: 8px;
  margin: 8px;
  border-radius: 2px;
`
class Checkout extends React.Component {

  state = {
    'name': '',
    'address_line1': '',
    'address_line2': '',
    'address_city': '',
    'address_state': '',
    'address_zip': '',
    'address_country': 'US',
  }

  handleFieldChange = (field, value) => {
    this.setState({[field]: value})
  }

  handleSubmit = (e) => {
    const {
      stripe
    } = this.props

    e.preventDefault()
    
    stripe.createToken(
      {
        type: 'card', 
        name: this.state.name,
        address_line1: this.state.address_line1,
        address_line2: this.state.address_line2,
        address_city: this.state.address_city,
        address_state: this.state.address_state,
        address_zip: this.state.zip,
        address_country: 'US'
      }).then(function(result) {
        if (result.error) {
          // Inform the customer that there was an error.
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          // Send the token to your server.
          // stripeTokenHandler(result.token);
          console.log('result', result)
        }
    })
  }


	render() {
    return(
      <>
        <form onSubmit={this.handleSubmit}>          
          <div class="form-row">
            <CardSection 
              cardData={this.state}
              changeFieldValue={this.handleFieldChange}
            />
            <BillingAddressSection 
              cardData={this.state}
              changeFieldValue={this.handleFieldChange}
            />
            <label for="card-element">
              Credit or debit card
            </label>
            <div id="card-element">
              <DivStripeCard>
                <CardElement />
              </DivStripeCard>            
            </div>
            <div id="card-errors" role="alert"></div>
          </div>
          <button>Submit Payment</button>
        </form>
      </>
		)
	}
}

export default injectStripe(Checkout)
