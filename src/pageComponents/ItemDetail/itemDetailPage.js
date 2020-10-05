import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useQuery, useLazyQuery } from '@apollo/client'
import gql from 'graphql-tag'
import Loader from '../_common/loader'
import AccessoryItem from './uiComponents/accessoryItem'
import AddedModal from '../SearchResults/uiComponents/addedModal'
import Context from '../../config/context'
import AddToShoppingListModal from "../_common/modals/AddToShoppingListModal";
import { getLargeImagePath } from 'pageComponents/_common/helpers/generalHelperFunctions'
import { GET_ITEM_PRICE } from 'config/providerGQL'
import { FRAGMENT_ITEM_DETAIL, FRAGMENT_ITEM_DETAIL_BRANDS, FRAGMENT_ITEM_DETAIL_FEATURES,
		 FRAGMENT_ITEM_DETAIL_MEDIA, FRAGMENT_ITEM_DETAIL_ASSOCIATED_ITEMS,
		 FRAGMENT_ITEM_DETAIL_ITEM_LINKS, FRAGMENT_ITEM_DETAIL_TECH_SPECS } from 'config/gqlFragments/gqlItemDetail'

const GET_MAIN_ITEM_BY_ID = gql`
	query ItemById($itemId: Int) {
		customerPartNumbers(frecno: $itemId){
			customerPartNumber
			id
		}
		itemDetails(invMastUid: $itemId) {
			...ItemDetails
			...Brands
			...Features
			...Media
			...AssociatedItems
			...ItemLinks
			...TechSpecs
		}
	}
	${FRAGMENT_ITEM_DETAIL}
	${FRAGMENT_ITEM_DETAIL_BRANDS}
	${FRAGMENT_ITEM_DETAIL_FEATURES}
	${FRAGMENT_ITEM_DETAIL_MEDIA}
	${FRAGMENT_ITEM_DETAIL_ASSOCIATED_ITEMS}
	${FRAGMENT_ITEM_DETAIL_ITEM_LINKS}
	${FRAGMENT_ITEM_DETAIL_TECH_SPECS}
`

const GET_ACCESSORY_ITEM_DETAILS = gql`
	query GetAccessoryItems($invMastUids: [Int]){
		itemDetailsBatch(invMastUids: $invMastUids){
			...ItemDetails
			...Media
		}
	}
	${FRAGMENT_ITEM_DETAIL}
	${FRAGMENT_ITEM_DETAIL_MEDIA}
`

const ItemDetailPageContainer = styled.div`
	display: flex;
	width: 100%;  
`

const DivPhoto = styled.div`
	width: 400px;
	height: 400px;
	margin: 0px 8px;
`

const Img = styled.img`
	max-height:100%; 
	max-width:100%;    
`

const DivDetails = styled.div`
	width: 500px;
	padding: 0 32px;
	flex-grow: 99;
`

const DivPurchaseInfo = styled.div`
	position: -webkit-sticky;
	position: sticky;
	top: 125px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	width: 300px;
	height: 300px;
	margin: 30px 8px 0 12px;
	padding: 8px 16px;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`

const Div = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	align-content: center;
`

const Row = styled.div`
	display: flex;
	width: 100%;  
	align-items: flex-end;
`

const RowEnd = styled(Row)`
	justify-content: flex-end;
`

const RowSpaced = styled(Row)`
	justify-content: space-between;
`

const P = styled.p`
	margin: 0;
