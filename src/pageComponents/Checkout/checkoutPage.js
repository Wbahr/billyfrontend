import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { useLazyQuery } from '@apollo/client'
import Context from '../../setup/context'
import CheckoutOrderSummary from './uiComponents/checkoutOrderSummary'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CheckoutProgress from './uiComponents/checkoutProgress'
import { connect } from 'formik'
import { useQuery } from '@apollo/client'
import { Formik } from 'formik'
import { ShippingScheduleForm } from './wizardSteps/shippingScheduleForm'
import { ShipToForm } from './wizardSteps/shipToForm'
import BillingInfoForm from './wizardSteps/billingInfoForm'
import ConfirmationScreen from './wizardSteps/confirmationScreen'
import formatDropdownData from './helpers/formatCheckoutDropdownData'
import { defaultBilling, defaultConfirmationEmail, defaultContact, defaultQuote, defaultShipTo } from './helpers'
import { startOfTomorrow } from 'date-fns'
import { GET_CHECKOUT_ITEM_DETAIL, GET_ITEM_CUSTOMER_PART_NUMBERS } from 'setup/gqlQueries/gqlItemQueries'
import { GET_ITEM_PRICE, GET_TAX_RATE, GET_CHECKOUT_DATA } from 'setup/providerGQL'
import { shippingScheduleSchema, shipToSchema, airlineShipToSchema, getBillToSchema, confirmationSchema } from './helpers/validationSchema'
import Loader from 'pageComponents/_common/loader'

const DivContainer = styled.div`
  display: flex;
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

const DivOrderTotalCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  @media(max-width: 1400px) {
    display: none;
  }
`

const Div = styled.div`
  display: flex;
  justify-content: space-between;
`

const DivRow = styled.div`
  display: flex;
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
  border: 1px solid lightgrey;
  padding: 20px;
`

const Pformheader = styled.p`
  margin: 0;
  font-family: ProximaBold;
  text-transform: uppercase;
`

const stepLabels = ['Shipping Schedule', 'Ship To', 'Bill To', 'Order Review']

