import React, { useContext, useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AirlineLogo from '../../imgs/airline/airline_vector.png'
import { Link } from 'react-router-dom'
import TopAlert from './headerAlertModal'
import Context from '../../setup/context'
import ImpersonationSearch from './impersonationSearch'
import { NavigationItemContainer, DropdownMenu, DropdownMenuItem, MyAccountDropdownMenu } from 'pageComponents/_common/dropdown-menu/DropdownMenu'
import { buildSearchString, onWindowResize } from '../../pageComponents/_common/helpers/generalHelperFunctions'
import { useQuery } from '@apollo/client'
import { GET_ROOT_CATEGORIES_HEADER } from 'setup/providerGQL'
import { Button, Menu } from '@material-ui/core'
import queryString from 'query-string'

const Nav = styled.div`
	position: ${props => props.history.location.pathname === '/search' && window.innerWidth < 750 ? 'relative' : '-webkit-sticky'};
	position: ${props => props.history.location.pathname === '/search' && window.innerWidth < 750 ? 'relative' : 'sticky'};
	top: 0;
	z-index: 2;
`
const NavTop = styled.div`
	display: flex;
	margin: 0 auto;
	padding: 2px 0;
	width: 100%;
	background-color: #535353;
	justify-content: center;
`
const NavBottom = styled.div`
	margin: 0 auto;
	width: 100%;
	padding: 5px 10px;
	background-color: white;
	box-shadow: 0px 3px 4px #dadada;
`
const NavContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	height: 100%;
	align-items: center;
`
const ReverseNavContainer = styled.div`
	display: flex;
	flex-direction: row-reverse;
	flex-wrap: wrap;
	height: 100%;
	width: 100%;
	align-items: center;
`
const LinkContainer = styled.div`
	display: flex;
	align-items: center;
	flex: 1;
	color: black;
	font-size: 14px;
	font-weight: 500;
`
const InputSearch = styled.input`
	width: 260px;
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
	@media (max-width: 365px) {
		width: 215px;
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
const Row = styled.div`
	display: flex;
	align-items: center;
`
const UserNameRow = styled.div`
	display: flex;
	flex-wrap: wrap;
	padding: 0 5px;
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
const P = styled.p`
	cursor: pointer;
	color: #f3f3f3;
	margin: 0;
	font-size: 14px;
	font-weight: 600;
	padding: 0 5px;
	white-space: nowrap;
`
const A = styled.a`
	cursor: pointer;
	color: #f3f3f3;
	margin: 0;
	font-size: 14px;
	font-weight: 600;
	padding: 0 5px;
	white-space: nowrap;
	&:hover {
		color: #f3f3f3;
	}
`
const Aphone = styled(P)`
  margin: 0;
	color: white;
	white-space: nowrap;
`
const DivCancelImpersonation = styled.div`
	cursor: pointer;
	margin: 0 8px;
`
const GrayDiv = styled.div`
	color: gray;
`
const GreenDiv = styled.div`
	color: limegreen;
`
const SearchBarRow = styled.div`
 	display: flex;
 	flex: 1;
 	justify-content: flex-end;
 	@media (max-width: 755px) {
 		justify-content: center;
	}
`
const AccountSectionRow = styled.div`
	display: flex;
	flex-wrap: wrap;
 	flex: 1;
 	justify-content: flex-end;
 	padding: 5px 0;
`

export default function HeaderComponent({ history }) {
    const tabContainerRef = useRef(null)
    const tabRefs = useRef([])

    const [categories, setCategories] = useState([])
    const tabDeclaration = headerTabs(categories)
    const [visibleTabCount, setVisibleTabCount] = useState(tabDeclaration.length)
    const [overflowMenu, setOverflowMenu] = useState(null)

    const [searchTerm, setSearchTerm] = useState('')
    const [searchAsCustomer, setSearchAsCustomer] = useState(false)
    const [showMyAccountDropdown, setShowMyAccountDropdown] = useState(false)
    const context = useContext(Context)

    useQuery(GET_ROOT_CATEGORIES_HEADER, {
        onCompleted: data => {
            setCategories(data.getAllRootCategories)
        }
    })

    const calculateTabs = () => {
        const containerRight = tabContainerRef.current && tabContainerRef.current.getBoundingClientRect().right
        const widthOfTheComponentsToTheRightOfTheTabs = containerRight < 745 ? 70 : 395 //SearchBar wraps at < 745
        const count = tabRefs.current.reduce((count, tabRight) => {
            if (tabRight <= (containerRight - widthOfTheComponentsToTheRightOfTheTabs)) {
                count += 1
            }
            return count
        }, 0)
        setVisibleTabCount(count)
    }

    useEffect(() => {
        calculateTabs()
        onWindowResize(calculateTabs)
    }, [tabRefs.current])

    const setTabRef = idx => ref => {
        const right = ref && ref.getBoundingClientRect().right
        if (right) tabRefs.current[idx] = right
    }
	
    const toMenu = ({ label, to, subItems, isExternalLink }, idx) => (
        <NavigationItemContainer to={to} isExternalLink={isExternalLink} text={label} key={label} ref={setTabRef(idx)}>
            <DropdownMenu>
                {subItems.map(toMenuItem)}
            </DropdownMenu>
        </NavigationItemContainer>
    )
	
    const toMenuItem = ({ label, to, isExternalLink }) => <DropdownMenuItem key={label} to={to} isExternalLink={isExternalLink}>{label}</DropdownMenuItem>
	
    const tabComponents = tabDeclaration.map(toMenu)

    const handleSearch = () => {
        const parsedQueryString = queryString.parse(history.location.search)
        const search = searchTerm?.length ? searchTerm : parsedQueryString.searchTerm
        const hasNonWebChanged = searchAsCustomer !== !!parsedQueryString.nonweb
        if (search?.length || hasNonWebChanged) history.push(buildSearchString({ searchTerm: search, nonweb: searchAsCustomer }))
    }

    const handleKeyPress = e => e.key === 'Enter' && handleSearch()

    const searchPlaceholder = searchAsCustomer ? '[Non-web Included] Search by Part # or Keyword' : 'Search by Part # or Keyword'

    const MyAccountDropdown = () => (
        <div
            id="myAccount"
            onMouseEnter={() => setShowMyAccountDropdown(true)}
            onMouseLeave={() => setShowMyAccountDropdown(false)}
        >
            <Link to="/account/dashboard" style={{ textDecoration: 'none' }}>
                <P id="myAccount">My Account</P>
            </Link>

            <MyAccountDropdownMenu className={showMyAccountDropdown ? 'visible' : ''}>
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
            </MyAccountDropdownMenu>
        </div>
    )

    const AccountSection = () => (
        <AccountSectionRow>
            <Row style={{ justifyContent: 'center' }}>
                <FontAwesomeIcon icon="phone-alt" color="white" />
                <Aphone href="tel:+18009997378">800-999-7378</Aphone>
            </Row>

            <Row style={{ justifyContent: 'center' }}>
                {context.userInfo
                    ? <P onClick={context.logoutUser}>Sign Out</P>
                    : <P onClick={() => history.push('/login')}>Sign In</P>
                }

                <P>|</P>

                {context.userInfo
                    ? <MyAccountDropdown/>
                    : <A href="/signup">Create Account</A>
                }

                <P>|</P>

                {context.cart && (
                    <Link to='/cart' style={{ textDecoration: 'none' }}>
                        <P>Cart({context.cart.length})</P>
                    </Link>
                )}
            </Row>
        </AccountSectionRow>
    )

    const SearchBar = (
        <SearchBarRow>
            {context.userInfo?.isAirlineEmployee && (
                <ButtonSearchType onClick={() => setSearchAsCustomer(!searchAsCustomer)}>
                    { searchAsCustomer ? <GreenDiv>NW</GreenDiv> : <GrayDiv>NW</GrayDiv> }
                </ButtonSearchType>
            )}

            <InputSearch
                value={searchTerm}
                placeholder={searchPlaceholder}
                onChange={e => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
            />

            <ButtonSearch onClick={handleSearch}>
                <FontAwesomeIcon icon="search" color="#f6f6f6" size="lg" />
            </ButtonSearch>
        </SearchBarRow>
    )

    return (
        <Nav history={history}>
            {context.topAlert?.show && <TopAlert message={context.topAlert.message} close={context.removeTopAlert}/>}
            <NavTop>
                <ReverseNavContainer>
                    <AccountSection/>

                    <UserNameSection {...context}/>
                </ReverseNavContainer>
            </NavTop>

            <NavBottom>
                <NavContainer ref={tabContainerRef}>
                    <Row>
                        <Link to="/">
                            <img src={AirlineLogo} width="135px" />
                        </Link>

                        <LinkContainer>
                            {tabComponents.slice(0, visibleTabCount)}

                            {visibleTabCount < tabDeclaration.length && (
                                <Button onClick={e => setOverflowMenu(e.currentTarget)} color="inherit">
                                    <FontAwesomeIcon icon="ellipsis-h"/>
                                </Button>
                            )}

                            <Menu
                                MenuListProps={{ style: { backgroundColor: '#535353' } }}
                                anchorEl={overflowMenu}
                                open={!!overflowMenu}
                                onClose={() => setOverflowMenu(null)}
                            >
                                {tabDeclaration
                                    .slice(visibleTabCount, tabDeclaration.length)
                                    .map(toMenuItem)
                                }
                            </Menu>
                        </LinkContainer>
                    </Row>

                    {SearchBar}
                </NavContainer>
            </NavBottom>
        </Nav>
    )
}

function UserNameSection({ userInfo, impersonatedCompanyInfo, cancelImpersonation }) {
    if (userInfo && !impersonatedCompanyInfo) {
        return (
            <UserNameRow style={{ flex: 1 }}>
                <Puser>
                    Hello, {userInfo.firstName} {userInfo.lastName} ({userInfo.companyName} - {userInfo.companyId})
                </Puser>
                {userInfo.isAirlineEngineerUser && <ImpersonationSearch/>}
            </UserNameRow>
        )
    } else if (userInfo && impersonatedCompanyInfo) {
        return (
            <UserNameRow style={{ flex: 1 }}>
                <PeUser>
                    <FontAwesomeIcon icon="user-circle" color="#f3f3f3" />
                    {impersonatedCompanyInfo.customerName} - {impersonatedCompanyInfo.customerIdP21} [Impersonating]
                </PeUser>
                <DivCancelImpersonation onClick={cancelImpersonation}>
                    <FontAwesomeIcon icon="times" color="white" />
                </DivCancelImpersonation>
                <ImpersonationSearch />
            </UserNameRow>
        )
    }
    return null
}

const servicesSubItems = [
    {
        label: 'Arc Flash Safety',
        to: '/pages/services/arc-flash-safety'
    },
    {
        label: 'Machine Safeguarding',
        to: '/pages/services/machine-safeguarding'
    },
    {
        label: 'Fluid Cleanliness & Maintenance',
        to: '/pages/services/fluid-cleanliness-and-maintenance'
    },
    {
        label: 'Engineered Systems & Assemblies',
        to: '/pages/services/engineered-systems-and-assemblies'
    },
    {
        label: 'Energy Efficiency',
        to: '/pages/services/energy-efficiency'
    },
    {
        label: 'Trola-Dyne Systems',
        to: '/pages/services/trola-dyne'
    }
]

const industriesSubItems = [
    {
        label: 'Physical Distancing Barriers',
        to: '/pages/industries/commercial-protective-barriers'
    },
    {
        label: 'Covid Medical Structures',
        to: '/pages/industries/covid-medical-structures'
    },
    {
        label: 'Primary Metals',
        to: '/pages/industries/primary-metals'
    },
    {
        label: 'Power Generation',
        to: '/pages/industries/power-generation'
    },
    {
        label: 'Marine',
        to: '/pages/industries/marine'
    },
    {
        label: 'Food Beverage & Packaging',
        to: '/pages/industries/food-beverage-and-packaging'
    },
    {
        label: 'Plastics & Rubber',
        to: '/pages/industries/plastics-and-rubber'
    },
    {
        label: 'Construction and Off Road',
        to: '/pages/industries/construction-and-off-road'
    },
    {
        label: 'Life Sciences',
        to: '/pages/industries/life-sciences'
    },
    {
        label: 'Industrial Machinery',
        to: '/pages/industries/industrial-machinery'
    },
    {
        label: 'Chemical & Water Processing',
        to: '/pages/industries/chemical-and-water-processing'
    },
    {
        label: 'Pulp & Paper',
        to: '/pages/industries/pulp-and-paper'
    },
    {
        label: 'Mining & Drilling',
        to: '/pages/industries/mining-and-drilling'
    },
    {
        label: <span>Power Distribution Products <br/> & Electrical Enclosures</span>,
        to: '/power-distribution-products-and-electrical-enclosures'
    }
]

const brandsSubItems = [
    {
        label: 'All Brands',
        to: '/brands'
    },
    {
        label: 'ABB',
        to: '/brands/featured/abb'
    },
    {
        label: 'Aventics',
        to: '/brands/featured/aventics'
    },
    {
        label: 'Butech',
        to: '/brands/featured/butech'
    },
    {
        label: 'Clippard',
        to: '/brands/featured/clippard'
    },
    {
        label: 'Eaton',
        to: '/brands/featured/eaton'
    },
    {
        label: 'Haskel',
        to: '/brands/featured/haskel'
    },
    {
        label: 'Hydac',
        to: '/brands/featured/hydac'
    },
    {
        label: 'Lincoln',
        to: '/brands/featured/lincoln'
    },
    {
        label: 'Omron',
        to: '/brands/featured/omron'
    },
    {
        label: 'Oriental Motor',
        to: '/brands/featured/oriental-motor'
    },
    {
        label: 'Paccar',
        to: '/brands/featured/paccar'
    },
    {
        label: 'Parker',
        to: '/brands/featured/parker'
    },
    {
        label: 'Phoenix Contact',
        to: '/brands/featured/phoenix-contact'
    },
    {
        label: 'Rexroth',
        to: '/brands/featured/rexroth'
    },
    {
        label: 'Rittal',
        to: '/brands/featured/rittal'
    },
    {
        label: 'Ross',
        to: '/brands/featured/ross'
    },
    {
        label: 'Schmersal',
        to: '/brands/featured/schmersal'
    },
    {
        label: 'SMC',
        to: '/brands/featured/smc'
    }
]

const resourcesSubItems = [
    {
        label: 'Blog - Technically Speaking',
        to: 'https://blog.airlinehyd.com/',
        isExternalLink: true
    },
    {
        label: 'Youtube Channel',
        to: 'https://www.youtube.com/channel/UCdZYpFsi2IES53d5BZr03fw/',
        isExternalLink: true
    },
    {
        label: 'Resources Center',
        to: '/pages/resources/resources-center'
    },
    {
        label: 'Line Cards & Brochures',
        to: '/linecards'
    },
    {
        label: 'Apps',
        to: '/apps'
    },
    {
        label: 'Manufacturer Catalogs',
        to: '/pages/resources/catalog-request'
    },
    {
        label: 'Social Distancing Barrier Linecards',
        to: '/pages/resources/social-distancing-barrier-linecards'
    }
]

const aboutSubItems = [
    {
        label: 'Locations',
        to: '/about/locations',
    },
    {
        label: 'Transactional Services',
        to: '/about/transactional-services',
    },
    {
        label: 'News',
        to: '/pages/about/news',
    },
    {
        label: 'Events',
        to: '/pages/about/events',
    },
    {
        label: 'Careers',
        to: '/pages/about/careers',
    },
    {
        label: 'Quality Policy',
        to: '/pages/about/quality-policy',
    },
    {
        label: 'Our History',
        to: '/pages/about/our-history',
    },
    {
        label: 'Our Mission',
        to: '/about/mission-statement',
    }
]

const contactSubItems = [
    {
        label: 'Contact Us',
        to: '/contact-us'
    },
    {
        label: 'Credit Application',
        to: '/pages/contact/credit-application'
    },
    {
        label: 'Framing Request',
        to: '/pages/contact/framing-request'
    },
    {
        label: 'Government Sales',
        to: '/government-sales'
    }
]
const headerTabs = categories => [
    {
        label: 'Shop',
        to: '/categories',
        subItems: categories.map(({ name, urlSlug }) => ({
            label: name,
            to: `/categories/${urlSlug}`
        }))
    },
    {
        label: 'Services',
        to: '/pages/services',
        subItems: servicesSubItems
    },
    {
        label: 'Industries',
        to: '/pages/industries',
        subItems: industriesSubItems
    },
    {
        label: 'Brands',
        to: '/brands',
        subItems: brandsSubItems
    },
    {
        label: 'Resources',
        to: '/pages/resources',
        subItems: resourcesSubItems
    },
    {
        label: 'About',
        to: '/pages/about',
        subItems: aboutSubItems
    },
    {
        label: 'Contact',
        to: '/contact-us',
        subItems: contactSubItems
    }
]
