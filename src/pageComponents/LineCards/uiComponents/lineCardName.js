import React from 'react'
import styled from 'styled-components'

const List = styled.div`

`
const Name = styled.p`
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;

`
export default function lineCardName(props) {
	return (
		<div>
			<List>
				<Name>{props.text}</Name>
			</List>
		</div>
	)
}
