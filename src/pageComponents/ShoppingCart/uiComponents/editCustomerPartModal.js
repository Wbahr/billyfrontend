import React, { useState, useContext } from 'react'
import _ from 'lodash'
import Popup from 'reactjs-popup'
import styled from 'styled-components'
import Context from '../../../config/context'
import { ButtonBlack, ButtonRed } from '../../../styles/buttons'
import AirlineInput from '../../_common/form/inputv2'

const DivRow = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
`

const DivItem = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  margin: 0;
  font-size: 12px;
  font-style: italic;
`

const Container = styled.div`
  display: flex; 
  flex-direction: column;
  align-items: center;
  padding: 12px 24px;
  h4 {
    font-family: ProximaBold;
  }
  p {
    font-family: Proxima;
    text-align: center;
  }
  button {
    margin-top: 8px;
  }
`

export default function EditCustomerPartNumberModal({open, index, hideCustomerPartModal}) {
  // const context = useContext(Context)
  const [partNumber, setPartNumber] = useState('')

  function handleClose(){
    hideCustomerPartModal()
  }
  
  return(
    <Popup open={open} onClose={()=>handleClose()} closeOnDocumentClick contentStyle={{'max-width': '350px', 'border-radius': '5px'}}>
      <Container>
        <h4>Add Part Number</h4>
        <DivItem>
          <Label>Part Number: </Label><AirlineInput value={partNumber} width='200px' onChange={(e)=> setPartNumber(e.target.value)}/>
        </DivItem>
        <Context.Consumer>
          {({updateItem}) => (
            <DivRow>
              <ButtonBlack onClick={()=>{
                handleClose()
              }}>Cancel</ButtonBlack>
              <ButtonRed onClick={()=>{
                updateItem(index, 'priceOverride', parseFloat(itemPrice.substring(1)))
                handleClose()
              }}>Save</ButtonRed>
            </DivRow>
          )}
        </Context.Consumer>
      </Container>
    </Popup>
  )
}