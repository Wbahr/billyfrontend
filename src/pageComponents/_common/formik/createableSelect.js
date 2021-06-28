import * as React from 'react'
import Select, { Creatable } from 'react-select'
import { ErrorMessage } from 'formik'
import { FormikFormFieldContainer, FormikFormFieldLabel, FormikFormFieldError, FormikFormField } from 'styles/formikForm'

const SelectStyle = {
    control: (provided) => ({
        ...provided,
        minHeight: '40px',
        borderRadius: '1px',
        border: '1px solid #e1e1e1',
        marginTop: '-4px',
    }),
    input: () => ({
        height: '36px'
    })
}

const CreatableSelectComponent = (props) => {
    const {
        options,
        width,
        disabled, 
        name, 
        label, 
        placeholder, 
        style, 
        setFieldValue,
        notCreatable
    } = props

    return (
        <FormikFormFieldContainer style={style}>
            {label && <FormikFormFieldLabel htmlFor={name}>{`${label}`}</FormikFormFieldLabel>}
            <FormikFormField
                name={name}
                id={name}
                placeholder={placeholder || notCreatable ? 'Select' : 'Select or type'}
                disabled={disabled}
                options={options}
                style={{ width: width || '400px' }}
                styles={SelectStyle}
                onChange={(option) => setFieldValue(name, option.value)}
                component={notCreatable ? Select : Creatable}
            />
            <FormikFormFieldError style={{ width: width || '400px' }}>
                <ErrorMessage name={name} />
            </FormikFormFieldError>
        </FormikFormFieldContainer>
    )
}

export default CreatableSelectComponent