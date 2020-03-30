import React, {useState, useRef} from 'react'
import _ from 'lodash'
import Popup from 'reactjs-popup'
import styled from 'styled-components'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Loader from '../../_common/loader'
import Context from '../../../config/context'

const Div = styled.div`
  display: flex;
  flex-direction: column;
  p {
    text-align: center;
  }
`

const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px;
`

const DivCol1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const DivCol2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
`

const DivImg = styled.div`
  max-width: 150px;
  max-height: 150px;
`

const TABLE = styled.table`
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

const PpartTitle = styled.p`
  margin: 0 0 8px 0;
  font-weight: 700;
  font-size: 18px;
  color: #000000 !important;
`

const DivRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
`

const DivColRow = styled.div`
  display: flex;
  justify-content: space-around;
`

const ButtonRed = styled.button`
  background-color: #b51029;
  color: white;
  font-weight: 600;
  border: 0;
  padding: 4px 8px;
  box-shadow: 1px 1px 2px #000;
  margin: 4px auto 4px 16px;
  &:hover{
    background-color: rgb(219, 22, 51);
  }
  &:active{
    background-color: #b51029;
    box-shadow: 0px 0px 1px #000;
  }
`

const InputQuantity = styled.input`
  width: 50px;
  height: 25px;
  margin-left: 4px;
`

const ButtonBlack = styled.button`
  width: max-content;
  background-color: white;
  color: #328EFC;
  font-weight: 600;
  font-size: 12px;
  border: 0;
  margin: 4px auto 0 auto;
`

