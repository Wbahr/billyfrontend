import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { StyledText0 } from '../../styles/fonts'
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

export default function ShopPage({ history }) {
	const [pageComponent, setPageComponent] = useState()
	let { page } = useParams()

	const shopPages = [
		{
			'label': 'All Categories',
			'page': 'all-categories'
		},
		{
			'label': 'Aluminum Structural Framing',
			'page': 'aluminum-structural-framing'
		},
		{
			'label': 'Automation & Control',
			'page': 'automation-and-control'
		},
		{
			'label': 'Electrical Components',
			'page': 'electrical-components'
		},
		{
			'label': 'Hose & Connectors',
			'page': 'hose-and-connectors'
		},
		{
			'label': 'Hydraulic Components',
			'page': 'hydraulic-components'
		},
		{
			'label': 'Liquid & Gas Pressure',
			'page': 'liquid-and-gas-pressure'
		},
		{
			'label': 'Lubrication',
			'page': 'lubrication'
		},
		{
			'label': 'Machine Safety',
			'page': 'machine-safety'
		},
		{
			'label': 'Pneumatic Components',
			'page': 'pneumatic-components'
		},
		{
			'label': 'Process Control & Components',
			'page': 'process-control-and-components'
		},
		{
			'label': 'Winches & Gear Drives',
			'page': 'winches-and-gear-drives'
		},
		{
			'label': 'Product Spotlights',
			'page': 'product-spotlights'
		}
        
	]
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
ShopPage.propTypes = {
	history: PropTypes.object.isRequired
}