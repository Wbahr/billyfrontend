import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import { CardElement } from 'react-stripe-elements'

const Div = styled.div`
  height: 70px;
  width: 450px;
`

export default function StripePaymentSection({stripe}) {

  function handleTestCC(){
    stripe.createToken().then(function(result) {
      console.log('stripe test', result)
    })
  }
  return(
    <Div>
      <CardElement style={{
        base: {
          fontSize: '18px',
          backgroundColor: 'white'
        }
      }} 
      />
      <button onClick={()=>handleTestCC()}>Test Credit Card</button>
    </Div>
  )
}