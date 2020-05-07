import React, { useState, useEffect, useRef, useMemo } from 'react'
import styled from 'styled-components'
import { useTable, useGlobalFilter, usePagination, useFilters, useSortBy  } from 'react-table'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import OrderDatapage from 'adminComponents/adminTools/OrderData/orderData'
import { formatTableData, clipboardData } from '../helpers/mutators'
import AirlineInput from '../../_common/form/inputv2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { CopyToClipboard } from 'react-copy-to-clipboard'

export default function OrderDetail({ orderId }) {
  const didMountRef = useRef(false)
  const [filter, setFilter] = useState('')
  const [isListView, setIsListView] = useState(false)
  const [originalData, setOriginalData] = useState([])
  const [data, setData] = useState([])

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

  return(
    <div>
      <div>
        <h4>Order #{orderId}</h4>
      </div>
      <DivOrderInfoContainer>
        <DivOrderInfo>
          <p>Order Date: 7/5/2019</p>
          <p>Order Number: {orderId}</p>
          <p>P.O. Number: N/A</p>
          <p>Status: Complete</p>
          <p>Packing Basis: Partial</p>
          <p>Order Total: $189.00</p>
        </DivOrderInfo>
        <DivOrderInfo>
          <p>Ship-to-Address:</p>
          <p>Stryker Trucking</p>
          <p>1560 Burns Road</p>
          <p>Muncy, PA 17756</p>
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
    </div>
  )
}