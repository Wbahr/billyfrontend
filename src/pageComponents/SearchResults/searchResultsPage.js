import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import _ from 'lodash'
import { GraphQLCall } from '../../config/api'
import ItemResult from './uiComponents/itemResult'
import ResultsSearch from './uiComponents/resultsSearch'
import ResultsSummary from './uiComponents/resultsSummary'
import Paginator from './uiComponents/paginator'
import AttributeFilter from './uiComponents/attributeFilter'
import CategoryFilter from './uiComponents/categoryFilter'
import Loader from '../_common/loader'

const DivContainer = styled.div`
  display: flex;
`

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
`

export default function SearchResultsPage(props) {
  const didMountRef = useRef(false);
  const prevHistoryRef = useRef();
  const preformSearchRef = useRef(true);
  const search = queryString.parse(location.search)
  const [searchTerm, setSearchTerm] = useState(search.searchTerm)
  const [resultPage, setResultPage] = useState(search.resultPage)
  const [resultSize, setResultSize] = useState(search.resultSize)
  const [sortType, setSortType] = useState(search.sortType)
  const [searchResults, setSearchResults] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [attributeCategories, setAttributeCategories] = useState([])
  const [isSearching, setSearching] = useState(true)

  useEffect(() => {
    if (!didMountRef.current) {
      prevHistoryRef.current = props.history.location
    }
    const prevHistory = prevHistoryRef.current
    if(props.history.location.search !== prevHistory.search){
      let searchNew = queryString.parse(props.history.location.search)
      let searchOld = queryString.parse(prevHistory.search)
      if (searchOld.searchTerm !== searchNew.searchTerm){
        setSearchTerm(searchNew.searchTerm)
      }
      if (searchOld.resultPage !== searchNew.resultPage){
        setResultPage(searchNew.resultPage)
      }
      if (searchOld.resultSize !== searchNew.resultSize){
        setResultSize(searchNew.resultSize)
      }
      prevHistoryRef.current = props.history.location
      preformSearchRef.current = true
    }
  })

  useEffect(() => {
    if(preformSearchRef.current){
      const search = queryString.parse(location.search)
      let body = {"query" : `{itemSearch(searchParams: {searchTerm: "${search.searchTerm}", resultSize: ${search.resultSize}, resultPage: ${search.resultPage}, sortType: "${search.sortType}"}){result,count,attributeCategories{categoryName,features{featureName,itemCount}}}}`}
      setSearching(true) 
      if (search.searchTerm !== ''){
        GraphQLCall(JSON.stringify(body)).then((result) => parseQueryResults(result)).then(() => setSearching(false))
        preformSearchRef.current = false
      }
    }
    if (!didMountRef.current) {
      didMountRef.current = true
    }
  })

  function parseQueryResults(result) {
    let searchResultArray = _.get(result,`data.itemSearch.result`, [])
    let totalResultCount = _.get(result,`data.itemSearch.count`, 0)
    let attributeCategories = _.get(result,`data.itemSearch.attributeCategories`, [])
    setSearchResults(searchResultArray)
    setTotalResults(totalResultCount)
    setAttributeCategories(attributeCategories)
  }

  function handleUpdateResults(updateObj){
    const search = queryString.parse(location.search)
    let query
    let update = Object.keys(updateObj)[0]
    switch(update){
      case 'searchTerm':
        setSearchTerm(updateObj.searchTerm)
        setResultPage(1)
        query = `?searchTerm=${updateObj.searchTerm}&resultSize=${search.resultSize}&resultPage=${1}&sortType=${search.sortType}`
        break;
      case 'resultSize':
        setResultSize(updateObj.resultSize)
        query = `?searchTerm=${search.searchTerm}&resultSize=${updateObj.resultSize}&resultPage=${search.resultPage}&sortType=${search.sortType}`
        break;
      case 'page':
        setResultPage(updateObj.page)
        query = `?searchTerm=${search.searchTerm}&resultSize=${search.resultSize}&resultPage=${updateObj.page}&sortType=${search.sortType}`
        break;
      case 'sort':
        setSortType(updateObj.sort)
        query = `?searchTerm=${search.searchTerm}&resultSize=${search.resultSize}&resultPage=${search.resultPage}&sortType=${updateObj.sort}`
        break;
    }
    props.history.push({
      pathname: '/search',
      search: query
    })
  }

  let SearchResults = _.map(searchResults, result => {
    return(
      <ItemResult key={result.frecno} result={result} updateResults={handleUpdateResults}/>
    )
  })

  let AttributeFilters = _.map(attributeCategories, attribute => {
    return(
      <AttributeFilter 
        name={attribute.categoryName}
        options={attribute.features}
      />
    )
  }

  )

  return(
    <DivContainer>
      <div>
        <CategoryFilter />
        {AttributeFilters}
      </div>
      <ResultsContainer>
        <div>
          <ResultsSummary 
            searchTerm={searchTerm}
            resultSize={resultSize}
            resultPage={resultPage}
            totalResults={totalResults}
          />
          <ResultsSearch
            resultSize={resultSize}
            sortType={sortType}
            updateSearchTerm={(newSearchTerm) => handleUpdateResults({'searchTerm': searchTerm + ' ' + newSearchTerm})}
            updateResultSize={(newResultSize) => handleUpdateResults({'resultSize': newResultSize})}
            updateSortType={(newSortType) => handleUpdateResults({'sort': newSortType})}
          />
        </div>
        { isSearching ? <Loader/> : SearchResults}
        <Paginator 
          resultSize={resultSize}
          resultPage={resultPage}
          totalResults={totalResults}
          updateCurrentPage={(currentPage) => handleUpdateResults({'page': currentPage})
        } />
      </ResultsContainer>
    </DivContainer>
  )
}