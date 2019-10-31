import React from 'react'
import styled from 'styled-components'
import Header from './header'
import Footer from './footer'

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
  margin: 16px 8px;
  justify-content: space-between;
  flex-grow: 99;
`

export default function HeaderFooterLayoutExpanded(props) {
  return(
    <Div>
      <Header {...props}/>
      <ContentScreenContainer {...props}>
        {props.children}
      </ContentScreenContainer>
      <Footer />
    </Div>
  )
}