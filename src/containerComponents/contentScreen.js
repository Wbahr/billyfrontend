import React from 'react'
import styled from 'styled-components'
import { ItemResult } from '../pageComponents/SearchResults/uiComponents/itemResult'
import ResultsSummary from '../pageComponents/SearchResults/uiComponents/resultsSummary'
import ResultsSearch from '../pageComponents/SearchResults/uiComponents/resultsSearch'
import Header from '../containerComponents/header'

const ContentScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 28px auto;
`

const Temp = styled.div`
  margin-left: 257px;
`

export default function ContentScreen(props) {
  return(
    <>
      <Header />
      <ContentScreenContainer>
        <Temp>
          <ResultsSummary /> 
          <ResultsSearch />
          <ItemResult/>
          <ItemResult/>
          <ItemResult/>
          <ItemResult/>
        </Temp>

      </ContentScreenContainer>
    </>
  )
}