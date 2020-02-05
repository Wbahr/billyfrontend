import React from 'react'
import { Field } from 'formik'
import FormikInput from '../../_common/formik/input_v2'
import styled from 'styled-components'
import { CardElement } from 'react-stripe-elements'
import { StateList, CanadianProvinceList } from '../../_common/helpers/helperObjects'

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

const FormikSelect = styled.select`
  // height: 40px;
  :focus{
    outline: none;
  }
`

export const BillingInfoForm = ({
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  errors,
}) => (
    <WrapForm>
      <FormRow>
        <label htmlFor="payment_method">How would you like to pay?</label>
          <Field name="billing.payment_method">
          {({ field, form, meta }) => (
            <FormikSelect {...field}>
              <option value="0" disabled selected>Select a Payment Method</option>
              <option value="purchase_order">Purchase Order</option>
              <option value="credit_card">Credit Card</option>
            </FormikSelect>
          )}
        </Field>
      </FormRow>
      {values.payment_method === "credit_card" && <CardElement />}
      <FormikInput label="PO Number" name="billing.po" />
      <FormikInput type="hidden" name="billing.company_id" />
      <FormikInput label="Company Name" name="billing.company_name" width="500px"/>
      <FormikInput label="First Name" name="billing.contact_first_name" />
      <FormikInput label="Last Name" name="billing.contact_last_name" />
      <FormikInput label="Address 1" name="billing.address1" width="600px"/>
      <FormikInput label="Address 2" name="billing.address2" width="600px"/>
      <FormikInput label="City" name="billing.city" />
      {values.billing.country  === "us" && 
        <>
          <label>Saved Ship To</label>
          <Field name="billing.state">
            {({ field, form, meta }) => (
              <FormikSelect {...field}>
                <option value="0" selected>Select a State</option>
                {StateList.map((state)=>(<option value={state.abbreviation}>{state.name}</option>))}
              </FormikSelect>
            )}
          </Field>
        </>
      }
      {values.billing.country  === "canada" && 
        <>
          <label>Saved Ship To</label>
          <Field name="billing.province">
            {({ field, form, meta }) => (
              <FormikSelect {...field}>
                <option value="0" selected>Select a Province</option>
                {CanadianProvinceList.map((province)=>(<option value={province.abbreviation}>{province.name}</option>))}
              </FormikSelect>
            )}
          </Field>
        </>
      }
      <FormikInput label="Zip" name="billing.zip" />    
      <Field name="billing.country">
        {({ field, form, meta }) => (
          <FormikSelect {...field}>
            <option value="us" selected>United States</option>
            <option value="canada">Canada</option>
          </FormikSelect>
        )}
      </Field>
      <FormikInput label="Email" name="billing.email" />    
      <FormikInput label="Phone" name="billing.phone" />
    </WrapForm>
)