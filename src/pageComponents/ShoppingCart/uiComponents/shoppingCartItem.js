import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Context from '../../../config/context'
import DebounceInput from 'react-debounce-input'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import NumberFormat from 'react-number-format'
import { getThumbnailImagePath, getAvailabilityMessage } from 'pageComponents/_common/helpers/generalHelperFunctions'
import FactoryStockModal from "./factoryStockModal";
import EditPriceModal from "./editPriceModal";
import SplitLineModal from "./splitLineModal";
import CustomerPartModal from "./editCustomerPartModal";

const DivContainer = styled.div`
	display: flex;
	border-top: 2px whitesmoke solid;
	border-bottom: 2px whitesmoke solid;
	padding: 8px 16px;
	margin: 8px 0;
	min-height: 135px;
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
	max-width: 98% !important;
	max-height: 98% !important;
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

const EditPriceDiv = styled.div`
	display: flex;
`

const EditPriceIcon = styled.div`
	cursor: pointer;
	margin-left: 8px;
`

const P1 = styled.p`
	cursor: pointer;
	font-size: 16px;
	font-weight: 600;
`

const A1 = styled.a`
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

export default function ShoppingCartItem({cart, setCart, cartItem, setCartItem, setCartItemField, index, itemDetails,
 	priceInfo, availabilityInfo, customerPartNumbers, history}) {

	const [selectedCustomerPartNumber, setSelectedCustomerPartNumber] = useState(cartItem.customerPartNumberId || 0)
	const [editPriceModalData, setEditPriceModalData] = useState(null)
	const [showSplitLineModal, setShowSplitLineModal] = useState(false)
	const [factoryStockModalData, setFactoryStockModalData] = useState(false)
	const [showCustomerPartModal, setShowCustomerPartModal] = useState(false)
	const itemId = parseInt(cartItem.frecno,10)

	const {userInfo} = useContext(Context)

	function selectCustomerPartNumber(value){
		if (value === -1) {
			setSelectedCustomerPartNumber(0) // Reset Dropdown
			setCartItemField('customerPartNumberId', 0)
			setShowCustomerPartModal(true)
		} else {
			setSelectedCustomerPartNumber(value)
			setCartItemField('customerPartNumberId', Number(value))
		}
	}

	function clearCustomerPartNumber() {
		setSelectedCustomerPartNumber(0)
		setCartItemField('customerPartNumberId', 0)
	}

	const handleShowFactoryStockModal = () => {
		setFactoryStockModalData({
			name: itemDetails?.itemDesc,
			frecno: itemId
		})
	}
	
	const handleShowEditPriceModal = () => {
		setEditPriceModalData({
			originalItemPrice: priceInfo?.unitPrice,
			itemPrice: cartItem.itemUnitPriceOverride ? cartItem.itemUnitPriceOverride : priceInfo?.unitPrice,
			spaType: priceInfo?.spaType,
			airlineCost: cartItem.airlineCost, /*Airline cost only comes from the shopping cart, when authorized */
			priceReasonId: cartItem.priceReasonId,
			cartItem
		})
	}
	
	const handleQuantityChange = ({target: {value}}) => {
		if (/^\+?(0|[1-9]\d*)$/.test(value) || value === '') {
			setCartItem({...cartItem, quantity: value.length ? parseInt(value) : ''})
		}
	}
	
	const handleUpdateItemNotes = ({target: {value}}) => {
		setCartItem({...cartItem, itemNotes: value})
	}
	
	const handleRemoveItem = () => {
		setCartItem(null)
	}

	return <DivContainer>
		{
			!itemDetails
				? <p>{cartItem.frecno}</p>
				: <DivCard>
					<DivMove>
						<FontAwesomeIcon icon="grip-lines" color="lightgrey"/>
					</DivMove>
					<DivCol1>
						<Img src={getThumbnailImagePath(itemDetails)} />
					</DivCol1>
					<DivCol2>
						<A1 onClick={()=>{history.push(`/product/${itemDetails.itemCode}/${itemDetails.invMastUid}`)}}>{itemDetails.itemDesc}</A1>
						<CopyToClipboard text={itemDetails.itemDesc}>
							<P2>Copy Item Desc</P2>
						</CopyToClipboard>
						<TextRow>
							<CopyToClipboard text={itemDetails.itemCode}>
								<P2>{itemDetails.itemCode}</P2>
							</CopyToClipboard> <P2>|</P2>
							<CopyToClipboard text={`AHC${itemDetails.invMastUid}`}>
								<P2>AHC{itemDetails.invMastUid}</P2>
							</CopyToClipboard>
						</TextRow>
						<TextRow>
							<select value={selectedCustomerPartNumber} onChange={e => selectCustomerPartNumber(e.target.value)} >
								<option value="0">Customer Part#</option>
								{
									customerPartNumbers?.map(elem => 
										<option key={elem.id} value={elem.id}>{elem.customerPartNumber}</option>
									)
								}
								<option value="-1">Create Part#</option>
							</select>
							{ selectedCustomerPartNumber != 0 &&
								<div style={{'marginLeft': '8px', 'cursor': 'pointer'}} onClick={clearCustomerPartNumber}>
									<FontAwesomeIcon icon="times" color="grey" />
								</div>
							}
						</TextRow>
						<DivRow>
							<P3>
								Availability: {availabilityInfo?.availability}
								{
									(cartItem.quantity > availabilityInfo?.availability) && 
										(' | ' + getAvailabilityMessage(cartItem.quantity, availabilityInfo?.availability, availabilityInfo?.leadTimeDays))
								}
							</P3>
						</DivRow>
						<DivRow>
							<DivSplitLine onClick={() => setShowSplitLineModal(true)}>Split Line</DivSplitLine>
							<DivSplitLine>|</DivSplitLine>
							<DivSplitLine onClick={handleShowFactoryStockModal}>Factory Stock</DivSplitLine>
							<DivSplitLine>|</DivSplitLine>
							<DivSplitLine onClick={() => setShowCustomerPartModal(true)}>Custom Part No.</DivSplitLine>
						</DivRow>
					</DivCol2>
					<DivCol3>
						<DivQuantity>
							<DivItem>
								<Label>Qty:</Label>
								<input
									onChange={handleQuantityChange}
									style={{width: 50}}
									value={cartItem.quantity}
									disabled={cartItem.quoteId}
								/>
							</DivItem>
							<DivItem>
								<DivRow>
									{userInfo?.isAirlineUser && (
										cartItem.itemUnitPriceOverride ? (
											<EditPriceDiv>
												<NumberFormat
													value={cartItem.itemUnitPriceOverride}
													displayType={'text'}
													thousandSeparator={true}
													prefix={'$'}
													decimalScale={2}
													fixedDecimalScale
												/>
												<EditPriceIcon onClick={handleShowEditPriceModal}>
													<FontAwesomeIcon icon="pencil-alt" color={cartItem.itemUnitPriceOverride ? '#328EFC' : 'grey'} />
												</EditPriceIcon>
											</EditPriceDiv>
										) : priceInfo?.unitPrice ? (
											<EditPriceDiv>
												<NumberFormat
													value={priceInfo?.unitPrice}
													displayType={'text'}
													thousandSeparator={true}
													prefix={'$'}
													decimalScale={2}
													fixedDecimalScale
												/>
												<EditPriceIcon onClick={handleShowEditPriceModal}>
													<FontAwesomeIcon icon="pencil-alt" color={cartItem.itemUnitPriceOverride ? '#328EFC' : 'grey'} />
												</EditPriceIcon>
											</EditPriceDiv>
										) : null
									)}
								</DivRow>
							</DivItem>
							<DivItem>
								<DivTotalPrice>
									<p>{!cartItem.itemUnitPriceOverride ? <NumberFormat value={(priceInfo?.unitPrice ? priceInfo.unitPrice : 0.0).toFixed(2) * cartItem.quantity} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale/> : <NumberFormat value={cartItem.itemUnitPriceOverride * cartItem.quantity} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale/>}</p>
								</DivTotalPrice>
							</DivItem>
						</DivQuantity>
						<DivQuantity>
							<DivItem>
								<Label>Item Notes:</Label>
								<DebounceInput
									placeholder='Type item notes here'
									minLength={0}
									debounceTimeout={300}
									onChange={handleUpdateItemNotes}
									style={{width: 300}}
									value={cartItem.itemNotes}
								/>
							</DivItem>
						</DivQuantity>
					</DivCol3>
					<DivRemove onClick={handleRemoveItem} alt='remove-item'>
						<FontAwesomeIcon icon="times-circle" color="lightgrey"/>
					</DivRemove>
				</DivCard>
		}
		
		<EditPriceModal
			open={!!editPriceModalData}
			hideEditPriceModal={() => setEditPriceModalData(null)}
			data={editPriceModalData}
			setCartItem={setCartItem}
		/>
		<SplitLineModal
			open={showSplitLineModal}
			hideSplitLineModal={() => setShowSplitLineModal(false)}
			{...{cart, setCart, index}}
		/>
		<FactoryStockModal
			open={!!factoryStockModalData}
			hideFactoryStockModal={() => setFactoryStockModalData(null)}
			product={factoryStockModalData}
		/>
		<CustomerPartModal
			open={showCustomerPartModal}
			hideCustomerPartModal={() => setShowCustomerPartModal(false)}
			invMastUid={cart?.[index].frecno}
			{...{index, cartItem, setCartItem, selectCustomerPartNumber}}
		/>
	</DivContainer>
}