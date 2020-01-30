import React, {useState} from 'react'
import styled from 'styled-components'
import NewItemForm from './uiComponents/newItemForm'
//import Autocomplete from '@material-ui/lab/Autocomplete';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
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


export default function ItemCreationPage() {
  const [searchTerm, setSearchTerm] = useState('kq2') //Search term initial value
  const [supplierList, setSupplierList] = useState([]) //Array to populate Supplier List
  const [showNewItemForm, setShowNewItemForm] = useState(false) 
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
        <button onClick={()=>searchItems()}>Search Items to begin creation</button>

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
    </>
  )
}