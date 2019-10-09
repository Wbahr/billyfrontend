import React from 'react'
import styled from 'styled-components'
import { ItemResult } from '../pageComponents/SearchResults/uiComponents/itemResult'
import ResultsSummary from '../pageComponents/SearchResults/uiComponents/resultsSummary'
import ResultsSearch from '../pageComponents/SearchResults/uiComponents/resultsSearch'
import ResultsFilter from '../pageComponents/SearchResults/uiComponents/resultsFilter'

const ContentScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1200px;
  margin: 100px auto;
`

const Div = styled.div`
  display: flex;
`

export default function ContentScreen(props) {
  return(
    <ContentScreenContainer>
      <ResultsSummary /> 
      <Div><ResultsSearch /><ResultsFilter /></Div>
      <ItemResult/>
    </ContentScreenContainer>
  )
}