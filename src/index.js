import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './config/reducers'

import MainScreen from "./screens/mainScreen"

const App = () => {
  return(
    <div>
      <h1>Hello!</h1>
      <MainScreen />
    </div>
  )
};

ReactDOM.render(
  <Provider store={createStore(reducers)}>
    <App />
  </Provider>,
  document.getElementById('index')
)
