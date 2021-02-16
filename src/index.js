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
    faUserEdit, faDesktop, faBoxOpen, faDatabase, faHome, faFilePdf, faFileCsv, faFileExcel, faCopy, faList, faEllipsisH
} from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faLinkedinIn, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { ApolloProvider } from '@apollo/client'
import ApolloClient from 'apollo-boost'
import ContextProvider from './setup/provider'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { logout } from './pageComponents/_common/helpers/generalHelperFunctions'
import 'index.css'

library.add(fab, faCheckSquare, faCoffee, faPhoneAlt, faChevronLeft, faChevronRight, faCaretDown, faCaretUp, faShare,
    faGripLines, faLock, faSave, faTimesCircle, faCalendar, faDivide, faShoppingCart, faFacebookF, faLinkedinIn, faTwitter,
    faYoutube, faMapPin, faFax, faSearch, faUserCircle, faTimes, faUser, faUserPlus, faGlobeAmericas, faAddressBook,
    faArrowCircleRight, faPlus, faFileInvoiceDollar, faPlusCircle, faMinusCircle, faTools, faPencilAlt, faShippingFast,
    faEnvelope, faMapMarkerAlt, faPrint, faQuestionCircle, faTruckLoading, faUserEdit, faDesktop, faBoxOpen, faDatabase,
    faHome, faFilePdf, faFileCsv, faFileExcel, faCopy, faList, faEllipsisH)

const customHistory = createBrowserHistory()

const client = new ApolloClient({
    uri: `${process.env.REACT_APP_API_URL}/graphql`,
    request: (operation) => {
        const token = localStorage.getItem('apiToken')
        operation.setContext({
            headers: {
                authorization: token ? `Bearer ${token}` : null
            }
        })
    },
    onError: (response) => {
        if (response.networkError.statusCode === 401){
            logout()
            location.reload()
        }
    }
})

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

ReactDOM.render(
    <ApolloProvider client={client}>
        <ContextProvider history={customHistory}>
            <Elements stripe={stripePromise}>
                <Router history={customHistory}>
                    <Switch />
                </Router>
            </Elements>
        </ContextProvider>
    </ApolloProvider>
    , document.getElementById('index')
)
