import React, { useContext } from 'react'
import styled from 'styled-components'
import Context from '../../../setup/context'
import NumberFormat from 'react-number-format'
import CheckoutButtons from './CheckoutButtons'

const Div = styled.div`
	display: flex;
	flex-direction: column;
	width: 350px;
	height: max-content;
	margin-left: auto;
	padding: 16px;
	align-items: flex-end;
	position: -webkit-sticky;
	position: sticky;
	top: 125px;
	border: 1px solid lightgrey;
`

const H4 = styled.h4`
	width: 100%;
	font-family: ProximaBold;
	text-transform: uppercase;
	padding-left: 4px;
`

const DivLineItem = styled.div`
	display: flex;
	justify-content: space-between;
	width: 300px;
	min-width: 250px;
	p {
		margin: 0;
	}
`

const DivLineItemTotal = styled(DivLineItem)`
	justify-content: flex-end;
	margin-top: 20px;
	padding-top: 20px;
	border-top: 1px solid #001d3d;
	p {
		font-size: 18px;
		font-weight: 600;
	}
`

export default function OrderSummary() {
    const {
        cartPricing
    } = useContext(Context)

    return (
        <>
            <Div>
                <H4>Order Summary</H4>
                <DivLineItem>
                    <p>Subtotal</p>
                    <p>{cartPricing.state === 'loading'
                        ? 'Calculating...'
                        : (
                            <NumberFormat
                                value={cartPricing.subTotal}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'$'}
                                decimalScale={2}
                                fixedDecimalScale
                            />
                        )}
                    </p>
                </DivLineItem>
                <DivLineItem>
                    <p>Tariff</p>
                    <p>{cartPricing.state === 'loading'
                        ? 'Calculating...'
                        : (
                            <NumberFormat
                                value={cartPricing.tariff}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'$'}
                                decimalScale={2}
                                fixedDecimalScale
                            />
                        )}
                    </p>
                </DivLineItem>
                <DivLineItem>
                    <p>Tax</p>
                    <p>(TBD - At Checkout)</p>
                </DivLineItem>
                <DivLineItem>
                    <p>Shipping</p>
                    <p>(TBD)</p>
                </DivLineItem>
                <DivLineItemTotal>
                    <p>Total (without tax) {cartPricing.state === 'loading'
                        ? 'Calculating...'
                        : (
                            <NumberFormat
                                value={Number(cartPricing.subTotal) + Number(cartPricing.tariff)}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'$'}
                                decimalScale={2}
                                fixedDecimalScale
                            />
                        )}
                    </p>
                </DivLineItemTotal>
                <CheckoutButtons />
            </Div>
        </>
    )
}
