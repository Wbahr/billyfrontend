import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { ButtonBlack, ButtonRed } from 'styles/buttons'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { CircularProgress } from '@material-ui/core'
import StripePaymentSection from 'pageComponents/Checkout/uiComponents/stripePayment'

const RadioLabel = styled.label`
    margin-left: 10px;
`

const SpinnerDiv = styled.div`
	display: flex;
	justify-content: center;
	margin: 50px;
`

const GET_ACCOUNTING_ORDER_SAVED_PAYMENT_METHODS = gql`
  query OrdersForAccounting(
    $orderNumber: String
  ) {
    ordersForAccounting(
      orderNumber: $orderNumber
    ){
      orders {
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
  }
`

export const PREPARE_NEW_PAYMENT_METHOD_INFO = gql`
	mutation PrepareNewPaymentMethodInfo ($airlineCustomerId: Int){
		prepareInfoForNewPaymentMethod(airlineCustomerId: $airlineCustomerId){
			paymentSystemSecretKey
		}
    }
`

export const SAVE_PAYMENT_METHOD_TO_ORDER = gql`
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

const SelectPaymentMethodComponent = (props) => {
    const {
        order,
        selectPaymentMethodEvent,
        cancelEvent
    } = props

    const [savedPaymentMethods, setSavedPaymentMethods] = useState([])

    const stripe = useStripe()
    const elements = useElements()
    const [cardIsValid, setCardIsValid] = useState(false)

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(order.activePaymentMethod?.paymentSystemMethodId)
    const [isNewPaymentMethod, setIsNewPaymentMethod] = useState(false)
    const [isInfoLoadingForNewPayment, setIsInfoLoadingForNewPayment] = useState(false)
    const [isSaveForReuse, setIsSaveForReuse] = useState(false)
    const [isSavingNewPaymentMethod, setIsSavingNewPaymentMethod] = useState(false)
    const [isLoadingSavedPaymentMethods, setIsLoadingSavedPaymentMethods] = useState(true)

    const [paymentSystemSecretKey, setPaymentSystemSecretKey] = useState('')

    const getOrderSavedPaymentMethodsQuery = useQuery(GET_ACCOUNTING_ORDER_SAVED_PAYMENT_METHODS, {
        onCompleted: result => {
            if (result.ordersForAccounting.orders.length){
                setSavedPaymentMethods(result.ordersForAccounting.orders[0].savedPaymentMethods)
                setIsLoadingSavedPaymentMethods(false)
            }
        },
        variables: {
            orderNumber: order.orderNumber
        },
        fetchPolicy: 'no-cache'
    })

    const [prepareInfoForNewPaymentMethod] = useMutation(PREPARE_NEW_PAYMENT_METHOD_INFO, {
        fetchPolicy: 'no-cache',
        onCompleted: ({ prepareInfoForNewPaymentMethod }) => {
            newCardSetup(prepareInfoForNewPaymentMethod)
            setIsInfoLoadingForNewPayment(false)
        }
    })

    const [savePaymentMethodToOrder] = useMutation(SAVE_PAYMENT_METHOD_TO_ORDER, {
        fetchPolicy: 'no-cache',
        onCompleted: result => {
            if (result.savePaymentMethodToOrder){
                setSavedPaymentMethods(result.savePaymentMethodToOrder.savedPaymentMethods)
                setIsLoadingSavedPaymentMethods(false)
                selectPaymentMethodEvent()
            }
        }
    })

    useEffect(() => {
        if (isNewPaymentMethod) {
            setIsInfoLoadingForNewPayment(true)
            prepareInfoForNewPaymentMethod({
                variables: {
                    airlineCustomerId: order.customer.id
                }
            })
        }
    }, [isNewPaymentMethod])

    const newCardSetup = ({ paymentSystemSecretKey }) => {
        setPaymentSystemSecretKey(paymentSystemSecretKey)
    }

    const selectExistingPaymentMethodHandler = (event) => {
        if (event.target.checked) {
            setSelectedPaymentMethod(event.target.value)
        }
    }

    const saveExistingPaymentMethodHandler = () => {
        if (selectedPaymentMethod && selectedPaymentMethod !== order.activePaymentMethod.paymentSystemMethodId) {
            setIsLoadingSavedPaymentMethods(true)
            savePaymentMethodToOrder({
                variables: {
                    orderNumber: order.orderNumber,
                    paymentSystemMethodId: selectedPaymentMethod,
                    isSavePaymentMethodForReuse: isSaveForReuse
                }
            })
        }
    }

    const saveNewPaymentMethodHandler = () => {
        setIsSavingNewPaymentMethod(true)

        const cardElement = elements.getElement(CardElement)
        stripe
            .confirmCardSetup(paymentSystemSecretKey, { payment_method: { card: cardElement } })
            .then(data => {

                if (data.error){
                    alert(data.error.message)
                    return
                }

                if (data.setupIntent) {
                    setSelectedPaymentMethod(data.setupIntent.payment_method)

                    setIsLoadingSavedPaymentMethods(true)
                    savePaymentMethodToOrder({
                        variables: {
                            orderNumber: order.orderNumber,
                            paymentSystemMethodId: data.setupIntent.payment_method,
                            isSavePaymentMethodForReuse: isSaveForReuse
                        }
                    })
                } else {
                    alert('Payment setup unsuccessful')
                }

                setIsSavingNewPaymentMethod(false)
            })
    }

    return (
        <>
            <div>
                {
                    isLoadingSavedPaymentMethods || isSavingNewPaymentMethod ? (
                        <SpinnerDiv>
                            <CircularProgress />
                        </SpinnerDiv>
                    ) : (
                        <>
                            <div style={{ display: 'flex' }}>
                                <div style={{ flexGrow: 2 }}>
                                    {
                                        savedPaymentMethods.length ? (
                                            <>
                                                <h4>Select an existing Payment Method</h4>
                                                <div>
                                                    {
                                                        savedPaymentMethods.map(p => (
                                                            <div key={p.paymentSystemMethodId}>
                                                                <input 
                                                                    type='radio'
                                                                    id={p.paymentSystemMethodId}
                                                                    value={p.paymentSystemMethodId}
                                                                    checked={p.paymentSystemMethodId === selectedPaymentMethod}
                                                                    onChange={(event) => { selectExistingPaymentMethodHandler(event) }}
                                                                />
                                                                <RadioLabel htmlFor={p.paymentSystemMethodId}>{p.name}</RadioLabel>
                                                                {
                                                                    selectedPaymentMethod === p.paymentSystemMethodId
                                                                    && selectedPaymentMethod !== order.activePaymentMethod?.paymentSystemMethodId 
                                                                    && (
                                                                        <span style={{ color: 'darkred' }}> (Selection not yet saved)</span>
                                                                    )
                                                                }
                                                                {
                                                                    p.paymentSystemMethodId === order.activePaymentMethod?.paymentSystemMethodId && (
                                                                        <span style={{ color: 'darkgreen' }}> (Active Payment Method)</span>
                                                                    )
                                                                }
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                                <span style={{ float: 'left', marginRight: '10px' }}>
                                                    <ButtonBlack 
                                                        onClick={() => { saveExistingPaymentMethodHandler() }}
                                                        disabled={!selectedPaymentMethod || selectedPaymentMethod === order.activePaymentMethod?.paymentSystemMethodId}
                                                    >
                                                        Save Changes
                                                    </ButtonBlack>
                                                </span>
                                                <span style={{ float: 'left' }}><ButtonRed onClick={() => { cancelEvent() }}>Cancel Changes</ButtonRed></span>
                                                <div style={{ clear: 'both' }}></div>
                                            </>
                                        ) : (
                                            <>
                                                <span style={{ float: 'left' }}><ButtonRed onClick={() => { cancelEvent() }}>Cancel Changes</ButtonRed></span>
                                            </>
                                        )
                                    }
                                    
                                </div>
                                <div style={{ flexGrow: 1 }}>
                                    <h4>OR</h4>
                                </div>
                                <div style={{ flexGrow: 2, display: 'flex', justifyContent: 'center' }}>
                                    <div style={{ alignSelf: 'center' }}>
                                        {
                                            isNewPaymentMethod ? (
                                                isInfoLoadingForNewPayment || isSavingNewPaymentMethod ? (
                                                    <SpinnerDiv>
                                                        <CircularProgress />
                                                    </SpinnerDiv>
                                                ) : (
                                                    <>
                                                        <StripePaymentSection setCardIsValid={(isValid) => { setCardIsValid(isValid) }} />
                                                        <input type='checkbox' id="saveForReuse" checked={isSaveForReuse} onChange={(event) => { setIsSaveForReuse(event.target.checked) }} />
                                                        <label htmlFor='saveForReuse'> Save for Reuse</label>
                                                        <ButtonBlack disabled={!cardIsValid} onClick={() => { saveNewPaymentMethodHandler() }}>Make Active Payment Method</ButtonBlack>
                                                    </>
                                                    
                                                )
                                            ) : (
                                                <ButtonBlack onClick={() => { setIsNewPaymentMethod(true) }}>Add a new Payment Method</ButtonBlack>
                                            )
                                        }                                        
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </>
    )
}

export default SelectPaymentMethodComponent