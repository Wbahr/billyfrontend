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
    quoteDropdownDataLabels, 
    quoteDropdownData,
    setFieldValue
  } = props

  function handleSavedAddressSelectChange(name, value){
    if(value !== -1){
      let index = quoteDropdownData.shipToAddresses.findIndex(elem => elem.id === value)
      setFieldValue(name, value)
      setFieldValue('shipto.country', quoteDropdownData.shipToAddresses[index].mailCountry.toLowerCase())
      setFieldValue('shipto.companyName', quoteDropdownData.shipToAddresses[index].companyName)
      setFieldValue('shipto.address1', quoteDropdownData.shipToAddresses[index].mailAddress1)
      setFieldValue('shipto.address2', quoteDropdownData.shipToAddresses[index].mailAddress2)
      setFieldValue('shipto.city', quoteDropdownData.shipToAddresses[index].mailCity)
      setFieldValue('shipto.stateOrProvince', quoteDropdownData.shipToAddresses[index].mailState)
      setFieldValue('shipto.zip', quoteDropdownData.shipToAddresses[index].mailPostalCode)
    } else {
      setFieldValue(name, value)
      setFieldValue('shipto.country', 'us')
      setFieldValue('shipto.companyName', '')
      setFieldValue('shipto.address1', '')
      setFieldValue('shipto.address2', '')
      setFieldValue('shipto.city', '')
      setFieldValue('shipto.stateOrProvince', '')
      setFieldValue('shipto.zip', '')
    }
  }

  // Once this field is changed, set selected_saved_ship_to and saved_ship_to to -1 (Since what was automatically loaded was changed)
  function handleSavedAddressChange(name, value){
    setFieldValue(name, value)
    setFieldValue('shipto.savedShipTo', -1)
  }

  function handleCountryChange(name, value){
    handleSavedAddressChange(name, value)
    setFieldValue('shipto.stateOrProvince', '')
  }

  function handleSavedContactSelectChange(name, value){
    if(value !== -1){
      let index = quoteDropdownData.contacts.findIndex(elem => elem.id === value)
      setFieldValue(name, value)
      setFieldValue('shipto.contactNameFirst', quoteDropdownData.contacts[index].firstName)
      setFieldValue('shipto.contactNameLast', quoteDropdownData.contacts[index].lastName)
    } else {
      setFieldValue(name, value)
      setFieldValue('shipto.contactNameFirst', '')
      setFieldValue('shipto.contactNameLast', '')
    }
  }
  
  function handleContactChange(name, value){
    setFieldValue(name, value)
    setFieldValue('shipto.savedContact', -1)
  }

  return (
    <WrapForm>
      <Field 
        name="shipto.savedShipTo" 
        component={SelectField} 
        options={quoteDropdownDataLabels.shiptos}
        width="800px"
        label="Saved Ship To"
        changeFunction={handleSavedAddressSelectChange}
      /> 
      <FormikInput label="Company Name" name="shipto.companyName" width="500px" changeFunction={handleSavedAddressChange}/>
      <Field 
        name="shipto.savedContact" 
        component={SelectField} 
        options={quoteDropdownDataLabels.contacts}
        width="500px"
        label="Saved Contacts"
        changeFunction={handleSavedContactSelectChange}
      /> 
      <FormikInput label="First Name*" name="shipto.contactNameFirst" changeFunction={handleContactChange}/>
      <FormikInput label="Last Name*" name="shipto.contactNameLast" changeFunction={handleContactChange}/>
      <FormikInput label="Phone*" name="shipto.phone" />
      <FormikInput label="Email*" name="shipto.email" />
      <FormikInput label="Address 1*" name="shipto.address1" width="600px" changeFunction={handleSavedAddressChange}/>
      <FormikInput label="Address 2" name="shipto.address2" width="600px" changeFunction={handleSavedAddressChange}/>
      <FormikInput label="City*" name="shipto.city" changeFunction={handleSavedAddressChange}/>
      {values.shipto.country  === "us" && 
        <>
          <Field 
            name="shipto.stateOrProvince" 
            component={SelectField} 
            options={StateList}
            placeholder="Select a State"
            label="State*"
            changeFunction={handleSavedAddressChange}
          /> 
        </>
      }
      {values.shipto.country  === "canada" && 
        <>
          <Field 
            name="shipto.stateOrProvince" 
            component={SelectField} 
            options={CanadianProvinceList}
            placeholder="Select a Province"
            label="Province*"
            changeFunction={handleSavedAddressChange}
          /> 
        </>
      }
      <FormikInput label="Zip*" name="shipto.zip" />    
      <Field 
        name="shipto.country" 
        component={SelectField} 
        options={[{'label': 'United States', 'value': 'us'},{'label': 'Canada', 'value': 'canada'}]}
        placeholder="Select a Country"
        width="250px"
        isSearchable={false}
        label="Country*"
        changeFunction={handleCountryChange}
      /> 
      <Field 
        name="shipto.carrierId" 
        component={SelectField} 
        options={quoteDropdownDataLabels.carriers}
        placeholder="Select a Carrier"
        label="Carrier*"
      /> 
      <FormRow>
        <label>Ship Collect?</label>
        <Field 
          name="shipto.isCollect" 
          component={SelectField} 
          options={[{'label': 'No', 'value': '0'},{'label': 'Yes', 'value': '1'}]}
          width="100px"
          isSearchable={false}
        /> 
    </FormRow>
    {values.shipto.isCollect  === "1" && <FormikInput label="Collect Number*" name="shipto.collectNumber" />}
  </WrapForm>
  )
}