import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import Context from '../../../setup/context'
import ShoppingCartItem from './shoppingCartItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import SkeletonItem from './../uiComponents/shoppingCartItemSkeleton'
import SaveShoppingListModal from '../../_common/modals/SaveShoppingListModal'
import { GET_ITEM_AVAILABILITIES_AND_LEAD_TIMES } from 'config/providerGQL'
import { useLazyQuery } from '@apollo/client'

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

export default function ShoppingCart({ history }) {
  const { cart, 
    emptyCart, 
    userInfo, 
    saveShoppingCart, 
    itemPrices,
    itemDetails, 
    customerPartNumbers,
    getItemPrices,
    getItemDetails, 
    getCustomerPartNumbers, 
    updateShoppingCart,
    cartPricing } = useContext(Context)
  const [savedCart, setSavedCart] = useState(false)
  const [showShoppingListModal, setShowShoppingListModal] = useState(false)
  const [itemAvailabilities, setItemAvailabilities] = useState([])

  const [getAvailabilitiesWithLeadTimes] = useLazyQuery(GET_ITEM_AVAILABILITIES_AND_LEAD_TIMES, {
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      setItemAvailabilities(data.itemAvailabilityAndLeadTimes)
    }
  })
	
  useEffect(() => {
    if (cart) {
      const hasMissingPrices = !!cart.find(item => !itemPrices.find(price => price.invMastUid === item.frecno && price.quantity === item.quantity))
      hasMissingPrices && getItemPrices(cart)
      getAvailabilitiesWithLeadTimes({ 
        variables: { 
          itemsAndQuantities: cart.map(({ frecno, quantity }) => {
            return {
              invMastUid: frecno,
              quantity: quantity
            }
          }) 
        } 
      })
    }
  }, [cart])
	
  useEffect(() => {
    if (cart) {
      const hasMissingItemDetails = !!cart.find(item => !itemDetails?.find(detail => detail.invMastUid === item.frecno))
      hasMissingItemDetails && getItemDetails(cart)
			
      const hasMissingPartNumbers = !!cart.find(item => !customerPartNumbers?.find(partNo => partNo.invMastUid === item.frecno))
      hasMissingPartNumbers && getCustomerPartNumbers(cart)
    }
  }, [cart?.length])

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
          {userInfo ?	(
            <DivSave onClick={handleSaveAsShoppingList}>
              <Ashare>Save As Shopping List</Ashare>
              <FontAwesomeIcon icon="list" color="grey" />
            </DivSave>
          ) : <Ashare/>}
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
      <CartComponent
        {
          ...{ 
            history, 
            itemDetails, 
            itemPrices, 
            itemAvailabilities, 
            customerPartNumbers, 
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

const CartComponent = ({ cart, updateShoppingCart, itemDetails, itemPrices, itemAvailabilities, customerPartNumbers, cartPricing, history }) => {
  const [shoppingCart, setShoppingCart] = useState(cart || [])
	
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
		
    return (
      <Draggable key={index} draggableId={String(index)} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {details ? (
              <ShoppingCartItem
                cartItem={cartItem}
                itemDetails={details}
                priceInfo={itemPrice}
                availabilityInfo={itemAvailability}
                customerPartNumbers={itemCustomerPartNumbers}
                key={index}
                cart={shoppingCart || []}
                setCart={setCart}
                setCartItem={setCartItem(index)}
                setCartItemField={setCartItemField(index)}
                cartPricing={cartPricing}
                {...{ history, index }}
              />
            )
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
}