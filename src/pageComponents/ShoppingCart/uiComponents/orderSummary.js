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
  height: 350px;
  margin-left: auto;
  padding: 16px;
  align-items: flex-end;
  background-color: whitesmoke;
  position: -webkit-sticky;
  position: sticky;
  top: 125px;
`

const H4 = styled.h4`
  width: 100%;
  font-family: ProximaBold;
  text-transform: uppercase;
  padding-left: 4px;
  border-bottom: 1px solid darkgrey;
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

const DivQuoteButton = styled(DivCheckoutButton)`
  background-image: none;
  background-color: #535353;
`

const H5 = styled.h5`
  margin: 0 0 2px 4px;
`

const Ashare = styled.a`
  margin-right: 4px
`

const DivShare = styled.div`
  cursor: pointer;
  margin-right: 4px;
`

const DivShoppingCartCol = styled.div`
  display: flex;
  flex-direction: column;
`

const DivOrderTotalCol = styled.div`
  display: flex;
  flex-direction: column;
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
          <p>(Calculated at Checkout)</p>
        </DivLineItem>
        <DivLineItem>
          <input placeholder='Coupon Code' value={couponCode} onChange={(e)=>setCouponCode(e.target.value)}/>
          <button>Apply</button>
        </DivLineItem>   
        <p>Total (without tax) {formatCurrency(Number(context.cartPricing.subTotal) + Number(context.cartPricing.tariff))}</p>
        {context.cart.length > -1 &&
          <DivButtonContainer>
            <DivCheckoutButton onClick={()=>history.push('/checkout')}>
              <FontAwesomeIcon icon="lock" color="white"/>
              <p>Start Secure Checkout</p>
            </DivCheckoutButton>
            <DivQuoteButton>
              <p>Create a Quote</p>
            </DivQuoteButton>
          </DivButtonContainer>
        }

      </Div>
    </>
  )
}