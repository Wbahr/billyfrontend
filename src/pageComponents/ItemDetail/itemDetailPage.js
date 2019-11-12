import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Loader from '../_common/loader'


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
const ItemDetailPageContainer = styled.div`
  display: flex;
  width: 100%;  
`

const DivPhoto = styled.div`
    width: 400px;
    height: 400px;
    margin: 0px 8px;
`

const DivDetails = styled.div`
  flex-grow: 99;
  margin: 0 32px;
`

const DivPurchaseInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 300px;
  height: 400px;
  margin: 30px 8px 0 12px;
  padding: 8px 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-content: center;
`

const H2ItemTitle = styled.h2`
  font-size: 25px;
  font-weight: 500;
`
const PManufacturer = styled.p`
  font-size: 14px;
`

const PItemExtendedDescription = styled.p`
  font-size: 16px;
  color: slate;
`

const H3ItemSection = styled.h3`
  background-color: rgb(64, 64, 64);  
  color: white;  
  padding: 4px 0 4px 8px;
  font-size: 1.5rem;
`

const ButtonRed = styled.button`
  background-color: #b51029;
  width: 90%
  color: white;
  font-weight: 600;
  border: 0;
  box-shadow: 1px 1px 2px #000;
  margin: 4px auto;
  padding: 4px 0;
  &:hover{
    background-color: rgb(219, 22, 51);
  }
  &:active{
    background-color: #b51029;
    box-shadow: 0px 0px 1px #000;
  }
`
const ButtonBlack = styled.button`
  background-color: rgb(219, 22, 51);
  width: 90%
  color: white;
  font-weight: 600;
  border: 0;
  padding: 4px 0;
  margin: 4px auto;
  &:hover{
    opacity: 1;
  }
  &:active{
    opacity: 1;
  }
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
    return(<Loader/>)
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
    
    let FeatureItems = item.feature.map(elem => {
      return(
        <li>{elem.text}</li>
      )
    })

    let TechSpecItems = item.techSpec.map(elem => {
      return(
        <li>{elem.name} {elem.value}</li>
      )
    })

    let Features = (
      <ul>
        {FeatureItems}
      </ul>
    )
    
    let TechSpecs = (
      <ul>
        {TechSpecItems}
      </ul>
    )
    return(
      <ItemDetailPageContainer>
        <DivPhoto>
          <img src={imagePath}/>
        </DivPhoto>
        <DivDetails>
          <H2ItemTitle>{item.itemDesc}</H2ItemTitle>
          <PManufacturer>Manufacturer: {item.itemCode}</PManufacturer>
          <hr/>
          {item.availability === 0 ? <p>{item.availabilityMessage}</p> : <p>{`Availability: ${item.availability}`}</p>}
          <p>{`$${item.anonPrice} /each`}</p>
          <p>{item.mfgPartNo}</p>
          <p>{item.itemCode}</p>
          <p>{item.invMastUid}</p>
          <PItemExtendedDescription>{item.extendedDesc}</PItemExtendedDescription>
          <H3ItemSection>Features</H3ItemSection>
          {Features}
          <H3ItemSection>Tech Specs</H3ItemSection>
          {TechSpecs}
        </DivDetails>
        <DivPurchaseInfo>
          <Div>

          </Div>
          <Div>
            <ButtonRed>Add to Cart</ButtonRed>
            <ButtonBlack>Buy Now</ButtonBlack>
          </Div>
        </DivPurchaseInfo>
      </ItemDetailPageContainer>
    )
  }
}