import React, { useContext } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Context from '../../../setup/context'

const DivButtonContainer = styled.div `
	margin: auto auto 0 auto;
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
	margin: 8px 0;
	box-shadow: 1px 1px 2px #000;
	
	p {
		margin: 0;
		margin-left: 8px;
		font-size: 18px;
		font-weight: 500;
	}

    &[disabled] {
        cursor: default;
        background-image: linear-gradient(to top left, grey, darkgrey);
    }
`

const DivQuoteButton = styled(DivCheckoutButton)`
	background-image: none;
	background-color: #535353;
`

const CheckoutButtons = ({ history }) => {

    const {
        userInfo,
        cart,
        cartPricing,
        itemPrices
    } = useContext(Context)

    const pricesLoading = !itemPrices?.length || cartPricing?.state === 'loading'
    const hasZeroPriceItem = cart?.length && itemPrices?.length >= 0 && (cart || []).some(cartItem => {
        const itemPrice = itemPrices?.find(price => price.invMastUid === cartItem.frecno)

        return itemPrice?.unitPrice === 0
    })

    const moveToCheckoutHandler = () => {
        if (!hasZeroPriceItem){
            history.push('/checkout')
        }
    }

    const moveToCreateQuoteHandler = () => {
        if (!hasZeroPriceItem){
            history.push('/create-quote')
        }
    }

    return (
        <>
            {cart?.length > 0 && (
                <DivButtonContainer>
                    {
                        hasZeroPriceItem && <p>Zero Price items present</p>
                    }
                    {
                        (userInfo?.isAirlineEngineerUser) 
                            ? (
                                <DivCheckoutButton disabled>
                                    <FontAwesomeIcon icon="lock" color="white"/>
                                    <p>Engineer User</p>
                                </DivCheckoutButton>
                            )
                            : (
                                <DivCheckoutButton disabled={(pricesLoading || hasZeroPriceItem)} onClick={moveToCheckoutHandler}>
                                    <FontAwesomeIcon icon="lock" color="white"/>
                                    <p>Start Secure Checkout</p>
                                </DivCheckoutButton>
                            )
                    }
                    {
                        (userInfo?.isImpersonatorUser) && (
                            <DivQuoteButton disabled={(pricesLoading || hasZeroPriceItem)} onClick={moveToCreateQuoteHandler}>
                                <FontAwesomeIcon icon='file-invoice-dollar' color="white"/>
                                <p>Create a Quote</p>
                            </DivQuoteButton>
                        )
                    }
                </DivButtonContainer>
            )}
        </>
    )
}

export default CheckoutButtons