import React from 'react'
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
  flex-direction: column;
  align-items: center;
`

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  width: 76%;
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
const P = styled.p`
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 2px;
`
export default function ProjectRequirementForm(props) {
  return (
    <FormContainer>
      <P>{props.text}</P>
      <Formik 
        initialValues={initValues}
      >
        {formikProps => (
          <Form name="contactUsForm" {...formikProps}>
            <FormikInput label="Project Type" name="projectType" />
            <FormikInput label="Quantity" name="quantity" />
            <FormikInput label="Measurement Type" name="measurementType" />
            <FormikInput label="Framing Type" name="framingType" />
            <FormikInput label="Quote Requested By" name="quoteRequestedBy" />
            <FormikInput label="Salesperson" name="salesperson" />
            <FormikTextArea label="Project Comments" name="message" placeholder="Please Enter your Message.." rows="3" />
            <FormikCheckbox label="Salesperson Submission:" name="subMailingList"/>
            <Button type="submit" color="main" text="Submit"/>
          </Form>
        )}
      </Formik>
    </FormContainer>
  )
}