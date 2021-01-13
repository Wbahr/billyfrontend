import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { useLazyQuery } from '@apollo/client'
import Loader from '../../_common/loader'
import Context from '../../../config/context'
import AirlineModal from '../../_common/modal'
import {GET_ITEM_PRICE} from "config/providerGQL";
import { GET_QUICK_LOOK_ITEM_DETAIL } from "config/gqlQueries/gqlItemQueries"
import { getLargeImagePath, getAvailabilityMessage } from "pageComponents/_common/helpers/generalHelperFunctions";
import DebounceInput from 'react-debounce-input'
import { handleSetQuantity, initializeQuantity } from 'pageComponents/_common/helpers/addToCartLogic'
import QuantityInput from 'pageComponents/_common/form/quantityInput'
import AirlineChip from 'pageComponents/_common/styledComponents/AirlineChip'

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

const QuantityHighlight = styled.span`
	display: inline-block;
	margin: 0;
	margin-right: 1rem;
	padding: 3px 0.5rem;
	border-radius: 5px;
	background-color: ${props => props.theme.backgrounds.blue.main};
	color: ${props => props.theme.backgrounds.blue.contrastText};
	font-size: 0.75rem;
`

const getItemPricePayload = invMastUid => ({
	variables: {
		items: [{
			invMastUid,
			quantity: 1
		}]
	}
})

export default function DetailsModal({hideDetailsModal, history, invMastUid }) {
	const [item, setItem] = useState(null)
	const [priceInfo, setPriceInfo] = useState(null);
	const {
		unitPrice, 
		unitOfMeasure, 
		isUnitConversion, 
		unitSize, 
		roundType} = priceInfo || {}
	const unitIncrement = isUnitConversion ? unitSize || 1 : 1

	const [quantity, setQuantity] = useState(1)
	const [customerPartNumber, setCustomerPartNumber] = useState(null)
	const [customerPartNumbers, setCustomerPartNumbers] = useState([])
	const [itemAvailability, setItemAvailability] = useState(null)
	const context = useContext(Context)

	const [performItemDetailSearch] = useLazyQuery(GET_QUICK_LOOK_ITEM_DETAIL, {
		variables: { invMastUid },
		onCompleted: ({customerPartNumbers, itemDetails, itemAvailabilitySingular}) => {
			setCustomerPartNumbers(customerPartNumbers)
			setItem(itemDetails)
			setItemAvailability(itemAvailabilitySingular)
		}
	})

	const [performPriceLookup] = useLazyQuery(GET_ITEM_PRICE, {
		...getItemPricePayload(invMastUid),
		onCompleted: data => {
			if (data.getItemPrices[0]) {
				setPriceInfo(data.getItemPrices[0])
			}
		},
		fetchPolicy: 'no-cache'
	})

	const setQuantityHandler = (qty) => {
		setQuantity(qty)
	}

	function handleCloseModal() {
		setItem(null)
		setPriceInfo(null)
		setQuantity(1)
		hideDetailsModal()
	}
	
	const handleCustomerPartNumberChange = e => {
		setCustomerPartNumber(e.target.value)
	}
	
	const handleAddToCart = () => {
		context.addItem({
			frecno: invMastUid,
			quantity: parseInt(quantity),
			itemNotes: '',
			itemUnitPriceOverride: null,
			customerPartNumberId: customerPartNumber
		})
		handleCloseModal()
	}
	
	useEffect(() => {
		if (invMastUid) {
			performItemDetailSearch()
			performPriceLookup()
		} else {
			setItem(null)
		}
	}, [invMastUid])
	
	const imagePath = getLargeImagePath(item);
	const customerPartOptions = customerPartNumbers.map((part, key) => <option key={key} value={part.id}>{part.customerPartNumber}</option>)
	const mutatedItemId = item && item.itemCode.replace(/\s/g, '-')
	const maxWidth = item ? 800 : 300
	
	return (
		<AirlineModal open={invMastUid} onClose={handleCloseModal} contentStyle={{ maxWidth, borderRadius: 5 }}>
			{
				!item ? (
					<Div>
						<p>Getting your product details...</p>
						<Loader />
					</Div>
				) : (
					<DivContainer>
						<DivColRow>
							<DivCol1>
								<DivImg>
									<img src={imagePath} width="100%" alt={item.itemDesc}/>
									<ButtonBlack onClick={() => history.push(`/product/${mutatedItemId}/${invMastUid}`)}>View More Details</ButtonBlack>
								</DivImg>
							</DivCol1>
							
							<DivCol2>
								<PpartTitle>
									{ unitIncrement > 1 && <AirlineChip>X {unitIncrement }</AirlineChip> }
									<span>{item.itemDesc}</span>
								</PpartTitle>
								<p>{item.extendedDesc}</p>
								
								<DivRow>
									<DivRow>
										<p>{!unitPrice ? '--' : `$${unitPrice.toFixed(2)}`}</p>
										<p> /{unitOfMeasure}</p>
									</DivRow>
									
									<DivRow>
										<span>Qty:</span>
										<QuantityInput
											quantity={quantity}
											isUnitConversion={isUnitConversion}
											unitSize={unitSize}
											unitOfMeasure={unitOfMeasure}
											roundType={roundType}
											handleUpdate={setQuantityHandler}
											min='0'
										/>										
										<ButtonRed onClick={handleAddToCart}>Add to Cart</ButtonRed>
									</DivRow>
								</DivRow>
								
								<DivRow>
									<p>Availability: {itemAvailability?.availability}</p>
									<p>{getAvailabilityMessage(quantity, itemAvailability?.availability, itemAvailability?.leadTimeDays)}</p>
								</DivRow>
								
								<TABLE>
									<tbody>
										<TR2>
											<TDGrey>Manufacturer</TDGrey>
											<TDWhite>
												<IMG width='100px' src={item.brand.logoLink} />
											</TDWhite>
										</TR2>
										
										<TR2>
											<TDGrey>Item ID</TDGrey>
											<TDWhite>{item.itemCode}</TDWhite>
										</TR2>
										
										<TR2>
											<TDGrey>Manufacturer Part #</TDGrey>
											<TDWhite>{item.mfgPartNo}</TDWhite>
										</TR2>
										
										<TR2>
											<TDGrey>AHC Part #</TDGrey>
											<TDWhite>{item.invMastUid}</TDWhite>
										</TR2>
										{
											!!customerPartOptions.length && (
												<TR2>
													<TDGrey>Customer Part #</TDGrey>
													<TDWhite>
														<select value={customerPartNumber || ''} onChange={handleCustomerPartNumberChange} >
															<option>Select a Part No.</option>
															{customerPartOptions}
														</select>
													</TDWhite>
												</TR2>
											)
										}
										<TR2>
											<TDGrey>Unit Size</TDGrey>
											<TDWhite>{item.unitSizeMultiple}</TDWhite>
										</TR2>
									</tbody>
								</TABLE>
							</DivCol2>
						</DivColRow>
					</DivContainer>
				)
			}
		</AirlineModal>
	)
}