import React, { useState, useEffect, useRef, useContext } from 'react'
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
import Context from '../../config/context'

const Container = styled.div`
  margin: 20px;
  font-family: helvetica-neue-light,Helvetica Neue,Helvetica,Arial,sans-serif;
  font-size: 18px;
  height: 100%;
  border: 1px solid whitesmoke;
  padding: 5px 20px;
`

const Pformheader = styled.p`
  margin: 0;
  font-family: ProximaBold;
  text-transform: uppercase;
`

export default function CheckoutWizard({step, shoppingCart, stepName}) {
  const [checkValues, setCheckValues] = useState({})
  const shoppingCartObj = {'shoppingCart': shoppingCart}
  switch(step){
    case 0:
      return(
        <Container>
          <Pformheader>{stepName}</Pformheader>
          <Formik 
            initialValues={{...DefaultShippingScheduleValues, ...shoppingCartObj}}
            component={ShippingScheduleForm} 
            onSubmit={values => {console.log(values)}}
          />
        </Container>
      )
    case 1:
      return(
        <Container>
          <Pformheader>{stepName}</Pformheader>
          <Formik 
            initialValues={DefaultShipToValues}
            component={ShipToForm} 
            onSubmit={values => {console.log(values)}}
          />
        </Container>

      )
    case 2:
      return(
        <Container>
          <Pformheader>{stepName}</Pformheader>
          <Formik 
            initialValues={DefaultBillToValues}
            component={BillingInfoForm} 
            onSubmit={values => {console.log(values)}}
          />
        </Container>
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