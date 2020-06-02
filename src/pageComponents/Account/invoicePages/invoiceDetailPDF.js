import React from 'react'
import styled from '@react-pdf/styled-components'
import _ from 'lodash'
import AirlineLogo from '../../../imgs/airline/airline_vector.png'
import 'react-datepicker/dist/react-datepicker.css'
import { format as dateFormat } from 'date-fns'
import NumberFormat from 'react-number-format'
import { Page, Text, View, Link, Image, Document, StyleSheet } from '@react-pdf/renderer'

// Create styles
const styles = StyleSheet.create({
	page: {
		padding: '16px 32px'
	},
	section: {
		margin: 10,
		padding: 10,
		flexGrow: 1
	},
	logo: {
		height: '40px',
		width: '133px',
		marginRight: '4mm'
	},
	invoiceNumber: {
		color: 'black',
		paddingLeft: '8px',
		fontSize: '16px',
		fontWeight: '500'
	},
	headerView: {
		display: 'flex',
		color: 'black',
		paddingLeft: '8px',
		fontSize: '16px',
		fontWeight: '500'
	},
	addressContainer: {
		display: 'flex',
		width: '100%'
	}
})

const DivOrderInfoContainer = styled.View`
		display: flex;
		flex-direction: row;
		border-top: 1pt solid black;
		border-bottom: 1pt solid black;
	`

const DivOrderInfo = styled.View`
		width: 50%;
		display: flex;
		flex-direction: column; 
		margin: 2mm 1mm;
	`

const DivOrderInfoSm = styled.View`
		width: 30%;
		display: flex;
		flex-direction: column; 
		margin: 2mm 1mm;
	`

const DivItemDetailHeader = styled.View`
		display: flex;
		flex-direction: row;
		border-top: 1pt solid grey;
		border-bottom: 1pt solid grey;
		margin-top: 1mm;
		padding: 2mm 2mm;
	`

const DivItemDetailCell = styled.View`
		display: flex;
		flex-direction: column;
		width: ${props => props.width};
		align-self: center;
		text-align: ${props => _.isNil(props.align) ? 'left' : props.align};
	`

const Header = styled.View`
	display: flex;
	flex-direction: row;
	align-content: center;
	margin: 2mm 0;
	align-items: center;
`

const P0 = styled.Text`
		font-size: 10pt;

`
const P1 = styled.Text`
		font-size: 10pt;
	`

const P2 = styled.Text`
		font-size: 10pt;
		color: grey;
	`

const P3 = styled.Text`
	font-size: 18pt;
`

const DivItemDetail = styled.View`
	display: flex;
	flex-direction: row;
	margin: 2mm 0;
	padding: 1mm 2mm;
	border-top: 1pt solid grey;
	border-bottom: 1pt solid grey;
`

const A = styled.Link`
		font-size: 8px;
		padding-left: 2mm;
	`

const DivTracking = styled.View`
		display: flex;
		flex-direction: column;
	`

const Row = styled.View`
		display: flex;
		flex-direction: row;
`

const DivTotalContainer = styled.View`
		display: flex;
		align-items: flex-end;
		width: 30%;
		margin-left: auto;
		padding: 1mm 4mm;
		border-top: 1pt solid black;
		border-bottom: 1pt solid black;
`

