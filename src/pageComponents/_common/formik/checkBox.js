import React from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Field as FormikField, ErrorMessage, useFormikContext } from 'formik'

const DivContainer = styled.div`
  display flex;
  padding: 0 8px;
`

const Label = styled.label`
  margin: 4px 8px auto 4px;
`

const DivError = styled.div`
  color: #DB1633;
  font-size: 12px;
  font-weight: 500;
  padding-left: 8px;
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
`

export default function CheckBox({disabled, name, label, changeFunction}){
	const { values, setFieldValue } = useFormikContext()
	let isChecked = 'values.' + name
	if(_.isNil(changeFunction)){
		return(
			<DivContainer>
				{label && <Label htmlFor={label}>{`${label}`}</Label>}        
				<MainInput 
					type="checkbox" 
					name={name} 
					disabled={disabled} 
					style={{cursor: 'pointer', width: '25px'}}
					checked={eval(isChecked)}
					onChange={(e)=>setFieldValue(name, e.currentTarget.value == 0 ? 1 : 0)}
				/>
			</DivContainer>
		)
	} else if(!_.isNil(changeFunction)){
		return(
			<DivContainer>
				{label && <Label htmlFor={label}>{`${label}`}</Label>}        
				<MainInput 
					type="checkbox" 
					name={name} 
					disabled={disabled} 
					style={{cursor: 'pointer', width: '25px'}}
					checked={eval(isChecked)}
					onChange={(e)=>setFieldValue(name, e.currentTarget.value == 0 ? 1 : 0)}
				/>
			</DivContainer>
		)
	}
}

CheckBox.propTypes = {
	name: PropTypes.string.isRequired,
	disabled: PropTypes.bool,
	label: PropTypes.string,
	onChange: PropTypes.string
}