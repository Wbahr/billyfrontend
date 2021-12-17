import React from 'react'
import { Outlet } from 'react-router'
import styled, { ThemeProvider } from 'styled-components'
import { airlineRedTheme } from '../styles/theme'

const MainScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 24px;
`

export default function EmptyLayout() {
    return (
        <ThemeProvider theme={airlineRedTheme}>
            <MainScreenContainer>
                <Outlet />
            </MainScreenContainer>
        </ThemeProvider>
    )
}

