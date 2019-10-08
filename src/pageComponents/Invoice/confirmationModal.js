import React from 'react'
import styled from 'styled-components'

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

class ConfirmationModal extends React.Component {

  render(){
    const {
      submitSuccess
    } = this.props

    if (submitSuccess) {
      return(
        <DivContainer>
          <StyledHeaderDiv>
            <PHeader>Invoice Payment Submitted</PHeader>
            <p>You will now be redirected to the Invoice Screen</p>
          </StyledHeaderDiv>
        </DivContainer>
      )
    } else {
      return(
        <DivContainer>
          <StyledHeaderDiv>
            <PHeader>Error</PHeader>
            <p>There was a problem submitting your payment. Please contact us at 1-800-555-5555</p>
          </StyledHeaderDiv>
        </DivContainer>
      )
    }
  }
}

export default ConfirmationModal
