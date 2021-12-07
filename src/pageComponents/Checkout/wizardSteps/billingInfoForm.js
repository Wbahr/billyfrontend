import React, { useEffect, useContext, useState } from 'react'
import { Field } from 'formik'
import styled from 'styled-components'
import NewCardSection from './billingInfoComponents/newCardSection'
import PurchaseOrderSection from './billingInfoComponents/purchaseOrderSection'
import { ButtonBlack, ButtonRed } from '../../../styles/buttons'
import Context from '../../../setup/context'
import { useLazyQuery } from '@apollo/client'
import Select from '../../_common/form/select'
import FormikInput from '../../_common/formik/input_v2'
import Loader from '../../_common/loader'
import { useDidUpdateEffect } from '../../_common/helpers/generalHelperFunctions'
import { CHECK_PO } from '../../../setup/providerGQL'
import Required from '../../_common/required'
import { useDebounceValue } from '../../_common/helpers/generalHelperFunctions'

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

const Po = styled.div`
    font-size: 14px;
    margin-left: 10px;
    color: red;
`

function BillingInfoForm(props) {
    const { 
        setValues, 
        setFieldValue, 
        selectedCard, 
        setSelectedCard, 
        values: { 
            contact, 
            billing: { 
                paymentMethod, 
                cardType, 
                purchaseOrder
            } 
        },
        checkoutDropdownData: { billingInfo }, 
        handleMoveStep, 
        isStepValid, 
        setPaymentInfo,
        paymentInfo,
        showPoOption,
        creditCardLoading, 
        guestFetching, 
        checkoutDropdownData, 
        setFieldTouched, 
        cardIsValid, 
        setCardIsValid, 
        resetCard 
    } = props

    const context = useContext(Context)
    const [duplicatePo, setDuplicatePo] = useState(false)
    const [touchBilling, setTouchBilling] = useState(false)
    const debouncedPO = useDebounceValue(purchaseOrder, 1000)

    useDidUpdateEffect(() => {
        setFieldValue('billing.cardIsValid', cardIsValid)
    }, [cardIsValid])

    useDidUpdateEffect(() => {
        touchBillingInfoFields()
    }, [touchBilling])

    useEffect(() => {
        window.scrollTo({ top: 0 })
        if (!paymentMethod) {
            setFieldValue('billing.paymentMethod', context.userInfo && billingInfo?.isNetTerms ? 'purchase_order' : 'credit_card')
        }
    }, [])

    const [checkPo] = useLazyQuery(CHECK_PO, {
        fetchPolicy: 'no-cache',
        variables: { poNumber: cleanPo(debouncedPO) },
        onCompleted: result => {
            setDuplicatePo(result.isDuplicatePurchaseOrderNumber)
        }
    })

    function cleanPo(str) {
        return str.replace('\ufeff', '').trim()
    }
    
    useEffect(() => {
        if (debouncedPO.length > 0) {
            checkPo(debouncedPO)
        }
    }, [debouncedPO])

    const poMessage = duplicatePo ? <Po>PO number has already been used.</Po> : null

    const handleContinueClick = () => {
        const disabled = !isStepValid
        if (disabled) {
            touchBillingInfoFields()
        } else {
            handleMoveStep(2)
        }
    }

    const handleCardChange = value => {
        setValues({
            ...props.values,
            billing: {
                ...props.values.billing,
                country: props.values.billing.country.toLowerCase() || 'us',
                cardType: value === 'new_card' ? value : 'saved_card',
                cardIsValid: value === 'new_card' ? cardIsValid : true
            }
        })

        if (value === 'new_card'){
            setPaymentInfo({
                ...paymentInfo,
                paymentMethodId: ''
            })
        } else {
            setPaymentInfo({
                ...paymentInfo,
                paymentMethodId: value
            })
        }

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
                country: billingInfo?.country.toLowerCase() || 'us',
                firstName: (context.userInfo?.isImpersonatorUser ? contact?.firstName : loggedInUserContactInfo?.firstName) || '',
                lastName: (context.userInfo?.isImpersonatorUser ? contact?.lastName : loggedInUserContactInfo?.lastName) || '',
                email: (context.userInfo?.isImpersonatorUser ? contact?.email : loggedInUserContactInfo?.email) || '',
                phone: (context.userInfo?.isImpersonatorUser ? contact?.phone : loggedInUserContactInfo?.phoneNumber) || '',

            })
            setTouchBilling(!touchBilling)
        } else {
            setFieldValue('billing', {
                ...props.values.billing,
                country: props.values.billing.country.toLowerCase() || 'us',
                paymentMethod: value,
                cardType: value === 'credit_card' ? cardType : ''
            })
            setTouchBilling(!touchBilling)
        }
    }

    function touchBillingInfoFields() {
        const fields = ['phone', 'email', 'firstName', 'lastName', 'country', 'stateOrProvince', 
            'zip', 'city', 'address1', 'paymentMethod', 'cardIsValid']
        if (billingInfo?.isNetTerms) {
            fields.push('purchaseOrder')
        }
        for (const field of fields) {
            setFieldTouched(`billing.${field}`, true)
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
                    <label htmlFor="billing.paymentMethod">How would you like to pay? <Required /></label>
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

            {paymentMethod === 'credit_card' && 
            context.userInfo?.isAirlineEmployee && 
            !context.impersonatedCompanyInfo?.customerIdP21 === 192059 && (
                <FormRow>
                    <label htmlFor="billing.cardType">New or Saved Card? <Required /></label>
                    <Select
                        name="billing.cardType"
                        value={newOrSavedCardOptions.find(o => o.value === selectedCard)}
                        setValue={handleCardChange}
                        options={newOrSavedCardOptions}
                        isSearchable={false}
                    />
                </FormRow>
            )}

            {paymentMethod === 'purchase_order' && <PurchaseOrderSection {...props} poMessage={poMessage} />}
            {paymentMethod === 'credit_card' && !context.userInfo?.isAirlineEmployee && selectedCard !== 'new_card' && (
                <DivNavigation>
                    <ButtonBlack onClick={() => { resetCard() }} >
                        Change Credit Card
                    </ButtonBlack>
                </DivNavigation>
            )}
            {paymentMethod === 'credit_card' && cardType === 'new_card' && (
                <NewCardSection {...props} setCardIsValid={setCardIsValid} isNewPaymentMethod={isNewPaymentMethod} poMessage={poMessage} />
            )}
            {paymentMethod === 'credit_card' && cardType === 'saved_card' && context.userInfo && (
                <FormikInput label={billingInfo?.requirePoNumber ? <div>PO Number <Required /></div> : 'PO Number'} name="billing.purchaseOrder" />
            )}
            { paymentMethod === 'credit_card' && cardType === 'saved_card' && context.userInfo && (
                poMessage
            )}

            <DivNavigation>
                <ButtonBlack onClick={() => handleMoveStep(0)}>Previous</ButtonBlack>
                {(creditCardLoading || guestFetching) ? (
                    <div style={{ width: 250 }}>
                        <Loader/>
                    </div>
                ) : (
                    <ButtonRed onClick={handleContinueClick}>Continue</ButtonRed>
                )}
            </DivNavigation>
        </WrapForm>
    )
}

export default BillingInfoForm
