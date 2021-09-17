import React, { useEffect, useContext, useState } from 'react'
import { Field } from 'formik'
import styled from 'styled-components'
import NewCardSection from './billingInfoComponents/newCardSection'
import PurchaseOrderSection from './billingInfoComponents/purchaseOrderSection'
import { ButtonBlack, ButtonRed } from '../../../styles/buttons'
import Context from '../../../setup/context'
import { transformForPaymentInfo } from '../helpers'
import Select from '../../_common/form/select'
import FormikInput from '../../_common/formik/input_v2'
import Loader from '../../_common/loader'
import { useDidUpdateEffect } from '../../_common/helpers/generalHelperFunctions'

const WrapForm = styled.div`
    display: flex;
    flex-wrap: wrap;
	flex-direction: column;
`

const FormRow = styled.div`
    display: flex;
    flex-wrap: wrap;
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
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 30px;
  width: 100%;
`

function BillingInfoForm(props) {
    const { setValues, setFieldValue, selectedCard, setSelectedCard, values: { contact, billing: { paymentMethod, cardType } },
        checkoutDropdownData: { billingInfo }, handleMoveStep, isStepValid, paymentInfo, getPaymentInfo, showPoOption,
        creditCardLoading, guestFetching, checkoutDropdownData } = props
    const context = useContext(Context)
    const [cardIsValid, setCardIsValid] = useState()

    useDidUpdateEffect(() => {
        setFieldValue('billing.cardIsValid', cardIsValid)
    }, [cardIsValid])

    useEffect(() => {
        if (context.userInfo) {
            getPaymentInfo(transformForPaymentInfo(props.values))
        }
    }, [context.userInfo])

    useEffect(() => {
        window.scrollTo({ top: 0 })
        if (!paymentMethod) {
            setFieldValue('billing.paymentMethod', context.userInfo && billingInfo?.isNetTerms ? 'purchase_order' : 'credit_card')
        }
    }, [])

    const handleContinueClick = () => handleMoveStep(2)

    const handleCardChange = value => {
        setValues({
            ...props.values,
            billing: {
                ...props.values.billing,
                cardType: value === 'new_card' ? value : 'saved_card',
                cardIsValid: value === 'new_card' ? cardIsValid : true
            }
        })
        setSelectedCard(value)
    }

    const handleRadioButtonClick = ({ target: { value } }) => {
        const cardType = selectedCard === 'new_card' ? 'new_card' : 'saved_card'
    
        const loggedInUserContactInfo = checkoutDropdownData.contacts?.[0]

        //If the customer requires a PO, we need to reload the canned data
        // and not persist changes made in Credit Card mode.
        if (billingInfo?.isNetTerms) {
            setFieldValue('billing', {
                ...props.values.billing,
                paymentMethod: value,
                cardType: value === 'credit_card' ? cardType : '',
                companyName: billingInfo?.companyName || '',
                address1: billingInfo?.address1 || '',
                address2: billingInfo?.address2 || '',
                city: billingInfo?.city || '',
                stateOrProvince: billingInfo?.state || '',
                zip: billingInfo?.zip || '',
                country: billingInfo?.country.toLowerCase() || '',
                firstName: (context.userInfo?.isImpersonatorUser ? contact?.firstName : loggedInUserContactInfo?.firstName) || '',
                lastName: (context.userInfo?.isImpersonatorUser ? contact?.lastName : loggedInUserContactInfo?.lastName) || '',
                email: (context.userInfo?.isImpersonatorUser ? contact?.email : loggedInUserContactInfo?.email) || '',
                phone: (context.userInfo?.isImpersonatorUser ? contact?.phone : loggedInUserContactInfo?.phoneNumber) || '',

            })
        } else {
            setFieldValue('billing', {
                ...props.values.billing,
                paymentMethod: value,
                cardType: value === 'credit_card' ? cardType : ''
            })
        }
    }

    const RadioButtons = ({ field }) => (
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

    return (
        <WrapForm>
            {showPoOption && (
                <FormRow>
                    <label htmlFor="billing.paymentMethod">How would you like to pay?*</label>
                    <Field
                        name="billing.paymentMethod"
                        component={RadioButtons}
                        options={[{ label: 'Purchase Order', value: 'purchase_order' }, { label: 'Credit Card', value: 'credit_card' }]}
                        placeholder="Select a Payment Method"
                        isSearchable={false}
                        value="purchase_order"
                    />
                </FormRow>
            )}

            {paymentMethod === 'credit_card' && context.userInfo?.isAirlineEmployee && (
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
            {paymentMethod === 'credit_card' && !context.userInfo?.isAirlineEmployee && selectedCard !== 'new_card' && (
                <DivNavigation>
                    <ButtonBlack onClick={() => { 
                        setSelectedCard('new_card')
                        setCardIsValid(false)    
                    }}
                    >
                        Change Credit Card
                    </ButtonBlack>
                </DivNavigation>
            )}
            {paymentMethod === 'credit_card' && cardType === 'new_card' && (
                <NewCardSection {...props} setCardIsValid={setCardIsValid} isNewPaymentMethod={isNewPaymentMethod}/>
            )}
            {paymentMethod === 'credit_card' && cardType === 'saved_card' && context.userInfo && (
                <FormikInput label={billingInfo?.requirePoNumber ? 'PO Number*' : 'PO Number'} name="billing.purchaseOrder" />
            )}

            <DivNavigation>
                <ButtonBlack onClick={() => handleMoveStep(0)}>Previous</ButtonBlack>
                {(creditCardLoading || guestFetching) ? (
                    <div style={{ width: 250 }}>
                        <Loader/>
                    </div>
                ) : (
                    <ButtonRed disabled={!isStepValid} onClick={handleContinueClick}>Continue</ButtonRed>
                )}
            </DivNavigation>
        </WrapForm>
    )
}

export default BillingInfoForm
