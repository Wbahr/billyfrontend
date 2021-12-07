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
import DatePicker from 'react-datepicker'
import DispositionModal from './DispositionModal'
import NoteModal from './NoteModal'
import { useDebounceValue } from '../../_common/helpers/generalHelperFunctions'
import { GET_CART_DATA } from 'setup/gqlQueries/gqlCartQueries'
import { GET_SUPPLIERS } from '../../../setup/providerGQL'

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

const EditPriceIcon = styled.div`
	cursor: pointer;
	margin-left: 8px;
`

export default function ShoppingCart({ history }) {
    const {
        cart,
        emptyCart,
        userInfo,
        updateShoppingCart,
        cartPricing,
        setItemPrices,
        showErrorModal,
        setShowErrorModal
    } = useContext(Context)

    const [shoppingCart, setShoppingCart] = useState(cart || [])
    const [showDispositionModal, setShowDispositionModal] = useState(false)
    const [showPromiseEdit, setShowPromiseEdit] = useState(false)
    const [showShoppingListModal, setShowShoppingListModal] = useState(false)
    const [cartData, setCartData] = useState(null)
    const [noteModal, setNoteModal] = useState(null)
    const debouncedCart = useDebounceValue(cart, 1000)
    const [supplierOptions, setSupplierOptions] = useState([])
    const dispositions = [
        { value: '', text: 'Stock' },
        { value: 'B', text: 'Backorder' },
        { value: 'D', text: 'Direct Ship' },
        { value: 'H', text: 'Hold' },
        { value: 'S', text: 'Special Order' }
    ]

    const [getSuppliers] = useLazyQuery(GET_SUPPLIERS, {
        fetchPolicy: 'no-cache',
        onCompleted: result => {
            const mappedOptions = result.allSuppliers.map(o => {
                return { value: o.id, label: `${o.id}, ${o.name}`, key: o.id }
            })
            setSupplierOptions(mappedOptions)
        }
    })
    
    useEffect(() => {
        if (userInfo?.isAirlineEmployee) {
            getSuppliers()
        }
    }, [])

    const todayDate = new Date().setDate(new Date().getDate())
    const maxDate = new Date('01 Jan 2970 00:00:00 GMT')

    const [getCartData] = useLazyQuery(GET_CART_DATA, {
        fetchPolicy: 'no-cache',
        onCompleted: data => {
            setCartData(data.cartData)
            setItemPrices(data.cartData.itemPrices)
        }
    })

    useEffect(() => {
        if (cart?.length) {
            const itemsAndQuantities = cart.map(({ invMastUid, quantity }) => ({ invMastUid, quantity: quantity }))
            getCartData({ variables: { itemsAndQuantities } })
        }
    }, [debouncedCart])

    function bulkUpdateCart(field, value) {
        const newCart = cart.map(item => {
            return {
                ...item,
                [field]: value
            }
        })
        updateShoppingCart(newCart)
    }

    function bulkUpdateDisposition({ disposition }) {
        bulkUpdateCart('disposition', disposition)
    }

    function bulkUpdatePromiseDate(date) {
        bulkUpdateCart('promiseDateOverride', date)
    }

    const handleSaveAsShoppingList = () => setShowShoppingListModal(true)

    function addNote(index, areas, note, noteIdx) {
        const newCart = shoppingCart.map((cartItem, idx) => {
            if (idx === index) {
                if (noteIdx) {
                    cartItem.extraNotes[noteIdx] = { note, targetAreas: areas }
                } else {
                    cartItem.extraNotes = cartItem?.extraNotes ? 
                        [...cartItem.extraNotes, { note, targetAreas: areas }] : 
                        [{ note, targetAreas: areas }] 
                }
            } 
            return cartItem
        })
        setShoppingCart(newCart)
        updateShoppingCart(newCart)
    }

    function removeNote(index, noteIdx) {
        const newCart = shoppingCart.map((cartItem, idx) => {
            if (idx === index) {
                cartItem.extraNotes = cartItem.extraNotes.filter((n, i) => i !== noteIdx)
            }
            return cartItem
        })
        setShoppingCart(newCart)
        updateShoppingCart(newCart)
    }

    return (
        <>
            <Div>
                <DivRow>
                    <H3>Shopping Cart</H3>
                    <p onClick={emptyCart}>(empty cart)</p>
                </DivRow>
                {userInfo?.isAirlineEmployee && (
                    <>
                        <DivRow>
                            <div style={{ display: 'flex', alignItems: 'flex-end', fontSize: '0.85rem' }}>
                                <span>All Dispositions</span>
                                <EditPriceIcon onClick={() => setShowDispositionModal(true)}>
                                    <FontAwesomeIcon icon="pencil-alt" color='#328EFC' />
                                </EditPriceIcon>
                            </div>
                        </DivRow>
                        <DivRow>
                            <div style={{ display: 'flex', alignItems: 'flex-end', fontSize: '0.85rem' }}>
                                {showPromiseEdit ? (
                                    <>
                                        <div style={{ marginRight: 8 }}>
                                            <FontAwesomeIcon icon="calendar" color="lightgrey" />
                                        </div>
                                        <DatePicker
                                            minDate={todayDate}
                                            maxDate={maxDate}
                                            selected={Date.parse(cart[0]?.promiseDateOverride || cart[0]?.promiseDate)}
                                            onChange={(value) => bulkUpdatePromiseDate(value)}
                                        />
                                    </>
                                ) :
                                    <span>All Promise Dates</span>
                                }
                                <EditPriceIcon onClick={() => setShowPromiseEdit(!showPromiseEdit)}>
                                    <FontAwesomeIcon icon="pencil-alt" color='#328EFC' />
                                </EditPriceIcon>
                            </div>
                        </DivRow>
                    </>
                )}
                <DivRow>
                    {userInfo ? (
                        <DivSave onClick={handleSaveAsShoppingList}>
                            <Ashare>Save As Shopping List</Ashare>
                            <FontAwesomeIcon icon="list" color="grey" />
                        </DivSave>
                    ) : <Ashare />}

                    {userInfo && <MergeCartModal />}
                </DivRow>
            </Div>
            <CartComponent
                {
                    ...{
                        history,
                        cart,
                        updateShoppingCart,
                        cartPricing,
                        cartData,
                        dispositions,
                        todayDate,
                        maxDate,
                        supplierOptions,
                        setNoteModal,
                        shoppingCart,
                        setShoppingCart
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
            <DispositionModal
                open={showDispositionModal}
                hide={() => setShowDispositionModal(false)}
                dispositions={dispositions}
                cartItem={{ disposition: null }}
                setCartItem={bulkUpdateDisposition}
            />
            <NoteModal
                addNote={addNote}
                removeNote={removeNote}
                values={noteModal} 
                open={noteModal !== null}
                hide={() => setNoteModal(null)}
                lineNoteAreas={cartData?.lineNoteAreas}
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
        cartData,
        dispositions,
        supplierOptions,
        todayDate,
        maxDate,
        setNoteModal,
        shoppingCart,
        setShoppingCart
    } = props

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

        return (
            <Fragment key={index}>
                {(cartData && cartItem.uniqueId) ? (
                    <Draggable
                        key={index}
                        draggableId={String(index)}
                        index={index}
                        isDragDisabled={!cartData || isDragDisabled}
                    >
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                            >
                                <ShoppingCartItem
                                    key={index}
                                    cartData={cartData}
                                    setCartItem={setCartItem(index)}
                                    setCartItemField={setCartItemField(index)}
                                    {...{
                                        history, index, setIsDragDisabled, setCart, cartItem, cartPricing, provided,
                                        dispositions, todayDate, maxDate, supplierOptions, setNoteModal
                                    }}
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
