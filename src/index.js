import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Router } from 'react-router-dom'
import Switch from './setup/switch'
import { createBrowserHistory } from 'history'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee, faPhoneAlt, faChevronLeft, faChevronRight, faCaretDown, faCaretUp, faShare, faGripLines,
    faLock, faSave, faTimesCircle, faCalendar, faDivide, faShoppingCart, faMapPin, faFax, faSearch, faUserCircle, faTimes,
    faUser, faUserPlus, faGlobeAmericas, faAddressBook, faArrowCircleRight, faPlus, faFileInvoiceDollar, faPlusCircle,
    faMinusCircle, faTools, faPencilAlt, faShippingFast, faEnvelope, faMapMarkerAlt, faPrint, faQuestionCircle, faTruckLoading,
    faUserEdit, faDesktop, faBoxOpen, faDatabase, faHome, faFilePdf, faFileCsv, faFileExcel, faCopy, faList, faEllipsisH,
    faCodeBranch, faCheck
} from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faLinkedinIn, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { ApolloProvider, ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client'
import ContextProvider from './setup/provider'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { logout } from './pageComponents/_common/helpers/generalHelperFunctions'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { PRIMARY_RED, SECONDARY_GRAY } from './pageComponents/_common/constants/colors'
import 'index.css'

library.add(fab, faCheckSquare, faCoffee, faPhoneAlt, faChevronLeft, faChevronRight, faCaretDown, faCaretUp, faShare,
    faGripLines, faLock, faSave, faTimesCircle, faCalendar, faDivide, faShoppingCart, faFacebookF, faLinkedinIn, faTwitter,
    faYoutube, faMapPin, faFax, faSearch, faUserCircle, faTimes, faUser, faUserPlus, faGlobeAmericas, faAddressBook,
    faArrowCircleRight, faPlus, faFileInvoiceDollar, faPlusCircle, faMinusCircle, faTools, faPencilAlt, faShippingFast,
    faEnvelope, faMapMarkerAlt, faPrint, faQuestionCircle, faTruckLoading, faUserEdit, faDesktop, faBoxOpen, faDatabase,
    faHome, faFilePdf, faFileCsv, faFileExcel, faCopy, faList, faEllipsisH, faCodeBranch, faCheck)

const customHistory = createBrowserHistory()

const httpLink = new HttpLink({
    uri: `${process.env.REACT_APP_API_URL}/graphql`,
})

// Setup the header for the request
const middlewareAuthLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem('apiToken')
    const refreshToken = localStorage.getItem('refreshToken')
    operation.setContext({
        headers: {
            authorization: token ? `Bearer ${token}` : null,
            refreshToken: token ? `RefreshToken ${refreshToken}` : null
        }
    })
    return forward(operation)
})

const afterwareLink = new ApolloLink((operation, forward) => {
    return forward(operation).map((response) => {
        const context = operation.getContext()

        //Look for new API tokens on the response.
        const newAccessToken = context.response.headers.get('accesstoken')
        const newRefreshToken = context.response.headers.get('refreshToken')

        //And set them if present. The Refresh Token generated new tokens.
        if (newAccessToken){
            localStorage.setItem('apiToken', newAccessToken)
            localStorage.setItem('refreshToken', newRefreshToken)
        }

        return response
    })
})

const client = new ApolloClient({
    onError: (response) => {
        if (response.networkError.statusCode === 401){
            logout()
            location.reload()
        }
    },
    link: ApolloLink.from([
        middlewareAuthLink,
        afterwareLink,
        httpLink
    ]),
    cache: new InMemoryCache()
})

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

const defaults = createMuiTheme()
const muiTheme = createMuiTheme(Object.assign({}, defaults, {
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
    <ApolloProvider client={client}>
        <ContextProvider history={customHistory}>
            <MuiThemeProvider theme={muiTheme}>
                <Elements stripe={stripePromise}>
                    <Router history={customHistory}>
                        <Switch />
                    </Router>
                </Elements>
            </MuiThemeProvider>
        </ContextProvider>
    </ApolloProvider>
    , document.getElementById('index')
)
