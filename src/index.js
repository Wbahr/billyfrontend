import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import Switch from './config/switch'
import { createBrowserHistory } from "history"

const customHistory = createBrowserHistory();
// import MainScreen from './containerComponents/mainScreen'
// import SearchResults from './pageComponents/SearchResults/searchResultsPage'

ReactDOM.render(
  <BrowserRouter history={customHistory}>
    <Switch />
  </BrowserRouter>
  , document.getElementById('index')
)