`

const Pbold = styled(P)`
	font-weight: bold;
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
	let { itemId, customerPartNumber } = useParams()

	const [item, setItem] = useState(null);
	const [accessoryItems, setAccessoryItems] = useState([])
	const [quantity, setQuantity] = useState(1);
	const [unitPrice, setUnitPrice] = useState(null);
    const [selectedCustomerPartNumber, selectCustomerPartNumber] = useState(customerPartNumber || '');
	const [customerPartNumbers, setCustomerPartNumbers] = useState([]);
	const [showShowAddedToCartModal, setShowAddedToCartModal] = useState(false);
	const [showAddListModal, setShowAddListModal] = useState(false);

	function handleAddedToCart() {
		setShowAddedToCartModal(false);
	}

	itemId = parseInt(itemId, 10)
	useQuery(GET_MAIN_ITEM_BY_ID, {
		variables: { itemId },
		fetchPolicy: 'no-cache',
		onCompleted: result => {
			if (result.itemDetails) {
				setCustomerPartNumbers(result.customerPartNumbers)
				setItem(result.itemDetails)
			} else {
				setItem({})
			}
		}
	})

	//Perform actions when the item is set. Such as price retrieval.
	useEffect(() => {
		if(!item) return

		queryItemPrice({
			variables: {
				'items': [{
					'invMastUid': item.invMastUid,
					'quantity': 1
				}]
			}
		})

		//If there are accessory items attached to this item, query for their details
		if(item.associatedItems.length){
			setAccessoryItems(item.associatedItems)

			//Build the price request objects
			let accessoryItemPriceRequests = item.associatedItems.map(i => {
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

			queryAccessoryItemDetails({
				variables: {
					'invMastUids': item.associatedItems.map(i => i.associatedInvMastUid)
				}
			})
		} else{
			setAccessoryItems([])
		}
		
	}, [item])

	const [queryItemPrice] = useLazyQuery(GET_ITEM_PRICE, {
		onCompleted: data => {
			if(data.getItemPrices.length){
				let unitPrice = data.getItemPrices[0].unitPrice
				setUnitPrice(unitPrice)
			} else{
				setUnitPrice(0)
			}
		}
	})

	const [queryAccessoryItemPrices] = useLazyQuery(GET_ITEM_PRICE, {
		onCompleted: data => {

			if(accessoryItems.length){
				let accessoryItemsWithPrice = accessoryItems.map(ai => {
					let associatedItemPrice = data.getItemPrices.find(priceObj => priceObj.invMastUid === ai.associatedInvMastUid).unitPrice

					return {
						...ai,
						unitPrice: associatedItemPrice
					}
				})

				setAccessoryItems(accessoryItemsWithPrice)
			}
		}
	})

	const [queryAccessoryItemDetails] = useLazyQuery(GET_ACCESSORY_ITEM_DETAILS, {
		onCompleted: data => {
			let itemsWithDetails = data.itemDetailsBatch

			if(accessoryItems.length){
				let accessoryItemsWithDetails = accessoryItems.map(ai => {
					let accessoryItemDetails = itemsWithDetails.find(detailObj => detailObj.invMastUid === ai.associatedInvMastUid)

					return  {
						...ai,
						details: accessoryItemDetails
					}
				})

				setAccessoryItems(accessoryItemsWithDetails)
			}
		}
	})

	if (!item) {
		return (<Loader />)
	} else if (!item.invMastUid) {
		return (<p>No item found</p>)
	} else {
        let imagePath = getLargeImagePath(item);
		
		let FeatureItems = item.feature.map((elem, idx) => {
			return (
				<li key={idx}>{elem.text}</li>
			)
		})

		let TechSpecItems = item.techSpec.map((elem, idx) => {
			return (
				<TR key={idx}><TD>{elem.name}</TD><TD>{elem.value}</TD></TR>
			)
		})

		let ItemLinks = item.itemLink.map((elem, idx) => {
			return (
				<a href={elem.linkPath} key={idx}>{elem.title}</a>
			)
		})

		let Features = (
			<ul>
				{FeatureItems}
			</ul>
		)

		let TechSpecs = (
			<div>
				<Table>
					<tbody>
						{TechSpecItems}
					</tbody>
				</Table>
			</div>
		)

		let Links = (
			<DivSection>
				{ItemLinks}
			</DivSection>
		)

		let AccessoryItems = accessoryItems.length && accessoryItems.map((ai, idx) => {
			return (
				<AccessoryItem
					key={idx}
					item={ai}
					history={history}
				/>
			)
		})

		let CustomerPartOptions = _.map(customerPartNumbers, (elem, idx) => {
			return (<option value={elem.id} key={idx}>{elem.customerPartNumber}</option>)
		})

		return (
			<ItemDetailPageContainer>
				<AddedModal
					open={showShowAddedToCartModal}
					text={'Added to Cart!'}
					onClose={handleAddedToCart}
					timeout={900}
				/>
				<DivPhoto>
					<Img src={imagePath} alt={item.invMastUid} />
				</DivPhoto>
				<DivDetails>
					<H2ItemTitle>{item.itemDesc}</H2ItemTitle>
					<PItemExtendedDescription>{item.extendedDesc}</PItemExtendedDescription>
					<Row>
						<Pprice>{_.isNil(unitPrice) ? '--' : `Price: $${unitPrice.toFixed(2)}`}</Pprice>
						{item.availability === 0 ? <Pbold>{item.availabilityMessage}</Pbold> : <Pbold>{`Availability: ${item.availability}`}</Pbold>}
					</Row>
					<TABLE>
						<tbody>
							<TR2><TDGrey>Manufacturer</TDGrey><TDWhite><IMG width='100px' src={item.brand.logoLink} /></TDWhite></TR2>
							<TR2><TDGrey>Item ID</TDGrey><TDWhite>{item.itemCode}</TDWhite></TR2>
							<TR2><TDGrey>Manufacturer Part #</TDGrey><TDWhite>{item.mfgPartNo}</TDWhite></TR2>
							<TR2><TDGrey>AHC Part #</TDGrey><TDWhite>{item.invMastUid}</TDWhite></TR2>
							{
								!!CustomerPartOptions.length && (
									<TR2><TDGrey>Customer Part #</TDGrey>
										<TDWhite>
											<select value={selectedCustomerPartNumber} onChange={(e) => selectCustomerPartNumber(e.target.value)} >
												<option>Select a Part No.</option>
												{CustomerPartOptions}
											</select>
										</TDWhite>
									</TR2>
								)
							}
							<TR2><TDGrey>Unit Size</TDGrey><TDWhite>{item.unitSizeMultiple}</TDWhite></TR2>
						</tbody>
					</TABLE>
					<hr />
					<H4 id='feature'>Features</H4>
					{Features}
					<H4 id='techspec'>Tech Specifications</H4>
					{TechSpecs}
					{item.itemLink.length > 0 && <H4>Links</H4>}
					{Links}
					{item.associatedItems.length > 0 && <H4 id='accessory'>Accessory Items</H4>}
					<DivAccessoryItems>
						{AccessoryItems}
					</DivAccessoryItems>
				</DivDetails>
				<DivPurchaseInfo>
					<RowSpaced>
						<Row><Pprice>{_.isNil(unitPrice) ? '--' : `$${unitPrice.toFixed(2)}`}</Pprice><P> /each</P></Row>
						<RowEnd>
							<span>Qty:</span><InputQuantity value={quantity} onChange={(e) => handleSetQuantity(e.target.value)} />
						</RowEnd>
					</RowSpaced>
					<hr />
					{item.availability === 0 ? <Pbold>{item.availabilityMessage}</Pbold> : <Pbold>{`Availability: ${item.availability}`}</Pbold>}
					<Div>
						<hr/>
						<ButtonRed
							onClick={() => setShowAddListModal(true)}
						>
							Add to List
						</ButtonRed>
						<AddToShoppingListModal
							open={showAddListModal}
							hide={() => setShowAddListModal(false)}
							item={item}
							customerPartNumberId={selectedCustomerPartNumber}
						/>
						<Context.Consumer>
							{({ addItem }) => (
								<ButtonRed onClick={() => {
									addItem({
										'frecno': itemId,
										'quantity': parseInt(quantity, 10),
										'itemNotes': '',
										'itemUnitPriceOverride': null,
										'customerPartNumberId': selectedCustomerPartNumber
									}), setShowAddedToCartModal(true), setQuantity(1)
								}}>Add to Cart</ButtonRed>
							)}
						</Context.Consumer>
						{/* <ButtonBlack>Buy Now</ButtonBlack> */}
					</Div>
					{item.feature.length > 0 && <a href='#feature'>Features</a>}
					{item.techSpec.length > 0 && <a href='#techspec'>Tech Specs</a>}
					{item.associatedItems.length > 0 && <a href='#accessory'>Accessory</a>}
				</DivPurchaseInfo>
			</ItemDetailPageContainer>
		)
	}
}