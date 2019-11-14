import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Loader from '../_common/loader'
import AccessoryItem from './uiComponents/accessoryItem'

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
  width: 500px;
  padding: 0 32px;
  flex-grow: 99;
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

const Row = styled.div`
  display: flex;
  width: 100%;  
  align-items: flex-end;
`

const P = styled.p`
  margin: 0;
`

const Pbold = styled(P)`
  font-weight: bold;
`

const H4 = styled.h5`
  margin: 12px 0 0 0;
  font-weight: 600;
`

const DivSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 24px;
`

const DivAccessoryItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`

const H2ItemTitle = styled.h2`
  font-size: 25px;
  font-weight: 600;
`
const PManufacturer = styled.p`
  font-size: 14px;
`

const PItemExtendedDescription = styled.p`
  font-size: 16px;
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

const Table = styled.table`
  margin: 0 16px;
  table-layout: fixed;
  width: 100%;
`

const TR = styled.tr`
  border-bottom: 1px whitesmoke solid;
`

const TD = styled.td`
  word-wrap:break-word;
  padding-right: 8px;
`

const Pprice = styled.p`
  color: #328EFC;
  font-size: 18px;
  font-weight: 700;
  padding-right: 4px;
  margin: 0;
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
        <TR><TD>{elem.name}</TD><TD>{elem.value}</TD></TR>
      )
    })

    let ItemLinks = item.itemLink.map(elem => {
      return(
        <a href={elem.linkPath}>{elem.title}</a>
      )
    })

    let Features = (
      <ul>
        {FeatureItems}
      </ul>
    )
    
    let TechSpecs = (
      <div>
        <Table>
          {TechSpecItems}
        </Table>
      </div>
    )

    let Links = (
      <DivSection>
        {ItemLinks}
      </DivSection>
    )

    let AccessoryItems = item.itemAssociationInvMastU.map(elem => {
      return(
        <AccessoryItem 
          associatedItemId={elem.associatedInvMastUid}
        />
      )
    })

    return(
      <ItemDetailPageContainer>
        <DivPhoto>
          <img src={imagePath}/>
        </DivPhoto>
        <DivDetails>
          <H2ItemTitle>{item.itemDesc}</H2ItemTitle>
          <PManufacturer>Manufacturer: {item.itemCode}</PManufacturer>
          <hr/>
          <Row>
            <Pprice>{`Price: $${item.anonPrice}.00`}</Pprice>
            {item.availability === 0 ? <Pbold>{item.availabilityMessage}</Pbold> : <Pbold>{`Availability: ${item.availability}`}</Pbold>}
          </Row>
          <PItemExtendedDescription>{item.extendedDesc}</PItemExtendedDescription>
          <H4>Product Specifications</H4>
          <DivSection>
            <P>Manufacturer Part #: {item.mfgPartNo}</P>
            <P>Manufacturer Item Code: {item.itemCode}</P>
            <P>AHC Part #: {item.invMastUid}</P>
          </DivSection>
          <H4>Features</H4>
          {Features}
          <H4>Tech Specifications</H4>
          {TechSpecs}
          <H4>Links</H4>
          {Links}
          <H4>Accessory Items</H4>
          <DivAccessoryItems>
            {AccessoryItems}
          </DivAccessoryItems>
        </DivDetails>
        <DivPurchaseInfo>
          <Div>
            <p>{`$${item.anonPrice} /EA`}</p>
            <label>Qty:</label><input value={1}/>
            <hr/>
            <p>Availability</p>
          </Div>
          <Div>
            <hr/>
            <ButtonRed>Add to Cart</ButtonRed>
            <ButtonBlack>Buy Now</ButtonBlack>
          </Div>
        </DivPurchaseInfo>
      </ItemDetailPageContainer>
    )
  }
}