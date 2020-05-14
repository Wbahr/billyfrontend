import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Container = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  align-items: center;
  justify-content: center;
  background-color: #007bff;
  height: 30px;
  width: 100%;
  z-index: 99;
  color: white;
`

const DivCancel = styled.div`
  cursor: pointer;
  margin: auto 20px;
`

export default function HeaderAlertModal({message,close}) {

	return(
		<Container>
			<span>{message}</span>
			<DivCancel onClick={close}>
				<FontAwesomeIcon icon='times' />
			</DivCancel>
		</Container>
	)
}