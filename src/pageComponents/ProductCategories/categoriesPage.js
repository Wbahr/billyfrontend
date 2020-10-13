import React, { useState, useEffect } from 'react'
import CategoryRouter from './uiComponents/categoryRouter'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import Loader from 'pageComponents/_common/loader'
import { GET_CATEGORY_SEARCH } from 'config/providerGQL'

//Queries for categories from GraphQL
//Asks child components to render these

export const CategoryContainer = styled.div`
	display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

export default function CategoriesPage(props) {
	const [categories, setCategories] = useState(null);

	const { loading, error, data } = useQuery(GET_CATEGORY_SEARCH, {
		onCompleted: data => { 
			setCategories(data.getAllParentCategories);
		}
	});

	if(loading) return <CategoryContainer><Loader /></CategoryContainer>

	return(
		<CategoryContainer>
			<CategoryRouter categories={categories} {...props} />
		</CategoryContainer>
	);
}