import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import SectionHeader from '../../_common/sectionHeader.js'
import FeaturedManufacturerLink from './featuredManufacturerLink'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 1300px;
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
			let id = setInterval(tick, delay)
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
		let random1 = getRandomInt(18)
		setR1(random1)
	}, 1200)

	useInterval(() => {
		let random2 = getRandomInt(18)
		setR2(random2)
	}, 1700)

	return (
    <>
      <SectionHeader
      	text='Featured Manufacturers'
      />
      <Wrapper>
      	<FeaturedManufacturerLink brandPagePath="/Brands/featured/rexroth" logo="https://rodavigo.net/datos/logos-marcas-png/rexroth-neumatica.png" pop={17 === r1 || 17 === r2}/>
      	<FeaturedManufacturerLink brandPagePath="/Brands/featured/smc" logo="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured2.png" pop={0 === r1 || 0 === r2}/>
      	<FeaturedManufacturerLink brandPagePath="/Brands/featured/eaton" logo="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured3.png" pop={1 === r1 || 1 === r2}/>
      	<FeaturedManufacturerLink brandPagePath="/Brands/featured/hydac" logo="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured4.png" pop={2 === r1 || 2 === r2}/>
      	<FeaturedManufacturerLink brandPagePath="/Brands/featured/omron" logo="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured5.png" pop={3 === r1 || 3 === r2}/>
      	<FeaturedManufacturerLink brandPagePath="/Brands/featured/abb" logo="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured6.png" pop={4 === r1 || 4 === r2}/>
      	<FeaturedManufacturerLink brandPagePath="/Brands/featured/butech" logo="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured7.png" pop={5 === r1 || 5 === r2}/>
      	<FeaturedManufacturerLink brandPagePath="/Brands/featured/clippard" logo="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured8.png" pop={6 === r1 || 6 === r2}/>
      	<FeaturedManufacturerLink brandPagePath="/Brands/featured/haskel" logo="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured9.png" pop={7 === r1 || 7 === r2}/>
      	<FeaturedManufacturerLink brandPagePath="/Brands/featured/lincoln" logo="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured10.png" pop={8 === r1 || 8 === r2}/>
      	<FeaturedManufacturerLink brandPagePath="/Brands/featured/oriental-motor" logo="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured11.png" pop={9 === r1 || 9 === r2}/>
      	<FeaturedManufacturerLink brandPagePath="/Brands/featured/paccar" logo="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured12.png" pop={10 === r1 || 10 === r2}/>
      	<FeaturedManufacturerLink brandPagePath="/Brands/featured/parker" logo="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured13.png" pop={11 === r1 || 11 === r2}/>
      	<FeaturedManufacturerLink brandPagePath="/Brands/featured/rittal" logo="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured14.png" pop={12 === r1 || 12 === r2}/>
      	<FeaturedManufacturerLink brandPagePath="/Brands/featured/ross" logo="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured15.png" pop={13 === r1 || 13 === r2}/>
      	<FeaturedManufacturerLink brandPagePath="/Brands/featured/schmersal" logo="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured16.png" pop={14 === r1 || 14 === r2}/>
      	<FeaturedManufacturerLink brandPagePath="/Brands/featured/phoenix-contact" logo="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured17.png" pop={15 === r1 || 15 === r2}/>
      	<FeaturedManufacturerLink brandPagePath="/Brands/featured/aventics" logo="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured18.png" pop={16 === r1 || 16 === r2}/>
      </Wrapper>
    </>
    
	)
}