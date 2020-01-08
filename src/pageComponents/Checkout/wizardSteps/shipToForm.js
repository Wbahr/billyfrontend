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
    <Field as="select" name="shipto.saved_address">
      <option value="1">Yes</option>
      <option value="0">No</option>
    </Field>
    <Field name="shipto.contact_name" placeholder="Contact Name" />
    <Field name="shipto.contact_id" placeholder="Contact ID" />
    <Field name="shipto.ship_to_name" placeholder="Ship To Name" />
    <Field name="shipto.ship_to_id" placeholder="Ship To ID" />
    <Field name="shipto.address1" placeholder="Address 1" />
    <Field name="shipto.address2" placeholder="Address 2" />
    <Field name="shipto.city" placeholder="City" />
    <Field name="shipto.state" placeholder="State" />
    <Field name="shipto.zip" placeholder="Zip" />    
    <Field name="shipto.county" placeholder="Country" />
    <Field name="shipto.carrier_name" placeholder="Carrier" />
    <Field name="shipto.carrier_id" placeholder="Carrier ID" />
    <Field as="select" name="shipto.is_collect">
      <option value="0">No</option>
      <option value="1">Yes</option>
    </Field>
    <Field name="shipto.collect_number" placeholder="Collect Number" />
    <Field name="shipto.phone" placeholder="Phone" />
    <Field name="shipto.email" placeholder="Email" />
    {errors.name && <div>{errors.name}</div>}
    <button type="submit">Print</button>
  </form>
)

export const defaultValues = {
  shipto: {
    name: 'shipping name'
  }
}