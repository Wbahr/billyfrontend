import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import AccountSectionHeader from '../common/sectionHeader'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import 'react-table/react-table.css'
import { StyledText0, StyledText1 } from '../../styles/fonts'
import RMAform from './RMAform'
import Modal from 'react-responsive-modal'
import ConfirmationModal from './confirmationModal'
import { formatRMAFormData } from './helpers/formatRMAFormData'
import { getInvoice, postRMA } from '../../api-temp/apiCalls'

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

class RMAdetails extends React.Component {

  state = {
    showModal: false,
    activeTab: '1',
    submitSuccess: false
  }

  componentWillMount() {
    // const location = queryString.parse(location.search)
    // let invoice = _.get(location, 'invoice', '12209770')
    getInvoice('12209770').then(
      (response) => this.selectedOrderMutator(response)
    ).then(
      (mutatedResponse) => {this.setState({ selectedOrder: mutatedResponse }, ()=> console.log('selected order', this.state.selectedOrder))}
    )
  }

  selectedOrderMutator = (value) => {
    if (_.has(value,'error')){
      return null
    }
    let mutatedValue = {}
    mutatedValue.shippingAddress = value.ShipToAddress
    mutatedValue.orderNum = value.Order.OrderNumber
    mutatedValue.poNum = value.Order.PoNumber
    mutatedValue.orderDate = value.Order.OrderDate.Display
    mutatedValue.invoiceNum = value.InvoiceNumber
    let items = []
    for (let i = 0; i < value.InvoiceDetails.length; i++) {
      let item = value.InvoiceDetails[i]
      let itemObj = {}
      itemObj.itemId = item.Item.ItemCode
      itemObj.frecnoNum = item.Item.Id
      itemObj.customerPartNum = item.Item.ItemCode
      itemObj.itemDesc = item.Item.ItemDescription
      itemObj.quantityOrdered = 1
      itemObj.quantityShipped = 1
      itemObj.unitPrice = '500.00'
      items.push(itemObj)
    }
    mutatedValue.items = items
    return mutatedValue
  }

  onOpenModal = () => {
    this.setState({showModal: true})
  }

  onCloseModal = () => {
    this.setState({returnItems:{}, showModal: false, submitError: false})
  }

  onConfirmReturn = () => {
    const {
      returnItems,
      submittingReturn
    } = this.state
    if (!submittingReturn) {
      this.setState({submittingReturn: true})
      postRMA(returnItems).then(
        (response) => {
          if (response.ok) {
            this.setState({ submitSuccess: true })
            setTimeout(function () {
              window.location.replace('https://preprod.airlinehyd.com/MyAccount.aspx?section=Invoices')
            }, 2000);
          } else {
            this.setState({ submitError: true, submittingReturn: false })
          }
        }
      )
    }
  }

  handleClickContinue = () => {
    this.onOpenModal()
  }

  render(){
    const {
      selectedInvoice,
      submitSuccess
    } = this.props

      let initialFormValues = items
      for (let i = 0; i < items.length; i++) {
        initialFormValues[i].willReturn = false
        initialFormValues[i].returnQuantity = 0
        initialFormValues[i].returnReason = ''
        initialFormValues[i].refundType = ''
        initialFormValues[i].otherDesc = ''
        initialFormValues[i].details = ''
      }

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
          <RMAform
          items={items}
          clickedContinue={this.handleClickContinue}
          />
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
          <Modal open={showModal} onClose={this.onCloseModal} showCloseIcon={!submitSuccess} closeOnOverlayClick={!submitSuccess} center>
            <ConfirmationModal submitSuccess={submitSuccess} invoiceNum={selectedInvoice.invoiceNum} submitError={submitError} returnItems={returnItems} onConfirmReturn={this.onConfirmReturn} inFlight={submittingReturn} onClose={this.onCloseModal}/>
          </Modal>
        </>
      )
    }
  }
}

export default RMAdetails
