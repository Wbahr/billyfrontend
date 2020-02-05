import React from 'react'
import { Field } from 'formik'
import FormikInput from '../../_common/formik/input_v2'
import styled from 'styled-components'

const WrapForm = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const FormikSelect = styled.select`
  // height: 40px;
  :focus{
    outline: none;
  }
`

export const ShipToForm = ({
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  errors,
}) => (
    <WrapForm>
      <label>Saved Ship To</label>
      <Field name="shipto.saved_ship_to">
        {({ field, form, meta }) => (
          <FormikSelect {...field}>
            <option value="0" selected>Custom Ship To</option>
            <option value="1">Ship Complete</option>
            <option value="2">Ship in Two Shipments</option>
            <option value="3">Ship when Ready</option>
            <option value="4">Schedule by Line</option>
          </FormikSelect>
        )}
      </Field>
      <FormikInput label="Company Name" name="shipto.company_name" />
      <FormikInput type="hidden" name="shipto.ship_to_id" />
      <FormikInput label="First Name" name="shipto.contact_name_first" />
      <FormikInput label="Last Name" name="shipto.contact_name_last" />
      <FormikInput type="hidden" name="shipto.contact_id" />
      <FormikInput label="Address 1" name="shipto.address1" width="600px"/>
      <FormikInput label="Address 2" name="shipto.address2" width="600px"/>
      <FormikInput label="City" name="shipto.city" />
      <FormikInput label="State" name="shipto.state" />
      <FormikInput label="Zip" name="shipto.zip" />    
      <FormikInput label="Country" name="shipto.county" />
      <FormikInput label="Carrier" name="shipto.carrier_name" />
      <FormikInput type="hidden" name="shipto.carrier_id" />
      <label>Ship Collect</label>
      <Field as="select" name="shipto.is_collect">
        <option value="0">No</option>
        <option value="1">Yes</option>
      </Field>
      <FormikInput label="Collect Number" name="shipto.collect_number" />
      <FormikInput label="Phone" name="shipto.phone" />
      <FormikInput label="Email" name="shipto.email" />
      {errors.name && <div>{errors.name}</div>}
    </WrapForm>
)