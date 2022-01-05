import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import AnnounceBanner from '../_common/AnnounceBanner'
import ShoppingCart from './uiComponents/shoppingCart'
import SubtotalBox from './uiComponents/subtotalBox'
import OrderSummary from './uiComponents/orderSummary'
import { Helmet } from 'react-helmet'
import Context from '../../setup/context'

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

    const {
        alert
    } = useContext(Context)
    
    useEffect(() => {
        window.scrollTo({ top: 0 })
    }, [])

    return (
        <>
            {alert && <AnnounceBanner {...{ alert }} />}
            <DivContainer>
                <Helmet>
                    <title>Airline Hydraulics | Cart</title>
                </Helmet>

                <DivShoppingCartCol>
                    <ShoppingCart />
                    <SubtotalBox />
                </DivShoppingCartCol>

                <DivOrderTotalCol>
                    <OrderSummary />
                </DivOrderTotalCol>
            </DivContainer>
        </>
    )
}