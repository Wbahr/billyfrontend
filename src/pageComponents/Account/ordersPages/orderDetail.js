import React, { useState, useContext, useMemo } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import 'react-datepicker/dist/react-datepicker.css'
import Context from '../../../setup/context'
import OrderDetailItem from './orderDetailItem'
import Input from '../../_common/form/inputv2'
import { format as dateFormat } from 'date-fns'
import NumberFormat from 'react-number-format'
import AddedModal from '../../SearchResults/uiComponents/addedModal'
import { GET_ORDERS_DETAIL, GET_ITEM_PRICE, GET_ITEM_AVAILABILITY } from 'setup/providerGQL'
import { GET_ORDER_DETAIL_ITEM_DETAIL } from 'setup/gqlQueries/gqlItemQueries'
import { PDFDownloadLink } from '@react-pdf/renderer'
import MyDocument from './orderDetailPDF'


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
const DivDownload = styled.div`
		padding-left: 10px;
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

const Container = styled.div`
    margin: 10px 0;
`

export default function OrderDetail({ history, orderId }) {
    const context = useContext(Context)
    const [filter, setFilter] = useState('')
    const [isTableView] = useState(false)
    const [showShowAddedToCartModal, setShowAddedToCartModal] = useState(false)

    const { loading: isOrderDetailsLoading, data: orderDetails, error } = useQuery(GET_ORDERS_DETAIL, {
        fetchPolicy: 'no-cache',
        variables: { orderNumber: String(orderId) }
    })
    
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
        shipToZip,
        promiseDate,
        lineItems
    } = orderDetails?.accountOrderDetails || {}

    const invMastUids = lineItems?.map(item => item.invMastUid) || []

    const { data: itemsDetails } = useQuery(GET_ORDER_DETAIL_ITEM_DETAIL, {
        variables: {
            invMastUids: invMastUids
        }
    })

    const { data: itemsPrices } = useQuery(GET_ITEM_PRICE, {
        variables: {
            items: invMastUids.map(invMastUid => {
                return {
                    invMastUid: invMastUid,
                    quantity: 1
                }
            })
        }
    })

    const { data: itemsAvailability } = useQuery(GET_ITEM_AVAILABILITY, {
        variables: {
            invMastUids: invMastUids
        }
    })

    let itemDetails = []
    if (!isTableView) {
        const filteredListItems = (!lineItems || !lineItems.length) 
            ? [] 
            : lineItems.filter(i => {
                if (!filter || !filter.length) return true

                const currentItemCode = i.itemCode.toLowerCase()
                const filterLower = filter.toLowerCase()

                return currentItemCode.indexOf(filterLower) > -1
            })
		
        itemDetails = filteredListItems?.map((item) => {
            const itemDetails = itemsDetails?.itemDetailsBatch?.find(detail => detail.invMastUid === item.invMastUid)
            const itemPrice = itemsPrices?.getItemPrices?.find(price => price.invMastUid === item.invMastUid)
            const itemAvailability = itemsAvailability?.itemAvailability?.find(a => a.invMastUid === item.invMastUid)
            return (
                <OrderDetailItem 
                    key={item.lineNumber} 
                    item={item}
                    itemDetails={itemDetails}
                    availability={itemAvailability}
                    priceInfo={itemPrice}
                />
            )
        })

        if (!itemDetails || itemDetails.length === 0) {
            itemDetails = <p>No items found matching search.</p>
        }
    }

    function handleAddOrder() {
        const items = lineItems.map(item => {
            return {
                invMastUid: item.invMastUid,
                quantity: parseInt(item.quantityOrdered, 10),
                itemNotes: '',
                itemUnitPriceOverride: null,
                customerPartNumberId: item.customerPartNumberId
            }
        })

        context.addItems(items)
        setShowAddedToCartModal(true)
    }

    function handleAddedToCart() {
        setShowAddedToCartModal(false)
    }
    const OrderDetailDownloadButton = useMemo(() => {
        return (
            <PDFDownloadLink document={<MyDocument orderId={orderId} data={orderDetails?.accountOrderDetails} />} fileName={`airline_order_${orderId}.pdf`}>
                {({ loading }) => (loading ? 'Loading document...' : 'Download this Order')}
            </PDFDownloadLink>
        )
    }, [orderDetails, orderId])

    if (isOrderDetailsLoading) {
        return (
            <p>Loading Order Data...</p>
        )
    } else {
        return (
            <div>
                <AddedModal
                    open={showShowAddedToCartModal}
                    text={'Added to Cart!'}
                    onClose={handleAddedToCart}
                    timeout={900}
                />
                <DivHeader>
                    <h4>{total > 0 ? 'Order #' : 'RMA #'}{orderId}</h4>
                    <DivDownload>{OrderDetailDownloadButton}</DivDownload>
                    <p onClick={() => { history.push('/account/orders') }}>Back to Orders</p>
                    <ButtonSmall onClick={() => handleAddOrder()}>Add Order to Cart</ButtonSmall>
                </DivHeader>
                <DivOrderInfoContainer>
                    <DivOrderInfo>
                        <p>Order Date: {orderDate ? dateFormat(new Date(orderDate), 'MM/dd/yyyy') : '--'}</p>
                        <p>Promise Date: {promiseDate ? dateFormat(new Date(promiseDate), 'MM/dd/yyyy') : '--'}</p>
                        <p>Order Number: {orderId}</p>
                        <p>P.O. Number: {poNo}</p>
                        <p>Status: {status}</p>
                        <p>Packing Basis: {packingBasis}</p>
                        <p>Order Total: <NumberFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale /></p>
                    </DivOrderInfo>
                    <DivOrderInfo>
                        <p>Ship-to-Address:</p>
                        <p>{shipToName}</p>
                        <p>{shipToAddress1}</p>
                        {shipToAddress2 && <p>{shipToAddress2}</p>}
                        {shipToAddress3 && <p>{shipToAddress3}</p>}
                        <p>{shipToCity}, {shipToState} {shipToZip}</p>
                    </DivOrderInfo>
                </DivOrderInfoContainer>
                <Container>
                    <Input value={filter} placeholder='Search by Item ID' onChange={(e) => setFilter(e.target.value)} />
                </Container>
                {itemDetails}
            </div>
        )
    }
}