import React from 'react'
import styled from 'styled-components'
import AirlineLogo from '../imgs/airline/airline_vector.png'

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
  height: 60px;
  background-color: white;
  justify-content: center;
  box-shadow: 0px 3px 4px #dadada;
`

const LinkContainer = styled.div`
  display: flex;
  height: 100%;
  width: 40%;
  color: black;
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
  cursor: pointer;
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

export default function HeaderComponent() {
  return(
    <>
      <NavTop>
        <NavBottomContainer>
          <div>
            <Puser>Hello, Bobby Panczer (Airline Hydraulics)</Puser>
            {/* <PeUser>Hello, Zach Linsell (Airline Hydraulics) [Emulating]</PeUser> */}
          </div>
          <Div>
            <Aphone href="tel:+18009997378">800-999-7378</Aphone>
            <A>Sign Out</A>
            <A>|</A>
            <A>Account</A>
            <A>|</A>
            <A>Cart(4)</A>
          </Div>
        </NavBottomContainer>
      </NavTop>
      <NavBottom>
        <NavBottomContainer>
          <img src={AirlineLogo} height="50px"/>
          <LinkContainer>
            <NavItem>Shop</NavItem>
            <NavItem>Services</NavItem>
            <NavItem>Industries</NavItem>
            <NavItem>Brands</NavItem>
            <NavItem>Resources</NavItem>
            <NavItem>About</NavItem>
            <NavItem>Contact</NavItem>
          </LinkContainer>
          <Div>
            <InputSearch placeholder="Search by Part # or Keyword" />
            <ButtonSearch>Search</ButtonSearch>
          </Div>
          {/* <InputSearch placeholder="Search within these results" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/><ButtonSearch onClick={handleSearch}>Search</ButtonSearch> */}
        </NavBottomContainer>
      </NavBottom>
    </>
  )
}