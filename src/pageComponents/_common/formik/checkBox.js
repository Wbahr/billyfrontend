import React from 'react'
import PropTypes from 'prop-types'
import { FormikFormFieldContainer, FormikFormFieldLabel, FormikFormField } from 'styles/formikForm'

export default function CheckBox({ disabled, name, label, value, style }) {
  return (
    <FormikFormFieldContainer style={{ flexDirection: 'row', width: 'auto', ...style }}>
      {label && <FormikFormFieldLabel style={{ margin: 'auto 0', marginRight: 10 }} htmlFor={name}>{label}</FormikFormFieldLabel>}
      <FormikFormField 
        type="checkbox" 
        name={name}
        value="true"//This is a fix for the checkbox not being able to be unchecked
        checked={value}
        id={name}
        disabled={disabled} 
        style={{ cursor: 'pointer', width: '25px' }}
      />
    </FormikFormFieldContainer>
  )
}

CheckBox.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string
}