import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import _ from 'lodash'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
// import OrderSummary from './uiComponents/orderSummary'
import CheckoutWizard from './checkoutWizard'
import Context from '../../config/context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonRed, ButtonBlack } from '../../styles/buttons'

const DivContainer = styled.div`
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  flex-grow: inherit;
`

const DivCheckoutCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 920px;
  @media(max-width: 1000px) {
    width: 100%;
  }
`

const DivOrderTotalCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  @media(max-width: 1400px) {
    display: none;
  }
`

const Div = styled.div`
  display: flex;
  justify-content: space-between;
`

const DivRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-bottom;
  margin: 0 20px 0 20px;
  p {
    cursor: pointer;
    color: grey;
    margin: 0 0 2px 12px;
    align-self: flex-end;
    font-size: 12px;
  }
`

const H3 = styled.h3`
  font-family: ProximaBold;
  text-transform: uppercase;
  padding-left: 8px;
  margin: 0 0 2px 4px;
`

const Pstep = styled.span`
  font-family: ProximaBold;
  text-transform: uppercase;
  font-size: 20px;
`

const DivNavigation = styled.div`
  display: flex;
  justify-content: space-between;
`

const Container = styled.div`
  margin: 20px;
  font-family: helvetica-neue-light,Helvetica Neue,Helvetica,Arial,sans-serif;
  font-size: 18px;
  height: 100%;
  border: 1px solid whitesmoke;
  padding: 5px 20px;
`

const Pformheader = styled.p`
  margin: 0;
  font-family: ProximaBold;
  text-transform: uppercase;
`

export default function CheckoutPage({history}) {
  const [currentStep, setCurrentStep] = useState(0)
  const [disablePrevious, setDisablePrevious] = useState(false)
  const [disableNext, setDisableNext] = useState(false)
  const [disableSubmit, setDisableSubmit] = useState(false)
  const stepLabel = ['Shipping Schedule','Ship To','Bill To','Confirmation']

  return(
    <DivContainer>
      <DivCheckoutCol>
        <Div>
          <DivRow>
            <FontAwesomeIcon icon="lock" />
            <H3>Checkout</H3>
          </DivRow>
        </Div>
        <Container>
          <Pformheader>{stepLabel[currentStep]}</Pformheader>
          <Context.Consumer>
            {({cart}) => (<CheckoutWizard step={currentStep} shoppingCart={cart}/>)}
          </Context.Consumer>
        </Container>
        <DivNavigation>
          {currentStep === 0 && <ButtonBlack onClick={()=>history.push('/cart')}>Back to Cart</ButtonBlack>}
          {currentStep > 0 && <ButtonBlack disable={disablePrevious} onClick={()=>{setCurrentStep(currentStep - 1)}}>Previous</ButtonBlack>}
          {currentStep < (stepLabel.length - 1) && <ButtonRed disable={disableNext} onClick={()=>{setCurrentStep(currentStep + 1)}}>Continue</ButtonRed>}
          {currentStep === (stepLabel.length - 1) && <ButtonRed disable={disableSubmit} onClick={()=>{console.log('confirm')}}>Submit</ButtonRed>}
        </DivNavigation>
      </DivCheckoutCol>
      <DivOrderTotalCol>
        {/* <OrderSummary/> */}
      </DivOrderTotalCol>
    </DivContainer>
  )
}