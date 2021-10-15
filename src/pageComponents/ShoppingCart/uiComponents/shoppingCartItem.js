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
import CustomerPartModal from '../../_common/modals/CustomerPartModal'
import QuantityInput from 'pageComponents/_common/form/quantityInput'
import AirlineChip from 'pageComponents/_common/styledComponents/AirlineChip'
import DispositionModal from './DispositionModal'
import LocationsModal from '../../_common/modals/LocationsModal'
import DatePicker from 'react-datepicker'
import { Checkbox, Grid } from '@material-ui/core'
import { format, sub } from 'date-fns'

const DivContainer = styled.div`
	display: flex;
	border-top: 2px whitesmoke solid;
	border-bottom: 2px whitesmoke solid;
	padding: 8px 16px;
	margin: 8px 0;
    max-width: calc(100vw - 25px);
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
    flex-wrap: wrap;
	align-items: center;
    justify-content: center;
	width: 100%;
    @media(max-width: 768px) {
        flex-wrap: wrap;
    }
    @media(max-width: 1024px) {
        justify-content: flex-start;
    }
`

const DivItemInfo = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
    @media(max-width: 1024px) {
        justify-content: flex-end;
        flex-wrap: wrap;
    }
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
	margin: 0;
	border-radius: 50px;
	color: #328EFC;
	height: 20px;
	font-size: 12px;
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
    flex-wrap: wrap;
    max-width: 100px;
	width: 100%;
    max-height: 100px;
    height: 100%;
