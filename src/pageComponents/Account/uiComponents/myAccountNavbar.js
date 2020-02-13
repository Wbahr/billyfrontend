import React, {useState, useEffect, useContext} from 'react'
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

const Pselected = styled.p`
  color: white;
  padding: 4px;
  background-color: blue;
  background-image: linear-gradient(to top left,#0056b3,#007bff);
  border-radius: 20px;
`

export default function MyAccountNavbar({history, page}) {
  const [navbarLinks, setNavbarLinks] = useState([])

  const AccountPages = [
    {
      'label': 'Home',
      'path': '/account/dashboard'
    },
    {
      'label': 'User Settings',
      'path': '/account/user-settings'
    },
    {
      'label': 'Shipping',
      'path': '/account/shipping-preferences'
    },
    {
      'label': 'Billing',
      'path': '/account/payment-preferences'
    },
    {
      'label': 'Shopping Lists',
      'path': '/account/shopping-lists'
    }
  ]

  useEffect(() => {
    let tempNavbarLinks = []
    for(let i=0; AccountPages.length > i; i++){
      if(`/account/${page}` === AccountPages[i].path) {
        tempNavbarLinks.push(<Pselected>{AccountPages[i].label}</Pselected>)
      } else {
        tempNavbarLinks.push(<p onClick={()=>history.push(`${AccountPages[i].path}`)}>{AccountPages[i].label}</p>)
      }
    }
    setNavbarLinks(tempNavbarLinks)
  }, [page])

  return(
    <NavbarContainer>
      <H3>My Account</H3>
      <DivNavbar>
        {navbarLinks}
      </DivNavbar>
    </NavbarContainer>
  )
}

MyAccountNavbar.propTypes = {
  history: PropTypes.object.isRequired,
}