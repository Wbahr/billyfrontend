import React from 'react'
import { Field } from 'formik'
import FormikInput from '../../_common/formik/input_v2'
import styled from 'styled-components'
import { StateList, CanadianProvinceList } from '../../_common/helpers/helperObjects'
import SelectField from '../../_common/formik/select'

const WrapForm = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const FormRow = styled.div`
  display: flex;
  width: 100%;
  margin-top: 24px;
  align-items: center;
  padding: 0 8px;
  label {
    margin: 4px 8px auto 4px;
    font-style: italic;
  }
`

export const ShipToForm = ({
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  errors,
  checkoutDropdownDataLabels,
  checkoutDropdownData
}) => (
    <WrapForm>
      <Field 
        name="shipto.saved_ship_to" 
        component={SelectField} 
        options={checkoutDropdownDataLabels.shiptos}
        width="800px"
        label="Saved Ship To"
      /> 
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
          <Field 
            name="shipto.state" 
            component={SelectField} 
            options={StateList}
            placeholder="Select a State"
            label="State"
          /> 
        </>
      }
      {values.shipto.country  === "canada" && 
        <>
          <Field 
            name="shipto.province" 
            component={SelectField} 
            options={CanadianProvinceList}
            placeholder="Select a Province"
            label="Province"
          /> 
        </>
      }
      <FormikInput label="Zip" name="shipto.zip" />    
      <Field 
        name="shipto.country" 
        component={SelectField} 
        options={[{'label': 'United States', 'value': 'us'},{'label': 'Canada', 'value': 'canada'}]}
        placeholder="Select a Country"
        width="250px"
        isSearchable={false}
        label="Country"
      /> 
      <FormikInput label="Phone" name="shipto.phone" />
      <FormikInput label="Email" name="shipto.email" />
      {errors.name && <div>{errors.name}</div>}
    </WrapForm>
)