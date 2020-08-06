import React from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import CurrencyInput from 'react-currency-input'
import { FormikFormFieldContainer, FormikFormFieldLabel, FormikFormFieldError, FormikFormField } from 'styles/formikForm'

const MainCurrencyInput = styled(CurrencyInput)`
  height: 40px;
  padding: 0 8px;
  color: #303030;
  font-size: 16px;
  border-radius: 1px;
  border: 1px solid #e1e1e1;  
  :focus{
    border: 1px solid #007bff;  
    outline: none;
  }
  ::placeholder {
    color: grey;
    font-size: 14px;
  }
`

export default function Input({type, disabled, name, label, placeholder, width, changeFunction, maxlength, validationMessage }){
	if((type === 'text' || type === 'email' || type === 'password')) {
		return(
			<FormikFormFieldContainer>
				{label && <FormikFormFieldLabel htmlFor={name}>{`${label}`}</FormikFormFieldLabel>}
				<FormikFormField 
					type={type}
					name={name}
					id={name}
					placeholder={placeholder} 
					disabled={disabled} 
					style={{width: width || '400px'}}
					maxLength={maxlength}
				/>
				{validationMessage && <FormikFormFieldError>{validationMessage}</FormikFormFieldError>} 
			</FormikFormFieldContainer>
		)
	} else if(type === 'currency') {
		return(
			<FormikFormFieldContainer>
				{label && <FormikFormFieldLabel htmlFor={name}>{`${label}`}</FormikFormFieldLabel>}      
				<FormikFormField name={name}>
					{({
						field, 
						form
					}) => (
						<MainCurrencyInput id={name} {...field} value={field.value} prefix='$' style={{width: width || '400px'}} onChangeEvent={e => form.setFieldValue(field.name, e.target.value)}/>
					)}
				</FormikFormField>
				{validationMessage && <FormikFormFieldError>{validationMessage}</FormikFormFieldError>}   
			</FormikFormFieldContainer>
		)
	} else {
		return(
			<FormikFormFieldContainer>
				{label && <FormikFormFieldLabel htmlFor={name}>{label}</FormikFormFieldLabel>}
				<FormikFormField id={name} type={type} name={name} />
			</FormikFormFieldContainer>
		)
	}
}

Input.propTypes = {
	name: PropTypes.string.isRequired,
	type: PropTypes.string,
	disabled: PropTypes.bool,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	onChange: PropTypes.string,
	validationMessage: PropTypes.string,
}

Input.defaultProps = {
	type: 'text',
	placeholder: '',
	maxlength: 'none'
}