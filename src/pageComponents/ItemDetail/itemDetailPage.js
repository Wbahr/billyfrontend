import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useQuery, useLazyQuery } from '@apollo/client'
import Loader from '../_common/loader'
import AccessoryItem from './uiComponents/accessoryItem'
import AddedModal from '../SearchResults/uiComponents/addedModal'
import Context from '../../config/context'
import AddToShoppingListModal from "../_common/modals/AddToShoppingListModal";
import { GET_ITEM_PRICE, GET_ITEM_AVAILABILITY } from 'config/providerGQL'
import {getOriginalImagePath} from 'pageComponents/_common/helpers/generalHelperFunctions'
import { GET_ITEM_DETAIL_PAGE_ITEM_INFO, GET_ACCESSORY_ITEMS_INFO } from 'config/gqlQueries/gqlItemQueries'
import SplitLineModal from "../ShoppingCart/uiComponents/splitLineModal";
import FactoryStockModal from "../ShoppingCart/uiComponents/factoryStockModal";

const ItemDetailPageContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`

const DivPhoto = styled.div`
	min-width: 200px;
	max-width: 400px;
	max-height: 400px;
	margin: 0px 8px;
	text-align: center;
`

const Img = styled.img`
	max-height:100%; 
	max-width:100%;    
`

const DivDetails = styled.div`
	flex: 1;
	width: 500px;
	padding: 0 16px;
`

const DivPurchaseInfo = styled.div`
	position: -webkit-sticky;
	position: sticky;
	top: 125px;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	margin: 30px 8px 0 12px;
	padding: 8px 16px;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`

const DivLeftCol = styled.div`
	display: flex;
 	flex-direction: column;
 	max-width: 400px;
 	align-items: center;
 	padding: '0 16px';
 	margin-bottom: 16px;
`

const DivPurchaseInfoButtons = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
	margin: 16px 0;
`

const Row = styled.div`
	display: flex;
	align-items: flex-end;
`

const RowCentered = styled.div`
	display: flex;
	justify-content: center;
`

const P = styled.p`
	margin: 0;
`

const Pbold = styled(P)`
	cursor: pointer;
	color: #328EFC;
	font-weight: bold;
	line-height: 26px;
	margin-left: 10px;
	& :hover {
		text-decoration: underline;
	}
`

const H4 = styled.h5`
	margin: 12px 0 0 0;
	font-weight: 600;
`

const DivSection = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 24px;
`

const DivTitle = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	margin: 16px;
`

const DivAccessoryItems = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
`

const H2ItemTitle = styled.h2`
	font-size: 25px;
	font-weight: 600;
`

const PItemExtendedDescription = styled.p`
	font-size: 16px;
`

const ButtonRed = styled.button`
	background-color: #b51029;
	width: 70%;
	color: white;
	font-weight: 600;
	border: 0;
	box-shadow: 1px 1px 2px #000;
	margin: 4px auto;
	padding: 4px 0;
	&:hover{
		background-color: rgb(219, 22, 51);
	}
	&:active{
		background-color: #b51029;
		box-shadow: 0px 0px 1px #000;
	}
`

const Table = styled.table`
	margin: 0 16px;
	table-layout: fixed;
	width: 100%;
`

const TR = styled.tr`
	border-bottom: 1px whitesmoke solid;
`

const TD = styled.td`
	word-wrap:break-word;
	padding-right: 8px;
`

const Pprice = styled.p`
	color: #328EFC;
	font-size: 18px;
	font-weight: 700;
	padding-right: 4px;
	margin: 0;
`

const InputQuantity = styled.input`
	width: 50px;
	height: 25px;
	margin-left: 4px;
`

const TABLE = styled.table`
	margin-top: 20px;
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

