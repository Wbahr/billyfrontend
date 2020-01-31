import React, {useState} from 'react'
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
  justify-content: space-between;
  flex-grow: 99;
`

const SearchResultsContainer = styled.div`
  display: flex;
  flex-direction: row;
  float: left;
  padding: 5px;
  margin: 28px 14px;
  height: auto;
`
const SearchResultWrapper = styled.div`

`


export default function ItemCreationPage() {
  const [searchTerm, setSearchTerm] = useState('kq2') //Search term initial value
  const [supplierList, setSupplierList] = useState([]) //Array to populate Supplier List
  const [showNewItemForm, setShowNewItemForm] = useState(false) 
  const [showSearchedItems, setShowSearchedItems] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState(null) //Supplier ID or name, not sure yet

  const { loading, error, data } = useQuery(QUERY_SUPPLIER_LIST, {
    onCompleted: data => {
      setSupplierList(data.getAirlineSuppliers)
      console.log(data.getAirlineSuppliers)
    }
  })

  function searchItems(){
    console.log(searchTerm, selectedSupplier)
  }

  return(
    <>
      <ContentScreenContainer>
        <input type="text" value={searchTerm} onChange={e=>setSearchTerm(e.target.value)}></input>
        


                {/* <SearchResultsContainer src="https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg"></SearchResultsContainer> */}
                
        {/* <Autocomplete
          id="supplier-select"
          options={supplierList}
          getOptionLabel={option => option.name}
          style={{ width: 300 }}
          renderInput={params => (
            <TextField {...params} label="Combo box" variant="outlined" fullWidth />
          )}
        /> */}


        <button onClick={()=>setShowNewItemForm(true)}>Show the actual item creation form</button>
        {showNewItemForm && <NewItemForm/>}

      </ContentScreenContainer>

      <button onClick={()=>searchItems()}>Check Console here</button>
      <button onClick={()=>setShowSearchedItems(true)}>Search Items to begin creation</button>
      {showSearchedItems && <SearchResultWrapper>
        <SearchResultsContainer>
          <img src="https://www.airlinehyd.com/images/items/SMC%20KQ2P-23_l.jpg" width="200" height="200" margin="28px 14px" alt="Image Placeholder" ></img>
          <img src="https://www.airlinehyd.com/images/items/SMC%20KQ2L23-M5N_l.jpg" width="200" height="200" margin="28px 14px" alt="Image Placeholder" ></img>
          <img src="https://www.airlinehyd.com/images/items/SMC%20KQ2L23-M5N_l.jpg" width="200" height="200" margin="28px 14px" alt="Image Placeholder" ></img>
        </SearchResultsContainer>
        <SearchResultsContainer>
          <img src="https://www.airlinehyd.com/images/items/SMC%20KQ2H23-M5N_l.jpg" width="200" height="200" float="left" alt="Image Placeholder" ></img>
          <img src="https://www.airlinehyd.com/images/items/SMC%20KQ2TY10-12A_l.jpg" width="200" height="200" float="left" alt="Image Placeholder" ></img>
          <img src="https://www.airlinehyd.com/images/items/SMC%20KQ2H23-M5N_l.jpg" width="200" height="200" float="left" alt="Image Placeholder" ></img>
        </SearchResultsContainer>
      </SearchResultWrapper>}
      
      

    </>
  )
}