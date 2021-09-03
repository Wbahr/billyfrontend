import React, { Fragment, useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import Context from '../../../setup/context'
import ShoppingCartItem from './shoppingCartItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import SkeletonItem from './../uiComponents/shoppingCartItemSkeleton'
import SaveShoppingListModal from '../../_common/modals/SaveShoppingListModal'
import { useLazyQuery } from '@apollo/client'
import ErrorModal from 'pageComponents/_common/modals/ErrorModal'
import MergeCartModal from './MergeCartModal'
import { useDebounceValue } from '../../_common/helpers/generalHelperFunctions'
import { GET_CART_DATA } from 'setup/gqlQueries/gqlCartQueries'

const Div = styled.div`
	display: flex;
    flex-wrap: wrap;
    max-width: calc(100vw - 40px);
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
        updateShoppingCart,
        cartPricing,
        showErrorModal,
        setShowErrorModal
    } = useContext(Context)
    const [showShoppingListModal, setShowShoppingListModal] = useState(false)
    const [cartData, setCartData] = useState(null)
    const debouncedCart = useDebounceValue(cart, 1000)

    const [getCartData] = useLazyQuery(GET_CART_DATA, {
        fetchPolicy: 'no-cache',
        onCompleted: data => {
            setCartData(data.cartData)
        }
    })
    
    useEffect(() => {
        if (cart?.length) {
            const itemsAndQuantities = cart.map(({ invMastUid, quantity }) => ({ invMastUid, quantity: quantity }))
            getCartData({ variables: { itemsAndQuantities } })
        }
    }, [debouncedCart])

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
                </DivRow>
            </Div>
            <CartComponent
                {
                    ...{
                        history,
                        cart,
                        updateShoppingCart,
                        cartPricing,
                        cartData
                    }
                }
            />
            {
                userInfo && (
                    <SaveShoppingListModal
                        open={showShoppingListModal}
                        hide={() => setShowShoppingListModal(false)}
                        items={cart?.map(item => ({
                            invMastUid: item.invMastUid,
                            customerPartNumberId: item.customerPartNumberId,
                            quantity: item.quantity
                        }))}
                        enableAddToExisting
                    />
                )
            }
            <ErrorModal
                open={showErrorModal} 
                hide={() => setShowErrorModal(false)} 
                text='There has been an error, please refresh and try again.'
            />
        </>
    )
}

const CartComponent = (props) => {

    const {
        cart,
        updateShoppingCart,
        cartPricing,
        history,
        cartData
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
        const details = cartData?.itemDetails.find(detail => detail.invMastUid === cartItem.invMastUid)
        const itemPrice = cartData?.itemPrices.find(price => price.invMastUid === cartItem.invMastUid)
        const itemAvailability = cartData?.availabilities.find(a => a.invMastUid === cartItem.invMastUid)
        const itemCustomerPartNumbers = cartData?.customerPartNumbers.filter(p => p.invMastUid === cartItem.invMastUid)
        const itemSourceLocations = cartData?.sourceLocations.filter(l => l.invMastUid === cartItem.invMastUid)

        return (
            <Fragment key={index}>
                {(details && cartItem.uniqueId) ? (
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
                                {provided.placeholder}
                            </div>
                        )}
                    </Draggable>
                ) : <SkeletonItem index={index} />}
            </Fragment>
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
