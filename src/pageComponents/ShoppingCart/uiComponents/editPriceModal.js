import React, { useState, useContext } from 'react'
import _ from 'lodash'
import Popup from 'reactjs-popup'
import styled from 'styled-components'
import Context from '../../../config/context'
import { ButtonBlack, ButtonRed } from '../../../styles/buttons'
import AirlineInput from '../../_common/form/inputv2'

const DivRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

const DivItem = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 4px;
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

export default function EditPriceModal({open, index, hideEditPriceModal}) {
  // const context = useContext(Context)
  const [itemPrice, setItemPrice] = useState('$0.00')
  const [margin, setMargin] = useState(0)
  const airlinecost = 2

  function handleClose(){
    hideEditPriceModal()
  }

  function handleChangePrice(type, value){
    if(type === 'price'){
      let mutatedValue = Number(value.substring(1))
      let margin = (mutatedValue - airlinecost)/airlinecost
      if (margin < 0){
        margin = 0
      }
      setItemPrice(value)
      setMargin((margin * 100).toFixed(1))
    } else {
      let mutatedValue = Number(value.slice(0, -1))
      setMargin(mutatedValue)
      let itemPrice = ((mutatedValue/100) * airlinecost) + airlinecost
      setItemPrice(itemPrice)
    }
  }
  
  return(
    <Popup open={open} onClose={()=>handleClose()} closeOnDocumentClick contentStyle={{'max-width': '400px', 'border-radius': '5px'}}>
      <Container>
        <h4>Edit Item Price</h4>
        <DivRow>
          <DivItem>
            <Label>Item Price: </Label><AirlineInput type="currency" value={itemPrice} width='100px' onChange={(e)=> handleChangePrice('price', e.target.value)}/>
          </DivItem>
          <DivItem>
            <Label>Margin: </Label><AirlineInput type="percent" value={margin} width='100px' onChange={(e)=> handleChangePrice('margin', e.target.value)}/>
          </DivItem>
          <DivItem>
            <Label>Airline Cost: </Label><AirlineInput type="currency" disabled={true} value={airlinecost} width='100px' onChange={()=>{}}/>
          </DivItem>
        </DivRow>
        <Context.Consumer>
          {({updateItem}) => (
            <DivRow>
              <ButtonBlack onClick={()=>{
                updateItem(index, 'priceOverride', null)
                handleClose()
              }}>Reset</ButtonBlack>
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