import React from 'react'
import Popup from 'reactjs-popup'
import styled from 'styled-components'

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 300px;
  p {
    text-align: center;
  }
`

export default function AddedToCartModal({open, hideAddedToCartModal}) {
	if(open){
		setTimeout(hideAddedToCartModal, 700)
	}
	return(
		<Popup open={open}>
			<Div>
				<p>Added to Cart!</p>
			</Div>
		</Popup>
	)
}