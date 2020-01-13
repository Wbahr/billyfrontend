import React, {useState, useContext} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const NavbarContainer = styled.div`
  display: flex;
  width: 1200px;
  margin: 0 auto;
  margin-top: 30px;
  flex-direction: column;
`

 const H3 = styled.h3`
  font-family: ProximaBold;
  text-transform: uppercase;
  padding-left: 15px;
 `

const DivNavbar = styled.div`
  display: flex;
  p {
    cursor: pointer;
    padding: 0 15px;
  }
`

export default function MyAccountNavbar({history}) {
  const location = history.location.pathname

  return(
    <NavbarContainer>
      <H3>My Account</H3>
      <DivNavbar>
        <p>Home</p>
        <p>User Settings</p>
        <p>Shipping</p>
        <p>Billing</p>
        <p>Shopping Lists</p>
        <p>Notifications</p>
      </DivNavbar>
    </NavbarContainer>
  )
}

MyAccountNavbar.propTypes = {
  history: PropTypes.object.isRequired,
}