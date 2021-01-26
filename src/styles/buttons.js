import styled from 'styled-components'

export const ButtonRed = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.mainColor};
  background-image: linear-gradient(to top left, ${props => props.theme.mainColorBlend}, ${props => props.theme.mainColor});
  color: ${props => props.theme.buttonForegroundColor};
  padding: 8px 16px;
  cursor: pointer;
  box-shadow: 1px 1px 2px ${props => props.theme.buttonShadow};
  font-size: 20px;
  font-family: ${props => props.theme.fontName};
  font-weight: 600;
  border: none;
  &:disabled {
    cursor: default;
    background-image: linear-gradient(to top left, grey, darkgrey);
  }
  svg {
    margin-right: 5px;
  }
`

export const ButtonBlack = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(to top left, ${props => props.theme.altButtonColorBlend}, ${props => props.theme.altButtonColor});
  color: ${props => props.theme.buttonForegroundColor};
  padding: 4px 12px;
  font-size: 20px;
  font-family: ${props => props.theme.fontName};
  font-weight: 600;
  border: none;
  svg {
    margin-right: 5px;
  }
`
