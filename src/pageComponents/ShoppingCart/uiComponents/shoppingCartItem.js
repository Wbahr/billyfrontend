import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Context from '../../../setup/context'
import DebounceInput from 'react-debounce-input'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import NumberFormat from 'react-number-format'
import { getThumbnailImagePath } from 'pageComponents/_common/helpers/generalHelperFunctions'
import FactoryStockModal from './factoryStockModal'
import EditPriceModal from './editPriceModal'
import SplitLineModal from './splitLineModal'
import SourceLocationModal from './SourceLocationModal'
import CustomerPartModal from './editCustomerPartModal'
import QuantityInput from 'pageComponents/_common/form/quantityInput'
import AirlineChip from 'pageComponents/_common/styledComponents/AirlineChip'
import DispositionModal from './DispositionModal'
import LocationsModal from '../../_common/modals/LocationsModal'

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

const DivItemQuantity = styled.div`
	min-width: 94px;
`

const DivItemPrice = styled.div`
	min-width: 190px;
	padding-left: 10px;
`

const DivCard = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
`

const DivItemInfo = styled.div`
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
	margin: 0 30px 0 50px;
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

const EditPriceDiv = styled.div`
	display: flex;
`

const EditPriceIcon = styled.div`
	cursor: pointer;
	margin-left: 8px;
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

export default function ShoppingCartItem(props) {

    const {
        cart,
        setCart,
        cartItem,
        setCartItem,
        setCartItemField,
        index,
        itemDetails,
        priceInfo,
        availabilityInfo,
        customerPartNumbers,
        sourceLocations,
        history,
        setIsDragDisabled
    } = props

    const {
        unitOfMeasure,
        unitSize,
        roundType
    } = priceInfo || {}

    const [selectedCustomerPartNumber, setSelectedCustomerPartNumber] = useState(cartItem.customerPartNumberId || 0)

    const dispositions = [
        { value: '', text: 'Stock' },
        { value: 'B', text: 'Backorder' },
        { value: 'D', text: 'Direct Ship' },
        { value: 'H', text: 'Hold' },
        { value: 'S', text: 'Special Order' }
    ]

    const getDefaultDisposition = () => {
        return availabilityInfo?.totalQuantity > availabilityInfo?.availability ? 'Backorder' : 'Stock'
    }

    useEffect(() => {
        setSelectedCustomerPartNumber(cartItem.customerPartNumberId)
    }, [cartItem])

    const [showEditPriceModal, setShowEditPriceModal] = useState(null)
    const [showSplitLineModal, setShowSplitLineModal] = useState(false)
    const [factoryStockModalData, setFactoryStockModalData] = useState(false)
    const [showCustomerPartModal, setShowCustomerPartModal] = useState(false)
    const [showSourceLocationModal, setShowSourceLocationModal] = useState(false)
    const [showDispositionModal, setShowDispositionModal] = useState(false)
    const itemId = parseInt(cartItem.frecno, 10)

    useEffect(() => {
        if (showSplitLineModal || factoryStockModalData || showCustomerPartModal || showSourceLocationModal || showDispositionModal || showEditPriceModal) {
            setIsDragDisabled(true)
        } else {
            setIsDragDisabled(false)
        }
    }, [showSplitLineModal, factoryStockModalData, showCustomerPartModal, showSourceLocationModal, showDispositionModal, showEditPriceModal])

    const { userInfo } = useContext(Context)

    function selectCustomerPartNumber(value){
        if (value === '-1') {
            setSelectedCustomerPartNumber(0) // Reset Dropdown
            setCartItemField('customerPartNumberId', 0)
            setShowCustomerPartModal(true)
        } else {
            setSelectedCustomerPartNumber(value)
            setCartItemField('customerPartNumberId', Number(value))
        }
    }

    function clearCustomerPartNumber() {
        setSelectedCustomerPartNumber(0)
        setCartItemField('customerPartNumberId', 0)
    }

    const handleShowFactoryStockModal = () => {
        setFactoryStockModalData({
            name: itemDetails?.itemDesc,
            frecno: itemId
        })
    }

    const handleShowEditPriceModal = () => {
        setShowEditPriceModal(true)
    }

    const handleShowSourceLocModal = () => {
        setShowSourceLocationModal(true)
    }

    const handleShowDispositionModal = () => {
        setShowDispositionModal(true)
    }

    const setQuantityHandler = (qty) => {
        setCartItem({ ...cartItem, quantity: qty })
    }

    const handleUpdateItemNotes = ({ target: { value } }) => {
        setCartItem({ ...cartItem, itemNotes: value })
    }

    const handleRemoveItem = () => {
        setCartItem(null)
    }

    return (
        <DivContainer>
            {
                !itemDetails
                    ? <p>{cartItem.frecno}</p>
                    : (
                        <DivCard>
                            <DivMove>
                                <FontAwesomeIcon icon="grip-lines" color="lightgrey"/>
                            </DivMove>
                            <DivCol1>
                                <Img src={getThumbnailImagePath(itemDetails)} />
                            </DivCol1>
                            <DivCol2>
                                <A1 onClick={() => {history.push(`/product/${itemDetails.itemCodeUrlSanitized}/${itemDetails.invMastUid}`)}}>{itemDetails.itemDesc}</A1>
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
                                {userInfo && (
                                    <TextRow>
                                        <select value={selectedCustomerPartNumber || 0} onChange={e => selectCustomerPartNumber(e.target.value)} >
                                            <option value="0">Customer Part#</option>
                                            {
                                                customerPartNumbers?.map(elem =>
                                                    <option key={elem.id} value={elem.id}>{elem.customerPartNumber}</option>
                                                )
                                            }
                                            <option value="-1">Create Part#</option>
                                        </select>
                                        { selectedCustomerPartNumber !== 0 && (
                                            <div style={{ marginLeft: '8px', cursor: 'pointer' }} onClick={clearCustomerPartNumber}>
                                                <FontAwesomeIcon icon="times" color="grey" />
                                            </div>
                                        )}
                                    </TextRow>
                                )}

                                <LocationsModal
                                    invMastUid={itemDetails.invMastUid}
                                    availabilityInfo={availabilityInfo}
                                    unitPrice={priceInfo?.unitPrice}
                                />

                                <DivRow>
                                    <DivSplitLine onClick={() => setShowSplitLineModal(true)}>Split Line</DivSplitLine>
                                    <DivSplitLine>|</DivSplitLine>
                                    <DivSplitLine onClick={handleShowFactoryStockModal}>Factory Stock</DivSplitLine>
                                    <DivSplitLine>|</DivSplitLine>
                                    <DivSplitLine onClick={() => setShowCustomerPartModal(true)}>Custom Part No.</DivSplitLine>
                                </DivRow>
                            </DivCol2>
                            <DivCol3>
                                <DivItemInfo>
                                    <DivItem>
                                        <DivItemQuantity>
                                            <div>
                                                <Label>Qty:</Label>
                                                {
                                                    (unitSize > 1) && (
                                                        <AirlineChip style={{
                                                            marginLeft: '0.5rem',
                                                            fontSize: '0.7rem',
                                                            padding: '0 0.5rem' }}
                                                        >
                                                            X {unitSize }
                                                        </AirlineChip>
                                                    )
                                                }
                                            </div>

                                            <div>
                                                <QuantityInput
                                                    quantity={cartItem.quantity}
                                                    unitSize={unitSize}
                                                    unitOfMeasure={unitOfMeasure}
                                                    roundType={roundType}
                                                    handleUpdate={setQuantityHandler}
                                                    min='0'
                                                    debounce
                                                />
                                            </div>
                                        </DivItemQuantity>
                                    </DivItem>
                                    <DivItem>
                                        <DivItemPrice>
                                            <div>
                                                <EditPriceDiv>
                                                    <NumberFormat
                                                        value={cartItem.itemUnitPriceOverride || priceInfo?.unitPrice || 0}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        prefix={'$'}
                                                        decimalScale={2}
                                                        fixedDecimalScale
                                                    />
                                                    <span>{`/${unitOfMeasure || ''}`}</span>
                                                    {userInfo?.isAirlineEmployee && (
                                                        <EditPriceIcon onClick={handleShowEditPriceModal}>
                                                            <FontAwesomeIcon icon="pencil-alt" color={cartItem.itemUnitPriceOverride ? '#328EFC' : 'grey'} />
                                                        </EditPriceIcon>
                                                    )}
                                                </EditPriceDiv>
                                            </div>
                                            {userInfo?.isAirlineEmployee && (
                                                <>
                                                    <div style={{ display: 'flex', fontSize: '0.85rem' }}>
                                                        <span>Source Loc: {cartItem.sourceLocId || 'Any'}</span>
                                                        <EditPriceIcon onClick={handleShowSourceLocModal}>
                                                            <FontAwesomeIcon icon="pencil-alt" color={cartItem.sourceLocId ? '#328EFC' : 'grey'} />
                                                        </EditPriceIcon>
                                                    </div>
                                                    <div style={{ display: 'flex', fontSize: '0.85rem' }}>
                                                        <span>Disposition: {dispositions?.filter(d => d.value === cartItem.disposition)[0]?.text || getDefaultDisposition()}</span>
                                                        <EditPriceIcon onClick={handleShowDispositionModal}>
                                                            <FontAwesomeIcon icon="pencil-alt" color={cartItem.disposition ? '#328EFC' : 'grey'} />
                                                        </EditPriceIcon>
                                                    </div>
                                                </>
                                            )}
                                        </DivItemPrice>

                                    </DivItem>
                                    <DivItem>
                                        <DivTotalPrice>
                                            <p>
                                                {
                                                    !cartItem.itemUnitPriceOverride ? (
                                                        <NumberFormat
                                                            value={(priceInfo?.unitPrice ? priceInfo.unitPrice : 0.0).toFixed(2) * cartItem.quantity}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            prefix={'$'}
                                                            decimalScale={2}
                                                            fixedDecimalScale
                                                        />
                                                    ) : (
                                                        <NumberFormat
                                                            value={cartItem.itemUnitPriceOverride * cartItem.quantity}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            prefix={'$'}
                                                            decimalScale={2}
                                                            fixedDecimalScale
                                                        />
                                                    )
                                                }
                                            </p>
                                        </DivTotalPrice>
                                    </DivItem>
                                </DivItemInfo>
                                <DivItemInfo>
                                    <DivItem>
                                        <Label>Item Notes:</Label>
                                        <DebounceInput
                                            placeholder='Type item notes here'
                                            minLength={0}
                                            debounceTimeout={300}
                                            onChange={handleUpdateItemNotes}
                                            style={{ width: 300 }}
                                            value={cartItem.itemNotes || ''}
                                        />
                                    </DivItem>
                                </DivItemInfo>
                            </DivCol3>
                            <DivRemove onClick={handleRemoveItem} alt='remove-item'>
                                <FontAwesomeIcon icon="times-circle" color="lightgrey"/>
                            </DivRemove>
                        </DivCard>
                    )
            }

            <EditPriceModal
                open={!!showEditPriceModal}
                hideEditPriceModal={() => setShowEditPriceModal(null)}
                data={{
                    originalItemPrice: priceInfo?.unitPrice,
                    itemPrice: cartItem.itemUnitPriceOverride ? cartItem.itemUnitPriceOverride : priceInfo?.unitPrice,
                    spaType: priceInfo?.spaType,
                    airlineCost: cartItem.airlineCost, /*Airline cost only comes from the shopping cart, when authorized */
                    priceReasonId: cartItem.priceReasonId,
                    cartItem
                }}
                setCartItem={setCartItem}
            />
            <SplitLineModal
                open={showSplitLineModal}
                hideSplitLineModal={() => setShowSplitLineModal(false)}
                {...{ cart, setCart, index, itemDetails, priceInfo }}
            />
            <FactoryStockModal
                open={!!factoryStockModalData}
                hideFactoryStockModal={() => setFactoryStockModalData(null)}
                product={factoryStockModalData}
            />
            <CustomerPartModal
                open={showCustomerPartModal}
                hideCustomerPartModal={() => setShowCustomerPartModal(false)}
                invMastUid={cart?.[index].frecno}
                {...{ index, cartItem, setCartItem, selectCustomerPartNumber }}
            />
            <SourceLocationModal
                open={showSourceLocationModal}
                hide={() => setShowSourceLocationModal(false)}
                sourceLocations={sourceLocations}
                {...{ cartItem, setCartItem }}
            />

            <DispositionModal
                open={showDispositionModal}
                hide={() => setShowDispositionModal(false)}
                dispositions={dispositions}
                {...{ cartItem, setCartItem }}
            />
        </DivContainer>
    )
}
