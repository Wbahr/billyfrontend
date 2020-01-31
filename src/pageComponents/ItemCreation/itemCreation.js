import React, { useState } from 'react'
import styled from 'styled-components'
import NewItemForm from './uiComponents/newItemForm'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
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
`
const DivSearchInputWrapper = styled.div`
  width: 500px;
`

const SearchResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center:
  justify-content: center;

`


export default function ItemCreationPage() {
  const [searchTerm, setSearchTerm] = useState('kq2') //Search term initial value
  const [supplierList, setSupplierList] = useState([]) //Array to populate Supplier List
  const [searchResults, setSearchResults] = useState([{},{}, {}, {}, {},{},{}, {}, {}, {}])
  const [showNewItemForm, setShowNewItemForm] = useState(false)
  const [showSearchedItems, setShowSearchedItems] = useState(false)
  const [showMoreItems, setShowMoreItems] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState(null) //Supplier ID or name, not sure yet

  const { loading, error, data } = useQuery(QUERY_SUPPLIER_LIST, {
    onCompleted: data => {
      setSupplierList(data.getAirlineSuppliers)
      console.log(data.getAirlineSuppliers)
    }
  })

  function searchItems() {
    console.log(searchTerm, selectedSupplier)
  }

  let searchResultItems = []
  searchResults.map((element) => {
    searchResultItems.push(
      <DivSearchItemContainer>
        <img src="https://www.airlinehyd.com/images/items/SMC%20KQ2P-23_l.jpg" width="auto" height="200" margin="28px 14px" alt="SMC KQ2P" ></img>
        <p>SMC KQ2P-07</p>
        <p>SMC KQ2P-07, Inch Size Plugs</p>
      </DivSearchItemContainer>
    )
  })

  return (
    <>
      <ContentScreenContainer>
        <DivSearchInputWrapper>
          <DivSpacer>
            <label for="itemIDSearch">Item ID:</label>
            <input type="text" name="itemIDSearch" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}></input>
          </DivSpacer>
          <DivSpacer>
            <label for="supplierNameSearch">Supplier Name:</label>
            <select name="supplierNameSearch">
              <option value="Parker">Parker</option>
              <option value="SMC">SMC</option>
              <option value="Phoenix">Phoenix</option>
              <option value="Schmersal">Schmersal</option>
              <option value="moreSoon">More to be loaded from P21</option>
            </select>
          </DivSpacer>
        </DivSearchInputWrapper>
        {/* <DivSpacer>
          <label for="supplierNameSearch">Supplier Name:</label>
          <Autocomplete
            id="supplier-select"
            name="supplierNameSearch"
            options={supplierList}
            getOptionLabel={option => option.name}
            style={{ width: 300 }}
            renderInput={params => (
              <TextField {...params} label="Combo box" variant="outlined" fullWidth />
            )}
          />
        </DivSpacer> */}



        {/* <button onClick={() => searchItems()}>Check Console here</button> */}
        <button onClick={() => setShowSearchedItems(true)}>Search Items to begin creation</button>
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


          






          <button onClick={() => setShowMoreItems(true)}>I want more items</button>
          <button onClick={() => setShowNewItemForm(true)}>Take me to the form</button>
        </SearchResultWrapper>

        }


        {showNewItemForm && <NewItemForm />}


        {/* <SearchResultsContainer src="https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg"></SearchResultsContainer> */}


 




      </ContentScreenContainer>





    </>
  )
}