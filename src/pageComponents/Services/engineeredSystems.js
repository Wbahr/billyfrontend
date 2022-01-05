import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import HydraulicEngineered from './engineeredSystemsPages/hydraulicEngineered'
import LubricationSystems from './engineeredSystemsPages/lubricationSystems'
import AutomationEngineered from './engineeredSystemsPages/automationEngineered'
import LiquidAndGasPressure from './engineeredSystemsPages/liquidAndGasPressure'
import StructuralFraming from './engineeredSystemsPages/structuralFraming'
import SubAssemblies from './engineeredSystemsPages/subAssemblies'
import HoseAssemblies from './engineeredSystemsPages/hoseAssemblies'

export default function EngineeredSystemsPage() {
    const [pageComponent, setPageComponent] = useState()
    const { page } = useParams()

    // const engineeredSystemsPages = [
    //   {
    //     'label': 'Hydraulic Engineered Systems',
    //     'page': 'hydraulic-engineered-systems'
    //   },
    //   {
    //     'label': 'Lubrication Systemss',
    //     'page': 'lubrication-systems'
    //   },
    //   {
    //     'label': 'Automation Engineered Systems',
    //     'page': 'automation-engineered-systems'
    //   },
    //   {
    //     'label': 'Liquid & Gas Pressure Systems',
    //     'page': 'liquid-and-gas-pressure-systems'
    //   },
    //   {
    //     'label': 'Structural Framing Systems',
    //     'page': 'structural-framing-systems'
    //   },
    //   {
    //     'label': 'Sub-Assemblies',
    //     'page': 'sub-assemblies'
    //   },
    //   {
    //     'label': 'Hose Assemblies',
    //     'page': 'hose-assemblies'
    //   }
    // ]
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
        else if (page === 'structural-framing-systems') {
            setPageComponent(<StructuralFraming />)
        }
        else if (page === 'sub-assemblies') {
            setPageComponent(<SubAssemblies />)
        }
        else if (page === 'hose-assemblies') {
            setPageComponent(<HoseAssemblies />)
        }
    }, [page])

    return (
        <>
            {pageComponent}
        </>
    )
}