import React, { useState } from 'react'
import styled from 'styled-components'

const DivItemResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 700px;
  height: 180px;
  margin-bottom: 20px;
`

const DivPartNumberRow = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  background-color: #404040;
  color: #fff;
  padding: 5px;
  font-size: 12px;
  font-weight: bold;
  font-family: Arial, sans-serif;
`

const DivPartDetailsRow = styled.div`
  display: flex;
  background-color: #F3F3F3;
  height: 100%;
`

const DivPartImg = styled.div`
  display: flex;
  width: 150px;
  background-color: white;
  border-left: 1px #F3F3F3 solid;
  border-bottom: 1px #F3F3F3 solid;
`

const DivPartDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  padding: 4px 8px;
`

const PpartTitle = styled.p`
  margin: 0;
  font-weight: 700;
  font-size: 16px;
  &:hover{
    cursor: pointer;
    color: #328EFC;
  }
`

const PpartDesc = styled.p`
  margin: 0 0 auto 0;
  font-size: 14px;
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
  background-color: rgb(219, 22, 51);
  color: white;
  font-weight: 600;
  border: 0;
  padding: 4px 8px;
  box-shadow: 2px 2px 4px #000;
  &:hover{
    background-color: #b51029;
  }
  &:active{
    background-color: #b51029;
    box-shadow: 2px 2px 2px #000;
  }
`

const Div = styled.div`
  display: flex;
`

const InputQuantity = styled.input`
  width: 50px;
  height: 25px;
  margin-left: 4px;
`

const Pprice = styled.p`
  color: #328EFC
  font-weight: 700;
  padding: 0 4px;
`

const ACall = styled.a`
  color: #328EFC
  font-weight: 700;
  padding: 0 4px;
`

const PBlue = styled.p`
  cursor: pointer;
  color: #328EFC
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
    console.log(result.thumbnail_image_path)
    imagePath = 'https://www.airlinehyd.com/images/no-image.jpg'
  } else {
    let imagePathArray = result.thumbnail_image_path.split("\\")
    imagePath = 'https://www.airlinehyd.com/images/items/' + imagePathArray[imagePathArray.length - 1]
  }

  
  return(
    <DivItemResultContainer>
      <DivPartNumberRow><p>Item ID: {result.item_id}</p><p>Airline #: AHC{result.frecno}</p></DivPartNumberRow>
      <DivPartDetailsRow>
        <DivPartImg>
          <Img src={imagePath} width='65%'/>
        </DivPartImg>
        <DivPartDetails>
          <PpartTitle>{result.item_desc}</PpartTitle>
          <PpartDesc>{result.extended_desc}</PpartDesc>
          <Div><PpartAvailability>Availability:</PpartAvailability>
          {result.availability !== 0 ? <PBlue>{result.availability} -- Locations </PBlue> : <PBlue>{result.availability_message}</PBlue>}
          </Div>
        </DivPartDetails>
        <DivPartAction>
          <Div>
            {result.anon_price !== 0 ? <><Pprice>${result.anon_price.toFixed(2)}</Pprice><p>/EA</p></> : <ACall href="tel:+18009997378">Call for Price</ACall>}
          </Div>
          <Div><p>Quantity:</p><InputQuantity value={quantity} onChange={(e) => handleSetQuantity(e.target.value)}/></Div>
          <ButtonRed onClick={handleAddToCart}>Add to Cart</ButtonRed>
        </DivPartAction>
      </DivPartDetailsRow>
    </DivItemResultContainer>
  )
}