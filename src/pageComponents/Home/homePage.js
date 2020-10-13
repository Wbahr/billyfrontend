import React, { useState } from 'react'
import styled from 'styled-components'
import FeaturedManufacturers from './uiComponents/featuredManufacturers'
import ShopOurProducts from './uiComponents/shopOurProducts'
import Banner from './uiComponents/banner'
import LineCards from './uiComponents/lineCard'
import TechnicallySpeaking from './uiComponents/technicallySpeaking'
import { useQuery } from '@apollo/client'
import { GET_CATEGORY_SEARCH } from 'config/providerGQL'

const ContentScreenContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	max-width: 1300px;
	margin: 28px auto;
	justify-content: space-between;
	flex-grow: 99;
`

export default function HomePage(props) {
    const [categories, setCategories] = useState(null);

	const { loading, error, data } = useQuery(GET_CATEGORY_SEARCH, {
		onCompleted: data => { 
			setCategories(data.getAllParentCategories);
		}
	});
    
    return (
        <>
            <ContentScreenContainer>
                <Banner />
                <ShopOurProducts categories={categories} match={{ path:'/categories', url: '/categories' }}/>
                <TechnicallySpeaking />
                <FeaturedManufacturers />
                <LineCards />
                
            </ContentScreenContainer>
        </>
    );
}