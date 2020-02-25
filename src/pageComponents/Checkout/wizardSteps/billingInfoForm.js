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
        <label htmlFor="paymentMethod">How would you like to pay?*</label>
        <Field 
          name="billing.paymentMethod" 
          component={SelectField} 
          options={[{'label': 'Purchase Order', 'value': 'purchase_order'},{'label': 'Credit Card', 'value': 'credit_card'}]}
          placeholder="Select a Payment Method"
          isSearchable={false}
        /> 
      </FormRow>
      {values.billing.paymentMethod === "credit_card" &&
        <FormRow>
        <label htmlFor="card_type">New or Saved Card?*</label>
        <Field 
          name="billing.cardType" 
          component={SelectField} 
          options={[{'label': 'New Card', 'value': 'new_card'},{'label': 'Saved Card', 'value': 'saved_card'}]}
          isSearchable={false}
        /> 
      </FormRow>
      }
      {values.billing.paymentMethod === "purchase_order" && <PurchaseOrderSection {...props}/>}
      {(values.billing.paymentMethod === "credit_card" && values.billing.cardType === "new_card") && <NewCardSection {...props}/>}
      {(values.billing.paymentMethod === "credit_card" && values.billing.cardType === "saved_card") && <SavedCardSection {...props}/>}
    </WrapForm>
  )
}

export default injectStripe(BillingInfoForm)