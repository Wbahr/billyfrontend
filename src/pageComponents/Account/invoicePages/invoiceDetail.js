import React, { useState, useEffect, useRef, useContext } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import { formatTableData } from '../helpers/mutators'
import 'react-datepicker/dist/react-datepicker.css'
import Context from '../../../config/context'
import { format as dateFormat } from 'date-fns'
import NumberFormat from 'react-number-format'

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

export default function InvoiceDetail({ history, invoiceId }) {
	const context = useContext(Context)
	const didMountRef = useRef(false)
	const [data, setData] = useState({})

	useEffect(() => {
		if (!didMountRef.current && context.invoiceCache.length === 0) {
			context.getOrders()
		} else if (context.invoiceCache.length > 0) {
			let mutatedData = formatTableData('invoice-detail', context.invoiceCache, invoiceId)
			setData(mutatedData)
		}
		didMountRef.current = true
	}, [context.invoiceCache])

	const {
		orderDate,
		poNo,
		status,
		shipToName,
		shipToAddress1,
		shipToAddress2,
		shipToAddress3,
		shipToCity,
		shipToState,
		shipToZip,
		billingName,
		billingAddress1,
		billingAddress2,
		billingAddress3,
		billingCity,
		billingState,
		billingZip,
		lineItems,
		terms,
		taker,
		orderNumber,
		invoiceDate,
		netDueDate,
		discDueDate,
		discountAmount
	} = data

	let itemDetails = _.map(lineItems, item => {
		return (
			<div>
				<div>
					{item.itemDescription}
				</div>
				<div>
					{item.quantityRequested}
				</div>
				<div>
					{item.quantityShipped}
				</div>
				<div>
					{item.quantityRequested - item.quantityShipped}
				</div>
				<div>
					<NumberFormat value={item.unitPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale/>
				</div>
				<div>
					<NumberFormat value={item.itemTotalPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale/>
				</div>
			</div>
		)
	})
	return(
		<div>
			<DivHeader>
				<h4>Invoice #{invoiceId}</h4>
				<p onClick={()=>{history.push('/account/invoices')}}>Back to Invoices</p>
			</DivHeader>
			<DivOrderInfoContainer>
				<DivOrderInfo>
					<p>Bill-to-Address:</p>
					<p>{billingName}</p>
					<p>{billingAddress1}</p>
					{!_.isNil(billingAddress2) && <p>{billingAddress2}</p>}
					{!_.isNil(billingAddress3) && <p>{billingAddress3}</p>}
					<p>{billingCity}, {billingState} {billingZip}</p>
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
			<DivOrderInfoContainer>
				<DivOrderInfo>
					<p>Invoice Date: {_.isNil(invoiceDate) ? '--' :dateFormat(new Date(invoiceDate), 'MM/dd/yyyy')}</p>
					<p>Invoice Number: {invoiceId}</p>
					<p>P.O. Number: {poNo}</p>
					<p>Order Number: {orderNumber}</p>
				</DivOrderInfo>
				<DivOrderInfo>
					<p>Status: {status}</p>
					<p>Terms: {terms}</p>
					<p>Net Due Date: {_.isNil(netDueDate) ? '--' :dateFormat(new Date(netDueDate), 'MM/dd/yyyy')}</p>
					<p>Disc Due Date: {_.isNil(discDueDate) ? '--' :dateFormat(new Date(discDueDate), 'MM/dd/yyyy')}</p>
					<p>Discount Amount: {discountAmount}</p>
				</DivOrderInfo>
				<DivOrderInfo>
					<p>Order Date: {_.isNil(orderDate) ? '--' :dateFormat(new Date(orderDate), 'MM/dd/yyyy')}</p>
					<p>Ordered By: ???</p>
					<p>Taker: {taker}</p>
				</DivOrderInfo>
			</DivOrderInfoContainer>
			<DivOrderInfoContainer>
				<DivOrderInfo>
					<p>Delivery Instructions: ???</p>
				</DivOrderInfo>
				<DivOrderInfo>
					<p>Order Note: ???</p>
				</DivOrderInfo>
			</DivOrderInfoContainer>
			{itemDetails}
		</div>
	)
}