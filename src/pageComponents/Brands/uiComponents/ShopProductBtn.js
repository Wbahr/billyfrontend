import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  margin: 25px 0;
  align-items: center;
`
const ShopBtn = styled.button`
  background-image: linear-gradient(to left top, rgb(149, 15, 35), rgb(219, 22, 51));
  width: 20%
  color: white;
  font-weight: 600;
  border-radius:28px;
  border: 0;
  padding: 5px;
  margin: 0 auto;
  outline: none;
  `
export default function ShopProductBtn(props) {
    return (
       <Div>
           <ShopBtn>{props.text}</ShopBtn>
       </Div>
    )
}
