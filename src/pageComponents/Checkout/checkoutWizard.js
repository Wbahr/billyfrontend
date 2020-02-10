import React, { useState, useEffect, useRef, useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import queryString from 'query-string'
import _ from 'lodash'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {Formik} from 'formik'
import { shippingScheduleSchema, shipToSchema, billToSchema } from './helpers/validationSchema'
import {Elements} from 'react-stripe-elements';
// Wizard Steps
import {ShippingScheduleForm} from './wizardSteps/shippingScheduleForm'
import {ShipToForm} from './wizardSteps/shipToForm'
import BillingInfoForm from './wizardSteps/billingInfoForm'
import ConfirmationScreen from './wizardSteps/confirmationScreen'

export default function CheckoutWizard({step, shoppingCart, checkoutSubmit}) {
  const shoppingCartAndDatesObj = shoppingCart.map(elem => ({...elem, requestedShipDate: new Date()}))
  
  const initValues = {
    schedule: {
      packing_basis: '0',
      cart_with_dates: shoppingCartAndDatesObj
    },
    shipto: {
      ship_to_id: '',
      contact_name_first: '',
      contact_name_last: '',
      contact_id: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      province: '',
      zip: '',
      country: 'us',
      carrier_name: '',
      carrier_id: '',
      is_collect: '0',
      collect_number: '',
      phone: '',
      email: ''
    },
    billing: {
      first_name: '',
      last_name: '',
      payment_method: '',
      po: '',
      company_id: '',
      contact_name_first: '',
      contact_name_last: '',
      contact_id: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      province: '',
      zip: '',
      country: 'us',
      phone: '',
      email: ''
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
      onSubmit={values => {checkoutSubmit(values)}}
    >
      {formikProps => (
        <Elements>
          <form onSubmit={formikProps.handleSubmit} {...formikProps}>
            <FormStep {...formikProps}/>
            <button type="submit">Submit</button>
          </form>
        </Elements>
      )}
    </Formik>
  )
}

CheckoutWizard.propTypes = {
  step: PropTypes.number.isRequired
}

