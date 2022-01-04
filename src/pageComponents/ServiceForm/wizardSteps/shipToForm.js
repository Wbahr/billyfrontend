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
import Required from '../../_common/required'

const WrapForm = styled.div`
    display: flex;
    flex-wrap: wrap;
	flex-direction: column;
	flex-wrap: wrap;
`
const Flex = styled.div`
    display: flex;
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

const Container = styled.div`
    max-width: 100%;
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
        setFieldTouched
    } = props
    const [showSaveShipToModal, setShowSaveShipToModal] = useState(false)
    const context = useContext(Context)

    useEffect(() => {
        window.scrollTo({ top: 0 })
    }, [])

    const handleContinueClick = () => {
        const disabled = !isStepValid && values.contact
        if (disabled) {
            touchFields()
        } else {
            handleMoveStep(1)
        }
    }

    function touchFields() {
        const fields = ['country', 'address1', 'city', 'stateOrProvince', 'zip',
            'phone', 'email', 'firstName', 'lastName']
        for (const field of fields) {
            setFieldTouched(`shipto.${field}`, true)
        }
    }

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
            saveShipTo: false,
            isCollect: !!shipToAddress?.collectNumberUps,
            collectNumber: shipToAddress?.collectNumberUps || '',
            carrierId: shipToAddress?.carrierId || -1,
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

    return (
        <WrapForm>
            {context.userInfo?.isImpersonatorUser && (
                <ContactSection>
                    <Field
                        name="contact.savedContact"
                        component={SelectField}
                        options={checkoutDropdownDataLabels.contacts}
                        width="500px"
                        label={<>Saved Order Contacts<Required /></>}
                        placeholder="Search Saved Contacts"
                        changeFunction={handleSavedContactSelectChange}
                    />
                    {values.contact.savedContact !== null && (
                        <Container>
                            <FormikInput
                                disabled={values.contact.savedContact !== -1}
                                label={<>Order Contact First Name<Required /></>}
                                name="contact.firstName"
                                onChange={handleCustomContactInput('firstName')}
                                value={values.contact.firstName}
                            />
                            <FormikInput
                                disabled={values.contact.savedContact !== -1}
                                label={<>Order Contact Last Name<Required /></>}
                                name="contact.lastName"
                                onChange={handleCustomContactInput('lastName')}
                                value={values.contact.lastName}
                            />
                            <FormikInput
                                disabled={values.contact.savedContact !== -1}
                                label={<>Order Contact Phone<Required /></>}
                                name="contact.phone"
                                onChange={handleCustomContactInput('phone')}
                                value={values.contact.phone}
                            />
                            <FormikInput
                                disabled={values.contact.savedContact !== -1}
                                label={<>Order Contact Email<Required /></>}
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
            {context.userInfo?.isAirlineEmployee && (
                <FormRow>
                    <FormikCreatableSelect
                        label={<>This form is submitted to location<Required /></>}
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
                <FormikInput label={<>First Name<Required /></>} name="shipto.firstName" />
                <FormikInput label={<>Last Name<Required /></>} name="shipto.lastName" />
            </FormRow>

            <FormRow>
                <FormikInput label={<>Phone<Required /></>} name="shipto.phone" />
                <FormikInput label={<>Email<Required /></>} name="shipto.email" />
            </FormRow>

            <FormRow>
                <FormikFormFieldContainer>
                    <FormikFormFieldLabel htmlFor='communications'>Preferred Communication Channel(s)<Required /></FormikFormFieldLabel>
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
                label={<>Address 1<Required /></>}
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
                    label={<>City<Required /></>}
                    name="shipto.city"
                    onChange={(e) => handleSavedAddressChange(e, handleChange)}
                    value={values.shipto.city}
                />
                <FormikInput
                    label={<>Zip<Required /></>}
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
                    label={<>Country<Required /></>}
                    changeFunction={handleCountryChange}
                />
                {values.shipto.country === 'us' && (
                    <>
                        <Field
                            name="shipto.stateOrProvince"
                            component={SelectField}
                            options={StateList}
                            placeholder="Select a State"
                            label={<>State<Required /></>}
                            changeFunction={(field, value) => handleStateChange(field, value, handleChange)}
                            width="200px"
                        />
                        <FormikFormFieldError style={{ width: '400px', maxWidth: '100%' }}>
                            <ErrorMessage name="shipto.stateOrProvince" />
                        </FormikFormFieldError>
                    </>
                )}
                {values.shipto.country === 'canada' && (
                    <>
                        <Field
                            name="shipto.stateOrProvince"
                            component={SelectField}
                            options={CanadianProvinceList}
                            placeholder="Select a Province"
                            label={<>Province<Required /></>}
                            changeFunction={(field, value) => handleStateChange(field, value, handleChange)}
                            width="200px"
                        />
                        <FormikFormFieldError style={{ width: '400px', maxWidth: '100%' }}>
                            <ErrorMessage name="shipto.stateOrProvince" />
                        </FormikFormFieldError>
                    </>
                )}
            </FormRow>
            <DivNavigation>
                <div></div>
                <ButtonRed onClick={handleContinueClick}>Continue</ButtonRed>
            </DivNavigation>

            <CustomShipToWarning open={showSaveShipToModal} onClose={() => setShowSaveShipToModal(false)} />
        </WrapForm>
    )
}