export default function InvoiceDetailPDF({ invoiceId, data }) {

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
				<DivItemDetailCell width='31%'>
					<P1>{item.itemDescription}</P1>
					<P2>Item Code: {item.itemCode}</P2>
					<P2>AHC#: {item.invMastUid}</P2>
					{item.trackingNumbers.map(tracking => {
						return(
							<DivTracking key={tracking.trackingNumber}>
								<P2>{tracking.carrierName}: </P2>
								<A src={tracking.trackingUrl}>{tracking.trackingNumber}</A>
							</DivTracking>
						)
					})}
				</DivItemDetailCell>
				<DivItemDetailCell width='10%' align='center'>
					<P0>
						{item.quantityRequested}
					</P0>
				</DivItemDetailCell>
				<DivItemDetailCell width='10%' align='center'>
					<P0>
						{item.quantityShipped}
					</P0>
				</DivItemDetailCell>
				<DivItemDetailCell width='10%' align='center'>
					<P0>
						{item.quantityRequested - item.quantityShipped}
					</P0>
				</DivItemDetailCell>
				<DivItemDetailCell  width='13%' align='right'>
					<P0>
					
					</P0>
				</DivItemDetailCell>
				<DivItemDetailCell  width='13%' align='right'>
					<P0>
						${item.unitPrice.toFixed(2)}
					</P0>
				</DivItemDetailCell>
				<DivItemDetailCell  width='13%' align='right'>
					<P0>
						${item.itemTotalPrice.toFixed(2)}
					</P0>
				</DivItemDetailCell>
			</DivItemDetail>
		)
	})

	return(
		<Document>
			<Page size="A4" style={styles.page}>
				<Header style={styled.headerView}>
					<Image src={AirlineLogo} style={styles.logo}/>
					<P3>Invoice #{invoiceId}</P3>
				</Header>
				<DivOrderInfoContainer>
					<DivOrderInfo>
						<P1>Bill-to-Address:</P1>
						<P0>{billingName}</P0>
						<P0>{billingAddress1}</P0>
						{!_.isNil(billingAddress2) && <P0>{billingAddress2}</P0>}
						{!_.isNil(billingAddress3) && <P0>{billingAddress3}</P0>}
						<P0>{billingCity}, {billingState} {billingZip}</P0>
					</DivOrderInfo>
					<DivOrderInfo>
						<P1>Ship-to-Address:</P1>
						<P0>{shipToName}</P0>
						<P0>{shipToAddress1}</P0>
						{!_.isNil(shipToAddress2) && <P0>{shipToAddress2}</P0>}
						{!_.isNil(shipToAddress3) && <P0>{shipToAddress3}</P0>}
						<P0>{shipToCity}, {shipToState} {shipToZip}</P0>
					</DivOrderInfo>
				</DivOrderInfoContainer>
				<DivOrderInfoContainer>
					<DivOrderInfoSm>
						<Row><P1>Invoice Date: </P1><P0>{_.isNil(invoiceDate) ? '--' :dateFormat(new Date(invoiceDate), 'MM/dd/yyyy')}</P0></Row>
						<Row><P1>Invoice Number: </P1><P0>{invoiceId}</P0></Row>
						<Row><P1>P.O. Number: </P1><P0>{poNo}</P0></Row>
						<Row><P1>Order Number: </P1><P0>{orderNumber}</P0></Row>
					</DivOrderInfoSm>
					<DivOrderInfoSm>
						<Row><P1>Status: </P1><P0>{status}</P0></Row>
						<Row><P1>Terms: </P1><P0>{terms}</P0></Row>
						<Row><P1>Net Due Date: </P1><P0>{_.isNil(netDueDate) ? '--' :dateFormat(new Date(netDueDate), 'MM/dd/yyyy')}</P0></Row>
						<Row><P1>Disc Due Date: </P1><P0>{_.isNil(discDueDate) ? '--' :dateFormat(new Date(discDueDate), 'MM/dd/yyyy')}</P0></Row>
						<Row><P1>Discount Amount: </P1><P0>{discountAmount}</P0></Row>
					</DivOrderInfoSm>
					<DivOrderInfoSm>
						<Row><P1>Order Date: </P1><P0>{_.isNil(orderDate) ? '--' :dateFormat(new Date(orderDate), 'MM/dd/yyyy')}</P0></Row>
						<Row><P1>Ordered By: </P1><P0>{orderedBy}</P0></Row>
						<Row><P1>Taker: </P1><P0>{taker}</P0></Row>
					</DivOrderInfoSm>
				</DivOrderInfoContainer>
				<DivOrderInfoContainer>
					<DivOrderInfo>
						<P1>Delivery Instructions:</P1><P0> ???</P0>
					</DivOrderInfo>
					<DivOrderInfo>
						<P1>Order Note:</P1><P0></P0>
					</DivOrderInfo>
				</DivOrderInfoContainer>
				<DivItemDetailHeader>
					<DivItemDetailCell width='31%'>
						<P0>Item Information</P0>
					</DivItemDetailCell>
					<DivItemDetailCell width='10%' align='center'>
						<P0>Ordered</P0>
					</DivItemDetailCell>
					<DivItemDetailCell width='10%' align='center'>
						<P0>Shipped</P0>
					</DivItemDetailCell>
					<DivItemDetailCell width='10%' align='center'>
						<P0>Remaining</P0>
					</DivItemDetailCell>
					<DivItemDetailCell width='13%' align='center'>
						<P0>UOM</P0>
					</DivItemDetailCell>
					<DivItemDetailCell width='13%' align='right'>
						<P0>Unit Price</P0>
					</DivItemDetailCell>
					<DivItemDetailCell width='13%' align='right'>
						<P0>Total Price</P0>
					</DivItemDetailCell>
				</DivItemDetailHeader>
				{itemDetails}
				<DivTotalContainer>
					<P0>Subtotal: {subTotal}</P0>
					<P0>Total Tax: {totalTax}</P0>
					<P0>Total: {subTotal + totalTax}</P0>
				</DivTotalContainer>
			</Page>
		</Document>
	)
}
