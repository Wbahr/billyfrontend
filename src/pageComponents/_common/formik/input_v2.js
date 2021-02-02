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

export default function Input({ type, disabled, name, label, placeholder, width, maxlength, style, onChange, value }){
    if (type === 'text' || type === 'email' || type === 'password') {
        return (
            <FormikFormFieldContainer style={style}>
                {label && <FormikFormFieldLabel htmlFor={name}>{`${label}`}</FormikFormFieldLabel>}
                <FormikFormField 
                    type={type}
                    name={name}
                    id={name}
                    placeholder={placeholder} 
                    disabled={disabled} 
                    style={{ width: width || '400px' }}
                    maxLength={maxlength}
                    {
                        ...(onChange ? {
                            as: input,
                            onChange,
                            value
                        } : {})
                    }
                />
                <FormikFormFieldError style={{ width: width || '400px' }}>
                    <ErrorMessage name={name} />
                </FormikFormFieldError> 
            </FormikFormFieldContainer>
        )
    } else if (type === 'currency') {
        return (
            <FormikFormFieldContainer style={style}>
                {label && <FormikFormFieldLabel htmlFor={name}>{`${label}`}</FormikFormFieldLabel>}      
                <FormikFormField name={name}>
                    {({
                        field, 
                        form
                    }) => (
                        <MainCurrencyInput id={name} {...field} value={field.value} prefix='$' style={{ width: width || '400px' }} onChangeEvent={e => form.setFieldValue(field.name, e.target.value)}/>
                    )}
                </FormikFormField>
            </FormikFormFieldContainer>
        )
    } else {
        return (
            <FormikFormFieldContainer style={style}>
                {label && <FormikFormFieldLabel htmlFor={name}>{label}</FormikFormFieldLabel>}
                <FormikFormField id={name} type={type} name={name} />
                <FormikFormFieldError style={{ width: width || '400px' }}>
                    <ErrorMessage name={name} />
                </FormikFormFieldError> 
            </FormikFormFieldContainer>
        )
    }
}

/*Creates a non-formik bound input, but styled to look the same */
export function FormikStyleInput({ type, value, disabled, name, label, placeholder, width, maxlength, onChange }) {
    return (
        <FormikFormFieldContainer>
            {label && <FormikFormFieldLabel htmlFor={name}>{`${label}`}</FormikFormFieldLabel>}
            <input 
                type={type}
                name={name}
                id={name}
                placeholder={placeholder} 
                disabled={disabled} 
                style={{ width: width || '400px' }}
                maxLength={maxlength}
                onChange={onChange}
                value={value}
            />
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
    maxlength: 'none'
}