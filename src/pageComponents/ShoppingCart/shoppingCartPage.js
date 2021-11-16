import React, { useEffect }  from 'react'
import styled from 'styled-components'
import ShoppingCart from './uiComponents/shoppingCart'
import SubtotalBox from './uiComponents/subtotalBox'
import OrderSummary from './uiComponents/orderSummary'
import { Helmet } from 'react-helmet'

const DivContainer = styled.div`
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
`

const DivShoppingCartCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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

    useEffect(() => {
        window.scrollTo({ top: 0 })
    }, [])
	
    return (
        <DivContainer>
            <Helmet>
                <title>Airline Hydraulics | Cart</title>
            </Helmet>
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