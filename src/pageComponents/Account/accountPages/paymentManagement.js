import React, { useState } from 'react'
import { useStripe, useElements } from '@stripe/react-stripe-js'
import PaymentManagerComponent from '../uiComponents/paymentManager'
import Select from '../../_common/form/select'

function PaymentManagementPage() {
	const stripe = useStripe()
	const elements = useElements()
	// const context = useContext(Context);
	const [defaultPaymentMethod, setDefaultPaymentMethod] = useState('credit')


	return(
		<div>
			<p>Default Payment Method:</p>
			<Select
				value={defaultPaymentMethod}
				setValue={setDefaultPaymentMethod}
				options={[{'label': 'Credit Card', 'value': 'credit'},{'label': 'Purchase Order', 'value': 'purchase_order'}]}
			/>
			<p>Default Credit Card:</p>
			<Select
				value={defaultPaymentMethod}
				setValue={setDefaultPaymentMethod}
				options={[{'label': 'Master - 4242', 'value': '0'},{'label': 'Visa - 4525', 'value': '1'}]}
			/>
			<div>
        Add a New Card
			</div>
			<PaymentManagerComponent/>
		</div>
	)
}

export default PaymentManagementPage