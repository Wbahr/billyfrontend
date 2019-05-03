import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import Button from '../common/button'
import {StyledText0, StyledText1} from '../../styles/fonts'
import Callout from '../common/callout'

const DivContainer = styled.div`
  width: 500px;
  
  @media (max-width: 700px) {
    width: 300px;
  }
`

const StyledHeaderDiv = styled.div`
   width: 100%;
   height: 36px;
   border-bottom: 1px solid #ccc;
   margin-bottom: 16px;
`
const PHeader = styled.p`
   color: #DB1633;
   font-family: verdana;
   font-size: 18px;
   font-weight: bold;
   padding: 8px 0 8px 8px;
`

const DivItemlist = styled.div`
  display: flex;
  flex-direction: column;
`

const DivItem = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #F8F9F9;
  padding: 10px;
  margin: 10px 0;
`
const DivTotal = styled(StyledText1)`
  display: flex;
  justify-content: flex-end;
  padding: 10px 8px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
`

const DivAgree = styled.div`
  display: flex;
  justify-content: center;
  background: #eff8ff;
`

const PItemDetail = styled.div`
  display: flex;
  justify-content: space-between;
`

const PItemRestockingFee = styled(StyledText0)`
  color: red;
`

const DivActionbar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
`

const InputAgree = styled.input`
  cursor: pointer;
`

// const PReturnSubmitted = styled(StyledText0)`
//   display: flex;
//   justify-content: center;
//   align-content: center;
// `

const restockFee = function(total) {
  let restockFee = (total * 0.25).toFixed(2)
  return restockFee
}

class SummaryModal extends React.Component {

  state = {
    reviewedSummary: false,
    totalRefund: 0,
    minimumRestockingFee: false
  }

  componentWillMount() {
    this.calculateRefundAndFee(this.props.returnItems)
  }

  handleConfirmReturn = () => {
    const {
      onConfirmReturn
    } = this.props

    onConfirmReturn()
  }

  handleOnClose = () => {
    const {
      onClose
    } = this.props
    onClose()
  }

  toggleCheckbox = () => {
    this.setState({reviewedSummary: !this.state.reviewedSummary})
  }

  calculateRefundAndFee = (returnItems) => {
    let totalRefund = 0
    let totalRestockingFee = 0
    let minRestockingFee = 15
    let restockingPercentage = 0.25

    for(let i = 0; i < returnItems.length; i++) {
      let item = returnItems[i]
      if (item.hasReturnFee) {
        totalRestockingFee += (item.returnQuantity * item.unitPrice) * restockingPercentage
      }
      totalRefund = totalRefund + (item.returnQuantity * item.unitPrice)
    }
    if (totalRestockingFee < minRestockingFee && totalRestockingFee !== 0) {
      totalRefund = totalRefund - minRestockingFee
      this.setState({totalRefund: totalRefund.toFixed(2), minimumRestockingFee: true})
    } else {
      totalRefund = totalRefund - totalRestockingFee
      this.setState({totalRefund: totalRefund.toFixed(2)})
    }
  }

  render(){
    const {
      returnItems,
      inFlight
    } = this.props

    const {
      reviewedSummary,
      totalRefund,
      minimumRestockingFee
    } = this.state

    let itemBars = []

    if (returnItems.length > 0) {
      _.each(returnItems, (item) => {
        itemBars.push(
          <DivItem>
            <PItemDetail>
              <StyledText1>{`AHC-${item.frecnoNum} - (Qty ${item.returnQuantity})`}</StyledText1>
              <StyledText0>{`$${(item.returnQuantity * item.unitPrice).toFixed(2)}`}</StyledText0>
            </PItemDetail>
            <PItemDetail>
              <StyledText0>{`Item ID: ${item.itemId}`}</StyledText0>
              {item.hasReturnFee ? <PItemRestockingFee as='div'>{`Restocking Fee: $${(item.returnQuantity * item.unitPrice * 0.25).toFixed(2)}`}</PItemRestockingFee> : null}
            </PItemDetail>
          </DivItem>
        )
      })
    } else {
      itemBars = (
        <Callout text='No Items selected for Return' />
      )
    }

    let agreementText = minimumRestockingFee ? 'I\'ve reviewed the above return Summary. Note that the minimum restocking fee is $15.00' : 'I\'ve reviewed the above return Summary.'
    return(
      <DivContainer>
        <StyledHeaderDiv>
          <PHeader>Return Summary</PHeader>
        </StyledHeaderDiv>
        <DivItemlist>
          {itemBars}
          <DivTotal as='div'>
            {returnItems.length === 0 ? null : `Total: $${totalRefund}`}
          </DivTotal>
          <DivAgree>
            <InputAgree id='agree' type='checkbox' disabled={returnItems.length === 0} onChange={this.toggleCheckbox} value={this.state.reviewedSummary} />
            <InputAgree as='label' for='agree'>{agreementText}</InputAgree>
          </DivAgree>
        </DivItemlist>
        <DivActionbar>
          <Button color='secondary' onClick={this.handleOnClose} text='Cancel' />
          <Button onClick={this.handleConfirmReturn} disabled={!reviewedSummary} text='Confirm Return' inFlight={inFlight} inFlightText={'Confirming...'} />
        </DivActionbar>
      </DivContainer>
    )
  }
}

export default SummaryModal
