import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { airlineRedTheme } from './theme'

const MainScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 24px;
`

export default function EmptyLayout(props) {
	return(
		<ThemeProvider theme={airlineRedTheme}>
			<MainScreenContainer>
				{props.children}
			</MainScreenContainer>
		</ThemeProvider>
	)
}

