import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import Header from './header'
import Footer from './footer'
import { airlineRedTheme } from '../../styles/theme'
import ErrorBoundary from 'setup/errorBoundary'
import { Outlet } from 'react-router'

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`

const ContentScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  // margin-top: 110px
  // max-width: 1200px;
  // margin: 0 auto;
  align-items: flex-start;
  justify-content: space-between;
  flex-grow: 99;
`

export default function HeaderFooterLayout() {
    return (
        <ErrorBoundary>
            <Div>
                <ThemeProvider theme={airlineRedTheme}>
                    <Header />
                    <ContentScreenContainer>
                        <Outlet />
                    </ContentScreenContainer>
                    <Footer />
                </ThemeProvider>
            </Div>
        </ErrorBoundary>
    )
}