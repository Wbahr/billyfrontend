import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { StyledText0 } from '../../styles/fonts'
import MachineSafeguarding from './plantServicesPages/machineSafeguarding'
import FluidCleanliness from './plantServicesPages/fluidCleanliness'
import ArcFlashSafety from './plantServicesPages/arcFlashSafety'

export default function PlantServicesPage({ history }) {
    const [pageComponent, setPageComponent] = useState()
    let { page } = useParams()

    const plantServicesPages = [
        {
            'label': 'Machine Safeguarding',
            'page': 'machine-safeguarding'
        },
        {
            'label': 'Fluid Cleanliness & Maintenance/Preventive Maintenance',
            'page': 'fluid-cleanliness-and-maintenance'
        },
        {
            'label': 'Arc Flash Safety',
            'page': 'arc-flash-safety'
        }  
    ]
    useEffect(() => {
        if (page === 'machine-safeguarding') {
            setPageComponent(<MachineSafeguarding />)
        }
        else if (page === 'fluid-cleanliness-and-maintenance') {
            setPageComponent(<FluidCleanliness />)
        }
        else if (page === 'Arc Flash Safety') {
            setPageComponent(<ArcFlashSafety />)
        }
        
    }, [page])

    return (
        <>
            {pageComponent}
        </>
    )
}
PlantServicesPage.propTypes = {
    history: PropTypes.object.isRequired
}