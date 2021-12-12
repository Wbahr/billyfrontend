import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { ButtonBlack, ButtonRed } from 'styles/buttons'
import { CircularProgress } from '@material-ui/core'

const SpinnerDiv = styled.div`
	display: flex;
	justify-content: center;
	margin: 50px;
`

const RadioLabel = styled.label`
    margin-left: 10px;
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

const SelectExistingPaymentMethodsComponent = (props) => {

    const {
        order,
        cancelEvent,
        existingPaymentSavedEvent
    } = props

    const [isLoadingSavedPaymentMethods, setIsLoadingSavedPaymentMethods] = useState(true)
    const [savedPaymentMethods, setSavedPaymentMethods] = useState([])
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(order.activePaymentMethod?.paymentSystemMethodId)
    
    const _ = useQuery(GET_ACCOUNTING_ORDER_SAVED_PAYMENT_METHODS, {
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

    const [savePaymentMethodToOrder] = useMutation(SAVE_PAYMENT_METHOD_TO_ORDER, {
        fetchPolicy: 'no-cache',
        onCompleted: result => {
            if (result.savePaymentMethodToOrder){
                setIsLoadingSavedPaymentMethods(false)
                existingPaymentSavedEvent()
            }
        }
    })

    const saveExistingPaymentMethodHandler = () => {
        if (selectedPaymentMethod && selectedPaymentMethod !== order.activePaymentMethod.paymentSystemMethodId) {
            setIsLoadingSavedPaymentMethods(true)
            savePaymentMethodToOrder({
                variables: {
                    orderNumber: order.orderNumber,
                    paymentSystemMethodId: selectedPaymentMethod
                }
            })
        }
    }

    const selectExistingPaymentMethodHandler = (event) => {
        if (event.target.checked) {
            setSelectedPaymentMethod(event.target.value)
        }
    }

    return (
        <>
            {
                isLoadingSavedPaymentMethods ? (
                    <SpinnerDiv>
                        <CircularProgress />
                    </SpinnerDiv>
                ) : (
                    <>
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
                    </>
                )
            }
            
        </>
    )
}

export default SelectExistingPaymentMethodsComponent