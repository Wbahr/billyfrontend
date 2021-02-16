import React, { useState } from 'react'
import styled from 'styled-components'
import { CardElement } from '@stripe/react-stripe-js'

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

const cardStyle = {
    style: {
        base: {
            color: '#32325d',
            fontFamily: 'Arial, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
                color: '#32325d'
            }
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
        }
    }
}

export default function StripePaymentSection({ setCardIsValid }) {
    const [error, setError] = useState(null)

    const handleChange = async (event) => {
        setCardIsValid(event.complete && !event.error)
        setError(event.error ? event.error.message : '')
    }

    return (
        <Container>
            <Label>Credit Card</Label>
            <Div>
                <CardElement style={cardStyle} onChange={handleChange}/>
                <p>{error}</p>
            </Div>
        </Container>
    )
}
