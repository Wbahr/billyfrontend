import React, {useState, useRef} from 'react'
import _ from 'lodash'
import AirlineModal from '../../_common/modal'
import styled from 'styled-components'
import { useLazyQuery } from '@apollo/client'
import gql from 'graphql-tag'
import Loader from '../../_common/loader'

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

const QUERY_STOCK_AVAILABILITY = gql`
  query GetStockAvailability($invMastUid: Int){
    airlineStock(invMastUid: $invMastUid){
      invMastUid
      itemCode
      companyId
      locationId
      locationName
      quantityAvailable
    }
    factoryStock(invMastUid: $invMastUid){
      invMastUid
      factoryAvailability
      leadTimeDays
      factoryMessage
      modifiedBy
      modifiedDate
    }
  }
`

export default function LocationsModal({open, hideLocationsModal, invMastUid}) {
	const [airlineStock, setAirlineStock] = useState([])
	const [factoryStock, setFactoryStock] = useState([])
	const searchSent = useRef(false) 

	const [getStockAvailability] = useLazyQuery(QUERY_STOCK_AVAILABILITY, {
		variables: { 
			'invMastUid': invMastUid 
		},
		onCompleted: data => {
			setAirlineStock(data.airlineStock)
			setFactoryStock(data.factoryStock)
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

	let PopupContent

	if (airlineStock.length === 0 && factoryStock.length === 0) {
		PopupContent = (
			<Div>
				<p>Searching our warehouses..</p>
				<Loader/>
			</Div>
		)
	} else {
		PopupContent = (
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
		)
	}


	return(
		<AirlineModal open={open} onClose={()=>{hideLocationsModal()}} contentStyle={(airlineStock.length === 0 && factoryStock.length === 0) ? {'maxWidth': '300px', 'borderRadius': '5px'} : {'maxWidth': '800px', 'borderRadius': '5px', 'padding': '16px'}}>
			{PopupContent}
		</AirlineModal>
	)
}