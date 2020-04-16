import React from 'react'
import styled from 'styled-components'

const LogoImg = styled.img`
  max-width: 100%;
  padding: 5px;
`

const Brandsdiv = styled.div`
  display: flex;
  width: 116px;
  height: 85px;
  border-radius: 50%;
  margin: 25px 35px;
  align-items: center;
  text-align: center;
  transform: ${props => (props.pop ? "scale(1.2)" : "scale(1)")};
  transition: all 0.3s;
`

export default function FeaturedManufacturerLink(props) {
  const {
    brandPagePath, 
    logo, 
    pop
  } = props
  
  return (
    <Brandsdiv pop={pop}>
      <a href={brandPagePath}>
        <LogoImg src={logo} />
      </a>
    </Brandsdiv>
  )
}
