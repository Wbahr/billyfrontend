import React from 'react'
import { Field } from 'formik'

export const ShipToForm = ({
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  errors,
}) => (
  <form onSubmit={handleSubmit}>
    <Field name="shipto.name" placeholder="Contact Name" />
    <Field name="shipto.address1" placeholder="Address 1" />
    <Field name="shipto.address2" placeholder="Address 2" />
    <Field name="shipto.city" placeholder="City" />
    <Field name="shipto.state" placeholder="State" />
    <Field name="shipto.zip" placeholder="Zip" />    
    <Field name="shipto.county" placeholder="Country" />
    {errors.name && <div>{errors.name}</div>}
    <button type="submit">Submit</button>

  </form>
)

export const defaultValues = {
  shipto: {
    name: 'shipping name'
  }
}