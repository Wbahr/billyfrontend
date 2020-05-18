import React from 'react'
import styled from 'styled-components'
import { Field, FieldArray } from 'formik'
import ShippingScheduleLine from '../uiComponents/scheduleLine'
import SelectField from '../../_common/formik/select'
import FormikInput from '../../_common/formik/input_v2'
import { packingBasis } from '../helpers/checkoutDropdownData'

const FormRow = styled.div`
	display: flex;
	width: 100%;
	margin-top: 24px;
	align-items: center;
	padding: 0 8px;
	label {
		margin: 4px 8px auto 4px;
		font-style: italic;
	}
`

const Pinfo = styled.p`
	display: flex;
	font-size: 16px;
	padding: 8px;
	border: 1px solid black;
	width: max-content;
	background-color: #e7f2ff;
	border: 1px #007bff solid;
	border-radius: 2px;
	color: #007bff;
	margin: 8px 16px 0 16px;
`

const DivScheduleHeader = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 0 36px;
	margin: 24px 0 12px 0;
	border-bottom: 2px whitesmoke solid;
	p {
		font-family: Proxima;
		font-style: italic;
		margin: 0;
	}
`

export function ShippingScheduleForm(props){
	const {
		values, 
		setFieldValue
	} = props
	
	function handlePackingBasisChange(name, value){
		setFieldValue(name, value)
		let packingBasisIndex = packingBasis.findIndex(elem => elem.value === value)
		let packingBasisName = packingBasis[packingBasisIndex].apiValue
		setFieldValue('schedule.packingBasis', packingBasisName)
	}
	return(
		<>
			<FormRow>
				<label htmlFor="schedule.packingBasisName">How do you want your order to ship?*</label>
				<div style={{flexGrow: 99}}>
					<Field 
						name="schedule.packingBasisName" 
						component={SelectField} 
						options={packingBasis} 
						isSearchable={false}
						changeFunction={handlePackingBasisChange}
					/> 
					<FormikInput type="hidden" name="schedule.packingBasis" />
				</div>
			</FormRow>
			{values.schedule.packingBasisName === 1 && <Pinfo>Your order will ship complete when all parts are available.</Pinfo>}
			{values.schedule.packingBasisName === 2 && <Pinfo>In-stock items will ship within 2 business days. Non-stock items ship complete when they all become available.</Pinfo>}
			{values.schedule.packingBasisName === 3 && <Pinfo>Your order will ship by line as items become available. Multiple shipping charges may apply.</Pinfo>}
			{values.schedule.packingBasisName === 4 && (
				<>
					<Pinfo>Please specify dates by line (below) for when you want each part to ship.</Pinfo>
					<DivScheduleHeader><p>Item</p><p>Requested Shipment Date</p></DivScheduleHeader>
				</>
			)}
			{values.schedule.packingBasisName === 4 &&
				<FieldArray
					name="schedule.cartWithDates"
					render={() => (
						<div>
							{(values.schedule.cartWithDates && values.schedule.cartWithDates.length > 0) ? (
								values.schedule.cartWithDates.map((item, index) => (
									<ShippingScheduleLine key={`shipping-schedule-line-${index}`} item={item} index={index}/>
								))
							) : (
								<p>No Cart Items</p>
							)}
						</div>
					)}
				/>
			}
		</>
	)
}