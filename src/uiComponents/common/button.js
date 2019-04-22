import React from 'react'
import styled from 'styled-components'

const MainButton = styled.button`
   width: 150px;
   height: 50px;
   color: white;
   font-size: 18px;
   background: linear-gradient(#b31217, #e52d27);
   border-radius: 50px;
   cursor: pointer;
   
   :hover {
      background: linear-gradient(#74121D, #b31217);
   };
`

class Button extends React.Component {
  render(){
    const {
      text,
      onClick,
      disabled
    } = this.props

    return(
      <MainButton onClick={onClick} disabled={disabled}>
        {text}
      </MainButton>
    )
  }
}

export default Button
