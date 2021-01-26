import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { airlineRedTheme } from '../styles/theme'

const MainScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding-top: 24px;
`

export default function AdminLayout(props) {
  return (
    <ThemeProvider theme={airlineRedTheme}>
      <MainScreenContainer>
        {props.children}
      </MainScreenContainer>
    </ThemeProvider>
  )
}