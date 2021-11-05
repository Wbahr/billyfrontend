import React, { useContext } from 'react'
import { Field, ErrorMessage } from 'formik'
import SelectField from '../../../_common/formik/select'
import { StateList, CanadianProvinceList } from '../../../_common/helpers/helperObjects'
import StripePaymentSection from '../../uiComponents/stripePayment'
import FormikInput from '../../../_common/formik/input_v2'
import styled from 'styled-components'
import { defaultBilling } from '../../helpers'
import FormikCheckbox from '../../../_common/formik/checkBox'
import Context from '../../../../setup/context'
import { FormikFormFieldError } from 'styles/formikForm'
import Required from '../../../_common/required'

const StyledCheckbox = styled.input`
	width: 15px;
	height: 15px;
	cursor: pointer;
	padding-right: 18px;
	margin: auto 0;
`

const Row = styled.div`
	display: flex;
	flexDirection: row;
    flex-wrap: wrap;
    width: 100%;
`

const Container = styled.div`
    max-width: 100%;
`

const Label = styled.label`
	margin: auto 10px;
`

export default function NewCardSection(props) {
    const { values, setFieldValue, checkoutDropdownData: { billingInfo }, setFieldTouched, isNewPaymentMethod, poMessage } = props
    const context = useContext(Context)

    const handleSameAsShippingChange = (event) => {
        if (event.target.checked) {
            setFieldValue('billing.firstName', values.shipto.firstName)
            setFieldValue('billing.lastName', values.shipto.lastName)
            setFieldValue('billing.address1', values.shipto.address1)
            setFieldValue('billing.address2', values.shipto.address2)
            setFieldValue('billing.city', values.shipto.city)
            setFieldValue('billing.stateOrProvince', values.shipto.stateOrProvince)
            setFieldValue('billing.zip', values.shipto.zip)
            setFieldValue('billing.country', values.shipto.country || 'us')
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
            setFieldValue('billing.country', defaultBilling.country || 'us')
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

    const handleCheckboxChange = name => ({ target: { checked } }) => {
        setFieldValue(name, checked)
    }

    return (
        <Container>
            {isNewPaymentMethod && (
                <Row style={{ padding: '8px 10px' }}>
                    <>
                        <StripePaymentSection {...props} />
                        <FormikFormFieldError style={{ width: '400px', maxWidth: '100%' }}>
                            <ErrorMessage name="billing.cardIsValid" />
                        </FormikFormFieldError>
                    </>
                    {!!context.userInfo && (context.impersonatedCompanyInfo?.customerIdP21 !== 192059) && (
                        <FormikCheckbox
                            label="Save card for future payments?"
                            name="billing.savePaymentMethod"
                            style={{ margin: 'auto 10px auto 0px' }}
                            value={values.billing.savePaymentMethod}
                            onChange={handleCheckboxChange('billing.savePaymentMethod')}
                        />
                    )}
                </Row>
            )}
            <Row style={{ padding: '8px 10px' }}>
                <StyledCheckbox
                    onChange={handleSameAsShippingChange}
                    type='checkbox'
                    name="billing.sameAsShipping"
                    checked={values.billing.sameAsShipping}
                />
                <Label htmlFor="billing.sameAsShipping">Billing same as shipping</Label>
            </Row>

            <Row>
                <div>
                    {!!context.userInfo && <FormikInput label={billingInfo?.requiresPONumber ? <>PO Number <Required /></> : 'PO Number'} name="billing.purchaseOrder" />}
                    { poMessage }
                </div>
                <FormikInput label="Company Name" name="billing.companyName" />
            </Row>

            <Row>
                <FormikInput label={<>First Name<Required /></>} name="billing.firstName" />
                <FormikInput label={<>Last Name<Required /></>} name="billing.lastName" />
            </Row>

            <Row>
                <FormikInput label="Email" name="billing.email" />
                <FormikInput label="Phone" name="billing.phone" />
            </Row>

            <FormikInput label={<>Address 1<Required /></>} name="billing.address1" width={500} />
            <FormikInput label="Address 2" name="billing.address2" width={500} />

            <Row>
                <FormikInput label={<>City<Required /></>} name="billing.city" />
                <FormikInput label={<>Zip<Required /></>} name="billing.zip" width={150} style={{ width: 'auto' }} />
            </Row>

            <Row>
                <div>
                    <Field
                        name="billing.country"
                        component={SelectField}
                        options={[{ label: 'United States', value: 'us' }, { label: 'Canada', value: 'canada' }]}
                        placeholder="Select a Country"
                        isSearchable={false}
                        label={<>Country<Required /></>}
                    />
                    <FormikFormFieldError style={{ width: '200px', maxWidth: '100%' }}>
                        <ErrorMessage name="billing.country" />
                    </FormikFormFieldError>
                </div>
                {values.billing.country === 'us' && (
                    <div>
                        <Field
                            name="billing.stateOrProvince"
                            component={SelectField}
                            options={StateList}
                            placeholder="Select a State"
                            label={<>State<Required /></>}
                            width="200px"
                        />
                        <FormikFormFieldError style={{ width: '400px', maxWidth: '100%' }}>
                            <ErrorMessage name="billing.stateOrProvince" />
                        </FormikFormFieldError>
                    </div>
                )}
                {values.billing.country === 'canada' && (
                    <div>
                        <Field
                            name="billing.stateOrProvince"
                            component={SelectField}
                            options={CanadianProvinceList}
                            placeholder="Select a Province"
                            label={<>Province<Required /></>}
                            width="200px"
                        />
                        <FormikFormFieldError style={{ width: '400px', maxWidth: '100%' }}>
                            <ErrorMessage name="billing.stateOrProvince" />
                        </FormikFormFieldError>
                    </div>
                )}
            </Row>
        </Container>
    )
}
