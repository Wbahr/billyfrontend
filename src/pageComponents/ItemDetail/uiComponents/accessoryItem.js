import React, { useState, useContext } from 'react'
import Context from 'setup/context'
import styled from 'styled-components'
import { getThumbnailImagePath } from 'pageComponents/_common/helpers/generalHelperFunctions'
import LocationsModal from '../../_common/modals/LocationsModal'
import QuantityInput from 'pageComponents/_common/form/quantityInput'
import AirlineChip from 'pageComponents/_common/styledComponents/AirlineChip'
import { Detail1 as SkeletonDetail } from 'pageComponents/SearchResults/uiComponents/skeletonItem'

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

const Img = styled.img`
  margin: auto;
  max-height: 100%;
  max-width: 100%;
`

export default function AccessoryItem({ itemDetails, price, availability, setShowAddedToCartModal }) {
    const [quantity, setQuantity] = useState(1)

    const context = useContext(Context)

    const {
        unitPrice,
        unitOfMeasure,
        unitSize,
        roundType
    } = price || {}

    const setQuantityHandler = (qty) => {
        setQuantity(qty)
    }

    function handleAddToCart() {
        if (quantity > 0){
            context.addItem({
                frecno: itemDetails?.invMastUid,
                quantity: quantity,
                itemNotes: null,
                itemUnitPriceOverride: null,
                customerPartNumberId: null
            })
            setShowAddedToCartModal(true)
        }
    }

    if (!itemDetails) return <></>

    const imagePath = getThumbnailImagePath(itemDetails)

    const itemLink = `/product/${itemDetails?.itemCodeUrlSanitized}/${itemDetails?.invMastUid}`

    return (
        <DivItemResultContainer>
            <DivPartDetailsRow>
                <DivPartImg>
                    <a href={itemLink}>
                        <Img src={imagePath} alt={itemDetails.itemCode}/>
                    </a>
                </DivPartImg>

                <DivPartDetails>
                    <PpartTitle><a href={itemLink}>{itemDetails.itemDesc}</a></PpartTitle>
                </DivPartDetails>

                <DivPartNumberRow>
                    <PpartAvailability>Airline #: AHC{itemDetails?.invMastUid}</PpartAvailability>
                </DivPartNumberRow>

                <LocationsModal
                    invMastUid={itemDetails?.invMastUid}
                    availabilityInfo={availability}
                    unitPrice={price?.unitPrice}
                />

                <DivPartNumberRowSpread>
                    <Div>
                        Quantity:
                        <QuantityInput
                            quantity={quantity}
                            unitSize={unitSize}
                            unitOfMeasure={unitOfMeasure}
                            roundType={roundType}
                            handleUpdate={setQuantityHandler}
                            min='0'
                            debounce
                        />
                        {
                            (unitSize > 1) && (
                                <AirlineChip style={{ marginLeft: '0.5rem' }}>
                                    X {unitSize}
                                </AirlineChip>
                            )
                        }
                    </Div>

                    {unitPrice ? (
                        <Div>
                            <Pprice>${unitPrice.toFixed(2)}</Pprice>
                            <P>/{unitOfMeasure}</P>
                        </Div>
                    ) : !price ? (
                        <Div>
                            <SkeletonDetail style={{ margin: 'auto 0 auto 75px', width: 50 }}/>
                        </Div>
                    ) : (
                        <ACall href="tel:+18009997378">Call for Price</ACall>
                    )}
                </DivPartNumberRowSpread>

                <DivSpace>
                    { (context.userInfo?.isAirlineEmployee || !!price) && <ButtonRed onClick={handleAddToCart}>Add to Cart</ButtonRed> }
                </DivSpace>
            </DivPartDetailsRow>
        </DivItemResultContainer>
    )
}
