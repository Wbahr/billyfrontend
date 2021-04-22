import React, { useState } from 'react'
import styled from 'styled-components'
import SectionHeader from '../../_common/sectionHeader.js'
import FeaturedManufacturerLink from './featuredManufacturerLink'
import { useInterval } from '../../_common/helpers/generalHelperFunctions'

const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin: 0 auto 50px;
`

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
                {manufacturers.map((manufacturer, idx) => (
                    <FeaturedManufacturerLink
                        {...manufacturer}
                        key={idx}
                        pop={[r1, r2].includes(idx)}
                    />
                ))}
            </Wrapper>
        </>
		
    )
}

const manufacturers = [
    {
        brandPagePath: '/Brands/featured/rexroth',
        logo: 'https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/Rexroth-Logo_RGB.png'
    },
    {
        brandPagePath: '/Brands/featured/smc',
        logo: 'https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/SMC%20Elite%20Dist%20web.png'
    },
    {
        brandPagePath: '/Brands/featured/eaton',
        logo: 'https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/Eaton_logo.png'
    },
    {
        brandPagePath: '/Brands/featured/hydac',
        logo: 'https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/hydac.png'
    },
    {
        brandPagePath: '/Brands/featured/omron',
        logo: 'https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/OMRON_logo.png'
    },
    {
        brandPagePath: '/Brands/featured/abb',
        logo: 'https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/ABB_logo.png'
    },
    {
        brandPagePath: '/Brands/featured/butech',
        logo: 'https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/BuTech_Logo.png'
    },
    {
        brandPagePath: '/Brands/featured/clippard',
        logo: 'https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/Clippard.png'
    },
    {
        brandPagePath: '/Brands/featured/haskel',
        logo: 'https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/Haskel.png'
    },
    {
        brandPagePath: '/Brands/featured/lincoln',
        logo: 'https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/Lincoln_SKF_condensed%20RGB%20nobkgrd.jpg'
    },
    {
        brandPagePath: '/Brands/featured/oriental-motor',
        logo: 'https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/oriental-motor.png'
    },
    {
        brandPagePath: '/Brands/featured/paccar',
        logo: 'https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/paccar-logo.png'
    },
    {
        brandPagePath: '/Brands/featured/parker',
        logo: 'https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/parker_logo.jpg'
    },
    {
        brandPagePath: '/Brands/featured/rittal',
        logo: 'https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/RITTAL.png'
    },
    {
        brandPagePath: '/Brands/featured/ross',
        logo: 'https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/ROSS_LOGO.png'
    },
    {
        brandPagePath: '/Brands/featured/schmersal',
        logo: 'https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/schmersal.png'
    },
    {
        brandPagePath: '/Brands/featured/phoenix-contact',
        logo: 'https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/phoenix-contact-logo.png'
    },
    {
        brandPagePath: '/Brands/featured/aventics',
        logo: 'https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/Aventics.png'
    }
]