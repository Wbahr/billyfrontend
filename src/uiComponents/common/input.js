import React from 'react'
import styled from 'styled-components'

const MainInput = styled.input`
   width: 300px;
   height: 24px;
   font-size: 14px;
   border-radius: 3px;
   padding-left: 8px;
   margin: 10px; 
   ::placeholder {
      color: black;
      font-size: 12px;
   }
`

class Input extends React.Component {
  
  returnValue = (e) => {
    this.setState({value: e.target.value})
  }

  render(){
    const {
      placeholder,
    } = this.props

    return(
      <MainInput
        placeholder={placeholder}
        onChange={this.returnValue}
      />
    )
  }
}

export default Input
