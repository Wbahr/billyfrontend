import React, { useState, useEffect, useRef, useContext } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
// import { useTable, useGlobalFilter, usePagination, useFilters, useSortBy  } from 'react-table'
import { formatTableData } from '../helpers/mutators'
import 'react-datepicker/dist/react-datepicker.css'
import Context from '../../../config/context'
import OrderDetailItem from './quoteDetailItem'

export default function OrderDetail({ history, orderId }) {
	const context = useContext(Context)
	const didMountRef = useRef(false)
	const [filter, setFilter] = useState('')
	const [isListView, setIsListView] = useState(true)
	const [data, setData] = useState({})

	const DivOrderInfoContainer = styled.div`
    display: flex;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
  `

	const DivOrderInfo = styled.div`
    width: 300px;
    display: flex;
    flex-direction: column; 
    p {
      margin: 0;  
    }
  `

	useEffect(() => {
		if (!didMountRef.current && context.ordersCache.length === 0) {
			context.getOrders()
		} else if (context.ordersCache.length > 0) {
			let mutatedData = formatTableData('order-detail', context.ordersCache, orderId)
			setData(mutatedData)
		}
	}, [context.ordersCache])

	let itemDetails = []
	if(isListView){
		itemDetails = _.map(data.lineItems, (item) => {
			return(
				<OrderDetailItem item={item} />
			)
		})
	} else {

	}


	return(
		<div>
			<div>
				<h4>Quote #{orderId}</h4>
				<p onClick={()=>{history.push('/account/open-quotes')}}>Back to Quotes</p>
				<button>Add Quote to Cart</button>
			</div>
			<DivOrderInfoContainer>
				<DivOrderInfo>
					<p>Quote Date: {data.orderDate}</p>
					<p>Quote Number: {orderId}</p>
					<p>P.O. Number: {data.poNo}</p>
					<p>Status: {data.status}</p>
					<p>Packing Basis: {data.packingBasis}</p>
					<p>Quote Total: ${data.total}</p>
				</DivOrderInfo>
				<DivOrderInfo>
					<p>Ship-to-Address:</p>
					<p>{data.shipToName}</p>
					<p>{data.shipToAddress1}</p>
					{!_.isNil(data.shipToAddress2) && <p>{data.shipToAddress2}</p>}
					{!_.isNil(data.shipToAddress3) && <p>{data.shipToAddress3}</p>}
					<p>{data.shipToCity}, {data.shipToState} {data.shipToZip}</p>
				</DivOrderInfo>
			</DivOrderInfoContainer>
			<div>
				<p>List View:</p>
				<input value={filter} placeholder='Search by Item ID' onClick={(e)=>setFilter(e.target.value)}/>
			</div>
			{ isListView ?
				<p>List View</p>
				:
				<p>Table</p>
			}
			{itemDetails}
		</div>
	)
}