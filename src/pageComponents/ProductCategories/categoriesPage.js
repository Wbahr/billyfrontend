import React from 'react'
import styled from 'styled-components'
import { Route, Switch } from 'react-router'
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
    return (
        <CategoryContainer>
            <Helmet>
                <title>Airline Hydraulics | Categories</title>
            </Helmet>
            <Switch>
                <Route path="/categories/:categoryUrlSlug" component={CategorySearch}/>
                <Route path="/categories" component={RootCategories}/>
            </Switch>
        </CategoryContainer>
    )
}