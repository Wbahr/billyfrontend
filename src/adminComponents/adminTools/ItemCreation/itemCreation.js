import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import NewItemForm from './uiComponents/newItemForm'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Button } from '@material-ui/core'
import AirlineInput from '../../../pageComponents/_common/inputv2'
import AirlineSelect from '../../../pageComponents/_common/selectv2'
import ItemCreationModal from './uiComponents/itemCreationModal'

const QUERY_ITEM_CREATION_DATA = gql`
  query GetItemCreationData{
    suppliers{
      id
      name
      prefix: supplierPrefix
    }
    unitsOfMeasure{
      value: unitId
      label: unitDescription
    }
    productGroups{
      value: productGroupId
      label: productGroupDesc
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
  max-width: 500px;
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 12px auto;
  button {
    margin: 0 16px;
  }
`

export default function ItemCreationPage() {
  const [searchTerm, setSearchTerm] = useState('') //Search term initial value
  const [selectedSupplier, setSelectedSupplier] = useState('')
  const [searchEnabled, setSearchEnabled] = useState(false)
  const [supplierList, setSupplierList] = useState([]) //Array to populate Supplier List
  const [unitsOfMeasureList, setUnitsOfMeasure] = useState([])
  const [productGroupsList, setProductGroups] = useState([])
  const [itemSearchResult, setItemSearchResult] = useState([]) //array to hold searched items
  const [showNewItemForm, setShowNewItemForm] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isSearching, setIsSearching] = useState(false)
  const [submitResponse, setSubmitResponse] = useState(null)
  
  useEffect(() => {
    if(searchTerm !== '' && selectedSupplier !== ''){
      setSearchEnabled(true)
    } else {
      if (searchEnabled){
        setSearchEnabled(false)
      }
    }
  }, [searchTerm, selectedSupplier])

  let maxPage = 3
  const { loading, error, data } = useQuery(QUERY_ITEM_CREATION_DATA, {
    onCompleted: data => {
      setSupplierList(data.suppliers)
      setUnitsOfMeasure(data.unitsOfMeasure)
      setProductGroups(data.productGroups)
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
    let index = supplierList.findIndex(elem => elem.id === selectedSupplier)
    let SearchTerm = _.isNil(supplierList[index].prefix) ? searchTerm : supplierList[index].prefix + ' ' + searchTerm
    performItemSearch({
      variables: {
        searchParams: {
          searchTerm: SearchTerm,
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

  function resetItem() {
    setSearchTerm('')
    setSelectedSupplier('')
    setItemSearchResult([])
    setCurrentPage(1)
    setShowNewItemForm(false)
  }

  function mutateItemId(itemId){
    let mutatedItemId = itemId.replace(/\s/g, '-')
    return(mutatedItemId)
  }

  function showModal(response){
    setSubmitResponse(response)
    if(response.success){
      resetItem()
    }
  }


  let searchResultItems = []
  itemSearchResult.map((element, index) => {
    let resultImage = ""
    if (element.thumbnail_image_path === null){
      resultImage = 'https://www.airlinehyd.com/images/no-image.jpg'
    }else{
      resultImage = "https://www.airlinehyd.com/images/items/"+(element.thumbnail_image_path.split("\\")[8]).replace("_t", "_l")
    }
    let mutatedItemId = mutateItemId(element.item_id)
    searchResultItems.push(
      <DivSearchItemContainer key={index}>
        <img src={resultImage} width="auto" height="125" margin="28px 14px" alt={element.item_id} ></img>
        <h6>{element.item_id}</h6>
        <p>{element.item_desc}</p>
        <a href={`/product/${mutatedItemId}/${element.frecno}`} target="_blank">View Details</a>
      </DivSearchItemContainer>
    )
  })

  return (
    <>
      {!_.isNil(submitResponse) && <ItemCreationModal submitResponse={submitResponse} handleCloseModal={()=>setSubmitResponse(null)} /> }
      <ContentScreenContainer>
        <DivSearchInputWrapper>
          <DivSpacer>
            <AirlineInput 
              label="Manufacturer ID:"
              type="text"
              placeholder="Enter Manufacturer ID"
              name="itemIDSearch"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </DivSpacer>
          <DivSpacer>
            <AirlineSelect
              label="Supplier Name:"
              name="supplierNameSearch"
              placeholder="Select a Supplier"
              value={selectedSupplier}
              options={supplierList}
              changeFunction={handleChange}
              getOptionLabel={(option) => option.id + " - " + option.name}
              getOptionValue={(option) => option.name}
            />
          </DivSpacer>
        </DivSearchInputWrapper>
        <ButtonContainer>
          <Button variant="contained" color="secondary" disabled={isSearching} onClick={() => resetItem()}>
            Clear Item
          </Button>
          <Button variant="contained" color="primary" disabled={!searchEnabled | isSearching} onClick={() => {searchItems()}}>
            {isSearching ? 'Searching Items..' : 'Search for Item'}
          </Button>
        </ButtonContainer>
        {searchResultItems.length > 0 && 
          <div>
            <SearchResultsContainer>
              {searchResultItems}
            </SearchResultsContainer>
            <ButtonContainer>
              <Button variant="contained" color="secondary" disabled={isSearching} onClick={() => resetItem()}>
                Clear Item
              </Button>
              <Button variant="contained" color="primary" disabled={currentPage > maxPage || isSearching} onClick={() => loadMoreItems()}>
                {currentPage <= maxPage ? 'View more Items' : 'Contact Item Master'}
              </Button>
              <Button variant="contained" color="primary" disabled={showNewItemForm} onClick={() => setShowNewItemForm(true)}>
                Create a New Item
              </Button>
            </ButtonContainer>
          </div>
        }
        {true && 
          <NewItemForm
            searchTerm={searchTerm}
            selectedSupplier={selectedSupplier}
            supplierList={supplierList}
            unitsOfMeasureList={unitsOfMeasureList}
            productGroupsList={productGroupsList}
            clearForm={()=>resetItem()}
            showModal={response => showModal(response)}
          />}
      </ContentScreenContainer>
    </>
  )
}