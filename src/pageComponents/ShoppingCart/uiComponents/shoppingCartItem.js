import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import _ from 'lodash'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const DivContainer = styled.div`
  display: flex;
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
      if (result.itemDetails.length) {
        setItem(result.itemDetails[0])
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
    let resultImage = _.get(itemDetails,`image[0].path`,null)
    if (_.isNil(resultImage)){
      imagePath = 'https://www.airlinehyd.com/images/no-image.jpg'
    } else {
      let imagePathArray = resultImage.split("\\")
      let imageFile = imagePathArray[imagePathArray.length - 1]
      imageFile = imageFile.slice(0, -5) + 'o.jpg'
      imagePath = 'https://www.airlinehyd.com/images/items/' + imageFile
    }

    Content = (
      <div>
        <img src={imagePath} />
        <p>{itemDetails.itemDesc}</p>
        <p>{itemDetails.anonPrice}</p>
        <input value={item.quantity} />
      </div>
    )
  }
  return(
    <DivContainer>
      {Content}
    </DivContainer>
  )
}