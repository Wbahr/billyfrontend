import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router'
import CategorySearch from './uiComponents/CategorySearch'
import RootCategories from './uiComponents/RootCategories'
import Helmet from 'react-helmet'

export const CategoryContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 50px;
`

export default function CategoriesPage() {
    console.log("Exec cats page")
    const params = useParams()
    console.log(params)
    return (
        <CategoryContainer>
            <Helmet>
                <title>Airline Hydraulics | Categories</title>
            </Helmet>
            { params && <CategorySearch cat={params.categoryUrlSlug} />}          
            { !params && <RootCategories />}
        </CategoryContainer>
    )
}