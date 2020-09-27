import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { useLazyQuery } from '@apollo/client'
import gql from 'graphql-tag'
import Loader from '../../_common/loader'
import Context from '../../../config/context'
import AirlineModal from '../../_common/modal'
import {GET_ITEM_PRICE} from "../../../config/providerGQL";
import { getLargeImagePath} from "../../_common/helpers/generalHelperFunctions";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  p {
    text-align: center;
  }
`

const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px;
`

const DivCol1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const DivCol2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
`

const DivImg = styled.div`
  max-width: 150px;
  max-height: 150px;
`

const TABLE = styled.table`
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

const TDWhite = styled.td`
padding: 4px 24px 4px 8px;
`

const IMG = styled.img`
  opacity: 0.6;
`

const PpartTitle = styled.p`
  margin: 0 0 8px 0;
  font-weight: 700;
  font-size: 18px;
  color: #000000 !important;
`

const DivRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
`

const DivColRow = styled.div`
  display: flex;
  justify-content: space-around;
`

const ButtonRed = styled.button`
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

const InputQuantity = styled.input`
  width: 50px;
  height: 25px;
  margin-left: 4px;
`

const ButtonBlack = styled.button`
  width: max-content;
  background-color: white;
  color: #328EFC;
  font-weight: 600;
  font-size: 12px;
  border: 0;
  margin: 4px auto 0 auto;
`

const GET_ITEM_DETAILS = gql`
query ItemById($invMastUid: Int){
  customerPartNumbers(frecno: $invMastUid){
    customerPartNumber
    id
  }
  itemDetails(invMastUid: $invMastUid) {
        anonPrice
        assembly
        availability
				availabilityMessage
				brand {
					id
					name
					supplierId
					logoLink
			}
        cBrandId
        dateCreated
        dateModified
        extendedDesc
        filters
        hideOnWeb
        invMastUid
        itemCode
        itemDesc
        listPrice
        mfgPartNo
        modelCode
        p21ItemDesc
        p21NonWeb
        popularity
        preferredSourceLoc
        relevancy
        restrictedCustomerCodes
        rootCategoryUids
        showPrice
        supplierId
        tariff
        unitSizeMultiple
        image {
          path
          sequence
          itemMediaType
          mediaType
        }
    }

}
`

const getItemPricePayload = invMastUid => ({
	variables: {
		items: [{
			invMastUid,
			quantity: 1
		}]
	}
})

export default function DetailsModal({ open, hideDetailsModal, invMastUid, history, itemCode }) {
	const [item, setItem] = useState(null)
	const [unitPrice, setUnitPrice] = useState(null)
	const [quantity, setQuantity] = useState(1)
	const [customerPartNumber, setCustomerPartNumber] = useState(null)
	const [customerPartNumbers, setCustomerPartNumbers] = useState([])
	const context = useContext(Context)

	const [performItemDetailSearch] = useLazyQuery(GET_ITEM_DETAILS, {
		variables: { invMastUid },
		onCompleted: ({customerPartNumbers, itemDetails}) => {
			setCustomerPartNumbers(customerPartNumbers)
			setItem(itemDetails)
		}
	})

	const [performPriceLookup] = useLazyQuery(GET_ITEM_PRICE, {
		...getItemPricePayload(invMastUid),
		onCompleted: data => {
			if (data.getItemPrices[0]) {
				setUnitPrice(data.getItemPrices[0].totalPrice)
			}
		}
	})

	function handleSetQuantity({target: {value}}) {
		if (/^\+?(0|[1-9]\d*)$/.test(value) || value === '') {
			setQuantity(value)
		}
	}

	function handleCloseModal() {
		setItem(null)
		setUnitPrice(null)
		setQuantity(1)
		hideDetailsModal()
	}
	
	const handleCustomerPartNumberChange = e => {
		setCustomerPartNumber(e.target.value)
	}
	
	const handleAddToCart = () => {
		context.addItem({
			frecno: invMastUid,
			quantity: parseInt(quantity),
			itemNotes: '',
			itemUnitPriceOverride: null,
			customerPartNumberId: customerPartNumber
		})
		handleCloseModal()
	}
	
	useEffect(() => {
		if (invMastUid && itemCode) {
			performItemDetailSearch()
			performPriceLookup()
		} else {
			setItem(null)
		}
	}, [open])
	
	const imagePath = getLargeImagePath(item);
	const customerPartOptions = customerPartNumbers.map((part, key) => <option key={key} value={part.id}>{part.customerPartNumber}</option>)
	const mutatedItemId = item && item.itemCode.replace(/\s/g, '-')
	const maxWidth = item ? 800 : 300
	
	return (
		<AirlineModal open={open} onClose={handleCloseModal} contentStyle={{ maxWidth, borderRadius: 5 }}>
			{
				!item ? (
					<Div>
						<p>Getting your product details...</p>
						<Loader />
					</Div>
				) : (
					<DivContainer>
						<DivColRow>
							<DivCol1>
								<DivImg>
									<img src={imagePath} width="100%" alt={item.itemDesc}/>
									<ButtonBlack onClick={() => history.push(`/product/${mutatedItemId}/${invMastUid}`)}>View More Details</ButtonBlack>
								</DivImg>
							</DivCol1>
							
							<DivCol2>
								<PpartTitle>{item.itemDesc}</PpartTitle>
								<p>{item.extendedDesc}</p>
								
								<DivRow>
									<DivRow>
										<p>{!unitPrice ? '--' : `$${unitPrice.toFixed(2)}`}</p>
										<p> /each</p>
									</DivRow>
									
									<DivRow>
										<span>Qty:</span>
										<InputQuantity value={quantity} onChange={handleSetQuantity}/>
										<ButtonRed onClick={handleAddToCart}>Add to Cart</ButtonRed>
									</DivRow>
								</DivRow>
								
								<DivRow>
									<p>Availability: {item.availability}</p>
									<p>{item.availabilityMessage}</p>
								</DivRow>
								
								<TABLE>
									<tbody>
										<TR2>
											<TDGrey>Manufacturer</TDGrey>
											<TDWhite>
												<IMG width='100px' src={item.brand.logoLink} />
											</TDWhite>
										</TR2>
										
										<TR2>
											<TDGrey>Item ID</TDGrey>
											<TDWhite>{item.itemCode}</TDWhite>
										</TR2>
										
										<TR2>
											<TDGrey>Manufacturer Part #</TDGrey>
											<TDWhite>{item.mfgPartNo}</TDWhite>
										</TR2>
										
										<TR2>
											<TDGrey>AHC Part #</TDGrey>
											<TDWhite>{item.invMastUid}</TDWhite>
										</TR2>
										{
											!!customerPartOptions.length && (
												<TR2>
													<TDGrey>Customer Part #</TDGrey>
													<TDWhite>
														<select value={customerPartNumber || ''} onChange={handleCustomerPartNumberChange} >
															<option>Select a Part No.</option>
															{customerPartOptions}
														</select>
													</TDWhite>
												</TR2>
											)
										}
										<TR2>
											<TDGrey>Unit Size</TDGrey>
											<TDWhite>{item.unitSizeMultiple}</TDWhite>
										</TR2>
									</tbody>
								</TABLE>
							</DivCol2>
						</DivColRow>
					</DivContainer>
				)
			}
		</AirlineModal>
	)
}