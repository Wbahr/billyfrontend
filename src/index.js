import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
// import MainScreen from './containerComponents/mainScreen'
import SearchResults from './pageComponents/SearchResults/searchResultsPage'

const App = () => {
	return(
		<>
			<SearchResults />
		</>
	)
}

ReactDOM.render(
	<App />,
	document.getElementById('index')
)
