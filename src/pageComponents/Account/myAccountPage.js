import React, {useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import _ from 'lodash'
// import styled from 'styled-components'
import AccountNavPanel from './accountNavPanel'
import PropTypes from 'prop-types'
import AccountDashboard from './accountDashboardPage'

export default function AccountManagementPage({history}) {
  let { page } = useParams()
  
  let AccountPage
  useEffect(() => {
    if(page === 'dashboard'){
      AccountPage = <AccountDashboard history={history}/>
    }
  }, [page])

  return(
    <>
      <AccountNavPanel history={history}/>
      {AccountPage}
    </>
  )
}

AccountManagementPage.propTypes = {
history: PropTypes.object.isRequired
}