import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import { useLazyQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Context from '../../../config/context'
import DebounceInput from 'react-debounce-input'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import NumberFormat from 'react-number-format'
import { getThumbnailImagePath } from 'pageComponents/_common/helpers/generalHelperFunctions'

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

const Peach = styled.p`
	margin: 0;
	padding-right: 8px;
`

const DivEditPrice = styled.div`
	cursor: pointer;
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

export default function ShoppingCartItem({cartItem, itemDetails, priceInfo, availabilityInfo, customerPartNumbers, index, showSplitLineModal, showFactoryStockModal, showEditPriceModal, showCustomerPartModal, handleSetModalData, history}) {

	const [selectedCustomerPartNumber, setSelectedCustomerPartNumber] = useState(cartItem.customerPartNumberId || 0)
	const itemId = parseInt(cartItem.frecno,10)

	const context = useContext(Context)

	function selectCustomerPartNumber(value){
		if (value === -1) {
			setSelectedCustomerPartNumber(0) // Reset Dropdown
			context.updateItem(index, 'customerPartNumberId', 0)
			showCustomerPartModal(index)
		} else if (value === 0) {
			setSelectedCustomerPartNumber(value)
			context.updateItem(index, 'customerPartNumberId', 0)
		} else {
			
			setSelectedCustomerPartNumber(value)
			context.updateItem(index, 'customerPartNumberId', Number(value))
		}
	}

	function clearCustomerPartNumber(){
		selectCustomerPartNumber(0)
	}

	function handleShowModal(type){
		switch(type){
		case 'split-line':
			handleSetModalData({
				modalType: type
			})
			showSplitLineModal(index)
			break
		case 'factory-stock':
			handleSetModalData({
				modalType: type,
				name: itemDetails?.itemDesc,
				frecno: itemId
			})
			showFactoryStockModal(index)
			break
		case 'edit-price':
            handleSetModalData({
                modalType: type,
                originalItemPrice: priceInfo?.unitPrice,
                itemPrice: cartItem.itemUnitPriceOverride ? cartItem.itemUnitPriceOverride : priceInfo?.unitPrice,
                airlineCost: cartItem.airlineCost /*Airline cost only comes from the shopping cart, when authorized */
            })
            showEditPriceModal(index)
			break
		case 'customer-part':
			showCustomerPartModal(index)
			break
		}
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
							<select value={selectedCustomerPartNumber} onChange={(e)=>selectCustomerPartNumber(e.target.value)} >
								<option value="0">Customer Part#</option>
								{
									customerPartNumbers?.map(elem => 
										<option key={elem.id} value={elem.id}>{elem.customerPartNumber}</option>
									)
								}
								<option value="-1">Create Part#</option>
							</select>
							{ selectedCustomerPartNumber != 0 &&
								<div style={{'marginLeft': '8px', 'cursor': 'pointer'}} onClick={()=>clearCustomerPartNumber()}>
									<FontAwesomeIcon icon="times" color="grey" />
								</div>
							}
						</TextRow>
						<DivRow>
							<P3>
								Availability: {availabilityInfo?.availability}
								{
									cartItem.quantity > availabilityInfo?.availability && (
										availabilityInfo?.leadTimeDays 
											? ` | Lead time ${availabilityInfo?.leadTimeDays} days`
											: ' | Call Airline Hydraulics Co. for lead time'
									)
								}
							</P3>
						</DivRow>
						<DivRow>
							<DivSplitLine onClick={()=>handleShowModal('split-line')}>Split Line</DivSplitLine>
							<DivSplitLine>|</DivSplitLine>
							<DivSplitLine onClick={()=>handleShowModal('factory-stock')}>Factory Stock</DivSplitLine>
							<DivSplitLine>|</DivSplitLine>
							<DivSplitLine onClick={()=>handleShowModal('customer-part')}>Custom Part No.</DivSplitLine>
						</DivRow>
					</DivCol2>
					<DivCol3>
						<DivQuantity>
							<DivItem>
								<Label>Qty:</Label>
								<input
									onChange={(e) => context.updateItem(index, 'quantity', e.target.value)} 
									style={{'width': '50px'}}
									value={cartItem.quantity}
									disabled={cartItem.quoteId}
								/>
							</DivItem>
							<DivItem>
								<DivRow>
									{context.userInfo?.isAirlineUser &&
										<>
											<Peach>{!cartItem.itemUnitPriceOverride ? <NumberFormat value={priceInfo?.unitPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale /> : <NumberFormat value={cartItem.itemUnitPriceOverride} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale/>}</Peach>
											<DivEditPrice onClick={()=>handleShowModal('edit-price')}><FontAwesomeIcon icon="pencil-alt" color={cartItem.itemUnitPriceOverride ? '#328EFC' : 'grey'} /></DivEditPrice>
										</>
									}
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
									onChange={(e) => context.updateItem(index, 'notes', e.target.value)} 
									style={{'width': '300px'}}
									value={cartItem.itemNotes}
								/>
							</DivItem>
						</DivQuantity>
					</DivCol3>
					<DivRemove onClick={()=> context.removeItem(index)} alt='remove-item'>
						<FontAwesomeIcon icon="times-circle" color="lightgrey"/>
					</DivRemove>
				</DivCard>
		}
	</DivContainer>
}