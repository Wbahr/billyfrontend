import React, {useState, useRef} from 'react'
import _ from 'lodash'
import Popup from 'reactjs-popup'
import styled from 'styled-components'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Loader from '../../_common/loader'
import Context from '../../../config/context'

const Table = styled.table`
  margin: 0 16px;
  table-layout: fixed;
  width: 90%;
`

const TR = styled.tr`
  border-top: 1px lightgrey solid;
  border-bottom: 1px lightgrey solid;
`

const TDGrey = styled.td`
  padding: 4px 8px 4px 24px;
  font-weight: 500;
  background-color: whitesmoke;
`

const TDWhite = styled.td`
padding: 4px 24px 4px 8px;
`

const Div = styled.div`
  display: flex;
  flex-direction: column;
  p {
    text-align: center;
  }
`

const QUERY_STOCK_AVAILABILITY = gql`
  query GetStockAvailability($invMastUid: ID){
    getStockAvailability(invMastUid: $invMastUid){
      airlineStocks {
        companyId
        itemCode
        locationId
        locationName
        locationType
        quantityAllocated
        quantityAvailable
        quantityFrozen
        quantityNonPickable
        quantityOnHand
        quantityQuarantined
      }
      factoryStock {
        factoryAvailability
        factoryMessage
        invMastUid
        leadTimeDays
      }
    }
  }
`

export default function SplitLineModal({open, index, hideSplitLineModal}) {
  const [lineCount, setLineCount] = useState(1)
  const [lineQuantity, setLineQuantity] = useState(1)

  function handleClose(){
    hideSplitLineModal()
    setLineCount(1)
    setLineQuantity(1)
  }
  
  return(
    <Popup open={open} onClose={()=>handleClose()} closeOnDocumentClick>
      <p>split line</p>
      <p>Line Count: </p><input value={lineCount} onChange={(e)=> setLineCount(e.target.value)}/>
      <p>Line Quantity: </p><input value={lineQuantity} onChange={(e)=> setLineQuantity(e.target.value)}/>
      <Context.Consumer>
        {({splitItem}) => (
          <button onClick={()=>{
            splitItem(index,lineCount,lineQuantity)
            handleClose()
          }}>Split Line</button>
        )}
      </Context.Consumer>
    </Popup>
  )
}