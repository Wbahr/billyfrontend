import React from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Field as FormikField } from 'formik'
import CurrencyInput from 'react-currency-input'

const DivContainer = styled.div`
  display flex;
  flex-direction: column;
  height: 71px;
  padding: 0 8px;
  width: max-content;
`

const Label = styled.label`
  color: #606060;
  font-size: 14px;
  font-weight: 400;
  padding-left: 4px;
  margin-bottom: -4px;
  // background-color: white;
  width: max-content;
  padding: 2px;
  margin-left: 7px;
`

const MainInput = styled(FormikField)`
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

export default function Input({type, disabled, name, label, placeholder, width, changeFunction, maxlength}){
	if(type === 'text' && _.isNil(changeFunction)){
		return(
			<DivContainer>
				{label && <Label htmlFor={label}>{`${label}`}</Label>}        
				<MainInput 
					type="text" 
					name={name} 
					placeholder={placeholder} 
					disabled={disabled} 
					style={{width: width || '400px'}}
					maxLength={maxlength}
				/>
			</DivContainer>
		)
	} else if(type === 'text' && !_.isNil(changeFunction)){
		return(
			<DivContainer>
				{label && <Label htmlFor={label}>{`${label}`}</Label>}        
				<MainInput 
					type="text" 
					name={name} 
					placeholder={placeholder} 
					disabled={disabled} 
					style={{width: width || '400px'}}
					onChange={(e)=>changeFunction(name, e.target.value)}
					maxLength={maxlength}
				/>
			</DivContainer>
		)
	} else if(type === 'currency') {
		return(
			<DivContainer>
				{label && <Label htmlFor={label}>{`${label}`}</Label>}        
				<FormikField name={name}>
					{({
						field, // { name, value, onChange, onBlur }
						form
					}) => (
						<MainCurrencyInput {...field} value={field.value} prefix='$' style={{width: width || '400px'}} onChangeEvent={e => form.setFieldValue(field.name, e.target.value)}/>
					)}
				</FormikField>
			</DivContainer>
		)
	} else {
		return(
			<FormikField type={type} name={name} />
		)
	}
}

Input.propTypes = {
	name: PropTypes.string.isRequired,
	type: PropTypes.string,
	disabled: PropTypes.bool,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	onChange: PropTypes.string
}

Input.defaultProps = {
	type: 'text',
	placeholder: '',
	maxlength: 'none'
}