`

const DivCol2 = styled.div`
	display: flex;
    flex-wrap: wrap;
	flex-direction: column;
	align-items: flex-start;
	width: 300px;
	height: 100%;
	margin: 0 30px 0 50px;
	p {
		font-size: 16px;
		margin: 0;
	}
    @media(max-width: 575px) {
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

const DivImgAndItemDetails = styled.div`
    display: flex;
    margin: 30px 0;
    @media(max-width: 540px) {
        flex-wrap: wrap;
    }
`
const DivFlex = styled.div`
    display: flex;
`
const LineNumber = styled.div`
    margin: 0 5px;
    color: grey;
` 
export default function ShoppingCartItem(props) {

    const {
        setCart,
        cartItem,
        setCartItem,
        setCartItemField,
        index,
        history,
        setIsDragDisabled,
        provided,
        cartData
    } = props

    const { impersonatedCompanyInfo } = useContext(Context)

    const itemDetails = cartData?.itemDetails.find(detail => detail.invMastUid === cartItem.invMastUid)
    const itemPriceInfo = cartData?.itemPrices.find(price => price.invMastUid === cartItem.invMastUid)
    const itemAvailability = cartData?.availabilities.find(a => a.invMastUid === cartItem.invMastUid)
    const itemCustomerPartNumbers = cartData?.customerPartNumbers.filter(p => p.invMastUid === cartItem.invMastUid)
    const itemSourceLocations = cartData?.sourceLocations.filter(l => l.invMastUid === cartItem.invMastUid)

    const {
        unitPrice,
        unitOfMeasure,
        unitSize,
        roundType,
        spaType,
        spaNumber,
        spaMargin,
        spaCost
    } = itemPriceInfo || {}

    const [selectedCustomerPartNumber, setSelectedCustomerPartNumber] = useState(cartItem.customerPartNumberId || 0)

    const dispositions = [
        { value: '', text: 'Stock' },
        { value: 'B', text: 'Backorder' },
        { value: 'D', text: 'Direct Ship' },
        { value: 'H', text: 'Hold' },
        { value: 'S', text: 'Special Order' }
    ]

    const getDefaultDisposition = () => {
        return itemAvailability?.totalQuantity > itemAvailability?.availability ? 'Backorder' : 'Stock'
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
    const itemId = parseInt(cartItem.invMastUid, 10)
    const tomorrowDate = new Date()
    const maxDate = new Date('01 Jan 2970 00:00:00 GMT')
    tomorrowDate.setDate(tomorrowDate.getDate() + 1)
    const currentDate = format(new Date, 'M/d/yyyy')
    const beginningDate = format(sub(new Date(), { years: 1 }), 'M/d/yyyy')

    useEffect(() => {
        if (showSplitLineModal || factoryStockModalData || showCustomerPartModal || showSourceLocationModal || showDispositionModal || showEditPriceModal) {
            setIsDragDisabled(true)
        } else {
            setIsDragDisabled(false)
        }
    }, [showSplitLineModal, factoryStockModalData, showCustomerPartModal, showSourceLocationModal, showDispositionModal, showEditPriceModal])

    const { userInfo } = useContext(Context)

    function selectCustomerPartNumber(value) {
        if (value === '-1') {
            setSelectedCustomerPartNumber(0) // Reset Dropdown
            setCartItemField('customerPartNumberId', 0)
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
            invMastUid: itemId
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

    const handleQuoteItemReset = () => {
        setCartItem({ ...cartItem, quantity: cartItem.quoteLineQuantity, itemUnitPriceOverride: null, priceReasonId: null })
    }

    const handleDropshipChange = ({ target: { checked } }) => setCartItemField('isDropship', checked)

    const backgroundColor = cartItem.isQuoteLineActive ? '#13375226' : 'white'

    return (
        <DivContainer>
            {
                !itemDetails
                    ? <p>{cartItem.invMastUid}</p>
                    : (
                        <DivFlex style={{ backgroundColor: backgroundColor }}>
                            <DivCard>
                                <DivImgAndItemDetails>
                                    <DivMove
                                        {...provided.dragHandleProps}
                                    >
                                        <LineNumber>{index + 1}</LineNumber>
                                        <FontAwesomeIcon icon="grip-lines" color="lightgrey" />
                                    </DivMove>
                                    <DivCol1>
                                        <Img src={getThumbnailImagePath(itemDetails)} />
                                    </DivCol1>
                                    <DivCol2>
                                        <A1 onClick={() => { history.push(`/product/${itemDetails.itemCodeUrlSanitized}/${itemDetails.invMastUid}`) }}>{itemDetails.itemDesc}</A1>
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
                                        {userInfo && !userInfo.isAirlineEngineerUser && (
                                            <CustomerPartModal
                                                open={showCustomerPartModal}
                                                setOpen={() => setShowCustomerPartModal(false)}
                                                invMastUid={cartItem?.invMastUid}
                                                customerPartNumbers={itemCustomerPartNumbers}
                                                selectedCustomerPartNumber={selectedCustomerPartNumber}
                                                selectCustomerPartNumber={selectCustomerPartNumber}
                                                clearCustomerPartNumber={clearCustomerPartNumber}
                                            />
                                        )}

                                        <LocationsModal
                                            invMastUid={itemDetails.invMastUid}
                                            availabilityInfo={itemAvailability}
                                            unitPrice={unitPrice}
                                        />

                                        <DivRow>
                                            <DivSplitLine onClick={() => setShowSplitLineModal(true)}>Split Line</DivSplitLine>
                                            {userInfo && userInfo.isAirlineEmployee && (
                                                <>
                                                    <DivSplitLine>|</DivSplitLine>
                                                    <DivSplitLine onClick={handleShowFactoryStockModal}>Factory Stock</DivSplitLine>
                                                </>
                                            )}
                                            {userInfo && !userInfo.isAirlineEmployee && (
                                                <>
                                                    <DivSplitLine>|</DivSplitLine>
                                                    <DivSplitLine onClick={() => setShowCustomerPartModal(true)}>Custom Part No.</DivSplitLine>
                                                </>
                                            )}
                                        </DivRow>
                                        {(userInfo?.isAirlineEmployee || userInfo?.isWebUser) && (cartItem.quoteLineId) && (
                                            <>
                                                {
                                                    cartItem.isQuoteLineActive
                                                        ? (<strong>Quote Item</strong>)
                                                        : (
                                                            <button onClick={() => { handleQuoteItemReset() }}>Reset Quote Item</button>
                                                        )
                                                }
                                            </>
                                        )}

                                    </DivCol2>
                                </DivImgAndItemDetails>
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
                                                                padding: '0 0.5rem'
                                                            }}
                                                            >
                                                                X {unitSize}
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
                                                            value={cartItem.itemUnitPriceOverride !== null ? cartItem.itemUnitPriceOverride : (cartItem.itemUnitPrice || 0)}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            prefix={'$'}
                                                            decimalScale={2}
                                                            fixedDecimalScale
                                                        />
                                                        <span>{`/${unitOfMeasure || ''}`}</span>
                                                        {userInfo?.isAirlineEmployee && (
                                                            <EditPriceIcon onClick={handleShowEditPriceModal}>
                                                                <FontAwesomeIcon icon="pencil-alt" color={cartItem.itemUnitPriceOverride !== null ? '#328EFC' : 'grey'} />
                                                            </EditPriceIcon>
                                                        )}
                                                    </EditPriceDiv>
                                                </div>
                                                {cartItem?.itemTotalTariff > 0 && (
                                                    <div style={{ display: 'flex', fontSize: '0.85rem' }}>
                                                        <span>Tariff:
                                                            <NumberFormat
                                                                value={cartItem.itemTotalTariff}
                                                                displayType={'text'}
                                                                thousandSeparator={true}
                                                                prefix={'$'}
                                                                decimalScale={2}
                                                                fixedDecimalScale
                                                            />
                                                        </span>
                                                    </div>
                                                )}
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
                                                        {userInfo.isImpersonatorUser && (
                                                            <div style={{ display: 'flex', fontSize: '0.85rem' }}>
                                                                <a target='_' href={`https://p21wc.airlinehyd.com/common/itemsummarylines.aspx?CompanyId=AIRLINE&CustomerId=${impersonatedCompanyInfo.customerIdP21}&ItemId=${itemDetails.itemCode}&CurrentDate=${currentDate}%20AM&BeginningDate=${beginningDate}&ShowComponents=False&ProductGroupId=&SupplierId=0&CustomerName=${impersonatedCompanyInfo.customerName}`}>Previous Purchases</a>
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </DivItemPrice>

                                        </DivItem>
                                        <DivItem>
                                            <DivTotalPrice>
                                                <p>
                                                    {
                                                        cartItem.itemUnitPriceOverride === null ? (
                                                            <NumberFormat
                                                                value={(cartItem.itemUnitPrice ? cartItem.itemUnitPrice : 0.0).toFixed(2) * cartItem.quantity}
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

                                    {userInfo?.isAirlineEmployee && (
                                        <>
                                            <Grid container alignItems="center">
                                                <Label>Is Dropship?: </Label>
                                                <Checkbox
                                                    style={{ padding: 3 }}
                                                    size="small"
                                                    checked={cartItem.isDropship}
                                                    onChange={(event) => { handleDropshipChange(event) }}
                                                />
                                            </Grid>

                                            <DivItem>
                                                <Label>Promise Date:</Label>
                                            </DivItem>

                                            <Grid container>
                                                <div style={{ marginRight: 8 }}>
                                                    <FontAwesomeIcon icon="calendar" color="lightgrey" />
                                                </div>

                                                <DatePicker
                                                    minDate={tomorrowDate}
                                                    maxDate={maxDate}
                                                    selected={Date.parse(cartItem.promiseDateOverride || cartItem.promiseDate)}
                                                    onChange={(value) => setCartItemField('promiseDateOverride', value)}
                                                />
                                            </Grid>
                                        </>
                                    )}

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

                            </DivCard>

                            <DivRemove onClick={handleRemoveItem} alt='remove-item'>
                                <FontAwesomeIcon icon="times-circle" color="lightgrey" />
                            </DivRemove>
                        </DivFlex>
                    )
            }

            <EditPriceModal
                open={!!showEditPriceModal}
                hideEditPriceModal={() => setShowEditPriceModal(null)}
                data={{
                    originalItemPrice: cartItem.itemUnitPriceOriginal,
                    itemPrice: cartItem.itemUnitPriceOverride !== null ? cartItem.itemUnitPriceOverride : cartItem.itemUnitPrice,
                    spaType: spaType,
                    spaNumber: spaNumber,
                    spaCost: spaCost,
                    spaMargin: spaMargin,
                    airlineCost: cartItem.airlineCost, /*Airline cost only comes from the shopping cart, when authorized */
                    priceReasonId: cartItem.priceReasonId,
                    cartItem
                }}
                setCartItem={setCartItem}
                itemId={itemDetails.itemCode}
            />
            <SplitLineModal
                open={showSplitLineModal}
                hideSplitLineModal={() => setShowSplitLineModal(false)}
                {...{ setCart, index, itemDetails, itemPriceInfo }}
            />
            <FactoryStockModal
                open={!!factoryStockModalData}
                hideFactoryStockModal={() => setFactoryStockModalData(null)}
                product={factoryStockModalData}
            />
            <SourceLocationModal
                open={showSourceLocationModal}
                hide={() => setShowSourceLocationModal(false)}
                sourceLocations={itemSourceLocations}
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
