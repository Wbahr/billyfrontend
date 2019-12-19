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
  padding: 8px 16px;
  margin: 8px 0;
  height: 120px;
`

const DivRow = styled.div`
  display: flex;
  margin-top: 8px;
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

const DivQuantity = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const DivDivide = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  background-color: #328EFC;
  border-radius: 50px;
  height: 20px;
  width: 20px;
  opacity: 0.5;
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
  cursor: move;
  display: flex;
  height: 100%;
  align-items: center;
  padding: 0 12px;
`

const DivCol1 = styled.div`
  display: flex;
  width: 100px;
`

const DivCol2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 300px;
  height: 100%;
  margin-right: 50px;
  p {
    font-size: 16px;
    margin: 0;
  }
`

const DivCol3 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 99;
`

const Img = styled.img`
  margin: 0 4px;
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
    font-size: 20px;
    margin: 0 20px 0 auto;
    font-weight: 600;
  }
`

const Label = styled.label`
  margin: 0;
  font-size: 12px;
  font-style: italic;
`

const Peach = styled.p`
  margin: 0;
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

const CustomDatePicker = styled.button`
  display: flex;
  justify-content: center;
  width: 110px;
  background-color: white;
  border: 1px solid lightgrey;
  margin: 0 8px;
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

export default function ShoppingCartItem({item, index, showSplitLineModal}) {
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
    let resultImage = _.get(itemDetails,`image[0].path`,null)
    if (_.isNil(resultImage)){
      imagePath = 'https://www.airlinehyd.com/images/no-image.jpg'
    } else {
      let imagePathArray = resultImage.split("\\")
      let imageFile = imagePathArray[imagePathArray.length - 1]
      imageFile = imageFile.slice(0, -5) + 't.jpg'
      imagePath = 'https://www.airlinehyd.com/images/items/' + imageFile
    }

    const CustomDatePickerComponent = ({ value, onClick }) => (
      <CustomDatePicker onClick={onClick}>
        {value}
      </CustomDatePicker>
    )

    Content = (
      <DivCard>
        <DivMove>
          <FontAwesomeIcon icon="grip-lines" color="lightgrey"/>
        </DivMove>
        {/* <DivMove>
          <DivDivide onClick={()=>showSplitLineModal(index)}>
            <FontAwesomeIcon icon="divide" color="white"/>
          </DivDivide>
        </DivMove> */}
        <DivCol1>
          <Img height='80px'  src={imagePath} />
        </DivCol1>
        <DivCol2>
          <P1>{itemDetails.itemDesc}</P1>
          <P2>{itemDetails.itemCode} | AHC{itemDetails.invMastUid}</P2>
          <DivRow>
            {/* <DivItem>
              <Label>Requested Ship Date:</Label>
              <span>
                <FontAwesomeIcon icon="calendar" color="grey"/> 
                <Context.Consumer>
                  {({ updateItem, cart }) => (
                    <DatePicker
                      selected={new Date(cart[index].requestedShipDate)}
                      onChange={(selectedDate)=>updateItem(index, 'date', selectedDate)}
                      minDate={new Date()}
                      customInput={<CustomDatePickerComponent />}
                    />
                  )}
                </Context.Consumer>
              </span>
            </DivItem> */}
          </DivRow>
        </DivCol2>
        <DivCol3>
          <DivQuantity>
            <DivItem>
              <Label>Qty:</Label>
                  <Context.Consumer>
                    {({ updateItem, cart }) => (
                      <input
                        onChange={(e) => updateItem(index, 'quantity', e.target.value)} 
                        style={{'width': '50px'}}
                        value={cart[index].quantity}
                      />
                    )}
                  </Context.Consumer>
            </DivItem>
            <DivItem>
              <Peach>{formatCurrency(itemDetails.anonPrice)}/each</Peach>
            </DivItem>
            <DivItem>
              <DivTotalPrice>
                <p>{formatCurrency(itemDetails.anonPrice * item.quantity)}</p>
              </DivTotalPrice>
            </DivItem>
          </DivQuantity>
          <DivQuantity>
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
            </DivItem>
          </DivQuantity>
        </DivCol3>
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