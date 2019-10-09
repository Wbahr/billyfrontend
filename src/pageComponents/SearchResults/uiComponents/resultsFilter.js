import React from 'react'
import styled from 'styled-components'

const DivResultsSearch = styled.div`
  display: flex;
  margin-left: 8px
  margin-bottom: 10px;
`

export default function ResultsSearch(props) {
  return(
    <DivResultsSearch>
      <select>
        <option value="relevance">Sort by Relevance</option>
        <option value="availability">Sort by Availability</option>
        <option value="popularity">Sort by Popularity</option>
      </select>
      <label for="show">Show:</label>
      <select id="show">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select> 
    </DivResultsSearch>
  )
}