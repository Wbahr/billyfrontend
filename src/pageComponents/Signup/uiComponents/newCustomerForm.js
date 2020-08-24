import React, { useEffect, useState } from 'react'
import { Formik, Form, useFormikContext } from 'formik'
import FormikInput from '../../_common/formik/input_v2'
import { ButtonRed } from 'styles/buttons';
import CheckBox from 'pageComponents/_common/formik/checkBox';
import { ShowErrorAlert } from 'styles/alerts';
import { FormikFormGroup, FormikFormContainer } from 'styles/formikForm';
import styled from 'styled-components'
import SearchIcon from '@material-ui/icons/Search'

const DivCenter = styled.div`
  display: flex;
  justify-content: center;
`

const H2 = styled.h2`
  
  text-align: center;
  font-size: 20px;
  margin: 0;
`
const H3 = styled.h3`
  width: 100%;
  text-align: center;
  font-size: 14px;
  font-weight: 800;
  color: black;
`

//Represents a reusable new customer form. Suitable for admin use or admin dash use
export default function NewCustomerForm({ newCustomerInitialValues, newCustomerSchema, onSubmit, choosePasswordEnabled, buttonText, showCustomerLookup }) {
    return (
        <Formik
            initialValues={newCustomerInitialValues}
            validationSchema={newCustomerSchema}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={onSubmit}
        >
            <FormWrapper choosePasswordEnabled={choosePasswordEnabled} buttonText={buttonText} showCustomerLookup={showCustomerLookup} />
        </Formik>
    );
}

export function map(values) {
    return {
        variables: {
            customer: {
                contact: {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    password: values.password,
                    customerIdP21: values.customerId,
                    email: values.email,
                    fax: values.fax,
                    jobTitle: values.jobTitle,
                    phone: values.phone,
                    phoneExtension: values.phoneExtension,
                },
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
    };
};

function CustomerLookup({name}) {
    const { values } = useFormikContext();
    return (
        <FormikFormGroup>
            <FormikInput label="Customer ID" type="text" name={name} />
            <a onClick={({values}) => showSearchCustomerPopup(values.customerIdP21)}><SearchIcon /> Lookup Customer</a>
        </FormikFormGroup>
    );
};

//Buttons is an array of [ {text: 'Button Text', action: func }]
// the action func if omitted will just be the form default "submit"
const FormWrapper = ({choosePasswordEnabled, buttonText, showCustomerLookup}) => {
    const { values, isValid, isSubmitting, dirty, setFieldValue, validateForm } = useFormikContext();
    React.useEffect(() => {
        if (dirty) {
            //Reset the fields and update validation
            setFieldValue('billingCompany', '');
            setFieldValue('billingAddress1', '');
            setFieldValue('billingAddress2', '');
            setFieldValue('billingCity', '');
            setFieldValue('billingState', '');
            setFieldValue('billingPostal', '');
            setFieldValue('billingCountry', '');
            validateForm();
        }
    }, [values.billingSame]);

    return (
        <Form>
            <FormikFormContainer>
                {showCustomerLookup === true && <CustomerLookup name="customerIdP21" />}
                <FormikFormGroup>
                    <H3>Account Information</H3>
                    <FormikInput label="First Name*" type="text" name="firstName" />
                    <FormikInput label="Last Name*" type="text" name="lastName" />
                    <FormikInput label="Job Title" type="text" name="jobTitle" />
                    <FormikInput label="Phone" type="text" name="phone" />
                    <FormikInput label="Phone Extension" type="text" name="phoneExtension" />
                    <FormikInput label="Email*" type="email" name="email" />
                    <FormikInput label="Fax" type="text" name="fax" />
                    {choosePasswordEnabled === true && <FormikInput label="Password*" type="password" name="password" />}
                    {choosePasswordEnabled === true && <FormikInput label="Verify Password*" type="password" name="verifyPassword" />}
                </FormikFormGroup>
                <FormikFormGroup>
                    <H3>Shipping Information</H3>
                    <FormikInput label="Company*" type="text" name="shippingCompany" />
                    <FormikInput label="Address Line 1" type="text" name="shippingAddress1" />
                    <FormikInput label="Address Line 2" type="text" name="shippingAddress2" />
                    <FormikInput label="City" type="text" name="shippingCity" />
                    <FormikInput label="State" type="text" name="shippingState" />
                    <FormikInput label="Zip/Postal Code" type="text" name="shippingPostal" />
                    <FormikInput label="Country" type="text" name="shippingCountry" />
                </FormikFormGroup>
                <FormikFormGroup>
                    <H3>Billing Information</H3>
                    <CheckBox label="Same as Shipping" name="billingSame" />
                    <FormikInput label="Company" type="text" name="billingCompany" disabled={values.billingSame == 1} />
                    <FormikInput label="Address Line 1" type="text" name="billingAddress1" disabled={values.billingSame == 1} />
                    <FormikInput label="Address Line 2" type="text" name="billingAddress2" disabled={values.billingSame == 1} />
                    <FormikInput label="City" type="text" name="billingCity" disabled={values.billingSame == 1} />
                    <FormikInput label="State" type="text" name="billingState" disabled={values.billingSame == 1} />
                    <FormikInput label="Zip/Postal Code" type="text" name="billingPostal" disabled={values.billingSame == 1} />
                    <FormikInput label="Country" type="text" name="billingCountry" disabled={values.billingSame == 1} />
                </FormikFormGroup>
            </FormikFormContainer>
            {!isValid && <DivCenter><ShowErrorAlert message="Please correct the problems and try again" /></DivCenter>}
            <DivCenter>
                <ButtonRed type="submit" disabled={isSubmitting}>{buttonText}</ButtonRed>
            </DivCenter>
        </Form>
    );
}