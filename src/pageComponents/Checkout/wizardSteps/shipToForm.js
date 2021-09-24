import React, { useState, useContext, useEffect } from 'react'
import { Field } from 'formik'
import { ShippingScheduleForm } from './shippingScheduleForm'
import FormikInput from '../../_common/formik/input_v2'
import styled from 'styled-components'
import { StateList, CanadianProvinceList } from '../../_common/helpers/helperObjects'
import SelectField from '../../_common/formik/select'
import Context from '../../../setup/context'
import FormikCheckbox from '../../_common/formik/checkBox'
import { ButtonBlack, ButtonRed } from '../../../styles/buttons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { packingBasis } from '../helpers/checkoutDropdownData'
import CustomShipToWarning from '../../_common/modals/CustomShipToWarning'

const WrapForm = styled.div`
	display: flex;
	flex-direction: column;
    flex-wrap: wrap;
    max-width: 100%;
`

const FormRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    max-width: 100%;
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
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 30px;
  width: 100%;
`

const Container = styled.div`
    max-width: 100%;
`

export function ShipToForm(props) {
    const { history, values, setValues, handleChange, setFieldValue, checkoutDropdownDataLabels, checkoutDropdownData, updateZip, isStepValid, handleMoveStep, setFieldTouched } = props
    const [showSaveShipToModal, setShowSaveShipToModal] = useState(false)
    const context = useContext(Context)

    const isQuote = history.location.pathname === '/create-quote'

    useEffect(() => {
        window.scrollTo({ top: 0 })
    }, [])

    function handleSavedAddressChange(changeEvent, handleChange) {
        setFieldValue('shipto.selectedShipTo', -1)
        handleChange(changeEvent)
    }

    const handleCarrierChange = (field, value) => {
        setFieldValue(field, value)
    }

    function handleCountryChange(field, value) {
        //Changing the country resets the state/province
        setFieldValue('shipto.stateOrProvince', '')
        setFieldValue('shipto.country', value)
    }

    const handleStateChange = (field, value, handleChange) => {
        handleSavedAddressChange(field, handleChange)
        setFieldValue(field, value)
    }

    function handleZipChange(changeEvent, handleChange) {
        handleSavedAddressChange(changeEvent, handleChange)
        //Pass the zip up to the parent component; tax needs to be recalculated
        if (changeEvent.target.value.length >= 5) updateZip(values.shipto.selectedShipTo, changeEvent.target.value)
    }

    function handleSavedAddressSelectChange(e, selectedShipTo, handleChange) {
        const shipToAddress = checkoutDropdownData.shipToAddresses.find(elem => elem.id === selectedShipTo)
        //Update the formik context values state
        const shipto = {
            ...values.shipto,
            selectedShipTo,
            country: (shipToAddress?.physCountry || 'us').toLowerCase(),
            companyName: shipToAddress?.companyName || '',
            address1: shipToAddress?.physAddress1 || '',
            address2: shipToAddress?.physAddress2 || '',
            city: shipToAddress?.physCity || '',
            stateOrProvince: shipToAddress?.physState || '',
            zip: shipToAddress?.physPostalCode || '',
            saveShipTo: 0,
            isCollect: !!shipToAddress?.collectNumberUps,
            collectNumber: shipToAddress?.collectNumberUps || '',
            carrierId: shipToAddress?.carrierId || '',
            shippingNotes: shipToAddress?.shippingNote || ''
        }

        const foundPackingBasis = packingBasis.find(elem => elem.apiValue === shipToAddress?.shipToPackingBasis)

        const schedule = {
            ...values.schedule,
            packingBasisName: foundPackingBasis?.value || null,
            packingBasis: shipToAddress?.shipToPackingBasis || null
        }

        setValues({ ...values, shipto, schedule })
        updateZip(shipToAddress?.id || -1, values.billing?.zip || '')
        handleChange(e)
        touchShipToFields()
    }
    
    function touchShipToFields() {
        const fields = ['country', 'address1', 'city', 'stateOrProvince', 'zip', 'carrierId', 
            'collectNumber', 'phone', 'email', 'firstName', 'lastName', 'shipToPackingBasis']
        for (const field of fields) {
            setFieldTouched(`shipto.${field}`, true)
        }
        setFieldTouched('schedule.packingBasis', true)
    }

    function handleSavedContactSelectChange(name, savedContact) {
        const contact = (checkoutDropdownData.contacts || []).find(elem => elem.id === savedContact)
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
        setTimeout(() => touchContactFields())
    }

    function touchContactFields() {
        const fields = ['phone', 'email', 'firstName', 'lastName']
        for (const field of fields) {
            setFieldTouched(`contact.${field}`, true)
        }
    }

    function handleContinueClick() {
        if (history.location.pathname === '/create-quote') {
            handleMoveStep(2)
        } else {
            handleMoveStep(1)
        }
    }

    const handleSaveShipToChange = ({ target: { checked } }) => {
        if (checked && context.userInfo?.isAirlineEmployee) {
            setShowSaveShipToModal(true)
        }

        setFieldValue('shipto.saveShipTo', checked)
    }

    const handleIsCollectChange = ({ target: { checked } }) => setFieldValue('shipto.isCollect', checked)

    const handleCustomContactInput = name => ({ target: { value } }) => {
        setFieldValue(`contact.${name}`, value)
        setFieldValue(`shipto.${name}`, value)
    }

    const changeContactLink = `${process.env.REACT_APP_WEB_CONNECT_URL}/Common/Customers/ContactDetails.aspx?ContactID=${values.contact.savedContact}`
    const disabled = !isStepValid && values.contact

    return (
        <WrapForm>
            {isQuote && (
                <FormRow>
                    <FormikInput
                        label="Quote Refererence Number"
                        name="schedule.quoteRefNo"
                        maxLength={40}
                    />
                </FormRow>
            )}
            {context.userInfo?.isImpersonatorUser && (
                <ContactSection>
                    <Field
                        name="contact.savedContact"
                        component={SelectField}
                        options={checkoutDropdownDataLabels.contacts}
                        width="500px"
                        label="Saved Order Contacts*"
                        placeholder="Search Saved Contacts"
                        changeFunction={handleSavedContactSelectChange}
                    />
                    {values.contact.savedContact !== null && (
                        <Container>
                            <FormikInput
                                disabled={values.contact.savedContact !== -1}
                                label="Order Contact First Name*"
                                name="contact.firstName"
                                onChange={handleCustomContactInput('firstName')}
                                value={values.contact.firstName}
                            />
                            <FormikInput
                                disabled={values.contact.savedContact !== -1}
                                label="Order Contact Last Name*"
                                name="contact.lastName"
                                onChange={handleCustomContactInput('lastName')}
                                value={values.contact.lastName}
                            />
                            <FormikInput
                                disabled={values.contact.savedContact !== -1}
                                label="Order Contact Phone*"
                                name="contact.phone"
                                onChange={handleCustomContactInput('phone')}
                                value={values.contact.phone}
                            />
                            <FormikInput
                                disabled={values.contact.savedContact !== -1}
                                label="Order Contact Email*"
                                name="contact.email"
                                onChange={handleCustomContactInput('email')}
                                value={values.contact.email}
                            />
                            {values.contact.savedContact !== -1 && (
                                <SavedContactDiv>
                                    Need to change your Saved Contact info?
                                    <a href={changeContactLink} target="_blank" rel="noopener noreferrer"> Click here </a>
                                    - then refresh this page.
                                </SavedContactDiv>
                            )}
                        </Container>
                    )}
                </ContactSection>
            )}
            {!!context.userInfo && (
                <Container>
                    <Field
                        name="shipto.selectedShipTo"
                        component={SelectField}
                        options={checkoutDropdownDataLabels.shiptos}
                        width="800px"
                        label="Saved Ship To"
                        placeholder="Search Saved Ship Tos"
                        changeFunction={(field, value) => handleSavedAddressSelectChange(field, value, handleChange)}
                    />
                    {(values.shipto.selectedShipTo === -1 && context.impersonatedCompanyInfo?.customerIdP21 !== 192059) && (
                        <FormRow>
                            <FormikCheckbox
                                label="Save Ship To"
                                name="shipto.saveShipTo"
                                value={values.shipto.saveShipTo}
                                onChange={(event) => { handleSaveShipToChange(event) }}
                            />
                        </FormRow>
                    )}
                </Container>
            )}
            <FormikInput
                label="Company Name"
                name="shipto.companyName"
                width={500}
                onChange={(e) => handleSavedAddressChange(e, handleChange)}
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
                width={600}
                onChange={(e) => handleSavedAddressChange(e, handleChange)}
                value={values.shipto.address1}
            />

            <FormikInput
                label="Address 2"
                name="shipto.address2"
                width={600}
                onChange={(e) => handleSavedAddressChange(e, handleChange)}
                value={values.shipto.address2}
            />

            <FormRow>
                <FormikInput
                    label="City*"
                    name="shipto.city"
                    onChange={(e) => handleSavedAddressChange(e, handleChange)}
                    value={values.shipto.city}
                />
                <FormikInput
                    label="Zip*"
                    name="shipto.zip"
                    width={150}
                    onChange={(e) => handleZipChange(e, handleChange)}
                    value={values.shipto.zip}
                />
            </FormRow>

            <FormRow>
                <Field
                    name="shipto.country"
                    component={SelectField}
                    options={[{ label: 'United States', value: 'us' }, { label: 'Canada', value: 'canada' }]}
                    placeholder="Select a Country"
                    width="250px"
                    isSearchable={false}
                    label="Country*"
                    changeFunction={handleCountryChange}
                />
                {values.shipto.country === 'us' && (
                    <>
                        <Field
                            name="shipto.stateOrProvince"
                            component={SelectField}
                            options={StateList}
                            placeholder="Select a State"
                            label="State*"
                            changeFunction={(field, value) => handleStateChange(field, value, handleChange)}
                            width="200px"
                        />
                        <FormikInput type="hidden" name="shipto.stateOrProvince" width='100%' />
                    </>
                )}
                {values.shipto.country === 'canada' && (
                    <>
                        <Field
                            name="shipto.stateOrProvince"
                            component={SelectField}
                            options={CanadianProvinceList}
                            placeholder="Select a Province"
                            label="Province*"
                            changeFunction={(field, value) => handleStateChange(field, value, handleChange)}
                            width="200px"
                        />
                        <FormikInput type="hidden" name="shipto.stateOrProvince" />
                    </>
                )}
            </FormRow>

            <FormikInput label="Shipping Notes" name="shipto.shippingNotes" width={800} />
            <Field
                name="shipto.carrierId"
                component={SelectField}
                options={checkoutDropdownDataLabels.carriers}
                placeholder="Select a Carrier"
                label="Carrier*"
                width="500px"
                changeFunction={(field, value) => handleCarrierChange(field, value, handleChange)}
                value={values.shipto.carrierId}
            />
            <FormikInput type="hidden" name="shipto.carrierId" width='100%' />
            {context.userInfo && context.userInfo.isAirlineEmployee && (
                <FormRow>
                    <FormikCheckbox
                        label="Ship Collect?"
                        name="shipto.isCollect"
                        value={values.shipto.isCollect}
                        onChange={handleIsCollectChange}
                    />
                </FormRow>
            )}
            {!!values.shipto.isCollect && <FormikInput label="Collect Number*" name="shipto.collectNumber" />}
            <ShippingScheduleForm {...props} />
            <DivNavigation>
                <ButtonBlack onClick={() => history.push('/cart')}>
                    <FontAwesomeIcon icon='shopping-cart' size="sm" color="white" />
                    Back to Cart
                </ButtonBlack>
                <ButtonRed disabled={disabled} onClick={handleContinueClick}>Continue</ButtonRed>
            </DivNavigation>

            <CustomShipToWarning open={showSaveShipToModal} onClose={() => setShowSaveShipToModal(false)} />
        </WrapForm>
    )
}
