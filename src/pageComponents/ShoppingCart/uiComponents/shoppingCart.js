import React, { useState, useEffect, useContext } from 'react'
import { useLazyQuery } from '@apollo/client'
import styled from 'styled-components'
import Context from '../../../config/context'
import ShoppingCartItem from './shoppingCartItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import SkeletonItem from './../uiComponents/shoppingCartItemSkeleton'
import SaveShoppingListModal from "../../_common/modals/SaveShoppingListModal";
import { GET_SHOPPING_CART_ITEM_DETAIL, GET_ITEM_CUSTOMER_PART_NUMBERS } from 'config/gqlQueries/gqlItemQueries'
import { GET_ITEM_PRICE, GET_ITEM_AVAILABILITY } from 'config/providerGQL'
import {useDebounceValue, useDidUpdateEffect} from "../../_common/helpers/generalHelperFunctions";

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
	margin-right: 4px;
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

export default function ShoppingCart({ showSplitLineModal, showFactoryStockModal, showCustomerPartModal, handleSetModalData, history }) {
	const { cart, emptyCart, userInfo, saveShoppingCart, itemPrices, itemAvailabilities, itemDetails, customerPartNumbers,
		getItemPrices, getItemAvailabilities, getItemDetails, getCustomerPartNumbers } = useContext(Context)
	const [savedCart, setSavedCart] = useState(false)
	const [showShoppingListModal, setShowShoppingListModal] = useState(false)
	
	useEffect(() => {
		if (cart) {
			const hasMissingItemDetails = !!cart.find(item => !itemDetails?.find(detail => detail.invMastUid === item.frecno))
			const hasMissingPartNumbers = !!cart.find(item => !customerPartNumbers?.find(partNo => partNo.invMastUid === item.frecno))
			hasMissingItemDetails && getItemDetails(cart)
			hasMissingPartNumbers && getCustomerPartNumbers(cart)
			
			const hasMissingPrices = !!cart.find(item => !itemPrices.find(price => price.invMastUid === item.frecno && price.quantity === item.quantity))
			const hasMissingAvail = !!cart.find(item => !itemAvailabilities.find(avail => avail.invMastUid === item.frecno))
			hasMissingPrices && getItemPrices(cart)
			hasMissingAvail && getItemAvailabilities(cart)
			console.log({hasMissingItemDetails, hasMissingPartNumbers, hasMissingPrices, hasMissingAvail})
		}
	}, [cart])

	useEffect(() => {
		if (savedCart) {
			setTimeout(() => setSavedCart(false), 1000)
		}
	}, [savedCart])
	
	const handleSaveAsShoppingList = () => {
		setShowShoppingListModal(true)
	}

	const handleSaveCart = () => {
		saveShoppingCart()
		setSavedCart(true)
	}
	
	return (
		<>
			<Div>
				<DivRow>
					<H3>Shopping Cart</H3>
					<p onClick={emptyCart}>(empty cart)</p>
				</DivRow>
				<DivRow>
						{
							userInfo 
								?	<DivSave onClick={handleSaveAsShoppingList}>
										<Ashare>Save As Shopping List</Ashare>
										<FontAwesomeIcon icon="list" color="grey" />
									</DivSave>
								: <Ashare/>
						}
					<DivSave onClick={handleSaveCart}>
						{savedCart ? <AshareBlue>Cart Saved</AshareBlue> : <Ashare>Save Cart</Ashare>}
						{savedCart ? <FontAwesomeIcon icon="save" color="#328EFC" /> : <FontAwesomeIcon icon="save" color="grey" />}
					</DivSave>
					<DivShare>
						<Ashare>Email Cart</Ashare>
						<FontAwesomeIcon icon="share" color="grey" />
					</DivShare>
				</DivRow>
			</Div>
			{ cart && (
				<CartComponent
					{...{ history, cart, itemDetails, itemPrices, itemAvailabilities, customerPartNumbers, showSplitLineModal,
						showFactoryStockModal, showCustomerPartModal, handleSetModalData}}
				/>
			)}
			{
				userInfo && <SaveShoppingListModal
					open={showShoppingListModal}
					hide={() => setShowShoppingListModal(false)}
					items={cart}
					enableAddToExisting
				/>
			}
		</>
	)
}

const CartComponent = ({cart, itemDetails, itemPrices, itemAvailability, itemsCustomerPartNumbers, showSplitLineModal,
 	showFactoryStockModal, showCustomerPartModal, handleSetModalData, history}) => {
	const {updateShoppingCart} = useContext(Context)
	const [realTimeCart, setRealTimeCart] = useState(cart)
	const debouncedCart = useDebounceValue(realTimeCart, 1000)
	
	useDidUpdateEffect(() => {
		updateShoppingCart(debouncedCart)
	}, [debouncedCart])
	
	const onDragEnd = ({destination, source}) => {
		if (destination) {
			const newCart = realTimeCart.slice()
			const movedItem = newCart.splice(source.index, 1)
			newCart.splice(destination.index, 0, movedItem[0])
			setRealTimeCart(newCart)
		}
	}
	
	const setCartItem = index => newCartItem => {
		if (newCartItem) {
			setRealTimeCart(realTimeCart.map((cartItem, idx) => idx === index ? newCartItem : cartItem))
		} else {
			setRealTimeCart(realTimeCart.reduce((accum, cartItem, idx) => accum.concat(idx === index ? [] : cartItem), []))
		}
	}
	
	const ShoppingCartItems = realTimeCart.map((cartItem, index) => {
		const details = itemDetails?.find(detail => detail.invMastUid === cartItem.frecno)
		const itemPrice = itemPrices?.find(price => price.invMastUid === cartItem.frecno)
		const itemAvailability = itemAvailability?.find(a => a.invMastUid === cartItem.frecno)
		const itemCustomerPartNumbers = itemsCustomerPartNumbers?.filter(p => p.invMastUid === cartItem.frecno)
		
		return (
			<Draggable key={index} draggableId={String(index)} index={index}>
				{(provided) => (
					<div
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
					>
						{details ?
							<ShoppingCartItem
								cartItem={cartItem}
								itemDetails={details}
								priceInfo={itemPrice}
								availabilityInfo={itemAvailability}
								customerPartNumbers={itemCustomerPartNumbers}
								key={index}
								setCartItem={setCartItem(index)}
								{...{showSplitLineModal, showFactoryStockModal, showCustomerPartModal, handleSetModalData, history, index}}
							/>
							: <SkeletonItem index={index} />
						}
						{provided.placeholder}
					</div>
				)}
			</Draggable>
		)
	})
	
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="droppable">
				{(provided) => (
					<div
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						{ShoppingCartItems}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	)
};