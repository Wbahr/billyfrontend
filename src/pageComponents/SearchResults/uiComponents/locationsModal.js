import React, {useState, useRef} from 'react'
import _ from 'lodash'
import Popup from 'reactjs-popup'
import styled from 'styled-components'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

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

const QUERY_STOCK_AVAILABILITY = gql`
  query GetStockAvailability($invMastUid: ID){
    getStockAvailability(invMastUid: $invMastUid){
      airlineStocks {
        companyId
        itemCode
        locationId
        locationName
        locationType
        quantityAllocated
        quantityAvailable
        quantityFrozen
        quantityNonPickable
        quantityOnHand
        quantityQuarantined
      }
      factoryStock {
        factoryAvailability
        factoryMessage
        invMastUid
        leadTimeDays
      }
    }
  }
`

export default function LocationsModal({open, hideLocationsModal, invMastUid}) {
  const [airlineStock, setAirlineStock] = useState([])
  const [factoryStock, setFactoryStock] = useState([])
  const searchSent = useRef(false); 

  const [getStockAvailability, { loading, error, data }] = useLazyQuery(QUERY_STOCK_AVAILABILITY, {
    variables: { invMastUid },
    onCompleted: data => {
      setAirlineStock(data.getStockAvailability.airlineStocks)
      setFactoryStock(data.getStockAvailability.factoryStock)
    }
  })

  if(open && !_.isNil(invMastUid) && !searchSent.current){
    searchSent.current = true
    getStockAvailability()
  } else if (!open && searchSent.current || !open && (airlineStock.length > 0 || factoryStock.length > 0)) {
    searchSent.current = false
    setAirlineStock([])
    setFactoryStock([])
  }

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