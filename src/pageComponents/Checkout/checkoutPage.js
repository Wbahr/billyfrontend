import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import _ from 'lodash'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
// import OrderSummary from './uiComponents/orderSummary'

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

export default function CheckoutPage({history}) {
  const [currentPage, setCurrentPage] = useState(0)

  return(
    <DivContainer>
      <DivCheckoutCol>

      </DivCheckoutCol>
      <DivOrderTotalCol>
        {/* <OrderSummary/> */}
      </DivOrderTotalCol>
    </DivContainer>
  )
}