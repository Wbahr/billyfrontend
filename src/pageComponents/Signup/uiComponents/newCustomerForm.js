import React, { useState } from 'react'
import { Formik, Form, useFormikContext, Field, ErrorMessage } from 'formik'
import FormikInput from '../../_common/formik/input_v2'
import { ButtonRed } from 'styles/buttons'
import CheckBox from 'pageComponents/_common/formik/checkBox'
import { ShowErrorAlert } from 'styles/alerts'
import { FormikFormGroup, FormikFormContainer, FormikFormFieldContainer, FormikFormFieldError } from 'styles/formikForm'
import styled from 'styled-components'
import SearchIcon from '@material-ui/icons/Search'
import SearchCustomerModal from './searchCustomerModal'
import { ButtonLink } from 'styles/tables'
import PasswordRequirements from 'pageComponents/PasswordReset/uiComponents/passwordRequirements'

const DivCenter = styled.div`
  display: flex;
  justify-content: center;
`

const H3 = styled.h3`
  width: 100%;
  text-align: center;
  font-size: 14px;
  font-weight: 800;
  color: black;
`

const DivRow = styled.div`
  margin: 4px auto;
`

//Represents a reusable new customer form. Suitable for admin use or admin dash use
export default function NewCustomerForm({ useExpandedMode, newCustomerInitialValues, validationSchema, onSubmit, choosePasswordEnabled, buttonText, showCustomerLookup, data }) {
    return (
        <Formik
            enableReinitialize
            initialValues={newCustomerInitialValues}
            validationSchema={validationSchema}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={onSubmit}
        >
            <FormWrapper useExpandedMode={useExpandedMode} data={data} choosePasswordEnabled={choosePasswordEnabled} buttonText={buttonText} showCustomerLookup={showCustomerLookup} />
        </Formik>
    )
}

export function mapToForm(data) {
    return {
        id: data.id || '',
        customerId: String(data.customerIdP21 || ''),
        customerSearch: '',
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        jobTitle: data.jobTitle || '',
        phone: data.phone || '',
        phoneExtension: data.phoneExtension || '',
        email: data.email || '',
        fax: data.fax || '',
        password: '',
        verifyPassword: '',
        shippingCompany: data.shippingCompanyName || '',
        shippingAddress1: data.shippingLine1 || '',
        shippingAddress2: data.shippingLine2 || '',
        shippingCity: data.shippingCity || '',
        shippingState: data.shippingState || '',
        shippingPostal: data.shippingZip || '',
        shippingCountry: data.shippingCountry || '',
        billingSame: false,
        billingCompany: data.billingCompanyName || '',
        billingAddress1: data.billingLine1 || '',
        billingAddress2: data.billingLine2 || '',
        billingCity: data.billingCity || '',
        billingState: data.billingState || '',
        billingPostal: data.billingZip || '',
        billingCountry: data.billingCountry || '',
        passwordStrength: false,
    }
}

function nullIf(str) {
    return str ? str : null
}

export function mapToApi(values) {
    return {
        variables: {
            reg: {
                id: nullIf(values.id),
                customerIdP21: nullIf(values.customerId),
                firstName: values.firstName,
                lastName: values.lastName,
                jobTitle: values.jobTitle,
                phone: values.phone,
                phoneExtension: values.phoneExtension,
                fax: values.fax,
                email: values.email,
                password: values.password,
                shippingCompanyName: values.shippingCompany,
                shippingLine1: values.shippingAddress1,
                shippingLine2: values.shippingAddress2,
                shippingCity: values.shippingCity,
                shippingState: values.shippingState,
                shippingZip: values.shippingPostal,
                shippingCountry: values.shippingCountry,
                billingCompanyName: values.billingSame ? values.shippingCompany : values.billingCompany,
                billingLine1: values.billingSame ? values.shippingAddress1 : values.billingAddress1,
                billingLine2: values.billingSame ? values.shippingAddress2 : values.billingAddress2,
                billingCity: values.billingSame ? values.shippingCity : values.billingCity,
                billingState: values.billingSame ? values.shippingState : values.billingState,
                billingZip: values.billingSame ? values.shippingPostal : values.billingPostal,
                billingCountry: values.billingSame ? values.shippingCountry : values.billingCountry,
            }
        }
    }
}

const CustomerLookup = () => {
    const { values, setFieldValue } = useFormikContext()
    const [showSearchCustomerModal, setShowSearchCustomerModal] = useState(false)
    const setSelectedCustomerIdCallback = (id) => {
        setFieldValue('customerId', id)
    }
    return (
        <FormikFormGroup>
            <FormikInput label="Customer ID" type="text" name="customerId" />
            <FormikFormFieldContainer>
                <ButtonLink onClick={() => setShowSearchCustomerModal(true)}><SearchIcon /> Lookup Customer</ButtonLink>
                <SearchCustomerModal
                    open={showSearchCustomerModal}
                    hideModal={() => setShowSearchCustomerModal(false)}
                    initialValue={values.customerId}
                    setSelectedCustomerIdCallback={setSelectedCustomerIdCallback}
                />
            </FormikFormFieldContainer>
            <FormikFormFieldContainer>
                <span>Note: When customer ID is specified, Bill to and Ship to addresses will be ignored and only website login and P21 contact record for the specified Customer ID will be created.</span>
                <span>If Customer ID is blank, then a new P21 customer will be created, in addition to the website login.</span>
            </FormikFormFieldContainer>
        </FormikFormGroup>
    )
}

