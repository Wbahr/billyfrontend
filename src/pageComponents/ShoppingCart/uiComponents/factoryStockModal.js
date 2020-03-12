import React, { useState } from 'react'
import _ from 'lodash'
import Popup from 'reactjs-popup'
import styled from 'styled-components'
import Context from '../../../config/context'
import { ButtonBlack } from '../../../styles/buttons'

const DivItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
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
  margin: 0 20px;
`

const DivRow = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin: 8px 0;
`

export default function FactoryStockModal({open, product, hideFactoryStockModal}) {
  const [qtyAvailable, setQtyAvailable] = useState(0)
  const [leadTime, setLeadTime] = useState(0)
  const [disableUpdate, setDisableUpdate] = useState(true)
  const {
    name,
    frecno
  } = product

  function handleClose(){
    hideFactoryStockModal()
  }

  function handleUpdate(){
    console.log('updating')
    setDisableUpdate(true)
  }

  function handleChange(e){
    setDisableUpdate(false)
    if( e.target.id === "qtyAvailable"){
      setQtyAvailable(e.target.value)
    } else if( e.target.id === "leadTime") {
      setLeadTime(e.target.value)
    }
  }
  
  return(
    <Popup open={open} onClose={()=>handleClose()} closeOnDocumentClick contentStyle={{'max-width': '400px', 'border-radius': '5px'}}>
      <Container>
        <h4>Factory Stock</h4>
        <h6>{name}</h6>
        <DivRow>
          <DivItem>
            <Label>Quantity Available: </Label><input id="qtyAvailable" type="number" value={qtyAvailable} style={{'width': '100px'}} onChange={(e)=> handleChange(e)}/>
          </DivItem>
          <DivItem>
            <Label>Est. Lead Time (days): </Label><input id="leadTime" type="number" value={leadTime} style={{'width': '100px'}} onChange={(e)=> handleChange(e)}/>
          </DivItem>
        </DivRow>
        <DivRow>
          <DivItem>
            <Label>Last Modified: </Label><input value="12/2/2019 12:32:12" style={{'width': '150px'}}/>
          </DivItem>
          <DivItem>
            <Label>Modified By: </Label><input value="Clover" style={{'width': '150px'}}/>
          </DivItem>
        </DivRow>
        <ButtonBlack disabled={disableUpdate} onClick={()=>{handleUpdate()}}>Update</ButtonBlack>
      </Container>
    </Popup>
  )
}