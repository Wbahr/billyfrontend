import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  margin: 25px 0;
  align-items: center;
`
const ShopBtn = styled.a`
  background-color: ${props => props.theme.mainColor};
  background-image: linear-gradient(to top left, ${props => props.theme.mainColorBlend}, ${props => props.theme.mainColor});
  color: ${props => props.theme.buttonForegroundColor};
  font-weight: 600;
  border-radius:3px;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: 0;
  padding: 10px 15px;
  margin: 0 auto;
  outline: none;
  &:hover {
      text-decoration: none;
      color: ${props => props.theme.buttonForegroundColor};
      background-image: linear-gradient(to bottom right, ${props => props.theme.mainColorBlend}, ${props => props.theme.mainColor});
  }
`

const ConfiguratorBtn = styled(ShopBtn)`
  background-image: linear-gradient(to top left, ${props => props.theme.altButtonColorBlend}, ${props => props.theme.altButtonColor});
  &:hover {
    background-image: linear-gradient(to bottom right, ${props => props.theme.altButtonColorBlend}, ${props => props.theme.altButtonColor});
  }
`

export default function ShopProductBtn(props) {
    return (
        <Div>
            <ShopBtn href={`/search?searchTerm=${props.searchTerm}`}>{props.text}</ShopBtn>
        </Div>
    )
}

export function ProductConfiguratorBtn(props) {
    return (
        <Div>
            <ConfiguratorBtn href={props.url}>{props.text}</ConfiguratorBtn>
        </Div>
    )
}
