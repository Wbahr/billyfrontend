import React from 'react'
import PropTypes from 'prop-types'
import { FormikFormFieldContainer, FormikFormFieldLabel, FormikFormField } from 'styles/formikForm'

export default function CheckBox({ disabled, name, label, value, onChange, style }) {
    return (
        <FormikFormFieldContainer style={{ flexDirection: 'row', width: 'auto', ...style, maxWidth: '100%' }}>
            {label && <FormikFormFieldLabel style={{ margin: 'auto 0', marginRight: 10 }} htmlFor={name}>{label}</FormikFormFieldLabel>}
            <FormikFormField 
                type="checkbox" 
                name={name}
                value="true"//This is a fix for the checkbox not being able to be unchecked
                checked={value}
                id={name}
                disabled={disabled}
                {...(onChange ? { onChange } : null)}
                style={{ cursor: 'pointer', width: '25px', flexShrink: 0 }}  
            />
        </FormikFormFieldContainer>
    )
}

CheckBox.propTypes = {
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    label: PropTypes.string
}