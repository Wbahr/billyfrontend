import React, {useState, useContext} from 'react'
import _ from 'lodash'
// import styled from 'styled-components'
import AccountNavPanel from './accountNavPanel'
import PropTypes from 'prop-types'

export default function AccountManagementPage({history}) {
  // const [pageComponent, setPageComponent] = useState()
  // let { page } = useParams()
  
  // const AccountPages = [
  //   {
  //     'label': 'Home',
  //     'page': 'dashboard'
  //   },
  //   {
  //     'label': 'User Settings',
  //     'page': 'user-settings'
  //   },
  //   {
  //     'label': 'Shipping',
  //     'page': 'shipping-preferences'
  //   },
  //   {
  //     'label': 'Billing',
  //     'page': 'payment-preferences'
  //   },
  //   {
  //     'label': 'Shopping Lists',
  //     'page': 'shopping-lists'
  //   }
  // ]
  // useEffect(() => {
  //   if(page === 'dashboard'){
  //     setPageComponent(<AccountManagementPage history={history}/>)
  //   } else if (page === 'user-settings'){
  //     setPageComponent(<AccountManagementPage history={history}/>)
  //   } else if (page === 'shipping-preferences'){
  //     setPageComponent(<ShipToManagementPage/>)
  //   } else if (page === 'payment-preferences'){
  //     setPageComponent(<Elements><PaymentManagementPage/></Elements>)
  //   } else if (page === 'shopping-lists'){
  //     setPageComponent(<ShoppingListManagementPage/>)
  //   }
  // }, [page])

  return(
    <>
      <AccountNavPanel history={history}/>

    </>
  )
}

AccountManagementPage.propTypes = {
history: PropTypes.object.isRequired
}