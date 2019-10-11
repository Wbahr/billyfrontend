import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router } from 'react-router-dom'
import Switch from './config/switch'
// import MainScreen from './containerComponents/mainScreen'
// import SearchResults from './pageComponents/SearchResults/searchResultsPage'

ReactDOM.render(
  <Router>
    <Switch />
  </Router>
  , document.getElementById('index')
)
