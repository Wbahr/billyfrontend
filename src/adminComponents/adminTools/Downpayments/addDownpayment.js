import React, { useContext, useEffect, useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useHistory } from 'react-router-dom'
import CardSelect from './uiComponents/cardSelect'
import CustomerSearchWithImpersonation from './uiComponents/customerSearch'
import Context from 'setup/context'
import OrderSelect from './uiComponents/orderSelect'
import { ButtonRed } from 'styles/buttons'
import { GET_CHECKOUT_DATA, GET_ORDERS_DETAIL, ADD_PREPAYMENT } from 'setup/providerGQL'
import styled from 'styled-components'

const Centered = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 30px;
`

const Container = styled.div`
    max-width: 900px;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;
`

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 100%;
    margin: 10px;
`

const emptyPayment = {
    amountToCharge: '',
    orderNumber: '',
    paymentSystemCustomerId: '',
    paymentMethodId: ''
}

export default function AddDownpayment() {
    const context = useContext(Context)
    const elements = useElements()
    const history = useHistory()
    const stripe = useStripe()

    const [cardIsValid, setCardIsValid] = useState(false)
    const [checkoutDropdownData, setCheckoutDropdownData] = useState({})
    const [customer, setCustomer] = useState({})
    const [payment, setPayment] = useState(emptyPayment)
    const [requestSending, setRequestSending] = useState(false)
    const [selectedCard, setSelectedCard] = useState()
    const [creditCardLoading, setCreditCardLoading] = useState(false)
    const [paymentInfo, setPaymentInfo] = useState({})
    const [values, setValues] = useState({})

    const cardType = selectedCard === 'new_card' ? 'new_card' : 'saved_card'
    
    function setPaymentItem(field, value) {
        setPayment({ ...payment, [field]: value })
    }

    function setOrderNumber(v) {
        setPaymentItem('orderNumber', v.value)
    }
    
    useEffect(() => {
        getCheckoutData()
    }, [customer.id])

    useEffect(() => {
        if (payment.orderNumber) {
            getOrderDetail()
        }
    }, [payment.orderNumber])
    
    useEffect(() => {
        return () => {
            context.cancelImpersonation()
        }
    }, [])

    const confirmCardSetup = (paymentInfo) => {
        if (cardType === 'new_card' && !creditCardLoading) {
            setCreditCardLoading(true)
            const cardElement = elements.getElement(CardElement)
            stripe
                .confirmCardSetup(paymentInfo.paymentSystemSecretKey, { payment_method: { card: cardElement } })
                .then(data => {
                    const paymentMethodId = data.setupIntent.payment_method
                    setPaymentInfo({ ...paymentInfo, paymentMethodId: data.setupIntent.payment_method })
                    setSelectedCard(data.setupIntent.payment_method)
                    setCreditCardLoading(false)
                    handleAddPrepayment({ ...payment, paymentMethodId })
                })
        } else {
            handleAddPrepayment(payment)
        }
    }
    
    function handleAddPrepayment(payment) {
        const newPayment = { ...payment }
        newPayment.orderNumber = parseInt(payment.orderNumber)
        newPayment.amountToCharge = Number.parseFloat(payment.amountToCharge.slice(1))
        addPrepayment({
            variables: { thing: newPayment },
        })
    }

    const [getCheckoutData] = useLazyQuery(GET_CHECKOUT_DATA, {
        fetchPolicy: 'no-cache',
        onCompleted: result => {
            setCheckoutDropdownData(result.getCheckoutDropdownData)
            setValues({ ...values, billing: result.getCheckoutDropdownData.billingInfo, defaultBilling: result.getCheckoutDropdownData.billingInfo })
        }
    })
    
    const [getOrderDetail] = useLazyQuery(GET_ORDERS_DETAIL, {
        fetchPolicy: 'no-cache',
        variables: { orderNumber: payment.orderNumber },
        onCompleted: result => {
            const st = result.accountOrderDetails
            setValues({ ...values, shipto: {
                address1: st.shipToAddress1,
                address2: st.shipToAddress2,
                city: st.shipToCity,
                state: st.shipToState,
                zip: st.shipToZip,
                country: st.shipToCountry
            } })
        }
    })

    const [addPrepayment] = useMutation(ADD_PREPAYMENT, {
        fetchPolicy: 'no-cache',
        onCompleted: result => {
            setRequestSending(false)
            if (result.addPrepayment.amountToCharge) {
                history.push('/admin-dashboard/downpayments')
            }
        }
    }) 

    function handleSubmit() {
        setRequestSending(true)
        confirmCardSetup(paymentInfo)
    }

    const submitDisabled = (
        (payment.orderNumber <= 0 ||
        payment.amountToCharge <= 0 ||
        payment.paymentSystemCustomerId?.length === 0 ||
        (payment.paymentMethodId === 'new_card' && !cardIsValid))
    )
    
    return (
        <Centered>
            <Container>
                <Row>
                    <CustomerSearchWithImpersonation customer={customer} setCustomer={setCustomer} />
                    <OrderSelect orderNumber={{ value: payment.orderNumber, label: payment.orderNumber }} setOrderNumber={setOrderNumber} />
                </Row>
                <CardSelect 
                    values={values} 
                    setValues={setValues} 
                    selectedCard={selectedCard} 
                    setSelectedCard={setSelectedCard} 
                    checkoutDropdownData={checkoutDropdownData} 
                    payment={payment}
                    setPaymentItem={setPaymentItem}
                    paymentInfo={paymentInfo}
                    setPaymentInfo={setPaymentInfo}
                    confirmCardSetup={confirmCardSetup}
                    cardIsValid={cardIsValid}
                    setCardIsValid={setCardIsValid}
                />
                <Centered>
                    <ButtonRed disabled={submitDisabled || requestSending} onClick={handleSubmit}>Submit</ButtonRed>
                </Centered>
            </Container>
        </Centered>
    )
}