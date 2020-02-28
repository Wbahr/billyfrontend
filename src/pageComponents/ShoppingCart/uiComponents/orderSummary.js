import React, { useState, useEffect, useRef, useContext } from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import _ from 'lodash'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag'
import Context from '../../../config/context'
import ShoppingCartItem from './shoppingCartItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
  width: 300px;
  min-width: 250px;
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

const DivQuoteButton = styled(DivCheckoutButton)`
  background-image: none;
  background-color: #535353;
`

export default function OrderSummary({history}) {
  const [couponCode, setCouponCode] = useState('')
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
          <p>(TBD - At Checkout)</p>
        </DivLineItem>
        <DivLineItem>
          <p>Shipping</p>
          <p>(TBD)</p>
        </DivLineItem>
        {/* <DivLineItem>
          <input placeholder='Coupon Code' value={couponCode} onChange={(e)=>setCouponCode(e.target.value)}/>
          <button>Apply</button>
        </DivLineItem>    */}
        <DivLineItemTotal>
          <p>Total (without tax) {formatCurrency(Number(context.cartPricing.subTotal) + Number(context.cartPricing.tariff))}</p>
        </DivLineItemTotal>
        {context.cart.length > 0 &&
          <DivButtonContainer>
            <Context.Consumer>
              {({userInfo}) => {
                if (_.isNil(userInfo) || (!_.isNil(userInfo) && userInfo.role !== "AirlineEmployee")){
                  return(
                    <DivCheckoutButton onClick={()=>history.push('/checkout')}>
                      <FontAwesomeIcon icon="lock" color="white"/>
                      <p>Start Secure Checkout</p>
                    </DivCheckoutButton>
                  )
                }
              }}        
            </Context.Consumer>
            <Context.Consumer>
              {({userInfo}) => {
                if (!_.isNil(userInfo) && (userInfo.role === "AirlineEmployee" || userInfo.role === "Impersonator")){
                  return(
                    <DivQuoteButton onClick={()=>history.push('/create-quote')}>
                      <FontAwesomeIcon icon='file-invoice-dollar' color="white"/>
                      <p>Create a Quote</p>
                    </DivQuoteButton>
                  )
                }
              }}        
            </Context.Consumer>
          </DivButtonContainer>
        }
      </Div>
    </>
  )
}