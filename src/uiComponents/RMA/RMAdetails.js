import React from 'react'
import styled from 'styled-components'
import AccountSectionHeader from './accountSectionHeader'
import 'react-table/react-table.css'
import { StyledText0, StyledText1 } from '../../styles/fonts'
import RMAform from './RMAform'
import Modal from 'react-responsive-modal'
import SummaryModal from './summaryModal'
import { formatRMAFormData, postRMA } from './helpers/formatRMAFormData'

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
      this.setState({submittingReturn: true}, postRMA(returnItems).then(
        function(response) {
          console.log('response')
        }
      ))
    }
  }

  handleClickContinue = (returnItems) => {
    let mutatedReturnItems = formatRMAFormData(returnItems)
    this.setState({ returnItems: mutatedReturnItems})
    this.onOpenModal()
  }

  render(){
    const {
      selectedOrder:{
        orderDate,
        orderNum,
        poNum,
        total,
        shippingAddress,
        items
      }
    } = this.props

    const {
      showModal,
      returnItems
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

    return(
      <React.Fragment>
        <AccountSectionHeader
          text={`RMA - Invoice #${orderNum}`}
        />
        <StyledRMAOrderDetails>
          <StyledRMAList>
            <StyledText0><StyledText1>Order Date: </StyledText1>{orderDate}</StyledText0>
            <StyledText0><StyledText1>Order Number: </StyledText1>{orderNum}</StyledText0>
            <StyledText0><StyledText1>P.O. Number: </StyledText1>{poNum}</StyledText0>
            <StyledText0><StyledText1>Order Total: </StyledText1>{total}</StyledText0>
          </StyledRMAList>
          <StyledRMAList>
            <StyledText1>Ship-to Address:</StyledText1>
            <StyledText0>{shippingAddress.name}</StyledText0>
            <StyledText0>{shippingAddress.address1}</StyledText0>
            <StyledText0>{shippingAddress.city + ', ' + shippingAddress.state + ' ' + shippingAddress.zip}</StyledText0>
          </StyledRMAList>
        </StyledRMAOrderDetails>
        <RMAform
          items={items}
          clickedContinue={this.handleClickContinue}
        />
        <Modal open={showModal} onClose={this.onCloseModal} showCloseIcon={false} center>
          <SummaryModal returnItems={returnItems} onConfirmReturn={this.onConfirmReturn} onClose={this.onCloseModal}/>
        </Modal>
      </React.Fragment>
    )
  }
}

export default RMAdetails
