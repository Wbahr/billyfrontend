import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import _ from 'lodash'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import ShoppingCart from './uiComponents/shoppingCart'

const DivContainer = styled.div`
  display: flex;
`

const DivShoppingCartCol = styled.div`
  display: flex;
  flex-direction: column;
`

const DivOrderTotalCol = styled.div`
  display: flex;
  flex-direction: column;
`

export default function ShoppingCartPage() {

  return(
    <DivContainer>
      <DivShoppingCartCol>
        <ShoppingCart/>
      </DivShoppingCartCol>
      <DivOrderTotalCol>
      </DivOrderTotalCol>
    </DivContainer>
  )
}