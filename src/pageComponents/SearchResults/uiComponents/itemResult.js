import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import Context from '../../../setup/context'
import { Link } from 'react-router-dom'
import { getLargeImagePath } from '../../_common/helpers/generalHelperFunctions'
import { Image as SkeletonImage, Detail1 as SkeletonDetail } from './skeletonItem'
import QuantityInput from 'pageComponents/_common/form/quantityInput'
import AirlineChip from 'pageComponents/_common/styledComponents/AirlineChip'
import LocationsModal from '../../_common/modals/LocationsModal'

const DivItemResultContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 320px;
	min-height: 350px;
	margin: 0 8px 20px 8px;
	padding: 8px 0;
	border-bottom: 1px grey solid;
`

const DivPartNumberRow = styled.div`
	width: 100%;
	display: flex;
	color: #000;
	padding: 0 5px;
	font-size: 12px;
	font-family: Arial, sans-serif;
`
const ExtendedDescSpan = styled.span`
    padding: 0 5px;
    font-size: 12px;
    font-weight: bold;
    color: #555;
    font-family: Arial, sans-serif;
    width: 100%;
    display: block; /* Fallback for non-webkit */
    display: -webkit-box;
    height: 36px; /* Fallback for non-webkit */
    margin: 0 auto;
    line-height: 1.5;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

`

const DivPartNumberRowSpread = styled(DivPartNumberRow)`
	justify-content: space-between;
`

const P = styled.p`
	margin: 0;
	font-weight: 500;
	margin: 0 4px;
`

const DivPartDetailsRow = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	flex-grow: 99;
	background-color: #fff;
	width: 100%;
`

const DivPartImg = styled.div`
	display: flex;
	width: 150px;
	height: 150px;
	background-color: white;
`

const DivPartDetails = styled.div`
	display: flex;
	flex-direction: column;
	padding: 4px;
`

const PartTitleLink = styled(Link)`
	margin: 0;
	font-weight: 700;
	font-size: 15px;
	color: #000000 !important;
	height: 36px;
    line-height: 1.25;
	overflow: hidden;
	&:hover{
		cursor: pointer;
		color: #328EFC;
	}
`

const PpartAvailability = styled.p`
	margin: 0;
	font-size: 13px;
`

const ButtonRed = styled.button`
	background-color: #b51029;
	color: white;
	font-weight: 600;
	border: 0;
	padding: 4px 8px;
	box-shadow: 1px 1px 2px #000;
	margin: 4px auto;
	&:hover{
		background-color: rgb(219, 22, 51);
	}
	&:active{
		background-color: #b51029;
		box-shadow: 0px 0px 1px #000;
	}
`
const MoreDetailsLink = styled(Link)`
	width: max-content;
	background-color: white;
	color: #328EFC;
	font-weight: 600;
	font-size: 12px;
	border: 0;
	margin-top: 4px;
`

const Div = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`

const DivSpace = styled(Div)`
	width: 100%;
	justify-content: space-between;
	align-items: flex-end;
	flex-grow: 99;
`

const Pprice = styled.p`
	color: #328EFC;
	font-size: 18px;
	font-weight: 700;
	padding: 0 4px;
	margin: 0;
`

const ACall = styled.a`
	color: #328EFC;
	font-weight: 700;
	padding: 0 4px;
`

const Img = styled.img`
	margin: auto;
	max-height: 100%;
	max-width: 100%;