export default function ItemDetailPage({ history }) {
	const context = useContext(Context)
	const { itemId, customerPartNumber } = useParams()
	const invMastUid = parseInt(itemId)
	const [accessoryItems, setAccessoryItems] = useState([])
	const [accessoryItemPrices, setAccessoryItemPrices] = useState([])
	const [accessoryItemsInfo, setAccessoryItemsInfo] = useState({})
	const [quantity, setQuantity] = useState(1);
	const [unitPrice, setUnitPrice] = useState(null);
	const [selectedCustomerPartNumber, selectCustomerPartNumber] = useState(customerPartNumber || '');
	const [showShowAddedToCartModal, setShowAddedToCartModal] = useState(false);
	const [showAddListModal, setShowAddListModal] = useState(false);
	const [factoryStockModalData, setFactoryStockModalData] = useState(null)

	function handleAddedToCart() {
		setShowAddedToCartModal(false);
	}

	const {data: itemInfo} = useQuery(GET_ITEM_DETAIL_PAGE_ITEM_INFO, {
		variables: { invMastUid: invMastUid },
		fetchPolicy: 'no-cache',
		onCompleted: result => {
			const details = result.itemDetails
			queryItemPrice({
				variables: {
					'items': [{
						'invMastUid': details.invMastUid,
						'quantity': 1
					}]
				}
			})

			//If there are accessory items attached to this item, query for their details
			if(details.associatedItems.length){
				setAccessoryItems(details.associatedItems)

				//Build the price request objects
				const accessoryItemPriceRequests = details.associatedItems.map(i => {
					return {
						'invMastUid': i.associatedInvMastUid,
						'quantity': 1
					}
				})

				queryAccessoryItemPrices({
					variables: {
						'items': accessoryItemPriceRequests
					}
				})

				queryAccessoryItemsInfo({
					variables: {
						'invMastUids': details.associatedItems.map(i => i.associatedInvMastUid)
					}
				})
			} else{
				setAccessoryItems([])
			}
		}
	})

	const itemDetails = itemInfo?.itemDetails
	const customerPartNumbers = itemInfo?.customerPartNumbers
	const itemAvailability = itemInfo?.itemAvailabilitySingular

	const [queryItemPrice] = useLazyQuery(GET_ITEM_PRICE, {
		onCompleted: data => {
			if(data.getItemPrices.length){
				setUnitPrice(data.getItemPrices[0].unitPrice)
			} else{
				setUnitPrice(0)
			}
		}
	})

	const [queryAccessoryItemPrices] = useLazyQuery(GET_ITEM_PRICE, {
		onCompleted: data => {
			setAccessoryItemPrices(data.getItemPrices)
		}
	})

	const [queryAccessoryItemsInfo] = useLazyQuery(GET_ACCESSORY_ITEMS_INFO, {
		onCompleted: ({itemAvailability, itemDetailsBatch}) => {
			setAccessoryItemsInfo({itemAvailability, itemDetailsBatch})
		}
	})
	
	const handleAddToCart = () => {
		context.addItem({
			frecno: invMastUid,
			quantity: parseInt(quantity, 10),
			itemNotes: null,
			itemUnitPriceOverride: null,
			customerPartNumberId: selectedCustomerPartNumber || null
		})
		setShowAddedToCartModal(true)
		setQuantity(1)
	}
	
	const handleSetQuantity = ({target: {value}}) => {
		if (/^\+?(0|[1-9]\d*)$/.test(value) || value === '') {
			setQuantity(value)
		}
	}
	
	const handleShowFactoryStockModal = () => {
		setFactoryStockModalData({
			name: itemDetails?.itemDesc,
			frecno: itemId
		})
	}

	if (!itemDetails) {
		return (<Loader />)
	} else if (!itemDetails.invMastUid) {
		return (<p>No item found</p>)
	} else {
		const FeatureItems = itemDetails.feature.map((elem, idx) => <li key={idx}>{elem.text}</li>)
		const TechSpecItems = itemDetails.techSpec.map((elem, idx) => (
			<TR key={idx}>
				<TD>{elem.name}</TD>
				<TD>{elem.value}</TD>
			</TR>
		))

		const ItemLinks = itemDetails.itemLink.map((elem, idx) => <a href={elem.linkPath} key={idx}>{elem.title}</a>)
		const AccessoryItems = accessoryItems.map((ai, idx) => {

			const details = accessoryItemsInfo?.itemDetailsBatch?.find(d => d.invMastUid === ai.associatedInvMastUid)
			const availability = accessoryItemsInfo?.itemAvailability?.find(a => a.invMastUid === ai.associatedInvMastUid)
			const price = accessoryItemPrices.find(p => p.invMastUid === ai.associatedInvMastUid)

			return (
				<AccessoryItem
					key={idx}
					itemDetails={details}
					availability={availability}
					price={price}
					history={history}
					setShowAddedToCartModal={setShowAddedToCartModal}
				/>
			)
		})

		const CustomerPartOptions = customerPartNumbers.map((elem, idx) => (
			<option value={elem.id} key={idx}>{elem.customerPartNumber}</option>
		))

		return (
			<ItemDetailPageContainer>
				<DivTitle>
					<H2ItemTitle>{itemDetails.itemDesc}</H2ItemTitle>
				</DivTitle>
				
				<DivLeftCol>
					<DivPhoto>
						<Img src={getOriginalImagePath(itemDetails)} alt={itemDetails.invMastUid} />
					</DivPhoto>
					
					<DivPurchaseInfo>
						<Row>
							<Pprice>{!unitPrice ? '--' : `$${unitPrice.toFixed(2)}`}</Pprice>
							<P> /each</P>
						</Row>
						
						<Pbold onClick={handleShowFactoryStockModal}>
							{itemAvailability.availability === 0 ? (
								itemAvailability.availability
							) : (
								`Available: ${itemAvailability.availability}`
							)}
						</Pbold>
						
						<DivPurchaseInfoButtons>
							<RowCentered>
								<span>Qty:</span>
								<InputQuantity value={quantity} onChange={handleSetQuantity} />
							</RowCentered>
							
							<ButtonRed onClick={() => setShowAddListModal(true)}>Add to List</ButtonRed>
							
							<ButtonRed onClick={handleAddToCart}>Add to Cart</ButtonRed>
						</DivPurchaseInfoButtons>
						
						{itemDetails.feature.length > 0 && <a href='#feature'>Features</a>}
						{itemDetails.techSpec.length > 0 && <a href='#techspec'>Tech Specs</a>}
						{accessoryItems.length > 0 && <a href='#accessory'>Accessory</a>}
					</DivPurchaseInfo>
				</DivLeftCol>
				
				<DivDetails>
					<PItemExtendedDescription>{itemDetails.extendedDesc}</PItemExtendedDescription>
					
					<Row>
						<Pprice>{!unitPrice ? '--' : `Price: $${unitPrice.toFixed(2)}`}</Pprice>
						<Pbold onClick={handleShowFactoryStockModal}>
							{itemAvailability.availability === 0 ? (
								`Lead time ${itemAvailability.leadTimeDays} days`
							) : (
								`Available: ${itemAvailability.availability}`
							)}
						</Pbold>
					</Row>
					
					<TABLE>
						<tbody>
							<TR2><TDGrey>Manufacturer</TDGrey><TDWhite><IMG width='100px' src={itemDetails.brand.logoLink} /></TDWhite></TR2>
							<TR2><TDGrey>Item ID</TDGrey><TDWhite>{itemDetails.itemCode}</TDWhite></TR2>
							<TR2><TDGrey>Manufacturer Part #</TDGrey><TDWhite>{itemDetails.mfgPartNo}</TDWhite></TR2>
							<TR2><TDGrey>AHC Part #</TDGrey><TDWhite>{itemDetails.invMastUid}</TDWhite></TR2>
							
							{!!CustomerPartOptions.length && (
								<TR2>
									<TDGrey>Customer Part #</TDGrey>
									<TDWhite>
										<select value={selectedCustomerPartNumber} onChange={(e) => selectCustomerPartNumber(e.target.value)} >
											<option>Select a Part No.</option>
											{CustomerPartOptions}
										</select>
									</TDWhite>
								</TR2>
							)}
							
							<TR2>
								<TDGrey>Unit Size</TDGrey>
								<TDWhite>{itemDetails.unitSizeMultiple}</TDWhite>
							</TR2>
						</tbody>
					</TABLE>
					
					<hr />
					
					<H4 id='feature'>Features</H4>
					<ul>{FeatureItems}</ul>
					
					<H4 id='techspec'>Tech Specifications</H4>
					<Table>
						<tbody>
						{TechSpecItems}
						</tbody>
					</Table>
					
					{itemDetails.itemLink.length > 0 && <H4>Links</H4>}
					<DivSection>{ItemLinks}</DivSection>
					
					{accessoryItems.length > 0 && <H4 id='accessory'>Accessory Items</H4>}
					
					<DivAccessoryItems>
						{AccessoryItems}
					</DivAccessoryItems>
				</DivDetails>
				
				<AddedModal
					open={showShowAddedToCartModal}
					text="Added to Cart!"
					onClose={handleAddedToCart}
					timeout={900}
				/>
				
				<FactoryStockModal
					open={!!factoryStockModalData}
					hideFactoryStockModal={() => setFactoryStockModalData(null)}
					product={factoryStockModalData}
				/>

				{context.userInfo && (
					<AddToShoppingListModal
						open={showAddListModal}
						hide={() => setShowAddListModal(false)}
						item={itemDetails}
						customerPartNumberId={selectedCustomerPartNumber}
					/>
				)}
			</ItemDetailPageContainer>
		)
	}
}