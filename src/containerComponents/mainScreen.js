import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import queryString from 'query-string'
import RMAtable from '../uiComponents/RMA/RMAtable'
import RMAdetails from '../uiComponents/RMA/RMAdetails'
import InvoicePayments from '../uiComponents/Invoice/invoicePaymentTable'

import {requestTesting} from '../uiComponents/RMA/redux/actionConsts'
import AccountProfile from '../uiComponents/AccountProfile/accountProfile'

const StyledBackground = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding 0;
  background-color: grey;
`

const StyledAccountContainer = styled.div`
  width: 744px;
  min-height: 500px;
  background-color: white;
  padding: 10px;
  margin: 20px 0;
`

class MainScreen extends React.Component {
  state = {
    currentDisplay: 'AccountInfoTab'
  }

  render(){
    const {
      currentDisplay
    } = this.state

    return(
      <StyledBackground>
        <StyledAccountContainer>
          {currentDisplay === 'ExistingRMAs' && <RMAtable />}
          {currentDisplay === 'RMARequestDetail' && <RMAdetails />}
          {currentDisplay === 'invoicepayment' && <InvoicePayments />}
          {currentDisplay === 'AccountInfoTab' && <AccountProfile />}
        </StyledAccountContainer>
      </StyledBackground>
    )
  }
}

const mapStateToProps = state => {}
const mapDispatchToProps = { requestTesting }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreen)
