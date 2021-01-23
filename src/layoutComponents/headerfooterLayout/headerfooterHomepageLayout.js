import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import Header from './header'
import Footer from './footer'
import { airlineRedTheme } from 'styles/theme'

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
  margin: 28px auto;
  align-items: flex-start;
  justify-content: space-between;
  flex-grow: 99;
`

export default function HeaderFooterLayout(props) {
  return (
    <Div>
      <ThemeProvider theme={airlineRedTheme}>
        <Header {...props}/>
        <ContentScreenContainer {...props}>
          {props.children}
        </ContentScreenContainer>
        <Footer {...props}/>
      </ThemeProvider>
    </Div>
  )
}