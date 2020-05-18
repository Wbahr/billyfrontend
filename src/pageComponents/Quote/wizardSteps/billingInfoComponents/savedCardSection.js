import React from 'react'
import { Field } from 'formik'
import SelectField from '../../../_common/formik/select'
// import styled from 'styled-components'
// import { injectStripe } from 'react-stripe-elements'
import { StateList } from '../../../_common/helpers/helperObjects'
// import StripePaymentSection from '../../uiComponents/stripePayment'
import FormikInput from '../../../_common/formik/input_v2'

// const FormRow = styled.div`
// 	display: flex;
// 	width: 100%;
// 	margin-top: 24px;
// 	align-items: center;
// 	padding: 0 8px;
// 	label {
// 		margin: 4px 8px auto 4px;
// 		font-style: italic;
// 	}
// `

export default function SavedCardSection() {

	return (
		<>
			<Field 
				name="billing.saved_card_token" 
				component={SelectField} 
				options={StateList}
				placeholder="Select a Saved Card"
				label="Saved Card"
				isSearchable={false}
			/> 
			<FormikInput label="PO Number" name="billing.po" />
		</>
	)
}