import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Field, ErrorMessage } from 'formik'

const DivContainer = styled.div`
  display flex;
  flex-direction: column;
  height: 71px;
  padding: 0 8px;
`

const Label = styled.label`
  color: #606060;
  font-size: 14px;
  font-weight: 400;
  padding-left: 4px;
  margin-bottom: -11px;
  z-index: 2;
  background-color:white;
  width: max-content;
  padding: 2px;
  margin-left: 7px;
`

const DivError = styled.div`
  color: #DB1633;
  font-size: 12px;
  font-weight: 500;
  padding-left: 8px;
`

export default function Input({type, disabled, name, label, placeholder, onChange, width}){
  const MainInput = styled.input`
    width: ${width || "400px"};
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
 
  if(type !== "hidden"){
    return(
      <DivContainer>
      {label && <Label htmlFor={label}>{`${label}`}</Label>}        
      <Field name={name}>
        {({
          field,
          form,
          form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
          meta,
        }) => (
              <>
                <MainInput {...field} type={type} disabled={disabled} placeholder={placeholder} onChange={(e)=>{eval(onChange)}} />
                {(meta.touched && meta.error) && <DivError>{meta.error}</DivError>}
              </>
            )
        }
      </Field>
    </DivContainer>
    )
  } else {
    return(
      <Field type={type} name={name} />
    )
  }
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.string
}

Input.defaultProps = {
  type: 'text',
  placeholder: ''
}