import Category from './category'
import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ROOT_CATEGORIES_PAGE } from '../../../setup/providerGQL'
import Loader from '../../_common/loader'

export default () => {
    const [categories, setCategories] = useState(null)

    const { loading } = useQuery(GET_ROOT_CATEGORIES_PAGE, {
        onCompleted: data => setCategories(data.getAllRootCategories)
    })

    return loading || !categories ? (
        <Loader />
    ) : (
        <>
            {(categories || []).map(({ urlSlug, name, imageUrl }) => (
                <Category key={urlSlug} text={name} linkTo={`/categories/${urlSlug}`} Image={<img src={imageUrl} alt={name} title={name}/>}/>
            ))}
        </>
    )
}
