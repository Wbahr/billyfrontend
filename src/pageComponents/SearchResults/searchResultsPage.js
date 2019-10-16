import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import _ from 'lodash'
import styled from 'styled-components'
import { GraphQLCall } from '../../config/api'
import ItemResult from './uiComponents/itemResult'
import ResultsSearch from './uiComponents/resultsSearch'
import ResultsSummary from './uiComponents/resultsSummary'
import Paginator from './uiComponents/paginator'
import Loader from '../_common/loader'

function SearchResultsPage() {
  const [searchResults, setSearchResults] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortType, setSortType] = useState(0)
  const [resultPage, setResultPage] = useState('relevancy')
  const [resultSize, setResultSize] = useState(10)
  const [totalResults, setTotalResults] = useState(0)
  const [isSearching, setSearching] = useState(true)
  
  // Check for updates to Search Term in URL
  useEffect(() => {
    const parsed = queryString.parse(location.search);
    let searchTermParam = parsed.searchTerm
    setSearchTerm(searchTermParam)
    let sortTypeParam = _.get(parsed, `sortType`, 'relevancy')
    setSortType(sortTypeParam)
    let resultSizeParam = _.get(parsed, `resultSize`, 10)
    setResultSize(resultSizeParam)
    let resultPageParam = _.get(parsed, `resultPage`, 1)
    setResultPage(resultPageParam)
  })

  // Get New Search Term results when the searchTerm in state changes
  useEffect(() => {
    let body = {"query" : `{itemSearch(searchParams: {searchTerm: "${searchTerm}", resultSize: ${resultSize}, resultPage: ${resultPage}, sortType: "${sortType}"}){result,count}}`}
    setSearching(true) 
    if (searchTerm !== ''){
      GraphQLCall(JSON.stringify(body)).then((result) => parseQueryResults(result)).then(() => setSearching(false))
    }
  }, [searchTerm])

  function parseQueryResults(result) {
    let searchResultArray = _.get(result,`data.itemSearch.result`, [])
    let totalResultCount = _.get(result,`data.itemSearch.count`, 0)
    setSearchResults(searchResultArray)
    setTotalResults(totalResultCount)

  }

  function handleUpdateResults(data){
    console.log('handle updates --> ', data)
  }

  let SearchResults = _.map(searchResults, result => {
    return(
      <ItemResult result={result} updateResults={handleUpdateResults}/>
    )
  })

  return(
    <>
      <div>
        <ResultsSummary 
          searchTerm={searchTerm}
          resultSize={resultSize}
          resultPage={resultPage}
          totalResults={totalResults}
        />
        <ResultsSearch />
      </div>
      { isSearching ? <Loader/> : SearchResults}
      <Paginator 
        resultSize={resultSize}
        resultPage={resultPage}
        totalResults={totalResults}
      />
    </>
  )
}

export default SearchResultsPage