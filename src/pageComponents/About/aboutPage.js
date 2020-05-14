import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import Locations from './aboutSubPages/locationsPage'
import News from './aboutSubPages/newsPage'

export default function AboutPage() {
	const [pageComponent, setPageComponent] = useState()
	let { page } = useParams()

	useEffect(() => {
		if (page === 'locations') {
			setPageComponent(<Locations />)
		}
		else if (page === 'news') {
			setPageComponent(<News />)
		}
	}, [page])

	return (
    <>
      {pageComponent}
    </>
	)
}

AboutPage.propTypes = {
	history: PropTypes.object.isRequired
}