`

const Option = ({ customerPartNumber, id }) => <option key={customerPartNumber} value={id}>{customerPartNumber}</option>

const getCustomerPartOptions = customerPartNumbers => customerPartNumbers.map((part, idx) => <Option key={idx} {...part}/>)

export default function ItemResult({ result, details, addedToCart }) {
    const { itemAvailabilities, customerPartNumbers, itemPrices, addItem, userInfo } = useContext(Context)

    const foundAvailability = itemAvailabilities.find(avail => avail.invMastUid === result.invMastUid)

    const foundPrice = itemPrices.find(item => item.invMastUid === result.invMastUid)
    const {
        unitPrice,
        unitOfMeasure,
        unitSize,
        roundType
    } = foundPrice || {}

    const [quantity, setQuantity] = useState(1)

    const [customerPartNumber, setCustomerPartNumber] = useState(0)
    const [customerPartOptions, setCustomerPartOptions] = useState([])

    useEffect(() => {
        const filteredCustomerPartNumbers = customerPartNumbers.filter(c => c.invMastUid === result.invMastUid)
        setCustomerPartOptions(getCustomerPartOptions(filteredCustomerPartNumbers))
        if (filteredCustomerPartNumbers?.length === 1) {
            setCustomerPartNumber(filteredCustomerPartNumbers[0].id)
        }
    }, [customerPartNumbers])

    const itemDetailsLink = `/product/${details.itemCodeUrlSanitized || encodeURIComponent(result.itemCode)}/${result.invMastUid}${customerPartNumber ? `/${customerPartNumber}` : ''}`

    const handleAddToCart = () => {
        addItem({
            frecno: result.invMastUid,
            quantity: parseInt(quantity),
            itemNotes: '',
            itemUnitPriceOverride: null,
            customerPartNumberId: customerPartNumber
        })
        addedToCart()
        setQuantity(1)
    }

    const handlePartNumberChange = ({ target }) => setCustomerPartNumber(target.value || null)

    return (
        <DivItemResultContainer>
            <DivPartDetailsRow>
                <Link to={itemDetailsLink}>
                    <DivPartImg>
                        {!details.itemMedia ? (
                            <SkeletonImage/>
                        ) : (
                            <Img src={getLargeImagePath(details)}/>
                        )}
                    </DivPartImg>
                </Link>

                <MoreDetailsLink to={itemDetailsLink}>More Details</MoreDetailsLink>

                <DivPartDetails>
                    <PartTitleLink to={itemDetailsLink}>{result.itemDescription}</PartTitleLink>
                </DivPartDetails>

                {details.extendedDesc ? (
                    <ExtendedDescSpan>
                        {details.extendedDesc}
                    </ExtendedDescSpan>
                ) : (
                    <div style={{ width: '100%' }}>
                        <SkeletonDetail style={{ width: '85%', margin: '5px' }}/>
                        <SkeletonDetail style={{ width: '60%', margin: '5px' }}/>
                    </div>
                )}

                <DivPartNumberRow>
                    <PpartAvailability>Item Id: {result.itemCode}</PpartAvailability>
                </DivPartNumberRow>

                <DivPartNumberRow>
                    <PpartAvailability>Airline #: AHC{result.invMastUid}</PpartAvailability>
                </DivPartNumberRow>

                {!!customerPartOptions.length && (
                    <DivPartNumberRow>
                        <PpartAvailability>
                            Customer Part #:
                            <select value={customerPartNumber} onChange={handlePartNumberChange}>
                                <option value="">Select a Part No.</option>
                                {customerPartOptions}
                            </select>
                        </PpartAvailability>
                    </DivPartNumberRow>
                )}

                <LocationsModal
                    invMastUid={result.invMastUid}
                    availabilityInfo={foundAvailability}
                    unitPrice={unitPrice}
                />

                <DivPartNumberRowSpread>
                    <Div>
                        <span>Quantity:</span>
                        <QuantityInput
                            quantity={quantity}
                            unitSize={unitSize}
                            unitOfMeasure={unitOfMeasure}
                            roundType={roundType}
                            handleUpdate={setQuantity}
                            min='0'
                        />
                        {
                            (unitSize > 1) && (
                                <AirlineChip style={{ marginLeft: '0.5rem' }}>
                                    X {unitSize}
                                </AirlineChip>
                            )
                        }
                    </Div>

                    {unitPrice ? (
                        <Div>
                            <Pprice>${unitPrice.toFixed(2)}</Pprice>
                            <P>/{unitOfMeasure}</P>
                        </Div>
                    ) : !foundPrice ? (
                        <Div>
                            <SkeletonDetail style={{ margin: 'auto 0 auto 75px', width: 50 }}/>
                        </Div>
                    ) : (
                        <ACall href="tel:+18009997378">Call for Price</ACall>
                    )}
                </DivPartNumberRowSpread>

                <DivSpace>
                    {(!!unitPrice || userInfo?.isAirlineEmployee) && <ButtonRed onClick={handleAddToCart}>Add to Cart</ButtonRed>}
                </DivSpace>
            </DivPartDetailsRow>
        </DivItemResultContainer>
    )
}
