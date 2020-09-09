import React from 'react'
import { CardElement } from '@stripe/react-stripe-js'

function PaymentManagerComponent() {

	return(
		<>
			<CardElement style={{
				base: {
					fontSize: '18px',
					backgroundColor: 'white'
				}}} 
			/>
			<button>Save Card</button>
		</>
	)
}

export default PaymentManagerComponent