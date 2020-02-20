import React, { useState, useEffect, useRef, useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import queryString from 'query-string'
import _ from 'lodash'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {Formik, useFormikContext} from 'formik'
import { shippingScheduleSchema, shipToSchema, billToSchema } from './helpers/validationSchema'
import {Elements} from 'react-stripe-elements';
// Wizard Steps
import {ShippingScheduleForm} from './wizardSteps/shippingScheduleForm'
import {ShipToForm} from './wizardSteps/shipToForm'
import BillingInfoForm from './wizardSteps/billingInfoForm'
import ConfirmationScreen from './wizardSteps/confirmationScreen'
import formatDropdownData from './helpers/formatCheckoutDropdownData'
import Context from '../../config/context'

const GET_CHECKOUT_DATA = gql`
  query RetrieveCheckoutData {
    getCheckoutDropdownData{
      shipToAddresses{
        id
        name
        companyName
        mailAddress1
        mailAddress2
        mailAddress3
        mailCity
        mailCountry
        mailPostalCode
        mailState
        physAddress1
        physAddress2
        physAddress3
        physCity
        physState
        physPostalCode
        physCountry
      }
      carriers{
        freightMultiplier
        noAutoAllocation
        otherShippingMethodFlag
        shippingMethodName
        shippingMethodUid
        shippingMethodValue
        showInListFlag
      }
      contacts{
        id
        firstName
        lastName
      }
      termsDescription
      customerPhysicalAddress{
        id
        name
        companyName
        mailAddress1
        mailAddress2
        mailAddress3
        mailCity
        mailCountry
        mailPostalCode
        mailState
        physAddress1
        physAddress2
        physAddress3
        physCity
        physState
        physPostalCode
        physCountry
      }
    }
  }
`

export default function CheckoutWizard({step, shoppingCart, triggerSubmit, submitForm}) {
  const [checkoutDropdownData, setCheckoutDropdownData] = useState([])
  const [checkoutDropdownDataLabels, setCheckoutDropdownDataLabels] = useState([])
  const [shoppingCartAndDatesObj, setShoppingCartAndDatesObj] = useState([])
  const context = useContext(Context)

  const AutoSubmit = () => {
    const {
      values
    } = useFormikContext()
    submitForm(values)
    return(
      <p>Submitting...</p>
    )
  }

  // Shopping cart was triggering the form the reinitialize, not sure why. This is a fix for it.
  useEffect(() => {
    if (shoppingCartAndDatesObj.length === 0) {
        let date = new Date()
        date.setDate(date.getDate() + 1)
        const recentCart = shoppingCart.map(elem => ({...elem, requestedShipDate: date}))
        setShoppingCartAndDatesObj(recentCart)
    }
  },[shoppingCart])


  const { 
    loading, 
    error, 
    data 
  } = useQuery(GET_CHECKOUT_DATA, {
    onCompleted: result => {
      let mutatedCheckoutDropdownData = formatDropdownData(result.getCheckoutDropdownData)
      setCheckoutDropdownData(result.getCheckoutDropdownData)
      setCheckoutDropdownDataLabels(mutatedCheckoutDropdownData)
    }
  })

  const initValues = {
    schedule: {
      packing_basis: '0',
      cart_with_dates: shoppingCartAndDatesObj,
      shopping_cart_token: localStorage.getItem('shoppingCartToken')
    },
    shipto: {
      saved_ship_to: -1,
      contact_name_first: _.get(context,`userInfo.firstName`,'') === null ? '' : _.get(context,`userInfo.firstName`,''),
      contact_name_last: _.get(context,`userInfo.lastName`,'') === null ? '' : _.get(context,`userInfo.lastName`,''),
      saved_contact: -1,
      address1: '',
      address2: '',
      city: '',
      state_or_province: '',
      zip: '',
      country: 'us',
      phone: '',
      email: '',
      carrier_name: '',
      carrier_id: '',
      is_collect: '0',
      collect_number: ''
    },
    billing: {
      payment_method: '',
      purchase_order: '',
      first_name: '',
      last_name: '',
      contact_id: '',
      address1: '',
      address2: '',
      city: '',
      state_or_province: '',
      zip: '',
      country: 'us',
      phone: '',
      email: '',
      card_type: 'new_card'
    }
  }

  let FormStep
  switch(step){
    case 0:
      if (shoppingCart.length > 0) {
        FormStep = ShippingScheduleForm
        break
      } else {
        FormStep = ShippingScheduleForm
        break
      }
    case 1:
      FormStep = ShipToForm
      break
    case 2:
      FormStep = BillingInfoForm
      break
    case 3:
      FormStep = ConfirmationScreen
      break
  }
  return(
    <Formik 
      initialValues={initValues}
      enableReinitialize={true}
    >
      {formikProps => (
        <Elements>
          <form name="checkoutForm" {...formikProps}>
            <FormStep {...formikProps} checkoutDropdownDataLabels={checkoutDropdownDataLabels} checkoutDropdownData={checkoutDropdownData}/>
            {triggerSubmit && <AutoSubmit/>}
          </form>
        </Elements>
      )}
    </Formik>
  )
}

CheckoutWizard.propTypes = {
  step: PropTypes.number.isRequired
}