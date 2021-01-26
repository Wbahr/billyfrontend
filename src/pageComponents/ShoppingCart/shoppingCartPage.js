import React  from 'react'
import styled from 'styled-components'
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

export default function ShoppingCartPage(props) {
	
  return (
    <DivContainer>
      <DivShoppingCartCol>
        <ShoppingCart history={props.history}/>
        <SubtotalBox history={props.history}/>
      </DivShoppingCartCol>
			
      <DivOrderTotalCol>
        <OrderSummary history={props.history}/>
      </DivOrderTotalCol>
    </DivContainer>
  )
}