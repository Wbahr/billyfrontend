import React, { useState, useEffect, useRef, useContext } from 'react'
import styled from 'styled-components'
import { useTable, useGlobalFilter, usePagination, useFilters, useSortBy  } from 'react-table'
import OrderDatapage from 'adminComponents/adminTools/OrderData/orderData'
import { formatTableData, clipboardData } from '../helpers/mutators'
import AirlineInput from '../../_common/form/inputv2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Context from '../../../config/context'
import OrderDetailItem from './orderDetailItem'

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
      console.log('mutatedData', mutatedData)
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

  function handleAddOrder() {
    let items = []
    for(let i =0; i < data.lineItems.length ;i++){
      let item = data.lineItems[i]
      items.push(
        {
          'frecno': item.invMastUid,
          'quantity': parseInt(item.quantityOrdered, 10),
          'itemNotes': '',
          'itemUnitPriceOverride': null
        }
      )
    }
    context.addItems(items)
  }


  return(
    <div>
      <div>
        <h4>Order #{orderId}</h4>
        <p onClick={()=>{history.push('/account/orders')}}>Back to Orders</p>
        <button onClick={()=>handleAddOrder()}>Add Order to Cart</button>

      </div>
      <DivOrderInfoContainer>
        <DivOrderInfo>
          <p>Order Date: {data.orderDate}</p>
          <p>Order Number: {orderId}</p>
          <p>P.O. Number: {data.poNo}</p>
          <p>Status: {data.status}</p>
          <p>Packing Basis: {data.packingBasis}</p>
          <p>Order Total: ${data.total}</p>
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