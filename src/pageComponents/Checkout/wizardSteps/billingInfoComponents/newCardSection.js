import React from 'react'
import { Field } from 'formik'
import SelectField from '../../../_common/formik/select'
import styled from 'styled-components'
import { injectStripe } from 'react-stripe-elements'
import { StateList, CanadianProvinceList } from '../../../_common/helpers/helperObjects'
import StripePaymentSection from '../../uiComponents/stripePayment'
import FormikInput from '../../../_common/formik/input_v2'

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

export default function NewCardSection(props) {
  const {
    values,
    stripe
  } = props
  return (
      <>
          <StripePaymentSection stripe={stripe}/>
          <FormikInput label="PO Number" name="billing.po" />
          <FormikInput type="hidden" name="billing.company_id" />
          <FormikInput label="Company Name" name="billing.company_name" width="500px"/>
          <FormikInput label="First Name" name="billing.contact_first_name" />
          <FormikInput label="Last Name" name="billing.contact_last_name" />
          <FormikInput label="Address 1" name="billing.address1" width="600px"/>
          <FormikInput label="Address 2" name="billing.address2" width="600px"/>
          <FormikInput label="City" name="billing.city" />
          {values.billing.country  === "us" && 
            <>
              <Field 
                name="billing.state" 
                component={SelectField} 
                options={StateList}
                placeholder="Select a State"
                label="State"
              /> 
            </>
          }
          {values.billing.country  === "canada" && 
            <>
              <Field 
                name="billing.province" 
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