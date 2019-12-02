import React from 'react'
import _ from 'lodash'
import Popup from 'reactjs-popup'

export default function DetailsModal({open, toggleDetailsModal, airlineStock, factoryStock}) {
  let AirlineStockRows 
  if(airlineStock.length > 0){
    AirlineStockRows = _.map(airlineStock, location => {
      return(
        <tr>
          <td>{location.locationName}</td>
          <td>{location.quantityAvailable}</td>
        </tr>
      )
    })
  }

  let FactoryStockRows 
  if(factoryStock.length > 0){
    FactoryStockRows = _.map(factoryStock, location => {
      return(
        <tr>
          <td>{location.locationName}</td>
          <td>{location.quantityAvailable}</td>
        </tr>
      )
    })
  }

  return(
    <Popup open={open} onClose={toggleDetailsModal()} closeOnDocumentClick>
      <table>
        <tr>
          <th>Location</th>
          <th>Quantity Available</th>
        </tr>
        {AirlineStockRows}
        {FactoryStockRows}
      </table>
    </Popup>
  )
}