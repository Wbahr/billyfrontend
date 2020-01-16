import React, { useState, useEffect, useRef, useContext } from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import _ from 'lodash'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag'
import ShoppingCartItem from './shoppingCartItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {DebounceInput} from 'react-debounce-input'
import Context from '../../../config/context'
import { formatCurrency } from '../../_common/helpers/generalHelperFunctions'
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 16px 8px;
`

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
  justify-content: center;
  background-color: #db1633;
  background-image: linear-gradient(to top left, #950f23, #DB1633);
  color: white;
  padding: 8px 16px;
  cursor: pointer;
  width: 250px;
  margin: 4px 0;
  box-shadow: 1px 1px 2px #000;
  p {
    margin: 0;
    margin-left: 8px;
    font-size: 18px;
    font-weight: 500;
  }
`

const DivQuoteButton = styled(DivCheckoutButton)`
  background-image: none;
  background-color: #535353;
`

const DivShoppinglistButton = styled(DivCheckoutButton)`
  background-image: none;
  background-color: white;
  color: #535353;
  border: 2px solid #535353;
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


export default function SubtotalBox({history}) {
  const [price, setPrice] = useState(0)
  const context = useContext(Context)
  
  return(
    <Container>
      <Context.Consumer>
        {({ setOrderNotes, orderNotes }) => (
          <DebounceInput
            element="textarea"
            minLength={2}
            debounceTimeout={300}
            onChange={e => setOrderNotes(e.target.value)} 
            placeholder='Type Order Notes here'
            style={{'width': '600px'}}
            value={orderNotes}
          />
        )}
      </Context.Consumer>

      <Div>
        <h5>Subtotal: $100.00</h5>
        { context.cart.length > 0 &&
        <>
          <DivCheckoutButton onClick={()=>history.push('/checkout')}>
            <FontAwesomeIcon icon="lock" color="white"/>
            <p>Start Secure Checkout</p>
          </DivCheckoutButton>
          <DivQuoteButton>
            <p>Create a Quote</p>
          </DivQuoteButton>
          <DivShoppinglistButton>
            <p>Save to Shopping List</p>
          </DivShoppinglistButton>
        </>
        }

      </Div>
    </Container>
  )
}