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
import InfiniteScroll from 'react-infinite-scroller'

const DivContainer = styled.div`
  display: flex;
`

const ResultsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-left: 8px;
`

const DivResultSummaryRow = styled.div`
  display: flex;
`

const DivSearchResultsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export default function SearchResultsPage(props) {
  const didMountRef = useRef(false);
  const prevHistoryRef = useRef();
  const performSearchRef = useRef(true);
  const search = queryString.parse(location.search)
  const [searchTerm, setSearchTerm] = useState(search.searchTerm)
  const [resultPage, setResultPage] = useState(search.resultPage)
  const [sortType, setSortType] = useState(search.sortType)
  const [searchResults, setSearchResults] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [attributeCategories, setAttributeCategories] = useState([])
  const [isSearching, setSearching] = useState(false)
  const [attributeFilterObj, setAttributeFilter] = useState({})
  const [currentPage, setCurrentPage] = useState(0)


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
      prevHistoryRef.current = props.history.location
      performSearchRef.current = true
    }
  })

  useEffect(() => {
    if(performSearchRef.current && !didMountRef.current){
      loadFunc(true)
    }
    if (!didMountRef.current) {
      didMountRef.current = true
    }
  })

  function parseQueryResults(result) {
    let searchResultArray = _.get(result,`data.itemSearch.result`, [])
    let totalResultCount = _.get(result,`data.itemSearch.count`, 0)
    let attributeCategories = _.get(result,`data.itemSearch.attributeCategories`, [])
    setSearchResults([...searchResults, ...searchResultArray])
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

  function handleSelectAttribute(value){
    performSearchRef.current = true
    let mutatedAttributeFilterObj = attributeFilterObj
    let currentKey = value.attribute
    if (value.checked) {
      if(currentKey in mutatedAttributeFilterObj){
        mutatedAttributeFilterObj[currentKey].push(value.bucket) 
      } else {
        mutatedAttributeFilterObj[currentKey] = [value.bucket]
      }
    } else {
      let list = mutatedAttributeFilterObj[currentKey]
      list =  _.remove(list, function(elem) {
        return elem !== value.bucket;
      })
      mutatedAttributeFilterObj[currentKey] = list
    }
    console.log('search status', performSearchRef)
    console.log('mutated', mutatedAttributeFilterObj)
    setAttributeFilter(mutatedAttributeFilterObj)
    console.log('real', attributeFilterObj)
  }

  function loadFunc(isFirstLoad){
    const search = queryString.parse(location.search)
    let body = {"query" : `{itemSearch(searchParams: {searchTerm: "${search.searchTerm}", resultSize: ${search.resultSize}, resultPage: ${currentPage + 1}, sortType: "${search.sortType}"}){result,count,attributeCategories{categoryName,features{featureName,itemCount}}}}`}
    if(isFirstLoad){
      body = {"query" : `{itemSearch(searchParams: {searchTerm: "${search.searchTerm}", resultSize: ${search.resultSize}, resultPage: ${1}, sortType: "${search.sortType}"}){result,count,attributeCategories{categoryName,features{featureName,itemCount}}}}`}
    }
    if(Object.keys(attributeFilterObj).length > 0){
      body = {"query" : `{itemSearch(searchParams: {searchTerm: "${search.searchTerm}", resultSize: ${search.resultSize}, resultPage: ${currentPage + 1}, sortType: "${search.sortType}", attributeFilter: "${attributeFilterObj}"}){result,count,attributeCategories{categoryName,features{featureName,itemCount}}}}`}
    }
    if (search.searchTerm !== '' && !isSearching){
      setSearching(true) 
      GraphQLCall(JSON.stringify(body)).then((result) => parseQueryResults(result)).then(() => setSearching(false)).then(() => setCurrentPage(currentPage + 1))
      performSearchRef.current = false
    }
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
        toggleAttribute={handleSelectAttribute}
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
        <DivResultSummaryRow>
          <ResultsSummary 
            searchTerm={searchTerm}
            resultPage={resultPage}
            totalResults={totalResults}
          />
          <ResultsSearch
            sortType={sortType}
            updateSearchTerm={(newSearchTerm) => handleUpdateResults({'searchTerm': searchTerm + ' ' + newSearchTerm})}
            updateSortType={(newSortType) => handleUpdateResults({'sort': newSortType})}
          />
        </DivResultSummaryRow>
        <InfiniteScroll
            pageStart={0}
            loadMore={() => loadFunc(false)}
            hasMore={true}
            loader={<Loader/>}
        >
          <DivSearchResultsContainer>
            {SearchResults}
          </DivSearchResultsContainer>
        </InfiniteScroll>
      </ResultsContainer>
    </DivContainer>
  )
}