// Render Prop
import React from 'react';
import { Formik, Form } from 'formik';
import styled from "styled-components"
import FormikInput from '../../_common/formik/input_v2'

const ButtonRed = styled.button`
  background-color: rgb(219, 22, 51);
  color: white;
  font-weight: 600;
  border: 0;
  padding: 4px 8px;
  box-shadow: 2px 2px 4px #000;
  &:hover{
    background-color: #b51029;
  }
  &:active{
    background-color: #b51029;
    box-shadow: 2px 2px 2px #000;
  }
`

const DivCenter = styled.div`
  display: flex;
  justify-content: center;
`

const H2 = styled.h2`
  width: 100%;
  text-align: center;
  font-size: 20px;
  margin: 0;
`

const H4 = styled.h4`
  width: 100%;
  text-align: center;
  font-size: 16px;
  color: #DB1633;
`

const DivFormContainer = styled.div`
  display: flex;
  margin-bottom: 8px; 
`

const DivInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 16px;
  background-color: whitesmoke
  padding: 8px 16px;
`

const DivInputContainerDark = styled(DivInputContainer)`
  background-color: #e8e8e8;
`

const H3 = styled.h3`
  width: 100%;
  text-align: center;
  font-size: 14px;
  font-weight: 800;
  color: black;
`

const NewCustomer = () => (
  <div>
    <H2>Standard Registration</H2>
    <H4>for New Customers</H4>
    <Formik
      initialValues={{ firstName: '', lastName: '', email: '', customerID: '', password: '', verifyPassword: '' }}
      validate={values => {
        let errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
        {
          errors.email = 'Invalid email address';
        }
        if(!values.firstName) {
          errors.firstName = 'Required';
        }
        if(!values.lastName) {
          errors.lastName = 'Required';
        }
        if(!values.customerID) {
          errors.customerID = 'Required';
        }
        if(!values.password) {
          errors.password = 'Required';
        } 
        if(!values.verifyPassword) {
          errors.verifyPassword = 'Required';
        } else if (values.password && values.verifyPassword && (values.password !== values.verifyPassword)) {
          errors.password = 'Passwords do not match';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <DivFormContainer>
            <DivInputContainer>
              <H3>Account Information</H3>
              <FormikInput label="First Name" type="text" name="firstName" />
              <FormikInput label="Last Name" type="text" name="lastName" />
              <FormikInput label="Job Title"type="email" name="email" />
              <FormikInput label="Phone" type="text" name="customerID" />
              <FormikInput label="Email" type="password" name="password" />
              <FormikInput label="Fax" type="password" name="verifyPassword" />
              <FormikInput label="Password" type="password" name="password" />
              <FormikInput label="Verify Password" type="password" name="verifyPassword" />
            </DivInputContainer>
            <DivInputContainerDark>
              <H3>Billing Information</H3>
              <FormikInput label="Company" type="text" name="billing_firstName" />
              <FormikInput label="Address Line 1" type="text" name="billing_lastName" />
              <FormikInput label="Address Line 2"type="email" name="billing_email" />
              <FormikInput label="City" type="text" name="billing_customerID" />
              <FormikInput label="State" type="password" name="billing_password" />
              <FormikInput label="Zip Code" type="password" name="billing_verifyPassword" />
              <FormikInput label="Country" type="password" name="billing_password" />
            </DivInputContainerDark>
            <DivInputContainer>
              <H3>Shipping Information</H3>
              <FormikInput label="Same as Billing Checkbox" type="text" name="shipping_firstName" />
              <FormikInput label="Company" type="text" name="shipping_firstName" />
              <FormikInput label="Address Line 1" type="text" name="shipping_lastName" />
              <FormikInput label="Address Line 2"type="email" name="shipping_email" />
              <FormikInput label="City" type="text" name="shipping_customerID" />
              <FormikInput label="State" type="password" name="shipping_password" />
              <FormikInput label="Zip Code" type="password" name="shipping_verifyPassword" />
              <FormikInput label="Country" type="password" name="shipping_password" />
            </DivInputContainer>
          </DivFormContainer>
          <DivCenter>
            <ButtonRed type="submit" disabled={isSubmitting}>
              Register Account
            </ButtonRed>
          </DivCenter>
        </Form>
      )}
    </Formik>
  </div>
);

export default NewCustomer;