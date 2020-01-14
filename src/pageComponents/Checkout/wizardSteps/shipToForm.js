import React from 'react'
import { Field } from 'formik'
import FormikInput from '../../_common/formik/input_v2'
import styled from 'styled-components'

const WrapForm = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const ShipToForm = ({
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  errors,
}) => (
  <form onSubmit={handleSubmit}>
    <WrapForm>
      {/* <Field as="select" name="shipto.saved_address">
        <option value="1">Yes</option>
        <option value="0">No</option>
      </Field> */}
      <FormikInput label="Contact Name" name="shipto.contact_name" />
      <FormikInput type="hidden" name="shipto.contact_id" />
      <FormikInput label="Ship To Name" name="shipto.ship_to_name" />
      <FormikInput type="hidden" name="shipto.ship_to_id" />
      <FormikInput label="Address 1" name="shipto.address1" size="lg"/>
      <FormikInput label="Address 2" name="shipto.address2" size="lg"/>
      <FormikInput label="City" name="shipto.city" />
      <FormikInput label="State" name="shipto.state" />
      <FormikInput label="Zip" name="shipto.zip" />    
      <FormikInput label="Country" name="shipto.county" />
      <FormikInput label="Carrier" name="shipto.carrier_name" />
      <FormikInput type="hidden" name="shipto.carrier_id" />
      {/* <Field as="select" name="shipto.is_collect">
        <option value="0">No</option>
        <option value="1">Yes</option>
      </Field> */}
      <FormikInput label="Collect Number" name="shipto.collect_number" />
      <FormikInput label="Phone" name="shipto.phone" />
      <FormikInput label="Email" name="shipto.email" />
      {errors.name && <div>{errors.name}</div>}
    </WrapForm>
  </form>
)

export const defaultValues = {
  shipto: {
    name: 'shipping name'
  }
}