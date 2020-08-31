import React, {useContext, useEffect} from 'react'
import { Field } from 'formik'
import FormikInput from '../../_common/formik/input_v2'
import styled from 'styled-components'
import { StateList, CanadianProvinceList } from '../../_common/helpers/helperObjects'
import SelectField from '../../_common/formik/select'
import Context from '../../../config/context'
import FormikCheckbox from '../../_common/formik/checkBox'
import {ButtonBlack, ButtonRed} from "../../../styles/buttons";

const WrapForm = styled.div`
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
`

const FormRow = styled.div`
	display: flex;
	flex-direction: row;
`

const ContactSection = styled.div`
	display: flex;
	flex-wrap: wrap;
	background-color: #e7f2ff;
	width: 100%;
	padding: 8px 0;
`

const SavedContactDiv = styled.div`
	margin-left: 8px;
`

const DivNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  width: 100%;
`

export function ShipToForm(props) {
	const {values, setValues, checkoutDropdownDataLabels, checkoutDropdownData, setFieldValue, updateZip, isStepValid, handleMoveStep} = props
	const context = useContext(Context)
	
	useEffect(() => {
		window.scrollTo({top: 0})
	}, [])
	
	function handleSavedAddressChange({target: {name, value}}) {
		setFieldValue(name, value)
		if (values.shipto.savedShipTo) {
			setFieldValue('shipto.savedShipTo', -1)
		}
	}
	
	function handleStateOrProvinceChange(name, value) {
		handleSavedAddressChange({target: {name, value}})
	}
	
	function handleCountryChange(name, value) {
		handleSavedAddressChange({target: {name, value}})
		setFieldValue('shipto.stateOrProvince', '')
	}

	function handleZipChange({target: {name, value}}) {
		setFieldValue(name, value)
		if (value.length >= 5) updateZip(values.shipto.savedShipTo, value)
	}
	
	function handleSavedAddressSelectChange(name, savedShipTo) {
		const shipToAddress = checkoutDropdownData.shipToAddresses.find(elem => elem.id === savedShipTo)
		const shipto = {
			...values.shipto,
			savedShipTo,
			country: (shipToAddress?.physCountry || 'us').toLowerCase(),
			companyName: shipToAddress?.companyName || '',
			address1: shipToAddress?.physAddress1 || '',
			address2: shipToAddress?.physAddress2 || '',
			city: shipToAddress?.physCity || '',
			stateOrProvince: shipToAddress?.physState || '',
			zip: shipToAddress?.physPostalCode || '',
			saveShipTo: 0,
			isCollect: shipToAddress?.collectNumberUps ? 1 : 0,
			collectNumber: shipToAddress?.collectNumberUps || ''
		}
		setFieldValue('shipto', shipto)
		shipToAddress && updateZip(shipToAddress.id, shipToAddress.mailPostalCode)
	}

	function handleSavedContactSelectChange(name, savedContact) {
		const contact = checkoutDropdownData.contacts.find(elem => elem.id === savedContact)
		setValues({
			...values,
			shipto: {
				...values.shipto,
				firstName: contact?.firstName || '',
				lastName: contact?.lastName || '',
				email: contact?.email || '',
				phone: contact?.phoneNumber || ''
			},
			contact: {
				savedContact,
				firstName: contact?.firstName || '',
				lastName: contact?.lastName || '',
				email: contact?.email || '',
				phone: contact?.phoneNumber || ''
			}
		})
	}
	
	const changeContactLink = `https://p21wc.airlinehyd.com/Common/Customers/ContactDetails.aspx?ContactID=${values.contact.savedContact}`
	const disabled = !isStepValid && values.contact

	return (
		<WrapForm>
			{context.userInfo?.role === 'Impersonator' && (
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
					{values.contact.savedContact !== null && (
						<div>
							<FormikInput disabled={values.contact.savedContact !== -1} label="Order Contact First Name*" name="contact.firstName"/>
							<FormikInput disabled={values.contact.savedContact !== -1} label="Order Contact Last Name*" name="contact.lastName"/>
							<FormikInput disabled={values.contact.savedContact !== -1} label="Order Contact Phone*" name="contact.phone"/>
							<FormikInput disabled={values.contact.savedContact !== -1} label="Order Contact Email*" name="contact.email"/>
							{values.contact.savedContact !== -1 && (
								<SavedContactDiv>
									Need to change your Saved Contact info?
									<a href={changeContactLink} target="_blank" rel="noopener noreferrer"> Click here </a>
									- then refresh this page.
								</SavedContactDiv>
							)}
						</div>
					)}
				</ContactSection>
			)}
			{!!context.userInfo && (
				<>
					<Field
						name="shipto.savedShipTo"
						component={SelectField}
						options={checkoutDropdownDataLabels.shiptos}
						width="800px"
						label="Saved Ship To"
						changeFunction={handleSavedAddressSelectChange}
					/>
					{(values.shipto.savedShipTo === -1) && (
						<FormRow>
							<FormikCheckbox label="Save Ship To" name="shipto.saveShipTo"/>
						</FormRow>
					)}
				</>
			)}
			<FormikInput
				label="Company Name"
				name="shipto.companyName"
				width="500px"
				onChange={handleSavedAddressChange}
				value={values.shipto.companyName}
			/>
			
			<FormRow>
				<FormikInput label="First Name*" name="shipto.firstName" />
				<FormikInput label="Last Name*" name="shipto.lastName" />
			</FormRow>
			
			<FormRow>
				<FormikInput label="Phone*" name="shipto.phone" />
				<FormikInput label="Email*" name="shipto.email" />
			</FormRow>
			
			<FormikInput
				label="Address 1*"
				name="shipto.address1"
				width="600px"
				onChange={handleSavedAddressChange}
				value={values.shipto.address1}
			/>
			
			<FormikInput
				label="Address 2"
				name="shipto.address2"
				width="600px"
				onChange={handleSavedAddressChange}
				value={values.shipto.address2}
			/>
			
			<FormRow>
				<FormikInput
					label="City*"
					name="shipto.city"
					onChange={handleSavedAddressChange}
					value={values.shipto.city}
				/>
				<FormikInput
					label="Zip*"
					name="shipto.zip"
					width="150px"
					onChange={handleZipChange}
					value={values.shipto.zip}
					style={{width: 'auto'}}
				/>
			</FormRow>
			
			<FormRow>
				<Field
					name="shipto.country"
					component={SelectField}
					options={[{label: 'United States', value: 'us'}, {label: 'Canada', value: 'canada'}]}
					placeholder="Select a Country"
					width="250px"
					isSearchable={false}
					label="Country*"
					changeFunction={handleCountryChange}
				/>
				{values.shipto.country  === 'us' && (
					<Field
						name="shipto.stateOrProvince"
						component={SelectField}
						options={StateList}
						placeholder="Select a State"
						label="State*"
						changeFunction={handleStateOrProvinceChange}
						width="200px"
					/>
				)}
				{values.shipto.country  === 'canada' && (
					<Field
						name="shipto.stateOrProvince"
						component={SelectField}
						options={CanadianProvinceList}
						placeholder="Select a Province"
						label="Province*"
						changeFunction={handleStateOrProvinceChange}
						width="200px"
					/>
				)}
			</FormRow>
			
			<FormikInput label="Shipping Notes" name="shipto.shippingNotes" width="800px" />
			<Field 
				name="shipto.carrierId" 
				component={SelectField} 
				options={checkoutDropdownDataLabels.carriers}
				placeholder="Select a Carrier"
				label="Carrier*"
			/>
			
			<FormRow>
				<FormikCheckbox label="Ship Collect?" name="shipto.isCollect" value={values.shipto.isCollect}/>
			</FormRow>
			{!!values.shipto.isCollect && <FormikInput label="Collect Number*" name="shipto.collectNumber" />}
			
			<DivNavigation>
				<ButtonBlack onClick={() => handleMoveStep(0)}>Previous</ButtonBlack>
				<ButtonRed disabled={disabled} onClick={() => handleMoveStep(2)}>Continue</ButtonRed>
			</DivNavigation>
		</WrapForm>
	)
}