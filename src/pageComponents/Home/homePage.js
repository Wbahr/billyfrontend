import React, { useState } from 'react'
import styled from 'styled-components'
import FeaturedManufacturers from './uiComponents/featuredManufacturers'
import ShopOurProducts from './uiComponents/shopOurProducts'
import Banner from './uiComponents/banner'
import LineCards from './uiComponents/lineCard'
import TechnicallySpeaking from './uiComponents/technicallySpeaking'
import { useQuery } from '@apollo/client'
import { GET_ROOT_CATEGORIES_HOMEPAGE } from 'config/providerGQL'
import SectionHeader from "../_common/sectionHeader";
import {CategoryContainer} from "../ProductCategories/categoriesPage";
import CategoryList from "../ProductCategories/uiComponents/categoryList";

const ContentScreenContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	margin: 28px auto;
	justify-content: space-between;
	flex-grow: 99;
`

export default function HomePage(props) {
	const [categories, setCategories] = useState(null);

	useQuery(GET_ROOT_CATEGORIES_HOMEPAGE, {
		onCompleted: data => { 
			setCategories(data.getAllRootCategories);
		}
	});
    
    return (
			<ContentScreenContainer>
				<Banner />
				
				<div>
					<SectionHeader text='Shop by Categories' />
				
					<CategoryContainer>
						<CategoryList {...{categories, match: {path:'/categories', url: '/categories'}}} />
					</CategoryContainer>
				</div>
				
				<TechnicallySpeaking />
				<FeaturedManufacturers />
				<LineCards />
			</ContentScreenContainer>
    );
}