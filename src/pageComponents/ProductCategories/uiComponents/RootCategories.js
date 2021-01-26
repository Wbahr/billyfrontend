import Category from './category'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import { GET_ROOT_CATEGORIES_PAGE } from '../../../setup/providerGQL'
import Loader from '../../_common/loader'

const DivRow = styled.div`
	display: flex;
	width: 100%;
`

export default () => {
    const [categories, setCategories] = useState(null)
	
    const { loading } = useQuery(GET_ROOT_CATEGORIES_PAGE, {
        onCompleted: data => setCategories(data.getAllRootCategories)
    })
	
    return loading || !categories ? (
        <Loader />
    ) : (
        <>
            <DivRow><p>All Categories</p></DivRow>
            {(categories || []).map(({ urlSlug, name, imageUrl }) => (
                <Category key={urlSlug} text={name} linkTo={`/categories/${urlSlug}`} Image={<img src={imageUrl} alt={name} title={name}/>}/>
            ))}
        </>
    )
}