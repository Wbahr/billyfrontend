import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import _ from 'lodash'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag'
import Context from '../../../config/context'
import ShoppingCartItem from './shoppingCartItem'

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

const ShoppingCartItems = (
    <Context.Consumer>
    {({cart, emptyCart}) => (
      cart.map((item)=>{
        return(
          <ShoppingCartItem
            item={item}
            emptyCart={emptyCart}
          />
        )
      })
    )}
  </Context.Consumer>
)
export default function ShoppingCart() {

  return(
    <>
      <div>
        <p>Shopping Cart</p>
        <a>Share</a>
      </div>
      {ShoppingCartItems}
    </>
  )
}