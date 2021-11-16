import React from 'react'
import styled from 'styled-components'


const ProductsDetailsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 16px;
  margin: 0px 30px 0 30px;
  align-content: center;
  flex: 2;
`

export default function ProductDetails(props) {
    return (
        <ProductsDetailsDiv>
            {props.text}
        </ProductsDetailsDiv>
    )
}
