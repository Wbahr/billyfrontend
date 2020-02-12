import React, {useState, useContext} from 'react'
import _ from 'lodash'
import styled from 'styled-components'
// import Context from '../../../config/context'
import { injectStripe } from 'react-stripe-elements'
import PaymentManagerComponent from '../uiComponents/paymentManager'

function PaymentManagementPage() {
  // const context = useContext(Context);

  return(
    <div>
      <PaymentManagerComponent/>
    </div>
  )
}

export default injectStripe(PaymentManagementPage)