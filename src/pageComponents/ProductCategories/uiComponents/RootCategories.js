import Category from './category'
import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ROOT_CATEGORIES_PAGE } from '../../../setup/providerGQL'
import Loader from '../../_common/loader'

const DivRow = styled.div`
	display: flex;
    width: 100%;
    justify-content: center;
`
const AllCategoriesTitle = styled.p`
    margin-top: 20px;
    font-size: 1.5rem;
    text-transform: uppercase;
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
            <DivRow><AllCategoriesTitle>All Categories</AllCategoriesTitle></DivRow>
            {(categories || []).map(({ urlSlug, name, imageUrl }) => (
                <Category key={urlSlug} text={name} linkTo={`/categories/${urlSlug}`} Image={<img src={imageUrl} alt={name} title={name}/>}/>
            ))}
        </>
    )
}
