import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { ButtonBlack } from 'styles/buttons'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { CircularProgress } from '@mui/material'
import StripePaymentSection from 'pageComponents/Checkout/uiComponents/stripePayment'

const SpinnerDiv = styled.div`
	display: flex;
	justify-content: center;
	margin: 50px;
`

const PREPARE_NEW_PAYMENT_METHOD_INFO = gql`
	mutation PrepareNewPaymentMethodInfo ($airlineCustomerId: Int){
		prepareInfoForNewPaymentMethod(airlineCustomerId: $airlineCustomerId){
			paymentSystemSecretKey
		}
    }
`

const SAVE_PAYMENT_METHOD_TO_ORDER = gql`
    mutation SavePaymentMethodToOrder (
        $orderNumber: String,
        $paymentSystemMethodId: String,
        $isSavePaymentMethodForReuse: Boolean
    ) {
        savePaymentMethodToOrder (
            orderNumber: $orderNumber,
            paymentSystemMethodId: $paymentSystemMethodId,
            isSavePaymentMethodForReuse: $isSavePaymentMethodForReuse
        ) {
            orderNumber
            webReferenceId
            customerIdErp
            dateCreated
            status
            savedPaymentMethods {
                type
                name
                lastFour
                expiration
                paymentSystemMethodId
                isPrimary
            }
        }
    }
`

const SelectNewPaymentMethodComponent = (props) => {

    const {
        order,
        isSavingEvent,
        newPaymentSavedEvent
    } = props

    const stripe = useStripe()
    const elements = useElements()

    const [cardIsValid, setCardIsValid] = useState(false)
    const [isSaveForReuse, setIsSaveForReuse] = useState(false)
    const [paymentSystemSecretKey, setPaymentSystemSecretKey] = useState('')
    const [isInfoLoadingForNewPayment, setIsInfoLoadingForNewPayment] = useState(false)

    //Retrieve the Stripe intent secret key on first load
    useEffect(() => {
        setIsInfoLoadingForNewPayment(true)
        prepareInfoForNewPaymentMethod({
            variables: {
                airlineCustomerId: order.customer.id
            }
        })
    }, [])

    const [prepareInfoForNewPaymentMethod] = useMutation(PREPARE_NEW_PAYMENT_METHOD_INFO, {
        fetchPolicy: 'no-cache',
        onCompleted: ({ prepareInfoForNewPaymentMethod }) => {
            setPaymentSystemSecretKey(prepareInfoForNewPaymentMethod.paymentSystemSecretKey)
            setIsInfoLoadingForNewPayment(false)
        }
    })

    const [savePaymentMethodToOrder] = useMutation(SAVE_PAYMENT_METHOD_TO_ORDER, {
        fetchPolicy: 'no-cache',
        onCompleted: result => {
            if (result.savePaymentMethodToOrder){
                newPaymentSavedEvent()
            }
        }
    })

    const saveNewPaymentMethodHandler = () => {
        isSavingEvent(true)

        const cardElement = elements.getElement(CardElement)
        stripe
            .confirmCardSetup(paymentSystemSecretKey, { payment_method: { card: cardElement } })
            .then(data => {

                if (data.error){
                    alert(data.error.message)
                    isSavingEvent(false)
                    return
                }

                if (data.setupIntent) {
                    savePaymentMethodToOrder({
                        variables: {
                            orderNumber: order.orderNumber,
                            paymentSystemMethodId: data.setupIntent.payment_method,
                            isSavePaymentMethodForReuse: isSaveForReuse
                        }
                    })
                } else {
                    alert('Payment setup unsuccessful')
                    isSavingEvent(false)
                }
            })
    }

    return (
        <>
            {
                isInfoLoadingForNewPayment ? (
                    <SpinnerDiv>
                        <CircularProgress />
                    </SpinnerDiv>
                ) : (
                    <>
                        <StripePaymentSection setCardIsValid={(isValid) => { setCardIsValid(isValid) }} />
                        <input type='checkbox' id="saveForReuse" checked={isSaveForReuse} onChange={(event) => { setIsSaveForReuse(event.target.checked) }} />
                        <label htmlFor='saveForReuse'> Save to the Customer for re-use</label>
                        <ButtonBlack disabled={!cardIsValid} onClick={() => { saveNewPaymentMethodHandler() }}>Make Active Payment Method</ButtonBlack>
                    </>                               
                )
            }  
        </>
    )
}

export default SelectNewPaymentMethodComponent