import React, { useState, useEffect, useContext } from 'react'
import Modal from '../../_common/modal'
import styled from 'styled-components'
import Context from '../../../config/context'
import { ButtonBlack, ButtonRed } from '../../../styles/buttons'
import AirlineInput from '../../_common/form/inputv2'
import AirlineSelect from '../../_common/form/select'

const DivRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

const DivItem = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 4px;
`

const Label = styled.label`
  margin: 0;
  font-size: 12px;
  font-style: italic;
`

const Container = styled.div`
  display: flex; 
  flex-direction: column;
  align-items: center;
  padding: 12px 24px;
  h4 {
    font-family: ProximaBold;
  }
  p {
    font-family: Proxima;
    text-align: center;
  }
  button {
    margin-top: 8px;
  }
`

export default function EditPriceModal({open, hideEditPriceModal, setCartItem, data}) {
	const [itemPrice, setItemPrice] = useState(0)
	const [margin, setMargin] = useState(0)
	//Note: Airline cost only available to authorized users
	const [airlineCost, setAirlineCost] = useState(0)
	const [selectedReason, setSelectedReason] = useState(null)
	const {editPriceReasonCodes} = useContext(Context)
	
	const reasonCodeOptions = editPriceReasonCodes.map(code => ({ label: code.priceReason, value: code.id }))
	
	useEffect(() => {
		if (data && data.modalType === 'edit-price') {
			setItemPrice(data.itemPrice)
			setMargin(calculateMargin(data.itemPrice))
			setAirlineCost(data.airlineCost)
			setSelectedReason(reasonCodeOptions.find(code => code.value === data.priceReasonId))
		}
	}, [data])

	function handleReset() {
		setItemPrice(data.originalItemPrice)
		setMargin(calculateMargin(data.originalItemPrice))
		setSelectedReason(null)
	}
	
	function calculateMargin(price) {
		const margin = margin < 0 ? 0 : (price - data.airlineCost) / data.airlineCost
		return (margin * 100).toFixed(1)
	}

	const handleChangePrice = type => (e, maskValue, floatValue) => {
		if (type === 'price') {
			setItemPrice(floatValue)
			setMargin(calculateMargin(floatValue))
		} else {
			setMargin(floatValue)
			setItemPrice(parseFloat((airlineCost / (1 - (floatValue/100))).toFixed(2)))
		}
	}
	
	const handleCancel = () => {
		handleReset()
		hideEditPriceModal()
	}
	
	const handleSave = () => {
		if (itemPrice === data.originalItemPrice) {
			setCartItem({ ...data?.cartItem, itemUnitPriceOverride: null })
		} else {
			setCartItem({ ...data?.cartItem, itemUnitPriceOverride: itemPrice, priceReasonId: selectedReason.value })
		}
		hideEditPriceModal()
	}
 
	const handleReasonCodeChange = value => {
		setSelectedReason(reasonCodeOptions.find(code => code.value === value))
	}
	
	return (
		<Modal
			open={open}
			onClose={hideEditPriceModal}
			contentStyle={{maxWidth: 400, borderRadius: 3}}
		>
			<Container>
				<h4>Edit Item Price</h4>
				<DivRow>
					<DivItem>
						<Label>Item Price: </Label>
						<AirlineInput
							type="currency"
							value={itemPrice}
							width='100px'
							onChange={handleChangePrice('price')}
						/>
					</DivItem>
					
					<DivItem>
						<Label>Margin: {data?.spaType && '(SPA)'}</Label>
						<AirlineInput
							type="percent"
							value={margin}
							width='100px'
							onChange={handleChangePrice('margin')}
						/>
					</DivItem>
					
					<DivItem>
						<Label>Airline Cost: </Label>
						<AirlineInput
							type="currency"
							disabled={true}
							value={airlineCost}
							width='100px'
						/>
					</DivItem>
				</DivRow>
				
				{itemPrice !== data?.originalItemPrice && (
					<AirlineSelect
						label="Reason"
						options={reasonCodeOptions}
						value={selectedReason}
						setValue={handleReasonCodeChange}
					/>
				)}
				
				<DivRow>
					<ButtonBlack onClick={handleCancel}>Cancel</ButtonBlack>
					<ButtonBlack onClick={handleReset}>Reset</ButtonBlack>
					<ButtonRed onClick={handleSave} disabled={!selectedReason || itemPrice === data?.originalItemPrice}>Save</ButtonRed>
				</DivRow>
			</Container>
		</Modal>
	)
}