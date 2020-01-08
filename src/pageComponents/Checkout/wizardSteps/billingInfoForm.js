import React from 'react'
import { Field } from 'formik'

export const BillingInfoForm = ({
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  errors,
}) => (
  <form onSubmit={handleSubmit}>
    <Field as="select" name="shipto.payment_method">
      <option value="credit_card">Credit Card</option>
      <option value="invoice">Invoice</option>
    </Field>
    <Field name="billing.po" placeholder="PO Number" />
    <Field name="billing.company_id" placeholder="Company ID" />
    <Field name="billing.company_name" placeholder="Company Name" />
    <Field name="billing.first_name" placeholder="First Name" />
    <Field name="billing.last_name" placeholder="Last Name" />
    <Field name="billing.address1" placeholder="Address 1" />
    <Field name="billing.address2" placeholder="Address 2" />
    <Field name="billing.city" placeholder="City" />
    <Field name="billing.state" placeholder="State" />
    <Field name="billing.zip" placeholder="Zip" />    
    <Field name="billing.county" placeholder="Country" />
    <Field name="billing.email" placeholder="Email" />    
    <Field name="billing.phone" placeholder="Phone" />
    {errors.name && <div>{errors.name}</div>}
    <button type="submit">Submit</button>
  </form>
)

export const defaultValues = {
  billing: {
    name: 'test bob'
  }
}