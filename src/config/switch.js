import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
// Layouts
import AdminLayout from '../layoutComponents/adminLayout'
import EmptyLayout from '../layoutComponents/emptyLayout'
import HeaderFooterHomepageLayout from '../layoutComponents/headerfooterLayout/headerfooterHomepageLayout'
import HeaderFooterLayout from '../layoutComponents/headerfooterLayout/headerfooterLayout'
import HeaderFooterLayoutExpanded from '../layoutComponents/headerfooterLayout/headerfooterLayoutExpanded'
// Components
import About from '../pageComponents/About/aboutPage'
import Apps from '../pageComponents/Apps/appsPage'
import Blog from '../pageComponents/Blog/blogPage'
import Checkout from '../pageComponents/Checkout/checkoutPage'
import contactPage from '../pageComponents/ContactUs/contactUsPage'
import CreditApplication from '../pageComponents/CreditApplication/CreditApplicationPage'
import EngineeredSystemsAndAssemblies from '../pageComponents/Services/engineeredSystemsAndAssemblies'
import EngineeredSystems from '../pageComponents/Services/engineeredSystems'
import FramingRequest from '../pageComponents/FramingRequest/FramingRequestPage'
import GovermentSale from '../pageComponents/GovermentSales/GovermentSalesPage'
import Home from '../pageComponents/Home/homePage'
import ItemDetail from '../pageComponents/ItemDetail/itemDetailPage'
import KnowledgeCenter from '../pageComponents/KnowledgeCenter/knowledgeCenterPage'
import LineCards from '../pageComponents/LineCards/lineCardsPage'
import Login from '../pageComponents/Login/loginPage'
import OrderComplete from '../pageComponents/Checkout/orderCompletePage'
import PasswordReset from '../pageComponents/PasswordReset/passwordReset'
import PlantServices from '../pageComponents/Services/plantServices'
import PowerDistributionProducts from '../pageComponents/PowerDistributionProducts/PowerDistributionProductsPage'
import RedPallet from '../pageComponents/RedPallet/redPalletPage'
import SearchResults from '../pageComponents/SearchResults/searchResultsPage'
import Shop from '../pageComponents/Shop/shopPage'
import ShoppingCart from '../pageComponents/ShoppingCart/shoppingCartPage'
import Signup from '../pageComponents/Signup/signupPage'
import generalMinimalBrand from '../pageComponents/Brands/generalMinimalBrand'
import generalFullBrand from '../pageComponents/Brands/generalFullBrand'
import brandsPage from '../pageComponents/Brands/brandsPage'
import technologyPage from 'pageComponents/Technologies/technologyPage'
import MyAccountPage from '../pageComponents/Account/myAccountPage'
import StaticPage from '../pageComponents/Pages/staticPage'

// Supporting Components
import Auth from './auth'
import AdminHome from '../adminComponents/adminHome'
import PermissionDenied from '../pageComponents/Error/permissionDenied'
import FourOFour from '../pageComponents/Error/fourOFourPage'
import ErrorBoundry from './errorBoundry'
import knowledgeCenterPage from 'pageComponents/KnowledgeCenter/knowledgeCenterPage'
import CategoriesPage from 'pageComponents/ProductCategories/categoriesPage'


function WrapperRoute({auth, roles, component: Component, layout: LayoutWrapperComponent, ...otherProps }) {
	return (
		<Route
			{...otherProps}
			render={routeProps => (
				<Auth auth={auth} roles={roles} {...routeProps}>
					<LayoutWrapperComponent {...routeProps}>
						<ErrorBoundry>
							<Component {...routeProps} />
						</ErrorBoundry>
					</LayoutWrapperComponent>
				</Auth>
			)}
		/>
	)
}

class App extends React.Component {
	// componentDidUpdate (prevProps) {
	// if (this.props.location !== prevProps.location) {
	//   // track google analytics page view
	//   window.gtag('config', 'UA-57868840-4', {
	//     'page_path': this.props.location.pathname
	//   })

	//   // track adwords page view
	//   window.gtag('config', 'AW-798297408', {
	//     'page_path': this.props.location.pathname
	//   })

	//   // track facebook page view
	//   window.fbq('track', 'PageView')
	// }
	// }

