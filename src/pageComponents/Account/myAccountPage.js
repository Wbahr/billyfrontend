import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import AccountNavPanel from './accountNavPanel'
import PropTypes from 'prop-types'
import AccountDashboard from './accountDashboardPage'
import OrdersTable from './ordersPages/orders'
import OpenOrdersTable from './ordersPages/openOrders'
import ItemOrdersTable from './ordersPages/itemPurchaseHistory'
import OpenQuotesTable from './quotePages/openQuotes'
import InvoicesTable from './invoicePages/invoices'
import OrderDetail from './ordersPages/orderDetail'
import QuoteDetail from './quotePages/quoteDetail'
import InvoiceDetail from './invoicePages/invoiceDetail'

const Container = styled.div`
  display: flex;
`

export default function AccountManagementPage({ history }) {
  const [pageComponent, setPageComponent] = useState()
  const { page, orderId } = useParams()

  useEffect(() => {
    switch (page){
    case 'dashboard':
      setPageComponent(<AccountDashboard history={history}/>)
      break
    case 'shopping-lists':
      setPageComponent(<AccountDashboard history={history}/>)
      break
    case 'user-settings':
      setPageComponent(<AccountDashboard history={history}/>)
      break
    case 'shipping-preferences':
      setPageComponent(<AccountDashboard history={history}/>)
      break
    case 'payment-preferences':
      setPageComponent(<AccountDashboard history={history}/>)
      break
    case 'orders':
      setPageComponent(<OrdersTable history={history}/>)
      break
    case 'open-orders-report':
      setPageComponent(<OpenOrdersTable history={history}/>)
      break
    case 'my-ordered-items':
      setPageComponent(<ItemOrdersTable history={history}/>)
      break
    case 'open-quotes':
      setPageComponent(<OpenQuotesTable history={history}/>)
      break
    case 'invoices':
      setPageComponent(<InvoicesTable history={history}/>)
      break
    case 'order-detail':
      setPageComponent(<OrderDetail history={history} orderId={orderId}/>)
      break
    case 'quote-detail':
      setPageComponent(<QuoteDetail history={history} orderId={orderId}/>)
      break
    case 'invoice-detail':
      setPageComponent(<InvoiceDetail history={history} invoiceId={orderId}/>)
      break
    }
  }, [page])

  return (
    <Container>
      <AccountNavPanel history={history}/>
      {pageComponent}
    </Container>
  )
}

AccountManagementPage.propTypes = {
  history: PropTypes.object.isRequired
}