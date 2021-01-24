import React from 'react'
import { Formik, Form } from 'formik'
import styled from 'styled-components'
import Input from '../../_common/formik/input_v2'
import TextArea from '../../_common/formik/textarea_v2'
import Checkbox from '../../_common/formik/checkBox'
import { ButtonRed } from 'styles/buttons'
import { FormikFormGroup, FormikFormContainerColumnMajor } from 'styles/formikForm'

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 60px 0;
  flex-direction: row-reverse;
  justify-content: space-between;
  flex-grow: 99;
`

const DivCenter = styled.div`
  display: flex;
  justify-content: center;
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
  subMailingList: false
}

export default function ContactUsForm() {
  return (
    <FormContainer>
      <Formik
        initialValues={initValues}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 1000)
        }}
      >
        {({ isSubmitting, isValid }) => (
          <Form name="contactUsForm">
            {/*{ !isValid && <ShowErrorAlert message="Please correct the problems and try again" />}*/}
            <FormikFormContainerColumnMajor>
              <FormikFormGroup>
                <Input label="First Name*" name="firstName" />
                <Input label="Last Name*" name="lastName" />
                <Input label="Job Title" name="jobTitle" />
                <Input label="Company" name="company" />
                <Input label="City" name="city" />
                <Input label="State" name="state" />
                <Input label="Zip Code" name="zip" />
                <Input label="Email*" name="email" />
                <Input label="Phone Number" name="phone" />
                <Input label="Job PO Number" name="jobOrder" />
                <TextArea label="Message" name="message" placeholder="Please Enter your Message.." rows="3" />
                <Checkbox label="Subscribe to our Mailing List?" name="subMailingList" width="400px"/>
              </FormikFormGroup>
            </FormikFormContainerColumnMajor>
            <DivCenter>
              <ButtonRed type="submit" disabled={isSubmitting}>Submit</ButtonRed>
            </DivCenter>
          </Form>
        )}
      </Formik>
    </FormContainer>
  )
}