import React from 'react'
import _ from 'lodash'
import { Formik } from 'formik'
import styled from 'styled-components'
import FormikInput from '../../_common/formik/input_v2'
import FormikTextArea from '../../_common/formik/textarea_v2'
import FormikCheckbox from '../../_common/formik/checkBox'
import Button from '../../_common/button'

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 60px 0;
  flex-direction: row-reverse;
  justify-content: space-between;
  flex-grow: 99;
`

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  padding: 20px;
  background-color: rgb(242, 243, 244);
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
  height: max-content;
`

const initValues = {
  firstName: '',
  lastName: '',
  jobTitle: '',
  company: '',
  city: '',
  state: '',
  zip: '',
  email: '',
  phone: '',
  jobOrder: '',
  message: '',
  subMailingList: '0'
}

export default function ContactUsForm() {
  return (
    <FormContainer>
      <Formik 
        initialValues={initValues}
      >
        {formikProps => (
          <Form name="contactUsForm" {...formikProps}>
            <FormikInput label="First Name*" name="firstName" />
            <FormikInput label="Last Name*" name="lastName" />
            <FormikInput label="Job Title*" name="jobTitle" />
            <FormikInput label="Company*" name="company" />
            <FormikInput label="City*" name="city" />
            <FormikInput label="State*" name="state" />
            <FormikInput label="Zip Code*" name="zip" />
            <FormikInput label="Email*" name="email" />
            <FormikInput label="Phone Number*" name="phone" />
            <FormikInput label="Job PO Number*" name="jobOrder" />
            <FormikTextArea label="Message" name="message" placeholder="Please Enter your Message.." rows="3" />
            <Button type="submit" color="main" text="Submit"/>
            <FormikCheckbox label="Subscribe to our Mailing List?" name="subMailingList"/>
          </Form>
        )}
      </Formik>
    </FormContainer>
  )
}