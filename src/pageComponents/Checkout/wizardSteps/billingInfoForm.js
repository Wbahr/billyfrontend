import React, {useEffect, useContext, useState} from 'react'
import { Field } from 'formik'
import styled from 'styled-components'
import NewCardSection from './billingInfoComponents/newCardSection'
import PurchaseOrderSection from './billingInfoComponents/purchaseOrderSection'
import {ButtonBlack, ButtonRed} from "../../../styles/buttons";
import Context from '../../../config/context'
import {useLazyQuery} from "@apollo/client";
import {GET_PAYMENT_METHOD_INFO} from "../../../config/providerGQL";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {transformForPaymentInfo} from "../helpers";
import Select from '../../_common/form/select'
import FormikInput from "../../_common/formik/input_v2";

const WrapForm = styled.div`
	display: flex;
	flex-direction: column;
`

const FormRow = styled.div`
	display: flex;
	width: 100%;
	margin-top: 24px;
	align-items: center;
	padding: 0 8px;
	label {
		margin: 4px 8px auto 4px;
		font-style: italic;
	}
`

const DivNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  width: 100%;
`

function BillingInfoForm(props) {
	const {setValues, setFieldValue, values: {billing: {paymentMethod, cardType}}, handleMoveStep, isStepValid, paymentInfo, setPaymentInfo} = props
	const stripe = useStripe()
	const elements = useElements()
	const context = useContext(Context)
	const [selectedCard, setSelectedCard] = useState('new_card')
	const [cardIsValid, setCardIsValid] = useState(false)
	
	useEffect(() => {
		if (context.userInfo) {
			getPaymentInfo(transformForPaymentInfo(props.values))
		}
	}, [context.userInfo])
	
	useEffect(() => {
		window.scrollTo({top: 0})
		if (!paymentMethod) setFieldValue('billing.paymentMethod', context.userInfo ? 'purchase_order' : 'credit_card')
	}, [])
	
	const [getPaymentInfo] = useLazyQuery(GET_PAYMENT_METHOD_INFO, {
		fetchPolicy: 'no-cache',
		onCompleted: ({paymentMethodInfo}) => {
			setPaymentInfo(paymentMethodInfo)
		}
	})
	
	const confirmCardSetup = () => {
		if (cardType === 'new_card') {
			const cardElement = elements.getElement(CardElement)
			stripe
				.confirmCardSetup(paymentInfo.paymentSystemSecretKey, {payment_method: { card: cardElement }})
				.then(data => {
					setPaymentInfo({...paymentInfo, paymentMethodId: data.setupIntent.payment_method})
					handleMoveStep(3)
				})
		} else {
			setPaymentInfo({...paymentInfo, paymentMethodId: selectedCard})
			handleMoveStep(3)
		}
	}
	
	const handleContinueClick = () => {
		if (paymentMethod !== 'purchase_order') {
			if (context.userInfo) {
				confirmCardSetup()
			} else {
				getPaymentInfo(transformForPaymentInfo(props.values))
			}
		} else {
			handleMoveStep(3)
		}
	}
	
	const mapPaymentMethods = ({paymentMethodId, card}) => ({
		value: paymentMethodId,
		label: `${card.brand} xxxx${card.lastFour} - ${card.expirationMonth}/${card.expirationYear.toString().slice(2, 4)}`
	})
	
	const newOrSavedCardOptions = [
		{label: 'New Card', value: 'new_card'},
		...(paymentInfo.paymentMethods || []).map(mapPaymentMethods)
	]
	
	const handleCardChange = value => {
		setValues({ ...props.values, billing: {...props.values.billing, cardType: value === 'new_card' ? value : 'saved_card'} })
		setSelectedCard(value)
	}
	
	const handleRadioButtonClick = ({target: {value}}) => {
		const cardType = selectedCard === 'new_card' ? 'new_card' : 'saved_card'
		setFieldValue('billing', {
			...props.values.billing,
			paymentMethod: value,
			cardType: value === 'credit_card' ? cardType : ''
		})
	}
	
	const disabled = paymentMethod === 'credit_card' && cardType === 'new_card'
		? !isStepValid || !cardIsValid
		: !isStepValid
	
	const RadioButtons = ({field}) => (
		<>
			<div>
				<input
					disabled={!context.userInfo}
					value="purchase_order"
					onChange={handleRadioButtonClick}
					checked={field.value === 'purchase_order'}
					type="radio"
				/>
				<label>Purchase Order</label>
			</div>
			
			<div>
				<input
					value="credit_card"
					onChange={handleRadioButtonClick}
					checked={field.value === 'credit_card'}
					type="radio"
				/>
				<label>Credit Card</label>
			</div>
		</>
	)
	
	return (
		<WrapForm>
			<FormRow>
				<label htmlFor="billing.paymentMethod">How would you like to pay?*</label>
				<Field
					name="billing.paymentMethod"
					component={RadioButtons}
					options={[{label: 'Purchase Order', value: 'purchase_order'}, {label: 'Credit Card', value: 'credit_card'}]}
					placeholder="Select a Payment Method"
                    isSearchable={false}
                    value="purchase_order"
				/>
			</FormRow>
			{paymentMethod === 'credit_card' && (
				<FormRow>
					<label htmlFor="billing.cardType">New or Saved Card?*</label>
					<Select
                        name="billing.cardType"
						value={newOrSavedCardOptions.find(o => o.value === selectedCard)}
						setValue={handleCardChange}
						options={newOrSavedCardOptions}
						isSearchable={false}
					/>
				</FormRow>
			)}
			
			{paymentMethod === 'purchase_order' && <PurchaseOrderSection {...props}/>}
			{paymentMethod === 'credit_card' && cardType === 'new_card' && (
				<NewCardSection {...props} setCardIsValid={setCardIsValid}/>
			)}
			{paymentMethod === 'credit_card' && cardType === 'saved_card' && context.userInfo && (
				<FormikInput label="PO Number" name="billing.purchaseOrder" />
			)}
			
			<DivNavigation>
				<ButtonBlack onClick={() => handleMoveStep(1)}>Previous</ButtonBlack>
				<ButtonRed disabled={disabled} onClick={handleContinueClick}>Continue</ButtonRed>
			</DivNavigation>
		</WrapForm>
	)
}

export default BillingInfoForm