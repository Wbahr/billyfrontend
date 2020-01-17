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

const DivCenter = styled.div`
  display: flex;
  justify-content: center;
`

const ExistingCustomer = () => (
  <div>
    <H2>Express Registration</H2>
    <H4>for Existing Customers</H4>
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
          <FormikInput label="First Name" type="text" name="firstName" />
          <FormikInput label="Last Name" type="text" name="lastName" />
          <FormikInput label="Email"type="email" name="email" />
          <FormikInput label="Customer ID" type="text" name="customerID" />
          <FormikInput label="Password" type="password" name="password" />
          <FormikInput label="Verify Password" type="password" name="verifyPassword" />
          <DivCenter>
            <ButtonRed type="submit" disabled={isSubmitting}>
              Submit
            </ButtonRed>
          </DivCenter>
        </Form>
      )}
    </Formik>
  </div>
);

export default ExistingCustomer;