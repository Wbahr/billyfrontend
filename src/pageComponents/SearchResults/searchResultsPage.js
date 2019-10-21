import React, { useState, useEffect, useRef } from 'react'
import queryString from 'query-string'
import _ from 'lodash'
// import { useParams } from "react-router-dom";
// import styled from 'styled-components'
import { GraphQLCall } from '../../config/api'
import ItemResult from './uiComponents/itemResult'
import ResultsSearch from './uiComponents/resultsSearch'
import ResultsSummary from './uiComponents/resultsSummary'
import Paginator from './uiComponents/paginator'
import Loader from '../_common/loader'

export default function SearchResultsPage(props) {
  const didMountRef = useRef(false);
  const prevHistoryRef = useRef();
  const search = queryString.parse(location.search)
  
  const [searchResults, setSearchResults] = useState([])
  const [searchTerm, setSearchTerm] = useState(search.searchTerm)
  const [sortType, setSortType] = useState(search.sortType)
  const [resultPage, setResultPage] = useState(search.resultPage)
  const [resultSize, setResultSize] = useState(search.resultSize)
  const [totalResults, setTotalResults] = useState(0)
  const [isSearching, setSearching] = useState(true)

  useEffect(() => {
    if (!didMountRef.current) {
      prevHistoryRef.current = props.history.location
    }
    const prevHistory = prevHistoryRef.current
    if(props.history.location.search !== prevHistory.search){
      prevHistoryRef.current = props.history.location
      didMountRef.current = false      
      const search = queryString.parse(location.search)
      setSearchTerm(search.searchTerm)
      let body = {"query" : `{itemSearch(searchParams: {searchTerm: "${search.searchTerm}", resultSize: ${resultSize}, resultPage: ${resultPage}, sortType: "${sortType}"}){result,count}}`}
      GraphQLCall(JSON.stringify(body)).then((result) => parseQueryResults(result)).then(() => setSearching(false))
    }
  })
  // Handle ComponentDidMount call
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      let body = {"query" : `{itemSearch(searchParams: {searchTerm: "${searchTerm}", resultSize: ${resultSize}, resultPage: ${resultPage}, sortType: "${sortType}"}){result,count}}`}
      setSearching(true) 
      if (searchTerm !== ''){
        GraphQLCall(JSON.stringify(body)).then((result) => parseQueryResults(result)).then(() => setSearching(false))
      }
    } else {
      handleUpdateResults()
    }
  }, [searchTerm, resultSize, resultPage, sortType])

  function parseQueryResults(result) {
    let searchResultArray = _.get(result,`data.itemSearch.result`, [])
    let totalResultCount = _.get(result,`data.itemSearch.count`, 0)
    setSearchResults(searchResultArray)
    setTotalResults(totalResultCount)
  }

  function handleUpdateResults(){
    let query = `?searchTerm=${searchTerm}`
    if (!_.isNil(resultSize)){
      query += `&resultSize=${resultSize}`
    }
    if (!_.isNil(resultPage)){
      query += `&resultPage=${resultPage}`
    }
    if (!_.isNil(sortType)){
      query += `&sortType=${sortType}`
    }
    props.history.push({
      pathname: '/search',
      search: query
    })
    let body = {"query" : `{itemSearch(searchParams: {searchTerm: "${searchTerm}", resultSize: ${resultSize}, resultPage: ${resultPage}, sortType: "${sortType}"}){result,count}}`}
    GraphQLCall(JSON.stringify(body)).then((result) => parseQueryResults(result)).then(() => setSearching(false))
  }

  function handleUpdateCurrentPage(currentPage){
    setResultPage(currentPage)
  }

  function handleUpdateResultSize(newResultSize){
    setResultSize(newResultSize)
  }

  function handleUpdateSortType(newSortType){
    setSortType(newSortType)
  }

  function handleUpdateSearchTerm(newSearchTerm){
    setSearchTerm(searchTerm + ' ' + newSearchTerm)
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
        <ResultsSearch
          updateSearchTerm={(newSearchTerm) => handleUpdateSearchTerm(newSearchTerm)}
          updateResultSize={(newResultSize) => handleUpdateResultSize(newResultSize)}
          updateSortType={(newSortType) => handleUpdateSortType(newSortType)}
        />
      </div>
      { isSearching ? <Loader/> : SearchResults}
      <Paginator 
        resultSize={resultSize}
        resultPage={resultPage}
        totalResults={totalResults}
        updateCurrentPage={(currentPage) => handleUpdateCurrentPage(currentPage)}
      />
    </>
  )
}