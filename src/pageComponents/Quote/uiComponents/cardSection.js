import React from 'react'
import styled from 'styled-components'
import { CardElement } from 'react-stripe-elements'

const DivSection = styled.div`
  display: flex;
  flex-direction: column;
`

const DivStripeCard = styled.div`
  width: 300px;
  background-color: white;
  padding: 8px;
  margin: 8px;
  border-radius: 2px;
`

class CardSection extends React.Component {

  handleFieldChange = (e) => {
    const {
      changeFieldValue
    } = this.props

    changeFieldValue(e.target.id, e.target.value)
  }


	render() {
    const {
      cardData:{
        name
      }
    } = this.props
    return(
      <DivSection>
        <h2>Credit Card Info</h2>
          <label htmlFor="name">Cardholder Full Name</label>
          <input id="name" onChange={this.handleFieldChange} value={name} placeholder="Cardholder Name"></input>
          <label htmlFor="card-element">Credit or debit card</label>
          <div id="card-element">
            <DivStripeCard>
              <CardElement />
            </DivStripeCard>            
          </div>
      </DivSection>
		)
	}
}

export default CardSection
