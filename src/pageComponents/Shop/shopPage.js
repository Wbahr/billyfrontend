import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AllCategories from './shopSubPages/allCategories'
import AluminumStructuralFraming from './shopSubPages/framing'
import AutomationAndControl from './shopSubPages/automationAndControl'
import ElectricalComponents from './shopSubPages/electricalComponents'
import HoseAndConnectors from './shopSubPages/hoseAndConnectors'
import HydraulicComponents from './shopSubPages/hydraulicComponents'
import LiquidAndGasPressure from './shopSubPages/liquidAndGasPressure'
import Lubrication from './shopSubPages/lubrication'
import MachineSafety from './shopSubPages/machineSafety'
import PneumaticComponents from './shopSubPages/pneumaticComponents'
import ProcessControl from './shopSubPages/processControl'
import Winches from './shopSubPages/winchesAndGearDrives'
import ProductSpotlights from './shopSubPages/productSpotlights'

export default function ShopPage() {
    const [pageComponent, setPageComponent] = useState()
    const { page } = useParams()

    useEffect(() => {
        if (page === 'all-categories') {
            setPageComponent(<AllCategories />)
        }
        else if (page === 'aluminum-structural-framing') {
            setPageComponent(<AluminumStructuralFraming />)
        }
        else if (page === 'automation-and-control') {
            setPageComponent(<AutomationAndControl />)
        }
        else if (page === 'electrical-components') {
            setPageComponent(<ElectricalComponents />)
        }
        else if (page === 'hose-and-connectors') {
            setPageComponent(<HoseAndConnectors />)
        }
        else if (page === 'hydraulic-components') {
            setPageComponent(<HydraulicComponents />)
        }
        else if (page === 'liquid-and-gas-pressure') {
            setPageComponent(<LiquidAndGasPressure />)
        }
        else if (page === 'lubrication') {
            setPageComponent(<Lubrication />)
        }
        else if (page === 'machine-safety') {
            setPageComponent(<MachineSafety />)
        }
        else if (page === 'pneumatic-components') {
            setPageComponent(<PneumaticComponents />)
        }
        else if (page === 'process-control-and-components') {
            setPageComponent(<ProcessControl />)
        }
        else if (page === 'winches-and-gear-drives') {
            setPageComponent(<Winches />)
        }
        else if (page === 'product-spotlights') {
            setPageComponent(<ProductSpotlights />)
        }
        
    }, [page])

    return (
        <>
            {pageComponent}
        </>
    )
}