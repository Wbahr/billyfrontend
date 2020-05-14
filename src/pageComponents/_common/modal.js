import React from 'react'
import styled from 'styled-components'
import Popup from 'reactjs-popup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CloseDiv = styled.div`
  display: flex;
  flex-direction: row-reverse;  
  width: auto;
  margin: 5px 20px;
`

export default function Modal(props) {
	const {
		contentStyle,
		onClose,
		open
	} = props

	return(
		<Popup open={open} onClose={onClose} closeOnDocumentClick  contentStyle={contentStyle}>
			<CloseDiv><FontAwesomeIcon style={{'cursor': 'pointer'}} onClick={onClose} icon='times' size='lg' color='lightgrey'/></CloseDiv>
			{props.children}
		</Popup>
	)
}