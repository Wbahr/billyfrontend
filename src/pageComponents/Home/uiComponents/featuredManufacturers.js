import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import SectionHeader from '../../_common/sectionHeader.js'
import FeaturedManufacturerLink from './featuredManufacturerLink'

const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin: 0 auto 50px;
`

function useInterval(callback, delay) {
	const savedCallback = useRef()

	// Remember the latest function.
	useEffect(() => {
		savedCallback.current = callback
	}, [callback])

	// Set up the interval.
	useEffect(() => {
		function tick() {
			savedCallback.current()
		}
		if (delay !== null) {
			const id = setInterval(tick, delay)
			return () => clearInterval(id)
		}
	}, [delay])
}

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max))
}

export default function FeaturedManufacturers(){
	const [r1, setR1] = useState(11)
	const [r2, setR2] = useState(1)

	useInterval(() => {
		const random1 = getRandomInt(18)
		setR1(random1)
	}, 1200)

	useInterval(() => {
		const random2 = getRandomInt(18)
		setR2(random2)
	}, 1700)

	return (
		<>
			<SectionHeader
				text='Featured Manufacturers'
			/>
			<Wrapper>
				<FeaturedManufacturerLink brandPagePath="/Brands/featured/rexroth" logo="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/Rexroth-Logo_RGB.png" pop={17 === r1 || 17 === r2}/>
				<FeaturedManufacturerLink brandPagePath="/Brands/featured/smc" logo="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/SMC%20Elite%20Dist%20web.png" pop={0 === r1 || 0 === r2}/>
				<FeaturedManufacturerLink brandPagePath="/Brands/featured/eaton" logo="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/Eaton_logo.png" pop={1 === r1 || 1 === r2}/>
				<FeaturedManufacturerLink brandPagePath="/Brands/featured/hydac" logo="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/hydac.png" pop={2 === r1 || 2 === r2}/>
				<FeaturedManufacturerLink brandPagePath="/Brands/featured/omron" logo="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/OMRON_logo.png" pop={3 === r1 || 3 === r2}/>
				<FeaturedManufacturerLink brandPagePath="/Brands/featured/abb" logo="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/ABB_logo.png" pop={4 === r1 || 4 === r2}/>
				<FeaturedManufacturerLink brandPagePath="/Brands/featured/butech" logo="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/BuTech_Logo.png" pop={5 === r1 || 5 === r2}/>
				<FeaturedManufacturerLink brandPagePath="/Brands/featured/clippard" logo="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/Clippard.png" pop={6 === r1 || 6 === r2}/>
				<FeaturedManufacturerLink brandPagePath="/Brands/featured/haskel" logo="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/Haskel.png" pop={7 === r1 || 7 === r2}/>
				<FeaturedManufacturerLink brandPagePath="/Brands/featured/lincoln" logo="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/Lincoln_SKF_condensed%20RGB%20nobkgrd.jpg" pop={8 === r1 || 8 === r2}/>
				<FeaturedManufacturerLink brandPagePath="/Brands/featured/oriental-motor" logo="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/oriental-motor.png" pop={9 === r1 || 9 === r2}/>
				<FeaturedManufacturerLink brandPagePath="/Brands/featured/paccar" logo="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/paccar-logo.png" pop={10 === r1 || 10 === r2}/>
				<FeaturedManufacturerLink brandPagePath="/Brands/featured/parker" logo="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/parker_logo.jpg" pop={11 === r1 || 11 === r2}/>
				<FeaturedManufacturerLink brandPagePath="/Brands/featured/rittal" logo="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/RITTAL.png" pop={12 === r1 || 12 === r2}/>
				<FeaturedManufacturerLink brandPagePath="/Brands/featured/ross" logo="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/ROSS_LOGO.png" pop={13 === r1 || 13 === r2}/>
				<FeaturedManufacturerLink brandPagePath="/Brands/featured/schmersal" logo="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/schmersal.png" pop={14 === r1 || 14 === r2}/>
				<FeaturedManufacturerLink brandPagePath="/Brands/featured/phoenix-contact" logo="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/phoenix-contact-logo.png" pop={15 === r1 || 15 === r2}/>
				<FeaturedManufacturerLink brandPagePath="/Brands/featured/aventics" logo="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/Aventics.png" pop={16 === r1 || 16 === r2}/>
			</Wrapper>
		</>
		
	)
}