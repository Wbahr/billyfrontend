import React from 'react'
import styled from 'styled-components'
import Header from '../uiComponents/Header'

const Container = styled.div`
    max-width: 1300px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
`
export default function Events() {
	return (
		<>
			<Container>
				<Header text="Events"/>
			</Container>
		</>
	)
}
