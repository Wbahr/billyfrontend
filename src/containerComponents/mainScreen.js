import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import queryString from 'query-string'
import RMAtable from '../uiComponents/RMA/RMAtable'
import RMAdetails from '../uiComponents/RMA/RMAdetails'
import SMCProductConfigSearch from '../uiComponents/SMCProductConfigurator/productConfigSearch'
import InvoicePayments from '../uiComponents/Invoice/invoicePaymentTable'
import {requestTesting} from '../uiComponents/RMA/redux/actionConsts'
import AccountProfile from '../uiComponents/AccountProfile/accountProfile'
import ContactUs from '../uiComponents/ContactUs/contactUs'
import BrandScreen from './brandScreen'

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

const DivAccountContainer = styled.div`
  width: 744px;
  min-height: 500px;
  background-color: white;
  padding: 10px;
  margin: 20px 0;
`

const DivFullContainer = styled.div`
  width: 1014px;
  height: 100vh;
  background-color: white;
  padding: 10px;
`

class MainScreen extends React.Component {
  state = {
    currentDisplay: 'BrandScreen'
  }

  render(){
    const {
      currentDisplay
    } = this.state

    return(
      <StyledBackground>
        {currentDisplay === 'SMCSearch' &&
          <DivFullContainer>
            <SMCProductConfigSearch />
          </DivFullContainer>
        }
        {currentDisplay === 'ContactUs' &&
          <DivFullContainer>
            <ContactUs />
          </DivFullContainer>
        }
        {currentDisplay === 'ExistingRMAs' &&
          <DivAccountContainer>
            <RMAtable />
          </DivAccountContainer>
        }
        {currentDisplay === 'RMARequestDetail' &&
          <DivAccountContainer>
            <RMAdetails />
          </DivAccountContainer>
        }
        {currentDisplay === 'invoicepayment' &&
          <DivAccountContainer>
            <InvoicePayments />
          </DivAccountContainer>
        }
        {currentDisplay === 'AccountInfoTab' &&
          <DivAccountContainer>
            <AccountProfile />
          </DivAccountContainer>
        }
        {currentDisplay === 'BrandScreen' &&
          <DivFullContainer>
            <BrandScreen />
          </DivFullContainer>
        }
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
