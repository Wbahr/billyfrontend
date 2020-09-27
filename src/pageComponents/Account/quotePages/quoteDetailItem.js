import React, { useState, useContext } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import 'react-datepicker/dist/react-datepicker.css'
import Context from '../../../config/context'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import NumberFormat from 'react-number-format'
import AddedModal from '../../SearchResults/uiComponents/addedModal'
import { getThumbnailImagePath } from 'pageComponents/_common/helpers/generalHelperFunctions'

const DivContainer = styled.div`
		display: flex;
		border-top: 2px whitesmoke solid;
		border-bottom: 2px whitesmoke solid;
		padding: 8px 16px;
		margin: 8px 0;
		height: 135px;
		background-color: white;
	`

const DivRow = styled.div`
		display: flex;
	`

const DivCard = styled.div`
		display: flex;
		align-items: center;
		width: 100%;
	`

const DivRemove = styled.div`
		cursor: pointer;
		display: flex;
		width: auto;
		margin: auto 12px;
		align-items: center;
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
		height: 100%;
		margin-right: 50px;
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
	`

const P1 = styled.p`
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

const ButtonSmall = styled.button`
		background-color: #b51029;
		color: white;
		font-weight: 600;
		border: 0;
		padding: 4px 8px;
		box-shadow: 1px 1px 2px #000;
		margin: 4px auto 4px 16px;
		&:hover{
			background-color: rgb(219, 22, 51);
		}
		&:active{
			background-color: #b51029;
			box-shadow: 0px 0px 1px #000;
		}
	`

export default function OrderDetailItem({ item, quoteId }) {
	const [quantity, setQuantity] = useState(1)
	const [showShowAddedToCartModal, setShowAddedToCartModal] = useState(false)
	const context = useContext(Context)

	let displayItem = context.itemDetailCache.find(elem => elem.itemDetails.invMastUid == item.invMastUid)
    let imagePath = getThumbnailImagePath(displayItem?.itemDetails);

	function handleAddedToCart(){
		setShowAddedToCartModal(false);
	}
	
	return(
		<DivContainer>
			<AddedModal 
				open={showShowAddedToCartModal} 
				text={'Added to Cart!'} 
				onClose={handleAddedToCart}
				timeout={900}
			/>
			<DivCard>
				<DivCol1>
					<Img max-height='100%' max-width='100%' src={imagePath} />
				</DivCol1>
				<DivCol2>
					<CopyToClipboard text={item.itemCode}>
						<P1>{item.itemCode}</P1>
					</CopyToClipboard>
					<TextRow>
						<CopyToClipboard text={`AHC${item.invMastUid}`}>
							<P2>AHC{item.invMastUid}</P2>
						</CopyToClipboard>
						<P2>|</P2>
						<CopyToClipboard text={item.customerPartNumber}>
							<P2>{item.customerPartNumber}</P2>
						</CopyToClipboard>
					</TextRow>
					<P2>Quantity Ordered: {item.quantityOrdered}</P2>
				</DivCol2>
				<DivCol2>
					<P2>Unit Price: <NumberFormat value={item.unitPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale/></P2>
					<P2>Total Price: <NumberFormat value={item.totalPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale/></P2>
				</DivCol2>
				<DivCol3>
					<DivRow>Availability: {_.get(displayItem,'itemDetails.availability','--')}</DivRow>
					<DivRow>{_.get(displayItem,'itemDetails.availabilityMessage',null)}</DivRow>
					<DivRow>Quantity: 1</DivRow>
					<Context.Consumer>
						{({addItem}) => (
							<ButtonSmall onClick={()=>{
								addItem({
									'frecno': item.invMastUid,
									'quantity': parseInt(quantity, 10),
									'itemNotes': `Quote ${quoteId}`,
									'itemUnitPriceOverride': null,
									'customerPartNumberId': item.customerPartNumberId,
									'quoteId': quoteId
								}), setShowAddedToCartModal(true), setQuantity(1)
							}}>Add to Cart</ButtonSmall>
						)}
					</Context.Consumer>
				</DivCol3>
			</DivCard>
		</DivContainer>
	)
}