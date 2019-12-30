import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import Switch from './config/switch'
import { createBrowserHistory } from "history"
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee, faPhoneAlt, faChevronLeft, faChevronRight, faCaretDown, faCaretUp, faShare, faGripLines, faLock, faSave, faTimesCircle, faCalendar, faDivide, faShoppingCart, faMapPin, faFax, faSearch} from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faLinkedinIn, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons' 
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from 'apollo-boost'
import ContextProvider from './config/provider'
import 'index.css'

library.add(fab, faCheckSquare, faCoffee, faPhoneAlt, faChevronLeft, faChevronRight, faCaretDown, faCaretUp, faShare, faGripLines, faLock, faSave, faTimesCircle, faCalendar, faDivide, faShoppingCart, faFacebookF, faLinkedinIn, faTwitter, faYoutube, faMapPin, faFax, faSearch)

const customHistory = createBrowserHistory();
// import MainScreen from './containerComponents/mainScreen'
// import SearchResults from './pageComponents/SearchResults/searchResultsPage'

const apolloClient = new ApolloClient({
  uri: process.env.API_URL + '/graphql'
})


ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <ContextProvider>
      <BrowserRouter history={customHistory}>
        <Switch />
      </BrowserRouter>
    </ContextProvider>
  </ApolloProvider>
  , document.getElementById('index')
)
