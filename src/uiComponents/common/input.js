import React from 'react'
import styled from 'styled-components'

const MainInput = styled.input`
   width: 300px;
   height: 32px;
   font-size: 16px;
   border-radius: 3px;
   padding-left: 8px;
   margin: 10px 0; 
   ::placeholder {
      color: grey;
      font-size: 16px;
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
