import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Loader from '../_common/loader'
import AccessoryItem from './uiComponents/accessoryItem'
import AddedModal from '../SearchResults/uiComponents/addedModal'
import Context from '../../config/context'

const GET_ITEM_BY_ID = gql`
    query ItemById($itemId: Int){
        customerPartNumbers(frecno: $itemId){
          customerPartNumber
          id
        }
        itemDetails(invMastUid: $itemId) {
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
                id
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
                id
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
                id
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
                id
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
                id
              }
              techSpec {
                attributeId
                createDate
                createdBy
                invMastUid
                lastModifiedDate
                modifiedBy
                name
                sequence
                id
                value
              }
        }
    }
`

const GET_ITEM_PRICE = gql`
query ItemSearch($item: ItemPriceRequestInputGraphType){
  getItemPrices(items: $item){
    itemCode
    quantity
    totalPrice
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

const Img = styled.img`
  max-height:100%; 
  max-width:100%;    
`

const DivDetails = styled.div`
  width: 500px;
  padding: 0 32px;
  flex-grow: 99;
`

const DivPurchaseInfo = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 125px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 300px;
  height: 300px;
  margin: 30px 8px 0 12px;
  padding: 8px 16px
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

const RowEnd = styled(Row)`
  justify-content: flex-end;
`

const RowSpaced = styled(Row)`
  justify-content: space-between;
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

const InputQuantity = styled.input`
  width: 50px;
  height: 25px;
  margin-left: 4px;
`

const TABLE = styled.table`
  margin-top: 20px;
`

const TR2 = styled.tr`
  border-top: 1px lightgrey solid;
  border-bottom: 1px lightgrey solid;
`

const TDGrey = styled.td`
  text-align: right;
  padding: 4px 8px 4px 24px;
  font-weight: 500;
  background-color: whitesmoke;
`

const TDWhite = styled.td`
padding: 4px 24px 4px 8px;
`

const IMG = styled.img`
  opacity: 0.6;
`

export default function ItemDetailPage({history}){
  let { itemId, customerPartNumber } = useParams()

  const [item, setItem] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [unitPrice, setUnitPrice ] = useState(null)
  const [selectedCustomerPartNumber, selectCustomerPartNumber] = useState(_.isNil(customerPartNumber) ? null : customerPartNumber)
  const [customerPartNumbers, setCustomerPartNumbers] = useState([])
  const [showShowAddedToCartModal, setShowAddedToCartModal] = useState(false)

  function handleAddedToCart(){
    setShowAddedToCartModal(false)
  }

  itemId = parseInt(itemId,10)
  const { 
    loading, 
    error, 
    data
  } = useQuery(GET_ITEM_BY_ID, {
    variables: { itemId },
    onCompleted: result => {
      if (result.itemDetails) {
        performPriceLookup(
          {
            variables: {	
              "item": {
                "itemsAndQuantities": [
                  {
                    "itemCode": result.itemDetails.itemCode,
                    "quantity": 1
                  }
                ]
              }
            }
          }
        )
        setCustomerPartNumbers(result.customerPartNumbers)
        setItem(result.itemDetails)
      } else {
        setItem({})
      }
    }
  })

  const [performPriceLookup] = useLazyQuery(GET_ITEM_PRICE, {
    onCompleted: data => {
      if (!_.isNil(data.getItemPrices[0])) {
        setUnitPrice(data.getItemPrices[0].totalPrice)
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
          history={history}
        />
      )
    })

    let CustomerPartOptions = _.map(customerPartNumbers, elem => {
      return(<option value={elem.id}>{elem.customerPartNumber}</option>)
    })

    return(
      <ItemDetailPageContainer>
        <AddedModal 
          open={showShowAddedToCartModal} 
          text={'Added to Cart!'} 
          onClose={handleAddedToCart}
          timeout={900}
        />
        <DivPhoto>
          <Img src={imagePath}/>
        </DivPhoto>
        <DivDetails>
          <H2ItemTitle>{item.itemDesc}</H2ItemTitle>
          <PItemExtendedDescription>{item.extendedDesc}</PItemExtendedDescription>
          <Row>
            <Pprice>{_.isNil(unitPrice) ? '--' : `Price: $${unitPrice.toFixed(2)}`}</Pprice>
            {item.availability === 0 ? <Pbold>{item.availabilityMessage}</Pbold> : <Pbold>{`Availability: ${item.availability}`}</Pbold>}
          </Row>
          <TABLE>
            <TR2><TDGrey>Manufacturer</TDGrey><TDWhite><IMG width='100px' src='https://www.airlinehyd.com/customer/aihyco/images/manufacturer_logos/Phoenix_Contact2.jpg'/></TDWhite></TR2>
            <TR2><TDGrey>Item ID</TDGrey><TDWhite>{item.itemCode}</TDWhite></TR2>
            <TR2><TDGrey>Manufacturer Part #</TDGrey><TDWhite>{item.mfgPartNo}</TDWhite></TR2>
            <TR2><TDGrey>AHC Part #</TDGrey><TDWhite>{item.invMastUid}</TDWhite></TR2>
            <TR2><TDGrey>Customer Part #</TDGrey>    
              <TDWhite>
                <select value={selectedCustomerPartNumber} onChange={(e)=>selectCustomerPartNumber(e.target.value)} >
                  <option>Select a Part No.</option>
                  {CustomerPartOptions}
                </select>
              </TDWhite>        
            </TR2>
            <TR2><TDGrey>Unit Size</TDGrey><TDWhite>{item.unitSizeMultiple}</TDWhite></TR2>
          </TABLE>
          <hr/>
          <H4 id='feature'>Features</H4>
          {Features}
          <H4 id='techspec'>Tech Specifications</H4>
          {TechSpecs}
          {item.itemLink.length > 0 && <H4>Links</H4>}
          {Links}
          {item.itemAssociationInvMastU.length > 0 && <H4 id='accessory'>Accessory Items</H4>}
          <DivAccessoryItems>
            {AccessoryItems}
          </DivAccessoryItems>
        </DivDetails>
        <DivPurchaseInfo>
          <RowSpaced>
            <Row><Pprice>{_.isNil(unitPrice) ? '--' : `$${unitPrice.toFixed(2)}`}</Pprice><P> /each</P></Row>
            <RowEnd>
              <span>Qty:</span><InputQuantity value={quantity} onChange={(e) => handleSetQuantity(e.target.value)}/>
            </RowEnd>
          </RowSpaced>
          <hr/>
          {item.availability === 0 ? <Pbold>{item.availabilityMessage}</Pbold> : <Pbold>{`Availability: ${item.availability}`}</Pbold>}
          <Div>
            <hr/>
            <Context.Consumer>
              {({addItem}) => (
                <ButtonRed onClick={()=>{
                  addItem({
                    'frecno': itemId,
                    'quantity': parseInt(quantity, 10),
                    'itemNotes': '',
                    'itemUnitPriceOverride': null,
                    'customerPartNumber': selectedCustomerPartNumber
                  }), setShowAddedToCartModal(true), setQuantity(1)
                  }}>Add to Cart</ButtonRed>
              )}
            </Context.Consumer>
            {/* <ButtonBlack>Buy Now</ButtonBlack> */}
          </Div>
          {item.feature.length > 0 && <a href='#feature'>Features</a>}
          {item.techSpec.length > 0 && <a href='#techspec'>Tech Specs</a>}
          {item.itemAssociationInvMastU.length > 0 && <a href='#accessory'>Accessory</a>}
        </DivPurchaseInfo>
      </ItemDetailPageContainer>
    )
  }
}