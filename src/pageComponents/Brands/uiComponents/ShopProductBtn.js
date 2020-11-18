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
  background-image: linear-gradient(to top left,#950f23,#DB1633);
  color: white;
  font-weight: 600;
  border-radius:3px;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: 0;
  padding: 10px 15px;
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
