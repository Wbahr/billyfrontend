import React, {useEffect} from 'react'
import { Field } from 'formik'
import FormikInput from '../../../_common/formik/input_v2'
import { StateList, CanadianProvinceList } from '../../../_common/helpers/helperObjects'
import SelectField from '../../../_common/formik/select'

export default function PurchaseOrderSection(props) {
	const {values, setFieldValue, checkoutDropdownData: { customerPhysicalAddress }} = props
	
	useEffect(() => {
		if (customerPhysicalAddress) {
			setFieldValue('billing', {
				...values.billing,
				companyName: customerPhysicalAddress.companyName,
				address1: customerPhysicalAddress.physAddress1,
				address2: customerPhysicalAddress.physAddress2,
				city: customerPhysicalAddress.physCity,
				zip: customerPhysicalAddress.physPostalCode,
				stateOrProvince: customerPhysicalAddress.physState,
				country: customerPhysicalAddress.physCountry.toLowerCase()
			})
		}
	}, [customerPhysicalAddress])
	
	return (
		<div>
			<FormikInput label="PO Number*" name="billing.purchaseOrder" />
			<FormikInput label="Company Name" name="billing.companyName" width="500px"/>
			<FormikInput label="First Name" name="billing.firstName" />
			<FormikInput label="Last Name" name="billing.lastName" />
			<FormikInput label="Address 1*" name="billing.address1" width="500px"/>
			<FormikInput label="Address 2" name="billing.address2" width="500px"/>
			<FormikInput label="City*" name="billing.city" />
			{
				values.billing.country  === 'us' && (
					<Field
						name="billing.stateOrProvince"
						component={SelectField}
						options={StateList}
						placeholder="Select a State"
						label="State*"
					/>
				)
			}
			{
				values.billing.country  === 'canada' && (
					<Field
						name="billing.stateOrProvince"
						component={SelectField}
						options={CanadianProvinceList}
						placeholder="Select a Province"
						label="Province*"
					/>
				)
			}
			<FormikInput label="Zip*" name="billing.zip" />    
			<Field 
				name="billing.country" 
				component={SelectField} 
				options={[{label: 'United States', value: 'us'}, {label: 'Canada', value: 'canada'}]}
				placeholder="Select a Country"
				width="250px"
				isSearchable={false}
				label="Country*"
			/> 
			<FormikInput label='Email Invoice To' name="billing.email" /> 
			<FormikInput label="Phone" name="billing.phone" />
		</div>
	)
}
