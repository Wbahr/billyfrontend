import React from 'react'
import styled from 'styled-components'

const DivResultsSummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 8px 0;

`

const Div = styled.div`
  display: flex;
`

const Pgrey = styled.p`
  font-size: 20px;
  color: black;
  margin: 0;
  font-weight: 700;
`

const Pgrey2 = styled.p`
  font-size: 16px;
  color: #404040;
  margin: 0;
`

const Pblue = styled.p`
  font-size: 20px;
  color: rgb(219, 22, 51);
  padding: 0 4px;
  margin: 0;
  font-weight: 700;
`

export default function ResultsSummary({searchTerm, resultSize, resultPage, totalResults, isSearching}) {

  let ResultsText
  if (isSearching){
    ResultsText = (<><Pgrey>Searching for:</Pgrey><Pblue>{searchTerm}</Pblue></>)
  } else {
    ResultsText = (<><Pgrey>{totalResults === 10000 ? totalResults + '+' : totalResults} results returned for:</Pgrey><Pblue>{searchTerm}</Pblue></>)
  }
  return(
    <DivResultsSummaryContainer>
      <Div>{ResultsText}</Div>
    </DivResultsSummaryContainer>
  )
}