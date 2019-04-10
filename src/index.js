import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
// import { createStore } from 'redux'
// import store from './redux/store'
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
  <Provider>
  {/*<Provider store={store}>*/}
  {/*<Provider store={createStore()}>*/}
    <App />
  </Provider>,
  document.getElementById('index')
)
