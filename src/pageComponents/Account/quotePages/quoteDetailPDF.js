import React from 'react'
import _ from 'lodash'
import AirlineLogo from '../../../imgs/airline/Airline-shop.png'
import 'react-datepicker/dist/react-datepicker.css'
import { format as dateFormat } from 'date-fns'
import { Page, Image, Document, StyleSheet, Text, View, Link } from '@react-pdf/renderer'

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

const DivBillingInfoContainer = ({ children }) => (
    <View style={{
        display: 'flex',
        flexDirection: 'row',
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
        borderTop: '1pt solid black',
        borderBottom: '1pt solid black',
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
        justifyContent: 'space-between',
        margin: '2mm 0',
        alignItems: 'center'
    }}
    >
        { children }
    </View>
)

const HeaderContact =  ({ children }) => (
    <View style={{
        display: 'flex',
        textAlign: 'center',
        width: '30%',
        marginTop: '35px'
    }}
    >
        { children }
    </View>
)

const HeaderOrder =  ({ children }) => (
    <View style={{
        display: 'flex',
        marginTop: '60px'
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
        fontSize: '10pt',
        paddingBottom: '4px',
        fontWeight: 'bold'
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

const P4 = ({ children }) => (
    <Text style={{
        fontSize: '10pt',
        color: '#555555',
        paddingTop: '10px'
    }}
    >
        { children }
    </Text>
)

const P5 = ({ children }) => (
    <Text style={{
        fontSize: '12pt',
        fontWeight: 'bold',
        paddingBottom: '7px',
        paddingTop: '20px'
    }}
    >
        { children }
    </Text>
) 

const P6 = ({ children }) => (
    <Text style={{
        fontSize: '10pt',
        paddingTop: '10px'
    }}
    >
        { children }
    </Text>
)

const DivThanks =  ({ children }) => (
    <View style={{
        display: 'flex',
        flexDirection: 'column',
        borderTop: '1pt solid black',
        borderBottom: '1pt solid black',
    }}
    >
        { children }
    </View>
)

const DivItemDetail = ({ children }) => (
    <View style={{
        display: 'flex',
        flexDirection: 'row',
        margin: '2mm 0',
        padding: '1mm 2mm',
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

const ShopLink = ({ children }) => (
    <Link>
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
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: '1mm 4mm',
        margin: '5px 10px 5px 0',
    }}
    >
        { children }
    </View>
)

const DivTotal = ({ children }) => (
    <View style={{
        borderTop: '1pt solid black',
        borderBottom: '1pt solid black',
        marginTop: '10px'
    }}
    >
        { children }
    </View>
)


export default function quoteDetailPDF({ data }) {

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
        lineItems,
        orderNumber,
        quoteRefNo,
        total,
        packingBasis,
    } = data

    const itemDetails = lineItems?.map((item, index) => {
        return (
            <DivItemDetail key={index}>
                <DivItemDetailCell width='35%'>
                    <P0>Item Code: {item.itemCode}</P0>
                    <P0>AHC#: {item.invMastUid}</P0>
                    {item.customerPartNumber && (
                        <>
                            <P0>Customer Part #: {item.customerPartNumber}</P0>
                        </>
                    )}
                </DivItemDetailCell>
                <DivItemDetailCell width='18%' align='center'>
                    <P0>
                        {item.quantityOrdered}
                    </P0>
                </DivItemDetailCell>
                <DivItemDetailCell width='13%' align='center'>
                    <P0>{item.availability}</P0>
                    <P0>{item.leadTimeDays}</P0>
                </DivItemDetailCell>
                <DivItemDetailCell width='13%' align='right'>
                    <P0>
                        ${item.currentPrice?.toFixed(2)}
                    </P0>
                </DivItemDetailCell>
                <DivItemDetailCell width='18%' align='right'>
                    <P0>${item.unitPrice?.toFixed(2)}</P0>
                    <P0>${item.totalPrice?.toFixed(2)}</P0>
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
                    <HeaderOrder><P3>{'Quote #'}{orderNumber}</P3></HeaderOrder>
                </Header>
                <DivThanks>
                    <P4>Thank you for ordering our products. Please find your quote details below. If you have any questions or concerns, please contact us.</P4>
                    <P5 style={styles.font}>Quote Summary</P5>
                </DivThanks>
                <DivBillingInfoContainer>
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
                        <Row><P1>Order Date: </P1><P0>{isNil(orderDate) ? '--' : dateFormat(new Date(orderDate), 'MM/dd/yyyy')}</P0></Row>
                        <Row><P1>Quote Number: </P1><P0>{orderNumber}</P0></Row>
                        <Row><P1>Quote Ref #: {quoteRefNo}</P1></Row>
                    </DivOrderInfoSm>
                    <DivOrderInfoSm>
                        <Row><P1>P.O. #: </P1><P0>{poNo}</P0></Row>
                        <Row><P1>Status: </P1><P0>{status}</P0></Row>
                    </DivOrderInfoSm>
                    <DivOrderInfoSm>
                        <Row><P1>Packing Basis: </P1><P0>{packingBasis}</P0></Row>
                        <Row><P1>Order Total </P1><P0>${total?.toFixed(2)}</P0></Row>
                    </DivOrderInfoSm>
                </DivOrderInfoContainer>
                <P5>Quote Details</P5>
                <DivItemDetailHeader>
                    <DivItemDetailCell width='35%'>
                        <P0>Item Information</P0>
                    </DivItemDetailCell>
                    <DivItemDetailCell width='18%' align='center'>
                        <P0>Qty Ordered</P0>
                    </DivItemDetailCell>
                    <DivItemDetailCell width='13%' align='center'>
                        <P0>Availability /</P0>
                        <P0>Lead Time</P0>
                    </DivItemDetailCell>
                    <DivItemDetailCell width='13%' align='center'>
                        <P0>Current</P0> 
                        <P0>Unit Price</P0>
                    </DivItemDetailCell>
                    <DivItemDetailCell width='18%' align='center'>
                        <P0>Quote Unit Price</P0> 
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
}
