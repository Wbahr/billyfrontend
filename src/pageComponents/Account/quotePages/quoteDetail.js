import React, { useState, useContext, useMemo, useEffect } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import 'react-datepicker/dist/react-datepicker.css'
import Context from '../../../setup/context'
import ExportButtons from '../uiComponents/exportButtons'
import QuoteDetailItem from './quoteDetailItem'
import Input from '../../_common/form/inputv2'
import { format as dateFormat, isBefore, parseJSON, startOfToday } from 'date-fns'
import NumberFormat from 'react-number-format'
import AddedModal from '../../SearchResults/uiComponents/addedModal'
import { PDFDownloadLink } from '@react-pdf/renderer'
import MyDocument from './quoteDetailPDF'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getAvailabilityMessage } from 'pageComponents/_common/helpers/generalHelperFunctions'
import { GET_ORDERS_DETAIL, GET_ITEM_PRICE, GET_ITEM_AVAILABILITY } from 'setup/providerGQL'
import { GET_ORDER_DETAIL_ITEM_DETAIL } from 'setup/gqlQueries/gqlItemQueries'

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

const ButtonExport = styled.div`
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	border: 1px solid lightgrey;
	border-radius: 5px;
	margin: 10px 4px;
	&:hover {
		background-color: whitesmoke;
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

export default function QuoteDetail({ history, orderId: quoteId }) {
    const context = useContext(Context)
    const [filter, setFilter] = useState('')
    const [showShowAddedToCartModal, setShowAddedToCartModal] = useState(false)

    const { loading: isOrderDetailsLoading, data: orderDetails } = useQuery(GET_ORDERS_DETAIL, {
        fetchPolicy: 'no-cache',
        variables: { orderNumber: String(quoteId) }
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
        lineItems,
        quoteRefNo,
        quoteHeader,
    } = orderDetails?.accountOrderDetails || {}

    const [itemDetails, setItemDetails] = useState(<p>Loading Items...</p>)
    const [exportData, setExportData] = useState([])
    const [pdfData, setPdfData] = useState({})
    
    const omitQuote = isBefore(parseJSON(quoteHeader?.expirationDate), startOfToday()) || quoteHeader?.isCompleted
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

    useEffect(() => {
        if (lineItems && itemsDetails && itemsPrices && itemsAvailability && orderDetails) {
            const filteredListItems = (!lineItems || !lineItems.length) 
                ? [] 
                : lineItems.filter(i => {
                    if (!filter || !filter.length) return true
        
                    const currentItemCode = i.itemCode.toLowerCase()
                    const filterLower = filter.toLowerCase()
        
                    return currentItemCode.indexOf(filterLower) > -1
                })
            getItemDetails(filteredListItems)    
        }
    }, [lineItems, itemsDetails, itemsPrices, itemsAvailability, orderDetails]) 

    function getItemDetails(filteredListItems) {
        const rtnItemDetails = []
        const exportData = []
        const pdfItems = []
        for (const item of filteredListItems) {
            const itemDetails = itemsDetails?.itemDetailsBatch?.find(detail => detail.invMastUid === item.invMastUid)
            const itemPrice = itemsPrices?.getItemPrices?.find(price => price.invMastUid === item.invMastUid)
            const itemAvailability = itemsAvailability?.itemAvailability?.find(a => a.invMastUid === item.invMastUid)
            rtnItemDetails.push(
                <QuoteDetailItem 
                    key={item.lineNumber} 
                    quoteId={quoteId}
                    item={item}
                    itemDetails={itemDetails}
                    availability={itemAvailability}
                    priceInfo={itemPrice}
                    omitQuote={omitQuote}
                />
            )    
            exportData.push(
                {
                    ...item,
                    ...itemDetails,
                    ...itemAvailability,
                    currentPrice: itemPrice?.unitPrice,
                    leadTimeDays: getAvailabilityMessage(1, itemAvailability?.availability, itemAvailability?.leadTimeDays),
                    ...orderDetails.accountOrderDetails
                }
            )
            pdfItems.push(
                {
                    ...item,
                    ...itemDetails,
                    ...itemAvailability,
                    currentPrice: itemPrice?.unitPrice,
                    leadTimeDays: getAvailabilityMessage(1, itemAvailability?.availability, itemAvailability?.leadTimeDays),
                }
            )
        }
        setItemDetails(rtnItemDetails)
        setExportData(exportData)
        setPdfData({ ...orderDetails?.accountOrderDetails, lineItems: pdfItems })
    }

    if (!itemDetails || itemDetails.length === 0) {
        setItemDetails(<p>No items found matching search.</p>)
    }

    function handleAddQuote() {
        const items = lineItems.map(item => {
            return {
                invMastUid: item.invMastUid,
                quantity: parseInt(item.quantityOrdered, 10),
                itemNotes: '',
                itemUnitPriceOverride: null,
                customerPartNumberId: item.customerPartNumberId,
                ...(!omitQuote ? { quoteLineId: item.lineItemId } : {})
            }
        })
        context.addItems(items)
        setShowAddedToCartModal(true)
    }

    function handleAddedToCart(){
        setShowAddedToCartModal(false)
    }
    
    const QuoteDetailDownloadButton = useMemo(() => {
        return (
            <DivDownload>
                <PDFDownloadLink document={<MyDocument data={pdfData} />} fileName={`airline_quote_${quoteId}.pdf`}>
                    {({ loading }) => (loading ? 'Loading document...' : (
                        <ButtonExport>
                            <FontAwesomeIcon size='lg' icon="file-pdf" color="#ff0000" />
                        </ButtonExport>
                    ))}
                </PDFDownloadLink>
            </DivDownload>
        )
    }, [pdfData])
    
    const exportColumns = [
        { accessor: 'itemCode', Header: 'Item Code' },
        { accessor: 'invMastUid', Header: 'AHC #' },
        { accessor: 'unitPrice', Header: 'Quote Unit Price' },
        { accessor: 'totalPrice', Header: 'Quote Total Price' },
        { accessor: 'currentPrice', Header: 'Current Unit Price' },
        { accessor: 'availability', Header: 'Availability' },
        { accessor: 'leadTimeDays', Header: 'Lead Time' },
        { accessor: 'quantityOrdered', Header: 'Quantity' },
        { accessor: 'orderDate', Header: 'Order Date' },
        { accessor: 'orderNumber', Header: 'Quote Number' },
        { accessor: 'quoteRefNo', Header: 'Quote Ref No' },
        { accessor: 'poNo', Header: 'P.O. Number' },
        { accessor: 'status', Header: 'Status' },
        { accessor: 'packingBasis', Header: 'Packing Basis' },
        { accessor: 'total', Header: 'Total' },
        { accessor: 'shipToName', Header: 'Ship To Name' },
        { accessor: 'shipToAddress1', Header: 'Ship To Address 1' },
        { accessor: 'shipToAddress2', Header: 'Ship To Address 2' },
        { accessor: 'shipToAddress3', Header: 'Ship To Address 3' },
        { accessor: 'shipToCity', Header: 'Ship To City' },
        { accessor: 'shipToState', Header: 'Ship To State' },
        { accessor: 'shipToZip', Header: 'Ship To Zip' },
        { accessor: 'shipToCountry', Header: 'Ship To Country' },
    ]

    if (isOrderDetailsLoading){
        return (
            <p>Loading Quote Data...</p>
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
                    <h4>Quote #{quoteId}</h4>
                    {QuoteDetailDownloadButton}
                    <ExportButtons data={exportData} columns={exportColumns} title={`airline_quote_${quoteId}`} hidePDF={true} />
                    <p onClick={() => {history.push('/account/open-quotes')}}>Back to Quotes</p>
                    <ButtonSmall onClick={() => handleAddQuote()}>Add Quote to Cart</ButtonSmall>
                </DivHeader>
                <DivOrderInfoContainer>
                    <DivOrderInfo>
                        <p>Order Date: {orderDate ? dateFormat(new Date(orderDate), 'MM/dd/yyyy') : '--'}</p>
                        <p>Quote Number: {quoteId}</p>
                        <p>Quote Ref No: {quoteRefNo}</p>
                        <p>P.O. Number: {poNo}</p>
                        <p>Status: {status}</p>
                        <p>Packing Basis: {packingBasis}</p>
                        <p>Order Total: <NumberFormat 
                            value={total} 
                            displayType={'text'} 
                            thousandSeparator={true} 
                            prefix={'$'} 
                            decimalScale={2} 
                            fixedDecimalScale
                        />
                        </p>
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
                <div>
                    <Input value={filter} placeholder='Search by Item ID' onChange={(e) => setFilter(e.target.value)}/>
                </div>
                {itemDetails}
            </div>
        )
    }
}