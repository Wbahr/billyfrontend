import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import MyAccountNavbar from './uiComponents/myAccountNavbar'
import PaymentManagementPage from './accountPages/paymentManagement'
import AccountManagementPage from './accountPages/accountManagement'
import ShipToManagementPage from './accountPages/shiptoManagement'
import ShoppingListManagementPage from './accountPages/shoppingListManagement'
import UserSettingsPage from './accountPages/userSettings'

const AccountInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1200px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
  padding: 20px 40px;
  margin: 0 auto;
`

export default function AccountDashboard() {
    
    const [pageComponent, setPageComponent] = useState()
    const { page } = useParams()

    const AccountPages = [
        {
            label: 'Home',
            page: 'dashboard'
        },
        {
            label: 'User Settings',
            page: 'user-settings'
        },
        // {
        //     label: 'Shipping',
        //     page: 'shipping-preferences'
        // },
        // {
        //     label: 'Billing',
        //     page: 'payment-preferences'
        // },
        {
            label: 'Shopping Lists',
            page: 'shopping-lists'
        }
    ]
    useEffect(() => {
        if (page === 'dashboard'){
            setPageComponent(<AccountManagementPage/>)
        } else if (page === 'user-settings'){
            setPageComponent(<UserSettingsPage/>)
        } else if (page === 'shipping-preferences'){
            setPageComponent(<ShipToManagementPage/>)
        } else if (page === 'payment-preferences'){
            setPageComponent(<PaymentManagementPage/>)
        } else if (page === 'shopping-lists'){
            setPageComponent(<ShoppingListManagementPage/>)
        }
    }, [page])

    return (
        <div>
            <MyAccountNavbar page={page} AccountPages={AccountPages}/>
            <AccountInfoContainer>  
                {pageComponent}      
            </AccountInfoContainer>
        </div>
    )
}