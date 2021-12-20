import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Helmet } from 'react-helmet'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
    faCheckSquare, faCoffee, faPhoneAlt, faChevronLeft, faChevronRight, faCaretDown, faCaretUp, faShare, faGripLines,
    faLock, faSave, faTimesCircle, faCalendar, faDivide, faShoppingCart, faMapPin, faFax, faSearch, faUserCircle, faTimes,
    faUser, faUserPlus, faGlobeAmericas, faAddressBook, faArrowCircleRight, faPlus, faFileInvoiceDollar, faPlusCircle,
    faMinusCircle, faTools, faPencilAlt, faShippingFast, faEnvelope, faMapMarkerAlt, faPrint, faQuestionCircle, faTruckLoading,
    faUserEdit, faDesktop, faBoxOpen, faDatabase, faHome, faFilePdf, faFileCsv, faFileExcel, faCopy, faList, faEllipsisH,
    faCodeBranch, faCheck, faAsterisk
} from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faLinkedinIn, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { ApolloProvider, ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import ContextProvider from './setup/provider'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { logout } from './pageComponents/_common/helpers/generalHelperFunctions'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { PRIMARY_RED, SECONDARY_GRAY } from './pageComponents/_common/constants/colors'
import './index.css'
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'
// Layouts
import AdminLayout from './layoutComponents/adminLayout'
import EmptyLayout from './layoutComponents/emptyLayout'
import HeaderFooterHomepageLayout from './layoutComponents/headerfooterLayout/headerfooterHomepageLayout'
// Components
import About from './pageComponents/About/aboutPage'
import Apps from './pageComponents/Apps/appsPage'
import Blog from './pageComponents/Blog/blogPage'
import Checkout from './pageComponents/Checkout/checkoutPage'
import CreditApplication from './pageComponents/CreditApplication/CreditApplicationPage'
import EngineeredSystemsAndAssemblies from './pageComponents/Services/engineeredSystemsAndAssemblies'
import EngineeredSystems from './pageComponents/Services/engineeredSystems'
import FramingRequest from './pageComponents/FramingRequest/FramingRequestPage'
import GovermentSale from './pageComponents/GovermentSales/GovermentSalesPage'
import Home from './pageComponents/Home/homePage'
import ItemDetail from './pageComponents/ItemDetail/itemDetailPage'
import KnowledgeCenter from './pageComponents/KnowledgeCenter/knowledgeCenterPage'
import LineCards from './pageComponents/LineCards/lineCardsPage'
import Login from './pageComponents/Login/loginPage'
import OrderComplete from './pageComponents/Checkout/orderCompletePage'
import PasswordReset from './pageComponents/PasswordReset/passwordReset'
import PlantServices from './pageComponents/Services/plantServices'
import PowerDistributionProducts from './pageComponents/PowerDistributionProducts/PowerDistributionProductsPage'
import RedPallet from './pageComponents/RedPallet/redPalletPage'
import SearchResults from './pageComponents/SearchResults/searchResultsPage'
import ServiceForm from './pageComponents/ServiceForm/serviceForm'
import ServiceFormComplete from './pageComponents/ServiceForm/serviceFormComplete'
import Shop from './pageComponents/Shop/shopPage'
import ShoppingCart from './pageComponents/ShoppingCart/shoppingCartPage'
import Signup from './pageComponents/Signup/signupPage'
import MyAccountPage from './pageComponents/Account/myAccountPage'
import StaticPage from './pageComponents/Pages/staticPage'

// Supporting Components
import PermissionDenied from './pageComponents/Error/permissionDenied'
import FourOFour from './pageComponents/Error/fourOFourPage'
import CategoriesPage from './pageComponents/ProductCategories/categoriesPage'
import PasswordResetPinPage from './pageComponents/PasswordReset/PasswordResetPinPage'
import BrandsPage from './pageComponents/Brands/brandsPage'
import GeneralMinimalBrand from 'pageComponents/Brands/generalMinimalBrand'
import GeneralFullBrand from 'pageComponents/Brands/generalFullBrand'
import ContactUsPage from './pageComponents/ContactUs/contactUsPage'

//Admin Stuff
import DemandPermissionComponent from './pageComponents/_common/security/DemandPermissionComponent'
import AdminDashboard from './adminComponents/adminTools/adminDashboard'
import ItemCreation from './adminComponents/adminTools/ItemCreation/itemCreation'
import OpenOrders from './adminComponents/adminTools/OpenOrders/openOrders'
import DownpaymentsTable from './adminComponents/adminTools/Downpayments/downpaymentsTable'
import AddDownpayment from './adminComponents/adminTools/Downpayments/addDownpayment'
import Settings from './adminComponents/adminTools/Settings/settings'
import NewCustomerAdmin from './adminComponents/adminTools/NewCustomers/newCustomerAdmin'
import EditNewCustomer from './adminComponents/adminTools/NewCustomers/editNewCustomer'
import OrderPaymentMethods from './adminComponents/adminTools/OrderPaymentMethods/OrderPaymentMethods'
import { PERMISSION_ACCOUNTING_VIEW_ORDERS } from 'pageComponents/_common/constants/permissionConstants'

library.add(fab, faCheckSquare, faCoffee, faPhoneAlt, faChevronLeft, faChevronRight, faCaretDown, faCaretUp, faShare,
    faGripLines, faLock, faSave, faTimesCircle, faCalendar, faDivide, faShoppingCart, faFacebookF, faLinkedinIn, faTwitter,
    faYoutube, faMapPin, faFax, faSearch, faUserCircle, faTimes, faUser, faUserPlus, faGlobeAmericas, faAddressBook,
    faArrowCircleRight, faPlus, faFileInvoiceDollar, faPlusCircle, faMinusCircle, faTools, faPencilAlt, faShippingFast,
    faEnvelope, faMapMarkerAlt, faPrint, faQuestionCircle, faTruckLoading, faUserEdit, faDesktop, faBoxOpen, faDatabase,
    faHome, faFilePdf, faFileCsv, faFileExcel, faCopy, faList, faEllipsisH, faCodeBranch, faCheck, faAsterisk)

const httpLink = new HttpLink({
    uri: `${process.env.REACT_APP_API_URL}/graphql`,
})

const errorLink = onError(response => {

    //Reload the page on a 401 Unauthorized Error if the user has stored login info.
    if (response.networkError?.statusCode === 401) {
        const accessToken = localStorage.getItem('apiToken')
        const refreshToken = localStorage.getItem('refreshToken')
        const userInfo = localStorage.getItem('userInfo')

        if (accessToken || refreshToken || userInfo) {
            logout()
            window.location.reload()
        }
    }
})

// Setup the header for the request
const middlewareAuthLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem('apiToken')
    const refreshToken = localStorage.getItem('refreshToken')

    //Attach the JWT tokens to every request.
    if (refreshToken && token) {
        operation.setContext({
            headers: {
                authorization: token ? `Bearer ${token}` : null,
                refreshToken: token ? `RefreshToken ${refreshToken}` : null
            }
        })
    }

    return forward(operation)
})

