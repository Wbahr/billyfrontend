import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import Context from '../../../config/context'
import ShoppingCartItem from './shoppingCartItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import SkeletonItem from './../uiComponents/shoppingCartItemSkeleton'
import SaveShoppingListModal from "../../_common/modals/SaveShoppingListModal";

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

	useEffect(() => {
		if (savedCart) {
			setTimeout(() => setSavedCart(false), 1000)
		}
	}, [savedCart])

	const ShoppingCartItems = (
		<Context.Consumer>
			{({ cart, itemDetailCache, emptyCart }) => (
				cart.map((item, index) => {
					let displayItem = itemDetailCache.find(elem => elem.itemDetails.invMastUid === item.frecno)
					return (
						<Draggable key={index} draggableId={String(index)} index={index}>
							{(provided) => (
								<div
									ref={provided.innerRef}
									{...provided.draggableProps}
									{...provided.dragHandleProps}
								>
									{_.isNil(displayItem) ?
										<SkeletonItem
											index={index}
										/>
										:
										<ShoppingCartItem
											item={item}
											displayItem={displayItem}
											emptyCart={emptyCart}
											index={index}
											showSplitLineModal={showSplitLineModal}
											showFactoryStockModal={showFactoryStockModal}
											showEditPriceModal={showEditPriceModal}
											showCustomerPartModal={showCustomerPartModal}
											handleSetModalData={handleSetModalData}
											history={history}
										/>
									}
								</div>
							)}
						</Draggable>
					)
				}
				)
			)}
		</Context.Consumer>
	)

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
				<Context.Consumer>
					{({ emptyCart }) => {
						return (
							<DivRow>
								<H3>Shopping Cart</H3>
								<p onClick={() => emptyCart()}>(empty cart)</p>
							</DivRow>
						)
					}}
				</Context.Consumer>
				<DivRow>
					<Context.Consumer>
						{({ userInfo }) => {
							if (!userInfo) {
								return (
									<Ashare></Ashare>
								)
							} else {
								return (
									<DivSave onClick={handleSaveAsShoppingList}>
										<Ashare>Save As Shopping List</Ashare>
										<FontAwesomeIcon icon="list" color="grey" />
									</DivSave>
								)
							}
						}}
					</Context.Consumer>
					<Context.Consumer>
						{({ saveCart }) => {
							return (
								<DivSave onClick={() => { saveCart(), setSavedCart(true) }}>
									{savedCart ? <AshareBlue>Cart Saved</AshareBlue> : <Ashare>Save Cart</Ashare>}
									{savedCart ? <FontAwesomeIcon icon="save" color="#328EFC" /> : <FontAwesomeIcon icon="save" color="grey" />}
								</DivSave>
							)
						}}
					</Context.Consumer>
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