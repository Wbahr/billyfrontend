import React from 'react'
import { Field } from 'formik'
import FormikInput from '../../_common/formik/input_v2'
import styled from 'styled-components'
import { CardElement } from 'react-stripe-elements'
import { StateList, CanadianProvinceList } from '../../_common/helpers/helperObjects'
import SelectField from '../../_common/formik/select'

const WrapForm = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const FormRow = styled.div`
  display: flex;
  margin-top: 24px;
  width: 100%;
  align-items: center;
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
        <Field 
          name="billing.payment_method" 
          component={SelectField} 
          options={[{'label': 'Purchase Order', 'value': 'purchase_order'},{'label': 'Credit Card', 'value': 'credit_card'}]}
          getOptionLabel={(option)=>option.label}
          getOptionValue={(option)=>option.value}
          placeholder="Select a Payment Method"
        /> 
      </FormRow>
      {values.billing.payment_method === "credit_card" && <CardElement />}
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
          <Field 
            name="billing.state" 
            component={SelectField} 
            options={StateList}
            placeholder="Select a State"
            getOptionLabel={(option)=>option.name}
            getOptionValue={(option)=>option.abbreviation}
            label="State"
          /> 
        </>
      }
      {values.billing.country  === "canada" && 
        <>
          <label>Saved Ship To</label>
          <Field 
            name="billing.province" 
            component={SelectField} 
            options={CanadianProvinceList}
            placeholder="Select a Province"
            getOptionLabel={(option)=>option.name}
            getOptionValue={(option)=>option.abbreviation}
            label="Province"
          /> 
        </>
      }
      <FormikInput label="Zip" name="billing.zip" />    
      <Field 
        name="billing.country" 
        component={SelectField} 
        options={[{'name': 'United States', 'abbreviation': 'us'},{'name': 'Canada', 'abbreviation': 'canada'}]}
        placeholder="Select a Country"
        getOptionLabel={(option)=>option.name}
        getOptionValue={(option)=>option.abbreviation}
        width="250px"
        isSearchable={false}
        label="Country"
      /> 
      <FormikInput label="Email" name="billing.email" />    
      <FormikInput label="Phone" name="billing.phone" />
    </WrapForm>
)