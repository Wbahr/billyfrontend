import React, {useState, useContext} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Context from '../../config/context'
import MyAccountNavbar from './uiComponents/myAccountNavbar'

const AccountInfoContainer = styled.div`
  display: flex;
  width: 1200px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
  padding: 20px 40px;
  margin: 0 auto;
`

export default function AccountDashboard({history}) {
  const [customerType, setCustomerType] = useState('')
  const context = useContext(Context);

  return(
    <div>
      <MyAccountNavbar history={history}/>
      <AccountInfoContainer>
        <div>
          <p>Hi {context.userInfo.firstName}</p>
        </div>
        <div>
          <p>Account Info</p>
          <p>Company: {context.userInfo.companyName} - {context.userInfo.companyId}</p>
          <p>email: {}</p>
          <p>password: *****</p>
        </div>
        <div>
          <p>Default Ship To:</p>

        </div>
        <div>
          <p>Payment Preferences:</p>
        </div>
      </AccountInfoContainer>
    </div>
  )
}

AccountDashboard.propTypes = {
  history: PropTypes.object.isRequired
}