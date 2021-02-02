import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import Context from '../../../setup/context'
import { getLargeImagePath } from '../../_common/helpers/generalHelperFunctions'
import { Image as SkeletonImage, Detail1 as SkeletonDetail } from './skeletonItem'
import QuantityInput from 'pageComponents/_common/form/quantityInput'
import AirlineChip from 'pageComponents/_common/styledComponents/AirlineChip'

const DivItemResultContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 320px;
	min-height: 350px;
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

const Option = ({ partNumber, partId }) => <option key={partNumber} value={partId}>{partNumber}</option>

const getCustomerPartOptions = ({ customerPartNumbers=[] }) => customerPartNumbers.map((part, idx) => <Option key={idx} {...part}/>)

export default function ItemResult({ result, details, history, toggleDetailsModal, toggleLocationsModal, addedToCart }) {
    const { itemAvailabilities, itemPrices, addItem } = useContext(Context)
  
    const foundAvailability = itemAvailabilities.find(avail => avail.invMastUid === result.invMastUid)
    const { availability, leadTimeDays } = foundAvailability || {}
  
    const foundPrice = itemPrices.find(item => item.invMastUid === result.invMastUid)
    const {
        unitPrice,
        unitOfMeasure,
        unitSize,
        roundType } = foundPrice || {}
  
    const [quantity, setQuantity] = useState(1)
  
    const [customerPartNumber, setCustomerPartNumber] = useState(0)
    const [customerPartOptions, setCustomerPartOptions] = useState(getCustomerPartOptions(result))
  
    useEffect(() => {
        setCustomerPartOptions(getCustomerPartOptions(details))
        if (details.customerPartNumbers?.length === 1) {
            setCustomerPartNumber(details.customerPartNumbers[0].partId)
        }
    }, [details.customerPartNumbers])
  
    const setQuantityHandler = (qty) => {
        setQuantity(qty)
    }
  
    const handlePartClick = () => {
        if (customerPartNumber) {
            history.push(`/product/${details.itemCodeUrlSanitized}/${result.invMastUid}/${customerPartNumber}`)
        } else {
            history.push(`/product/${details.itemCodeUrlSanitized}/${result.invMastUid}`)
        }
    }
  
    const handleAddToCart = () => {
        addItem({
            frecno: result.invMastUid,
            quantity: parseInt(quantity),
            itemNotes: '',
            itemUnitPriceOverride: null,
            customerPartNumberId: customerPartNumber
        })
        addedToCart()
        setQuantity(1)
    }
  
    const handlePartNumberChange = ({ target }) => setCustomerPartNumber(target.value)
  
    const handleAvailabilityClick = () => toggleLocationsModal(result.invMastUid)
  
    const handleQuickLookClick = () => toggleDetailsModal(result.invMastUid, result.itemCode)
  
    return (
        <DivItemResultContainer>
            <DivPartDetailsRow>
                <DivPartImg onClick={handlePartClick} style={{ cursor: 'pointer' }}>
                    {!details.itemMedia ? (
                        <SkeletonImage/>
                    ) : (
                        <Img src={getLargeImagePath(details)}/>
                    )}
                </DivPartImg>
        
                <ButtonBlack onClick={handleQuickLookClick}>Quick Look</ButtonBlack>
        
                <DivPartDetails>
                    <PpartTitle onClick={handlePartClick}>{result.itemDescription}</PpartTitle>
                </DivPartDetails>
        
                <DivPartNumberRow>
                    <PpartAvailability>Item Id: {result.itemCode}</PpartAvailability>
                </DivPartNumberRow>
        
                <DivPartNumberRow>
                    <PpartAvailability>Airline #: AHC{result.invMastUid}</PpartAvailability>
                </DivPartNumberRow>
        
                {!!customerPartOptions.length && (
                    <DivPartNumberRow>
                        <PpartAvailability>
                            Customer Part #:
                            <select value={customerPartNumber} onChange={handlePartNumberChange}>
                                <option>Select a Part No.</option>
                                {customerPartOptions}
                            </select>
                        </PpartAvailability>
                    </DivPartNumberRow>
                )}
        
                <DivPartNumberRow>
                    <PpartAvailability>Availability:</PpartAvailability>
          
                    {!unitPrice || !availability ? (
                        <PBlue>{leadTimeDays ? `Lead Time: ${leadTimeDays} days` : 'Call for availability'}</PBlue>
                    )	: !foundAvailability ? (
                        <SkeletonDetail style={{ margin: 'auto 0' }}/>
                    ) : (
                        <DivRow>
                            <PBlue onClick={handleAvailabilityClick}>
                                {availability} (Show Locations)
                            </PBlue>
                        </DivRow>
                    )}
                </DivPartNumberRow>
        
                <DivPartNumberRowSpread>
                    <Div>
                        <span>Quantity:</span>
                        <QuantityInput
                            quantity={quantity}
                            unitSize={unitSize}
                            unitOfMeasure={unitOfMeasure}
                            roundType={roundType}
                            handleUpdate={setQuantityHandler}
                            min='0'
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
                    ) : !foundPrice ? (
                        <Div>
                            <SkeletonDetail style={{ margin: 'auto 0 auto 75px', width: 50 }}/>
                        </Div>
                    ) : (
                        <ACall href="tel:+18009997378">Call for Price</ACall>
                    )}
                </DivPartNumberRowSpread>
        
                <DivSpace>
                    {!!unitPrice && <ButtonRed onClick={handleAddToCart}>Add to Cart</ButtonRed>}
                </DivSpace>
            </DivPartDetailsRow>
        </DivItemResultContainer>
    )
}