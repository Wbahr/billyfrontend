import React, {useEffect} from 'react'
import _ from 'lodash'
import { Field } from 'formik'
import FormikInput from '../../../_common/formik/input_v2'
// import styled from 'styled-components'
import { StateList, CanadianProvinceList } from '../../../_common/helpers/helperObjects'
import SelectField from '../../../_common/formik/select'

// const FormRow = styled.div`
//   display: flex;
//   width: 100%;
//   margin-top: 24px;
//   align-items: center;
//   padding: 0 8px;
//   label {
//     margin: 4px 8px auto 4px;
//     font-style: italic;
//   }
// `

export default function PurchaseOrderSection(props) {
	const {
		values,
		setFieldValue,
		checkoutDropdownData: {
			customerPhysicalAddress
		}
	} = props
  
	useEffect(() => {
		if(!_.isNil(customerPhysicalAddress)){
			setFieldValue('billing.companyName', customerPhysicalAddress.companyName)
			setFieldValue('billing.address1', customerPhysicalAddress.mailAddress1)
			setFieldValue('billing.address2', customerPhysicalAddress.mailAddress2)
			setFieldValue('billing.city', customerPhysicalAddress.mailCity)
			setFieldValue('billing.zip', customerPhysicalAddress.mailPostalCode)
			setFieldValue('billing.stateOrProvince', customerPhysicalAddress.mailState)
			setFieldValue('billing.country', customerPhysicalAddress.mailCountry.toLowerCase())
		}
	}, [customerPhysicalAddress])
	return (
    <>
      <FormikInput label="PO Number*" name="billing.purchaseOrder" />
      <FormikInput label="Company Name" name="billing.companyName" width="500px"/>
      <FormikInput label="First Name" name="billing.firstName" />
      <FormikInput label="Last Name" name="billing.lastName" />
      <FormikInput label="Address 1*" name="billing.address1" width="600px"/>
      <FormikInput label="Address 2" name="billing.address2" width="600px"/>
      <FormikInput label="City*" name="billing.city" />
      {values.billing.country  === 'us' && 
        <>
          <Field 
          	name="billing.stateOrProvince" 
          	component={SelectField} 
          	options={StateList}
          	placeholder="Select a State"
          	label="State*"
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
          	label="Province*"
          /> 
        </>
      }
      <FormikInput label="Zip*" name="billing.zip" />    
      <Field 
      	name="billing.country" 
      	component={SelectField} 
      	options={[{'label': 'United States', 'value': 'us'},{'label': 'Canada', 'value': 'canada'}]}
      	placeholder="Select a Country"
      	width="250px"
      	isSearchable={false}
      	label="Country*"
      /> 
      <FormikInput label='Email Invoice To' name="billing.email" /> 
      <FormikInput label="Phone" name="billing.phone" />
    </>
	)
}
