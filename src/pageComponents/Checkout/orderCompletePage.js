import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

const DivConfirmationBox = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	align-items: center;
	margin: auto;
`

export default function OrderCompletePage(props) {
    const { orderId } = useParams()
    const { history } = props
    const isQuote = history.location.pathname.includes('quote-complete')
    return (
        <DivConfirmationBox>
            <p>{isQuote ? 'Web Quote Number' : 'Web Order Number'} ({orderId}) Confirmed</p>
            <p>We'll be sending out a confirmation email shortly.</p>
        </DivConfirmationBox>
    )
}