import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import Switch from './config/switch'
import { createBrowserHistory } from "history"
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee, faPhoneAlt, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from 'apollo-boost'

library.add(fab, faCheckSquare, faCoffee, faPhoneAlt, faChevronLeft, faChevronRight)

const customHistory = createBrowserHistory();
// import MainScreen from './containerComponents/mainScreen'
// import SearchResults from './pageComponents/SearchResults/searchResultsPage'

const apolloClient = new ApolloClient({
  uri: process.env.API_URL + '/graphql'
})


ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <BrowserRouter history={customHistory}>
      <Switch />
    </BrowserRouter>
  </ApolloProvider>
  
  , document.getElementById('index')
)
