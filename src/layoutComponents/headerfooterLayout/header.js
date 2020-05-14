import React, { useState } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AirlineLogo from '../../imgs/airline/airline_vector.png'
import { Link, useHistory } from 'react-router-dom'
import TopAlert from './headerAlertModal'
import Context from '../../config/context'
import ImpersonationSearch from './impersonationSearch'
import Dropdown from './headerNavDropdown'

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
  z-index: 89;
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
  z-index: 2;
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
  width: 1300px;
  padding: 0 10px;
  justify-content: space-between;
  align-items: center;
    @media (max-width: 800px) {
    
  }
`

const NavItem =styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: black !important;
  font-weight: 400;
  font-size: 16px;
  font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
  margin: 0 8px -3px 8px;
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
  const [showDropdown, setShowDropdown] = useState(
    {
      about: false,
      brands: false,
      contact: false,
      resources: false,
      services: false,
      shop: false,
      industries: false
    }
  )

  function handleSearch() {
    props.history.push(`/search/?searchTerm=${encodeURIComponent(searchTerm)}&resultSize=24&resultPage=1&sortType=${encodeURIComponent('relevancy')}&nonweb=${encodeURIComponent(searchAsCustomer)}&nonce=${new Date().getTime()}`)
  }

  function onHover(e) {
    let target = e.target.id
    let mutatedShowDropdown = _.mapValues(showDropdown, () => false)
    setShowDropdown({...mutatedShowDropdown, [target]: true})
  }

  function onExit(e) {
    let mutatedShowDropdown = _.mapValues(showDropdown, () => false)
    setShowDropdown({...mutatedShowDropdown})
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
                    return(<Div><Puser>Hello, {userInfo.firstName} {userInfo.lastName} ({userInfo.companyName} - {userInfo.companyId})</Puser><ImpersonationSearch /></Div>)
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
            <div id="shop" onMouseEnter={(e)=>onHover(e)} onMouseLeave={(e)=>onExit(e)}>
              <Link to="/categories" style={{ textDecoration: 'none' }}>
                <NavItem id="shop">Shop <FontAwesomeIcon style={{'marginLeft': '4px'}} icon={showDropdown.shop ? "caret-up" : "caret-down"} color="black"/></NavItem>
              </Link>
              <Dropdown open={showDropdown.shop} history={props.history}
                options={[
                  {
                    'label': 'All Brands',
                    'link': '/shop/all-categories'
                  },
                  {
                    'label': 'ABB',
                    'link': '/brands/featured/abb'
                  },
                  {
                    'label': 'Aventics',
                    'link': '/brands/featured/aventics'
                  }
                ]}
              />
            </div>
            <div id="services" onMouseEnter={(e)=>onHover(e)} onMouseLeave={(e)=>onExit(e)}>
              <Link to="/services" style={{ textDecoration: 'none' }}>
                <NavItem id="services">Services <FontAwesomeIcon style={{'marginLeft': '4px'}} icon={showDropdown.services ? "caret-up" : "caret-down"} color="black"/></NavItem>
              </Link>
              <Dropdown open={showDropdown.services} history={props.history}
                options={[
                  {
                    'label': 'All Brands',
                    'link': '/brands'
                  },
                  {
                    'label': 'ABB',
                    'link': '/brands/featured/abb'
                  },
                  {
                    'label': 'Aventics',
                    'link': '/brands/featured/aventics'
                  }
                ]}
              />
            </div>
            <div id="industries" onMouseEnter={(e)=>onHover(e)} onMouseLeave={(e)=>onExit(e)}>
              <Link to="/industries" style={{ textDecoration: 'none' }}>
                <NavItem id="industries">Industries <FontAwesomeIcon style={{'marginLeft': '4px'}} icon={showDropdown.industries ? "caret-up" : "caret-down"} color="black"/></NavItem>
              </Link>
              <Dropdown open={showDropdown.industries} history={props.history}
                options={[
                  {
                    'label': 'All Brands',
                    'link': '/brands'
                  },
                  {
                    'label': 'ABB',
                    'link': '/brands/featured/abb'
                  },
                  {
                    'label': 'Aventics',
                    'link': '/brands/featured/aventics'
                  },
                  {
                    'label': 'Power Distribution Products and Electrical Enclosures',
                    'link': '/power-distribution-products-and-electrical-enclosures'
                  }
                ]}
              />
            </div>
            <div id="brands" onMouseEnter={(e)=>onHover(e)} onMouseLeave={(e)=>onExit(e)}>
              <Link to="/brands" style={{ textDecoration: 'none' }} >
                <NavItem id="brands">Brands <FontAwesomeIcon style={{'marginLeft': '4px'}} icon={showDropdown.brands ? "caret-up" : "caret-down"} color="black"/></NavItem>
              </Link>
              <Dropdown open={showDropdown.brands} history={props.history}
                options={[
                  {
                    'label': 'All Brands',
                    'link': '/brands'
                  },
                  {
                    'label': 'ABB',
                    'link': '/brands/featured/abb'
                  },
                  {
                    'label': 'Aventics',
                    'link': '/brands/featured/aventics'
                  },
                  {
                    'label': 'Butech',
                    'link': '/brands/featured/butech'
                  },
                  {
                    'label': 'Clippard',
                    'link': '/brands/featured/clippard'
                  },
                  {
                    'label': 'Eaton',
                    'link': '/brands/featured/eaton'
                  },
                  {
                    'label': 'Haskel',
                    'link': '/brands/featured/haskel'
                  },
                  {
                    'label': 'Hydac',
                    'link': '/brands/featured/hydac'
                  },
                  {
                    'label': 'Lincoln',
                    'link': '/brands/featured/lincoln'
                  },
                  {
                    'label': 'Omron',
                    'link': '/brands/featured/omron'
                  },
                  {
                    'label': 'Oriental Motor',
                    'link': '/brands/featured/oriental-motor'
                  },
                  {
                    'label': 'Paccar',
                    'link': '/brands/featured/paccar'
                  },
                  {
                    'label': 'Parker',
                    'link': '/brands/featured/parker'
                  },
                  {
                    'label': 'Phoenix Contact',
                    'link': '/brands/featured/phoenix-contact'
                  },
                  {
                    'label': 'Rexroth',
                    'link': '/brands/featured/rexroth'
                  },
                  {
                    'label': 'Rittal',
                    'link': '/brands/featured/rittal'
                  },
                  {
                    'label': 'Ross',
                    'link': '/brands/featured/ross'
                  },
                  {
                    'label': 'Schmersal',
                    'link': '/brands/featured/schmersal'
                  },
                  {
                    'label': 'SMC',
                    'link': '/brands/featured/smc'
                  }
                ]}
              />
            </div>
            <div id="resources" onMouseEnter={(e)=>onHover(e)} onMouseLeave={(e)=>onExit(e)}>
              <Link to="/resources" style={{ textDecoration: 'none' }}>
                <NavItem id="resources">Resources <FontAwesomeIcon style={{'marginLeft': '4px'}} icon={showDropdown.resources ? "caret-up" : "caret-down"} color="black"/></NavItem>
              </Link>
              <Dropdown open={showDropdown.resources} history={props.history}
                options={[
                  {
                    'label': 'Blog - Technically Speaking',
                    'link': '/blog'
                  },
                  {
                    'label': 'Youtube Channel',
                    'link': '/blog'
                  },
                  {
                    'label': 'FAQ',
                    'link': '/resources/faq'
                  },
                  {
                    'label': 'Line Cards & Brochures',
                    'link' : '/linecards'
                  }
                ]}
              />
            </div>
            <div id="about" onMouseEnter={(e)=>onHover(e)} onMouseLeave={(e)=>onExit(e)}>
              <Link to="/about" style={{ textDecoration: 'none' }}>
                <NavItem id="about">About <FontAwesomeIcon style={{'marginLeft': '4px'}} icon={showDropdown.about ? "caret-up" : "caret-down"} color="black"/></NavItem>
              </Link>
              <Dropdown open={showDropdown.about} history={props.history}
                options={[
                  {
                    'label': 'Locations',
                    'link': '/about/locations'
                  },
                  {
                    'label': 'Transactional Services',
                    'link': '/about/transactional-services'
                  },
                  {
                    'label': 'News',
                    'link': '/about/news'
                  },
                  {
                    'label': 'Events',
                    'link': '/about/events'
                  },
                  {
                    'label': 'Careers',
                    'link': '/about/careers'
                  },
                  {
                    'label': 'Quality Policy',
                    'link': '/about/quality-policy'
                  },
                  {
                    'label': 'Our History',
                    'link': '/about/our-history'
                  },
                  {
                    'label': 'Mission/vision Statement',
                    'link': '/about/mission-statement'
                  }
                ]}
              />
            </div>
            <div id="contact" onMouseEnter={(e)=>onHover(e)} onMouseLeave={(e)=>onExit(e)}>
              <Link to="/contact-us" style={{ textDecoration: 'none' }}>
                <NavItem id="contact">Contact <FontAwesomeIcon style={{'marginLeft': '4px'}} icon={showDropdown.contact ? "caret-up" : "caret-down"} color="black"/></NavItem>
              </Link>
              <Dropdown open={showDropdown.contact} history={props.history}
                options={[
                  {
                    'label': 'Contact Us',
                    'link': '/contact-us'
                  },
                  {
                    'label': 'Credit Application',
                    'link': '/credit-application'
                  },
                  {
                    'label': 'Framing Request',
                    'link': '/framing-request'
                  },
                  {
                    'label': 'Government Sales',
                    'link': '/government-sales'
                  }
                ]}
              />
            </div>
          </LinkContainer>
          <Div>
            <Context.Consumer>
              {({userInfo}) => {
                if(userInfo && (userInfo.role === "AirlineEmployee" || userInfo.role === "Impersonator")){
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