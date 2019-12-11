import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Context from '../../../config/context'

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

const DivRow = styled.div`
  display: flex;
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

const Pred = styled(P)`
  font-weight: 600;
  margin: 0;
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

const PpartDesc = styled.p`
  margin: 0 0 auto 0;
  font-size: 13px;
`

const PpartAvailability = styled.p`
  margin: 0;
  font-size: 13px;
`

const DivPartAction = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  padding: 4px 8px;
  align-items: flex-end;
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
const ButtonBlack = styled.button`
  width: max-content;
  background-color: white;
  color: #328EFC;
  font-weight: 600;
  font-size: 12px;
  border: 0;
  margin-top: 4px;
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

export default function ItemResult({result, history, toggleDetailsModal, toggleLocationsModal, addedToCart}) {
  const [quantity, setQuantity] = useState(1)
  const mutatedItemId = mutateItemId(result.item_id) 

  function mutateItemId(itemId){
    let mutatedItemId = itemId.replace(/\s/g, '-')
    return(mutatedItemId)
  }

  function handleSetQuantity(quantity){
    if (/^\+?(0|[1-9]\d*)$/.test(quantity) || quantity === ''){
      setQuantity(quantity)
    }
  }

  let imagePath
  if (_.isNil(result.thumbnail_image_path)){
    imagePath = 'https://www.airlinehyd.com/images/no-image.jpg'
  } else {
    let imagePathArray = result.thumbnail_image_path.split("\\")
    let imageFile = imagePathArray[imagePathArray.length - 1]
    imageFile = imageFile.slice(0, -5) + 'l.jpg'
    imagePath = 'https://www.airlinehyd.com/images/items/' + imageFile
  }

  return(
      <DivItemResultContainer>
        <DivPartDetailsRow>
          <DivPartImg>
            <Img src={imagePath}/>
          </DivPartImg>
          <ButtonBlack onClick={()=>{toggleDetailsModal(result.frecno)}}>Quick Look</ButtonBlack>
          <DivPartDetails>
            <PpartTitle onClick={()=>{history.push(`/product/${mutatedItemId}/${result.frecno}`)}}>{result.item_desc}</PpartTitle>
          </DivPartDetails>
          <DivPartNumberRow>
            <PpartAvailability>Airline #: AHC{result.frecno}</PpartAvailability>
          </DivPartNumberRow>
          <DivPartNumberRow><PpartAvailability>Availability:</PpartAvailability>
            {result.availability !== 0 ? 
              <DivRow>
                <PBlue>{result.availability}</PBlue>
                <PBlue onClick={()=>toggleLocationsModal(result.frecno)}>(Show Locations)</PBlue>
              </DivRow> 
            : 
              <PBlue>{result.availability_message}</PBlue>
            }
          </DivPartNumberRow>
          <DivPartNumberRowSpread>
            <Div>Quantity:<InputQuantity value={quantity} onChange={(e) => handleSetQuantity(e.target.value)}/></Div>
            {(!_.isNil(result.anon_price) && result.anon_price !== 0) ? <Div><Pprice>${result.anon_price.toFixed(2)}</Pprice><P>/EA</P></Div> : <ACall href="tel:+18009997378">Call for Price</ACall>}
          </DivPartNumberRowSpread>
          <DivSpace>
            <Context.Consumer>
              {({addItem}) => (
                <ButtonRed onClick={()=>{
                  addItem({
                    'freqno': result.frecno,
                    'quantity': parseInt(quantity, 10),
                    'itemNotes': '',
                    'requestedShipDate': null,
                    'price': result.anon_price
                  }), addedToCart(), setQuantity(1)
                  }}>Add to Cart</ButtonRed>
              )}
            </Context.Consumer>
          </DivSpace>
        </DivPartDetailsRow>
      </DivItemResultContainer>
  )
}