import React from 'react'
import PropTypes from 'prop-types'
import { FormikFormFieldContainer, FormikFormFieldLabel, FormikFormField } from 'styles/formikForm'

export default function CheckBox({disabled, name, label }){
	return(
		<FormikFormFieldContainer>
			{label && <FormikFormFieldLabel htmlFor={name}>{`${label}`}</FormikFormFieldLabel>}        
			<FormikFormField 
				type="checkbox" 
				name={name} 
				id={name}
				disabled={disabled} 
				style={{cursor: 'pointer', width: '25px'}}
			/>
		</FormikFormFieldContainer>
	);
}

CheckBox.propTypes = {
	name: PropTypes.string.isRequired,
	disabled: PropTypes.bool,
	label: PropTypes.string
}