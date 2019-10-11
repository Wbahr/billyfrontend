import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, browserHistory } from 'react-router-dom'
import Switch from './config/switch'
// import MainScreen from './containerComponents/mainScreen'
// import SearchResults from './pageComponents/SearchResults/searchResultsPage'

ReactDOM.render(
  <BrowserRouter history={browserHistory}>
    <Switch />
  </BrowserRouter>
  , document.getElementById('index')
)
