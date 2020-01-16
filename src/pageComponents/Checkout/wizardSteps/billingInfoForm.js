import React from 'react'
import { Field } from 'formik'
import FormikInput from '../../_common/formik/input_v2'
import styled from 'styled-components'

const WrapForm = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const BillingInfoForm = ({
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  errors,
}) => (
  <form onSubmit={handleSubmit} autoComplete="off">
    <WrapForm>
      <FormikInput label="PO" name="billing.po" />
      <FormikInput type="hidden" name="billing.company_id" />
      <FormikInput label="Company Name" name="billing.company_name" />
      <FormikInput label="First Name" name="billing.first_name" />
      <FormikInput label="Last Name" name="billing.last_name" />
      <FormikInput label="Address 1" name="billing.address1" size="lg"/>
      <FormikInput label="Address 2" name="billing.address2" size="lg"/>
      <FormikInput label="City" name="billing.city" />
      <FormikInput label="State" name="billing.state" />
      <FormikInput label="Zip" name="billing.zip" />    
      <FormikInput label="County" name="billing.county" />
      <FormikInput label="Email" name="billing.email" />    
      <FormikInput label="Phone" name="billing.phone" />
      {errors.name && <div>{errors.name}</div>}
          {/* <Field as="select" name="shipto.payment_method">
        <option value="credit_card">Credit Card</option>
        <option value="invoice">Invoice</option>
      </Field> */}
    </WrapForm>
  </form>
)

export const defaultValues = {
  billing: {
    name: 'test bob'
  }
}