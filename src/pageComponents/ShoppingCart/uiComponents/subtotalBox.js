import React, { useContext } from 'react'
import styled from 'styled-components'
import { DebounceInput } from 'react-debounce-input'
import Context from '../../../setup/context'
import NumberFormat from 'react-number-format'
import CheckoutButtons from './CheckoutButtons'

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

export default function SubtotalBox({ history }) {
    const { cartPricing, updateOrderNotes, orderNotes } = useContext(Context)

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
                debounceTimeout={900}
                onChange={e => updateOrderNotes(e.target.value)}
                placeholder='Type Order Notes here'
                style={{ width: 600 }}
                value={orderNotes}
            />

            <Div>
                <h5>Subtotal: {subtotal}</h5>

                <CheckoutButtons history={history} />
            </Div>
        </Container>
    )
}
