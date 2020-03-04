import React from 'react'
import styled from 'styled-components'

const DivContainer = styled.div`
  display flex;
  flex-direction: column;
`

const Label = styled.label`
  color: #606060;
  font-size: 14px;
  font-weight: 400;
  padding-left: 4px;
  margin-bottom: -4px;
  // background-color: white;
  width: max-content;
  padding: 2px;
  margin-left: 7px;
`

const MainInput = styled.input`
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

function InputV2(props) {

  const {
    type,
    placeholder,
    value,
    disabled,
    label,
    error,
    width,
    onChange
  } = props

  return(
    <DivContainer>
      {label && <Label htmlFor={label}>{`${label}`}</Label>}
      <MainInput
        disabled={disabled}
        type={type || ''}
        value={value}
        placeholder={placeholder}
        onChange={(e)=>onChange(e)}
        name={label}
        style={{width: width || "400px"}}
      />
      {error && <span>{error}</span>}
    </DivContainer>
  )
}

export default InputV2
