import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import { GraphQLCall } from '../../config/api'
// import styled from 'styled-components'
// import ItemResult from './uiComponents/itemResult'
// import ResultsSearch from './uiComponents/resultsSearch'

function SearchResultsPage() {
  const [searchResults, getSearchResults] = useState({})
  
  useEffect(() => {
    const parsed = queryString.parse(location.search);
    let searchTerm = parsed.searchTerm
    let body = {"query" : `{itemSearch(searchParams: {searchTerm: "${searchTerm}"}){result}}`}
    GraphQLCall(JSON.stringify(body))
  })

  return(
    <>
      <p>Results</p>
      {/* <ResultsSearch />
      <ItemResult /> */}
    </>
  )
}

export default SearchResultsPage