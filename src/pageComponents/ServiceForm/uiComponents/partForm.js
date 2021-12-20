import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button } from '@mui/material'
import Context from '../../../setup/context'
import FormikCheckbox from '../../_common/formik/checkBox'
import FormikCreatableSelect from '../../_common/formik/createableSelect'
import FormikInput from '../../_common/formik/input_v2'
import FormikTextArea from '../../_common/formik/textarea_v3'
import { ErrorMessage, Field } from 'formik'
import { FormikFormFieldContainer, FormikFormFieldLabel, FormikFormFieldError, FormikFormField } from 'styles/formikForm'
import styled from 'styled-components'
import Required from '../../_common/required'

const PART_TYPES = [
    'Accumulator',
    'Electrical Motor',
    'Hydr Motor',
    'Manifold Assembly',
    'Service Bay',
    'Winch',
    'Cylinder',
    'Gas Booster',
    'Hydr Power Unit',
    'Pump',
    'Valve'
]

const FLUID_TYPES = [
    'Mineral Oil',
    'Compressed Air',
    'Helium',
    'Phosphate Ester',
    'Nitrogen',
    'Water Glycol',
    'Oxygen',
]

const TO_AIRLINE_SHIP_TYPES = [
    'Will ship',
    'Will drop off',
    'Already shipped',
    'Pick up (including Red Pallet)',
    'Picked up in service call'
]

const TO_CUSTOMER_SHIP_TYPES = [
    'Will pick up',
    'Please drop off',
    'Fedex',
    'UPS',
    'LTL'
]

const FormRow = styled.div`
    display: flex;
    flex-wrap: wrap;
	width: 100%;
	margin-top: 24px;
    align-items: flex-start;
    justify-content: space-between;
	padding: 0 8px;
	label {
		margin: 4px 8px auto 4px;
	}
`

const Instructions = styled.div`
    font-size: 10px;
    padding: 0 16px;
`

const CheckLabel = styled.label`
    display: flex; 
    justify-content: space-between; 
    align-items: center;
`

const Flex = styled.div`
    display: flex;
`

const ImageContainer = styled.div`
    margin: 10px; 
    border: 1px solid black;
`

const ImagesContainer = styled.div`
    display: flex;
    width: 100%;
    height: 120px;
`

const Margin = styled.div`
    margin-left: 5px;
`

const Warning = styled.div`
    color: red;
    text-decoration: underline;
`

const Container = styled.div`
    max-width: 100%;
`

function makeOptions(arr) {
    return arr.map(field => {
        return { label: field, value: field }
    })
}

const partOptions = makeOptions(PART_TYPES)
const fluidOptions = makeOptions(FLUID_TYPES)
const toAirlineOptions = makeOptions(TO_AIRLINE_SHIP_TYPES)
const toCustomerOptions = makeOptions(TO_CUSTOMER_SHIP_TYPES)
const yesNoOptions = [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
]

