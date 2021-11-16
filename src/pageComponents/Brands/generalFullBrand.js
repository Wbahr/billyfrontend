import React from 'react'
import { useParams } from 'react-router-dom'
import * as brandsPages from './featuredBrandsPages'
import FourOFourPage from '../Error/fourOFourPage'

export default function GeneralFullBrand(props) {
    const { page } = useParams()
    
    const filename = page.replace(/-/g, '')
    
    const Component = brandsPages[filename]
    
    return Component ? <Component {...props}/> : <FourOFourPage/>
}
