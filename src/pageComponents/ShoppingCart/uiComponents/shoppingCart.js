import React, { useState, useEffect, useContext } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import styled from 'styled-components'
import _ from 'lodash'
import Context from '../../../config/context'
import ShoppingCartItem from './shoppingCartItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import SkeletonItem from './../uiComponents/shoppingCartItemSkeleton'
import SaveShoppingListModal from "../../_common/modals/SaveShoppingListModal";
import { GET_SHOPPING_CART_ITEM_DETAIL, GET_ITEM_CUSTOMER_PART_NUMBERS } from 'config/gqlFragments/gqlItemDetail'
import { GET_ITEM_PRICE, GET_ITEM_AVAILABILITY } from 'config/providerGQL'

const Div = styled.div`
	display: flex;
	justify-content: space-between;
	// border-bottom: 1px grey solid;
	margin-top: 24px;
`

const DivRow = styled.div`
	display: flex;
	justify-content: flex-bottom;
	p {
		cursor: pointer;
		color: grey;
		margin: 0 0 2px 12px;
		align-self: flex-end;
		font-size: 12px;
	}
`

const H3 = styled.h3`
	font-family: ProximaBold;
	text-transform: uppercase;
	margin: 0 0 2px 4px;
`

const Ashare = styled.a`
	margin-right: 4px
`

const AshareBlue = styled(Ashare)`
	color: #328EFC !important;
	font-weight: 500;
`

const DivShare = styled.div`
	cursor: pointer;
	margin-right: 4px;
	align-self: flex-end;
`

const DivSave = styled(DivShare)`
	margin-right: 16px;
`

export default function ShoppingCart({ showSplitLineModal, showFactoryStockModal, showEditPriceModal, showCustomerPartModal, handleSetModalData, history }) {
	const [savedCart, setSavedCart] = useState(false)
	const [showShoppingListModal, setShowShoppingListModal] = useState(false)
	const context = useContext(Context)

	const invMastUids = context.cart.map(item => item.frecno)

	const { loading: itemDetailsLoading, error: itemDetailsError, data: itemsDetails} = useQuery(GET_SHOPPING_CART_ITEM_DETAIL, {
		variables: {
			'invMastUids': invMastUids
		}
	})

	const { loading: pricesLoading, error: itemPricesError, data: itemsPrices} = useQuery(GET_ITEM_PRICE, {
		variables: {
			'items': invMastUids.map(invMastUid => {
				return {
					'invMastUid': invMastUid,
					'quantity': 1
				}
			})
		}
	})

	const { loading: availabilityLoading, error: itemAvailabilityError, data: itemsAvailability} = useQuery(GET_ITEM_AVAILABILITY, {
		variables: {
			'invMastUids': invMastUids
		}
	})

	const { loading: customerPartNumbersLoading, error: customerPartNumbersError, data: itemsCustomerPartNumbers} = useQuery(GET_ITEM_CUSTOMER_PART_NUMBERS, {
		variables:{
			'invMastUids': invMastUids
		}
	})

	useEffect(() => {
		if (savedCart) {
			setTimeout(() => setSavedCart(false), 1000)
		}
	}, [savedCart])

	const ShoppingCartItems = context.cart.map((cartItem, index) => {

		const itemDetails = itemsDetails?.itemDetailsBatch?.find(detail => detail.invMastUid === cartItem.frecno)
		const itemPrice = itemsPrices?.getItemPrices?.find(price => price.invMastUid === cartItem.frecno)
		const itemAvailability = itemsAvailability?.itemAvailability?.find(a => a.invMastUid === cartItem.frecno)
		const itemCustomerPartNumbers = itemsCustomerPartNumbers?.customerPartNumbersBatch?.filter(p => p.invMastUid === cartItem.frecno)
		return (
			<Draggable key={index} draggableId={String(index)} index={index}>
				{(provided) => (
					<div
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
					>
						{itemDetails ?
							<ShoppingCartItem
								cartItem={cartItem}
								itemDetails={itemDetails}
								priceInfo={itemPrice}
								availabilityInfo={itemAvailability}
								customerPartNumbers={itemCustomerPartNumbers}
								key={index}
								index={index}
								showSplitLineModal={showSplitLineModal}
								showFactoryStockModal={showFactoryStockModal}
								showEditPriceModal={showEditPriceModal}
								showCustomerPartModal={showCustomerPartModal}
								handleSetModalData={handleSetModalData}
								history={history}
							/>
							: <SkeletonItem index={index} />
						}
					</div>
				)}
			</Draggable>
		)	
	})

	function onDragEnd(result) {
		// if dropped outside the list
		if (!result.destination) {
			return
		} else {
			context.moveItem(result.source.index, result.destination.index)
		}
	}

	const handleSaveAsShoppingList = () => {
		setShowShoppingListModal(true)
	}

	return (
		<>
			<Div>
				<DivRow>
					<H3>Shopping Cart</H3>
					<p onClick={() => context.emptyCart()}>(empty cart)</p>
				</DivRow>
				<DivRow>
						{
							context.userInfo 
								?	<DivSave onClick={handleSaveAsShoppingList}>
										<Ashare>Save As Shopping List</Ashare>
										<FontAwesomeIcon icon="list" color="grey" />
									</DivSave>
								: 	<Ashare></Ashare>
						}
					<DivSave onClick={() => { context.saveCart(), setSavedCart(true) }}>
						{savedCart ? <AshareBlue>Cart Saved</AshareBlue> : <Ashare>Save Cart</Ashare>}
						{savedCart ? <FontAwesomeIcon icon="save" color="#328EFC" /> : <FontAwesomeIcon icon="save" color="grey" />}
					</DivSave>
					<DivShare>
						<Ashare>Email Cart</Ashare>
						<FontAwesomeIcon icon="share" color="grey" />
					</DivShare>
				</DivRow>
			</Div>
			<DragDropContext onDragEnd={(result) => onDragEnd(result)}>
				<Droppable droppableId="droppable">
					{(provided) => (
						<div
							{...provided.droppableProps}
							ref={provided.innerRef}
						>
							{ShoppingCartItems}
						</div>
					)}
				</Droppable>
			</DragDropContext>
			<SaveShoppingListModal
				open={showShoppingListModal}
				hide={() => setShowShoppingListModal(false)}
				items={context.cart}
				enableAddToExisting
			/>
		</>
	)
}