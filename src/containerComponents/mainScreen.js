import React from 'react'
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
import Search from '../uiComponents/Search/testSearch'

// const StyledBackground = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin: 0;
//   padding 0;
//   background-color: grey;
// `

const MainScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`

// const DivAccountContainer = styled.div`
//   width: 744px;
//   min-height: 500px;
//   background-color: white;
//   padding: 10px;
//   margin: 20px 0;
// `

// const DivFullContainer = styled.div`
//   width: 100vw;
//   height: 100vh;
//   background-color: white;
//   padding: 10px;
// `

class MainScreen extends React.Component {
  // state = {
  //   stripe: null,
  //   currentDisplay: 'Search'
  // }

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
    return(
      <MainScreenContainer>
        <p>login</p>
        <p>navbar</p>
        <p>search</p>
        <p>product categories</p>
        <p>zachary</p>
        <p>footer</p>
      </MainScreenContainer>
    )
    // return(
      // <StyledBackground>
      //   currentDisplay === 'Search' &&
      //     <DivFullContainer>
      //       <Search />
      //     </DivFullContainer>
      //   }
      //   {currentDisplay === 'SMCSearch' &&
      //     <DivFullContainer>
      //       <SMCProductConfigSearch />
      //     </DivFullContainer>
      //   }
      //   {currentDisplay === 'ContactUs' &&
      //     <DivFullContainer>
      //       <ContactUs />
      //     </DivFullContainer>
      //   }
      //   {currentDisplay === 'ExistingRMAs' &&
      //     <DivAccountContainer>
      //       <RMAtable />
      //     </DivAccountContainer>
      //   }
      //   {currentDisplay === 'RMARequestDetail' &&
      //     <DivAccountContainer>
      //       <RMAdetails />
      //     </DivAccountContainer>
      //   }
      //   {currentDisplay === 'invoicepayment' &&
      //     <DivAccountContainer>
      //       <InvoicePayments />
      //     </DivAccountContainer>
      //   }
      //   {currentDisplay === 'AccountInfoTab' &&
      //     <DivAccountContainer>
      //       <AccountProfile />
      //     </DivAccountContainer>
      //   }
      //   {currentDisplay === 'BrandScreen' &&
      //     <DivFullContainer>
      //       <BrandScreen />
      //     </DivFullContainer>
      //   }
      //   {currentDisplay === 'RedPallet' &&
      //     <DivFullContainer>
      //       <RedPallet />
      //     </DivFullContainer>
      //   }
      //   {currentDisplay === 'InstantQuote' &&
      //     <DivFullContainer>
      //       <StripeProvider stripe={this.state.stripe}>
      //         <div className="example">
      //           <Elements>
      //             <InstantQuote />
      //           </Elements>
      //         </div>
      //       </StripeProvider>
      //     </DivFullContainer>
      //   }
      //   {currentDisplay === 'Checkout' &&
      //     <DivFullContainer>
      //       <StripeProvider stripe={this.state.stripe}>
      //         <div className="example">
      //           <Elements>
      //             <Checkout />
      //           </Elements>
      //         </div>
      //       </StripeProvider>
      //     </DivFullContainer>
      //   }
      // </StyledBackground>
    // )
  }
}

export default MainScreen
