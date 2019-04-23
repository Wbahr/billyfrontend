import React from 'react'
import styled from 'styled-components'
import Button from '../common/button'
import {StyledText0, StyledText1} from '../../styles/fonts'

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

const PItemDetail = styled.div`
  display: flex;
  justify-content: space-between;
`

const PItemRestockingFee = styled(StyledText0)`
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  color: red;
`

const DivActionbar = styled.div`
  display: flex;
  justify-content: space-between;
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

  handleConfirmReturn = () => {
    console.log('confirmed return')
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
    return(
      <DivContainer>
        <StyledHeaderDiv>
          <PHeader>Return Summary</PHeader>
        </StyledHeaderDiv>
        <DivItemlist>
          <DivItem>
            <PItemDetail>
              <StyledText1>Valve Cover - Quantity:2</StyledText1>
              <StyledText0>$54.23</StyledText0>
            </PItemDetail>
            <PItemRestockingFee as='div'>Restocking Fee: -$5.42</PItemRestockingFee>
          </DivItem>
          <DivTotal as='div'>
            Return Total: $48.81
          </DivTotal>
          <input id='agree' type='checkbox' onChange={this.toggleCheckbox} value={this.state.reviewedSummary} />
          <label for='agree'>I've reviewed the above return Summary.</label>
        </DivItemlist>
        <DivActionbar>
          <Button type='secondary' onClick={this.handleOnClose} text='Cancel' />
          <Button onClick={this.handleConfirmReturn} disabled={!this.state.reviewedSummary} text='Confirm Return' />
          {/*<p>{this.state.reviewedSummary}</p>*/}
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
