import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import 'react-table/react-table.css'
import RPlogo from '../../imgs/airline/redpalletlogo.png'
import { StyledTextGrey, StyledTextGreyBold } from '../../styles/fonts'
import RedPalletForm from './redPalletForm'
import RMAform from '../RMA/RMAform'
// import { } from '../../api-temp/apiCalls'

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
  'head': '',
  'manufacturer': '',
  'model': '',
  'serial': '',
  'part': '',
  'warranty': '',
  'issue': ''
}

class RedPalletPage extends React.Component {

  render(){
    return (
      <React.Fragment>
        <DivRedPallet>
          <img src={RPlogo} width={'50%'} height={'auto'}/>
          <StyledTextGrey>Airline’s Red Pallet Program is a fast and easy way to get your repair pickups scheduled and move on with
            your day. Simply fill out the information about your repair needs and hit submit. You will be contacted
            promptly with details regarding the pick up of your components. <StyledTextGreyBold>*Required Fields</StyledTextGreyBold>
          </StyledTextGrey>
        </DivRedPallet>
        <RedPalletForm
          repairItems={[emptyItem]}
          emptyItem={emptyItem}
        />
      </React.Fragment>
    )
  }
}

export default RedPalletPage
