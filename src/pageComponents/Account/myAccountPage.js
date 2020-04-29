import React, {useState, useEffect, useContext, useMemo} from 'react'
import { useParams } from 'react-router-dom'
import _ from 'lodash'
// import styled from 'styled-components'
import AccountNavPanel from './accountNavPanel'
import PropTypes from 'prop-types'
import AccountDashboard from './accountDashboardPage'
import OrdersTable from './ordersPages/orders'

export default function AccountManagementPage({history}) {
  let { page } = useParams()

  const data = useMemo(
    () => [
      {
        order_date: 'Hello',
        order_no: 'World',
        po_no: '123132',
        buyer: 'Bpanczer',
        total: '$12.00',
        status: 'Completed'
      },
      {
        order_date: 'Hello',
        order_no: 'World',
        po_no: '123132',
        buyer: 'Bpanczer',
        total: '$12.00',
        status: 'Completed'
      },
      {
        order_date: 'Hello',
        order_no: 'World',
        po_no: '123132',
        buyer: 'Bpanczer',
        total: '$12.00',
        status: 'Completed'
      }
    ],
    [],
  )
  const columns = useMemo(
    () => [
      {
        Header: 'Order Data',
        accessor: 'order_date', // accessor is the "key" in the data
      },
      {
        Header: 'Order #',
        accessor: 'order_no',
      },
      {
        Header: 'PO #',
        accessor: 'po_no',
      },
      {
        Header: 'Buyer',
        accessor: 'buyer',
      },
      {
        Header: 'Total',
        accessor: 'total',
      },
      {
        Header: 'Status',
        accessor: 'status',
      }
    ],
    [],
  )
  
  let AccountPage
  useEffect(() => {
    if(page === 'dashboard'){
      AccountPage = <AccountDashboard history={history}/>
    }
  }, [page])

  return(
    <>
      <AccountNavPanel history={history}/>
      <OrdersTable data={data} columns={columns}/>
    </>
  )
}

AccountManagementPage.propTypes = {
history: PropTypes.object.isRequired
}