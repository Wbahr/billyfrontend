import React from 'react'
import styled from 'styled-components'

const DivResultsSummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 700px;
  margin: 0 0 20px 0;

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

export default function ResultsSummary({searchTerm, resultSize, resultPage, totalResults}) {
  return(
    <DivResultsSummaryContainer>
      <Div><Pgrey>Search Results for:</Pgrey><Pblue>{searchTerm}</Pblue></Div>
      <Div><Pgrey2>Results displayed: {1 + (resultSize * (resultPage-1))}-{resultSize * resultPage} of {totalResults === 10000 ? totalResults + '+' : totalResults}</Pgrey2></Div>
    </DivResultsSummaryContainer>
  )
}