import React, {useState} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export default function AccountDashboard({history}) {
  const [customerType, setCustomerType] = useState('')



  return(
    <div>
      <p>My Account</p>
      <div>
        
      </div>
    </div>
  )
}

AccountDashboard.propTypes = {
  history: PropTypes.object.isRequired
}