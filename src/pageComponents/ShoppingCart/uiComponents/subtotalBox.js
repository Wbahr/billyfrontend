import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import _ from 'lodash'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag'
import Context from '../../../config/context'
import ShoppingCartItem from './shoppingCartItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 200px;
  margin-left: auto;
  padding-right: 16px;
  align-items: flex-end;
`

const DivCheckoutButton = styled.div`
  display: flex;
  align-items: center;
  background-color: black;
  color: white;
  padding: 8px 16px;
  cursor: pointer;
  p {
    margin: 0;
    margin-left: 8px;
    font-size: 18px;
    font-weight: 600;
  }
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


export default function SubtotalBox() {
  return(
    <Div>
      <p>Subtotal: $100.00</p>
      <DivCheckoutButton>
        <FontAwesomeIcon icon="lock" color="white"/>
        <p>Start Secure Checkout</p>
      </DivCheckoutButton>
    </Div>
  )
}