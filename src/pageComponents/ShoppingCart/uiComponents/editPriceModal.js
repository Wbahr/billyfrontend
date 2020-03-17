import React, { useState, useContext } from 'react'
import _ from 'lodash'
import Popup from 'reactjs-popup'
import styled from 'styled-components'
import Context from '../../../config/context'
import { ButtonBlack } from '../../../styles/buttons'

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

export default function EditPriceModal({open, index, hideEditPriceModal}) {
  const context = useContext(Context)
  // let defaultPrice = context.cart[index].itemUnitPriceOverride
  const [itemPrice, setItemPrice] = useState(1)

  function handleClose(){
    hideEditPriceModal()
  }
  
  return(
    <Popup open={open} onClose={()=>handleClose()} closeOnDocumentClick contentStyle={{'max-width': '350px', 'border-radius': '5px'}}>
      <Container>
        <h4>Edit Item Price</h4>
        <DivItem>
          <Label>Item Price: </Label><input value={itemPrice} style={{'width': '100px'}} onChange={(e)=> setItemPrice(e.target.value)}/>
        </DivItem>
        <Context.Consumer>
          {({updateItem}) => (
            <>
              <ButtonBlack onClick={()=>{
                updateItem(index, 'priceOverride', null)
                handleClose()
              }}>Reset</ButtonBlack>
              <ButtonBlack onClick={()=>{
                updateItem(index, 'priceOverride', itemPrice)
                handleClose()
              }}>Save</ButtonBlack>
            </>
          )}
        </Context.Consumer>
      </Container>
    </Popup>
  )
}