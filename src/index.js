import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import MainScreen from './containerComponents/mainScreen'

const App = () => {
	return(
		<div>
			<MainScreen />
		</div>
	)
}

ReactDOM.render(
	<App />,
	document.getElementById('index')
)
