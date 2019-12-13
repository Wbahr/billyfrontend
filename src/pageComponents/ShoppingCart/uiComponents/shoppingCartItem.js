import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import _ from 'lodash'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatCurrency } from '../../_common/helpers/generalHelperFunctions'

const DivContainer = styled.div`
  display: flex;
  border-top: 2px whitesmoke solid;
  border-bottom: 2px whitesmoke solid;
  padding: 8px 0;
  margin: 8px 0;
  height: 100px;
`

const DivCard = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

const DivItemContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const DivItemContent = styled.div`
  display: flex;
  width: 100%;
`

const DivRemove = styled.div`
  cursor: pointer;
  display: flex;
  width: auto;
  margin: auto 12px;
  align-items: center;
`

const DivMove = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  padding: 0 16px;
`

const DivTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  height: 100%;
  flex-grow: 99;
  p {
    font-size: 16px;
    margin: 0;
  }
`

const DivImg = styled.div`
  display: flex;
`

const Img = styled.img`
  margin-right: 4px;
`

const DivQty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    margin: 0;
  }
`

const DivTotalPrice = styled.div`
  display: flex;
  width: 150px;
  align-items: center;
  justify-items: flex-end;
  p {
    text-align: right;
    font-size: 18px;
    margin: 0 20px 0 auto;
  }
`

const Label = styled.label`
  margin: 0;
  font-size: 14px;
`

const Input = styled.input`
  width: 50px;
  height: 25px;
  margin-left: 4px;
`

const P2 = styled.p`
  color: grey;
  font-size: 12px !important;
`

const GET_ITEM_BY_ID = gql`
    query ItemById($itemId: ID){
        itemDetails(invMastUid: $itemId) {
            anonPrice
            invMastUid
            itemCode
            itemDesc
            listPrice
            mfgPartNo
            modelCode
            tariff
            unitSizeMultiple
            image {
              path
              sequence
              type
            }
        }
    }
`

export default function ShoppingCartItem({item}) {
  const [itemDetails, setItem] = useState(null)
  const itemId = parseInt(item.freqno,10)

  const { 
    loading, 
    error, 
    data 
  } = useQuery(GET_ITEM_BY_ID, {
    variables: { itemId },
    onCompleted: result => {
      if (!_.isNil(result.itemDetails)) {
        setItem(result.itemDetails)
      } else {
        setItem({})
      }
    }
  })

  let Content
  if(_.isNil(itemDetails)) {
    Content = (<p>{item.freqno}</p>)
  } else {
    let imagePath
    console.log('items details', itemDetails)
    let resultImage = _.get(itemDetails,`image[0].path`,null)
    if (_.isNil(resultImage)){
      imagePath = 'https://www.airlinehyd.com/images/no-image.jpg'
    } else {
      let imagePathArray = resultImage.split("\\")
      let imageFile = imagePathArray[imagePathArray.length - 1]
      imageFile = imageFile.slice(0, -5) + 't.jpg'
      imagePath = 'https://www.airlinehyd.com/images/items/' + imageFile
    }

    Content = (
      <DivCard>
        <DivMove>
          <FontAwesomeIcon icon="grip-lines" color="lightgrey"/>
        </DivMove>
        <DivImg>
          <Img height='80px'  src={imagePath} />
        </DivImg>
        <DivItemContentContainer>
          <DivItemContent>
            <DivTitle>
              <p>{itemDetails.itemDesc}</p>
              <P2>{itemDetails.itemCode} | AHC{itemDetails.invMastUid}</P2>
            </DivTitle>
            <DivQty>
              <span>
                <Label>Qty:</Label>
                <Input value={item.quantity} />
              </span>
              <p>{formatCurrency(itemDetails.anonPrice)}</p>
            </DivQty>
            <DivTotalPrice>
              <p>{formatCurrency(itemDetails.anonPrice * item.quantity)}</p>
            </DivTotalPrice>
            <DivRemove>
              <FontAwesomeIcon icon="times-circle" color="lightgrey"/>
            </DivRemove>
          </DivItemContent>
        </DivItemContentContainer>
      </DivCard>
    )
  }
  return(
    <DivContainer>
      {Content}
    </DivContainer>
  )
}