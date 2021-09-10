import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import 'react-datepicker/dist/react-datepicker.css'
import Context from '../../../setup/context'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import NumberFormat from 'react-number-format'
import AddedModal from '../../SearchResults/uiComponents/addedModal'
import { getThumbnailImagePath } from 'pageComponents/_common/helpers/generalHelperFunctions'
import QuantityInput from '../../_common/form/quantityInput'
import AirlineChip from '../../_common/styledComponents/AirlineChip'
import { Grid } from '@material-ui/core'
import { format as dateFormat } from 'date-fns'

const DivContainer = styled.div`
		display: flex;
		border-bottom: 2px whitesmoke solid;
		padding: 8px 16px;
		margin: 8px 0;
		height: 135px;
		background-color: white;
	`

const DivRow = styled.div`
		display: flex;
		font-size: 15px;
		margin-bottom: 2px;
	`

const DivCard = styled.div`
		display: flex;
		align-items: center;
		width: 100%;
	`

const DivCol1 = styled.div`
		display: flex;
		width: 100px;
	`

const DivCol2 = styled.div`
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: 200px;
		margin-left: 40px;
		p {
			font-size: 16px;
			margin: 0;
		}
	`

const Img = styled.img`
		margin: 0 4px;
	`

const P1 = styled.p`
		cursor: pointer;
		font-size: 16px;
		font-weight: 600;
	`

const TextRow = styled.div`
		display: flex;
	`

const P2 = styled.div`
		cursor: pointer;
		color: grey;
		font-size: 12px !important;
		padding: 0 2px;
	`

const ButtonSmall = styled.button`
		background-color: #b51029;
		color: white;
		font-weight: 600;
		border: 0;
		padding: 2px 8px;
		box-shadow: 1px 1px 2px #000;
		margin: 4px auto 4px 16px;
		font-size: 14px;
		&:hover{
			background-color: rgb(219, 22, 51);
		}
		&:active{
			background-color: #b51029;
			box-shadow: 0 0 1px #000;
		}
	`
const TrackingCodes = styled.div`
`
export default function OrderDetailItem({ item, itemDetails, availability, priceInfo }) {
    const [quantity, setQuantity] = useState(1)
    const [showShowAddedToCartModal, setShowAddedToCartModal] = useState(false)
    const imagePath = getThumbnailImagePath(itemDetails)
    const context = useContext(Context)
    const trackingCode = item.trackingNumbers?.map(trackingNumberObject => (
        <TrackingCodes key={trackingNumberObject.trackingNumber}><a href={trackingNumberObject.trackingUrl} target='_blank' rel='noreferrer'>{trackingNumberObject.trackingNumber}</a></TrackingCodes>)
    )


    function handleAddedToCart(){
        setShowAddedToCartModal(false)
    }

    const handleAddToCart = () => {
        context.addItem({
            invMastUid: item.invMastUid,
            quantity: parseInt(quantity, 10),
            itemNotes: '',
            itemUnitPriceOverride: null,
            customerPartNumberId: item.customerPartNumberId
        })
        setShowAddedToCartModal(true)
        setQuantity(1)
    }

    const formattedPromiseDate = item?.promiseDate ? dateFormat(new Date(item.promiseDate), 'MM/dd/yyyy') : null

    return (
        <DivContainer>
            <AddedModal
                open={showShowAddedToCartModal}
                text={'Added to Cart!'}
                onClose={handleAddedToCart}
                timeout={900}
            />
            <DivCard>
                <DivCol1>
                    <Img max-height='100%' width='100%' src={imagePath} />
                </DivCol1>
                <DivCol2>
                    <CopyToClipboard text={item.itemCode}>
                        <P1>{item.itemCode}</P1>
                    </CopyToClipboard>
                    <TextRow>
                        <CopyToClipboard text={`AHC${item.invMastUid}`}>
                            <P2>AHC{item.invMastUid}</P2>
                        </CopyToClipboard>
                        {item.customerPartNumber && (
                            <>
                                <P2>|</P2>
                                <CopyToClipboard text={item.customerPartNumber}>
                                    <P2>{item.customerPartNumber}</P2>
                                </CopyToClipboard>
                            </>
                        )}
                    </TextRow>
                    <P2>Quantity Received: {item.quantityInvoiced}</P2>
                    <P2>Quantity Ordered: {item.quantityOrdered}</P2>
                </DivCol2>
                <DivCol2>
                    <P2>{trackingCode?.length > 0 && <span>Tracking Codes: {trackingCode}</span>}</P2>
                    <P2>Order Unit Price: <NumberFormat value={item.unitPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale/></P2>
                    <P2>Order Line Price: <NumberFormat value={item.totalPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale/></P2>
                    <P2>Current Unit Price: <NumberFormat value={priceInfo?.unitPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale/></P2>
                </DivCol2>
                <DivCol2>
                    <DivRow>Promise Date: {item?.promiseDate && formattedPromiseDate !== '12/31/49' ? formattedPromiseDate : 'TBD'}</DivRow>
                    {priceInfo && (
                        <Grid container justify="center">
                            <span>Qty:</span>
                            <QuantityInput
                                quantity={quantity}
                                unitSize={priceInfo.unitSize}
                                unitOfMeasure={priceInfo.unitOfMeasure}
                                roundType={priceInfo.roundType}
                                handleUpdate={setQuantity}
                                min='0'
                            />
                            {(priceInfo.unitSize > 1) && (
                                <AirlineChip style={{ marginLeft: '0.5rem', fontSize: '0.9rem' }}>
                                    X {priceInfo.unitSize}
                                </AirlineChip>
                            )}
                        </Grid>
                    )}
                    {priceInfo && <ButtonSmall onClick={handleAddToCart}>Add to Cart</ButtonSmall>}
                </DivCol2>
            </DivCard>
        </DivContainer>
    )
}
