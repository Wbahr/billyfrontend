import React, {useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import _ from 'lodash'
import styled from 'styled-components'
import AccountNavPanel from './accountNavPanel'
import PropTypes from 'prop-types'
import AccountDashboard from './accountDashboardPage'
import OrdersTable from './ordersPages/orders'

const Container = styled.div`
  display: flex;
`

export default function AccountManagementPage({history}) {
  let { page } = useParams()
  
  let AccountPage
  useEffect(() => {
    if(page === 'dashboard'){
      AccountPage = <AccountDashboard history={history}/>
    }
  }, [page])

  return(
    <Container>
      <AccountNavPanel history={history}/>
      <OrdersTable/>
    </Container>
  )
}

AccountManagementPage.propTypes = {
history: PropTypes.object.isRequired
}