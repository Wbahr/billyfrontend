import * as React from 'react'
import { Formik, Form, Field, FieldProps } from 'formik'
import Select from 'react-select'
import styled from '@emotion/styled'

const ErrorMessage = styled.div`
  color: red
`

const CustomSelectComponent = ({
  field,
  form: { touched, errors, setFieldValue },
  options,
  ...props
}) => {

  return (
    <div>
      <label htmlFor={field.name}>{props.label}</label>
      <Select
        {...field}
        {...props}
        options={options}
        value={(options ? options.find(option => option.value === field.value) : '')}
        onChange={option => setFieldValue(field.name, (option).value)}
        width='400px'
      />
      {touched[field.name] && errors[field.name] && (
        <ErrorMessage>{errors[field.name]}</ErrorMessage>
      )}
    </div>
  )
}

export default CustomSelectComponent