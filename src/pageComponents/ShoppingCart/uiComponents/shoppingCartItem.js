import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import _ from 'lodash'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatCurrency } from '../../_common/helpers/generalHelperFunctions'
import Context from '../../../config/context'
import DebounceInput from 'react-debounce-input'
import {CopyToClipboard} from 'react-copy-to-clipboard'

const DivContainer = styled.div`
  display: flex;
  border-top: 2px whitesmoke solid;
  border-bottom: 2px whitesmoke solid;
  padding: 8px 16px;
  margin: 8px 0;
  height: 135px;
  background-color: white;
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
  padding: 0 3px;
  // border: 1px solid #328EFC;
  margin: 0;
  border-radius: 50px;
  color: #328EFC;
  height: 20px;
  font-size: 12px;
  // padding-left: 8px;
  font-weight: 600;
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
  padding-right: 8px;
`

const DivEditPrice = styled.div`
  cursor: pointer;
`

const Input = styled.input`
  width: 50px;
  height: 25px;
  margin-left: 4px;
`

const P1 = styled.p`
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
`

const TextRow = styled.div`
  display: flex;
`

const P2 = styled.p`
  cursor: pointer;
  color: grey;
  font-size: 12px !important;
  padding: 0 2px;
`

const P3 = styled.p`
  color: black;
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
            availability
            availabilityMessage
            image {
              path
              sequence
              type
            }
        }
    }
`

export default function ShoppingCartItem({item, index, showSplitLineModal, showFactoryStockModal, showEditPriceModal, showCustomerPartModal}) {
  const [itemDetails, setItem] = useState(null)
  const itemId = parseInt(item.frecno,10)

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

    Content = (
      <DivCard>
        <DivMove>
          <FontAwesomeIcon icon="grip-lines" color="lightgrey"/>
        </DivMove>
        <DivCol1>
          <Img max-height='100%' max-width='100%' src={imagePath} />
        </DivCol1>
        <DivCol2>
          <CopyToClipboard text={itemDetails.itemDesc}>
            <P1>{itemDetails.itemDesc}</P1>
          </CopyToClipboard>
          <TextRow>
            <CopyToClipboard text={itemDetails.itemCode}>
              <P2>{itemDetails.itemCode}</P2>
            </CopyToClipboard> <P2>|</P2>
            <CopyToClipboard text={`AHC${itemDetails.invMastUid}`}>
              <P2>AHC{itemDetails.invMastUid}</P2>
            </CopyToClipboard>
          </TextRow>
          <DivRow>
            <Context.Consumer>
              {({ updateItem, cart }) => (
                <P3>Availability: {itemDetails.availability} {(cart[index].quantity > itemDetails.availability)&& '| '  + itemDetails.availabilityMessage }</P3>
              )}
            </Context.Consumer>
          </DivRow>
          <DivRow>
            <DivSplitLine onClick={()=>showSplitLineModal(index)}>Split Line</DivSplitLine>
            <DivSplitLine>|</DivSplitLine>
            <DivSplitLine onClick={()=>showFactoryStockModal(index)}>Factory Stock</DivSplitLine>
            <DivSplitLine>|</DivSplitLine>
            <DivSplitLine onClick={()=>showCustomerPartModal(index)}>Custom Part No.</DivSplitLine>
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
              <DivRow>
                <Context.Consumer>
                  {({ cart }) => (
                    <>
                      <Peach>{_.isNil(cart[index].itemUnitPriceOverride) ? formatCurrency(itemDetails.listPrice) : formatCurrency(cart[index].itemUnitPriceOverride)}/each</Peach>
                      <DivEditPrice onClick={()=>showEditPriceModal(index)}><FontAwesomeIcon icon="pencil-alt" color={!_.isNil(cart[index].itemUnitPriceOverride) ? "#328EFC" : "grey"} /></DivEditPrice>
                    </>
                  )}
                </Context.Consumer>
              </DivRow>
            </DivItem>
            <DivItem>
              <Context.Consumer>
                {({ cart }) => (
                  <DivTotalPrice>
                    <p>{_.isNil(cart[index].itemUnitPriceOverride) ? formatCurrency(_.get(itemDetails,`listPrice`,'0').toFixed(2) * item.quantity) : formatCurrency(cart[index].itemUnitPriceOverride * item.quantity)}</p>
                  </DivTotalPrice>
                )}
              </Context.Consumer>
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