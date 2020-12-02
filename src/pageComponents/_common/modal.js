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

	//https://github.com/yjose/reactjs-popup/pull/173 -> Use <> for popup due to a validation issue that causes an error
	return(
		<Popup open={!!open} onClose={onClose} closeOnDocumentClick  contentStyle={contentStyle}>
			<>
				<CloseDiv><FontAwesomeIcon style={{'cursor': 'pointer'}} onClick={onClose} icon='times' size='lg' color='lightgrey'/></CloseDiv>
				{props.children}
			</>
		</Popup>
	)
}