	render () {
		return (
			<Switch>
				<WrapperRoute exact path='/' component={Home} layout={HeaderFooterHomepageLayout}/>
				<WrapperRoute exact path='/about/:page' component={About} layout={HeaderFooterLayoutExpanded}/>
				<WrapperRoute exact path='/account/:page' auth component={MyAccountPage} layout={HeaderFooterLayoutExpanded}/>
				<WrapperRoute exact path='/account/:page/:orderId' auth component={MyAccountPage} layout={HeaderFooterLayoutExpanded}/>
				<WrapperRoute exact path='/apps' component={Apps} layout={HeaderFooterLayoutExpanded}/>
				<WrapperRoute exact path='/blog' component={Blog} layout={HeaderFooterLayoutExpanded}/>
				<WrapperRoute exact path='/blog/:slug' component={Blog} layout={HeaderFooterLayoutExpanded}/>  
				<WrapperRoute exact path='/brands' component={brandsPage} layout={HeaderFooterLayoutExpanded}/>
				<WrapperRoute exact path='/brands/:page' component={generalMinimalBrand} layout={HeaderFooterLayoutExpanded}/>
				<WrapperRoute exact path='/brands/featured/:page' component={generalFullBrand} layout={HeaderFooterLayoutExpanded}/>
				<WrapperRoute path='/categories' component={CategoriesPage} layout={HeaderFooterLayoutExpanded}/>
				<WrapperRoute exact path='/checkout' component={Checkout} layout={HeaderFooterLayout}/>
				<WrapperRoute exact path='/contact-us' component={contactPage} layout={HeaderFooterLayoutExpanded}/>
				<WrapperRoute exact path='/create-quote' component={Checkout} layout={HeaderFooterLayout}/>
				<WrapperRoute exact path='/credit-application' component={CreditApplication} layout={HeaderFooterLayoutExpanded}/>
				<WrapperRoute exact path='/framing-request' component={FramingRequest} layout={HeaderFooterLayoutExpanded}/>
				<WrapperRoute exact path='/government-sales' component={GovermentSale} layout={HeaderFooterLayoutExpanded}/>
				<WrapperRoute exact path='/industries' component={Home} layout={HeaderFooterLayout}/>
				<WrapperRoute exact path='/knowledge-center-and-faq' component={KnowledgeCenter} layout={HeaderFooterLayoutExpanded}/>
				<WrapperRoute exact path='/linecards' component={LineCards} layout={HeaderFooterLayoutExpanded}/>
				<WrapperRoute exact path='/login' component={Login} layout={EmptyLayout}/>
				<WrapperRoute exact path='/order-complete/:orderId' component={OrderComplete} layout={HeaderFooterLayoutExpanded}/>
				<WrapperRoute exact path='/password-reset/:passwordToken' component={PasswordReset} layout={EmptyLayout}/>
				<WrapperRoute exact path='/product/:item/:itemId' component={ItemDetail} layout={HeaderFooterLayoutExpanded}/>
				<WrapperRoute exact path='/product/:item/:itemId/:customerPartNumber' component={ItemDetail} layout={HeaderFooterLayoutExpanded}/>
				<WrapperRoute exact path='/power-distribution-products-and-electrical-enclosures' component={PowerDistributionProducts} layout={HeaderFooterLayoutExpanded}/>
				<WrapperRoute exact path='/red-pallet' component={RedPallet} layout={EmptyLayout}/>
				<WrapperRoute exact path='/resources' component={Home} layout={HeaderFooterLayout}/>
				<WrapperRoute exact path='/search/' component={SearchResults} layout={HeaderFooterLayoutExpanded}/>
				<WrapperRoute exact path='/search/:searchTerm' component={SearchResults} layout={HeaderFooterLayoutExpanded}/>
				<WrapperRoute exact path='/search/categories/:parentCategory' component={SearchResults} layout={HeaderFooterLayoutExpanded}/>
				<WrapperRoute exact path='/search/categories/:parentCategory/:childCategory' component={SearchResults} layout={HeaderFooterLayoutExpanded}/>
				<WrapperRoute exact path='/services/engineered-systems-and-assemblies' component={EngineeredSystemsAndAssemblies} layout={HeaderFooterLayoutExpanded}/>
				<WrapperRoute exact path='/services/engineered-systems-and-assemblies/:page' component={EngineeredSystems} layout={HeaderFooterLayoutExpanded}/>
				<WrapperRoute exact path='/services/plant-services/:page' component={PlantServices} layout={HeaderFooterLayoutExpanded}/>
				<WrapperRoute exact path='/shop/:page' component={Shop} layout={HeaderFooterLayoutExpanded}/>
				<WrapperRoute exact path='/signup' component={Signup} layout={EmptyLayout}/>
				<WrapperRoute exact path='/cart' component={ShoppingCart} layout={HeaderFooterLayoutExpanded}/>
				<WrapperRoute exact path='/technologies/:page' component={technologyPage} layout={HeaderFooterLayoutExpanded}/>
				<WrapperRoute exact path='/pages/:pageId1/:pageId2?/:pageId3?/:pageId4?' component={StaticPage} layout={HeaderFooterLayoutExpanded} />

				{/* ADMIN INTERNAL TOOLS (MANAGES ITS OWN SUB ROUTES)*/}
				<WrapperRoute path='/admin-dashboard' auth roles={['AirlineEmployee','Impersonator']} component={AdminHome} layout={AdminLayout}/>

				{/* Error Screens */}
				<WrapperRoute exact path='/permission-denied' component={PermissionDenied} layout={HeaderFooterLayoutExpanded}/>
				<WrapperRoute component={FourOFour} layout={HeaderFooterLayoutExpanded}/>
			</Switch>
		)
	}
}

export default withRouter(App)
