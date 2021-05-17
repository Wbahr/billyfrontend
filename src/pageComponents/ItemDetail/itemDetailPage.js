import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useLazyQuery } from '@apollo/client'
import Loader from '../_common/loader'
import AccessoryItem from './uiComponents/accessoryItem'
import AddedModal from '../SearchResults/uiComponents/addedModal'
import Context from '../../setup/context'
import AddToShoppingListModal from '../_common/modals/AddToShoppingListModal'
import { GET_ITEM_PRICE } from 'setup/providerGQL'
import { getOriginalImagePath, getAltTextForOriginalImage, buildSearchString } from 'pageComponents/_common/helpers/generalHelperFunctions'
import { GET_ITEM_DETAIL_PAGE_ITEM_INFO, GET_ACCESSORY_ITEMS_INFO } from 'setup/gqlQueries/gqlItemQueries'
import LocationsModal from '../_common/modals/LocationsModal'
import QuantityInput from 'pageComponents/_common/form/quantityInput'
import AirlineChip from 'pageComponents/_common/styledComponents/AirlineChip'
import { Detail1 as SkeletonLine, Title as SkeletonTitle } from '../SearchResults/uiComponents/skeletonItem'
import CustomerPartModal from '../_common/modals/CustomerPartModal'
import { Helmet } from 'react-helmet'
import { productSchema } from '../_common/richSearchSchemas/productSchema'
import { breadcrumbSchema } from '../_common/richSearchSchemas/breadcrumbSchema'

const ItemDetailPageContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`

const DivPhoto = styled.div`
	min-width: 200px;
	max-width: 400px;
	max-height: 400px;
	margin: 0 8px;
	text-align: center;
`

const Img = styled.img`
	max-height:100%;
	max-width:100%;
`

const DivDetails = styled.div`
	flex: 1;
	width: 500px;
	padding: 0 16px;
`

const DivPurchaseInfo = styled.div`
	position: -webkit-sticky;
	position: sticky;
	top: 125px;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	margin: 30px 8px 0 12px;
	padding: 8px 16px;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`

const DivLeftCol = styled.div`
	display: flex;
 	flex-direction: column;
 	max-width: 400px;
 	align-items: center;
 	padding: 0 16px;
 	margin-bottom: 16px;
`

const DivPurchaseInfoButtons = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
	margin: 16px 0;
`

const Row = styled.div`
	display: flex;
	align-items: flex-end;
`

const RowCentered = styled.div`
	display: flex;
	justify-content: center;
`

const P = styled.p`
	margin: 0;
`

const H2 = styled.h2`
	margin: 12px 0 0 0;
	font-weight: 600;
`

const DivSection = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 24px;
`

const DivTitle = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	margin: 16px;
`

const DivAccessoryItems = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
`

const H1ItemTitle = styled.h1`
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
		box-shadow: 0 0 1px #000;
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

const H3 = styled.h3`
  font-size: 18px;
  margin: 0;
`

const TDWhite = styled.td`
    padding: 4px 24px 4px 8px;
`

const IMG = styled.img`
	opacity: 0.6;
`

