import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useNavigate } from 'react-router'

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

export default function MyAccountNavbar({ page, AccountPages }) {
    const [navbarLinks, setNavbarLinks] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const tempNavbarLinks = []
        for (let i=0; AccountPages.length > i; i++){
            if (page === AccountPages[i].page) {
                tempNavbarLinks.push(<Pselected key={i}>{AccountPages[i].label}</Pselected>)
            } else {
                tempNavbarLinks.push(<p key={i} onClick={() => navigate(`/account/${AccountPages[i].page}`)}>{AccountPages[i].label}</p>)
            }
        }
        setNavbarLinks(tempNavbarLinks)
    }, [page])

    return (
        <NavbarContainer>
            <H3>Account Settings</H3>
            <DivNavbar>
                {navbarLinks}
            </DivNavbar>
        </NavbarContainer>
    )
}

MyAccountNavbar.propTypes = {
    page: PropTypes.string.isRequired
}