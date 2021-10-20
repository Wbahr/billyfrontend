import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import CurrencyInput from 'react-currency-input'
import { FormikFormFieldContainer, FormikFormFieldLabel, FormikFormFieldError, FormikFormField } from 'styles/formikForm'
import { ErrorMessage, Field } from 'formik'

const MainCurrencyInput = styled(CurrencyInput)`
  height: 40px;
  padding: 0 8px;
  color: #303030;
  font-size: 16px;
  border-radius: 1px;
  text-align: right;
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

const input = props => <Field {...props} />

export default function Input(props){
    const { type, disabled, name, label, placeholder, width, maxLength, style, onChange, value } = props
    console.log(props)
    if (type === 'text' || type === 'email' || type === 'password' || type === 'number') {
        return (
            <FormikFormFieldContainer style={{ ...style, maxWidth: '100%' }}>
                {label && <FormikFormFieldLabel htmlFor={name}>{label}</FormikFormFieldLabel>}
                <FormikFormField 
                    type={type}
                    name={name}
                    id={name}
                    placeholder={placeholder} 
                    disabled={disabled} 
                    style={{ width: width || '400px', maxWidth: '100%' }}
                    maxLength={maxLength}
                    {
                        ...(onChange ? {
                            as: input,
                            onChange,
                            value
                        } : {})
                    }
                />
                <FormikFormFieldError style={{ width: width || '400px', maxWidth: '100%' }}>
                    <ErrorMessage name={name} />
                </FormikFormFieldError> 
            </FormikFormFieldContainer>
        )
    } else if (type === 'currency') {
        return (
            <FormikFormFieldContainer style={{ ...style, maxWidth: '100%' }}>
                {label && <FormikFormFieldLabel htmlFor={name}>{label}</FormikFormFieldLabel>}      
                <FormikFormField name={name} style={{ maxWidth: '100%' }}>
                    {({
                        field, 
                        form
                    }) => (
                        <MainCurrencyInput id={name} {...field} value={field.value} prefix='$' style={{ width: width || '400px', maxWidth: '100%' }} onChangeEvent={e => form.setFieldValue(field.name, e.target.value)}/>
                    )}
                </FormikFormField>
            </FormikFormFieldContainer>
        )
    } else {
        return (
            <FormikFormFieldContainer style={{ ...style, maxWidth: '100%' }}>
                {label && <FormikFormFieldLabel htmlFor={name}>{label}</FormikFormFieldLabel>}
                <FormikFormField id={name} type={type} name={name} />
                <FormikFormFieldError style={{ width: width || '200px', maxWidth: '100%' }}>
                    <ErrorMessage name={name} />
                </FormikFormFieldError> 
            </FormikFormFieldContainer>
        )
    }
}

/*Creates a non-formik bound input, but styled to look the same */
export function FormikStyleInput({ type, value, disabled, name, label, placeholder, width, maxLength, onChange, alignment }) {
    if (type === 'currency') {
        return (
            <FormikFormFieldContainer style={{ maxWidth: '100%' }}>
                {label && <FormikFormFieldLabel htmlFor={name} style={{ textAlign: alignment, width: '100%', paddingRight: 7 }}>{label}</FormikFormFieldLabel>}      
                <MainCurrencyInput
                    type={type}
                    name={name}
                    id={name}
                    placeholder={placeholder} 
                    disabled={disabled} 
                    style={{ width: width || '400px', maxWidth: '100%' }}
                    maxLength={maxLength}
                    onChangeEvent={onChange}
                    value={value}
                    prefix='$'
                />
            </FormikFormFieldContainer>
        )
    } else {
        return (
            <FormikFormFieldContainer style={{ maxWidth: '100%' }}>
                {label && <FormikFormFieldLabel htmlFor={name} style={{ textAlign: alignment, width: '100%' }}>{label}</FormikFormFieldLabel>}
                <input 
                    type={type}
                    name={name}
                    id={name}
                    placeholder={placeholder} 
                    disabled={disabled} 
                    style={{ width: width || '400px', maxWidth: '100%' }}
                    maxLength={maxLength}
                    onChange={onChange}
                    value={value}
                />
            </FormikFormFieldContainer>
        )
    }
}

export function FormikStyleLabel({ name, label, children, alignment, width }) {
    return (
        <FormikFormFieldContainer style={{ maxWidth: '100%', width: width }}>
            {label && <FormikFormFieldLabel style={{ textAlign: alignment, width: '100%' }} htmlFor={name}>{label}</FormikFormFieldLabel>}
            {children}
        </FormikFormFieldContainer>
    )
}

Input.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    width: PropTypes.number,
    maxLength: PropTypes.number,
}

Input.defaultProps = {
    type: 'text',
    placeholder: '',
    maxLength: null
}