import React from 'react'
import AirlineLogo from '../../../imgs/airline/airline_vector.png'
import 'react-datepicker/dist/react-datepicker.css'
import { format as dateFormat } from 'date-fns'
import { Page, Image, Link, Document, StyleSheet, Text, View } from '@react-pdf/renderer'

const isNil = val => val == null
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

const DivOrderInfoContainer = ({ children }) => (
    <View style={{
        display: 'flex',
        flexDirection: 'row',
        borderTop: '1pt solid black',
        borderBottom: '1pt solid black'
    }}
    >
        { children }
    </View>
)
	
const DivOrderInfo = ({ children }) => (
    <View style={{
        width: '50%',
        display: 'flex',
        flexDirection: 'column', 
        margin: '2mm 1mm'
    }}
    >
        { children }
    </View>
)

const DivOrderInfoSm = ({ children }) => (
    <View style={{
        width: '30%',
        display: 'flex',
        flexDirection: 'column', 
        margin: '2mm 1mm'
    }}
    >
        { children }
    </View>
)

const DivItemDetailHeader = ({ children }) => (
    <View style={{
        display: 'flex',
        flexDirection: 'row',
        borderTop: '1pt solid grey',
        borderBottom: '1pt solid grey',
        marginTop: '1mm',
        padding: '2mm 2mm'
    }}
    >
        { children }
    </View>
)

const DivItemDetailCell = ({ children, width, align }) => (
    <View style={{
        display: 'flex',
        flexDirection: 'column',
        width: width,
        alignSelf: 'center',
        textAlign: isNil(align) ? 'left' : align,
    }}
    >
        { children }
    </View>
)

const Header = ({ children }) => (
    <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        margin: '2mm 0',
        alignItems: 'center'
    }}
    >
        { children }
    </View>
)

const P0 = ({ children }) => (
    <Text style={{
        fontSize: '10pt'
    }}
    >
        { children }
    </Text>
)

const P1 = ({ children }) => (
    <Text style={{
        fontSize: '10pt'
    }}
    >
        { children }
    </Text>
)

const P2 = ({ children }) => (
    <Text style={{
        fontSize: '10pt',
        color: 'grey'
    }}
    >
        { children }
    </Text>
)

const P3 = ({ children }) => (
    <Text style={{
        fontSize: '18pt'
    }}
    >
        { children }
    </Text>
)

const DivItemDetail = ({ children }) => (
    <View style={{
        display: 'flex',
        flexDirection: 'row',
        margin: '2mm 0',
        padding: '1mm 2mm',
        borderTop: '1pt solid grey',
        borderBottom: '1pt solid grey'
    }}
    >
        { children }
    </View>
)

const A = ({ children }) => (
    <Link style={{
        fontSize: '8px',
        paddingLeft: '2mm'
    }}
    >
        { children }
    </Link>
)

const DivTracking = ({ children }) => (
    <View style={{
        display: 'flex',
        flexDirection: 'column'
    }}
    >
        { children }
    </View>
)

const Row = ({ children }) => (
    <View style={{
        display: 'flex',
        flexDirection: 'row'
    }}
    >
        { children }
    </View>
)

const DivTotalContainer = ({ children }) => (
    <View style={{
        display: 'flex',
        width: '30%',
        marginLeft: 'auto',
        padding: '1mm 4mm',
        borderTop: '1pt solid black',
        borderBottom: '1pt solid black'
    }}
    >
        { children }
    </View>
)

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

    const itemDetails = lineItems?.map( item => {
        return (
            <DivItemDetail key={item.invMastUid}>
                <DivItemDetailCell width='31%'>
                    <P1>{item.itemDescription}</P1>
                    <P2>Item Code: {item.itemCode}</P2>
                    <P2>AHC#: {item.invMastUid}</P2>
                    {item.trackingNumbers.map(tracking => {
                        return (
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
                <DivItemDetailCell width='13%' align='right'>
                    <P0>
					
                    </P0>
                </DivItemDetailCell>
                <DivItemDetailCell width='13%' align='right'>
                    <P0>
                        ${item.unitPrice.toFixed(2)}
                    </P0>
                </DivItemDetailCell>
                <DivItemDetailCell width='13%' align='right'>
                    <P0>
                        ${item.itemTotalPrice.toFixed(2)}
                    </P0>
                </DivItemDetailCell>
            </DivItemDetail>
        )
    })
    
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Header style={styles.headerView}>
                    <Image src={AirlineLogo} style={styles.logo}/>
                    <P3>Invoice #{invoiceId}</P3>
                </Header>
                <DivOrderInfoContainer>
                    <DivOrderInfo>
                        <P1>Bill-to-Address:</P1>
                        <P0>{billingName}</P0>
                        <P0>{billingAddress1}</P0>
                        {!isNil(billingAddress2) && <P0>{billingAddress2}</P0>}
                        {!isNil(billingAddress3) && <P0>{billingAddress3}</P0>}
                        <P0>{billingCity}, {billingState} {billingZip}</P0>
                    </DivOrderInfo>
                    <DivOrderInfo>
                        <P1>Ship-to-Address:</P1>
                        <P0>{shipToName}</P0>
                        <P0>{shipToAddress1}</P0>
                        {!isNil(shipToAddress2) && <P0>{shipToAddress2}</P0>}
                        {!isNil(shipToAddress3) && <P0>{shipToAddress3}</P0>}
                        <P0>{shipToCity}, {shipToState} {shipToZip}</P0>
                    </DivOrderInfo>
                </DivOrderInfoContainer>
                <DivOrderInfoContainer>
                    <DivOrderInfoSm>
                        <Row><P1>Invoice Date: </P1><P0>{isNil(invoiceDate) ? '--' :dateFormat(new Date(invoiceDate), 'MM/dd/yyyy')}</P0></Row>
                        <Row><P1>Invoice Number: </P1><P0>{invoiceId}</P0></Row>
                        <Row><P1>P.O. Number: </P1><P0>{poNo}</P0></Row>
                        <Row><P1>Order Number: </P1><P0>{orderNumber}</P0></Row>
                    </DivOrderInfoSm>
                    <DivOrderInfoSm>
                        <Row><P1>Status: </P1><P0>{status}</P0></Row>
                        <Row><P1>Terms: </P1><P0>{terms}</P0></Row>
                        <Row><P1>Net Due Date: </P1><P0>{isNil(netDueDate) ? '--' :dateFormat(new Date(netDueDate), 'MM/dd/yyyy')}</P0></Row>
                        <Row><P1>Disc Due Date: </P1><P0>{isNil(discDueDate) ? '--' :dateFormat(new Date(discDueDate), 'MM/dd/yyyy')}</P0></Row>
                        <Row><P1>Discount Amount: </P1><P0>{discountAmount}</P0></Row>
                    </DivOrderInfoSm>
                    <DivOrderInfoSm>
                        <Row><P1>Order Date: </P1><P0>{isNil(orderDate) ? '--' :dateFormat(new Date(orderDate), 'MM/dd/yyyy')}</P0></Row>
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
                    <P0>Subtotal: ${subTotal.toFixed(2)}</P0>
                    <P0>Total Tax: ${totalTax.toFixed(2)}</P0>
                    <P0>Amount Due: ${amountDue.toFixed(2)}</P0>
                </DivTotalContainer>
            </Page>
        </Document>
    )
}
