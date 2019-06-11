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

  componentWillMount() {
    const location = queryString.parse(_.get(window,`location.search`, null))
    let section = _.get(location,'section', '')
    console.log('section', section)
    switch(section){
      case('Rmas'):
        this.setState({currentDisplay: 'ExistingRMAs'})
        break
      case('rma-summary'):
        this.setState({currentDisplay: 'RmaRequestList'})
        break
      case('SMCSearch'):
        this.setState({currentDisplay: 'SMCSearch'})
        break
      default:
        this.setState({currentDisplay: ''})

    }
  }
  state = {
    currentDisplay: ''
  }

  render(){
    const {
      currentDisplay
    } = this.state

    return(
      <>
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
      </>
    )
  }
}

const mapStateToProps = state => {}
const mapDispatchToProps = { requestTesting }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreen)
