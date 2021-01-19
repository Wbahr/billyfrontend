import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Field as FormikField, FieldArray, useFormikContext, ErrorMessage } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormikFormFieldContainer, FormikFormField, FormikFormFieldError } from 'styles/formikForm';

const ButtonContainer = styled.div`
  display flex;
  padding: 0 0;
  div {
    cursor: pointer;
	margin: 0 4px;
	align-self: center;
  }
  input {
	  flex-grow: 1;
  }
`

const Label = styled.label`
  color: #606060;
  font-size: 14px;
  font-weight: 400;
  padding-left: 4px;
  margin-bottom: -8px;
  width: max-content;
  padding: 2px;
  margin-left: 7px;
`

const MainInput = styled(FormikField)`
  height: 35px;
  width: 300px;
  padding: 0 8px;
  color: #303030;
  font-size: 16px;
  border-radius: 1px;
  margin: 4px 0;
  border: 1px solid #e1e1e1;  
  :focus{
    border: 1px solid #007bff;  
    outline: none;
  }
`

const DivAddMore = styled.div`
  cursor: pointer;
  font-size: 16px;
  margin-left: 18px;
  font-style: italic;
`

export default function FormikFieldArray({name, label, addMore}){
	const { values } = useFormikContext()

	let valueArray = 'values.' + name
	valueArray = eval(valueArray)
	return (
		<FieldArray
			name={name}
			render={arrayHelpers => (
				<FormikFormFieldContainer>
					<Label>{label}</Label>
					{valueArray && valueArray.length > 0 ? (
						valueArray.map((elem, index) => (
							<React.Fragment key={index}>
								<ButtonContainer>
									<FormikFormField name={`${name}.${index}`} />
									
									<div onClick={() => arrayHelpers.remove(index)}> 
										<FontAwesomeIcon icon="minus-circle" color="grey"/>
									</div>
									
									{ ((index + 1) === valueArray.length && index < 4) &&
										<div onClick={() => arrayHelpers.insert(index, '')}>
											<FontAwesomeIcon icon="plus-circle" color="#328EFC"/>
										</div>
									}
								</ButtonContainer>
								
								<FormikFormFieldError>
									<ErrorMessage name={`${name}.${index}`} />
								</FormikFormFieldError> 
							</React.Fragment>
						))
					) : (
						<DivAddMore onClick={() => arrayHelpers.insert(index, '')}>
							{addMore}
							<FontAwesomeIcon icon="plus-circle" color="#328EFC"/>
						</DivAddMore>
					)}
				</FormikFormFieldContainer>
			)}
		/>
	);
}

FormikFieldArray.propTypes = {
	name: PropTypes.string.isRequired,
	addMore: PropTypes.string.isRequired,
	label: PropTypes.string,
}