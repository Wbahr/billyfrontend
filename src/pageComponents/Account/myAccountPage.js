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
import Auth from 'setup/auth'

const Container = styled.div`
  display: flex;
  overflow-x: scroll;
`

export default function AccountManagementPage() {
    const [pageComponent, setPageComponent] = useState()
    const { page, orderId } = useParams()

    useEffect(() => {
        switch (page) {
            case 'dashboard':
                setPageComponent(<AccountDashboard />)
                break
            case 'shopping-lists':
                setPageComponent(<AccountDashboard />)
                break
            case 'user-settings':
                setPageComponent(<AccountDashboard />)
                break
            case 'shipping-preferences':
                setPageComponent(<AccountDashboard />)
                break
            case 'payment-preferences':
                setPageComponent(<AccountDashboard />)
                break
            case 'orders':
                setPageComponent(<OrdersTable />)
                break
            case 'open-orders-report':
                setPageComponent(<OpenOrdersTable />)
                break
            case 'my-ordered-items':
                setPageComponent(<ItemOrdersTable />)
                break
            case 'open-quotes':
                setPageComponent(<OpenQuotesTable />)
                break
            case 'invoices':
                setPageComponent(<InvoicesTable />)
                break
            case 'order-detail':
                setPageComponent(<OrderDetail orderId={orderId} />)
                break
            case 'quote-detail':
                setPageComponent(<QuoteDetail orderId={orderId} />)
                break
            case 'invoice-detail':
                setPageComponent(<InvoiceDetail invoiceId={orderId} />)
                break
        }
    }, [page])

    return (
        <Auth>
            <Container>
                <AccountNavPanel />
                {pageComponent}
            </Container>
        </Auth>
    )
}