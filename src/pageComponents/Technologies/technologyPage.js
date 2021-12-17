import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import FoodBeverage from './technologyTypePages/foodBeveragePage'

export default function TechnologyPage() {
    const [pageComponent, setPageComponent] = useState()
    const { page } = useParams()
  
    useEffect(() => {
        if (page === 'food-beverage') {
            setPageComponent(<FoodBeverage />)
        }
    }, [page])

    return (
        <>
            {pageComponent}
        </>
    )
}