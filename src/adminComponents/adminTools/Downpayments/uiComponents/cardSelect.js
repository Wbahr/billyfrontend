import React, { useEffect, useContext, useState } from 'react'
import styled from 'styled-components'
import StripePaymentSection from 'pageComponents/Checkout/uiComponents/stripePayment'
import Context from 'setup/context'
import Loader from 'pageComponents/_common/loader'
import { FormikStyleLabel, FormikStyleInput } from 'pageComponents/_common/formik/input_v2'
import { transformForPaymentInfo } from 'pageComponents/Checkout/helpers'
import Select from 'pageComponents/_common/form/select'
import { useLazyQuery } from '@apollo/client'
import { useDidUpdateEffect } from 'pageComponents/_common/helpers/generalHelperFunctions'
import { GET_PAYMENT_METHOD_INFO } from 'setup/providerGQL'

const WrapSelect = styled.div`
    margin-left: -5px;
`

const Center = styled.div`
    width: 400px;
    height: 91px;
    display: flex;
    justify-content: center;
`

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 100%;
`

const Container = styled.div`
    width: 100%;
    margin: 10px;
`

const HalfRow = styled.div`
    display: flex;
    justify-content: space-between;
    width: 400px;
`

const SmallInput = styled.div`
    width: 190px;
`

const OrderTotal = styled.div`
    height: 40px;
    font-size: 20px;
    margin-top: 10px;
    text-align: right;
`

export default function CardSelect(props) {
    const { values, setValues, selectedCard, setSelectedCard, payment, setPaymentItem, paymentInfo, setPaymentInfo, cardIsValid, setCardIsValid } = props

    const context = useContext(Context)

    const [loading, setLoading] = useState(false)

    const cardType = selectedCard === 'new_card' ? 'new_card' : 'saved_card'

    useDidUpdateEffect(() => {
        setValues({ ...values, billing: { ...values.billing, cardIsValid } })
    }, [cardIsValid])

    useEffect(() => {
        if (values.billing && values.shipto) {
            setLoading(true)
            getPaymentInfo(transformForPaymentInfo(values))
        }
    }, [values.shipto])

    useEffect(() => {
        window.scrollTo({ top: 0 })
    }, [])

    const [getPaymentInfo] = useLazyQuery(GET_PAYMENT_METHOD_INFO, {
        fetchPolicy: 'no-cache',
        onCompleted: ({ paymentMethodInfo }) => {
            setPaymentItem('paymentSystemCustomerId', paymentMethodInfo.paymentSystemCustomerId)
            setPaymentInfo({ ...paymentInfo, ...paymentMethodInfo })
            setLoading(false)
        }
    })

    const handleCardChange = value => {
        setValues({
            ...props.values,
            billing: {
                ...props.values.billing,
                cardType: value === 'new_card' ? value : 'saved_card',
                cardIsValid: value === 'new_card' ? cardIsValid : true
            }
        })
        setPaymentItem('paymentMethodId', value)
        setSelectedCard(value)
    }

    const mapPaymentMethods = ({ paymentMethodId, card }) => ({
        value: paymentMethodId,
        label: `${card.brand} xxxx${card.lastFour} - ${card.expirationMonth}/${card.expirationYear.toString().slice(2, 4)}`
    })

    const isNewPaymentMethod = selectedCard === 'new_card' && !(paymentInfo.paymentMethods || [])
        .some(method => method.paymentMethodId === selectedCard)

    const newOrSavedCardOptions = [
        { label: 'New Card', value: 'new_card' },
        ...(paymentInfo.paymentMethods || []).map(mapPaymentMethods)
    ].concat(!isNewPaymentMethod ? { value: paymentInfo.paymentMethodId, label: 'xxxx xxxx xxxx xxxx - xx/xx' } : [])

    const orderTotal = context?.ordersCache?.filter(o => o.orderNumber === payment.orderNumber)[0]?.total

    return (
        <Container>
            <Row>
                {loading ?
                    (
                        <Center>
                            <Loader />
                        </Center>
                    ) : (
                        <FormikStyleLabel label='New or Saved Card'>
                            <WrapSelect>
                                <Select
                                    name="billing.cardType"
                                    value={newOrSavedCardOptions.find(o => o.value === selectedCard)}
                                    setValue={handleCardChange}
                                    options={newOrSavedCardOptions}
                                    isSearchable={false}
                                />
                            </WrapSelect>
                        </FormikStyleLabel>
                    )}
                <HalfRow>
                    <SmallInput>
                        <FormikStyleLabel label='Order Total' alignment='right'>
                            {payment?.orderNumber > 0 &&
                                <OrderTotal>${orderTotal}</OrderTotal>
                            }
                        </FormikStyleLabel>
                    </SmallInput>
                    <SmallInput>
                        <FormikStyleInput
                            type='currency'
                            label='Downpayment Amount'
                            alignment='right'
                            value={payment.amountToCharge}
                            onChange={(e) => setPaymentItem('amountToCharge', e.target.value)}
                        />
                    </SmallInput>
                </HalfRow>
            </Row>

            {cardType === 'new_card' && (
                <Row style={{ padding: '8px 10px' }}>
                    <StripePaymentSection setCardIsValid={setCardIsValid} />
                </Row>
            )}
        </Container>
    )
}