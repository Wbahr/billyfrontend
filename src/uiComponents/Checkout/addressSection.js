import React from 'react'
import styled from 'styled-components'

const DivSection = styled.div`
  display: flex;
  flex-direction: column;
`

class AddressSection extends React.Component {

  handleFieldChange = (e) => {
    const {
      changeFieldValue
    } = this.props

    changeFieldValue(e.target.id, e.target.value)
  }


	render() {
    const {
      cardData:{
        address1,
        address2,
        city,
        state,
        zip
      }
    } = this.props
    return(
      <DivSection>
        <h2>Billing Address</h2>
          <label for="address_line1">Address 1</label>
          <input id="address_line1" onChange={this.handleFieldChange} value={address1} placeholder="Address 1"></input>
          <label for="address_line2">Address 2</label>
          <input id="address_line2" onChange={this.handleFieldChange} value={address2} placeholder="Address 2"></input>
          <label for="address_city">City</label>
          <input id="address_city" onChange={this.handleFieldChange} value={city} placeholder="City"></input>
          <label for="address_state">State</label>
          <input id="address_state" onChange={this.handleFieldChange} value={state} placeholder="State"></input>
          <label for="address_zip">Zip</label>
          <input id="address_zip" onChange={this.handleFieldChange} value={zip} placeholder="Zip"></input>
      </DivSection>
		)
	}
}

export default AddressSection
