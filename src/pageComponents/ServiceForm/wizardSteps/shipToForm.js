import React, { useState, useContext, useEffect } from 'react'
import { Field, ErrorMessage } from 'formik'
import FormikInput from '../../_common/formik/input_v2'
import styled from 'styled-components'
import { StateList, CanadianProvinceList } from '../../_common/helpers/helperObjects'
import SelectField from '../../_common/formik/select'
import FormikCreatableSelect from '../../_common/formik/createableSelect'
import Context from '../../../setup/context'
import FormikCheckbox from '../../_common/formik/checkBox'
import { ButtonRed } from '../../../styles/buttons'
import { DivNavigation } from '../../../styles/divs'
import CustomShipToWarning from '../../_common/modals/CustomShipToWarning'
import { FormikFormFieldContainer, FormikFormFieldLabel, FormikFormFieldError, FormikFormField } from 'styles/formikForm'

const WrapForm = styled.div`
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
`
const Flex = styled.div`
    display: flex;
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

export default function ShipToForm(props) {
    const {
        values,
        setValues,
        handleChange,
        setFieldValue,
        checkoutDropdownDataLabels,
        checkoutDropdownData,
        isStepValid,
        handleMoveStep,
        locationOptions,
    } = props
    const [showSaveShipToModal, setShowSaveShipToModal] = useState(false)
    const context = useContext(Context)
    
    useEffect(() => {
        window.scrollTo({ top: 0 })
    }, [])

    const handleContinueClick = () => handleMoveStep(1)

    function handleSavedAddressChange(changeEvent, handleChange) {
        setFieldValue('shipto.selectedShipTo', -1)
        handleChange(changeEvent)
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
        setFieldValue('shipto', shipto)
        handleChange(e)
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
    }

    const handleSaveShipToChange = ({ target: { checked } }) => {
        if (checked && context.userInfo?.isAirlineEmployee) {
            setShowSaveShipToModal(true)
        }

        setFieldValue('shipto.saveShipTo', checked)
    }

    const handleCustomContactInput = name => ({ target: { value } }) => {
        setFieldValue(`contact.${name}`, value)
        setFieldValue(`shipto.${name}`, value)
    }

    const changeContactLink = `${process.env.REACT_APP_WEB_CONNECT_URL}/Common/Customers/ContactDetails.aspx?ContactID=${values.contact.savedContact}`
    const disabled = !isStepValid && values.contact

    return (
        <WrapForm>
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
                        <div>
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
                        </div>
                    )}
                </ContactSection>
            )}
            {context.userInfo?.isAirlineEmployee && (
                <FormRow>
                    <FormikCreatableSelect
                        label='This form is submitted to location*'
                        name={'shipto.submissionLocation'}
                        options={locationOptions}
                        notCreatable={true}
                        {...props}
                    />
                </FormRow>
            )}
            {!!context.userInfo && (
                <>
                    <Field
                        name="shipto.selectedShipTo"
                        component={SelectField}
                        options={checkoutDropdownDataLabels.shiptos}
                        width="800px"
                        label="Saved Ship To"
                        placeholder="Search Saved Ship Tos"
                        changeFunction={(field, value) => handleSavedAddressSelectChange(field, value, handleChange)}
                    />
                    {(values.shipto.selectedShipTo === -1) && (
                        <FormRow>
                            <FormikCheckbox
                                label="Save Ship To"
                                name="shipto.saveShipTo"
                                value={values.shipto.saveShipTo}
                                onChange={(event) => { handleSaveShipToChange(event) }}
                            />
                        </FormRow>
                    )}
                </>
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

            <FormRow>
                <FormikFormFieldContainer>
                    <FormikFormFieldLabel htmlFor='communications'>Preferred Communication Channel(s)*</FormikFormFieldLabel>
                    <Flex>
                        <FormikCheckbox
                            label="Email"
                            name="communications.email"
                            value={values.communications.email}
                            style={{ alignSelf: 'flex-start' }}
                        />
                        <FormikCheckbox
                            label="Phone"
                            name="communications.phone"
                            value={values.communications.phone}
                            style={{ alignSelf: 'flex-start' }}
                        />
                        <FormikCheckbox
                            label="Fax"
                            name="communications.fax"
                            value={values.communications.fax}
                            style={{ alignSelf: 'flex-start' }}
                        />
                    </Flex>
                    <FormikFormFieldError style={{ width: '400px' }}>
                        <ErrorMessage name='communications.email' />
                    </FormikFormFieldError>
                </FormikFormFieldContainer>
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
                    <Field
                        name="shipto.stateOrProvince"
                        component={SelectField}
                        options={StateList}
                        placeholder="Select a State"
                        label="State*"
                        changeFunction={(field, value) => handleStateChange(field, value, handleChange)}
                        width="200px"
                    />
                )}
                {values.shipto.country === 'canada' && (
                    <Field
                        name="shipto.stateOrProvince"
                        component={SelectField}
                        options={CanadianProvinceList}
                        placeholder="Select a Province"
                        label="Province*"
                        changeFunction={(field, value) => handleStateChange(field, value, handleChange)}
                        width="200px"
                    />
                )}
            </FormRow>
            <DivNavigation>
                <div></div>
                <ButtonRed disabled={disabled} onClick={handleContinueClick}>Continue</ButtonRed>
            </DivNavigation>

            <CustomShipToWarning open={showSaveShipToModal} onClose={() => setShowSaveShipToModal(false)} />
        </WrapForm>
    )
}