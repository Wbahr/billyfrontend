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
  max-width: 1200px;
  margin: 28px auto;
`

export default function HeaderFooterLayout(props) {
  console.log(props)
  return(
    <Div>
      <Header {...props}/>
      <ContentScreenContainer>
        {props.children}
      </ContentScreenContainer>
      <Footer />
    </Div>
  )
}