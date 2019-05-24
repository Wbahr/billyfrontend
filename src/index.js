import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Provider } from 'react-redux'
import { store } from './config/store'

import MainScreen from './containerComponents/mainScreen'

const App = () => {
	return(
		<div>
			<MainScreen />
		</div>
	)
}

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('index')
)
