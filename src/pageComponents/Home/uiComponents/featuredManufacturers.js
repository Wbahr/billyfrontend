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

const key = 'BRANDS'

export default function FeaturedManufacturers({ homepage }){
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

    const items = homepage.filter(h => h.key === key)

    const manufacturers = items.map((i, idx) => {
        return (
            <FeaturedManufacturerLink
                brandPagePath={i.href}
                logo={i.imageUrl}
                key={idx}
                pop={[r1, r2].includes(idx)}
            />
        )
    })

    return (
        <>
            <SectionHeader
                text={items[0].sectionName}
            />
            <Wrapper>
                {manufacturers}
            </Wrapper>
        </>
		
    )
}