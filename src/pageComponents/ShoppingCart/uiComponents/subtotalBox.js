import React, { useContext } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DebounceInput } from 'react-debounce-input'
import Context from '../../../setup/context'
import NumberFormat from 'react-number-format'

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

export default function SubtotalBox({ history }) {
    const { cart, cartPricing, updateOrderNotes, orderNotes, userInfo } = useContext(Context)

    const subtotal = cartPricing.state === 'loading'
        ? 'Calculating...'
        : (
            <NumberFormat
                value={cartPricing.subTotal}
                displayType="text"
                thousandSeparator={true}
                prefix="$"
                decimalScale={2}
                fixedDecimalScale
            />
        )
	
    return (
        <Container>
            <DebounceInput
                element="textarea"
                minLength={2}
                debounceTimeout={300}
                onChange={e => updateOrderNotes(e.target.value)}
                placeholder='Type Order Notes here'
                style={{ width: 600 }}
                value={orderNotes}
            />

            <Div>
                <h5>Subtotal: {subtotal}</h5>
				
                { cart?.length > 0 && (
                    <>
                        {userInfo?.role !== 'AirlineEmployee' && (
                            <DivCheckoutButton onClick={() => history.push('/checkout')}>
                                <FontAwesomeIcon icon="lock" color="white"/>
                                <p>Start Secure Checkout</p>
                            </DivCheckoutButton>
                        )}
                        {userInfo?.isAirlineUser && (
                            <DivQuoteButton onClick={() => history.push('/create-quote')}>
                                <FontAwesomeIcon icon='file-invoice-dollar' color="white"/>
                                <p>Create a Quote</p>
                            </DivQuoteButton>
                        )}
                    </>
                )}
            </Div>
        </Container>
    )
}