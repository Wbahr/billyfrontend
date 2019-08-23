import React from 'react'
import styled from 'styled-components'

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
      <>
        <h2>Credit Card Info</h2>
          <label for="name">Cardholder Full Name</label>
          <input id="name" onChange={this.handleFieldChange} value={name} placeholder="Cardholder Name"></input>
      </>
		)
	}
}

export default CardSection
