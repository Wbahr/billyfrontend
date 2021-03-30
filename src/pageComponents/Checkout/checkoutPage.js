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
import {
    defaultBilling,
    defaultConfirmationEmail,
    defaultContact,
    defaultQuote,
    defaultShipTo,
    transformForPaymentInfo
} from './helpers'
import { startOfTomorrow } from 'date-fns'
import { GET_CHECKOUT_ITEM_DETAIL, GET_ITEM_CUSTOMER_PART_NUMBERS } from 'setup/gqlQueries/gqlItemQueries'
import { GET_ITEM_PRICE, GET_TAX_RATE, GET_CHECKOUT_DATA, GET_PAYMENT_METHOD_INFO } from 'setup/providerGQL'
import { shippingScheduleSchema, shipToSchema, airlineShipToSchema, getBillToSchema, confirmationSchema } from './helpers/validationSchema'
import Loader from 'pageComponents/_common/loader'
import { cartHasZeroPricedItem } from 'pageComponents/_common/helpers/generalHelperFunctions'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'

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

function CheckoutPage({ history }) {
    const context = useContext(Context)
    const [checkoutDropdownData, setCheckoutDropdownData] = useState([])
    const [checkoutDropdownDataLabels, setCheckoutDropdownDataLabels] = useState([])
    const [taxRateRequestInfo, setTaxRateRequestInfo] = useState({})
    const [taxRateLoading, setTaxRateLoading] = useState(false)
    const [taxRate, setTaxRate] = useState(0)
    const [currentStep, setCurrentStep] = useState(0)
    const [validationSchema, setValidationSchema] = useState(null)

    const [stepValidated, setStepValidated] = useState(
        {
            0: false,
            1: false,
            2: history.location.pathname === '/create-quote',
            3: false
        }
    )

    const { data: itemsPrices } = useQuery(GET_ITEM_PRICE, {
        variables: {
            items: context.cart?.map(cartItem => {
                return {
                    invMastUid: cartItem.invMastUid,
                    quantity: cartItem.quantity
                }
            })
        }
    })

    useEffect(() => {
        if (!context.cart?.length) {
            history.replace('/cart')
        }

        if (context.userInfo?.isAirlineEngineerUser){
            history.replace('/cart')
        }
    }, [])

    useEffect(() => {
        if (cartHasZeroPricedItem(context.cart, itemsPrices)){
            history.replace('/cart')
        }
    }, [itemsPrices])

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
            setValidationSchema(context.userInfo?.isImpersonatorUser ? airlineYupSchema(requiresPONumber) : yupSchema(requiresPONumber))
        }
    })

    const handleValidateFields = values => {
        validationSchema[currentStep].validate(values)
            .catch((err) => console.log(err.name, err.errors))

        validationSchema[currentStep]
            .isValid(values)
            .then((valid) => setStepValidated({ ...stepValidated, [currentStep]: valid }))
    }

    const invMastUids = context.cart?.map(item => item.invMastUid)
    const { data: itemsDetails } = useQuery(GET_CHECKOUT_ITEM_DETAIL, {
        variables: {
            invMastUids: invMastUids
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
            selectedShipTo: null,
            firstName: context.userInfo?.isImpersonatorUser ? '' : context.userInfo?.firstName || '',
            lastName: context.userInfo?.isImpersonatorUser  ? '' : context.userInfo?.lastName || '',
        },
        billing: {
            ...defaultBilling,
            paymentMethod: checkoutDropdownData.billingInfo?.isNetTerms ? 'purchase_order' : 'credit_card',
            firstName: context.userInfo?.isImpersonatorUser  ? '' : context.userInfo?.firstName || '',
            lastName: context.userInfo?.isImpersonatorUser  ? '' : context.userInfo?.lastName || '',
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
                            <form name="checkoutForm" onSubmit={e => e.preventDefault()}>
                                <FormContainer
                                    isStepValid={stepValidated[currentStep]}
                                    updateZip={(shipToId, zipcode) => setTaxRateRequestInfo({ shipToId, zipcode })}
                                    {...{ ...formikProps, ...itemInfo, checkoutDropdownData, checkoutDropdownDataLabels,
                                        history, showPoOption, stepValidated, currentStep, setCurrentStep, validationSchema }}
                                />
                            </form>
                        )}
                    </Formik>
                )}
            </DivCheckoutCol>

            <DivOrderTotalCol>
                <CheckoutOrderSummary
                    history={history}
                    currentStep={currentStep}
                    zipcode={taxRateRequestInfo?.zipcode || ''}
                    taxRate={taxRate}
                    taxRateLoading={taxRateLoading}
                />
            </DivOrderTotalCol>
        </DivContainer>
    )
}

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


const FormContainer = props => {
    const { currentStep, setCurrentStep, stepValidated, validationSchema, values: { billing: { cardType, paymentMethod } }, history } = props
    const stripe = useStripe()
    const elements = useElements()
    const [paymentInfo, setPaymentInfo] = useState({})
    const [selectedCard, setSelectedCard] = useState('new_card')
    const [creditCardLoading, setCreditCardLoading] = useState(false)
    const { userInfo } = useContext(Context)

    const confirmCardSetup = () => {
        if (cardType === 'new_card' && !creditCardLoading) {
            setCreditCardLoading(true)
            const cardElement = elements.getElement(CardElement)
            stripe
                .confirmCardSetup(paymentInfo.paymentSystemSecretKey, { payment_method: { card: cardElement } })
                .then(data => {
                    setPaymentInfo({ ...paymentInfo, paymentMethodId: data.setupIntent.payment_method })
                    setSelectedCard(data.setupIntent.payment_method)
                    setCurrentStep(3)
                    setCreditCardLoading(false)
                })
        } else {
            setPaymentInfo({ ...paymentInfo, paymentMethodId: selectedCard })
            setCurrentStep(3)
        }
    }

    const [getPaymentInfo] = useLazyQuery(GET_PAYMENT_METHOD_INFO, {
        fetchPolicy: 'no-cache',
        onCompleted: ({ paymentMethodInfo }) => {
            setPaymentInfo({ ...paymentInfo, ...paymentMethodInfo })
        }
    })

    const handleMoveStep = nextStepIdx => {
        const prevStepKeys = Object.keys(stepValidated).filter(i => i < nextStepIdx)
        if (prevStepKeys.every(i => stepValidated[i]) && nextStepIdx !== currentStep) {
            if (nextStepIdx === 3 && paymentMethod !== 'purchase_order') {
                if (userInfo) {
                    confirmCardSetup()
                } else {
                    getPaymentInfo(transformForPaymentInfo(props.values))
                    setCurrentStep(nextStepIdx)
                }
            } else {
                setCurrentStep(nextStepIdx)
            }
        }
    }

    const FormStepComponent = getFormStepComponent(currentStep)

    const stepLabels = ['Shipping Schedule', 'Ship To', 'Bill To', history.location.pathname === '/create-quote' ? 'Quote Review' : 'Order Review']

    return (
        <>
            <Div>
                <DivRow>
                    <FontAwesomeIcon icon="lock" />
                    <H3>Checkout</H3>
                    <CheckoutProgress {...{ stepLabels, currentStep, stepValidated, handleMoveStep }} />
                </DivRow>
            </Div>

            <Container>
                <Pformheader>{stepLabels[currentStep]}</Pformheader>
                <FormStepComponent {...{ ...props, paymentInfo, setPaymentInfo, selectedCard, setSelectedCard, creditCardLoading, getPaymentInfo, handleMoveStep }}/>
                {!validationSchema && <Loader />}
            </Container>
        </>
    )
}

export default connect(CheckoutPage)
