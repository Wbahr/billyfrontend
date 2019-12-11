import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import _ from 'lodash'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import ShoppingCart from './uiComponents/shoppingCart'
import SubtotalBox from './uiComponents/subtotalBox'
import OrderSummary from './uiComponents/orderSummary'

const DivContainer = styled.div`
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
`

const DivShoppingCartCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
`

const DivOrderTotalCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
`

export default function ShoppingCartPage() {

  return(
    <DivContainer>
      <DivShoppingCartCol>
        <ShoppingCart/>
        <SubtotalBox/>
      </DivShoppingCartCol>
      <DivOrderTotalCol>
        <OrderSummary/>
      </DivOrderTotalCol>
    </DivContainer>
  )
}