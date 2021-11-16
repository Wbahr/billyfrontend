import React from 'react'
import styled from 'styled-components'

const ProductItem = styled.a`
  margin: 0 auto;
  color: 	#000000;
  margin-bottom: 15px;
  font-size: 25px;
  font-weight: bold;
  &:hover{
    color: #b51029;
    text-decoration: none;
  }
  `

export default function ProductName({ text }) {
    return (
        <ProductItem>{text}</ProductItem>
    )
}
