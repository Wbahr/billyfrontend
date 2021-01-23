import React, { useEffect, useState } from 'react'
import AirlineModal from '../../_common/modal'
import styled from 'styled-components'
import { useLazyQuery } from '@apollo/client'
import Loader from '../../_common/loader'
import { QUERY_STOCK_AVAILABILITY } from '../../../config/providerGQL'

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

const Div = styled.div`
  display: flex;
  flex-direction: column;
  p {
    text-align: center;
  }
`

export default function LocationsModal({ open, hideLocationsModal, invMastUid }) {
  const [airlineStock, setAirlineStock] = useState([])
  const [factoryStock, setFactoryStock] = useState([])

  const [getStockAvailability] = useLazyQuery(QUERY_STOCK_AVAILABILITY, {
    variables: { invMastUid },
    onCompleted: ({ airlineStock, factoryStock }) => {
      setAirlineStock(airlineStock || [])
      setFactoryStock(factoryStock || [])
    }
  })
	
  useEffect(() => {
    if (open) {
      getStockAvailability()
    } else {
      setAirlineStock([])
      setFactoryStock([])
    }
  }, [open])
	
  const AirlineStockRows = () => !!airlineStock.length && airlineStock.map((location, idx) => {
    return !!location.quantityAvailable && (
      <TR key={idx}>
        <TDGrey>{location.locationName}</TDGrey>
        <TDWhite>{location.quantityAvailable}</TDWhite>
      </TR>
    )
  })

  const FactoryStockRows = () => !!factoryStock.factoryAvailability && (
    <TR>
      <TDGrey>Factory Stock</TDGrey>
      <TDWhite>{factoryStock.factoryAvailability}</TDWhite>
    </TR>
  )
	
  const maxWidth = airlineStock.length || factoryStock.length ? 800 : 300

  return (
    <AirlineModal open={open} onClose={hideLocationsModal} contentStyle={{ maxWidth, borderRadius: 5, padding: 16 }}>
      {
        !airlineStock.length && !factoryStock.length ? (
          <Div>
            <p>Searching our warehouses..</p>
            <Loader/>
          </Div>
        ) : (
          <Table>
            <tbody>
              <tr>
                <th>Location</th>
                <th>Quantity Available</th>
              </tr>
							
              <AirlineStockRows/>
              <FactoryStockRows/>
            </tbody>
          </Table>
        )
      }
    </AirlineModal>
  )
}