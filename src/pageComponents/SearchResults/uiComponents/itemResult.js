import React, { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

const DivItemResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 320px;
  height: 415px;
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
  font-weight: bold;
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
  background-color: white;
`

const DivPartDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px 8px;
  height: 134px;
  overflow: scroll;
`

const PpartTitle = styled.p`
  margin: 0;
  font-weight: 700;
  font-size: 15px;
  color: #000000 !important;
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
  margin: 4px 0;
  box-shadow: 1px 1px 2px #000;
  &:hover{
    background-color: rgb(219, 22, 51);
  }
  &:active{
    background-color: #b51029;
    box-shadow: 2px 2px 2px #000;
  }
`

const Div = styled.div`
  display: flex;
  align-items: center;
`

const InputQuantity = styled.input`
  width: 50px;
  height: 25px;
  margin-left: 4px;
`

const Pprice = styled.p`
  color: #328EFC
  font-size: 18px;
  font-weight: 700;
  padding: 0 4px;
  margin: 0;
`

const ACall = styled.a`
  color: #328EFC
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
`

export default function ItemResult({result}) {
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
          <Img src={imagePath} height='150px'/>
        </DivPartImg>
        <DivPartDetails>
          <PpartTitle><Link to={("/product/" + result.frecno)}>{result.item_desc}</Link></PpartTitle>
          <PpartDesc>{result.extended_desc}</PpartDesc>
        </DivPartDetails>
        <DivPartNumberRow>
          <PpartAvailability>Airline #: AHC{result.frecno}</PpartAvailability>
        </DivPartNumberRow>
        <DivPartNumberRow><PpartAvailability>Availability:</PpartAvailability>
          {result.availability !== 0 ? <PBlue>{result.availability} -- Locations </PBlue> : <PBlue>{result.availability_message}</PBlue>}
        </DivPartNumberRow>
        <DivPartNumberRowSpread>
          <Div>Quantity:<InputQuantity value={quantity} onChange={(e) => handleSetQuantity(e.target.value)}/></Div>
          {(!_.isNil(result.anon_price) && result.anon_price !== 0) ? <Div><Pprice>${result.anon_price.toFixed(2)}</Pprice><P>/EA</P></Div> : <ACall href="tel:+18009997378">Call for Price</ACall>}
        </DivPartNumberRowSpread>
        <Div>
          <ButtonRed onClick={handleAddToCart}>Add to Cart</ButtonRed>
        </Div>
      </DivPartDetailsRow>
    </DivItemResultContainer>
  )
}