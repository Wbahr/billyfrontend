import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import _ from 'lodash'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
// import OrderSummary from './uiComponents/orderSummary'
import CheckoutWizard from './checkoutWizard'
import Context from '../../config/context'

const DivContainer = styled.div`
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  flex-grow: inherit;
`

const DivCheckoutCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 1000px;
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
  border-bottom: 1px grey solid;
  margin-top: 24px;
`

const DivRow = styled.div`
  display: flex;
  justify-content: flex-bottom;
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
            <H3>Checkout</H3>
            <Pstep>({stepLabel[currentStep]})</Pstep>
          </DivRow>
        </Div>
        <Context.Consumer>
          {({cart}) => (<CheckoutWizard step={currentStep} shoppingCart={cart}/>)}
        </Context.Consumer>
        <DivNavigation>
          {currentStep === 0 && <button onClick={()=>history.push('/cart')}>Back to Cart</button>}
          {currentStep > 0 && <button disable={disablePrevious} onClick={()=>{setCurrentStep(currentStep - 1)}}>Previous</button>}
          {currentStep < (stepLabel.length - 1) && <button disable={disableNext} onClick={()=>{setCurrentStep(currentStep + 1)}}>Continue</button>}
          {currentStep === (stepLabel.length - 1) && <button disable={disableSubmit} onClick={()=>{console.log('confirm')}}>Submit</button>}
        </DivNavigation>
      </DivCheckoutCol>
      <DivOrderTotalCol>
        {/* <OrderSummary/> */}
      </DivOrderTotalCol>
    </DivContainer>
  )
}