export default function PartForm(props) {
    const { idx, URGENCY, locationOptions, values, formType, setFieldValue } = props
    const [carrierNumbers, setCarrierNumbers] = useState({})
    const [poNumbers, setPoNumbers] = useState([])
    const uploadRef = useRef()

    const context = useContext(Context)
    
    useEffect(() => {
        getPoNumbers()
        getCarrierNumbers()
    }, [])

    function getPoNumbers() {
        //po number call
        setPoNumbers([])
    }

    function getCarrierNumbers() {
        //carrier number call
        setCarrierNumbers({ UPS: 1 })
    }

    useEffect(() => {
        if (values.parts[idx].toCustomer) {
            setFieldValue(`parts[${idx}].carrierNumber`, carrierNumbers[values.parts[idx].toCustomer] || '')
        }
    }, [values.parts[idx].toCustomer])

    const RadioButtons = () => (
        <Flex role='group'>
            <CheckLabel>
                <Field
                    value={URGENCY.NORMAL}
                    name={`parts[${idx}].urgency`}
                    type="radio"
                />
                <Margin>{URGENCY.NORMAL}</Margin>
            </CheckLabel>
            <CheckLabel>
                <Field
                    value={URGENCY.EMERGENCY}
                    name={`parts[${idx}].urgency`}
                    type="radio"
                />
                <Margin>{URGENCY.EMERGENCY}</Margin>
            </CheckLabel>
        </Flex>
    )

    const Upload = ({ setFieldValue }) => (
        <div>
            <ImagesContainer>
                {values?.parts[idx]?.images?.map(img => {
                    return (
                        <ImageContainer key={img.name} style={{ maxWidth: `calc(100% / ${values?.parts[idx]?.images?.length} - 40px)` }}>
                            <img src={URL.createObjectURL(img)} style={{ height: '100%', width: '100%' }} alt={img.name} />
                        </ImageContainer>
                    )
                })}
            </ImagesContainer>
            <input
                type="file"
                id="img"
                name="img[]"
                accept="image/*"
                onChange={(e) => {
                    setFieldValue(`parts[${idx}].images`, [...values.parts[idx].images, ...e.target.files])
                }
                }
                multiple
                style={{ display: 'none' }}
                ref={uploadRef}
            />
            <Button
                onClick={() => uploadRef.current.click()}
                disabled={values?.parts[idx]?.images?.length >= 5}
                variant='contained'
            >
                Upload
            </Button>
        </div>
    )

    return (
        <div>
            <FormikFormFieldContainer>
                <FormikFormFieldLabel htmlFor={`parts[${idx}].urgency`}>Urgency of the repair</FormikFormFieldLabel>
                <FormikFormField
                    name={`parts[${idx}].urgency`}
                    id={`parts[${idx}].urgency`}
                    component={RadioButtons}
                />
                <FormikFormFieldError style={{ width: '400px' }}>
                    <ErrorMessage name={`parts[${idx}].urgency`} />
                </FormikFormFieldError>
            </FormikFormFieldContainer>
            <Instructions>Quote Normal: 3-5 days , Quote Emergency: 1 day. Please note that all days are business days after part is received.</Instructions>
            {values.parts[idx].urgency === URGENCY.EMERGENCY &&
                <Warning>Please note that all emergency repairs require a PO or credit card prior to receiving the component.  We will call you at the number provided on the first page for this information.</Warning>}
            <FormRow>
                <Container>
                    <FormikCreatableSelect
                        label={<>Type of part<Required /></>}
                        name={`parts[${idx}].type`}
                        options={partOptions}
                        {...props}
                    />
                </Container>
                {context.userInfo && context.userInfo.isAirlineEmployee && (
                    <Container>
                        <FormikCreatableSelect
                            label={<>Part Repair Location<Required /></>}
                            name={`parts[${idx}].repairLocation`}
                            options={locationOptions}
                            notCreatable={true}
                            {...props}
                        />
                    </Container>
                )}
            </FormRow>
            <FormRow>
                <FormikCreatableSelect
                    label="Warranty Claim"
                    name={`parts[${idx}].warranty`}
                    value={values.parts[idx].warranty}
                    options={yesNoOptions}
                    notCreatable={true}
                    {...props}
                />
            </FormRow>
            {values.parts[idx].warranty === true && (
                <FormRow>
                    <FormikCreatableSelect
                        label="PO Number"
                        name={`parts[${idx}].poNo`}
                        options={poNumbers}
                        {...props}
                    />
                </FormRow>
            )}
            <FormRow>
                <FormikInput label={<>Quantity<Required /></>} name={`parts[${idx}].quantity`} type='number' />
                <FormikInput label={<>Manufacturer<Required /></>} name={`parts[${idx}].manufacturer`} placeholder='If it is not known then enter N/A' />
            </FormRow>
            <FormRow>
                <FormikInput label={<>Model Code<Required /></>} name={`parts[${idx}].modelCode`} placeholder='If it is not known then enter N/A' />
                <FormikInput label={<>Part Number<Required /></>} name={`parts[${idx}].partNumber`} placeholder='If it is not known then enter N/A' />
            </FormRow>
            <FormRow>
                <FormikInput label={<>Serial Number Code</>} name={`parts[${idx}].serialNumber`} />
            </FormRow>
            <FormRow>
                <FormikTextArea
                    label={<>What failed on the part?<Required /></>}
                    name={`parts[${idx}].failure`}
                    placeholder='If it is not known then enter N/A'
                    rows="3"
                    width='816px'
                    noHeight={true}
                />
            </FormRow>
            <FormRow>
                <FormikInput
                    label={<>Where is the failure located on the part?<Required /></>}
                    name={`parts[${idx}].failureLocation`}
                    placeholder='Example: cylinder cap-end port.'
                />
                <FormikInput label="How many hours was the part in service?" name={`parts[${idx}].serviceHours`} type='number' />
            </FormRow>
            <FormRow>
                <FormikTextArea
                    label="Describe what the part and/or machine is used for and the circumstances of the failure."
                    name={`parts[${idx}].circumstances`}
                    placeholder="Example: changed the cap-end fitting of the cylinder when noticed that the rod is heavily scored"
                    rows="3"
                    width='816px'
                    noHeight={true}
                />
            </FormRow>
            <FormRow>
                <FormikTextArea
                    label="Describe other details of the problem."
                    name={`parts[${idx}].otherDetails`}
                    placeholder=""
                    rows="3"
                    width='816px'
                    noHeight={true}
                />
            </FormRow>
            <FormRow>
                <FormikFormFieldContainer>
                    <FormikFormFieldLabel htmlFor={`parts[${idx}].images`}>Upload pictures</FormikFormFieldLabel>
                    <FormikFormField
                        name={`parts[${idx}].images`}
                        id={`parts[${idx}].images`}
                        component={Upload}
                        {...props}
                    />
                    <FormikFormFieldError style={{ width: '400px' }}>
                        <ErrorMessage name={`parts[${idx}].urgency`} />
                    </FormikFormFieldError>
                </FormikFormFieldContainer>
            </FormRow>
            <FormRow>
                <FormikCheckbox
                    label="Special Testing or Certificate Required"
                    name={`parts[${idx}].certification`}
                    value={values.parts[idx].certification}
                />
            </FormRow>
            <FormRow>
                <FormikCreatableSelect
                    label={<>Part is involved with personnel handling and/or safety <Required /></>}
                    name={`parts[${idx}].safety`}
                    options={yesNoOptions}
                    value={values.parts[idx].safety}
                    notCreatable={true}
                    {...props}
                />
            </FormRow>
            <FormRow>
                <Container>
                    <FormikCreatableSelect
                        label={<>Fluid type<Required /></>}
                        name={`parts[${idx}].fluidType`}
                        options={fluidOptions}
                        {...props}
                    />
                    <Instructions>PLEASE NOTE: THERE WILL BE AN ADDITIONAL CHARGE FOR FLUID AND RESIDUE DISPOSAL. PLEASE DRAIN ALL FLUIDS FROM COMPONENTS.</Instructions>
                </Container>
            </FormRow>
            {formType === 'parts' && (
                <FormRow>
                    <Container>
                        <FormikCreatableSelect
                            label={<>Getting the part to Airline<Required /></>}
                            name={`parts[${idx}].toAirline`}
                            options={toAirlineOptions}
                            {...props}
                        />
                        <Instructions>PLEASE DRAIN ALL FLUIDS FROM COMPONENTS BEFORE SHIPMENT.</Instructions>
                    </Container>
                    <FormikCreatableSelect
                        label={<>Returning the part to the Customer<Required /></>}
                        name={`parts[${idx}].toCustomer`}
                        options={toCustomerOptions}
                        {...props}
                    />
                    {['Fedex', 'UPS', 'LTL'].includes(values.parts[idx].toCustomer) && (
                        <Container>
                            <FormikInput
                                label="Carrier Number"
                                name={`parts[${idx}].carrierNumber`}
                                {...props}
                            />
                        </Container>
                    )}
                </FormRow>
            )}
        </div>
    )
}