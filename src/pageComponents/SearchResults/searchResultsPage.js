import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import _ from 'lodash'
import { GraphQLCall } from '../../config/api'
import ItemResult from './uiComponents/itemResult'
import ResultsSearch from './uiComponents/resultsSearch'
import ResultsSummary from './uiComponents/resultsSummary'
import AttributeFilter from './uiComponents/attributeFilter'
import CategoryFilter from './uiComponents/categoryFilter'
import Loader from '../_common/loader'
import InfiniteScroll from 'react-infinite-scroller'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

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
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`

const DivSearchResultsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const QUERY_ITEM_SEARCH = gql`
  query ItemSearch($searchParams: ElasticSearchItemRequest!){
    itemSearch(searchParams: $searchParams){
      result
      count
      attributeCategories{
        categoryName
        features{
          featureName
          itemCount
        }
      }
      queryJson
    }
  }
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
  const [currentPage, setCurrentPage] = useState(0)
  const [checkedAttributeFilters, setCheckedAttributeFilters] = useState([])
  const [isReplacingResults, setIsReplacingResults] = useState(false)
  const [infiniteScrollHasMore, setInfiniteScrollHasMore] = useState(false)

  const [performItemSearch, { loading, error, data }] = useLazyQuery(QUERY_ITEM_SEARCH, {
    onCompleted: data => {
      var itemSearchResult = data.itemSearch

      //If the number of retrieved results equals the requesting page size,
      //then enable the scroller to possibly load more.
      const search = queryString.parse(location.search)
      if(itemSearchResult.result.length == search.resultSize){
        setInfiniteScrollHasMore(true)
      }

      parseQueryResults(itemSearchResult)
      setIsReplacingResults(false)
      setSearching(false)
    }
  })

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
      prevHistoryRef.current = props.history.location
      performSearchRef.current = true
    }
  })

  useEffect(() => {
    if(currentPage > 0){
      loadFunc()
    }
  }, [currentPage])

  useEffect(() => {
    setCurrentPage(0)
    setIsReplacingResults(true)
    loadFunc(true)
  }, [checkedAttributeFilters])

  function parseQueryResults(itemSearchData) {
    let additionalSearchResults = itemSearchData.result

    if(isReplacingResults){
      setSearchResults([...additionalSearchResults])
    } else{
      setSearchResults([...searchResults, ...additionalSearchResults])
    }
    
    setTotalResults(itemSearchData.count)

    //Only set the attribute categories once
    if(attributeCategories.length === 0){
      setAttributeCategories(itemSearchData.attributeCategories)
    }
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

  function handleUpdatedFeatureToggle(updatedState){
    setCheckedAttributeFilters(updatedState)
  }

  function loadFunc(isAttributeUpdate){
    const search = queryString.parse(location.search)
    
    setSearching(true)
    performItemSearch({
      variables: {
        searchParams: {
          searchTerm: search.searchTerm,
          resultSize: search.resultSize,
          resultPage: isAttributeUpdate ? 1 : currentPage + 1,
          sortType: search.sortType,
          attributeFilters: checkedAttributeFilters.map(filter => {
            return {
              field: filter.field,
              values: filter.values
            }
          })
        }
      }
    })
  }

  let SearchResults = _.map(searchResults, result => {
    return(
      <ItemResult key={result.frecno} result={result} updateResults={handleUpdateResults}/>
    )
  })

  let AttributeFilters = attributeCategories.map((attribute, index) => {

    return(
      <AttributeFilter 
        key={index}
        name={attribute.categoryName}
        options={attribute.features}
        attributeFeatureToggleStates={checkedAttributeFilters}
        updatedFeatureToggleEvent={handleUpdatedFeatureToggle}
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
            loadMore={(newPage) => {
              setInfiniteScrollHasMore(false)
              setCurrentPage(currentPage + 1)
            }}
            hasMore={infiniteScrollHasMore}
            loader={<Loader/>}
        >
          <DivSearchResultsContainer>
            {(searchResults.length === 0 && isSearching) && <Loader/>}
            {SearchResults}
          </DivSearchResultsContainer>
        </InfiniteScroll>
      </ResultsContainer>
    </DivContainer>
  )
}