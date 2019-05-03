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
   
   &:hover {
      background: linear-gradient(#74121D, #b31217);
   };
   
   &:disabled {
      background: grey;
      cursor: default;
      opacity: 0.3;
   }
`
const SecondaryButton = styled(MainButton)`
  background: linear-gradient(#246696, #174362);
  
  &:hover {
    background: linear-gradient(#000, #246696);
  };

`

class Button extends React.Component {
  render(){
    const {
      type,
      text,
      onClick,
      disabled,
      color,
      inFlightText,
      inFlight
    } = this.props


    switch(color){
      case('main'):
        return(
          <MainButton type={type} onClick={onClick} disabled={disabled || inFlight}>
            {inFlight ? inFlightText : text}
          </MainButton>
        )
        break;
      case('secondary'):
        return(
          <SecondaryButton type={type} onClick={onClick}>
            {text}
          </SecondaryButton>
        )
        break;
      default:
        return(
          <MainButton type={type} onClick={onClick} disabled={disabled || inFlight}>
            {inFlight ? inFlightText : text}
          </MainButton>
        )
    }

  }
}

export default Button
