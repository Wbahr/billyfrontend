import React, { useState, useEffect, useRef, useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import queryString from 'query-string'
import _ from 'lodash'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {Formik, useFormikContext} from 'formik'
import {Elements} from 'react-stripe-elements';
import ProcessingOrderModal from './uiComponents/processingOrderModal'
import OrderFailedModal from './uiComponents/orderFailedModal'
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
        collectNumberUps
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

function CheckoutWizard({step, shoppingCart, triggerSubmit, submitForm, handleValidateFields, YupSchema, showOrderFailedModal, updateZip}) {
  const [checkoutDropdownData, setCheckoutDropdownData] = useState([])
  const [checkoutDropdownDataLabels, setCheckoutDropdownDataLabels] = useState([])
  const [shoppingCartAndDatesObj, setShoppingCartAndDatesObj] = useState([])
  const [submittingOrder, setSubmittingOrder] = useState(false)
  const context = useContext(Context)

  const AutoSubmit = () => {
    const {
      values
    } = useFormikContext()
    if(!submittingOrder){
      setSubmittingOrder(true)
      submitForm(values)
    }
    return(
      <ProcessingOrderModal/>
    )
  }

  // Shopping cart was triggering the form the reinitialize, not sure why. This is a fix for it.
  useEffect(() => {
    if (shoppingCartAndDatesObj.length === 0) {
        let date = new Date()
        date.setDate(date.getDate() + 1)
        const recentCart = shoppingCart.map(elem => ({'frecno': elem.frecno, 'itemNotes': elem.itemNotes, 'quantity': elem.quantity, 'itemUnitPriceOverride': _.get(elem,`itemUnitPriceOverride`,null), 'customerPartNumberId': elem.customerPartNumberId, 'requestedShipDate': date}))
        setShoppingCartAndDatesObj(recentCart)
    }
  },[shoppingCart])


  const { 
    loading, 
    error, 
    data 
  } = useQuery(GET_CHECKOUT_DATA, {
    fetchPolicy: 'no-cache',
    onCompleted: result => {
      let mutatedCheckoutDropdownData = formatDropdownData(result.getCheckoutDropdownData)
      setCheckoutDropdownData(result.getCheckoutDropdownData)
      setCheckoutDropdownDataLabels(mutatedCheckoutDropdownData)
    }
  })

  const initValues = {
    contact: {
      savedContact: null,
      firstName: '',
      lastName: '',
      phone: '',
      email: ''
    },
    schedule: {
      isQuote: false,
      packingBasisName: '',
      packingBasis: '0',
      cartWithDates: shoppingCartAndDatesObj,
      shoppingCartToken: localStorage.getItem('shoppingCartToken')
    },
    shipto: {
      saveShipTo: 0,
      savedShipTo: _.isNil(_.get(context,`userInfo`, null)) ? null : -1,
      firstName: _.get(context,`userInfo.role`,'') === 'Impersonator' ? '' : _.get(context,`userInfo.firstName`,'') === null ? '' : _.get(context,`userInfo.firstName`,''),
      lastName: _.get(context,`userInfo.role`,'') === 'Impersonator' ? '' : _.get(context,`userInfo.lastName`,'') === null ? '' : _.get(context,`userInfo.lastName`,''),
      address1: '',
      address2: '',
      city: '',
      stateOrProvince: '',
      zip: '',
      country: 'us',
      phone: '',
      email: '',
      shippingNotes: '',
      carrierId: '',
      isCollect: 0,
      collectNumber: ''
    },
    billing: {
      paymentMethod: '',
      purchaseOrder: '',
      firstName: '',
      lastName: '',
      contactId: '',
      address1: '',
      address2: '',
      city: '',
      stateOrProvince: '',
      zip: '',
      country: 'us',
      phone: '',
      email: '',
      cardType: 'new_card'
    },
    confirmationEmail: {
      sendToShipTo: 1,
      ccEmails: []
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
      validationSchema={YupSchema[step]}
      validate={(values)=>handleValidateFields(values)}
    >
      {formikProps => (
        <Elements>
          <form name="checkoutForm" {...formikProps}>
            <FormStep {...formikProps} checkoutDropdownDataLabels={checkoutDropdownDataLabels} checkoutDropdownData={checkoutDropdownData} updateZip={updateZip}/>
            {(triggerSubmit && !showOrderFailedModal) && <AutoSubmit/>}
            {showOrderFailedModal && <OrderFailedModal/>}
          </form>
        </Elements>
      )}
    </Formik>
  )
}

CheckoutWizard.propTypes = {
  step: PropTypes.number.isRequired
}

export default CheckoutWizard