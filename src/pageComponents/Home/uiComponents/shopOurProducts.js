import { CategoryContainer } from 'pageComponents/ProductCategories/categoriesPage.js'
import CategoryList from 'pageComponents/ProductCategories/uiComponents/categoryList.js'
import React from 'react'
import styled from 'styled-components'
import SectionHeader from '../../_common/sectionHeader.js'

export default function ShopOurProducts(props) {

	return (
		<>
			<div>
				<div>
					<SectionHeader text='Shop by Categories' />
				</div>
				<CategoryContainer>
					<CategoryList {...props} />
                </CategoryContainer>
			</div>
		</>
	)
}