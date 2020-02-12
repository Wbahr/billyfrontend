import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import { CardElement } from 'react-stripe-elements'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Div = styled.div`
  width: 450px;
  border: 1px solid #e1e1e1;
  padding: 8px;
  margin: 12px 8px;
`
const Label = styled.label`
  color: #606060;
  font-size: 14px;
  font-weight: 400;
  padding-left: 4px;
  margin-bottom: -16px;
  background-color: white;
  width: max-content;
  padding: 2px;
  margin-left: 14px;
`

export default function StripePaymentSection({stripe}) {

  function handleTestCC(){
    stripe.PaymentMethod.create(type="card").then(function(result) {
      console.log('stripe test', result)
    })
  }
  return(
    <Container>
      <Label>Credit Card</Label>
      <Div>
        <CardElement style={{
          base: {
            fontSize: '18px',
            backgroundColor: 'white'
          }
        }} 
        />
      </Div>
      {/* <button onClick={()=>handleTestCC()}>Test Credit Card</button> */}
    </Container>
  )
}