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
  justify-content: space-between;
  border-bottom: 1px grey solid;
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
      <Div>
        <H5>Shopping Cart</H5>
        <DivShare>
          <Ashare>Share</Ashare>
          <FontAwesomeIcon icon="share" color="black"/>
        </DivShare>
      </Div>
      {ShoppingCartItems}
    </>
  )
}