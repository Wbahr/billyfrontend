import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import FoodBeverage from './technologyTypePages/foodBeveragePage'

export default function TechnologyPage() {
	const [pageComponent, setPageComponent] = useState()
	let { page } = useParams()
  
	useEffect(() => {
		if (page === 'food-beverage') {
			setPageComponent(<FoodBeverage />)
		}
	}, [page])

	return (
    <>
      {pageComponent}
    </>
	)
}
TechnologyPage.propTypes = {
	history: PropTypes.object.isRequired
}