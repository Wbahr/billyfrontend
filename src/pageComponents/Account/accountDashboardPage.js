import React, {useState, useContext} from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import MyAccountNavbar from './uiComponents/myAccountNavbar'
import {Elements} from 'react-stripe-elements'
import PaymentManagementPage from './accountPages/paymentManagement'
import AccountManagementPage from './accountPages/accountManagement'

const AccountInfoContainer = styled.div`
  display: flex;
  width: 1200px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
  padding: 20px 40px;
  margin: 0 auto;
`

export default function AccountDashboard({history}) {
  const [customerType, setCustomerType] = useState('')
  let { page } = useParams()

  return(
    <div>
      <MyAccountNavbar history={history} page={page}/>
      <AccountInfoContainer>
        <AccountManagementPage/>
        <Elements><PaymentManagementPage/></Elements>
      </AccountInfoContainer>
    </div>
  )
}

AccountDashboard.propTypes = {
  history: PropTypes.object.isRequired
}