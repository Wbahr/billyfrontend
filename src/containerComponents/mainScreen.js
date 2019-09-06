import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {Elements, StripeProvider} from 'react-stripe-elements';
import queryString from 'query-string'
import RMAtable from '../uiComponents/RMA/RMAtable'
import RMAdetails from '../uiComponents/RMA/RMAdetails'
import SMCProductConfigSearch from '../uiComponents/SMCProductConfigurator/productConfigSearch'
import InvoicePayments from '../uiComponents/Invoice/invoicePaymentTable'
import {requestTesting} from '../uiComponents/RMA/redux/actionConsts'
import AccountProfile from '../uiComponents/AccountProfile/accountProfile'
import ContactUs from '../uiComponents/ContactUs/contactUs'
import BrandScreen from './brandScreen'
import RedPallet from '../uiComponents/RedPallet/redPallet'
import InstantQuote from '../uiComponents/InstantQuote/instantQuote'
import Checkout from '../uiComponents/Checkout/checkout'

const StyledBackground = styled.div`
  width: 100%;
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
  width: 100vw;
  height: 100vh;
  background-color: white;
  padding: 10px;
`

class MainScreen extends React.Component {
  state = {
    stripe: null,
    currentDisplay: 'Checkout'
  }

  componentDidMount() {
    if (window.Stripe) {
      this.setState({stripe: window.Stripe('pk_test_SQ8ib6LMt1YpCE7nVDFenpmH00PWAbBTk0')})
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        this.setState({stripe: window.Stripe('pk_test_SQ8ib6LMt1YpCE7nVDFenpmH00PWAbBTk0')})
      })
    }
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
        {currentDisplay === 'RedPallet' &&
          <DivFullContainer>
            <RedPallet />
          </DivFullContainer>
        }
        {currentDisplay === 'InstantQuote' &&
          <DivFullContainer>
            <StripeProvider stripe={this.state.stripe}>
              <div className="example">
                <Elements>
                  <InstantQuote />
                </Elements>
              </div>
            </StripeProvider>
          </DivFullContainer>
        }
        {currentDisplay === 'Checkout' &&
          <DivFullContainer>
            <StripeProvider stripe={this.state.stripe}>
              <div className="example">
                <Elements>
                  <Checkout />
                </Elements>
              </div>
            </StripeProvider>
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
