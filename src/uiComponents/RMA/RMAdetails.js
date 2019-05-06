import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import 'react-table/react-table.css'

import AccountSectionHeader from './accountSectionHeader'
import { StyledText0, StyledText1 } from '../../styles/fonts'
import RMAform from './RMAform'
import Loader from '../common/loader'
import Modal from 'react-responsive-modal'
import SummaryModal from './summaryModal'
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
    returnItems: [],
    submittingReturn: false,
    selectedOrder: null,
    postResponse: null,
    submitError: false,
    submitSuccess: false,
    rmaNum: null
  }

  componentWillMount() {
    const location = queryString.parse(location.search)
    let invoice = _.get(location, 'invoice', '')
    getInvoice(invoice).then(
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
      console.log('item', item)
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
    this.setState({returnItems:{}, showModal: false})
  }

  onConfirmReturn = () => {
    const {
      returnItems,
      submittingReturn
    } = this.state
    if (!submittingReturn) {
      this.setState({submittingReturn: true})
      postRMA(returnItems).then(
        function(response) {
          console.log('response', response)
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

  handleClickContinue = (returnItems) => {
    let mutatedReturnItems = formatRMAFormData(returnItems)
    this.setState({ returnItems: mutatedReturnItems})
    this.onOpenModal()
  }

  render(){
    const {
      selectedOrder,
      showModal,
      returnItems,
      submittingReturn,
      rmaNum,
      submitError,
      submitSuccess
    } = this.state

    if (_.isNil(selectedOrder)) {
      return (
        <Loader />
      )
    } else {
      const {
        selectedOrder: {
          orderDate,
          orderNum,
          invoiceNum,
          poNum,
          shippingAddress,
          items
        }
      } = this.state

      let initialFormValues = items
      for (let i = 0; i < items.length; i++) {
        initialFormValues[i].willReturn = false
        initialFormValues[i].returnQuantity = 0
        initialFormValues[i].returnReason = ''
        initialFormValues[i].refundType = ''
        initialFormValues[i].otherDesc = ''
        initialFormValues[i].details = ''
      }

      return (
        <React.Fragment>
          <AccountSectionHeader
            text={`RMA - Invoice #${invoiceNum}`}
          />
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
          <Modal open={showModal} onClose={this.onCloseModal} showCloseIcon={false} center>
            <SummaryModal submitSuccess={submitSuccess} rmaNum={rmaNum} submitError={submitError} returnItems={returnItems} onConfirmReturn={this.onConfirmReturn} inFlight={submittingReturn} onClose={this.onCloseModal}/>
          </Modal>
        </React.Fragment>
      )
    }
  }
}

export default RMAdetails
