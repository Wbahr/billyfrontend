import React from 'react'
import styled from 'styled-components'
import { ItemResult } from '../pageComponents/SearchResults/uiComponents/itemResult'

const ContentScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
`
export default function ContentScreen(props) {
  return(
    <ContentScreenContainer>
      <ItemResult/>
    </ContentScreenContainer>
  )
}