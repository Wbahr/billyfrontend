import React, { useState, useEffect, useRef, useContext } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import { formatTableData } from '../helpers/mutators'
import 'react-datepicker/dist/react-datepicker.css'
import Context from '../../../config/context'
import QuoteDetailItem from './quoteDetailItem'
import Input from '../../_common/form/inputv2'
import ToggleSwitch from '../../_common/toggleSwitch'
import matchSorter from 'match-sorter'
import { format as dateFormat } from 'date-fns'
import NumberFormat from 'react-number-format'
import AddedModal from '../../SearchResults/uiComponents/addedModal'

const DivOrderInfoContainer = styled.div`
    display: flex;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
  `

const DivOrderInfo = styled.div`
    width: 300px;
    display: flex;
    flex-direction: column; 
    margin: 8px 0;
    p {
      margin: 0;
      margin-left: 8px;  
    }
  `

const DivHeader = styled.div`
    display: flex;
    align-items: center;
    margin: 4px 0;
    h4 {
      margin: 0;
    }
    p {
      cursor: pointer;
      color: grey;
      font-size: 14px;
      margin: 0 0 0 auto;
    }
  `

const ButtonSmall = styled.button`
    background-color: #b51029;
    color: white;
    font-weight: 600;
    border: 0;
    padding: 4px 8px;
    box-shadow: 1px 1px 2px #000;
    margin: 4px 16px 4px 16px;
    &:hover{
      background-color: rgb(219, 22, 51);
    }
    &:active{
      background-color: #b51029;
      box-shadow: 0px 0px 1px #000;
    }
  `

export default function OrderDetail({ history, orderId: quoteId}) {
	const context = useContext(Context)
	const didMountRef = useRef(false)
	const [filter, setFilter] = useState('')
	const [isTableView, setIsTableView] = useState(false)
	const [data, setData] = useState({})
	const [showShowAddedToCartModal, setShowAddedToCartModal] = useState(false)

	useEffect(() => {
		if (!didMountRef.current && context.ordersCache.length === 0) {
			context.getOrders()
		} else if (context.ordersCache.length > 0) {
			let mutatedData = formatTableData('order-detail', context.ordersCache, quoteId)
			setData(mutatedData)
		}
		didMountRef.current = true
	}, [context.ordersCache])

	// useEffect(() => {
	//   if (!_.isEmpty(data)) {
	//     let batchInvMastUids = _.map(data.lineItems, (item) => {
	//       return(item.invMastUid)
	//     })

	//   }
	// }, [data])

	let itemDetails = []
	if(!isTableView){
		let filteredListItems = matchSorter(data.lineItems, filter, {keys: ['itemCode']})
		itemDetails = _.map(filteredListItems, (item) => {
			return(
				<QuoteDetailItem item={item} />
			)
		})
		if (itemDetails.length === 0){
			itemDetails = <p>No items found matching search.</p>
		}
	} else {

	}

	function handleAddQuote() {
		let items = []
		for(let i =0; i < data.lineItems.length ;i++){
			let item = data.lineItems[i]
			items.push(
				{
					'frecno': item.invMastUid,
					'quantity': parseInt(item.quantityOrdered, 10),
					'itemNotes': '',
					'itemUnitPriceOverride': null,
					'customerPartNumberId': item.customerPartNumberId,
					'quoteId': quoteId
				}
			)
		}
		context.addItems(items)
		setShowAddedToCartModal(true)
	}

	function handleAddedToCart(){
		setShowAddedToCartModal(false)
	}

	const {
		orderDate,
		poNo,
		status,
		packingBasis,
		total,
		shipToName,
		shipToAddress1,
		shipToAddress2,
		shipToAddress3,
		shipToCity,
		shipToState,
		shipToZip
	} = data

	return(
		<div>
			<AddedModal 
				open={showShowAddedToCartModal} 
				text={'Added to Cart!'} 
				onClose={handleAddedToCart}
				timeout={900}
			/>
			<DivHeader>
				<h4>Quote #{quoteId}</h4>
				<p onClick={()=>{history.push('/account/open-quotes')}}>Back to Quotes</p>
				<ButtonSmall onClick={()=>handleAddQuote()}>Add Quote to Cart</ButtonSmall>
			</DivHeader>
			<DivOrderInfoContainer>
				<DivOrderInfo>
					<p>Order Date: {_.isNil(orderDate) ? '--' :dateFormat(new Date(orderDate), 'MM/dd/yyyy')}</p>
					<p>Quote Number: {quoteId}</p>
					<p>P.O. Number: {poNo}</p>
					<p>Status: {status}</p>
					<p>Packing Basis: {packingBasis}</p>
					<p>Order Total: <NumberFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale/></p>
				</DivOrderInfo>
				<DivOrderInfo>
					<p>Ship-to-Address:</p>
					<p>{shipToName}</p>
					<p>{shipToAddress1}</p>
					{!_.isNil(shipToAddress2) && <p>{shipToAddress2}</p>}
					{!_.isNil(shipToAddress3) && <p>{shipToAddress3}</p>}
					<p>{shipToCity}, {shipToState} {shipToZip}</p>
				</DivOrderInfo>
			</DivOrderInfoContainer>
			<div>
				<ToggleSwitch 
					label='View:'
					text='Table'
					text2='List'
					toggled={isTableView}
					setToggled={(value)=>setIsTableView(value)}
				/>
				<Input value={filter} placeholder='Search by Item ID' onChange={(e)=>setFilter(e.target.value)}/>
			</div>
			{itemDetails}
		</div>
	)
}