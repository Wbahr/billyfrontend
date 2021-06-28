import React from 'react'
import PropTypes from 'prop-types'
import { Field as FormikField, ErrorMessage } from 'formik'
import { FormikFormFieldContainer, FormikFormFieldLabel, FormikFormFieldError } from 'styles/formikForm'

const areaStyle = {
    padding: '0 8px',
    color: '#303030',
    fontSize: '16px',
    borderRadius: '1px',
    border: '1px solid #e1e1e1',
}

export default function TextArea({ disabled, name, label, placeholder, width, maxlength, rows }) {

    return (
        <FormikFormFieldContainer>
            <FormikFormFieldLabel htmlFor={name}>{`${label}`}</FormikFormFieldLabel>
            <FormikField
                as="textarea"
                name={name}
                placeholder={placeholder}
                disabled={disabled}
                style={{ ...areaStyle, width: width }}
                maxLength={maxlength}
                rows={rows}
            />
            <FormikFormFieldError style={{ width: '400px' }}>
                <ErrorMessage name={name} />
            </FormikFormFieldError>
        </FormikFormFieldContainer>
    )
}

TextArea.propTypes = {
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.string
}

TextArea.defaultProps = {
    placeholder: '',
    maxlength: 'none',
    rows: '3'
}