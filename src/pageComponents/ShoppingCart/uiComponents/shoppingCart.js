import React, { useState, useEffect, useContext, useMemo } from 'react'
import styled from 'styled-components'
import Context from '../../../setup/context'
import ShoppingCartItem from './shoppingCartItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import SkeletonItem from './../uiComponents/shoppingCartItemSkeleton'
import SaveShoppingListModal from '../../_common/modals/SaveShoppingListModal'
import { GET_ITEM_AVAILABILITIES_AND_LEAD_TIMES } from 'setup/providerGQL'
import { useLazyQuery } from '@apollo/client'
import MergeCartModal from './MergeCartModal'
import { useDebounceValue } from '../../_common/helpers/generalHelperFunctions'

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

const DivShare = styled.div`
	cursor: pointer;
	margin-right: 4px;
	align-self: flex-end;
`

const DivSave = styled(DivShare)`
	margin-right: 16px;
`

export default function ShoppingCart({ history }) {
    const {
        cart,
        emptyCart,
        userInfo,
        itemPrices,
        itemDetails,
        customerPartNumbers,
        sourceLocations,
        getItemPrices,
        getItemDetails,
        getCustomerPartNumbers,
        getSourceLocations,
        updateShoppingCart,
        cartPricing
    } = useContext(Context)
    const [showShoppingListModal, setShowShoppingListModal] = useState(false)
    const [itemAvailabilities, setItemAvailabilities] = useState([])
    const debouncedCart = useDebounceValue(cart, 1000)

    const [getAvailabilitiesWithLeadTimes] = useLazyQuery(GET_ITEM_AVAILABILITIES_AND_LEAD_TIMES, {
        fetchPolicy: 'no-cache',
        onCompleted: data => {
            setItemAvailabilities(data.itemAvailabilityAndLeadTimes)
        }
    })
    
    useEffect(() => {
        if (cart?.length) {
            const hasMissingPrices = !!cart.find(item => !itemPrices.find(price => price.invMastUid === item.frecno && price.quantity === item.quantity))
            hasMissingPrices && getItemPrices(cart)
        }
    }, [cart])
    
    useEffect(() => {
        if (cart?.length) {
            const itemsAndQuantities = cart.map(({ frecno, quantity }) => ({ invMastUid: frecno, quantity: quantity }))
            getAvailabilitiesWithLeadTimes({ variables: { itemsAndQuantities } })
        }
    }, [debouncedCart])

    useEffect(() => {
        if (cart) {
            const itemsWithoutDetails = cart.filter(item => !itemDetails?.some(detail => detail.invMastUid === item.frecno))
            if (itemsWithoutDetails.length) {
                getItemDetails(itemsWithoutDetails)
                getCustomerPartNumbers(itemsWithoutDetails)
            }

            const itemsWithoutSourceLocations = cart.filter(item => !sourceLocations?.some(loc => loc.invMastUid === item.frecno))
            itemsWithoutSourceLocations.length && getSourceLocations(itemsWithoutSourceLocations)
        }
    }, [cart?.length])

    const handleSaveAsShoppingList = () => setShowShoppingListModal(true)

    return (
        <>
            <Div>
                <DivRow>
                    <H3>Shopping Cart</H3>
                    <p onClick={emptyCart}>(empty cart)</p>
                </DivRow>
                <DivRow>
                    {userInfo ?	(
                        <DivSave onClick={handleSaveAsShoppingList}>
                            <Ashare>Save As Shopping List</Ashare>
                            <FontAwesomeIcon icon="list" color="grey" />
                        </DivSave>
                    ) : <Ashare/>}

                    {userInfo && <MergeCartModal/>}

                    <DivShare>
                        <Ashare>Email Cart</Ashare>
                        <FontAwesomeIcon icon="share" color="grey" />
                    </DivShare>
                </DivRow>
            </Div>
            <CartComponent
                {
                    ...{
                        history,
                        itemDetails,
                        itemPrices,
                        itemAvailabilities,
                        customerPartNumbers,
                        sourceLocations,
                        cart,
                        updateShoppingCart,
                        cartPricing
                    }
                }
            />
            {
                userInfo && (
                    <SaveShoppingListModal
                        open={showShoppingListModal}
                        hide={() => setShowShoppingListModal(false)}
                        items={cart}
                        enableAddToExisting
                    />
                )
            }
        </>
    )
}

const CartComponent = (props) => {

    const {
        cart,
        updateShoppingCart,
        itemDetails,
        itemPrices,
        itemAvailabilities,
        customerPartNumbers,
        sourceLocations,
        cartPricing,
        history
    } = props

    const [shoppingCart, setShoppingCart] = useState(cart || [])
    const [isDragDisabled, setIsDragDisabled] = useState(false)

    useEffect(() => {
        setShoppingCart(cart)
    }, [cart])

    const onDragEnd = ({ destination, source }) => {
        if (destination) {
            const newCart = shoppingCart.slice()
            const movedItem = newCart.splice(source.index, 1)
            newCart.splice(destination.index, 0, movedItem[0])
            setShoppingCart(newCart)
            updateShoppingCart(newCart)
        }
    }

    const setCart = newCart => {
        setShoppingCart(newCart)
        updateShoppingCart(newCart)
    }

    const setCartItem = index => newCartItem => {
        const newCart = shoppingCart.slice()
        if (newCartItem) {
            newCart[index] = newCartItem
        } else {
            newCart.splice(index, 1)
        }
        setShoppingCart(newCart)
        updateShoppingCart(newCart)
    }

    const setCartItemField = index => (field, value) => {
        const newCart = shoppingCart.map((cartItem, idx) => idx === index ? { ...cartItem, [field]: value } : cartItem)
        setShoppingCart(newCart)
        updateShoppingCart(newCart)
    }

    const ShoppingCartItems = (shoppingCart || []).map((cartItem, index) => {
        const details = itemDetails?.find(detail => detail.invMastUid === cartItem.frecno)
        const itemPrice = itemPrices?.find(price => price.invMastUid === cartItem.frecno)
        const itemAvailability = itemAvailabilities?.find(a => a.invMastUid === cartItem.frecno)
        const itemCustomerPartNumbers = customerPartNumbers?.filter(p => p.invMastUid === cartItem.frecno)
        const itemSourceLocations = sourceLocations?.filter(l => l.invMastUid === cartItem.frecno)

        return (
            <Draggable
                key={index}
                draggableId={String(index)}
                index={index}
                isDragDisabled={!details || isDragDisabled}
            >
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                    >
                        {details ? (
                            <ShoppingCartItem
                                key={index}
                                itemDetails={details}
                                priceInfo={itemPrice}
                                availabilityInfo={itemAvailability}
                                customerPartNumbers={itemCustomerPartNumbers}
                                sourceLocations={itemSourceLocations}
                                cart={shoppingCart || []}
                                setCartItem={setCartItem(index)}
                                setCartItemField={setCartItemField(index)}
                                {...{ history, index, setIsDragDisabled, setCart, cartItem, cartPricing, provided }}
                            />
                        ) : <SkeletonItem index={index} />}
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
}
