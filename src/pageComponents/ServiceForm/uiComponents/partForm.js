import React, { useContext, useRef } from 'react'
import { Button } from '@material-ui/core'
import Context from '../../../setup/context'
import FormikCheckbox from '../../_common/formik/checkBox'
import FormikCreatableSelect from '../../_common/formik/createableSelect'
import FormikInput from '../../_common/formik/input_v2'
import FormikTextArea from '../../_common/formik/textarea_v3'
import { ErrorMessage, Field } from 'formik'
import { FormikFormFieldContainer, FormikFormFieldLabel, FormikFormFieldError, FormikFormField } from 'styles/formikForm'
import styled from 'styled-components'

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
    height: 120px;
`

const Margin = styled.div`
    margin-left: 5px;
`

const Warning = styled.div`
    color: red;
    text-decoration: underline;
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

export default function PartForm(props) {
    const { idx, URGENCY, locationOptions, values, formType } = props

    const uploadRef = useRef()

    const context = useContext(Context)

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
                        <ImageContainer key={img.name}>
                            <img src={URL.createObjectURL(img)} style={{ height: '100px' }} alt={img.name} />
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
                <div>
                    <FormikCreatableSelect
                        label='Type of part*'
                        name={`parts[${idx}].type`}
                        options={partOptions}
                        {...props}
                    />
                </div>
                {context.userInfo && context.userInfo.isAirlineEmployee && (
                    <div>
                        <FormikCreatableSelect
                            label='Part Repair Location*'
                            name={`parts[${idx}].repairLocation`}
                            options={locationOptions}
                            notCreatable={true}
                            {...props}
                        />
                    </div>
                )}
            </FormRow>
            <FormRow>
                <FormikInput label="Quantity*" name={`parts[${idx}].quantity`} type='number' />
                <FormikInput label="Manufacturer*" name={`parts[${idx}].manufacturer`} placeholder='If it is not known then enter N/A' />
            </FormRow>
            <FormRow>
                <FormikInput label="Model Code*" name={`parts[${idx}].modelCode`} placeholder='If it is not known then enter N/A' />
                <FormikInput label="Part Number*" name={`parts[${idx}].partNumber`} placeholder='If it is not known then enter N/A' />
            </FormRow>
            <FormRow>
                <FormikInput label="Serial Number Code" name={`parts[${idx}].serialNumber`} />
                <FormikCheckbox
                    label="Warranty Claim"
                    name={`parts[${idx}].warranty`}
                    style={{ alignSelf: 'flex-end' }}
                    value={values.parts[idx].warranty}
                />
            </FormRow>
            <FormRow>
                <FormikTextArea
                    label="What failed on the part?*"
                    name={`parts[${idx}].failure`}
                    placeholder='If it is not known then enter N/A'
                    rows="3"
                    width='816px'
                    noHeight={true}
                />
            </FormRow>
            <FormRow>
                <FormikInput
                    label="Where is the failure located on the part?*"
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

                <FormikCheckbox
                    label="Part is involved with personnel handling and/or safety"
                    name={`parts[${idx}].safety`}
                    value={values.parts[idx].safety}
                />
            </FormRow>
            <FormRow>
                <div>
                    <FormikCreatableSelect
                        label='Fluid type*'
                        name={`parts[${idx}].fluidType`}
                        options={fluidOptions}
                        {...props}
                    />
                    <Instructions>PLEASE NOTE: THERE WILL BE AN ADDITIONAL CHARGE FOR FLUID AND RESIDUE DISPOSAL. PLEASE DRAIN ALL FLUIDS FROM COMPONENTS.</Instructions>
                </div>
            </FormRow>
            {formType === 'parts' && (
                <FormRow>
                    <div>
                        <FormikCreatableSelect
                            label='Getting the part to Airline*'
                            name={`parts[${idx}].toAirline`}
                            options={toAirlineOptions}
                            {...props}
                        />
                        <Instructions>PLEASE DRAIN ALL FLUIDS FROM COMPONENTS BEFORE SHIPMENT.</Instructions>
                    </div>
                    <FormikCreatableSelect
                        label='Returning the part to the Customer*'
                        name={`parts[${idx}].toCustomer`}
                        options={toCustomerOptions}
                        {...props}
                    />
                </FormRow>
            )}
        </div>
    )
}