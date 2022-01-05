import AdminHome from 'adminComponents/adminHome'
import { AIRLINE_ENGINEER_USER, IMPERSONATOR_USER } from 'pageComponents/_common/constants/UserTypeConstants'
import React from 'react'
import Auth from 'setup/auth'
import ErrorBoundary from 'setup/errorBoundary'
import styled, { ThemeProvider } from 'styled-components'
import { airlineRedTheme } from '../styles/theme'

const MainScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding-top: 24px;
`

export default function AdminLayout() {
    return (

        <ThemeProvider theme={airlineRedTheme}>
            <MainScreenContainer>
                <ErrorBoundary>
                    <Auth roles={[AIRLINE_ENGINEER_USER, IMPERSONATOR_USER]} >
                        <AdminHome />
                    </Auth>
                </ErrorBoundary>
            </MainScreenContainer>
        </ThemeProvider>
    )
}