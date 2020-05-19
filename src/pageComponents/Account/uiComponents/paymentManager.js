import React from 'react'
import { CardElement } from 'react-stripe-elements'

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