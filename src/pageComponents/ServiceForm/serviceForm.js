import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useLazyQuery } from '@apollo/client'
import Context from '../../setup/context'
import ServiceProgress from './uiComponents/serviceProgress'
import { connect } from 'formik'
import { Formik } from 'formik'
import BillingInfoForm from './wizardSteps/billingInfoForm'
import ConfirmationScreen from './wizardSteps/confirmationScreen'
import PartsForm from './wizardSteps/partsForm'
import ShipToForm from './wizardSteps/shipToForm'
import formatDropdownData from './helpers/formatCheckoutDropdownData'
import {
    defaultBilling,
    defaultContact,
    defaultShipTo,
    emptyPart
} from './helpers'
import { GET_CHECKOUT_DATA } from 'setup/providerGQL'
import {
    partSchema,
    airlinePartSchema,
    shipToSchema,
    airlineShipToSchema,
    billToSchema,
    serviceSchema,
    airlineServiceSchema,
    confirmationSchema
} from './helpers/validationSchema'
import Loader from 'pageComponents/_common/loader'
import { ButtonBlack } from 'styles/buttons'

const DivContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1400px;
  margin: 0 auto;
  flex-grow: inherit;
`

const DivCheckoutCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 920px;
  @media(max-width: 1000px) {
    width: 100%;
  }
`

const Div = styled.div`
  display: flex;
  justify-content: space-between;
`

const DivRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-bottom;
  margin: 0 20px 0 20px;
  p {
    cursor: pointer;
    color: grey;
    margin: 0 0 2px 12px;
    align-self: flex-end;
    font-size: 12px;
  }
`

const H3 = styled.h3`
  font-family: ProximaBold;
  text-transform: uppercase;
  padding-left: 8px;
  margin: 0 0 2px 4px;
`

const Container = styled.div`
  margin: 20px;
  font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
  font-size: 18px;
  height: 100%;
  max-width: calc(100vw - 40px);
  border: 1px solid lightgrey;
  padding: 20px;
  @media(max-width: 500px) {
    border: none;
    padding: 0px;
  }
`

const Pformheader = styled.p`
  margin: 0;
  font-family: ProximaBold;
  text-transform: uppercase;
