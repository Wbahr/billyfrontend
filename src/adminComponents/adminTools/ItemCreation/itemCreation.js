import React, { useState } from 'react'
import styled from 'styled-components'
import NewItemForm from './uiComponents/newItemForm'
import Select from 'react-select'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Button } from '@material-ui/core'

const QUERY_SUPPLIER_LIST = gql`
  query GetSuppliers{
    getAirlineSuppliers{
      id
      name
    }
  }
`

const QUERY_ITEM_SEARCH = gql`
  query ItemSearch($searchParams: ElasticSearchItemRequest!){
    itemSearch(searchParams: $searchParams){
      result
      count
    }
  }
`

const ContentScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 1600px;
  margin: 28px auto;
  flex-grow: 99;
  align-items: center;
`

const DivSpacer = styled.div`
  margin: 5px 0px;
  display: flex;
  flex-direction: column;
`

const DivSearchItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 5px;
  width: 225px;
  height: auto;
  text-align: center;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 1px solid grey;
  border-radius: 2px;
`

const SearchResultsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 5px;
  align-self: center;
  margin: 28px auto;
  height: auto;
  justify-content: center;
`
const DivSearchInputWrapper = styled.div`
  width: 500px;
`

const SearchResultWrapper = styled.div`

`

export default function ItemCreationPage() {
  const [searchTerm, setSearchTerm] = useState('') //Search term initial value
  const [supplierList, setSupplierList] = useState([]) //Array to populate Supplier List
  const [itemSearchResult, setItemSearchResult] = useState([]) //array to hold searched items
  const [showNewItemForm, setShowNewItemForm] = useState(false)
  const [showSearchedItems, setShowSearchedItems] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [isSearching, setIsSearching] = useState(false)
  
  let maxPage = 3
  const { loading, error, data } = useQuery(QUERY_SUPPLIER_LIST, {
    onCompleted: data => {
      setSupplierList(data.getAirlineSuppliers)
      // console.log(data.getAirlineSuppliers)
    }
  })

  const [performItemSearch] = useLazyQuery(QUERY_ITEM_SEARCH, {
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      setCurrentPage(currentPage + 1)
      setIsSearching(false)
      setItemSearchResult([...itemSearchResult, ...data.itemSearch.result])
    }
  })


  function searchItems() {
    setIsSearching(true)
    performItemSearch({
      variables: {
        searchParams: {
          searchTerm: searchTerm,
          resultSize: 10,
          resultPage: currentPage,
          sortType: 'relevancy',
          brandFilters: [],
          categoryFilter: {
            'parentCategory': '',
            'childCategory': ''
          },
          attributeFilters:[]
        }
      }
    })
  }

  function loadMoreItems(){
    searchItems()
  }

  function handleChange(newSelection){
    setSelectedSupplier(newSelection)
  }


  let searchResultItems = []
  itemSearchResult.map((element, index) => {
    let resultImage = ""
    if (element.thumbnail_image_path === null)
    {
      resultImage = 'https://www.airlinehyd.com/images/no-image.jpg'
    }
    else
    {
      resultImage = "https://www.airlinehyd.com/images/items/"+(element.thumbnail_image_path.split("\\")[8]).replace("_t", "_l")
    }
    searchResultItems.push(
      <DivSearchItemContainer key={index}>
        <img src={resultImage} width="auto" height="150" margin="28px 14px" alt={element.item_id} ></img>
        <p>{element.item_id}</p>
        <p>{element.item_desc}</p>
      </DivSearchItemContainer>
    )
  })

  return (
    <>
      <ContentScreenContainer>
        <DivSearchInputWrapper>
          <DivSpacer>
            <label for="itemIDSearch">Item ID:</label>
            <input type="text" placeholder="Enter item ID" name="itemIDSearch" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}></input>
          </DivSpacer>
          <DivSpacer>
            <label htmlFor="supplierNameSearch">Supplier Name:</label>
            <Select
              name="supplierNameSearch"
              value={selectedSupplier}
              onChange={handleChange}
              options={supplierList}
              getOptionLabel={(option) => option.id + " - " + option.name}
              getOptionValue={(option) => option.name}
            />
          </DivSpacer>
        </DivSearchInputWrapper>
        <Button variant="contained" color="primary" disabled={isSearching} onClick={() => {searchItems()}}>
          {isSearching ? 'Searching..' : 'Search for Item'}
        </Button>
        {searchResultItems.length > 0 && 
          <SearchResultWrapper>
            <SearchResultsContainer>
              {searchResultItems}
            </SearchResultsContainer>
            <Button variant="contained" color="primary" disabled={currentPage > maxPage || isSearching} onClick={() => loadMoreItems()}>
              {currentPage <= maxPage ? 'View more Items' : 'Contact Item Master'}
            </Button>
            <Button variant="contained" color="primary" onClick={() => setShowNewItemForm(true)}>
              Take me to the form
            </Button>
          </SearchResultWrapper>
        }
        {showNewItemForm && <NewItemForm />}
      </ContentScreenContainer>
    </>
  )
}