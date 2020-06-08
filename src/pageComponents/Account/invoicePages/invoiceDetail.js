import React, { useState } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import AirlineLogo from '../../../imgs/airline/airline_vector.png'
import { formatTableData } from '../helpers/mutators'
import 'react-datepicker/dist/react-datepicker.css'
import { format as dateFormat } from 'date-fns'
import NumberFormat from 'react-number-format'
import { GET_INVOICE } from '../../../config/providerGQL'
import { useQuery } from '@apollo/client'
import { PDFDownloadLink } from '@react-pdf/renderer'
import MyDocument from './invoiceDetailPDF'

const PageContainer = styled.div`
	padding: 16px 32px;
	box-shadow: 8px 8px 6px -6px lightgray;
	border: 1px solid whitesmoke;
`

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

const DivItemDetail = styled.div`
		display: flex;
		min-height: 48px;
		padding: 8px;
		border-bottom: 1px solid whitesmoke;
	`

const DivItemDetailHeader = styled(DivItemDetail)`
		font-weight: 700;
		border-bottom: 1px solid grey;
		padding: 0;
	`

const DivItemDetailCell = styled.div`
		flex: display;
		flex-direction: column;
		width: ${props => props.width};
		align-self: center;
		text-align: ${props => _.isNil(props.align) ? 'left' : props.align};
	`

const P1 = styled.p`
		font-weight: bold;
		margin: 0;
	`

const P2 = styled.p`
		margin: 0 0 0 8px;
		font-size: 14px;
		color: darkgrey;
	`

const A = styled.a`
		margin: 0 0 0 24px;
		font-size: 14px;
	`

const DivTracking = styled.div`
		display: flex;
		flex-direction: column;
	`

const Row = styled.div`
		display: flex;
`

const DivTotalContainer = styled.div`
	width: 300px;
	border-top: 1px solid black;
	border-bottom: 1px solid black;
	padding: 5px 12px;
	margin-left: auto;
	margin-top: 16px;
`

