import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import Button from '../common/button'
import {StyledText0, StyledText1} from '../../styles/fonts'
import Callout from '../common/callout'

const DivContainer = styled.div`
  width: 500px;
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
  padding: 10px 0;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
`

const DivAgree = styled.div`
  display: flex;
  justify-content: center;
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

// const PReturnSubmitted = styled(StyledText0)`
//   display: flex;
//   justify-content: center;
//   align-content: center;
// `

class SummaryModal extends React.Component {

  state = {
    reviewedSummary: false
  }

  componentWillMount() {

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

  render(){
    let itemBars = []
    let propItems = [{
      'quantityReturn': 2,
      'total': '$23.00',
      'name': 'Motor Gear'
    }]
    if (propItems.length > 0) {
      _.each(propItems, (item) => {
        itemBars.push(
          <DivItem>
            <PItemDetail>
              <StyledText1>{`Item #DKE-2429482393 - (Qty ${item.quantityReturn})`}</StyledText1>
              <StyledText0>{item.total}</StyledText0>
            </PItemDetail>
            <PItemDetail>
              <StyledText0>{item.name}</StyledText0>
              <PItemRestockingFee as='div'>Restocking Fee: -$5.42</PItemRestockingFee>
            </PItemDetail>
          </DivItem>
        )
      })
    } else {
      itemBars = (
        <Callout text='No Items selected for Return' />
      )
    }
    return(
      <DivContainer>
        <StyledHeaderDiv>
          <PHeader>Return Summary</PHeader>
        </StyledHeaderDiv>
        <DivItemlist>
          {itemBars}
          <DivTotal as='div'>
            {propItems.length === 0 ? null : 'Total: $48.81'}
          </DivTotal>
          <DivAgree>
            <input id='agree' type='checkbox' disabled={propItems.length === 0} onChange={this.toggleCheckbox} value={this.state.reviewedSummary} />
            <label for='agree'>I've reviewed the above return Summary.*</label>
          </DivAgree>
        </DivItemlist>
        <DivActionbar>
          <Button color='secondary' onClick={this.handleOnClose} text='Cancel' />
          <Button onClick={this.handleConfirmReturn} disabled={!this.state.reviewedSummary} text='Confirm Return' />
        </DivActionbar>
      </DivContainer>
      // <DivContainer>
      //   <PReturnSubmitted as='div'>
      //     Your return is now being processed. Please look at for an email with addition instructions. Thank you.
      //   </PReturnSubmitted>
      //   <Button onClick={this.handleOnClose} text='OK' />
      // </DivContainer>
    )
  }
}

export default SummaryModal