`
const URGENCY = {
    NORMAL: 'Normal',
    EMERGENCY: 'Emergency'
}

const locationOptions = [
    { label: 'Bensalem, (PA)', value: 'Bensalem' },
    { label: 'Lancaster (NY)', value: 'Lancaster' },
    { label: 'Ocean View (NJ)', value: 'Ocean View' },
    { label: 'Pittsburgh (PA)', value: 'Pittsburgh' }
]

function ServiceForm() {
    const context = useContext(Context)
    const [checkoutDropdownData, setCheckoutDropdownData] = useState([])
    const [checkoutDropdownDataLabels, setCheckoutDropdownDataLabels] = useState([])
    const [currentStep, setCurrentStep] = useState(0)
    const [formType, setFormType] = useState('parts')
    const [validationSchema, setValidationSchema] = useState(null)

    const [stepValidated, setStepValidated] = useState(
        {
            0: false,
            1: false,
            2: false,
            3: false
        }
    )

    useEffect(() => {
        getCheckoutData()
    }, [context.impersonatedCompanyInfo])

    useEffect(() => {
        //Only Anon and Impersonating Users can Checkout - if Airline Impersonator use the airlineYupSchema
        setValidationSchema(context.userInfo?.isImpersonatorUser ? airlineYupSchema : yupSchema)
    }, [formType])

    function yupSchema() {
        return {
            0: shipToSchema,
            1: billToSchema,
            2: formType === 'parts' ? partSchema : serviceSchema,
            3: confirmationSchema
        }
    }

    function airlineYupSchema() {
        return {
            0: airlineShipToSchema,
            1: billToSchema,
            2: formType === 'parts' ? airlinePartSchema : airlineServiceSchema,
            3: confirmationSchema
        }
    }

    const [getCheckoutData] = useLazyQuery(GET_CHECKOUT_DATA, {
        fetchPolicy: 'no-cache',
        onCompleted: result => {
            const mutatedCheckoutDropdownData = formatDropdownData(result.getCheckoutDropdownData)
            setCheckoutDropdownData(result.getCheckoutDropdownData)
            setCheckoutDropdownDataLabels(mutatedCheckoutDropdownData)
        }
    })

    const handleValidateFields = values => {
        validationSchema[currentStep].validate(values)
            .catch((err) => console.log(err.name, err.errors))

        validationSchema[currentStep]
            .isValid(values)
            .then((valid) => setStepValidated({ ...stepValidated, [currentStep]: valid }))
    }

    const loggedInUserContactInfo = checkoutDropdownData.contacts?.[0]

    const serviceDraft = JSON.parse(localStorage.getItem('serviceDraft'))

    const initValues = serviceDraft || {
        contact: { ...defaultContact },
        communications: {
            email: false,
            phone: false,
            fax: false
        },
        shipto: {
            ...defaultShipTo,
            selectedShipTo: -1,
            firstName: context.userInfo?.isImpersonatorUser ? '' : loggedInUserContactInfo?.firstName || '',
            lastName: context.userInfo?.isImpersonatorUser ? '' : loggedInUserContactInfo?.lastName || '',
            phone: context.userInfo?.isImpersonatorUser ? '' : loggedInUserContactInfo?.phoneNumber || '',
            email: context.userInfo?.isImpersonatorUser ? '' : loggedInUserContactInfo?.email || ''
        },
        billing: {
            ...defaultBilling,
            firstName: context.userInfo?.isImpersonatorUser ? '' : loggedInUserContactInfo?.firstName || '',
            lastName: context.userInfo?.isImpersonatorUser ? '' : loggedInUserContactInfo?.lastName || '',
            phone: context.userInfo?.isImpersonatorUser ? '' : loggedInUserContactInfo?.phoneNumber || '',
            email: context.userInfo?.isImpersonatorUser ? '' : loggedInUserContactInfo?.email || '',
            companyName: checkoutDropdownData.billingInfo?.companyName || '',
            address1: checkoutDropdownData.billingInfo?.address1 || '',
            address2: checkoutDropdownData.billingInfo?.address2 || '',
            city: checkoutDropdownData.billingInfo?.city || '',
            stateOrProvince: checkoutDropdownData.billingInfo?.state || '',
            zip: checkoutDropdownData.billingInfo?.zip || '',
            country: checkoutDropdownData.billingInfo?.country?.toLowerCase() || '',
            sameAsShipping: false,
        },
        parts: [
            emptyPart
        ]
    }

    return (
        <DivContainer>
            <DivCheckoutCol>
                {validationSchema && (
                    <Formik
                        initialValues={initValues}
                        enableReinitialize={false}
                        validationSchema={validationSchema[currentStep]}
                        validate={handleValidateFields}
                        validateOnBlur={true}
                        validateOnChange={true}
                    >
                        {formikProps => (
                            <form name="serviceForm" onSubmit={e => e.preventDefault()}>
                                <FormContainer
                                    isStepValid={stepValidated[currentStep]}
                                    {...{
                                        ...formikProps, checkoutDropdownData, checkoutDropdownDataLabels,
                                        stepValidated, currentStep, setCurrentStep, validationSchema, formType, setFormType
                                    }}
                                />
                            </form>
                        )}
                    </Formik>
                )}
            </DivCheckoutCol>
        </DivContainer>
    )
}

const getFormStepComponent = currentStep => {
    switch (currentStep) {
    case 0:
        return ShipToForm
    case 1:
        return BillingInfoForm
    case 2:
        return PartsForm
    case 3:
        return ConfirmationScreen
    default:
        return ShipToForm
    }
}


const FormContainer = props => {
    const { currentStep, setCurrentStep, stepValidated, validationSchema, formType, setFormType, values } = props

    const handleMoveStep = nextStepIdx => {
        const prevStepKeys = Object.keys(stepValidated).filter(i => i < nextStepIdx)
        if (prevStepKeys.every(i => stepValidated[i]) && nextStepIdx !== currentStep) {
            setCurrentStep(nextStepIdx)
        }
    }

    const FormStepComponent = getFormStepComponent(currentStep)

    const stepLabels = [formType === 'parts' ? 'Ship To' : 'Service Location', 'Bill To', 'Parts', 'Review']

    return (
        <>
            <Div>
                <DivRow>
                    <H3>{formType === 'parts' ? 'Repair Intake' : 'Service'}</H3>
                    <ServiceProgress {...{ stepLabels, currentStep, stepValidated, handleMoveStep }} />
                </DivRow>
            </Div>
            <Div>
                <RadioGroup
                    aria-label="Form Type"
                    name="formType"
                    value={formType}
                    onChange={(e) => setFormType(e.target.value)}
                    row
                    style={{ marginLeft: '20px' }}
                >
                    <FormControlLabel value="parts" control={<Radio />} label="Repair part(s)" />
                    {/* <FormControlLabel value="service" control={<Radio />} label="Service or Installation at Customer's Location" /> */}
                </RadioGroup>
                <ButtonBlack onClick={() => localStorage.setItem('serviceDraft', JSON.stringify(values))}>Save As Draft</ButtonBlack>
            </Div>
            <Container>
                <Pformheader>{stepLabels[currentStep]}</Pformheader>
                <FormStepComponent {...{ ...props, handleMoveStep, emptyPart, URGENCY, locationOptions }} />
                {!validationSchema && <Loader />}
            </Container>
        </>
    )
}

export default connect(ServiceForm)
