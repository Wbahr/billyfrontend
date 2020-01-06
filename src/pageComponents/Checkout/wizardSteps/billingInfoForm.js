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
    <Field name="billing.name" placeholder="Contact Name" />
    <Field name="billing.address1" placeholder="Address 1" />
    <Field name="billing.address2" placeholder="Address 2" />
    <Field name="billing.city" placeholder="City" />
    <Field name="billing.state" placeholder="State" />
    <Field name="billing.zip" placeholder="Zip" />    
    <Field name="billing.county" placeholder="Country" />
    {errors.name && <div>{errors.name}</div>}
    <button type="submit">Submit</button>

  </form>
)

export const defaultValues = {
  billing: {
    name: 'test bob'
  }
}