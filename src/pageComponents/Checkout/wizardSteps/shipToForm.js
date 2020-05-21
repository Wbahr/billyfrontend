import React from 'react'
import _ from 'lodash'
import { Field } from 'formik'
import FormikInput from '../../_common/formik/input_v2'
import styled from 'styled-components'
import { StateList, CanadianProvinceList } from '../../_common/helpers/helperObjects'
import SelectField from '../../_common/formik/select'
import Context from '../../../config/context'
import FormikCheckbox from '../../_common/formik/checkBox'

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

const ContactSection = styled.div`
	display: flex;
	flex-wrap: wrap;
	background-color: #e7f2ff;
	width: 100%;
	padding: 8px 0;
`

export function ShipToForm(props) {
	const {
		values, 
		checkoutDropdownDataLabels, 
		checkoutDropdownData,
		setFieldValue,
		updateZip
	} = props

	function handleSavedAddressSelectChange(name, value){
		if(value !== -1){
			let index = checkoutDropdownData.shipToAddresses.findIndex(elem => elem.id === value)
			setFieldValue(name, value)
			setFieldValue('shipto.country', checkoutDropdownData.shipToAddresses[index].physCountry.toLowerCase())
			setFieldValue('shipto.companyName', checkoutDropdownData.shipToAddresses[index].companyName)
			setFieldValue('shipto.address1', checkoutDropdownData.shipToAddresses[index].physAddress1)
			setFieldValue('shipto.address2', checkoutDropdownData.shipToAddresses[index].physAddress2)
			setFieldValue('shipto.city', checkoutDropdownData.shipToAddresses[index].physCity)
			setFieldValue('shipto.stateOrProvince', checkoutDropdownData.shipToAddresses[index].physState)
			setFieldValue('shipto.zip', checkoutDropdownData.shipToAddresses[index].physPostalCode)
			setFieldValue('shipto.saveShipTo',0) //If not a custom ship to, we can't save it so set this to false 0.
			if(_.isNil(checkoutDropdownData.shipToAddresses[index].collectNumberUps)){
				setFieldValue('shipto.isCollect', 0)
				setFieldValue('shipto.collectNumber', '')
			} else {
				setFieldValue('shipto.isCollect', 1)
				setFieldValue('shipto.collectNumber', checkoutDropdownData.shipToAddresses[index].collectNumberUps)
			}
			updateZip(checkoutDropdownData.shipToAddresses[index].id, checkoutDropdownData.shipToAddresses[index].mailPostalCode)
		} else {
			setFieldValue(name, value)
			setFieldValue('shipto.country', 'us')
			setFieldValue('shipto.companyName', '')
			setFieldValue('shipto.address1', '')
			setFieldValue('shipto.address2', '')
			setFieldValue('shipto.city', '')
			setFieldValue('shipto.stateOrProvince', '')
			setFieldValue('shipto.zip', '')
			setFieldValue('shipto.isCollect', 0)
			setFieldValue('shipto.collectNumber', '')
		}
	}

	// Once this field is changed, set selected_saved_ship_to and saved_ship_to to -1 (Since what was automatically loaded was changed)
	// Keep the savedShipTo null if it is already null (customer is anon)
	function handleSavedAddressChange(name, value){
		setFieldValue(name, value)
		if(!_.isNil(values.shipto.savedShipTo)){
			setFieldValue('shipto.savedShipTo', -1)
		}
	}

	function handleCountryChange(name, value){
		handleSavedAddressChange(name, value)
		setFieldValue('shipto.stateOrProvince', '')
	}

	function handleZipChange(name, value){
		setFieldValue(name, value)
		
		if(value.length >= 5){
			updateZip(values.shipto.savedShipTo, value)
		}
	}

	function handleSavedContactSelectChange(name, value){
		if(value !== -1){
			let index = checkoutDropdownData.contacts.findIndex(elem => elem.id === value)
			setFieldValue(name, value)
			setFieldValue('contact.firstName', checkoutDropdownData.contacts[index].firstName)
			setFieldValue('contact.lastName', checkoutDropdownData.contacts[index].lastName)
			setFieldValue('contact.email', checkoutDropdownData.contacts[index].email)
			setFieldValue('contact.phone', checkoutDropdownData.contacts[index].phoneNumber)
			setFieldValue('shipto.firstName', checkoutDropdownData.contacts[index].firstName)
			setFieldValue('shipto.lastName', checkoutDropdownData.contacts[index].lastName)
			setFieldValue('shipto.email', checkoutDropdownData.contacts[index].email)
			setFieldValue('shipto.phone', checkoutDropdownData.contacts[index].phoneNumber)
		} else {
			setFieldValue(name, value)
			setFieldValue('contact.firstName', '')
			setFieldValue('contact.lastName', '')
			setFieldValue('contact.email', '')
			setFieldValue('contact.phone', '')
		}
	}
	
	function handleContactChange(name, value){
		setFieldValue(name, value)
		setFieldValue('contact.savedContact', -1)
	}

	return (
		<WrapForm>
			<Context.Consumer>
				{({userInfo}) => {
					if (!_.isNil(userInfo) && userInfo.role === 'Impersonator'){
						return(
							<ContactSection>
								<Field 
									name="contact.savedContact" 
									component={SelectField} 
									options={checkoutDropdownDataLabels.contacts}
									width="500px"
									label="Saved Order Contacts*"
									placeholder="Select an Order Contact"
									changeFunction={handleSavedContactSelectChange}
								/> 
								{values.contact.savedContact !== '' &&
									<>
										<FormikInput label="Order Contact First Name*" name="contact.firstName" changeFunction={handleContactChange}/>
										<FormikInput label="Order Contact Last Name*" name="contact.lastName" changeFunction={handleContactChange}/>
										<FormikInput label="Order Contact Phone*" name="contact.phone" changeFunction={handleContactChange}/>
										<FormikInput label="Order Contact Email*" name="contact.email" changeFunction={handleContactChange}/>
									</>
								}
							</ContactSection>
						)
					}
				}}        
			</Context.Consumer>
			<Context.Consumer>
				{({userInfo}) => {
					if (!_.isNil(userInfo)){
						return(
							<>
								{(values.shipto.savedShipTo === -1) && <FormRow><FormikCheckbox label="Save Ship To" name="shipto.saveShipTo"/></FormRow>}
								<Field 
									name="shipto.savedShipTo" 
									component={SelectField} 
									options={checkoutDropdownDataLabels.shiptos}
									width="800px"
									label="Saved Ship To"
									changeFunction={handleSavedAddressSelectChange}
								/> 
							</>
						)
					}
				}}        
			</Context.Consumer>
			<FormikInput label="Company Name" name="shipto.companyName" width="500px" changeFunction={handleSavedAddressChange}/>
			<FormikInput label="First Name*" name="shipto.firstName" />
			<FormikInput label="Last Name*" name="shipto.lastName" />
			<FormikInput label="Phone*" name="shipto.phone" />
			<FormikInput label="Email*" name="shipto.email" />
			<FormikInput label="Address 1*" name="shipto.address1" width="600px" changeFunction={handleSavedAddressChange}/>
			<FormikInput label="Address 2" name="shipto.address2" width="600px" changeFunction={handleSavedAddressChange}/>
			<FormikInput label="City*" name="shipto.city" changeFunction={handleSavedAddressChange}/>
			{values.shipto.country  === 'us' && 
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
			{values.shipto.country  === 'canada' && 
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
			<FormikInput label="Zip*" name="shipto.zip" changeFunction={handleZipChange}/>    
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
			<FormikInput label="Shipping Notes" name="shipto.shippingNotes" width="800px" />
			<Field 
				name="shipto.carrierId" 
				component={SelectField} 
				options={checkoutDropdownDataLabels.carriers}
				placeholder="Select a Carrier"
				label="Carrier*"
			/> 
			<FormRow>
				<label>Ship Collect?</label>
				<Field 
					name="shipto.isCollect" 
					component={SelectField} 
					options={[{'label': 'No', 'value': 0},{'label': 'Yes', 'value': 1}]}
					width="100px"
					isSearchable={false}
				/> 
			</FormRow>
			{values.shipto.isCollect  === 1 && <FormikInput label="Collect Number*" name="shipto.collectNumber" />}
		</WrapForm>
	)
}