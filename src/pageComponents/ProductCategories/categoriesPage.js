import React from 'react'
import styled from 'styled-components'
import { Route, Switch } from 'react-router'
import CategorySearch from './uiComponents/CategorySearch'
import RootCategories from './uiComponents/RootCategories'

export const CategoryContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`

export default function CategoriesPage() {
    return (
        <CategoryContainer>
            <Switch>
                <Route path="/categories/:categoryUrlSlug" component={CategorySearch}/>
                <Route path="/categories" component={RootCategories}/>
            </Switch>
        </CategoryContainer>
    )
}