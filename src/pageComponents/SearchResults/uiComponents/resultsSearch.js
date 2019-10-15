import React, { useState, useEffect } from 'react'
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
  border-color: #dadada;
  border-top: 1px #dadada solid;
  border-left: 1px #dadada solid;
  border-bottom: 1px #e7e7e7 solid;
  border-right: 0px;
  padding: 0 4px;
  box-shadow: inset 0px 2px 3px #c1c1c1;
  border-radius: 3px 0 0 3px;
`

const ButtonSearch = styled.button`
  width: 70px;
  height: 30px;
  background-color: rgb(219, 22, 51);
  color: white;
  font-weight: 500;
  border: 0;
  border-radius: 0 3px 3px 0;
  box-shadow: inset 0px 2px 3px #7f0c1d;
  font-size: 14px;
`

export default function ResultsSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortType, setSortType] = useState('relevancy')
  const [resultSize, setResultSize] = useState(10)

  useEffect(() => {

  }, [searchTerm, sortType, resultSize])

  function handleSearch() {

  }

  return(
    <Div>
      <DivResultsSearch>
        <InputSearch placeholder="Search within these results" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/><ButtonSearch onClick={handleSearch}>Search</ButtonSearch>
      </DivResultsSearch>
      <DivResultsSearch>
        <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
          <option value={'relevancy'}>Sort by Relevance</option>
          <option value={'availability'}>Sort by Availability</option>
          <option value={'popularity'}>Sort by Popularity</option>
        </select>
        <label for="show">Show:</label>
        <select id="show" value={resultSize} onChange={(e) => setResultSize(e.target.value)}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select> 
      </DivResultsSearch>
    </Div>
  )
}