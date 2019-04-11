import React from 'react'
import styled from 'styled-components'

const MainButton = styled.button`
   width: 150px;
   height: 50px;
   color: white;
   font-size: 18px;
   background-color: red;
   border-radius: 50px;
   cursor: pointer;
`

class Button extends React.Component {
  render(){
    const {
      text,
      onclick,
      disabled
    } = this.props

    return(
      <MainButton onClick={onclick} disabled={disabled}>
        {text}
      </MainButton>
    )
  }
}

export default Button
