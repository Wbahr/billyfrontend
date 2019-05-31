import React from 'react'
import { Formik, Form, Field, FieldArray } from 'formik'
import Select from 'react-select'
import styled from 'styled-components'
import { StyledText0, StyledText1 } from '../../styles/fonts'
import Button from '../_common/button'

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
  padding: 10px;
  justify-content: flex-end;
  
  @media (max-width: 700px) {
    flex-direction: column;
    align-items: center;
  }
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

const StyledInput = styled.input`
  width: 48px;
  height: 20px;
  border: 1px solid #404040;
  border-radius: 3px;
  margin: 0 8px;
  padding: 0 8px;
`

const StyledInput2 = styled(StyledInput)`
  width: 200px;
`

const StyledTextArea = styled.textarea`
  width: 300px; 
  border: 1px solid #404040;
  border-radius: 3px;
  margin: 8px;
  padding: 0 8px;
`

const validate = (values) => {
	let errors = null
	console.log('values', values)
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
            <Field
              name={`firstname`}
            />
            <Field
              name={`lastname`}
            />
            <Field
              name={`jobtitle`}
            />
            <Field
              name={`company`}
            />
            <Field
              name={`city`}
            />
            <Field
              name={`firstname`}
            />
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
								{errors && <span>{errors.message}</span>}
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
