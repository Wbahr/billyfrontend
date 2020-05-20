import React from 'react'
import CategoryGrid from './uiComponents/categoryGrid'

export default function ProductCategoriesPage(props) {
	return(
		<>
			<CategoryGrid 
				history={props.history}
			/>
		</>
	)
}