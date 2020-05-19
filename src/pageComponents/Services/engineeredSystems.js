import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import HydraulicEngineered from './engineeredSystemsPages/hydraulicEngineered'
import LubricationSystems from './engineeredSystemsPages/lubricationSystems'
import AutomationEngineered from './engineeredSystemsPages/automationEngineered'
import LiquidAndGasPressure from './engineeredSystemsPages/liquidAndGasPressure'

export default function EngineeredSystemsPage({ history }) {
    const [pageComponent, setPageComponent] = useState()
    let { page } = useParams()

    const engineeredSystemsPages = [   
        {
            'label': 'Hydraulic Engineered Systems',
            'page': 'hydraulic-engineered-systems'
        },
        {
            'label': 'Lubrication Systemss',
            'page': 'lubrication-systems'
        },
        {
            'label': 'Automation Engineered Systems',
            'page': 'automation-engineered-systems'
        },
        {
            'label': 'Liquid & Gas Pressure Systems',
            'page': 'liquid-and-gas-pressure-systems'
        }
    ]
    useEffect(() => {
        if (page === 'hydraulic-engineered-systems') {
            setPageComponent(<HydraulicEngineered />)
        }
        else if (page === 'lubrication-systems') {
            setPageComponent(<LubricationSystems />)
        }
        else if (page === 'automation-engineered-systems') {
            setPageComponent(<AutomationEngineered />)
        }
        else if (page === 'liquid-and-gas-pressure-systems') {
            setPageComponent(<LiquidAndGasPressure />)
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