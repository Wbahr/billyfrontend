import React from 'react'
import { Field } from 'formik'
import FormikInput from '../../_common/formik/input_v2'
import styled from 'styled-components'
import { CardElement } from 'react-stripe-elements'

const WrapForm = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const FormRow = styled.div`
  display: flex;
  margin-top: 24px;
  width: 100%;
  label {
    margin: 0 16px;
  }
`

export const BillingInfoForm = ({
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  errors,
}) => (
  <form onSubmit={handleSubmit}>
    <WrapForm>
      <FormRow>
        <label htmlFor="payment_method">Payment Method</label>
        <Field id="payment_method" name="billing.payment_method">
          {({ field, form, meta }) => (
            <>
              <input type="radio" {...field} value="purchase_order" checked/>Purchase Order
              <input type="radio" {...field} value="credit_card"/>Credit Card <br/>
            </>
          )}
        </Field>
      </FormRow>
      {values.payment_method === "credit_card" && <CardElement />}
      <FormikInput label="PO" name="billing.po" />
      <FormikInput type="hidden" name="billing.company_id" />
      <FormikInput label="Company Name" name="billing.company_name" />
      <FormikInput label="First Name" name="billing.first_name" />
      <FormikInput label="Last Name" name="billing.last_name" />
      <FormikInput label="Address 1" name="billing.address1" width="600px"/>
      <FormikInput label="Address 2" name="billing.address2" width="600px"/>
      <FormikInput label="City" name="billing.city" />
      <FormikInput label="State" name="billing.state" />
      <FormikInput label="Zip" name="billing.zip" />    
      <FormikInput label="County" name="billing.county" />
      <FormikInput label="Email" name="billing.email" />    
      <FormikInput label="Phone" name="billing.phone" />
    </WrapForm>
    <button type="submit">print</button>
  </form>
)

export const defaultValues = {
  billing: {
    first_name: 'Bob',
    last_name: 'Test',
    payment_method: 'purchase_order'
  }
}