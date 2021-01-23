import React from 'react'
import styled from 'styled-components'

const DivContainer = styled.div`
    display flex;
    flex-direction: column;
  `

const MainInput = styled.input`
   width: 300px;
   height: 32px;
   font-family: verdana;
   font-size: 16px;
   border-radius: 2px;
   padding-left: 8px;
   margin: 0 0 10px 0; 
   ::placeholder {
      color: grey;
      font-size: 16px;
   }
`

const Label = styled.label`
  font-family: verdana;
  color: #111;
  font-size: 13px;
  padding-left: 2px;
  padding-bottom: 2px;
  font-weight: 700;
`

class Input extends React.Component {

  handleOnChange = (e) => {
    this.props.onChange(e)
  }

  render(){
    const {
      type,
      placeholder,
      value,
      disabled,
      label,
      error
    } = this.props

    return (
      <DivContainer>
        {label && <Label htmlFor={label}>{`${label}:`}</Label>}
        <MainInput
          disabled={disabled}
          type={type || ''}
          value={value}
          placeholder={placeholder}
          onChange={this.handleOnChange}
          name={label}
        />
        {error && <span>{error}</span>}
      </DivContainer>
    )
  }
}

export default Input
