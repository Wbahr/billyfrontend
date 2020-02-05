import React from 'react'
import { Field } from 'formik'
import FormikInput from '../../_common/formik/input_v2'
import styled from 'styled-components'
import { StateList, CanadianProvinceList } from '../../_common/helpers/helperObjects'

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

const FormRow = styled.div`
  display: flex;
  width: 100%;
`

export const ShipToForm = ({
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  errors,
}) => (
    <WrapForm>
      <FormRow>
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
      </FormRow>
      <FormikInput label="Company Name" name="shipto.company_name" width="500px" />
      <FormikInput type="hidden" name="shipto.ship_to_id" />
      <FormikInput label="First Name" name="shipto.contact_name_first" />
      <FormikInput label="Last Name" name="shipto.contact_name_last" />
      <FormikInput type="hidden" name="shipto.contact_id" />
      <FormikInput label="Address 1" name="shipto.address1" width="600px"/>
      <FormikInput label="Address 2" name="shipto.address2" width="600px"/>
      <FormikInput label="City" name="shipto.city" />
      {values.shipto.country  === "us" && 
        <>
          <label>Saved Ship To</label>
          <Field name="shipto.state">
            {({ field, form, meta }) => (
              <FormikSelect {...field}>
                {StateList.map((state)=>(<option value={state.abbreviation}>{state.name}</option>))}
              </FormikSelect>
            )}
          </Field>
        </>
      }
      {values.shipto.country  === "canada" && 
        <>
          <label>Saved Ship To</label>
          <Field name="shipto.province">
            {({ field, form, meta }) => (
              <FormikSelect {...field}>
                {CanadianProvinceList.map((province)=>(<option value={province.abbreviation}>{province.name}</option>))}
              </FormikSelect>
            )}
          </Field>
        </>
      }
      <FormikInput label="Zip" name="shipto.zip" />    
      <Field name="shipto.country">
        {({ field, form, meta }) => (
          <FormikSelect {...field}>
            <option value="us" selected>United States</option>
            <option value="canada">Canada</option>
          </FormikSelect>
        )}
      </Field>
      <FormikInput label="Carrier" name="shipto.carrier_name" />
      <FormikInput type="hidden" name="shipto.carrier_id" />
      <FormRow>
      <label>Ship Collect?</label>
        <Field as="select" name="shipto.is_collect">
          <option value="0">No</option>
          <option value="1">Yes</option>
        </Field>
        {values.shipto.is_collect  === "1" &&  <FormikInput label="Collect Number" name="shipto.collect_number" />}
      </FormRow>
      <FormikInput label="Phone" name="shipto.phone" />
      <FormikInput label="Email" name="shipto.email" />
      {errors.name && <div>{errors.name}</div>}
    </WrapForm>
)