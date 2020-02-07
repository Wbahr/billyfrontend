import * as React from 'react'
import { Formik, Form, Field, FieldProps } from 'formik'
import Select from 'react-select'
import styled from '@emotion/styled'

const ErrorMessage = styled.div`
  color: red
`

const LabelStyle = {
  color: '#606060',
  fontSize: '14px',
  fontWeight: 400,
  paddingLeft: '4px',
  marginBottom: '-4px',
  backgroundColor: 'white',
  width: 'max-content',
  padding: '2px',
  marginLeft: '7px'
}

const CustomSelectComponent = ({
  field,
  form: { touched, errors, setFieldValue },
  options,
  width,
  ...props
}) => {

  return (
    <div style={{margin: 'auto 0', width: width || '300px'}}>
      {props.label && <label style={LabelStyle} htmlFor={field.name}>{props.label}</label>}
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