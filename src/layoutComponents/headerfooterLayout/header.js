import React, { useContext, useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AirlineLogo from '../../imgs/airline/airline_vector.png'
import { Link } from 'react-router-dom'
import TopAlert from './headerAlertModal'
import Context from '../../config/context'
import ImpersonationSearch from './impersonationSearch'
import { NavigationItemContainer, DropdownMenu, DropdownMenuItem, MyAccountDropdownMenu } from 'pageComponents/_common/dropdown-menu/DropdownMenu'
import { buildSearchString } from "../../pageComponents/_common/helpers/generalHelperFunctions";
import { useQuery } from '@apollo/client'
import { GET_CATEGORY_SEARCH } from 'config/providerGQL'
import {Button, Menu} from '@material-ui/core'

const Nav = styled.div`
	position: -webkit-sticky;
	position: sticky;
	top: 0;
`
const NavTop = styled.div`
	display: flex;
	margin: 0 auto;
	padding: 2px 0;
	width: 100%;
	background-color: #535353;
	justify-content: center;
	z-index: 89;
`
const NavBottom = styled.div`
	margin: 0 auto;
	width: 100%;
	height: 50px;
	padding: 0 10px;
	background-color: white;
	box-shadow: 0px 3px 4px #dadada;
	z-index: 2;
`
const NavContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
`
const LinkContainer = styled.div`
	display: flex;
	align-items: center;
	flex: 1;
	height: 100%;
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
`
const A = styled.a`
	cursor: pointer;
	color: #f3f3f3;
	margin: 0;
	font-size: 14px;
	font-weight: 600;
	padding: 0 5px;
	&:hover {
		color: #f3f3f3;
	}
`
const Aphone = styled(P)`
  margin: 0 auto;
	color: white;
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

function onWindowResize(callback) {
	window.addEventListener('resize', callback)
	return () => window.removeEventListener('resize', callback)
}

export default function HeaderComponent({history}) {
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
	
	useQuery(GET_CATEGORY_SEARCH, {
		onCompleted: data => {
			setCategories(data.getAllParentCategories)
		}
	})
	
	const calculateTabs = () => {
		const containerRight = tabContainerRef.current && tabContainerRef.current.getBoundingClientRect().right
		const widthOfTheComponentsToTheRightOfTheTabs = 395
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
	
	const toMenu = ({label, to, subItems}, idx) => (
		<NavigationItemContainer to={to} text={label} key={label} ref={setTabRef(idx)}>
			<DropdownMenu>
				{subItems.map(toMenuItem)}
			</DropdownMenu>
		</NavigationItemContainer>
	)
	
	const toMenuItem = ({label, to}) => <DropdownMenuItem key={label} to={to}>{label}</DropdownMenuItem>
	
	const tabComponents = tabDeclaration.map(toMenu)
	
	const handleSearch = () => history.push(buildSearchString({searchTerm, nonweb: searchAsCustomer}))
	
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
		<>
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
		</>
	)
	
	const SearchBar = () => (
		<Row>
			{context.userInfo?.isAirlineUser && (
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
		</Row>
	)
	
	const TabsSection = () => (
		<LinkContainer>
			{tabComponents.slice(0, visibleTabCount)}
			
			{visibleTabCount < tabDeclaration.length && (
				<Button onClick={e => setOverflowMenu(e.currentTarget)} color="inherit">
					<FontAwesomeIcon icon="ellipsis-h"/>
				</Button>
			)}
			
			<Menu
				MenuListProps={{style: {backgroundColor: '#535353'}}}
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
	)
	
	return (
		<Nav>
			{context.topAlert?.show && <TopAlert message={context.topAlert.message} close={context.removeTopAlert}/>}
			<NavTop>
				<NavContainer>
					<UserNameSection {...context}/>
					
					<Row style={{padding: '5px 0'}}>
						<Row>
							<FontAwesomeIcon icon="phone-alt" color="white" />
							<Aphone href="tel:+18009997378">800-999-7378</Aphone>
						</Row>
						
						<AccountSection/>
					</Row>
				</NavContainer>
			</NavTop>
			
			<NavBottom>
				<NavContainer ref={tabContainerRef}>
					<Link to="/">
						<img src={AirlineLogo} width="135px" />
					</Link>
					
					<TabsSection/>
					
					<SearchBar/>
				</NavContainer>
			</NavBottom>
		</Nav>
	);
}

function UserNameSection({userInfo, impersonatedCompanyInfo}) {
	if (userInfo && !impersonatedCompanyInfo) {
		return (
			<Row style={{flex: 1}}>
				<Puser>
					Hello, {userInfo.firstName} {userInfo.lastName} ({userInfo.companyName} - {userInfo.companyId})
				</Puser>
				{userInfo.role === 'AirlineEmployee' && <ImpersonationSearch/>}
			</Row>
		)
	} else if (userInfo && impersonatedCompanyInfo) {
		return (
			<Row style={{flex: 1}}>
				<PeUser>
					<FontAwesomeIcon icon="user-circle" color="#f3f3f3" />
					{impersonatedCompanyInfo.customerName} - {impersonatedCompanyInfo.customerIdP21} [Impersonating]
				</PeUser>
				<DivCancelImpersonation onClick={context.cancelImpersonation}>
					<FontAwesomeIcon icon="times" color="white" />
				</DivCancelImpersonation>
				<ImpersonationSearch />
			</Row>
		)
	} else {
		return <Row style={{flex: 1}}/>;
	}
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
		to: '/services/plant-services/fluid-cleanliness-and-maintenance'
	},
	{
		label: 'Engineered Systems & Assemblies',
		to: '/services/engineered-systems-and-assemblies'
	},
	{
		label: 'Energy Efficiency',
		to: '/pages/services/energy-efficiency'
	},
	{
		label: 'Trola-Dyne Systems',
		to: '/pages/trola-dyne'
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
		label: 'Power Distribution Products and <br/> Electrical Enclosures',
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
		to: '/blog'
	},
	{
		label: 'Youtube Channel',
		to: 'https://www.youtube.com/channel/UCdZYpFsi2IES53d5BZr03fw/'
	},
	{
		label: 'Knowledge Center & FAQ',
		to: '/knowledge-center-and-faq'
	},
	{
		label: 'Line Cards & Brochures',
		to: '/linecards'
	},
	{
		label: 'Apps',
		to: '/apps'
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
		to: '/about/news',
	},
	{
		label: 'Events',
		to: '/about/events',
	},
	{
		label: 'Careers',
		to: '/about/careers',
	},
	{
		label: 'Quality Policy',
		to: '/about/quality-policy',
	},
	{
		label: 'Our History',
		to: '/about/our-history',
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
		to: '/credit-application'
	},
	{
		label: 'Framing Request',
		to: '/framing-request'
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
		subItems: categories.map(({name, nameForUrl}) => ({
			label: name,
			to: `/categories/${nameForUrl}`
		}))
	},
	{
		label: 'Services',
		to: '/services',
		subItems: servicesSubItems
	},
	{
		label: 'Industries',
		to: '/industries',
		subItems: industriesSubItems
	},
	{
		label: 'Brands',
		to: '/brands',
		subItems: brandsSubItems
	},
	{
		label: 'Resources',
		to: '/resources',
		subItems: resourcesSubItems
	},
	{
		label: 'About',
		to: '/about',
		subItems: aboutSubItems
	},
	{
		label: 'Contact',
		to: '/contact-us',
		subItems: contactSubItems
	}
]