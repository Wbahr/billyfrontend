import React, { useContext } from 'react'
import styled from 'styled-components'
import FeaturedManufacturers from './uiComponents/featuredManufacturers'
import AnnounceBanner from '../_common/AnnounceBanner'
import Banner from './uiComponents/banner'
import LineCards from './uiComponents/lineCard'
import TechnicallySpeaking from './uiComponents/technicallySpeaking'
import NewAndNoteworthy from './uiComponents/newAndNoteworthy'
import NewsAndEvents from './uiComponents/newsAndEvents'
import SectionHeader from '../_common/sectionHeader'
import { CategoryContainer } from '../ProductCategories/categoriesPage'
import RootCategories from '../ProductCategories/uiComponents/RootCategories'
import { Helmet } from 'react-helmet'
import Context from '../../setup/context'

const ContentScreenContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	margin: 0 auto;
	justify-content: space-between;
	flex-grow: 99;
`

export default function HomePage() {
    const {
        homepage,
        alert
    } = useContext(Context)

    return (
        <>
            {homepage.length > 0 && (
                <ContentScreenContainer>
                    <Helmet>
                        <title>Airline Hydraulics | Products and Solutions to Power Your Ideas</title>
                    </Helmet>

                    {alert && <AnnounceBanner {...{ alert }} />}
                    <Banner {...{ homepage }} />
                    <NewAndNoteworthy {...{ homepage }} />
                    <div>
                        <SectionHeader text='Shop by Categories' />

                        <CategoryContainer>
                            <RootCategories />
                        </CategoryContainer>
                    </div>

                    <TechnicallySpeaking {...{ homepage }} />
                    <FeaturedManufacturers {...{ homepage }} />
                    <NewsAndEvents {...{ homepage }} />
                    <LineCards {...{ homepage }} />
                </ContentScreenContainer>
            )}
        </>
    )
}