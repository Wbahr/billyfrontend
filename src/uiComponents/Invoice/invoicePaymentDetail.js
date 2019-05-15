import React from 'react'
import styled from 'styled-components'
import AccountSectionHeader from '../common/sectionHeader'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import 'react-table/react-table.css'
import { StyledText0, StyledText1 } from '../../styles/fonts'
import Modal from 'react-responsive-modal'
import ConfirmationModal from './confirmationModal'
import Button from '../common/button'
import classnames from 'classnames'
// import { getInvoice, postRMA } from '../../api-temp/apiCalls'

const StyledRMAOrderDetails = styled.div`
  display: flex;
  padding: 0 10px 10px 10px;
  border-bottom: 1px solid #ccc;
`

const StyledRMAList = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding-left: 10px;
`

const ActionBar = styled.div`
  display: flex;
  justify-content: flex-start;
`

class InvoicePaymentDetail extends React.Component {

  state = {
    showModal: false,
    activeTab: '1',
    submitSuccess: false,
    agreedToTerms: false,
    submittingPayment: false,
    submitError: false,
  }

  onOpenModal = () => {
    this.setState({ showModal: true })
  }

  onCloseModal = () => {
    this.setState({ returnItems:{}, showModal: false, submitError: false })
  }

  handleConfirmPayment = () => {
    const {
      returnItems,
      submittingPayment
    } = this.state
    if (!submittingPayment) {
      this.setState({submittingPayment: true})
      postRMA(returnItems).then(
        (response) => {
          if (response.ok) {
            this.setState({ submittingPayment: true }, ()=>{this.onOpenModal()})
            setTimeout(function () {
              window.location.replace('https://preprod.airlinehyd.com/MyAccount.aspx?section=Invoices')
            }, 2000);
          } else {
            this.setState({ submitError: true, submittingPayment: false }, ()=>{this.onOpenModal()})
          }
        }
      )
    }
  }

  render(){
    const {
      selectedInvoice,
      submitSuccess,
      clearSelectedInvoice
    } = this.props

    const {
      agreedToTerms,
      showModal,
      submitError
    } = this.state

      const PaymentTab = (
        <>
          <StyledRMAOrderDetails>
          <StyledRMAList>
            <StyledText0><StyledText1>Order Date: </StyledText1>{orderDate}</StyledText0>
            <StyledText0><StyledText1>Order Number: </StyledText1>{orderNum}</StyledText0>
            <StyledText0><StyledText1>P.O. Number: </StyledText1>{poNum}</StyledText0>
          </StyledRMAList>
          <StyledRMAList>
            <StyledText1>Ship-to Address:</StyledText1>
            <StyledText0>{shippingAddress.Name}</StyledText0>
            <StyledText0>{shippingAddress.Line1}</StyledText0>
            {shippingAddress.Line2 && <StyledText0>{shippingAddress.Line2}</StyledText0>}
            <StyledText0>{shippingAddress.City + ', ' + shippingAddress.State + ' ' + shippingAddress.Zip}</StyledText0>
          </StyledRMAList>
          </StyledRMAOrderDetails>
          <Button onClick={this.handleConfirmPayment} disabled={!agreedToTerms} text='Confirm Payment' inFlight={inFlight} inFlightText={'Sending Payment...'}/>
        </>
      )

      const InvoiceSummaryTab = (
        <>
          <p>insert an invoice summary here</p>
        </>
      )

      return (
        <>
          <AccountSectionHeader
            text={`Invoice Payment #${selectedInvoice.invoiceNum}`}
          />
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggle('1'); }}
              >
                Payment
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}
              >
                Invoice Details
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              {PaymentTab}
            </TabPane>
            <TabPane tabId="2">
              {InvoiceSummaryTab}
            </TabPane>
          </TabContent>
          <ActionBar>
            <Button text='Back' color={'secondary'} onClick={() => {clearSelectedInvoice()}} />
          </ActionBar>
          <Modal open={showModal} onClose={this.onCloseModal} showCloseIcon={!submitSuccess} closeOnOverlayClick={!submitSuccess} center>
            <ConfirmationModal submitSuccess={submitSuccess} invoiceNum={selectedInvoice.invoiceNum} submitError={submitError} />
          </Modal>
        </>
      )
    }
}

export default InvoicePaymentDetail
