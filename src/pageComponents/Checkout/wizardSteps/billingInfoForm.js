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
    <Field name="name" placeholder="Contact Name" />
    <Field name="address1" placeholder="Address 1" />
    <Field name="address2" placeholder="Address 2" />
    <Field name="city" placeholder="City" />
    <Field name="state" placeholder="State" />
    <Field name="zip" placeholder="Zip" />    
    <Field name="county" placeholder="Country" />
    {errors.name && <div>{errors.name}</div>}
    <button type="submit">Submit</button>
  </form>
)

export const defaultValues = {
  name: 'test bob'
}