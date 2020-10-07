import React, { useEffect } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Div = styled.div`
  justify-content: center;
  margin-bottom: 20px;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 250px;
  margin: 200px auto auto auto;
  background-color: white;
  border-radius: 10px;
  box-shadow: 3px 3px 6px rgba(0,0,0,0.5);
  align-items: center;
  justify-content: center;
`

const P = styled.p`
  color: black;
  font-size: 18px;
  margin-top: 25px;
`

export default function Modal({open, text, onClose, timeout}) {
	useEffect(() => {
		if (open) setTimeout(onClose, timeout)
	}, [open])
	
	return open && (
		<Div onClick={onClose}>
			<Container>
				<FontAwesomeIcon icon="shopping-cart" size="5x" color="#328EFC" />
				<P>{text}</P>
			</Container>
		</Div>
	)
}