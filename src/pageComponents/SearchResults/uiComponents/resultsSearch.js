import React, { useState } from 'react'
import styled from 'styled-components'

const Div = styled.div`
  display: flex;
`

const DivResultsSearch = styled.div`
  display: flex;
  margin-bottom: 10px;
`

const InputSearch = styled.input`
  width: 300px;
  height: 30px;
  font-size: 14px;
  border-width: 1px 0px 1px 1px;
  padding: 0 4px;
`

const ButtonSearch = styled.button`
  width: 70px;
  height: 30px;
  background-color: rgb(219, 22, 51);
  color: white;
  border: 0;
  font-size: 14px;
`

export default function ResultsSearch(props) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortType, setSortType] = useState(0)
  const [showQuantity, setShowQuantity] = useState(10)

  function handleSearch() {
    console.log(searchTerm, sortType, showQuantity)
  }

  return(
    <Div>
      <DivResultsSearch>
        <InputSearch placeholder="Search within these results" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/><ButtonSearch onClick={handleSearch}>Search</ButtonSearch>
      </DivResultsSearch>
      <DivResultsSearch>
        <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
          <option value={0}>Sort by Relevance</option>
          <option value={1}>Sort by Availability</option>
          <option value={2}>Sort by Popularity</option>
        </select>
        <label for="show">Show:</label>
        <select id="show" value={showQuantity} onChange={(e) => setShowQuantity(e.target.value)}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select> 
      </DivResultsSearch>
    </Div>
  )
}