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

export function ShipToForm(props) {
  const {
    handleSubmit, 
    handleChange, 
    handleBlur, 
    values, 
    errors, 
    checkoutDropdownDataLabels, 
    checkoutDropdownData,
    setFieldValue
  } = props

  function handleSavedAddressSelectChange(name, value){
    if(value !== -1){
      let index = checkoutDropdownData.shipToAddresses.findIndex(elem => elem.id === value)
      setFieldValue(name, value)
      setFieldValue('shipto.selected_saved_ship_to', checkoutDropdownData.shipToAddresses[index].id)
      setFieldValue('shipto.country', checkoutDropdownData.shipToAddresses[index].mailCountry.toLowerCase())
      setFieldValue('shipto.company_name', checkoutDropdownData.shipToAddresses[index].companyName)
      setFieldValue('shipto.address1', checkoutDropdownData.shipToAddresses[index].mailAddress1)
      setFieldValue('shipto.address2', checkoutDropdownData.shipToAddresses[index].mailAddress2)
      setFieldValue('shipto.city', checkoutDropdownData.shipToAddresses[index].mailCity)
      setFieldValue('shipto.state', checkoutDropdownData.shipToAddresses[index].mailState)
      setFieldValue('shipto.zip', checkoutDropdownData.shipToAddresses[index].mailPostalCode)
    } else {
      setFieldValue(name, value)
      setFieldValue('shipto.selected_saved_ship_to', -1)
      setFieldValue('shipto.country', 'us')
      setFieldValue('shipto.company_name', '')
      setFieldValue('shipto.address1', '')
      setFieldValue('shipto.address2', '')
      setFieldValue('shipto.city', '')
      setFieldValue('shipto.state', '')
      setFieldValue('shipto.zip', '')
    }
  }

  // Once this field is changed, set selected_saved_ship_to and saved_ship_to to -1 (Since what was automatically loaded was changed)
  function handleSavedAddressChange(name, value){
    setFieldValue(name, value)
    setFieldValue('shipto.saved_ship_to', -1)
    setFieldValue('shipto.selected_saved_ship_to', -1)
  }

  function handleCountryChange(name, value){
    handleSavedAddressChange(name, value)
    if(value === 'us'){
      setFieldValue('shipto.province', '')
    } else if (value === 'canada'){
      setFieldValue('shipto.state', '')
    }
  }

  function handleSavedContactSelectChange(name, value){
    if(value !== -1){
      let index = checkoutDropdownData.contacts.findIndex(elem => elem.id === value)
      setFieldValue(name, value)
      setFieldValue('shipto.selected_contact_id', checkoutDropdownData.contacts[index].id)
      setFieldValue('shipto.contact_name_first', checkoutDropdownData.contacts[index].firstName)
      setFieldValue('shipto.contact_name_last', checkoutDropdownData.contacts[index].lastName)
    } else {
      setFieldValue(name, value)
      setFieldValue('shipto.contact_name_first', '')
      setFieldValue('shipto.contact_name_last', '')
    }
  }
  
  function handleContactChange(name, value){
    setFieldValue(name, value)
    setFieldValue('shipto.saved_contact', -1)
    setFieldValue('shipto.selected_contact_id', -1)
  }

  return (
    <WrapForm>
      <Field 
        name="shipto.saved_ship_to" 
        component={SelectField} 
        options={checkoutDropdownDataLabels.shiptos}
        width="800px"
        label="Saved Ship To"
        changeFunction={handleSavedAddressSelectChange}
      /> 
      <FormikInput type="hidden" name="shipto.selected_saved_ship_to" />
      <FormikInput label="Company Name" name="shipto.company_name" width="500px" changeFunction={handleSavedAddressChange}/>
      <Field 
        name="shipto.saved_contact" 
        component={SelectField} 
        options={checkoutDropdownDataLabels.contacts}
        width="500px"
        label="Saved Contacts"
        changeFunction={handleSavedContactSelectChange}
      /> 
      <FormikInput label="First Name" name="shipto.contact_name_first" changeFunction={handleContactChange}/>
      <FormikInput label="Last Name" name="shipto.contact_name_last" changeFunction={handleContactChange}/>
      <FormikInput label="Phone" name="shipto.phone" />
      <FormikInput label="Email" name="shipto.email" />
      <FormikInput type="hidden" name="shipto.selected_contact_id" />
      <FormikInput label="Address 1" name="shipto.address1" width="600px" changeFunction={handleSavedAddressChange}/>
      <FormikInput label="Address 2" name="shipto.address2" width="600px" changeFunction={handleSavedAddressChange}/>
      <FormikInput label="City" name="shipto.city" changeFunction={handleSavedAddressChange}/>
      {values.shipto.country  === "us" && 
        <>
          <Field 
            name="shipto.state" 
            component={SelectField} 
            options={StateList}
            placeholder="Select a State"
            label="State"
            changeFunction={handleSavedAddressChange}
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
            changeFunction={handleSavedAddressChange}
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
        changeFunction={handleCountryChange}
      /> 
        <FormRow>
          <label>Ship Collect?</label>
          <Field 
            name="shipto.is_collect" 
            component={SelectField} 
            options={[{'label': 'No', 'value': '0'},{'label': 'Yes', 'value': '1'}]}
            width="100px"
            isSearchable={false}
          /> 
      </FormRow>
      <Field 
        name="shipto.carrier_name" 
        component={SelectField} 
        options={checkoutDropdownDataLabels.carriers}
        placeholder="Select a Carrier"
        label="Carrier"
      /> 
      {values.shipto.is_collect  === "1" && <FormikInput label="Collect Number" name="shipto.collect_number" />}
  </WrapForm>
  )
}