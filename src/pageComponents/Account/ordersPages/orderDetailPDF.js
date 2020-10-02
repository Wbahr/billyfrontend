import React from 'react'
import styled from '@react-pdf/styled-components'
import _ from 'lodash'
import AirlineLogo from '../../../imgs/airline/airline-shop.png'
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
		height: '90px',
		width: '142px',
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
		fontSize: '16px',
		fontWeight: '500'
	},
	addressContainer: {
		display: 'flex',
		width: '100%'
	},
	font: {
		fontWeight: '500',
	}
})

const DivOrderInfoContainer = styled.View`
		display: flex;
		flex-direction: row;
		border-top: 1pt solid black;
		border-bottom: 1pt solid black;
`
const DivBillingInfoContainer = styled.View`
		display: flex;
		flex-direction: row;
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
		border-top: 1pt solid black;
		border-bottom: 1pt solid black;
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
		justify-content: space-between;
		margin: 2mm 0;
		align-items: center;
`
const HeaderContact = styled.View`
		display: flex;
		text-align: center;
		width: 30%;
		margin-top: 35px;
`
const HeaderOrder = styled.View`
		display: flex;
		margin-top: 60px;
`

const P0 = styled.Text`
		font-size: 10pt;
`
const P1 = styled.Text`
		font-size: 10pt;
		padding-bottom: 4px;
		font-weight: bold;
`

const P2 = styled.Text`
		font-size: 10pt;
		color: grey;
`

const P3 = styled.Text`
		font-size: 18pt;
`

const P4 = styled.Text`
		font-size: 10pt;
		color: #555555;
		padding-top: 10px;
`

const P5 = styled.Text`
		font-size: 12pt;
		font-weight: bold;
		padding-bottom: 7px;
		padding-top: 20px;
`
const P6 = styled.Text`
		font-size: 10pt;
		padding-top: 10px;
`

const DivThanks = styled.View`
		display: flex;
		flex-direction: column;
		border-top: 1pt solid black;
		border-bottom: 1pt solid black;
`

const DivItemDetail = styled.View`
		display: flex;
		flex-direction: row;
		margin: 2mm 0;
		padding: 1mm 2mm;
`

const A = styled.Link`
		font-size: 8px;
		padding-left: 2mm;
`
const ShopLink = styled.Link`
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
		flex-direction: row;
		justify-content: flex-end;
		padding: 1mm 4mm;
		margin: 5px 10px 5px 0;
`

const DivTotal = styled.View`
		border-top: 1pt solid black;
		border-bottom: 1pt solid black;
		margin-top: 10px;
`

export default React.memo(({ orderId, data }) => {

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
		orderNumber,
		total,
		packingBasis,
		promiseDate
	} = data
	let itemDetails = _.map(lineItems, (item, index) => {
		return (
			<DivItemDetail key={index}>
				<DivItemDetailCell width='35%'>
					<P1>{item.itemDescription}</P1>
					<P2>Item Code: {item.itemCode}</P2>
					<P2>AHC#: {item.invMastUid}</P2>
					{item.trackingNumbers?.map(tracking => {
						return (
							<DivTracking key={tracking.trackingNumber}>
								<P2>{tracking.carrierName}: </P2>
								<A src={tracking.trackingUrl}>{tracking.trackingNumber}</A>
							</DivTracking>
						)
					})}
				</DivItemDetailCell>
				<DivItemDetailCell width='18%' align='center'>
					<P0>
						{item.quantityOpen}
					</P0>
				</DivItemDetailCell>
				<DivItemDetailCell width='18%' align='center'>
					<P0>
						{item.quantityOrdered}
					</P0>
				</DivItemDetailCell>
				<DivItemDetailCell width='13%' align='right'>
					<P0>
						${item.unitPrice.toFixed(2)}
					</P0>
				</DivItemDetailCell>
				<DivItemDetailCell width='13%' align='right'>
					<P0>
						${item.totalPrice.toFixed(2)}
					</P0>
				</DivItemDetailCell>
			</DivItemDetail>
		)
	})

	return (
		<Document>
			<Page size="A4" style={styles.page} wrap>
				<Header style={styles.headerView}>
					<ShopLink src=" http://www.airlinehyd.com"><Image src={AirlineLogo} style={styles.logo} /></ShopLink>
					<HeaderContact>
						<P6>www.airlinehyd.com</P6>
						<P6>1-800-999-7378</P6>
					</HeaderContact>
					<HeaderOrder><P3>{total > 0 ? 'Order #' : 'RMA #'}{orderId}</P3></HeaderOrder>
				</Header>
				<DivThanks>
					<P4>Thank you for ordering our products. Please find your order details below. If you have any questions or concerns, please contact us.</P4>
					<P5 style={styles.font}>Order Summary</P5>
				</DivThanks>
				<DivBillingInfoContainer>
				<DivOrderInfo>
					<P1>Bill-to-Address:</P1>
					<P0>{billingName}</P0>
					<P0>{billingAddress1}</P0>
					{billingAddress2 && <P0>{billingAddress2}</P0>}
					{billingAddress3 && <P0>{billingAddress3}</P0>}
					<P0>{billingCity}, {billingState} {billingZip}</P0>
				</DivOrderInfo>
				<DivOrderInfo>
					<P1>Ship-to-Address:</P1>
					<P0>{shipToName}</P0>
					<P0>{shipToAddress1}</P0>
					{shipToAddress2 && <P0>{shipToAddress2}</P0>}
					{shipToAddress3 && <P0>{shipToAddress3}</P0>}
					<P0>{shipToCity}, {shipToState} {shipToZip}</P0>
				</DivOrderInfo>
				</DivBillingInfoContainer>
				<DivOrderInfoContainer>
					<DivOrderInfoSm>
						<Row><P1>P.O. Number: </P1><P0>{poNo}</P0></Row>
						<Row><P1>Order Number: </P1><P0>{orderNumber}</P0></Row>
					</DivOrderInfoSm>
					<DivOrderInfoSm>
						<Row><P1>Status: </P1><P0>{status}</P0></Row>
						<Row><P1>Packing Basis: </P1><P0>{packingBasis}</P0></Row>
					</DivOrderInfoSm>
					<DivOrderInfoSm>
						<Row><P1>Order Date: </P1><P0>{_.isNil(orderDate) ? '--' : dateFormat(new Date(orderDate), 'MM/dd/yyyy')}</P0></Row>
						<Row><P1>Promise Date </P1><P0>{_.isNil(promiseDate) ? '--' : dateFormat(new Date(promiseDate), 'MM/dd/yyyy')}</P0></Row>
					</DivOrderInfoSm>
				</DivOrderInfoContainer>
				<P5>Order Details</P5>
				<DivItemDetailHeader>
					<DivItemDetailCell width='35%'>
						<P0>Item Information</P0>
					</DivItemDetailCell>
					<DivItemDetailCell width='18%' align='center'>
						<P0>Qty Received</P0>
					</DivItemDetailCell>
					<DivItemDetailCell width='18%' align='center'>
						<P0>Qty Ordered</P0>
					</DivItemDetailCell>
					<DivItemDetailCell width='13%' align='right'>
						<P0>Unit Price</P0>
					</DivItemDetailCell>
					<DivItemDetailCell width='13%' align='right'>
						<P0>Total Price</P0>
					</DivItemDetailCell>
				</DivItemDetailHeader>
				{itemDetails}
				<DivTotal>
					<DivTotalContainer>
						<P0>Total: </P0>
						<P0>${total}</P0>
					</DivTotalContainer>
				</DivTotal>
			</Page>
		</Document>
	)
},
	() => true

)
