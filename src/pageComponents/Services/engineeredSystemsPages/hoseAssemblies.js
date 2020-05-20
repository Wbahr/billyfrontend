import React from 'react'
import styled from 'styled-components'
import Header from '../../_common/header'
import ServiceHome from '../uiComponents/service'

const Container = styled.div`
		max-width: 1300px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
`
export default function hoseAssemblies() {
	return (
		<>
			<Header text="Hose-Assemblies" />
			<Container>
				<ServiceHome text="Hose Assemblies" />
			</Container>
		</>
	)
}
