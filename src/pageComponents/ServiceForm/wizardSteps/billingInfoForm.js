import React, { useContext, useEffect } from 'react'
import { Field } from 'formik'
import styled from 'styled-components'
import { ButtonBlack, ButtonRed } from '../../../styles/buttons'
import { DivNavigation } from '../../../styles/divs'
import Context from '../../../setup/context'
import { StateList, CanadianProvinceList } from '../../_common/helpers/helperObjects'
import SelectField from '../../_common/formik/select'
import FormikCheckbox from '../../_common/formik/checkBox'
import FormikInput from '../../_common/formik/input_v2'
import Loader from '../../_common/loader'
import { defaultBilling } from '../helpers'

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
	}
`

export default function BillingInfoForm(props) {
    const { setFieldValue, values: { contact }, handleMoveStep, isStepValid, 
        creditCardLoading, guestFetching, checkoutDropdownData, setFieldTouched, values } = props
    const context = useContext(Context)

    useEffect(() => {
        setFieldValue('billing', {
            ...props.values.billing,
            firstName: (context.userInfo?.isImpersonatorUser ? contact?.firstName : loggedInUserContactInfo?.firstName) || '',
            lastName: (context.userInfo?.isImpersonatorUser ? contact?.lastName : loggedInUserContactInfo?.lastName) || '',
            email: (context.userInfo?.isImpersonatorUser ? contact?.email : loggedInUserContactInfo?.email) || '',
            phone: (context.userInfo?.isImpersonatorUser ? contact?.phone : loggedInUserContactInfo?.phoneNumber) || '',
        })
    }, [])

    const handleSameAsShippingChange = (event) => {
        if (event.target.checked) {
            setFieldValue('billing.firstName', values.shipto.firstName)
            setFieldValue('billing.lastName', values.shipto.lastName)
            setFieldValue('billing.address1', values.shipto.address1)
            setFieldValue('billing.address2', values.shipto.address2)
            setFieldValue('billing.city', values.shipto.city)
            setFieldValue('billing.stateOrProvince', values.shipto.stateOrProvince)
            setFieldValue('billing.zip', values.shipto.zip)
            setFieldValue('billing.country', values.shipto.country)
            setFieldValue('billing.companyName', values.shipto.companyName)
            setFieldValue('billing.email', values.shipto.email)
            setFieldValue('billing.phone', values.shipto.phone)
            setFieldValue('billing.sameAsShipping', true)
        } else {
            setFieldValue('billing.firstName', defaultBilling.firstName)
            setFieldValue('billing.lastName', defaultBilling.lastName)
            setFieldValue('billing.address1', defaultBilling.address1)
            setFieldValue('billing.address2', defaultBilling.address2)
            setFieldValue('billing.city', defaultBilling.city)
            setFieldValue('billing.stateOrProvince', defaultBilling.stateOrProvince)
            setFieldValue('billing.zip', defaultBilling.zip)
            setFieldValue('billing.country', defaultBilling.country)
            setFieldValue('billing.companyName', defaultBilling.companyName)
            setFieldValue('billing.email', defaultBilling.email)
            setFieldValue('billing.phone', defaultBilling.phone)
            setFieldValue('billing.sameAsShipping', false)
        }

        //setFieldValue does not trigger validation. This is a workaround.
        //Without this, selecting "same as shipping" would leave the
        //Continue button disabled.
        setTimeout(() => setFieldTouched('billing.zip', true))
    }

    const loggedInUserContactInfo = checkoutDropdownData.contacts?.[0]
    
    const handleContinueClick = () => handleMoveStep(2)

    return (
        <WrapForm>
            <FormRow>
                <FormikCheckbox
                    label="Billing same as shipping"
                    onChange={handleSameAsShippingChange}
                    name='billing.sameAsShipping'
                    style={{ alignSelf: 'flex-end' }}
                    value={values.billing.sameAsShipping}
                />
            </FormRow>
            <FormRow>
                <FormikInput label="First Name*" name="billing.firstName" />
                <FormikInput label="Last Name*" name="billing.lastName" />
            </FormRow>
            <FormRow>
                <FormikInput label='Email Invoice To' name="billing.email" />
                <FormikInput label="Phone" name="billing.phone" />
            </FormRow>
            <FormRow>
                <FormikInput label="Address 1*" name="billing.address1" width={500} />
            </FormRow>
            <FormRow>
                <FormikInput label="Address 2" name="billing.address2" width={500} />
            </FormRow>
            <FormRow>
                <FormikInput label="City*" name="billing.city" />
                <FormikInput label="Zip*" name="billing.zip" width={150} style={{ width: 'auto' }} />
            </FormRow>
            <FormRow>
                <Field
                    name="billing.country"
                    component={SelectField}
                    options={[{ label: 'United States', value: 'us' }, { label: 'Canada', value: 'canada' }]}
                    placeholder="Select a Country"
                    isSearchable={false}
                    label="Country*"
                />
                {values.billing.country === 'us' && (
                    <Field
                        name="billing.stateOrProvince"
                        component={SelectField}
                        options={StateList}
                        placeholder="Select a State"
                        label="State*"
                        width="200px"
                    />
                )}
                {values.billing.country === 'canada' && (
                    <Field
                        name="billing.stateOrProvince"
                        component={SelectField}
                        options={CanadianProvinceList}
                        placeholder="Select a Province"
                        label="Province*"
                        width="200px"
                    />
                )}
            </FormRow>

            <DivNavigation>
                <ButtonBlack onClick={() => handleMoveStep(0)}>Previous</ButtonBlack>
                {(creditCardLoading || guestFetching) ? (
                    <div style={{ width: 250 }}>
                        <Loader />
                    </div>
                ) : (
                    <ButtonRed disabled={!isStepValid} onClick={handleContinueClick}>Continue</ButtonRed>
                )}
            </DivNavigation>
        </WrapForm>
    )
}