export default function InvoiceDetail({ history, invoiceId }) {
	const [data, setData] = useState({})

	useQuery(GET_INVOICE, {
		fetchPolicy: 'no-cache',
		variables: {
			'invoiceNumber': String(invoiceId)
		},
		onCompleted: result => {
			setData(result.accountInvoiceDetail)
		}
	})

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
		discountAmount,
		orderedBy,
		subTotal,
		totalTax,
		amountDue
	} = data

	let itemDetails = _.map(lineItems, item => {
		return (
			<DivItemDetail>
				<DivItemDetailCell width='300px'>
					<P1>{item.itemDescription}</P1>
					<P2>Item Code: {item.itemCode}</P2>
					<P2>AHC#: {item.invMastUid}</P2>
					{item.trackingNumbers.map(tracking => {
						return(
							<DivTracking key={tracking.trackingNumber}>
								<P2>{tracking.carrierName}: </P2>
								<A href={tracking.trackingUrl} target='_blank' rel='noopener noreferrer'>{tracking.trackingNumber}</A>
							</DivTracking>
						)
					})}
				</DivItemDetailCell>
				<DivItemDetailCell width='120px' align='center'>
					{item.quantityRequested}
				</DivItemDetailCell>
				<DivItemDetailCell width='120px' align='center'>
					{item.quantityShipped}
				</DivItemDetailCell>
				<DivItemDetailCell width='120px' align='center'>
					{item.quantityRequested - item.quantityShipped}
				</DivItemDetailCell>
				<DivItemDetailCell  width='100px' align='right'>
					<NumberFormat value={item.unitPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale/>
				</DivItemDetailCell>
				<DivItemDetailCell  width='100px' align='right'>
					<NumberFormat value={item.itemTotalPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale/>
				</DivItemDetailCell>
			</DivItemDetail>
		)
	})
	if (_.isEmpty(data)) {
		return(
			<div>
				<p>Loading Invoice Data...</p>
			</div>
		)
	} else {
		return(
			<PageContainer>
				<DivHeader>
					<img src={AirlineLogo} height="40px"/>
					<h4 style={{'paddingLeft': '8px'}}>Invoice #{invoiceId}</h4>
					<PDFDownloadLink document={<MyDocument invoiceId={invoiceId} data={data}/>} fileName={`airline_invoice_${invoiceId}.pdf`}>
						{({ loading }) => (loading ? 'Loading document...' : 'Download this Invoice')}
					</PDFDownloadLink>
					<p onClick={()=>{history.push('/account/invoices')}}>Back to Invoices</p>
				</DivHeader>
				<DivOrderInfoContainer>
					<DivOrderInfo>
						<P1>Bill-to-Address:</P1>
						<p>{billingName}</p>
						<p>{billingAddress1}</p>
						{!_.isNil(billingAddress2) && <p>{billingAddress2}</p>}
						{!_.isNil(billingAddress3) && <p>{billingAddress3}</p>}
						<p>{billingCity}, {billingState} {billingZip}</p>
					</DivOrderInfo>
					<DivOrderInfo>
						<P1>Ship-to-Address:</P1>
						<p>{shipToName}</p>
						<p>{shipToAddress1}</p>
						{!_.isNil(shipToAddress2) && <p>{shipToAddress2}</p>}
						{!_.isNil(shipToAddress3) && <p>{shipToAddress3}</p>}
						<p>{shipToCity}, {shipToState} {shipToZip}</p>
					</DivOrderInfo>
				</DivOrderInfoContainer>
				<DivOrderInfoContainer>
					<DivOrderInfo>
						<Row><P1>Invoice Date: </P1><p>{_.isNil(invoiceDate) ? '--' :dateFormat(new Date(invoiceDate), 'MM/dd/yyyy')}</p></Row>
						<Row><P1>Invoice Number: </P1><p>{invoiceId}</p></Row>
						<Row><P1>P.O. Number: </P1><p>{poNo}</p></Row>
						<Row><P1>Order Number: </P1><p>{orderNumber}</p></Row>
					</DivOrderInfo>
					<DivOrderInfo>
						<Row><P1>Status: </P1><p>{status}</p></Row>
						<Row><P1>Terms: </P1><p>{terms}</p></Row>
						<Row><P1>Net Due Date: </P1><p>{_.isNil(netDueDate) ? '--' :dateFormat(new Date(netDueDate), 'MM/dd/yyyy')}</p></Row>
						<Row><P1>Disc Due Date: </P1><p>{_.isNil(discDueDate) ? '--' :dateFormat(new Date(discDueDate), 'MM/dd/yyyy')}</p></Row>
						<Row><P1>Discount Amount: </P1><p>{discountAmount}</p></Row>
					</DivOrderInfo>
					<DivOrderInfo>
						<Row><P1>Order Date: </P1><p>{_.isNil(orderDate) ? '--' :dateFormat(new Date(orderDate), 'MM/dd/yyyy')}</p></Row>
						<Row><P1>Ordered By: </P1><p>{orderedBy}</p></Row>
						<Row><P1>Taker: </P1><p>{taker}</p></Row>
					</DivOrderInfo>
				</DivOrderInfoContainer>
				<DivOrderInfoContainer>
					<DivOrderInfo>
						<P1>Delivery Instructions:</P1><p> ???</p>
					</DivOrderInfo>
					<DivOrderInfo>
						<P1>Order Note:</P1><p></p>
					</DivOrderInfo>
				</DivOrderInfoContainer>
				<DivItemDetailHeader>
					<DivItemDetailCell width='300px'>
						Item Information
					</DivItemDetailCell>
					<DivItemDetailCell width='120px' align='center'>
						Ordered
					</DivItemDetailCell>
					<DivItemDetailCell width='120px' align='center'>
						Shipped
					</DivItemDetailCell>
					<DivItemDetailCell width='120px' align='center'>
						Remaining
					</DivItemDetailCell>
					<DivItemDetailCell width='100px' align='right'>
						Unit Price
					</DivItemDetailCell>
					<DivItemDetailCell width='100px' align='right'>
						Total Price
					</DivItemDetailCell>
				</DivItemDetailHeader>
				{itemDetails}
				<DivTotalContainer>
					<Row><P1>Subtotal: </P1><NumberFormat value={subTotal} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale/></Row>
					<Row><P1>Tax: </P1><NumberFormat value={totalTax} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale/></Row>
					<Row><P1>Amount Due: </P1><NumberFormat value={amountDue} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale/></Row>
				</DivTotalContainer>
			</PageContainer>
		)
	}
}