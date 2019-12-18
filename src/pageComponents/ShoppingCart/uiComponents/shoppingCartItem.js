import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import _ from 'lodash'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatCurrency } from '../../_common/helpers/generalHelperFunctions'
import Context from '../../../config/context'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DebounceInput from 'react-debounce-input'

const DivContainer = styled.div`
  display: flex;
  border-top: 2px whitesmoke solid;
  border-bottom: 2px whitesmoke solid;
  padding: 8px 0;
  margin: 8px 0;
  height: 110px;
`

const DivRow = styled.div`
  display: flex;
  margin-bottom: 8px;
`

const DivItem = styled.div`
  display: flex;
  flex-direction: column;
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

const DivSplitLine = styled(DivRemove)`
  padding: 6px;
  background-color: #328EFC;
  border-radius: 50px;
  color: white;
  height: 20px;
  box-shadow: 1px 1px 2px #000;
  p {
    font-size: 12px;
    padding-left: 8px;
  }
`

const DivMove = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  padding: 0 16px;
`

const DivCol1 = styled.div`
  display: flex;
  width: 100px;
`

const DivCol2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  flex-grow: 99;
  p {
    font-size: 16px;
    margin: 0;
  }
`

const DivCol3 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
  font-size: 12px;
  font-style: italic;
`

const Input = styled.input`
  width: 50px;
  height: 25px;
  margin-left: 4px;
`

const P1 = styled.p`
  font-size: 16px;
  font-weight: 600;
`

const P2 = styled.p`
  color: grey;
  font-size: 12px !important;
`

const InputNotes = styled.input`
  width: 300px;
  font-size: 12px;
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

export default function ShoppingCartItem({item, index}) {
  const [itemDetails, setItem] = useState(null)
  const itemId = parseInt(item.frecno,10)
  const [date, setDate] = useState(Date.now())

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
        <DivCol1>
          <Img height='80px'  src={imagePath} />
        </DivCol1>
        <DivCol2>
          <P1>{itemDetails.itemDesc}</P1>
          <P2>{itemDetails.itemCode} | AHC{itemDetails.invMastUid}</P2>
          <DivRow>
            <DivItem>
              <Label>Requested Ship Date:</Label>
              <span>
                <FontAwesomeIcon icon="calendar" color="grey"/> 
                <Context.Consumer>
                  {({ updateItem, cart }) => (
                    <DatePicker
                      selected={new Date(cart[index].requestedShipDate)}
                      onChange={(selectedDate)=>updateItem(index, 'date', selectedDate)}
                      minDate={new Date()}
                    />
                  )}
                </Context.Consumer>
              </span>
            </DivItem>
            <DivSplitLine>
              <FontAwesomeIcon icon="divide" color="white"/>
              <p>Split Line</p>
            </DivSplitLine>
          </DivRow>
        </DivCol2>
        <DivCol3>
          <DivItem>
            <Label>Qty:</Label>
              <span>
                <Context.Consumer>
                  {({ updateItem, cart }) => (
                    <DebounceInput
                      minLength={1}
                      debounceTimeout={300}
                      onChange={(e) => updateItem(index, 'quantity', e.target.value)} 
                      style={{'width': '100px'}}
                      value={cart[index].quantity}
                    />
                  )}
                </Context.Consumer>
                {formatCurrency(itemDetails.anonPrice)}
              </span>
          </DivItem>
          <DivItem>
            <Label>Item Notes:</Label>
            <Context.Consumer>
                  {({ updateItem, cart }) => (
                    <DebounceInput
                      placeholder='Type item notes here'
                      minLength={0}
                      debounceTimeout={300}
                      onChange={(e) => updateItem(index, 'notes', e.target.value)} 
                      style={{'width': '300px'}}
                      value={cart[index].itemNotes}
                    />
                  )}
            </Context.Consumer>
            {/* <InputNotes placeholder='Type item notes here'></InputNotes> */}
          </DivItem>
        </DivCol3>
            <DivTotalPrice>
              <p>{formatCurrency(itemDetails.anonPrice * item.quantity)}</p>
            </DivTotalPrice>
            <Context.Consumer>
              {({ removeItem }) => (
                <>
                  <DivRemove onClick={()=>removeItem(index)} alt='remove-item'>
                    <FontAwesomeIcon icon="times-circle" color="lightgrey"/>
                  </DivRemove>
                </>
              )}
            </Context.Consumer>
      </DivCard>
    )
  }
  return(
    <DivContainer>
      {Content}
    </DivContainer>
  )
}