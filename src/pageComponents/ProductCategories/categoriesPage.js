import React, { useState, useEffect } from 'react'
import CategoryRouter from './uiComponents/categoryRouter'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import Loader from 'pageComponents/_common/loader'

//Queries for categories from GraphQL
//Asks child components to render these

const DivContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	max-width: 1200px;
`

const GET_CATEGORY_SEARCH = gql`
	{
		getAllParentCategories {
			name
			nameForUrl
			bannerUrl
			parentId
			id
			children {
				name
				nameForUrl
				bannerUrl
				parentId
				id
			}
		}
	}
`

export default function CategoriesPage(props) {
	const [categories, setCategories] = useState(null);

	const { loading, error, data } = useQuery(GET_CATEGORY_SEARCH, {
		onCompleted: data => { 
			var cats = data.getAllParentCategories
			console.log("Loaded categories")
			setCategories(cats)	
		}
	});

	if(loading) return <DivContainer><Loader /></DivContainer>

	return(
		<DivContainer>
			<CategoryRouter categories={categories} {...props} />
		</DivContainer>
	)
}