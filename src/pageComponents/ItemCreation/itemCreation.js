import React, { useState } from 'react'
import styled from 'styled-components'
import NewItemForm from './uiComponents/newItemForm'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Select from 'react-select';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
//import Images from './Images';
import gql from 'graphql-tag';


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
  max-width: 1400px;
  margin: 28px auto;
  // justify-content: space-between;
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
  margin: 20px;
  padding: 5px;
  width: 225px;
  height: auto;
  text-align: center;
  justify-content: center;
  align-items: center;
  border: 1px solid grey;

`

const SearchResultsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 5px;
  align-self: center;
  margin: 28px auto;
  max-width: 1200px;
  height: auto;
  justify-content: center;
`
const DivSearchInputWrapper = styled.div`
  width: 500px;
`

const SearchResultWrapper = styled.div`

`
let searchSize = 24
let loadMoreBtnDisabler = 4;

export default function ItemCreationPage() {
  const [searchTerm, setSearchTerm] = useState('') //Search term initial value
  const [supplierList, setSupplierList] = useState([]) //Array to populate Supplier List
  const [itemSearchResult, setItemSearchResult] = useState([]) //array to hold searched items
  const [searchResults, setSearchResults] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}])
  const [showNewItemForm, setShowNewItemForm] = useState(false)
  const [showSearchedItems, setShowSearchedItems] = useState(false)
  const [showMoreItems, setShowMoreItems] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState()
  const [title, setTitle] = useState("Begin item creation");
  const [loadMoreDisable, setLoadMoreDisable] = useState(false)
  const [loadMoreBtnText, setLoadMoreBtnText] = useState("I want more items")
  // const [searchSize, setSearchSize] = useState(10)
  
  const searchSizeExpander = 4

  const { loading, error, data } = useQuery(QUERY_SUPPLIER_LIST, {
    onCompleted: data => {
      setSupplierList(data.getAirlineSuppliers)
      // console.log(data.getAirlineSuppliers)
    }
  })

  const [performItemSearch] = useLazyQuery(QUERY_ITEM_SEARCH, {
    onCompleted: data => {
      // const itemSearchResult = data.itemSearch
      setItemSearchResult(data.itemSearch.result)
      // console.log(data.itemSearch.result)
    }
  })

  const [performMoreItemSearch] = useLazyQuery(QUERY_ITEM_SEARCH, {
    onCompleted: data => {
      // const itemSearchResult = data.itemSearch
      setItemSearchResult(data.itemSearch.result)
      // console.log(data.itemSearch.result)
    }
  })

  function searchItems() {
    performItemSearch({
      variables: {
        searchParams: {
          searchTerm: searchTerm,
          resultSize: 12,
          resultPage: 1,
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

  function moreSearchItems(){
    performItemSearch({
      variables: {
        searchParams: {
          searchTerm: searchTerm,
          resultSize: searchSize,
          resultPage: 1,
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
    if(loadMoreBtnDisabler == 1){
      setLoadMoreDisable(true)
      setLoadMoreBtnText("Contact Item Master for help.")
    }
    else{
      loadMoreBtnDisabler--
      setLoadMoreBtnText("I want more items: " + loadMoreBtnDisabler)
    }
    // setLoadMoreDisable(true)
    searchSize = searchSize + 12
    console.log(searchSize)
  }

  function handleChange(newSelection){
    setSelectedSupplier(newSelection)
  }


  let searchResultItems = []
  itemSearchResult.map((element) => {
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
      <DivSearchItemContainer>
        <img src={resultImage} width="auto" height="150" margin="28px 14px" alt={element.item_id} ></img>
        <p>{element.item_id}</p>
        <p>{element.item_desc}</p>
        
      </DivSearchItemContainer>
    )
    console.log(element)
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
            <label for="supplierNameSearch">Supplier Name:</label>
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



        {/* <button onClick={() => searchItems()}>Check Console here</button> */}
        {/* <ButtonBlue onClick={(e) => { toggleVisibility(), setTitle("Update item creation") }} type="button">{title}</ButtonBlue> */}
        <button onClick={(e) => {setShowSearchedItems(true), setTitle("Update item creation"), searchItems()}}>{title}</button>
        {showSearchedItems && <SearchResultWrapper>
          <SearchResultsContainer>

            {searchResultItems}
          </SearchResultsContainer>
          {/* <SearchResultsContainer>
            <img src="https://www.airlinehyd.com/images/items/SMC%20KQ2H23-M5N_l.jpg" width="auto" height="200" float="left" alt="Image Placeholder" ></img>
            <img src="https://www.airlinehyd.com/images/items/SMC%20KQ2TY10-12A_l.jpg" width="auto" height="200" float="left" alt="Image Placeholder" ></img>
            <img src="https://www.airlinehyd.com/images/items/SMC%20KQ2H23-M5N_l.jpg" width="auto" height="200" float="left" alt="Image Placeholder" ></img>
          </SearchResultsContainer>
          <SearchResultsContainer>
            <img src="https://www.airlinehyd.com/images/items/SMC%20KQ2P-23_l.jpg" width="auto" height="200" float="left" alt="Image Placeholder" ></img>
            <img src="https://www.airlinehyd.com/images/items/SMC%20KQ2P-23_l.jpg" width="auto" height="200" float="left" alt="Image Placeholder" ></img>
            <img src="https://www.airlinehyd.com/images/items/SMC%20KQ2H23-M5N_l.jpg" width="auto" height="200" float="left" alt="Image Placeholder" ></img>
          </SearchResultsContainer> */}


          






          <button disabled={loadMoreDisable} onClick={() => moreSearchItems()}>{loadMoreBtnText}</button> {/*need to know endpoint on how search is being done*/}
          <button onClick={() => setShowNewItemForm(true)}>Take me to the form</button>
        </SearchResultWrapper>

        }


        {showNewItemForm && <NewItemForm />}


        {/* <SearchResultsContainer src="https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg"></SearchResultsContainer> */}


 




      </ContentScreenContainer>





    </>
  )
}