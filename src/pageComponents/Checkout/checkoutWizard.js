import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import queryString from 'query-string'
import _ from 'lodash'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {Formik} from 'formik'
import {ShippingScheduleForm, defaultValues as DefaultShippingScheduleValues} from './wizardSteps/shippingScheduleForm'
import {ShipToForm, defaultValues as DefaultShipToValues} from './wizardSteps/shipToForm'
import {BillingInfoForm, defaultValues as DefaultBillToValues} from './wizardSteps/billingInfoForm'
import ConfirmationScreen from './wizardSteps/confirmationScreen'


export default function CheckoutWizard({step, shoppingCart}) {
  const [checkValues, setCheckValues] = useState({})

  switch(step){
    case 0:
      return(
        <Formik 
          initialValues={DefaultShippingScheduleValues}
          component={ShippingScheduleForm} 
          onSubmit={values => {console.log(values)}}
          shoppingCart={shoppingCart}
        />
      )
    case 1:
      return(
        <Formik 
          initialValues={DefaultShipToValues}
          component={ShipToForm} 
          onSubmit={values => {console.log(values)}}
        />
      )
    case 2:
      return(
        <Formik 
          initialValues={DefaultBillToValues}
          component={BillingInfoForm} 
          onSubmit={values => {console.log(values)}}
        />
      )
    case 3:
      return(
        <ConfirmationScreen />
      )
    default: 
      return(
        <p>ah</p>
      )
  }
}

CheckoutWizard.propTypes = {
  step: PropTypes.number.isRequired
}