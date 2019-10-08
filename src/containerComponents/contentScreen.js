import React from 'react'
import styled from 'styled-components'
import { ItemResult } from '../pageComponents/SearchResults/uiComponents/itemResult'
import ResultsSummary from '../pageComponents/SearchResults/uiComponents/resultsSummary'
import ResultsSearch from '../pageComponents/SearchResults/uiComponents/resultsSearch'

const ContentScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 100px auto;
`
export default function ContentScreen(props) {
  return(
    <ContentScreenContainer>
      <ResultsSummary /> 
      <ResultsSearch />
      <ItemResult/>
    </ContentScreenContainer>
  )
}