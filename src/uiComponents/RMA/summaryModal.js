import React from 'react'
import styled from 'styled-components'
import Button from '../common/button'

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
`

const DivActionbar = styled.div`
  display: flex;
  justify-content: space-between;
`

class SummaryModal extends React.Component {

  handleConfirmReturn = () => {
    console.log('confirmed return')
  }

  handleOnClose = () => {
    const {
      onClose
    } = this.props
    onClose()
  }

  render(){
    return(
      <DivContainer>
        <StyledHeaderDiv>
          <PHeader>Return Summary</PHeader>
        </StyledHeaderDiv>
        <DivItemlist>
          <DivItem></DivItem>
        </DivItemlist>
        <DivActionbar>
          <Button onClick={this.handleOnClose} text='Cancel' />
          <Button onClick={this.handleConfirmReturn} text='Confirm Return' />
        </DivActionbar>
      </DivContainer>
    )
  }
}

export default SummaryModal
