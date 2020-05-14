import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import MyAccountNavbar from './uiComponents/myAccountNavbar'
import {Elements} from 'react-stripe-elements'
import PaymentManagementPage from './accountPages/paymentManagement'
import AccountManagementPage from './accountPages/accountManagement'
import ShipToManagementPage from './accountPages/shiptoManagement'
import ShoppingListManagementPage from './accountPages/shoppingListManagement'

const AccountInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1200px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
  padding: 20px 40px;
  margin: 0 auto;
`

export default function AccountDashboard({history}) {
	const [pageComponent, setPageComponent] = useState()
	let { page } = useParams()

	const AccountPages = [
		{
			'label': 'Home',
			'page': 'dashboard'
		},
		{
			'label': 'User Settings',
			'page': 'user-settings'
		},
		{
			'label': 'Shipping',
			'page': 'shipping-preferences'
		},
		{
			'label': 'Billing',
			'page': 'payment-preferences'
		},
		{
			'label': 'Shopping Lists',
			'page': 'shopping-lists'
		}
	]
	useEffect(() => {
		if(page === 'dashboard'){
			setPageComponent(<AccountManagementPage history={history}/>)
		} else if (page === 'user-settings'){
			setPageComponent(<AccountManagementPage history={history}/>)
		} else if (page === 'shipping-preferences'){
			setPageComponent(<ShipToManagementPage/>)
		} else if (page === 'payment-preferences'){
			setPageComponent(<Elements><PaymentManagementPage/></Elements>)
		} else if (page === 'shopping-lists'){
			setPageComponent(<ShoppingListManagementPage/>)
		}
	}, [page])

	return(
		<div>
			<MyAccountNavbar history={history} page={page} AccountPages={AccountPages}/>
			<AccountInfoContainer>  
				{pageComponent}      
			</AccountInfoContainer>
		</div>
	)
}

AccountDashboard.propTypes = {
	history: PropTypes.object.isRequired
}