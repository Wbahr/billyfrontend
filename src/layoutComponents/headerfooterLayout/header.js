import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AirlineLogo from '../../imgs/airline/airline_vector.png'
import { Link } from 'react-router-dom'
import TopAlert from './headerAlertModal'
import Context from '../../config/context'
import ImpersonationSearch from './impersonationSearch'
import { NavigationItemContainer, DropdownMenu, DropdownMenuItem, DropdownMenuItemExternal } from 'pageComponents/_common/dropdown-menu/DropdownMenu'
import { buildSearchString } from "../../pageComponents/_common/helpers/generalHelperFunctions";
import { useQuery } from '@apollo/client'
import { GET_CATEGORY_SEARCH } from 'config/providerGQL'

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

const NavItem = styled.div`
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
	background-image: linear-gradient(to top left, ${props => props.theme.mainColorBlend},  ${props => props.theme.mainColor});
	color: ${props => props.theme.buttonForegroundColor};
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
	background-image: linear-gradient(to top left, #328efc, #133752);
	color: #f3f3f3;
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
    const [searchTerm, setSearchTerm] = useState('');
    const [searchAsCustomer, setSearchAsCustomer] = useState(false);
    const [showMyAccountDropdown, setShowMyAccountDropdown] = useState(false);
    const [categories, setCategories] = useState(null);

    const context = useContext(Context);
    useQuery(GET_CATEGORY_SEARCH, {
        onCompleted: data => {
            setCategories(data.getAllParentCategories);
        }
    });

    function handleSearch() {
        props.history.push(buildSearchString(searchTerm, 'relevancy', searchAsCustomer));
    }

    return (
        <>
            {context.topAlert?.show && <TopAlert message={context.topAlert.message} close={() => context.removeTopAlert()} />}
            <NavTop>
                <NavBottomContainer>
                    <div>
                        <UserNameSection context={context}></UserNameSection>
                    </div>
                    <Div>
                        <Div>
                            <FontAwesomeIcon icon="phone-alt" color="white" />
                            <Aphone href="tel:+18009997378">800-999-7378</Aphone>
                        </Div>
                            {context.userInfo 
                                ? <A onClick={() => { context.logoutUser() }}>Sign Out</A> 
                                : <A onClick={() => props.history.push('/login')}>Sign In</A>}
                        <A>|</A>
                        {context.userInfo 
                            ? (<div id="myAccount" onMouseEnter={() => setShowMyAccountDropdown(true)} onMouseLeave={() => { setTimeout(() => { setShowMyAccountDropdown(false) }, 50) }}>
                                    <Link to="/account/dashboard" style={{ textDecoration: 'none' }}>
                                        <A id="myAccount">My Account</A>
                                    </Link>
                                    <DropdownMenu className={showMyAccountDropdown ? 'visible' : ''}>
                                        <DropdownMenuItem to="/account/shopping-lists">Shopping Lists</DropdownMenuItem>
                                        <DropdownMenuItem to="/account/dashboard">Upload List to Cart</DropdownMenuItem>
                                        <DropdownMenuItem to="/contact-us">Request for Quote</DropdownMenuItem>
                                        <DropdownMenuItem to="/account/dashboard">Account Profile</DropdownMenuItem>
                                        <DropdownMenuItem to="/account/invoices">Invoices</DropdownMenuItem>
                                        <DropdownMenuItem to="/account/orders">Orders</DropdownMenuItem>
                                        <DropdownMenuItem to="/account/open-orders-report">Open Orders Report</DropdownMenuItem>
                                        <DropdownMenuItem to="/account/open-quotes">Open Quotes</DropdownMenuItem>
                                        <DropdownMenuItem to="/account/dashboard">Open Payables</DropdownMenuItem>
                                        <DropdownMenuItem to="/account/my-ordered-items">Purchase History</DropdownMenuItem>
                                        <DropdownMenuItem to="/account/dashboard">Suspended Orders</DropdownMenuItem>
                                    </DropdownMenu>
                                </div>)
                            : (<A onClick={() => props.history.push('/signup')}>Create Account</A>)
                        }
                        <A>|</A>
                       { context.cart && (
                            <Link to='/cart' style={{ textDecoration: 'none' }}>
                                <A>Cart({context.cart.length})</A>
                            </Link>
                        )}
                    </Div>
                </NavBottomContainer>
            </NavTop>
            <NavBottom>
                <NavBottomContainer>
                    <Link to="/">
                        <img src={AirlineLogo} height="50px" />
                    </Link>
                    <LinkContainer>
                        <NavigationItemContainer to="/categories" text="Shop">
                            <DropdownMenu>
                                {categories && categories.length > 0 && categories.map((cat, idx) => (
                                    <DropdownMenuItem key={idx} to={`/categories/${cat.nameForUrl}`}>{cat.name}</DropdownMenuItem>
                                ))}
                                
                            </DropdownMenu>
                        </NavigationItemContainer>
                        <NavigationItemContainer to="/services" text="Services">
                            <DropdownMenu>
                                <DropdownMenuItem to="/pages/services/arc-flash-safety">Arc Flash Safety</DropdownMenuItem>
                                <DropdownMenuItem to="/pages/services/machine-safeguarding">Machine Safeguarding</DropdownMenuItem>
                                <DropdownMenuItem to="/services/plant-services/fluid-cleanliness-and-maintenance">Fluid Cleanliness &amp; Maintenance</DropdownMenuItem>
                                <DropdownMenuItem to="/services/engineered-systems-and-assemblies">Engineered Systems &amp; Assemblies</DropdownMenuItem>
                                <DropdownMenuItem to="/pages/services/energy-efficiency">Energy Efficiency</DropdownMenuItem>
                                <DropdownMenuItem to="/pages/trola-dyne">Trola-Dyne Systems</DropdownMenuItem>
                            </DropdownMenu>
                        </NavigationItemContainer>
                        <NavigationItemContainer to="/industries" text="Industries">
                            <DropdownMenu>
                                <DropdownMenuItem to="/pages/industries/commercial-protective-barriers">Physical Distancing Barriers</DropdownMenuItem>
                                <DropdownMenuItem to="/pages/industries/covid-medical-structures">Covid Medical Structures</DropdownMenuItem>
                                <DropdownMenuItem to="/brands">All Brands</DropdownMenuItem>
                                <DropdownMenuItem to="/brands/featured/abb">ABB</DropdownMenuItem>
                                <DropdownMenuItem to="/brands/featured/aventics">Aventics</DropdownMenuItem>
                                <DropdownMenuItem to="/power-distribution-products-and-electrical-enclosures">Power Distribution Products and <br/> Electrical Enclosures</DropdownMenuItem>
                            </DropdownMenu>
                        </NavigationItemContainer>
                        <NavigationItemContainer to="/brands" text="Brands">
                            <DropdownMenu>
                                <DropdownMenuItem to='/brands'>All Brands</DropdownMenuItem>
                                <DropdownMenuItem to='/brands/featured/abb'>ABB</DropdownMenuItem>
                                <DropdownMenuItem to='/brands/featured/aventics'>Aventics</DropdownMenuItem>
                                <DropdownMenuItem to='/brands/featured/butech'>Butech</DropdownMenuItem>
                                <DropdownMenuItem to='/brands/featured/clippard'>Clippard</DropdownMenuItem>
                                <DropdownMenuItem to='/brands/featured/eaton'>Eaton</DropdownMenuItem>
                                <DropdownMenuItem to='/brands/featured/haskel'>Haskel</DropdownMenuItem>
                                <DropdownMenuItem to='/brands/featured/hydac'>Hydac</DropdownMenuItem>
                                <DropdownMenuItem to='/brands/featured/lincoln'>Lincoln</DropdownMenuItem>
                                <DropdownMenuItem to='/brands/featured/omron'>Omron</DropdownMenuItem>
                                <DropdownMenuItem to='/brands/featured/oriental-motor'>Oriental Motor</DropdownMenuItem>
                                <DropdownMenuItem to='/brands/featured/paccar'>Paccar</DropdownMenuItem>
                                <DropdownMenuItem to='/brands/featured/parker'>Parker</DropdownMenuItem>
                                <DropdownMenuItem to='/brands/featured/phoenix-contact'>Phoenix Contact</DropdownMenuItem>
                                <DropdownMenuItem to='/brands/featured/rexroth'>Rexroth</DropdownMenuItem>
                                <DropdownMenuItem to='/brands/featured/rittal'>Rittal</DropdownMenuItem>
                                <DropdownMenuItem to='/brands/featured/ross'>Ross</DropdownMenuItem>
                                <DropdownMenuItem to='/brands/featured/schmersal'>Schmersal</DropdownMenuItem>
                                <DropdownMenuItem to='/brands/featured/smc'>SMC</DropdownMenuItem>
                            </DropdownMenu>
                        </NavigationItemContainer>
                        <NavigationItemContainer to="/resources" text="Resources">
                            <DropdownMenu>
                                <DropdownMenuItem to='/blog'>Blog - Technically Speaking</DropdownMenuItem>
                                <DropdownMenuItemExternal to='https://www.youtube.com/channel/UCdZYpFsi2IES53d5BZr03fw/'>Youtube Channel</DropdownMenuItemExternal>
                                <DropdownMenuItem to='/knowledge-center-and-faq'>Knowledge Center &amp; FAQ</DropdownMenuItem>
                                <DropdownMenuItem to='/linecards'>Line Cards &amp; Brochures</DropdownMenuItem>
                                <DropdownMenuItem to='/apps'>Apps</DropdownMenuItem>
                            </DropdownMenu>
                        </NavigationItemContainer>
                        <NavigationItemContainer to="/about" text="About">
                            <DropdownMenu>
                                <DropdownMenuItem to='/about/locations'>Locations</DropdownMenuItem>
                                <DropdownMenuItem to='/about/transactional-services'>Transactional Services</DropdownMenuItem>
                                <DropdownMenuItem to='/about/news'>News</DropdownMenuItem>
                                <DropdownMenuItem to='/about/events'>Events</DropdownMenuItem>
                                <DropdownMenuItem to='/about/careers'>Careers</DropdownMenuItem>
                                <DropdownMenuItem to='/about/quality-policy'>Quality Policy</DropdownMenuItem>
                                <DropdownMenuItem to='/about/our-history'>Our History</DropdownMenuItem>
                                <DropdownMenuItem to='/about/mission-statement'>Our Mission</DropdownMenuItem>
                            </DropdownMenu>
                        </NavigationItemContainer>
                        <NavigationItemContainer to="/contact-us" text="Contact">
                            <DropdownMenu>
                                <DropdownMenuItem to='/contact-us'>Contact Us</DropdownMenuItem>
                                <DropdownMenuItem to='/credit-application'>Credit Application</DropdownMenuItem>
                                <DropdownMenuItem to='/framing-request'>Framing Request</DropdownMenuItem>
                                <DropdownMenuItem to='/government-sales'>Government Sales</DropdownMenuItem>
                            </DropdownMenu>
                        </NavigationItemContainer>
                    </LinkContainer>
                    <Div>   
                        {context.userInfo && (context.userInfo.role === 'AirlineEmployee' || context.userInfo.role === 'Impersonator') &&
                            <ButtonSearchType onClick={() => { setSearchAsCustomer(!searchAsCustomer) }}>
                                {searchAsCustomer ? <div style={{ color: 'limegreen' }}>NW</div> : <div style={{ color: 'grey' }}>NW</div>}
                            </ButtonSearchType>
                        }
                        <InputSearch value={searchTerm} placeholder={searchAsCustomer ? '[Non-web Included] Search by Part # or Keyword' : 'Search by Part # or Keyword'} onChange={(e) => setSearchTerm(e.target.value)} onKeyPress={(e) => { e.key === 'Enter' ? handleSearch() : null }} />
                        <ButtonSearch onClick={handleSearch}>
                            <FontAwesomeIcon icon="search" color="#f6f6f6" size="lg" />
                        </ButtonSearch>
                    </Div>
                    {/* <InputSearch placeholder="Search within these results" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/><ButtonSearch onClick={handleSearch}>Search</ButtonSearch> */}
                </NavBottomContainer>
            </NavBottom>
        </>
    );
}

function UserNameSection({context}) {
    if (context.userInfo && !context.impersonatedCompanyInfo) {
        if (context.userInfo.role === 'AirlineEmployee') {
            return (<Div><Puser>Hello, {context.userInfo.firstName} {context.userInfo.lastName} ({context.userInfo.companyName} - {context.userInfo.companyId})</Puser><ImpersonationSearch /></Div>)
        } else {
            return (<Div><Puser>Hello, {context.userInfo.firstName} {context.userInfo.lastName} ({context.userInfo.companyName} - {context.userInfo.companyId})</Puser></Div>)
        }
    } else if (context.userInfo && context.impersonatedCompanyInfo) {
        return (<Div><PeUser><FontAwesomeIcon icon="user-circle" color="#f3f3f3" /> {context.impersonatedCompanyInfo.customerName} - {context.impersonatedCompanyInfo.customerIdP21} [Impersonating]</PeUser><DivCancelImpersonation onClick={() => context.cancelImpersonation()}><FontAwesomeIcon icon="times" color="white" /></DivCancelImpersonation><ImpersonationSearch /></Div>)
    } else {
        return null;
    }
}