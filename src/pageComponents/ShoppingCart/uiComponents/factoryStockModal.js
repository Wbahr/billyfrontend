import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import Popup from 'reactjs-popup'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks'
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

const GET_FACTORY_STOCK = gql`
  query GetFactoryStock($invMastUid: Int){
    factoryStock(invMastUid: $invMastUid){
      invMastUid
      factoryAvailability
      leadTimeDays
      modifiedBy
      modifiedDate
    }
  }
`

const MODIFY_FACTORY_STOCK = gql`
  mutation ModifyFactoryStock($stockInput: FactoryStockInput){
    factoryStock(factoryStock: $stockInput){
      invMastUid
      factoryAvailability
      leadTimeDays
      modifiedDate
      modifiedBy
    }
  }
`

export default function FactoryStockModal({open, product, hideFactoryStockModal}) {
  const [qtyAvailable, setQtyAvailable] = useState(0)
  const [leadTime, setLeadTime] = useState(0)
  const [lastModified, setLastModified] = useState('--')
  const [lastModifiedBy, setLastModifiedBy] = useState('--')
  const [factoryStockDetails, setFactoryStockDetails] = useState(null)
  const {
    name,
    frecno
  } = product

  useEffect(() => {
    if(open) {
      getFactoryStock()
    }
  }, [open])

  useEffect(() => {
    if(!_.isNil(factoryStockDetails)){
      setLeadTime(factoryStockDetails.leadTimeDays)
      setQtyAvailable(factoryStockDetails.factoryAvailability)
      setLastModified(factoryStockDetails.modifiedDate)
      setLastModifiedBy(factoryStockDetails.modifiedBy)
    }
  }, [factoryStockDetails])

  const [getFactoryStock] = useLazyQuery(GET_FACTORY_STOCK, {
    fetchPolicy: 'no-cache',
    variables: {
      invMastUid: frecno
    },
    onCompleted: data => {
      setFactoryStockDetails(data.factoryStock)
    }
  })

  const [modifyFactoryStock, {loading}] = useMutation(MODIFY_FACTORY_STOCK, {
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      setFactoryStockDetails(data.factoryStock)
    }
  })
  function handleClose(){
    hideFactoryStockModal()
  }

  function handleUpdate(){
    modifyFactoryStock(
      {
        variables: {
          "stockInput": {
            "invMastUid": Number(frecno),
            "factoryAvailability": Number(qtyAvailable),
            "leadTimeDays": Number(leadTime)
          }
        }
      }
    )
  }

  function handleChange(e){
    if( e.target.id === "qtyAvailable"){
      setQtyAvailable(e.target.value)
    } else if( e.target.id === "leadTime") {
      setLeadTime(e.target.value)
    }
  }
  
  return(
    <Popup open={open} onClose={()=>handleClose()} closeOnDocumentClick contentStyle={{'maxWidth': '400px', 'borderRadius': '5px'}}>
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
            <Label>Last Modified: </Label><input disabled value={lastModified} style={{'width': '250px'}}/>
          </DivItem>
        </DivRow>
        <DivRow>
          <DivItem>
            <Label>Modified By: </Label><input disabled value={lastModifiedBy} style={{'width': '250px'}}/>
          </DivItem>
        </DivRow>
        <ButtonBlack disabled={loading} onClick={()=>{handleUpdate()}}>Update</ButtonBlack>
      </Container>
    </Popup>
  )
}