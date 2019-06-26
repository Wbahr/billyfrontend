import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import 'react-table/react-table.css'
import RPlogo from '../../imgs/airline/redpalletlogo.png'
import { StyledTextGrey, StyledTextGreyBold } from '../../styles/fonts'
import RedPalletForm from './redPalletForm'
import RMAform from '../RMA/RMAform'
import { getUserData } from '../../api-temp/apiCalls'

const DivRedPallet = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
`
const emptyItem = {
  'repairType': '',
  'po': '',
  'urgency': 'normal',
  'manufacturer': '',
  'model': '',
  'part': '',
  'warranty': 'false',
  'issue': '',
  'quantity': '1'
}

// const val = {
//   'company': 'Airline Hydraulics',
//   'fullname': 'Bobby Panczer',
//   'email': 'bpanczer@airlinehyd.com',
//   'phone': '',
//   'ext': '',
//   'address_1': '',
//   'address_2': '',
//   'city': '',
//   'state': '',
//   'zip': '',
//   'pickup': '',
//   'repairItems': [emptyItem],
//   'additionalNotes': ''
// }

class RedPalletPage extends React.Component {
  state = {
    initValues: null
  }

  userDataMutator = (response) => {
    let mutatedResponse = response
    let supportedStates = ['CT','DE','DC','ME','MD','MA','NH','NJ','NY','OH','PA','RI','VA','VT','WV']
    let unsupportedAddresses = []
    for(let i = 0; i < mutatedResponse.ShipTos.length;i++) {
      if (!_.includes(supportedStates, mutatedResponse.ShipTos[i].State)){
        unsupportedAddresses.push(i)
      }
    }
    for(let i = unsupportedAddresses.length - 1; i >= 0;i--){
      let j = unsupportedAddresses[i]
      delete mutatedResponse.ShipTos[j]
    }
    mutatedResponse.RepairItems = [emptyItem]
    console.log('mutatedResponse',mutatedResponse)
    return mutatedResponse
  }
  componentWillMount() {
    getUserData().then(
      (response) => this.userDataMutator(response)
    ).then(
      (mutatedResponse) => {this.setState({ initValues: mutatedResponse })}
    )
  }

  render(){
    return (
      <React.Fragment>
        <DivRedPallet>
          <img src={RPlogo} width={'50%'} height={'auto'}/>
          <StyledTextGrey>Airline’s Red Pallet Program is a fast and easy way to get your repair pickups scheduled and move on with
            your day. Simply fill out the information about your repair needs and hit submit. You will be contacted
            promptly with details regarding the pick up of your components. <StyledTextGreyBold>*Required Fields</StyledTextGreyBold>
          </StyledTextGrey>
          <StyledTextGreyBold>Note: There will be a minimum charge of $95.00 for tear down & evaluation. If an order is not placed, item
          will be returned as is un-assembled.</StyledTextGreyBold>
        </DivRedPallet>
        { !_.isNil(this.state.initValues) &&
          <RedPalletForm
            initValues={this.state.initValues}
            emptyItem={emptyItem}
          />
        }

      </React.Fragment>
    )
  }
}

export default RedPalletPage
