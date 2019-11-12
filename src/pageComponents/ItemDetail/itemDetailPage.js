import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

//This grabs every piece of available data. Remove unneeded fields.
const GET_ITEM_BY_ID = gql`
    query ItemById($itemId: ID){
        items(invMastUid: $itemId) {
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
              itemAssociationInvMastU {
                associatedInvMastUid
                createDate
                createdBy
                invMastUid
                lastModifiedDate
                modifiedBy
                quantity
                type
                uid
              }
              itemAssociationAssociatedInvMastU {
                associatedInvMastUid
                createDate
                createdBy
                invMastUid
                lastModifiedDate
                modifiedBy
                quantity
                type
                uid
              }
              itemLink {
                audienceType
                createDate
                createdBy
                invMastUid
                lastModifiedDate
                linkPath
                linkType
                modifiedBy
                sequence
                thumbnail
                title
                uid
              }
              techSpec {
                attributeCategoryId
                createDate
                createdBy
                invMastUid
                lastModifiedDate
                modifiedBy
                name
                sequence
                uid
                value
              }
        }
    }
`

const DivPhoto = styled.div`
    width: 400px;
    height: 400px;
`

export default function ItemDetailPage(){
  let { itemId } = useParams()

  const [item, setItem] = useState(null)
  const { 
    loading, 
    error, 
    data 
  } = useQuery(GET_ITEM_BY_ID, {
    variables: { itemId },
    onCompleted: result => {
      if (result.items.length) {
        setItem(result.items[0])
      } else {
        setItem({})
      }
    }
  })

  if (_.isNil(item)) {
    return(<h1>Loading...</h1>)
  } else if (!_.has(item,`invMastUid`)){
    return(<p>No item found</p>)
  } else {
    let imagePath
    let resultImage = item.image[0].path
    if (_.isNil(resultImage)){
      imagePath = 'https://www.airlinehyd.com/images/no-image.jpg'
    } else {
      let imagePathArray = resultImage.split("\\")
      let imageFile = imagePathArray[imagePathArray.length - 1]
      imageFile = imageFile.slice(0, -5) + 'o.jpg'
      imagePath = 'https://www.airlinehyd.com/images/items/' + imageFile
    }
    return(
      <>
        <DivPhoto>
          <img src={imagePath}/>
        </DivPhoto>
        <div>
        <p>{item.itemDesc}</p>
        </div>
      </>
    )
  }
}