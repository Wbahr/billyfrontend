import React, { useState } from 'react'
import styled from 'styled-components'
import AirlineLogo from '../../imgs/airline/airline_vector.png'
import { Link, useHistory } from 'react-router-dom'

const NavTop = styled.div`
  display: flex;
  margin: 0 auto;
  width: 100%;
  height: 40px;
  background-color: #535353;
  justify-content: center;
`

const NavBottom = styled.div`
  display: flex;
  margin: 0 auto;
  width: 100%;
  height: 60px;
  background-color: white;
  justify-content: center;
  box-shadow: 0px 3px 4px #dadada;
`

const LinkContainer = styled.div`
  display: flex;
  height: 100%;
  width: 40%;
  color: black !important;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
`
const NavBottomContainer = styled.div`
  display: flex;
  height: 100%;
  width: 1200px;
  justify-content: space-between;
  align-items: center;
`

const NavItem =styled.a`
  display: block;
  cursor: pointer;
  color: black !important;
  &:hover{
    transition: border-bottom 500ms;
    transition: margin-bottom 500ms;
    border-bottom: 3px rgb(219,22,51) solid;
    margin-bottom: -3px;
  }
`

const InputSearch = styled.input`
  width: 300px;
  height: 30px;
  font-size: 14px;
  border-color: #dadada;
  border-top: 1px #dadada solid;
  border-left: 1px #dadada solid;
  border-bottom: 1px #e7e7e7 solid;
  border-right: 0px;
  padding: 0 4px;
  box-shadow: inset 0px 2px 3px #c1c1c1;
  border-radius: 3px 0 0 3px;
`

const ButtonSearch = styled.button`
  width: 70px;
  height: 30px;
  background-color: rgb(219, 22, 51);
  color: white;
  font-weight: 500;
  border: 0;
  border-radius: 0 3px 3px 0;
  box-shadow: inset 0px 2px 3px #7f0c1d;
  font-size: 14px;
`

const Div = styled.div`
  display: flex;
`

const Puser = styled.p`
  background-color: #404040;
  color: #f3f3f3;
  font-size: 11px;
  margin: 0;
  padding: 4px 8px;
  border-radius: 30px;
`

const PeUser = styled(Puser)`
  color: #328EFC;
  font-weight: 600;
`

const A = styled.p`
  cursor: pointer;
  color: #f3f3f3;
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  padding: 0 5px;
`

const Aphone = styled(A)`
  margin-right: 50px;
  color: white;
`

export default function HeaderComponent(props) {
  const [searchTerm, setSearchTerm] = useState('')
  let isSignedIn = true
  let isAnonmyous = false
  let itemsInCart = 4

  function handleSearch() {
    props.history.push(`/search/?searchTerm=${encodeURIComponent(searchTerm)}`)

  }

  return(
    <div>
      <NavTop>
        <NavBottomContainer>
          <div>
            { (isSignedIn && !isAnonmyous) && <Puser>Hello, Bobby Panczer (Airline Hydraulics)</Puser>} 
            { (isSignedIn && isAnonmyous) && <PeUser>Hello, Zach Linsell (Airline Hydraulics) [Emulating]</PeUser>}
          </div>
          <Div>
            <Aphone href="tel:+18009997378">800-999-7378</Aphone>
            { isSignedIn ? <A>Sign Out</A> : <A>Sign In</A> }
            <A>|</A>
            { isSignedIn ? <A>My Account</A> : <A>Create Account</A> }
            <A>|</A>
            <A>Cart({itemsInCart})</A>
          </Div>
        </NavBottomContainer>
      </NavTop>
      <NavBottom>
        <NavBottomContainer>
          <Link to="/">
            <img src={AirlineLogo} height="50px"/>
          </Link>
          <LinkContainer>
            <Link to="/shop" style={{ textDecoration: 'none' }}>
              <NavItem>Shop</NavItem>
            </Link>
            <Link to="/services" style={{ textDecoration: 'none' }}>
              <NavItem>Services</NavItem>
            </Link>
            <Link to="/industries" style={{ textDecoration: 'none' }}>
              <NavItem>Industries</NavItem>
            </Link>
            <Link to="/brands" style={{ textDecoration: 'none' }}>
              <NavItem>Brands</NavItem>
            </Link>
            <Link to="/resources" style={{ textDecoration: 'none' }}>
              <NavItem>Resources</NavItem>
            </Link>
            <Link to="/about" style={{ textDecoration: 'none' }}>
              <NavItem>About</NavItem>
            </Link>
            <Link to="/contact" style={{ textDecoration: 'none' }}>
              <NavItem>Contact</NavItem>
            </Link>
          </LinkContainer>
          <Div>
            <InputSearch value={searchTerm} placeholder="Searchy by Part # or Keyword" onChange={(e)=>setSearchTerm(e.target.value)}/>
            <ButtonSearch onClick={handleSearch}>Search</ButtonSearch>
          </Div>
          {/* <InputSearch placeholder="Search within these results" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/><ButtonSearch onClick={handleSearch}>Search</ButtonSearch> */}
        </NavBottomContainer>
      </NavBottom>
    </div>
  )
}