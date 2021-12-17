import React from 'react'
import styled from 'styled-components'

const Button = ({ className, children, onClick }) => (
    <button className={className} onClick={onClick} type='button'>
        {children}
    </button>
)

export const ButtonRed = styled(Button)`
  cursor: pointer;  
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.mainColor};
  background-image: linear-gradient(to top left, ${props => props.theme.mainColorBlend}, ${props => props.theme.mainColor});
  color: ${props => props.theme.buttonForegroundColor};
  padding: 4px 12px;
  box-shadow: 1px 1px 2px ${props => props.theme.buttonShadow};
  font-size: 18px;
  font-family: ${props => props.theme.fontName};
  font-weight: 600;
  border: none;
  margin: 5px 0;
  &:disabled {
    cursor: default;
    background-image: linear-gradient(to top left, grey, darkgrey);
  }
  svg {
    margin-right: 5px;
  }
`

export const ButtonBlack = styled(Button)`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.buttonForegroundColor};
  background-image: linear-gradient(to top left, ${props => props.theme.altButtonColorBlend}, ${props => props.theme.altButtonColor});
  padding: 4px 12px;
  box-shadow: 1px 1px 2px ${props => props.theme.buttonShadow};
  font-size: 18px;
  font-family: ${props => props.theme.fontName};
  font-weight: 600;
  border: none;
  margin: 5px 0;
  &:disabled {
    cursor: default;
    background-image: linear-gradient(to top left, grey, darkgrey);
  }
  svg {
    margin-right: 5px;
  }
`
