import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import HydraulicEngineered from './engineeredSystemsPages/hydraulicEngineered'

export default function EngineeredSystemsPage({ history }) {
    const [pageComponent, setPageComponent] = useState()
    let { page } = useParams()

    const engineeredSystemsPages = [   
        {
            'label': 'Hydraulic Engineered Systems',
            'page': 'hydraulic-engineered-systems'
        }
    ]
    useEffect(() => {
        if (page === 'hydraulic-engineered-systems') {
            setPageComponent(<HydraulicEngineered/>)
        }
        
    }, [page])

    return (
        <>
            {pageComponent}
        </>
    )
}
EngineeredSystemsPage.propTypes = {
    history: PropTypes.object.isRequired
}