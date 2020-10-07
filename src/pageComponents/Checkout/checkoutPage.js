import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { useLazyQuery } from '@apollo/client'
import Context from '../../config/context'
import CheckoutOrderSummary from './uiComponents/checkoutOrderSummary'
import CheckoutWizard from './checkoutWizard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CheckoutProgress from './uiComponents/checkoutProgress'
import { shippingScheduleSchema, shipToSchema, airlineShipToSchema, billToSchema } from './helpers/validationSchema'
import {connect} from 'formik'
import {GET_TAXES} from "../../config/providerGQL";

const DivContainer = styled.div`
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  flex-grow: inherit;
`

const DivCheckoutCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 920px;
  @media(max-width: 1000px) {
    width: 100%;
  }
`

const DivOrderTotalCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  @media(max-width: 1400px) {
    display: none;
  }
`

const Div = styled.div`
  display: flex;
  justify-content: space-between;
`

const DivRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-bottom;
  margin: 0 20px 0 20px;
  p {
    cursor: pointer;
    color: grey;
    margin: 0 0 2px 12px;
    align-self: flex-end;
    font-size: 12px;
  }
`

const H3 = styled.h3`
  font-family: ProximaBold;
  text-transform: uppercase;
  padding-left: 8px;
  margin: 0 0 2px 4px;
`

const Container = styled.div`
  margin: 20px;
  font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
  font-size: 18px;
  height: 100%;
  border: 1px solid lightgrey;
  padding: 20px;
`

const Pformheader = styled.p`
  margin: 0;
  font-family: ProximaBold;
  text-transform: uppercase;
`

const yupSchema = {
	0: shippingScheduleSchema,
	1: shipToSchema,
	2: billToSchema
}

const airlineYupSchema = {
	0: shippingScheduleSchema,
	1: airlineShipToSchema,
	2: billToSchema
}

const stepLabels = ['Shipping Schedule', 'Ship To', 'Bill To', 'Order Review']

function CheckoutPage({history}) {
	const context = useContext(Context)
	const [currentStep, setCurrentStep] = useState(0)
	const [shippingZipCode, setShippingZipCode] = useState({})
	const [taxAmount, setTaxAmount] = useState(0)
	const [stepValidated, setStepValidated] = useState(
		{
			0: false,
			1: false,
			2: history.location.pathname === '/create-quote',
			3: false
		}
	)
	
	useEffect(() => {
		if (!context.cart.length) {
			history.replace('/cart')
		}
	}, [])
	
	const [getTaxAmount] = useLazyQuery(GET_TAXES, {
		fetchPolicy: 'no-cache',
		onCompleted: data => {
			const taxTotal = data?.getCheckoutData?.taxTotal || 0
			setTaxAmount(taxTotal)
		}
	})

	useEffect(() => {
		if (!shippingZipCode) {
			const anonymousCartToken = localStorage.getItem('cartToken')
			getTaxAmount({
				variables: {
					checkoutDataRequest: {
						anonymousCartToken,
						...shippingZipCode
					}
				}
			})
		}
	},[shippingZipCode])
	
	
	const handleMoveStep = nextStepIdx => {
		if (nextStepIdx === 0 || stepValidated[nextStepIdx - 1]) {
			setCurrentStep(nextStepIdx)
		}
	}

	const handleValidateFields = values => {
		yupSchema[currentStep].validate(values)
			.catch((err) => console.log(err.name, err.errors))
		
		yupSchema[currentStep]
			.isValid(values)
			.then((valid) => setStepValidated({...stepValidated, [currentStep]: valid}))
	}
	
	return (
		<DivContainer>
			<DivCheckoutCol>
				<Div>
					<DivRow>
						<FontAwesomeIcon icon="lock" />
						<H3>Checkout</H3>
						<CheckoutProgress {...{stepLabels, currentStep, stepValidated, handleMoveStep}}/>
					</DivRow>
				</Div>
				
				<Container>
					<Pformheader>{stepLabels[currentStep]}</Pformheader>
					<CheckoutWizard
						step={currentStep}
						yupSchema={context.userInfo?.role === 'Impersonator' ? airlineYupSchema : yupSchema} //Only Anon and Impersonating Users can Checkout - if Airline Impersonator use the airlineYupSchema
						handleValidateFields={handleValidateFields}
						updateZip={(shipToId, zipcode) => setShippingZipCode({shipToId, zipcode})}
						isStepValid={stepValidated[currentStep]}
						handleMoveStep={handleMoveStep}
						history={history}
					/>
				</Container>
			</DivCheckoutCol>
			
			<DivOrderTotalCol>
				<CheckoutOrderSummary
					currentStep={currentStep}
					taxAmount={taxAmount}
				/>
			</DivOrderTotalCol>
		</DivContainer>
	)
}

export default connect(CheckoutPage)