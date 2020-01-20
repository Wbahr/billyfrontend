import React, { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AirlineLogo from '../../imgs/airline/airline_vector.png'
import { Link, useHistory } from 'react-router-dom'
import TopAlert from './headerAlertModal'
import Context from '../../config/context'
import ImpersonationSearch from './impersonationSearch'

const NavTop = styled.div`
  display: flex;
  margin: 0 auto;
  width: 100%;
  height: 40px;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background-color: #535353;
  justify-content: center;
`

const NavBottom = styled.div`
  display: flex;
  position: -webkit-sticky;
  position: sticky;
  top: 40px;
  margin: 0 auto;
  width: 100%;
  height: 70px;
  background-color: white;
  justify-content: center;
  box-shadow: 0px 3px 4px #dadada;
`

const LinkContainer = styled.div`
  display: flex;
  height: 100%;
  width: 45%;
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
  font-weight: 400;
  font-size: 16px;
  font-family: helvetica-neue-light,Helvetica Neue,Helvetica,Arial,sans-serif;
  border-bottom: 3px white solid;
  margin-bottom: -3px;

  &:hover{
    transition: border-bottom 200ms;
    border-bottom: 3px rgb(219,22,51) solid;
  }
`

const InputSearch = styled.input`
  width: 360px;
  height: 40px;
  font-size: 15px;
  border-color: #dadada;
  border-top: 1px #dadada solid;
  border-left: 1px #dadada solid;
  border-bottom: 1px #e7e7e7 solid;
  border-right: 0px;
  padding: 0 8px;
  &:focus{
    border-top: 1px #b4b4b4 solid;
    border-left: 1px #b4b4b4 solid;
    border-bottom: 1px #b4b4b4 solid;
  }
`

const ButtonSearch = styled.button`
  width: 50px;
  height: 40px;
  background-image: linear-gradient(to top left, #950f23, #DB1633);
  color: white;
  font-weight: 500;
  border: 0;
  font-size: 14px;
  border-radius: 0 5px 5px 0;
`

const ButtonSearchType = styled.button`
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to top left, #404040, #272727);
  border-radius: 3px 0px 0 3px;
  color: white;
  font-weight: 500;
  border: 0;
  font-size: 14px;
`

const Div = styled.div`
  display: flex;
`


const Puser = styled.p`
  background-image: linear-gradient(to top left, #404040, #333);
  color: #f3f3f3;
  font-size: 11px;
  margin: 0;
  padding: 4px 8px;
  border-radius: 30px;
  font-weight: 600;
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

const DivCancelImpersonation = styled.div`
  cursor: pointer;
  margin: 0 8px;
`

export default function HeaderComponent(props) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchAsCustomer, setSearchAsCustomer] = useState(false)

  function handleSearch() {
    props.history.push(`/search/?searchTerm=${encodeURIComponent(searchTerm)}&resultSize=24&resultPage=1&sortType=${encodeURIComponent('relevancy')}&nonce=${new Date().getTime()}`)
  }

  return(
    <>
      <Context.Consumer>
      {({topAlert,removeTopAlert}) => {
        if(topAlert.show) {
          return(<TopAlert 
            message={topAlert.message}
            close={()=>removeTopAlert()}
          />)
        }
      }}        
      </Context.Consumer>
      <NavTop>
        <NavBottomContainer>
          <div>
            <Context.Consumer>
              {({userInfo, impersonatedCompanyInfo, cancelImpersonation}) => {
                if (!_.isNil(userInfo) && _.isNil(impersonatedCompanyInfo)){
                  if(userInfo.role === "AirlineEmployee"){
                    return(<Div><Puser>Hello, {userInfo.firstName} {userInfo.lastName} (Airline Employee)</Puser><ImpersonationSearch /></Div>)
                  } else {
                    return(<Div><Puser>Hello, {userInfo.firstName} {userInfo.lastName} ({userInfo.companyName} - {userInfo.companyId})</Puser></Div>)
                  }
                } else if (!_.isNil(userInfo) && !_.isNil(impersonatedCompanyInfo)) {
                  return(<Div><PeUser><FontAwesomeIcon icon="user-circle" color="#328EFC"/> {impersonatedCompanyInfo.customerName} - {impersonatedCompanyInfo.customerIdP21} [Impersonating]</PeUser><DivCancelImpersonation onClick={()=>cancelImpersonation()}><FontAwesomeIcon icon="times" color="white"/></DivCancelImpersonation><ImpersonationSearch /></Div>)
                }
              }}        
            </Context.Consumer>
          </div>
          <Div>
            <Div>
              <FontAwesomeIcon icon="phone-alt" color="white"/>        
              <Aphone href="tel:+18009997378">800-999-7378</Aphone>
            </Div>
            <Context.Consumer>
              {({userInfo, logoutUser}) => {
                if (!_.isNil(userInfo)){
                  return(<A onClick={()=>{logoutUser()}}>Sign Out</A>)
                } else {
                  return(<A onClick={()=>props.history.push('/login')}>Sign In</A> )
                }
              }}        
            </Context.Consumer>
            <A>|</A>
            <Context.Consumer>
              {({userInfo}) => {
                if (!_.isNil(userInfo)){
                  return(<A onClick={()=>props.history.push('/account/dashboard')}>My Account</A>)
                } else {
                  return(<A onClick={()=>props.history.push('/signup')}>Create Account</A>)
                }
              }}        
            </Context.Consumer>
            <A>|</A>
            <Context.Consumer>
              {({cart}) => (
                  <Link to='/cart' style={{ textDecoration: 'none' }}>
                    <A>Cart({cart.length})</A>
                  </Link>
              )}
            </Context.Consumer>
          </Div>
        </NavBottomContainer>
      </NavTop>
      <NavBottom>
        <NavBottomContainer>
          <Link to="/">
            <img src={AirlineLogo} height="50px"/>
          </Link>
          <LinkContainer>
            <Link to="/categories" style={{ textDecoration: 'none' }}>
              <NavItem>Shop <FontAwesomeIcon icon="caret-down" color="black"/></NavItem>
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
            <Context.Consumer>
              {({userInfo}) => {
                if(userInfo && userInfo.role === "AirlineEmployee"){
                  return(
                    <ButtonSearchType onClick={()=>{setSearchAsCustomer(!searchAsCustomer)}}>
                      {searchAsCustomer ? <div style={{color: 'limegreen'}}>NW</div> : <div style={{color: 'grey'}}>NW</div>}
                    </ButtonSearchType>
                  )
                }
              }}
            </Context.Consumer>
            <InputSearch value={searchTerm} placeholder={searchAsCustomer ? '[Non-web Included] Search by Part # or Keyword' : 'Search by Part # or Keyword'} onChange={(e)=>setSearchTerm(e.target.value)} onKeyPress={(e)=>{e.key === 'Enter' ? handleSearch() : null}}/>
            <ButtonSearch onClick={handleSearch}>
              <FontAwesomeIcon icon="search" color="#f6f6f6" size="lg"/>
            </ButtonSearch>
          </Div>
          {/* <InputSearch placeholder="Search within these results" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/><ButtonSearch onClick={handleSearch}>Search</ButtonSearch> */}
        </NavBottomContainer>
      </NavBottom>
    </>
  )
}