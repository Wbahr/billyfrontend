import React from 'react'
import { Field } from 'formik'
import SelectField from '../../../_common/formik/select'
import { StateList, CanadianProvinceList } from '../../../_common/helpers/helperObjects'
import StripePaymentSection from '../../uiComponents/stripePayment'
import FormikInput from '../../../_common/formik/input_v2'

export default function NewCardSection(props) {
	const {
		values,
		stripe
	} = props
	return (
			<>
					<StripePaymentSection stripe={stripe}/>
					<FormikInput label="PO Number" name="billing.po" />
					<FormikInput type="hidden" name="billing.companyId" />
					<FormikInput label="Company Name" name="billing.companyName" width="500px"/>
					<FormikInput label="First Name" name="billing.firstName" />
					<FormikInput label="Last Name" name="billing.lastName" />
					<FormikInput label="Address 1" name="billing.address1" width="600px"/>
					<FormikInput label="Address 2" name="billing.address2" width="600px"/>
					<FormikInput label="City" name="billing.city" />
					{values.billing.country  === 'us' && 
						<>
							<Field 
								name="billing.stateOrProvince" 
								component={SelectField} 
								options={StateList}
								placeholder="Select a State"
								label="State"
							/> 
						</>
					}
					{values.billing.country  === 'canada' && 
						<>
							<Field 
								name="billing.stateOrProvince" 
								component={SelectField} 
								options={CanadianProvinceList}
								placeholder="Select a Province"
								label="Province"
							/> 
						</>
					}
					<FormikInput label="Zip" name="billing.zip" />    
					<Field 
						name="billing.country" 
						component={SelectField} 
						options={[{'label': 'United States', 'value': 'us'},{'label': 'Canada', 'value': 'canada'}]}
						placeholder="Select a Country"
						width="250px"
						isSearchable={false}
						label="Country"
					/> 
					<FormikInput label="Email" name="billing.email" /> 
					<FormikInput label="Phone" name="billing.phone" />
				</>
	)
}