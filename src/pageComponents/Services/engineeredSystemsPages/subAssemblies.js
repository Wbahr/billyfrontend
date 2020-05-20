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
export default function subAssemblies() {
	return (
		<>
			<Header text="Sub-Assemblies" />
			<Container>
				<ServiceHome text="Sub-Assemblies" />
			</Container>
		</>
	)
}
