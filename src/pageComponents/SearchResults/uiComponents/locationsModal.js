import React from 'react'
import _ from 'lodash'
import Popup from 'reactjs-popup'
import styled from 'styled-components'

const Table = styled.table`
  margin: 0 16px;
  table-layout: fixed;
  width: 90%;
`

const TR = styled.tr`
  border-top: 1px lightgrey solid;
  border-bottom: 1px lightgrey solid;
`

const TDGrey = styled.td`
  padding: 4px 8px 4px 24px;
  font-weight: 500;
  background-color: whitesmoke;
`

const TDWhite = styled.td`
padding: 4px 24px 4px 8px;
`

export default function LocationsModal({open, hideLocationsModal, airlineStock, factoryStock}) {
  let AirlineStockRows
  if(airlineStock.length > 0){
    AirlineStockRows = _.map(airlineStock, location => {
      if(location.quantityAvailable > 0){
        return(
          <TR>
            <TDGrey>{location.locationName}</TDGrey>
            <TDWhite>{location.quantityAvailable}</TDWhite>
          </TR>
        )
      }
    })
  }

  let FactoryStockRows 
  if(factoryStock.factoryAvailability > 0){
    FactoryStockRows = (
      <TR>
        <TDGrey>Factory Stock</TDGrey>
        <TDWhite>{factoryStock.factoryAvailability}</TDWhite>
      </TR>
    )
  }

  return(
    <Popup open={open} onClose={()=>hideLocationsModal()} closeOnDocumentClick>
      <Table>
        <tbody>
          <tr>
            <th>Location</th>
            <th>Quantity Available</th>
          </tr>
          {AirlineStockRows}
          {FactoryStockRows}
        </tbody>
      </Table>
    </Popup>
  )
}