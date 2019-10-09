import React from 'react'
import styled from 'styled-components'
// import AirlineLogo from '../imgs/airline/airline_vector'

const NavTop = styled.div`
  width: 100%;
  height: 80px;
  background-color: #f3f3f3;
`

const NavBottom = styled.div`
  display: flex;
  margin: 0 auto;
  height: 60px;
  background-color: #000;
  justify-content: center;
`

const LinkContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  color: white;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
  width: 1200px;
`

const NavItem =styled.a`
  cursor: pointer;
  &:hover{
    transition: border-bottom 500ms;
    transition: margin-bottom 500ms;
    border-bottom: 5px rgb(219,22,51) solid;
    margin-bottom: -5px;
  }
`

export default function HeaderComponent() {
  return(
    <>
      <NavTop>
        {/* <img src={AirlineLogo}/> */}
      </NavTop>
      <NavBottom>
        <LinkContainer>
          <NavItem>Shop</NavItem>
          <NavItem>Services</NavItem>
          <NavItem>Industries</NavItem>
          <NavItem>Brands</NavItem>
          <NavItem>Resources</NavItem>
          <NavItem>About</NavItem>
          <NavItem>Contact</NavItem>
        </LinkContainer>
      </NavBottom>
    </>
  )
}