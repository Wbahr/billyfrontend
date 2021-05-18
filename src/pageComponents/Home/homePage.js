import React from 'react'
import styled from 'styled-components'
import FeaturedManufacturers from './uiComponents/featuredManufacturers'
import Banner from './uiComponents/banner'
import LineCards from './uiComponents/lineCard'
import TechnicallySpeaking from './uiComponents/technicallySpeaking'
import NewAndNoteworthy from './uiComponents/newAndNoteworthy'
import SectionHeader from '../_common/sectionHeader'
import { CategoryContainer } from '../ProductCategories/categoriesPage'
import RootCategories from '../ProductCategories/uiComponents/RootCategories'
import { Helmet } from 'react-helmet'

const ContentScreenContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	margin: 0 auto;
	justify-content: space-between;
	flex-grow: 99;
`

export default function HomePage() {
    return (
        <ContentScreenContainer>
            <Helmet>
                <title>Airline Hydraulics | Products and Solutions to Power Your Ideas</title>
            </Helmet>

            <Banner />
            <NewAndNoteworthy />
            <div>
                <SectionHeader text='Shop by Categories' />

                <CategoryContainer>
                    <RootCategories />
                </CategoryContainer>
            </div>

            <TechnicallySpeaking />
            <FeaturedManufacturers />
            <LineCards />
        </ContentScreenContainer>
    )
}