import React, {useState, useRef} from 'react'
import _ from 'lodash'
import Popup from 'reactjs-popup'
import styled from 'styled-components'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_ITEM_DETAILS = gql`
query ItemById($invMastUid: ID){
    itemDetails(invMastUid: $invMastUid) {
        anonPrice
        assembly
        availability
        availabilityMessage
        cBrandId
        dateCreated
        dateModified
        extendedDesc
        filters
        hideOnWeb
        invMastUid
        itemCode
        itemDesc
        listPrice
        mfgPartNo
        modelCode
        p21ItemDesc
        p21NonWeb
        popularity
        preferredSourceLoc
        relevancy
        restrictedCustomerCodes
        rootCategoryUids
        showPrice
        supplierId
        tariff
        unitSizeMultiple
        feature {
            createDate
            createdBy
            invMastUid
            lastModifiedDate
            modifiedBy
            sequence
            text
            type
            uid
          }
          image {
            createDate
            createdBy
            invMastUid
            lastModifiedDate
            modifiedBy
            path
            sequence
            type
            uid
          }
    }
}
`

export default function LocationsModal({open, hideDetailsModal, invMastUid}) {
  const [itemDetails, setItemDetails] = useState(null)
  const searchSent = useRef(false); 

  const [performItemDetailSearch, {loading, error, data }] = useLazyQuery(GET_ITEM_DETAILS, {
    variables: { invMastUid },
    onCompleted: data => {
      console.log('data', data)
      setItemDetails(data.itemDetails)
    }
  })

  if(open && !_.isNil(invMastUid) && !searchSent.current){
    searchSent.current = true
    performItemDetailSearch()
  } else if (!open && searchSent.current || !open && !_.isNil(itemDetails)) {
    searchSent.current = false
    setItemDetails(null)
  }

  let PopupContent
  if(_.isNil(itemDetails)){
    PopupContent =(
      <p>no details yet</p>
    )
  } else {
    PopupContent =(
      <p>details</p>
    )
  }
    return(
      <Popup open={open} onClose={()=>hideDetailsModal()} closeOnDocumentClick>
        {PopupContent}
      </Popup>
    )
}