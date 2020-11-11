import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/client'
import {Formik} from 'formik'
import {ShippingScheduleForm} from './wizardSteps/shippingScheduleForm'
import {ShipToForm} from './wizardSteps/shipToForm'
import BillingInfoForm from './wizardSteps/billingInfoForm'
import ConfirmationScreen from './wizardSteps/confirmationScreen'
import formatDropdownData from './helpers/formatCheckoutDropdownData'
import Context from '../../config/context'
import {GET_CHECKOUT_DATA} from '../../config/providerGQL'
import {defaultBilling, defaultConfirmationEmail, defaultContact, defaultQuote, defaultShipTo} from "./helpers";
import {startOfTomorrow} from 'date-fns'
import { GET_CHECKOUT_ITEM_DETAIL, GET_ITEM_CUSTOMER_PART_NUMBERS } from 'config/gqlQueries/gqlItemQueries'
import { GET_ITEM_PRICE } from 'config/providerGQL'
import { contextType } from 'react-copy-to-clipboard'

const getFormStepComponent = currentStep => {
	switch (currentStep) {
		case 0:
			return ShippingScheduleForm
		case 1:
			return ShipToForm
		case 2:
			return BillingInfoForm
		case 3:
			return ConfirmationScreen
		default:
			return ShippingScheduleForm
	}
}

function CheckoutWizard({history, isStepValid, step, handleMoveStep, shoppingCart, triggerPaymentInfo, getPaymentInfo, handleValidateFields, yupSchema, updateZip}) {
	const [checkoutDropdownData, setCheckoutDropdownData] = useState([])
	const [checkoutDropdownDataLabels, setCheckoutDropdownDataLabels] = useState([])
	const [paymentInfo, setPaymentInfo] = useState({})
	const {userInfo, cart} = useContext(Context)
	
	useQuery(GET_CHECKOUT_DATA, {
		fetchPolicy: 'no-cache',
		onCompleted: result => {
			const mutatedCheckoutDropdownData = formatDropdownData(result.getCheckoutDropdownData)
			setCheckoutDropdownData(result.getCheckoutDropdownData)
			setCheckoutDropdownDataLabels(mutatedCheckoutDropdownData)
		}
	})

	const invMastUids = cart?.map(item => item.frecno)
	const { loading: itemDetailsLoading, error: itemDetailsError, data: itemsDetails} = useQuery(GET_CHECKOUT_ITEM_DETAIL, {
		variables: {
			'invMastUids': invMastUids
		}
	})

	const { loading: pricesLoading, error: itemPricesError, data: itemsPrices} = useQuery(GET_ITEM_PRICE, {
		variables: {
			'items': cart.map(cartItem => {
				return {
					'invMastUid': cartItem.frecno,
					'quantity': cartItem.quantity
				}
			})
		}
	})

	const { loading: customerPartNumbersLoading, error: customerPartNumbersError, data: itemsCustomerPartNumbers} = useQuery(GET_ITEM_CUSTOMER_PART_NUMBERS, {
		variables:{
			'invMastUids': invMastUids
		}
	})

	const itemInfo = {
		itemsDetails: itemsDetails?.itemDetailsBatch,
		itemsPrices: itemsPrices?.getItemPrices,
		itemsCustomerPartNumbers: itemsCustomerPartNumbers?.customerPartNumbersBatch
	}

	const initValues = {
		contact: defaultContact,
		schedule: {
			...defaultQuote,
			cartWithDates: cart.map(cartItem => ({ ...cartItem, requestedShipDate: startOfTomorrow() })),
			shoppingCartToken: localStorage.getItem('shoppingCartToken'),
			isQuote: history.location.pathname === 'create-quote'
		},
		shipto: {
			...defaultShipTo,
			selectedShipTo: !userInfo ? null : -1,
			firstName: userInfo?.role === 'Impersonator' ? '' : userInfo?.firstName || '',
            lastName: userInfo?.role === 'Impersonator' ? '' : userInfo?.lastName || '',
		},
		billing: defaultBilling,
		confirmationEmail: defaultConfirmationEmail
	}
	
	// if(!userInfo){
	// 	defaultBilling.purchaseOrder = "Temp PO - Anon User"
	// }

	const FormStepComponent = getFormStepComponent(step)
	
	return (
		<Formik 
			initialValues={initValues}
			enableReinitialize={true}
			validationSchema={yupSchema[step]}
			validate={handleValidateFields}
		>
			{formikProps => (
				<form name="checkoutForm" onSubmit={e => e.preventDefault()}>
					<FormStepComponent {...{...formikProps, ...itemInfo, paymentInfo, setPaymentInfo, isStepValid, handleMoveStep,
						checkoutDropdownData, checkoutDropdownDataLabels, updateZip, history}}/>
				</form>
			)}
		</Formik>
	)
}

CheckoutWizard.propTypes = {
	step: PropTypes.number.isRequired
}

export default CheckoutWizard