import React from 'react'
import ReactLoading from 'react-loading'
import styled from 'styled-components'

const DivContainer = styled.div`
   display: flex;
   justify-content: center;
   align-items:center;
   width: 100%;
`

const Loader = () => (
	<DivContainer>
		<ReactLoading type={'bubbles'} color={'#bbb'}/>
	</DivContainer>
)

export default Loader
