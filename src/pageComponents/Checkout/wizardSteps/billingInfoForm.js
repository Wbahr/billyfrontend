import React from 'react'
import { Field } from 'formik'
import FormikInput from '../../_common/formik/input_v2'
import styled from 'styled-components'
import { injectStripe } from 'react-stripe-elements'
import { StateList, CanadianProvinceList } from '../../_common/helpers/helperObjects'
import SelectField from '../../_common/formik/select'
import StripePaymentSection from '../uiComponents/stripePayment'
import NewCardSection from './billingInfoComponents/newCardSection'
import SavedCardSection from './billingInfoComponents/savedCardSection'
import PurchaseOrderSection from './billingInfoComponents/purchaseOrderSection'

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
      {values.billing.payment_method === "purchase_order" && <PurchaseOrderSection {...props}/>}
      {(values.billing.payment_method === "credit_card" && values.billing.card_type === "new_card") && <NewCardSection {...props}/>}
      {(values.billing.payment_method === "credit_card" && values.billing.card_type === "saved_card") && <SavedCardSection {...props}/>}
    </WrapForm>
  )
}

export default injectStripe(BillingInfoForm)