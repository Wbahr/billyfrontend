import React from 'react'
import { Field } from 'formik'
import FormikInput from '../../_common/formik/input_v2'
import styled from 'styled-components'
import { injectStripe } from 'react-stripe-elements'
import { StateList, CanadianProvinceList } from '../../_common/helpers/helperObjects'
import SelectField from '../../_common/formik/select'
import StripePaymentSection from '../uiComponents/stripePayment'

const WrapForm = styled.div`
  display: flex;
  flex-wrap: wrap;
`

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

function BillingInfoForm(props) {
  const {
    values,
    stripe
  } = props
  return (
    <WrapForm>
      <FormRow>
        <label htmlFor="payment_method">How would you like to pay?</label>
        <Field 
          name="billing.payment_method" 
          component={SelectField} 
          options={[{'label': 'Purchase Order', 'value': 'purchase_order'},{'label': 'Credit Card', 'value': 'credit_card'}]}
          placeholder="Select a Payment Method"
          isSearchable={false}
        /> 
      </FormRow>
      {values.billing.payment_method === "credit_card" &&
        <FormRow>
        <label htmlFor="card_type">New or Saved Card?</label>
        <Field 
          name="billing.card_type" 
          component={SelectField} 
          options={[{'label': 'New Card', 'value': 'new_card'},{'label': 'Saved Card', 'value': 'saved_card'}]}
          isSearchable={false}
        /> 
      </FormRow>
      }

      {values.billing.payment_method !== "" &&
        <>
          {(values.billing.payment_method === "credit_card" && values.billing.card_type === "new_card") && <StripePaymentSection stripe={stripe}/>}
          <FormikInput label="PO Number" name="billing.po" />
          <FormikInput type="hidden" name="billing.company_id" />
          <FormikInput label="Company Name" name="billing.company_name" width="500px"/>
          {values.billing.payment_method === "purchase_order" && <FormikInput label="First Name" name="billing.contact_first_name" />}
          {values.billing.payment_method === "purchase_order" && <FormikInput label="Last Name" name="billing.contact_last_name" />}
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
          <FormikInput label={values.billing.payment_method === "purchase_order" ? 'Email Invoice To' : 'Email'} name="billing.email" /> 
          <FormikInput label="Phone" name="billing.phone" />
        </>
      }
    </WrapForm>
  )
}

export default injectStripe(BillingInfoForm)