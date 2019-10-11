import React from 'react'
import styled from 'styled-components'
import Header from './header'

const ContentScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 28px auto;
`

// const Temp = styled.div`
//   margin-left: 257px;
// `

// const Category = styled.div`
//   width: 125px;
//   height: 125px;
//   background-image: 
//   linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.73)),
//   url('../imgs/airline/hydraulics.jpg');
//   `

export default function HeaderFooterLayout(props) {
  return(
    <>
      <Header />
      <ContentScreenContainer>
        {props.children}
      </ContentScreenContainer>
    </>
  )
}