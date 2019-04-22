import React from 'react'
import styled from 'styled-components'
import Button from '../common/button'

const DivContainer = styled.div`
  width: 500px;
`

const PHeader = styled.p`
  color: red;
  font-size: 16px;
  font-family: veranda;
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
        <PHeader>
          Return Summary
        </PHeader>
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
