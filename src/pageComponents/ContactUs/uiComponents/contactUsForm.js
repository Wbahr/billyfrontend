import React from 'react'
import _ from 'lodash'
import { Formik, Form, Field } from 'formik'
import styled from 'styled-components'
import Button from '../_common/button'
import { emailIsValid, requiredField  } from '../_common/helpers/generalHelperFunctions'

const DivFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const StyledRMAList = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding-left: 10px;
`

const StyledRMAListGrey = styled(StyledRMAList)`
  background-color: #E9E6E5;
  width: 40%;
  padding-top: 10px;
  @media (max-width: 700px) {
    width: auto;
  }
`

const StyledSubmitButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  justify-content: flex-end;
`

const DivErrors = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  background-color: #ff5252;
  color: white;
  border: 1px solid red;
  border-radius: 3px;
  padding: 8px;
  margin: 0 auto 8px auto;
  text-align: center;
`

const StyledCheckbox = styled.input`
  width: 15px;
  height: 15px;
  cursor: pointer;
  padding-right: 18px;
`

const Input = styled.input`
  width: 350px;
  height: 25px;
  border: none;
  border-bottom: 2px solid #404040;
  margin: 8px;
  padding: 16px 8px;
  :focus {
    outline: none;
    border-bottom: 3px solid #404040;
  }
`

const StyledTextArea = styled.textarea`
  width: 350px; 
  border: 1px solid #404040;
  border-radius: 3px;
  margin: 8px;
  padding: 0 8px;
  :focus {
    outline: none;
  }
`

const validate = (values) => {
	let errors = {}
  if (Object.entries(values).length === 0 && values.constructor === Object){
    errors[0].push('Please complete all required fields')
  } else if (requiredField(values.firstname) || requiredField(values.lastname)){
    errors = 'Must fill out full name'
  } else if (requiredField(values.company)){
    errors = 'Must include a company'
  } else if (requiredField(values.phone)){
    errors = 'Must include a contact number'
  } else if (requiredField(values.email) || emailIsValid(values.email)){
    errors = 'Must  include a valid email'
  } else if (requiredField(values.zip) || requiredField(values.state)){
    errors = 'Must include a zipcode and state'
  }
  // console.log('values', values)
  // console.log('errors', errors)
	return errors
}

const ContactUsForm = ({ clickedContinue}) => (
	<div>
		<Formik
			validate={validate}
			validateOnBlur={false}
			validateOnChange={false}
			onSubmit={values => clickedContinue(values.items)}
			render={({ values, handleChange, errors }) => (
        <Form>
          <DivFieldContainer>
            <Field name={`firstname`}>
              {({ field, form}) => (
                <Input {...field}
                  component='input'
                  placeholder='First Name*' />
              )}
            </Field>
            <Field name={`lastname`}>
              {({ field, form}) => (
                <Input {...field}
                  component='input'
                  placeholder='Last Name*' />
              )}
            </Field>
            <Field name={`jobtitle`}>
              {({ field, form}) => (
                <Input {...field}
                  component='input'
                  placeholder='Job Title' />
              )}
            </Field>
            <Field name={`company`}>
              {({ field, form}) => (
                <Input {...field}
                  component='input'
                  placeholder='Company*' />
              )}
            </Field>
            <Field name={`city`}>
              {({ field, form}) => (
                <Input {...field}
                  component='input'
                  placeholder='City' />
              )}
            </Field>
            <Field name={`state`}>
              {({ field, form}) => (
                <Input {...field}
                  component='input'
                  placeholder='State*' />
              )}
            </Field>
            <Field name={`zip`}>
              {({ field, form}) => (
                <Input {...field}
                  component='input'
                  placeholder='Zipcode*' />
              )}
            </Field>
            <Field name={`email`}>
              {({ field, form}) => (
                <Input {...field}
                  component='input'
                  placeholder='Email*' />
              )}
            </Field>
            <Field name={`phone`}>
              {({ field, form}) => (
                <Input {...field}
                  component='input'
                  placeholder='Phone*' />
              )}
            </Field>
            <Field name={`jobnum`}>
              {({ field, form}) => (
                <Input {...field}
                  component='input'
                  placeholder='Job or PO Number' />
              )}
            </Field>
            <Field component='textarea' name={`items.${index}.details`}>
              {({ field, form}) => (
                <StyledTextArea {...field}
                  component='textarea'
                  rows='3'
                  placeholder='Please type your message here.' />
              )}
            </Field>
          </DivFieldContainer>
          <StyledSubmitButtonContainer>
            {!_.isNil(errors) &&
              <DivErrors>
                {Object.keys(errors).length > 0 && <span>{errors[0]}</span>}
              </DivErrors>
            }
            <Button type="submit" text='Submit' />
          </StyledSubmitButtonContainer>
        </Form>
			)}
		/>
	</div>
)

export default ContactUsForm
