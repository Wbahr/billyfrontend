import React from 'react'
import { injectStripe } from 'react-stripe-elements'
import styled from 'styled-components'
import _ from 'lodash'
// import { getUserPaymentOptions, getStripeUser, createStripeUser, saveStripePaymentMethod } from '../api-temp/apiCalls'
import CardSection from './cardSection'
import BillingAddressSection from './addressSection'

const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
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

  componentWillMount(){
    let apiToken = Cookies.get('b2bApiToken')
    if (!_.isNil(apiToken)){
      // check if stripe user, get payment options
      // let paymentOptions = getUserPaymentOptions()
      if (getStripeUser(apiToken)) {
        // if they are a stripe user, 
      } else {
        // let stripeToken = createStripeUser()
      }
    // let paymentOptions = getUserPaymentOptions()

    } else {
      //  trigger signin modal
    }

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
          <DivContainer>
            <CardSection 
              cardData={this.state}
              changeFieldValue={this.handleFieldChange}
            />
            <BillingAddressSection 
              cardData={this.state}
              changeFieldValue={this.handleFieldChange}
            />
            <div id="card-errors" role="alert"></div>
          </DivContainer>
          <button>Submit Payment</button>
        </form>
      </>
		)
	}
}

export default injectStripe(Checkout)