const GET_ITEM_DETAILS = gql`
query ItemById($invMastUid: Int){
  customerPartNumbers(frecno: $invMastUid){
    customerPartNumber
    id
  }
  itemDetails(invMastUid: $invMastUid) {
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
          sequence
          type
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

export default function DetailsModal({open, hideDetailsModal, invMastUid, history, itemCode}) {
  const [item, setItem] = useState(null)
  const [unitPrice, setUnitPrice] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [customerPartNumber, setCustomerPartNumber] = useState(null)
  const [customerPartNumbers, setCustomerPartNumbers] = useState([])
  const searchSent = useRef(false)

  const [performItemDetailSearch] = useLazyQuery(GET_ITEM_DETAILS, {
    variables: { invMastUid },
    onCompleted: data => {
      setCustomerPartNumbers(data.customerPartNumbers)
      setItem(data.itemDetails)
    }
  })

  const [performPriceLookup] = useLazyQuery(GET_ITEM_PRICE, {
    variables: {	
      "item": {
        "itemsAndQuantities": [
          {
            "itemCode": itemCode,
            "quantity": 1
          }
        ]
      }
    },
    onCompleted: data => {
      if (!_.isNil(data.getItemPrices[0])) {
        setUnitPrice(data.getItemPrices[0].totalPrice)
      }
    }
  })

  function handleSetQuantity(quantity){
    if (/^\+?(0|[1-9]\d*)$/.test(quantity) || quantity === ''){
      setQuantity(quantity)
    }
  }

  function handleCloseModal(){
    setItem(null)
    setUnitPrice(null)
    setQuantity(1)
    hideDetailsModal()
  }

  function mutateItemId(itemId){
    let mutatedItemId = itemId.replace(/\s/g, '-')
    return(mutatedItemId)
  }

  if(open && !_.isNil(invMastUid) && !_.isNil(itemCode) && !searchSent.current){
    searchSent.current = true
    performItemDetailSearch()
    performPriceLookup()
  } else if (!open && searchSent.current || !open && !_.isNil(item)) {
    searchSent.current = false
    setItem(null)
  }

  let PopupContent
  if(_.isNil(item)){
    PopupContent =(
      <Div>
        <p>Getting your product details...</p>      
        <Loader/>
      </Div>
    )
  } else if (open) {
    let imagePath
    for (let i=0; i < item.image.length; i++){
      let currentImage = item.image[i]
      if(currentImage.type === 1){
        imagePath = currentImage.path
      }
    }
    if (_.isNil(imagePath)){
      imagePath = 'https://www.airlinehyd.com/images/no-image.jpg'
    } else {
      let imagePathArray = imagePath.split("\\")
      let imageFile = imagePathArray[imagePathArray.length - 1]
      imageFile = imageFile.slice(0, -5) + 'l.jpg'
      imagePath = 'https://www.airlinehyd.com/images/items/' + imageFile
    }
    const mutatedItemId = mutateItemId(item.itemCode) 

    let CustomerPartOptions 
    if (!_.isNil(result.customerPartNumbers)){
      CustomerPartOptions = _.map(result.customerPartNumbers, elem => {
        return(<option value={elem.id}>{elem.customerPartNumber}</option>)
      })
    }

    PopupContent =(
      <DivContainer>
        <DivColRow>
          <DivCol1>
            <DivImg>
              <img src={imagePath}/>
              <ButtonBlack onClick={()=>{history.push(`/product/${mutatedItemId}/${invMastUid}`)}}>View More Details</ButtonBlack>
            </DivImg>
          </DivCol1>
          <DivCol2>
            <PpartTitle>{item.itemDesc}</PpartTitle>
            <p>{item.extendedDesc}</p>
            <DivRow>
              <DivRow>
                <p>{_.isNil(unitPrice) ? '--' : `$${unitPrice.toFixed(2)}`}</p><p> /each</p>
              </DivRow>
              <DivRow>
                <span>Qty:</span><InputQuantity value={quantity} onChange={(e) => handleSetQuantity(e.target.value)}/>
                <Context.Consumer>
                  {({addItem}) => (
                    <ButtonRed onClick={()=>{
                      addItem({
                        'frecno': invMastUid,
                        'quantity': parseInt(quantity, 10),
                        'itemNotes': '',
                        'itemUnitPriceOverride': null,
                        'customerPartNumber': customerPartNumber
                      }), handleCloseModal()
                      }}>Add to Cart</ButtonRed>
                  )}
                </Context.Consumer>
              </DivRow>
            </DivRow>
            <DivRow>
              <p>Availability: {item.availability}</p>
              <p>{item.availabilityMessage}</p>
            </DivRow>
            <TABLE>
              <tbody>
                <TR2><TDGrey>Manufacturer</TDGrey><TDWhite><IMG width='100px' src='https://www.airlinehyd.com/customer/aihyco/images/manufacturer_logos/Phoenix_Contact2.jpg'/></TDWhite></TR2>
                <TR2><TDGrey>Item ID</TDGrey><TDWhite>{item.itemCode}</TDWhite></TR2>
                <TR2><TDGrey>Manufacturer Part #</TDGrey><TDWhite>{item.mfgPartNo}</TDWhite></TR2>
                <TR2><TDGrey>AHC Part #</TDGrey><TDWhite>{item.invMastUid}</TDWhite></TR2>
                <TR2><TDGrey>Customer Part #</TDGrey>
                  <TDWhite>
                  <select value={customerPartNumber} onChange={(e)=>setCustomerPartNumber(e.target.value)} >
                    <option>Select a Part No.</option>
                    {CustomerPartOptions}
                  </select>
                  </TDWhite>
                </TR2>
                <TR2><TDGrey>Unit Size</TDGrey><TDWhite>{item.unitSizeMultiple}</TDWhite></TR2>
              </tbody>
            </TABLE>
          </DivCol2>
        </DivColRow>
      </DivContainer>
    )
  }
    return(
      <Popup open={open} onClose={()=>{handleCloseModal()}} closeOnDocumentClick  contentStyle={_.isNil(item) ? {'max-width': '300px', 'border-radius': '5px'} : {'max-width': '800px', 'border-radius': '5px'}}>
        {PopupContent}
      </Popup>
    )
}