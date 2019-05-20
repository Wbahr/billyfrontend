import React from 'react'
import styled from 'styled-components'

const MainInput = styled.input`
   width: 300px;
   height: 32px;
   font-size: 16px;
   border-radius: 3px;
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
  
  returnValue = (e) => {
    this.setState({value: e.target.value})
  }

  render(){
    const {
      type,
      placeholder,
      value,
      disabled,
      label
    } = this.props

    return(
      <>
        {label && <Label for={label}>{`${label}:`}</Label>}
        <MainInput
          disabled={disabled}
          type={type || ''}
          value={value}
          placeholder={placeholder}
          onChange={this.returnValue}
          name={label}
        />
      </>
    )
  }
}

export default Input