export default function ItemDetailPage({ history }) {
    const { 
        userInfo, 
        addItem, 
        itemDetails: cachedDetails, 
        itemPrices: cachedPrices, 
        getItemPrices, 
        itemAvailabilities: cachedAvailabilities, 
        customerPartNumbers: cachedCustomerPartNumbers,
        stockAvailabilities,
        getStocks 
    } = useContext(Context)

    const { itemId, customerPartNumber, item } = useParams()
    const invMastUid = parseInt(itemId)
    const [accessoryItems, setAccessoryItems] = useState([])
    const [accessoryItemPrices, setAccessoryItemPrices] = useState([])
    const [accessoryItemsInfo, setAccessoryItemsInfo] = useState({})
    const [quantity, setQuantity] = useState(1)

    const cachedItemPrice = cachedPrices.find(price => price.invMastUid === invMastUid)
    const {
        unitOfMeasure,
        unitSize,
        roundType,
        unitPrice
    } = cachedItemPrice || { unitPrice: 0 }
    
    const [selectedCustomerPartNumber, selectCustomerPartNumber] = useState(customerPartNumber || null)
    const [showShowAddedToCartModal, setShowAddedToCartModal] = useState(false)
    const [showAddListModal, setShowAddListModal] = useState(false)

    function handleAddedToCart() {
        setShowAddedToCartModal(false)
    }

    useEffect(() => {
        selectCustomerPartNumber(customerPartNumber || null)
        getItemInfo()
    }, [userInfo])

    const cachedItemDetails = cachedDetails.find(detail => detail.invMastUid === invMastUid)

    const [ getItemInfo, { data: itemInfo }] = useLazyQuery(GET_ITEM_DETAIL_PAGE_ITEM_INFO, {
        variables: { invMastUid },
        fetchPolicy: 'no-cache',
        onCompleted: result => {
            const details = result.itemDetails
            if (!cachedItemPrice) getItemPrices([details])

            //If there are accessory items attached to this item, query for their details
            if (details.associatedItems.length){
                
                setAccessoryItems(details.associatedItems)

                //Build the price request objects
                const accessoryItemPriceRequests = details.associatedItems.map(i => {
                    return {
                        invMastUid: i.associatedInvMastUid,
                        quantity: 1
                    }
                })

                queryAccessoryItemPrices({
                    variables: {
                        items: accessoryItemPriceRequests
                    }
                })

                queryAccessoryItemsInfo({
                    variables: {
                        invMastUids: details.associatedItems.map(i => i.associatedInvMastUid)
                    }
                })
            } else {
                setAccessoryItems([])
            }
        }
    })

    useEffect(() => {
        if (accessoryItems.length){
            const itemsWithoutStockInfo = accessoryItem => 
                !stockAvailabilities.some(stock => stock.invMastUid === accessoryItem.associatedInvMastUid)

            const filteredAccessoryItems = accessoryItems
                .filter(itemsWithoutStockInfo)
                .map(accessoryItem => ({ invMastUid: accessoryItem.associatedInvMastUid }))

            getStocks(filteredAccessoryItems)
        }
    }, [accessoryItems])

    const itemDetails = itemInfo?.itemDetails || cachedItemDetails

    useEffect(() => {
        document.title = `${itemDetails?.itemDesc || item} at Airline Hydraulics`
    }, [itemDetails])
    
    const cachedItemCustomerPartNumbers = cachedCustomerPartNumbers.filter(part => part.invMastUid === invMastUid)
    const distinctPart = (part, i, self) => self.findIndex(s => s.customerPartNumber === part.customerPartNumber)
    const customerPartNumbers = (itemInfo?.customerPartNumbers || []).concat(cachedItemCustomerPartNumbers || []).filter(distinctPart)
    const customerPartNumberId = selectedCustomerPartNumber && customerPartNumbers.find(cpn => cpn.customerPartNumber === selectedCustomerPartNumber)?.id
    const cachedItemAvailability = cachedAvailabilities.find(avail => avail.invMastUid === invMastUid)
    const itemAvailability = itemInfo?.itemAvailabilitySingular || cachedItemAvailability

    const [queryAccessoryItemPrices] = useLazyQuery(GET_ITEM_PRICE, {
        onCompleted: data => {
            setAccessoryItemPrices(data.getItemPrices)
        }
    })

    const [queryAccessoryItemsInfo] = useLazyQuery(GET_ACCESSORY_ITEMS_INFO, {
        onCompleted: ({ itemAvailability, itemDetailsBatch }) => {
            setAccessoryItemsInfo({ itemAvailability, itemDetailsBatch })
        }
    })

    const handleAddToCart = () => {
        addItem({
            invMastUid: invMastUid,
            quantity: parseInt(quantity, 10),
            itemNotes: null,
            itemUnitPriceOverride: null,
            customerPartNumberId: selectedCustomerPartNumber || null
        })
        setShowAddedToCartModal(true)
        setQuantity(1)
    }

    if (!itemDetails) {
        return (<Loader />)
    } else if (!itemDetails?.invMastUid) {
        return (<p>No item found</p>)
    } else {
        const FeatureItems = itemDetails.itemFeatures?.map((elem, idx) => <li key={idx}>{elem.text}</li>)
        const TechSpecItems = itemDetails.itemTechSpecs?.map((elem, idx) => (
            <TR key={idx}>
                <TD>{elem.name}</TD>
                <TD>{elem.value}</TD>
            </TR>
        ))

        const ItemLinks = itemDetails.itemLinks?.map((elem, idx) => <a href={elem.linkPath} key={idx}>{elem.title}</a>)
        const AccessoryItems = accessoryItems?.map((ai, idx) => {

            const details = accessoryItemsInfo?.itemDetailsBatch?.find(d => d.invMastUid === ai.associatedInvMastUid)
            const availability = accessoryItemsInfo?.itemAvailability?.find(a => a.invMastUid === ai.associatedInvMastUid)
            const price = accessoryItemPrices.find(p => p.invMastUid === ai.associatedInvMastUid)

            return (
                <AccessoryItem
                    key={idx}
                    itemDetails={details}
                    availability={availability}
                    price={price}
                    history={history}
                    setShowAddedToCartModal={setShowAddedToCartModal}
                    isParentCalculateStock={true}
                />
            )
        })

        const CustomerPartOptions = customerPartNumbers?.map((elem, idx) => (
            <option value={elem.id} key={idx}>{elem.customerPartNumber}</option>
        ))

        return (
            <ItemDetailPageContainer>
                <Helmet>
                    <title>Airline Hydraulics | {itemDetails.itemCode}</title>
                    <meta name="description" content={itemDetails.extendedDesc} />
                    {productSchema(itemDetails, cachedItemPrice, itemAvailability)}
                    {breadcrumbSchema([
                        {
                            name: itemDetails.brand?.name,
                            item: 'https://airlinehyd.com' + buildSearchString({ searchTerm: itemDetails.brand?.name })
                        },
                        {
                            name: itemDetails.itemCode
                        }
                    ])}
                </Helmet>
                
                <DivTitle>
                    <H1ItemTitle>{itemDetails.itemDesc}</H1ItemTitle>
                </DivTitle>

                <DivLeftCol>
                    <DivPhoto>
                        <Img src={getOriginalImagePath(itemDetails)} alt={getAltTextForOriginalImage(itemDetails)} />
                    </DivPhoto>

                    <DivPurchaseInfo>
                        <Row>
                            <Pprice>{!unitPrice ? '--' : `$${unitPrice.toFixed(2)}`}</Pprice>
                            <P> /{unitOfMeasure}</P>
                        </Row>

                        <LocationsModal
                            invMastUid={itemDetails?.invMastUid}
                            availabilityInfo={itemAvailability}
                            unitPrice={unitPrice}
                        />

                        <DivPurchaseInfoButtons>
                            <RowCentered>
                                <span>Qty:</span>
                                <QuantityInput
                                    quantity={quantity}
                                    unitSize={unitSize}
                                    unitOfMeasure={unitOfMeasure}
                                    roundType={roundType}
                                    handleUpdate={setQuantity}
                                    min='0'
                                />
                                {(unitSize > 1) && (
                                    <AirlineChip style={{ marginLeft: '0.5rem', fontSize: '0.9rem' }}>
                                        X {unitSize}
                                    </AirlineChip>
                                )}
                            </RowCentered>

                            {userInfo && !userInfo.isAirlineEngineerUser && (
                                <ButtonRed onClick={() => setShowAddListModal(true)}>Add to List</ButtonRed>
                            )}

                            {!!cachedItemPrice && <ButtonRed onClick={handleAddToCart}>Add to Cart</ButtonRed>}
                        </DivPurchaseInfoButtons>

                        {!!itemDetails.itemFeatures?.length && <a href='#feature'>Features</a>}
                        {!!itemDetails.itemTechSpecs?.length && <a href='#techspec'>Tech Specs</a>}
                        {accessoryItems?.length > 0 && <a href='#accessory'>Accessory</a>}
                    </DivPurchaseInfo>
                </DivLeftCol>

                <DivDetails>
                    <PItemExtendedDescription>{itemDetails.extendedDesc}</PItemExtendedDescription>

                    <Row>
                        <Pprice>{!unitPrice ? '--' : `Price: $${unitPrice.toFixed(2)}/${unitOfMeasure}`}</Pprice>

                        <LocationsModal
                            invMastUid={itemDetails?.invMastUid}
                            availabilityInfo={itemAvailability}
                            unitPrice={unitPrice}
                        />
                    </Row>

                    <TABLE>
                        <tbody>
                            <TR2><TDGrey><H3>Manufacturer</H3></TDGrey><TDWhite><IMG width='100px' src={itemDetails.brand?.logoLink} /></TDWhite></TR2>
                            <TR2><TDGrey><H3>Item ID</H3></TDGrey><TDWhite>{itemDetails.itemCode}</TDWhite></TR2>
                            <TR2><TDGrey><H3>Manufacturer Part #</H3></TDGrey><TDWhite>{itemDetails.mfgPartNo}</TDWhite></TR2>
                            <TR2><TDGrey><H3>AHC Part #</H3></TDGrey><TDWhite>{itemDetails.invMastUid}</TDWhite></TR2>

                            {!!CustomerPartOptions?.length && (
                                <TR2>
                                    <TDGrey><H3>Customer Part #</H3></TDGrey>
                                    <TDWhite>
                                        <CustomerPartModal
                                            invMastUid={invMastUid}
                                            selectedCustomerPartNumber={selectedCustomerPartNumber}
                                            selectCustomerPartNumber={selectCustomerPartNumber}
                                            clearCustomerPartNumber={selectCustomerPartNumber}
                                            customerPartNumbers={customerPartNumbers}
                                        />
                                    </TDWhite>
                                </TR2>
                            )}

                            <TR2>
                                <TDGrey><H3>Unit Size</H3></TDGrey>
                                <TDWhite>{itemDetails.unitSizeMultiple}</TDWhite>
                            </TR2>
                        </tbody>
                    </TABLE>

                    <hr />

                    {!!FeatureItems?.length && (
                        <>
                            <H2 id='feature'>Features</H2>
                            <ul>{FeatureItems}</ul>
                        </>
                    )}

                    {!!TechSpecItems?.length && (
                        <>
                            <H2 id='techspec'>Tech Specifications</H2>
                            <Table>
                                <tbody>{TechSpecItems}</tbody>
                            </Table>
                        </>
                    )}

                    {itemDetails.itemLinks?.length > 0 && <H2>Links</H2>}
                    <DivSection>{ItemLinks}</DivSection>

                    {accessoryItems?.length > 0 && <H2 id='accessory'>Accessory Items</H2>}

                    <DivAccessoryItems>
                        {AccessoryItems}
                    </DivAccessoryItems>

                    {!itemInfo && SkeletonLoader}
                </DivDetails>

                <AddedModal
                    open={showShowAddedToCartModal}
                    text="Added to Cart!"
                    onClose={handleAddedToCart}
                    timeout={900}
                />

                {userInfo && (
                    <AddToShoppingListModal
                        open={showAddListModal}
                        hide={() => setShowAddListModal(false)}
                        item={itemDetails}
                        customerPartNumberId={customerPartNumberId}
                    />
                )}
            </ItemDetailPageContainer>
        )
    }
}

