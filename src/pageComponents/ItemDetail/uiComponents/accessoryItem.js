import React, { useState } from 'react'
import _ from 'lodash'
import Loader from '../../_common/loader'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import { getThumbnailImagePath } from 'pageComponents/_common/helpers/generalHelperFunctions'

const GET_ITEM_BY_ID = gql`
    query ItemById($associatedItemId: Int){
        itemDetails(invMastUid: $associatedItemId) {
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
            image {
              path
              itemMediaType
              mediaType
              sequence
            }
        }
    }
`

const DivItemResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 320px;
  height: 350px;
  margin: 0 8px 20px 8px;
  padding: 8px 0;
  border-bottom: 1px grey solid;
`

const DivPartNumberRow = styled.div`
  width: 100%;
  display: flex;
  color: #000;
  padding: 0 5px;
  font-size: 12px;
  font-family: Arial, sans-serif;
`

const DivPartNumberRowSpread = styled(DivPartNumberRow)`
  justify-content: space-between;
`

const P = styled.p`
  margin: 0;
  font-weight: 500;
  margin: 0 4px;
`

const DivPartDetailsRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 99;
  background-color: #fff;
  width: 100%;
`

const DivPartImg = styled.div`
  display: flex;
  width: 150px;
  height: 150px;
  background-color: white;
`

const DivPartDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px;
`

const PpartTitle = styled.p`
  margin: 0;
  font-weight: 700;
  font-size: 15px;
  color: #000000 !important;
  height: 45px;
  overflow: hidden;
  &:hover{
    cursor: pointer;
    color: #328EFC;
  }
`

const PpartAvailability = styled.p`
  margin: 0;
  font-size: 13px;
`

const ButtonRed = styled.button`
  background-color: #b51029;
  color: white;
  font-weight: 600;
  border: 0;
  padding: 4px 8px;
  box-shadow: 1px 1px 2px #000;
  margin: 4px auto;
  &:hover{
    background-color: rgb(219, 22, 51);
  }
  &:active{
    background-color: #b51029;
    box-shadow: 0px 0px 1px #000;
  }
`

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const DivSpace = styled(Div)`
  width: 100%;
  justify-content: space-between;
  align-items: flex-end;
  flex-grow: 99;
`

const InputQuantity = styled.input`
  width: 50px;
  height: 25px;
  margin-left: 4px;
`

const Pprice = styled.p`
  color: #328EFC;
  font-size: 18px;
  font-weight: 700;
  padding: 0 4px;
  margin: 0;
`

const ACall = styled.a`
  color: #328EFC;
  font-weight: 700;
  padding: 0 4px;
`

const PBlue = styled.p`
  cursor: pointer;
  color: #328EFC;
  margin: 0;
  font-size: 13px;
  padding: 0 4px;
`

const Img = styled.img`
  margin: auto;
  max-height: 100%;
  max-width: 100%;
`

export default function AccessoryItem({ item, history }) {
	const [quantity, setQuantity] = useState(1)

	function handleSetQuantity(quantity){
		if (/^\+?(0|[1-9]\d*)$/.test(quantity) || quantity === ''){
			setQuantity(quantity)
		}
	}

	function handleAddToCart() {
		if (quantity.length > 0){
			// addToCart(quantity, frecno)
		}
  }
    
  let imagePath = getThumbnailImagePath(item);

	return (
    <DivItemResultContainer>
      <DivPartDetailsRow>
        <DivPartImg>
          <Img 
            src={imagePath} 
            alt={item?.details?.itemCode}
            onClick={()=>{history.push(`/product/${item?.details?.itemCodeUrlSanitized}/${item?.associatedInvMastUid}`)}}/>
        </DivPartImg>
        <DivPartDetails>
          <PpartTitle onClick={()=>{history.push(`/product/${item?.details?.itemCodeUrlSanitized}/${item?.associatedInvMastUid}`)}}>{item?.details?.itemCode}</PpartTitle>
        </DivPartDetails>
        <DivPartNumberRow>
          <PpartAvailability>Airline #: AHC{item?.associatedInvMastUid}</PpartAvailability>
        </DivPartNumberRow>
        <DivPartNumberRow><PpartAvailability>Availability:</PpartAvailability>
          {item?.availability 
              ? <PBlue>{item?.availability.availability}</PBlue> 
              : <PBlue>{item?.availability === 0 ? item?.availability.availabilityMessage : 'Call Airline for Price'}</PBlue>}
        </DivPartNumberRow>
        <DivPartNumberRowSpread>
          <Div>Quantity:<InputQuantity value={quantity} onChange={(e) => handleSetQuantity(e.target.value)}/></Div>
          {
            item?.unitPrice 
              ? <Div><Pprice>${item.unitPrice.toFixed(2)}</Pprice><P>/EA</P></Div> 
              : <ACall href="tel:+18009997378">Call for Price</ACall>
          }
        </DivPartNumberRowSpread>
        <DivSpace>
          <ButtonRed onClick={handleAddToCart}>Add to Cart</ButtonRed>
        </DivSpace>
      </DivPartDetailsRow>
    </DivItemResultContainer>
	)
}