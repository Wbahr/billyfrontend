import React from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Field, useFormikContext } from 'formik'
import { FormikFormFieldContainer, FormikFormFieldLabel, FormikFormField } from 'styles/formikForm'

export default function CheckBox({disabled, name, label, changeFunction}){
	const { values, setFieldValue } = useFormikContext()
	let isChecked = 'values.' + name
	if(_.isNil(changeFunction)){
		return(
			<FormikFormFieldContainer>
				{label && <FormikFormFieldLabel htmlFor={name}>{`${label}`}</FormikFormFieldLabel>}        
				<FormikFormField 
					type="checkbox" 
					name={name} 
					id={name}
					disabled={disabled} 
					style={{cursor: 'pointer', width: '25px'}}
					checked={eval(isChecked)}
					onChange={(e)=>setFieldValue(name, e.currentTarget.value == 0 ? 1 : 0)}
				/>
			</FormikFormFieldContainer>
		)
	} else if(!_.isNil(changeFunction)){
		return(
			<FormikFormFieldContainer>
				{label && <FormikFormFieldLabel htmlFor={name}>{`${label}`}</FormikFormFieldLabel>}        
				<FormikFormField 
					type="checkbox" 
					id={name}
					name={name} 
					disabled={disabled} 
					style={{cursor: 'pointer', width: '25px'}}
					checked={eval(isChecked)}
					onChange={(e)=> { setFieldValue(name, e.currentTarget.value == 0 ? 1 : 0); changeFunction() }}
				/>
			</FormikFormFieldContainer>
		)
	}
}

CheckBox.propTypes = {
	name: PropTypes.string.isRequired,
	disabled: PropTypes.bool,
	label: PropTypes.string
}