const SkeletonList = () => (
    <ul>
        <li>
            <SkeletonLine style={{ width: '50%' }}/>
        </li>
        <li>
            <SkeletonLine style={{ width: '70%' }}/>
        </li>
        <li>
            <SkeletonLine style={{ width: '40%' }}/>
        </li>
        <li>
            <SkeletonLine style={{ width: '75%' }}/>
        </li>
        <li>
            <SkeletonLine style={{ width: '60%' }}/>
        </li>
    </ul>
)

const SkeletonTbody = () => (
    <tbody>
        <TR>
            <TD>
                <SkeletonLine style={{ width: '50%' }}/>
            </TD>
            <TD>
                <SkeletonLine style={{ width: '50%' }}/>
            </TD>
        </TR>
        <TR>
            <TD>
                <SkeletonLine style={{ width: '50%' }}/>
            </TD>
            <TD>
                <SkeletonLine style={{ width: '50%' }}/>
            </TD>
        </TR>
        <TR>
            <TD>
                <SkeletonLine style={{ width: '50%' }}/>
            </TD>
            <TD>
                <SkeletonLine style={{ width: '50%' }}/>
            </TD>
        </TR>
        <TR>
            <TD>
                <SkeletonLine style={{ width: '50%' }}/>
            </TD>
            <TD>
                <SkeletonLine style={{ width: '50%' }}/>
            </TD>
        </TR>
        <TR>
            <TD>
                <SkeletonLine style={{ width: '50%' }}/>
            </TD>
            <TD>
                <SkeletonLine style={{ width: '50%' }}/>
            </TD>
        </TR>
    </tbody>
)

const SkeletonLoader = (
    <>
        <SkeletonTitle/>
        <SkeletonList/>
        <SkeletonTitle/>
        <Table>
            <SkeletonTbody/>
        </Table>
    </>
)
