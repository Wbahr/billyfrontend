import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import TransactionalServices from './aboutSubPages/transactionalServicesPage'

export default function AboutPage() {
    const [pageComponent, setPageComponent] = useState()
    const { page } = useParams()

    useEffect(() => {
        if (page === 'transactional-services') {
            setPageComponent(<TransactionalServices />)
        }
    }, [page])

    return (
        <>
            {pageComponent}
        </>
    )
}