const afterwareLink = new ApolloLink((operation, forward) => {
    return forward(operation).map((response) => {
        const context = operation.getContext()

        //Look for new API tokens on the response.
        const newAccessToken = context.response.headers.get('accesstoken')
        const newRefreshToken = context.response.headers.get('refreshToken')

        //And set them if present. The Refresh Token generated new tokens.
        if (newAccessToken) {
            //UserInfo is necessary for the site logic. Ensure it is not missing.
            if (!localStorage.getItem('userInfo')) {
                logout()
                window.location.reload()
            }

            localStorage.setItem('apiToken', newAccessToken)
            localStorage.setItem('refreshToken', newRefreshToken)
        }

        return response
    })
})

const client = new ApolloClient({
    link: ApolloLink.from([
        errorLink,
        middlewareAuthLink,
        afterwareLink,
        httpLink
    ]),
    cache: new InMemoryCache()
})

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

const defaults = createTheme()
const muiTheme = createTheme(Object.assign({}, defaults, {
    palette: {
        primary: {
            main: PRIMARY_RED
        },
        secondary: {
            main: SECONDARY_GRAY
        }
    },
    overrides: {
        MuiButton: {
            containedPrimary: {
                background: 'linear-gradient(to top left,#950f23,#DB1633)'
            }
        }
    }
}))

