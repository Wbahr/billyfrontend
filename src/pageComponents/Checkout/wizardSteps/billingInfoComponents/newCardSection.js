import React, {useContext} from 'react'
import { Field } from 'formik'
import SelectField from '../../../_common/formik/select'
import { StateList, CanadianProvinceList } from '../../../_common/helpers/helperObjects'
import StripePaymentSection from '../../uiComponents/stripePayment'
import FormikInput from '../../../_common/formik/input_v2'
import styled from "styled-components";
import {defaultBilling} from "../../helpers";
import FormikCheckbox from "../../../_common/formik/checkBox";
import Context from '../../../../config/context'

const StyledCheckbox = styled.input`
	width: 15px;
	height: 15px;
	cursor: pointer;
	padding-right: 18px;
	margin: auto 0;
`

const Row = styled.div`
	display: flex;
	flexDirection: row;
	flex-wrap: wrap;
`

const Label = styled.label`
	margin: auto 10px;
`

export default function NewCardSection(props) {
	const {values, setFieldValue} = props
	const context = useContext(Context)
	
	const handleSameAsShippingChange = ({target: {checked}}) => {
		const applyShipTo = (accum, field) => {
			if (Object.keys(values.shipto).includes(field)) {
				accum[field] = values.shipto[field]
			}
			return accum
		}
		
		const billing = checked
			? Object.keys(values.billing).reduce(applyShipTo, values.billing)
			: { ...defaultBilling, paymentMethod: 'credit_card' }
			
		setFieldValue('billing', billing)
	}
	
	return (
		<>
			<StripePaymentSection {...props} />
			
			{!!context.userInfo && (
				<Row style={{padding: '8px 10px'}}>
					<FormikCheckbox label="Save card for future payments?" name="billing.savePaymentMethod"/>
				</Row>
			)}
			
			<Row style={{padding: '8px 10px'}}>
				<StyledCheckbox onChange={handleSameAsShippingChange} type='checkbox' name="sameAsShipping"/>
				<Label htmlFor="sameAsShipping">Billing same as shipping</Label>
			</Row>
			
			<Row>
				{!!context.userInfo && <FormikInput label="PO Number" name="billing.purchaseOrder" />}
				<FormikInput label="Company Name" name="billing.companyName"/>
			</Row>
			
			<FormikInput type="hidden" name="billing.companyId" />
			
			<Row>
				<FormikInput label="First Name" name="billing.firstName" />
				<FormikInput label="Last Name" name="billing.lastName" />
			</Row>
			
			<Row>
				<FormikInput label="Email" name="billing.email" />
				<FormikInput label="Phone" name="billing.phone" />
			</Row>
			
			<FormikInput label="Address 1" name="billing.address1" width="600px"/>
			<FormikInput label="Address 2" name="billing.address2" width="600px"/>
			
			<Row>
				<FormikInput label="City" name="billing.city"/>
				<FormikInput label="Zip" name="billing.zip" width="150px" style={{width: 'auto'}}/>
			</Row>
			
			<Row>
				<Field
					name="billing.country"
					component={SelectField}
					options={[{label: 'United States', value: 'us'}, {label: 'Canada', value: 'canada'}]}
					placeholder="Select a Country"
					isSearchable={false}
					label="Country"
				/>
				{values.billing.country  === 'us' && (
					<Field
						name="billing.stateOrProvince"
						component={SelectField}
						options={StateList}
						placeholder="Select a State"
						label="State"
						width="200px"
					/>
				)}
				{values.billing.country  === 'canada' && (
					<Field
						name="billing.stateOrProvince"
						component={SelectField}
						options={CanadianProvinceList}
						placeholder="Select a Province"
						label="Province"
						width="200px"
					/>
				)}
			</Row>
		</>
	)
}