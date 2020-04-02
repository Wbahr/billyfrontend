import React, { useState, useEffect, useContext } from 'react'
import _ from 'lodash'
import Modal from '../../_common/modal'
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

export default function EditPriceModal({open, index, hideEditPriceModal, data}) {
  // const context = useContext(Context)
  const [itemPrice, setItemPrice] = useState('$0.00')
  const [margin, setMargin] = useState(0)
  const airlinecost = 1

  useEffect(()=> {
    if (data && data.modalType === 'edit-price') {
      let mutatedValue = Number(data.itemPrice.substring(1))
      let margin = calculateMargin(mutatedValue)
      setItemPrice(data.itemPrice)
      setMargin(margin)
    } else {

    }
  }, [data])

  function handleReset(){
    let mutatedValue = Number(data.originalItemPrice.substring(1))
    setItemPrice(data.originalItemPrice)
    let margin = calculateMargin(mutatedValue)
    setMargin(margin)
  }

  function handleClose(){
    hideEditPriceModal()
  }

  function calculateMargin(mutatedValue){
    let mutatedAirlineCost = Number(data.airlineCost.substring(1))
    let margin = (mutatedValue - mutatedAirlineCost)/mutatedValue
    if (margin < 0){
      margin = 0
    }
    return((margin * 100).toFixed(1))
  }

  function handleChangePrice(type, value){
    if(type === 'price'){
      let mutatedValue = Number(value.substring(1))
      let margin = calculateMargin(mutatedValue)
      setItemPrice(mutatedValue)
      setMargin(margin)
    } else {
      let mutatedValue = Number(value.slice(0, -1))
      setMargin(mutatedValue)
      let itemPrice = airlinecost /(1 - (mutatedValue/100))
      setItemPrice(itemPrice)
    }
  }
  
  return(
    <Modal open={open} onClose={()=>handleClose()} contentStyle={{'maxWidth': '400px', 'borderRadius': '3px'}}>
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
                handleReset()
                handleClose()
              }}>Cancel</ButtonBlack>
              <ButtonBlack onClick={()=>{
                handleReset()
              }}>Reset</ButtonBlack>
              <ButtonRed onClick={()=>{
                if (itemPrice === data.originalItemPrice) {
                  updateItem(index, 'priceOverride', null)
                } else {
                  updateItem(index, 'priceOverride', parseFloat(itemPrice))
                }
                handleClose()
              }}>Save</ButtonRed>
            </DivRow>
          )}
        </Context.Consumer>
      </Container>
    </Modal>
  )
}