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
  const [pageComponent, setPageComponent] = useState()
  let { page } = useParams()
  
  useEffect(() => {
    switch(page){
      case 'dashboard':
        setPageComponent(<AccountDashboard history={history}/>)
        break;
      case 'my-orders':
        setPageComponent(<OrdersTable history={history}/>)
        break;
      default:
        setPageComponent(<AccountDashboard history={history}/>)
        break;
    }
  }, [page])

  return(
    <Container>
      <AccountNavPanel history={history}/>
      {pageComponent}
    </Container>
  )
}

AccountManagementPage.propTypes = {
  history: PropTypes.object.isRequired
}