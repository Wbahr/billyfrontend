import React from 'react'
import { injectStripe } from 'react-stripe-elements'
import styled from 'styled-components'
import _ from 'lodash'
import { getStripeUser, stripeTokenHandler } from '../../api-temp/stripe'
import CardSection from './cardSection'
import BillingAddressSection from './addressSection'
import Cookies from 'js-cookie'

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
    apiToken = '12345'
    if (!_.isNil(apiToken)){
      // Get stripe user
      console.log('getting stripe token')
      getStripeUser(apiToken).then((response) => {
        if(_.has(response,'stripeCustomerID')) {
          stripe.customers.retrieve(
                response.,
  function(err, customer) {
    // asynchronously called
  }
        } else {
          createStripeUser(apiToken)
        })
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

    console.log('handling submit')

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
          stripeTokenHandler(result.token);
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
