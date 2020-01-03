import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import _ from 'lodash'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
// import OrderSummary from './uiComponents/orderSummary'
import CheckoutWizard from './checkoutWizard'

const DivContainer = styled.div`
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
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

export default function CheckoutPage({history}) {
  const [currentStep, setCurrentStep] = useState(0)

  return(
    <DivContainer>
      <DivCheckoutCol>
        <Div>
          <DivRow>
            <H3>Checkout</H3>
          </DivRow>
        </Div>
        <CheckoutWizard step={currentStep} />
        <button onClick={()=>{setCurrentStep(currentStep - 1)}}>Previous</button>
        <button onClick={()=>{setCurrentStep(currentStep + 1)}}>Next</button>
      </DivCheckoutCol>
      <DivOrderTotalCol>
        {/* <OrderSummary/> */}
      </DivOrderTotalCol>
    </DivContainer>
  )
}