const FormWrapper = ({ useExpandedMode, choosePasswordEnabled, buttonText, showCustomerLookup }) => {
    const { values, isValid, isSubmitting, dirty, setFieldValue, validateForm } = useFormikContext()

    React.useEffect(() => {
        if (dirty && values.billingSame == true) {
            console.log('Billing same changed.')
            //Reset the fields and update validation
            setFieldValue('billingCompany', '')
            setFieldValue('billingAddress1', '')
            setFieldValue('billingAddress2', '')
            setFieldValue('billingCity', '')
            setFieldValue('billingState', '')
            setFieldValue('billingPostal', '')
            setFieldValue('billingCountry', '')
            validateForm()
        }
    }, [values.billingSame])

    return (
        <Form>
            {showCustomerLookup === true && <Field name="id" type="hidden" />}
            <FormikFormContainer>
                {showCustomerLookup === true && <CustomerLookup />}
                <FormikFormGroup>
                    <H3>Account Information</H3>
                    {useExpandedMode === false && showCustomerLookup === false && <FormikInput label="Customer ID*" type="text" name="customerId" />}
                    <FormikInput label="First Name*" type="text" name="firstName" />
                    <FormikInput label="Last Name*" type="text" name="lastName" />
                    <FormikInput label="Job Title" type="text" name="jobTitle" />
                    <FormikInput label="Phone" type="text" name="phone" />
                    <FormikInput label="Phone Extension" type="text" name="phoneExtension" />
                    <FormikInput label="Email*" type="email" name="email" />
                    <FormikInput label="Fax" type="text" name="fax" />
                    {choosePasswordEnabled === true && <FormikInput label="Password*" type="password" name="password" />}
                    {choosePasswordEnabled === true && <FormikInput label="Verify Password*" type="password" name="verifyPassword" />}
                    <DivRow>
                        <PasswordRequirements
                            password={values.password}
                            confirmPassword={values.verifyPassword}
                            isValidPassword={(isValid) => setFieldValue('passwordStrength', isValid)}
                        />
                        <FormikFormFieldError style={{ width: '400px' }}>
                            <ErrorMessage name="passwordStrength" />
                        </FormikFormFieldError>
                    </DivRow>
                </FormikFormGroup>
                {useExpandedMode === true && (
                    <>
                        <FormikFormGroup>
                            <H3>Shipping Information</H3>
                            <FormikInput label="Company*" type="text" name="shippingCompany" disabled={values.customerId != ''} />
                            <FormikInput label="Address Line 1" type="text" name="shippingAddress1" disabled={values.customerId != ''} />
                            <FormikInput label="Address Line 2" type="text" name="shippingAddress2" disabled={values.customerId != ''} />
                            <FormikInput label="City" type="text" name="shippingCity" disabled={values.customerId != ''} />
                            <FormikInput label="State" type="text" name="shippingState" disabled={values.customerId != ''} />
                            <FormikInput label="Zip/Postal Code" type="text" name="shippingPostal" disabled={values.customerId != ''} />
                            <FormikInput label="Country" type="text" name="shippingCountry" disabled={values.customerId != ''} />
                        </FormikFormGroup>
                        <FormikFormGroup>
                            <H3>Billing Information</H3>
                            <CheckBox label="Same as Shipping" name="billingSame" disabled={values.customerId !== ''} />
                            <FormikInput label="Company" type="text" name="billingCompany" disabled={values.customerId !== '' || values.billingSame == 1} />
                            <FormikInput label="Address Line 1" type="text" name="billingAddress1" disabled={values.customerId !== '' || values.billingSame == 1} />
                            <FormikInput label="Address Line 2" type="text" name="billingAddress2" disabled={values.customerId !== '' || values.billingSame == 1} />
                            <FormikInput label="City" type="text" name="billingCity" disabled={values.customerId !== '' || values.billingSame == 1} />
                            <FormikInput label="State" type="text" name="billingState" disabled={values.customerId !== '' || values.billingSame == 1} />
                            <FormikInput label="Zip/Postal Code" type="text" name="billingPostal" disabled={values.customerId !== '' || values.billingSame == 1} />
                            <FormikInput label="Country" type="text" name="billingCountry" disabled={values.customerId !== '' || values.billingSame == 1} />
                        </FormikFormGroup>
                    </>
                )}
            </FormikFormContainer>
            {!isValid && <DivCenter><ShowErrorAlert message="Please correct the problems and try again" /></DivCenter>}
            <DivCenter>
                <ButtonRed type="submit" name="submit" disabled={isSubmitting}>{buttonText}</ButtonRed>
            </DivCenter>
        </Form>
    )
}