ReactDOM.render(
    <ThemeProvider theme={muiTheme}>
        <Helmet>
            <title>Airline Hydraulics</title>
        </Helmet>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ApolloProvider client={client}>
                    <ContextProvider>
                        <Elements stripe={stripePromise}>
                            <Outlet />
                        </Elements>
                    </ContextProvider>
                </ApolloProvider>}>
                    <Route element={<HeaderFooterHomepageLayout />}>
                        <Route index element={<Home />} />
                        <Route path='industries' element={<Home />} />
                        <Route path='resources' element={<Home />} />
                        <Route path='about/:page' element={<About />} />
                        <Route path='apps' element={<Apps />} />
                        <Route path='blog' element={<Blog />} />
                        <Route path='blog/:slug' element={<Blog />} />
                        <Route path='brands' element={<BrandsPage />} />
                        <Route path='brands/:page' element={<GeneralMinimalBrand />} />
                        <Route path='brands/featured/:page' element={<GeneralFullBrand />} />
                        <Route path='categories' element={<CategoriesPage />} />
                        <Route path='categories/:categoryUrlSlug' element={<CategoriesPage />} />
                        <Route path='contact-us' element={<ContactUsPage />} />
                        <Route path='credit-application' element={<CreditApplication />} />
                        <Route path='framing-request' element={<FramingRequest />} />
                        <Route path='government-sales' element={<GovermentSale />} />
                        <Route path='knowledge-center-and-faq' element={<KnowledgeCenter />} />
                        <Route path='linecards' element={<LineCards />} />
                        <Route path='order-complete/:orderId' element={<OrderComplete />} />
                        <Route path='quote-complete/:orderId' element={<OrderComplete />} />
                        <Route path='product/:item/:itemId' element={<ItemDetail />} />
                        <Route path='product/:item/:itemId/:customerPartNumber' element={<ItemDetail />} />
                        <Route path='power-distribution-products-and-electrical-enclosures' element={<PowerDistributionProducts />} />
                        <Route path='search/' element={<SearchResults />} />
                        <Route path='search/:searchTerm' element={<SearchResults />} />
                        <Route path='search/categories/:parentCategory' element={<SearchResults />} />
                        <Route path='search/categories/:parentCategory/:childCategory' element={<SearchResults />} />
                        <Route path='services/engineered-systems-and-assemblies' element={<EngineeredSystemsAndAssemblies />} />
                        <Route path='services/engineered-systems-and-assemblies/:page' element={<EngineeredSystems />} />
                        <Route path='services/plant-services/:page' element={<PlantServices />} />
                        <Route path='shop/:page' element={<Shop />} />
                        <Route path='cart' element={<ShoppingCart />} />
                        <Route path='serviceform-complete/:formNo' element={<ServiceFormComplete />} />
                        <Route path='technologies/:page' element={<technologyPage />} />
                        <Route path='pages' element={<Home />} />
                        <Route path='pages/:pageId1' element={<StaticPage />} />
                        <Route path='pages/:pageId1/:pageId2' element={<StaticPage />} />
                        <Route path='pages/:pageId1/:pageId2/:pageId3' element={<StaticPage />} />
                        <Route path='pages/:pageId1/:pageId2/:pageId3/:pageId4' element={<StaticPage />} />
                        <Route path='account/:page' element={<MyAccountPage />} />
                        <Route path='account/:page/:orderId' element={<MyAccountPage />} />
                        <Route path='checkout' element={<Checkout />} />
                        <Route path='create-quote' element={<Checkout />} />
                        <Route path='serviceform' element={<ServiceForm />} />
                        {/* Error Screens */}
                        <Route path='permission-denied' element={<PermissionDenied />} />
                        <Route path='*' element={<FourOFour />} />
                    </Route>
                    <Route element={<EmptyLayout />} >
                        <Route path='password-reset' element={<PasswordResetPinPage />} />
                        <Route path='signup' element={<Signup />} />
                        <Route path='login' element={< Login />} />
                        <Route path='red-pallet' element={< RedPallet />} />
                        {/*deprecated*/} <Route exact path='password-reset/:passwordToken' element={<PasswordReset />} />
                    </Route >
                    <Route element={<AdminLayout />}>
                        <Route path="/admin-dashboard" element={<AdminDashboard />} />
                        <Route path="/admin-dashboard/item-creation" element={<ItemCreation />} />
                        <Route path="/admin-dashboard/open-orders" element={<OpenOrders />} />
                        <Route path="/admin-dashboard/downpayments" element={<DownpaymentsTable />} />
                        <Route path="/admin-dashboard/downpayments/add" element={<AddDownpayment />} />
                        <Route path="/admin-dashboard/new-customers" element={<NewCustomerAdmin />} />
                        <Route path="/admin-dashboard/new-customers/:regId" element={<EditNewCustomer />} />
                        <Route path="/admin-dashboard/settings" element={<Settings />} />
                        <Route path="/admin-dashboard/order-payment-methods" element={<DemandPermissionComponent permission={PERMISSION_ACCOUNTING_VIEW_ORDERS} errorMessage='Permission Denied'>
                            <OrderPaymentMethods />
                        </DemandPermissionComponent>} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter >
    </ThemeProvider >
    , document.getElementById('index')
)
