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

export default function QuoteCompletePage() {
	let { orderId } = useParams()

	return(
		<>
			<DivConfirmationBox>
				<p>Quote Number ({orderId}) Confirmed</p>
				<p>We'll be sending out a confirmation email shortly.</p> 
			</DivConfirmationBox>
		</>
	)
}