function CheckoutPage({ history }) {
    const context = useContext(Context)
    const [checkoutDropdownData, setCheckoutDropdownData] = useState([])
    const [checkoutDropdownDataLabels, setCheckoutDropdownDataLabels] = useState([])
    const [paymentInfo, setPaymentInfo] = useState({})
    const [taxRateRequestInfo, setTaxRateRequestInfo] = useState({})
    const [taxRateLoading, setTaxRateLoading] = useState(false)
    const [taxRate, setTaxRate] = useState(0)
    const [currentStep, setCurrentStep] = useState(0)
    const [validationSchema, setValidationSchema] = useState(null)

    const handleMoveStep = nextStepIdx => {
        if (nextStepIdx === 0 || stepValidated[nextStepIdx - 1]) {
            setCurrentStep(nextStepIdx)
        }
    }

    const [stepValidated, setStepValidated] = useState(
        {
            0: false,
            1: false,
            2: history.location.pathname === '/create-quote',
            3: false
        }
    )

    useEffect(() => {
        if (!context.cart?.length) {
            history.replace('/cart')
        }
    }, [])

    const [getTaxRate] = useLazyQuery(GET_TAX_RATE, {
        fetchPolicy: 'no-cache',
        onCompleted: ({ getTaxRate }) => {
            setTaxRateLoading(false)
            setTaxRate(getTaxRate)
        }
    })

    useEffect(() => {
        if (taxRateRequestInfo?.zipcode) {
            setTaxRateLoading(true)
            getTaxRate({
                variables: {
                    taxRateRequest: {
                        ...taxRateRequestInfo
                    }
                }
            })
        }
    }, [taxRateRequestInfo])
  
    useEffect(() => {
        getCheckoutData()
    }, [context.impersonatedCompanyInfo])

    const getFormStepComponent = currentStep => {
        switch (currentStep) {
        case 0:
            return ShippingScheduleForm
        case 1:
            return ShipToForm
        case 2:
            return BillingInfoForm
        case 3:
            return ConfirmationScreen
        default:
            return ShippingScheduleForm
        }
    }

    function yupSchema(requiresPONumber) {
        return {
            0: shippingScheduleSchema,
            1: shipToSchema,
            2: getBillToSchema(requiresPONumber),
            3: confirmationSchema
        }
    }

    function airlineYupSchema(requiresPONumber) {
        return {
            0: shippingScheduleSchema,
            1: airlineShipToSchema,
            2: getBillToSchema(requiresPONumber),
            3: confirmationSchema
        }
    }

    const [getCheckoutData] = useLazyQuery(GET_CHECKOUT_DATA, {
        fetchPolicy: 'no-cache',
        onCompleted: result => {
            const mutatedCheckoutDropdownData = formatDropdownData(result.getCheckoutDropdownData)
            setCheckoutDropdownData(result.getCheckoutDropdownData)
            setCheckoutDropdownDataLabels(mutatedCheckoutDropdownData)
            const requiresPONumber = result.getCheckoutDropdownData.billingInfo?.requiresPONumber

            //Only Anon and Impersonating Users can Checkout - if Airline Impersonator use the airlineYupSchema
            setValidationSchema(context.userInfo?.role === 'Impersonator' ? airlineYupSchema(requiresPONumber) : yupSchema(requiresPONumber))
        }
    })

    const handleValidateFields = values => {
        validationSchema[currentStep].validate(values)
            .catch((err) => console.log(err.name, err.errors))

        validationSchema[currentStep]
            .isValid(values)
            .then((valid) => setStepValidated({ ...stepValidated, [currentStep]: valid }))
    }

    const invMastUids = context.cart?.map(item => item.frecno)
    const { data: itemsDetails } = useQuery(GET_CHECKOUT_ITEM_DETAIL, {
        variables: {
            invMastUids: invMastUids
        }
    })

    const { data: itemsPrices } = useQuery(GET_ITEM_PRICE, {
        variables: {
            items: context.cart?.map(cartItem => {
                return {
                    invMastUid: cartItem.frecno,
                    quantity: cartItem.quantity
                }
            })
        }
    })

    const { data: itemsCustomerPartNumbers } = useQuery(GET_ITEM_CUSTOMER_PART_NUMBERS, {
        variables: {
            invMastUids: invMastUids
        }
    })

    const itemInfo = {
        itemsDetails: itemsDetails?.itemDetailsBatch,
        itemsPrices: itemsPrices?.getItemPrices,
        itemsCustomerPartNumbers: itemsCustomerPartNumbers?.customerPartNumbersBatch
    }
    
    const initValues = {
        contact: { ...defaultContact },
        schedule: {
            ...defaultQuote,
            cartWithDates: context.cart?.map(cartItem => ({ ...cartItem, requestedShipDate: startOfTomorrow() })),
            shoppingCartToken: localStorage.getItem('shoppingCartToken'),
            isQuote: history.location.pathname === '/create-quote'
        },
        shipto: {
            ...defaultShipTo,
            selectedShipTo: !context.userInfo ? null : -1,
            firstName: context.userInfo?.role === 'Impersonator' ? '' : context.userInfo?.firstName || '',
            lastName: context.userInfo?.role === 'Impersonator' ? '' : context.userInfo?.lastName || '',
        },
        billing: {
            ...defaultBilling,
            paymentMethod: checkoutDropdownData.billingInfo?.isNetTerms ? 'purchase_order' : 'credit_card',
            firstName: context.userInfo?.role === 'Impersonator' ? '' : context.userInfo?.firstName || '',
            lastName: context.userInfo?.role === 'Impersonator' ? '' : context.userInfo?.lastName || '',
            companyName: checkoutDropdownData.billingInfo?.companyName || '',
            address1: checkoutDropdownData.billingInfo?.address1 || '',
            address2: checkoutDropdownData.billingInfo?.address2 || '',
            city: checkoutDropdownData.billingInfo?.city || '',
            stateOrProvince: checkoutDropdownData.billingInfo?.state || '',
            zip: checkoutDropdownData.billingInfo?.zip || '',
            country: checkoutDropdownData.billingInfo?.country.toLowerCase() || '',
        },
        confirmationEmail: defaultConfirmationEmail
    }

    const showPoOption = checkoutDropdownData.billingInfo?.isNetTerms

    const FormStepComponent = getFormStepComponent(currentStep)

    return (
        <DivContainer>
            <DivCheckoutCol>
                <Div>
                    <DivRow>
                        <FontAwesomeIcon icon="lock" />
                        <H3>Checkout</H3>
                        <CheckoutProgress {...{ stepLabels, currentStep, stepValidated, handleMoveStep }} />
                    </DivRow>
                </Div>

                <Container>
                    <Pformheader>{stepLabels[currentStep]}</Pformheader>
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
                                <form name="checkoutForm" onSubmit={e => e.preventDefault()}>
                                    <FormStepComponent {...{
                                        ...formikProps, ...itemInfo, paymentInfo, setPaymentInfo, isStepValid: stepValidated[currentStep], handleMoveStep,
                                        checkoutDropdownData, checkoutDropdownDataLabels, updateZip: (shipToId, zipcode) => setTaxRateRequestInfo({ shipToId, zipcode }), history, showPoOption
                                    }}
                                    />
                                </form>
                            )}
                        </Formik>
                    )}
                    {!validationSchema && <Loader />}
                </Container>
            </DivCheckoutCol>

            <DivOrderTotalCol>
                <CheckoutOrderSummary
                    currentStep={currentStep}
                    zipcode={taxRateRequestInfo?.zipcode || ''}
                    taxRate={taxRate}
                    taxRateLoading={taxRateLoading}
                />
            </DivOrderTotalCol>
        </DivContainer>
    )
}

export default connect(CheckoutPage)