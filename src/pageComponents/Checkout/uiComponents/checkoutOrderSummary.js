import React, { useState, useEffect, useRef, useContext } from 'react'
import styled from 'styled-components'
// import queryString from 'query-string'
import _ from 'lodash'
// import { useQuery, useLazyQuery } from '@apollo/react-hooks';
// import gql from 'graphql-tag'
import Context from '../../../config/context'
import { formatCurrency } from '../../_common/helpers/generalHelperFunctions'

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  height: max-content;
  margin-left: auto;
  padding: 16px;
  align-items: flex-end;
  position: -webkit-sticky;
  position: sticky;
  top: 125px;
  margin-top: 85px;
  border: 1px solid lightgrey;
`

const H4 = styled.h4`
  width: 100%;
  font-family: ProximaBold;
  text-transform: uppercase;
  padding-left: 4px;
`

const DivButtonContainer = styled.div `
  margin: auto auto 0 auto;
`

const DivCheckoutButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #db1633;
  background-image: linear-gradient(to top left, #950f23, #DB1633);
  color: white;
  padding: 8px 16px;
  cursor: pointer;
  width: 250px;
  margin: 8px 0;
  box-shadow: 1px 1px 2px #000;
  
  p {
    margin: 0;
    margin-left: 8px;
    font-size: 18px;
    font-weight: 500;
  }
`

const DivLineItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  min-width: 250px;
  align-self: center;
  p {
    margin: 0;
  }
`

const DivLineItemTotal = styled(DivLineItem)`
  justify-content: flex-end;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #001d3d;
  p {
    font-size: 18px;
    font-weight: 600;
  }
`

export default function CheckoutOrderSummary({history}) {
  const context = useContext(Context)

  return(
    <>
      <Div>
        <H4>Order Summary</H4>
        <DivLineItem>
          <p>Subtotal</p>
          <p>{formatCurrency(context.cartPricing.subTotal)}</p>
        </DivLineItem>
        <DivLineItem>
          <p>Tariff</p>
          <p>{formatCurrency(context.cartPricing.tariff)}</p>
        </DivLineItem>        
        <DivLineItem>
          <p>Tax</p>
          <p>(TDB)</p>
        </DivLineItem>
        <DivLineItem>
          <p>Shipping</p>
          <p>(TDB)</p>
        </DivLineItem>
        <DivLineItemTotal>
          <p>Total {formatCurrency(Number(context.cartPricing.subTotal) + Number(context.cartPricing.tariff))}</p>
        </DivLineItemTotal>
      </Div>
    </>
  )
}