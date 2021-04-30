import React from 'react'
import styled from 'styled-components'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import FeaturedBrandLogo from '../uiComponents/FeaturedBrandLogo'
import H1 from '../uiComponents/H1'
import BrandDetail from '../uiComponents/BrandDetail'
import ShopProductBtn from '../uiComponents/ShopProductBtn'
import SectionHeader from '../uiComponents/SectionHeader'
import ProductItems from '../uiComponents/ProductItems'
import RelatedLink from '../uiComponents/RelatedLink'
import { Helmet } from 'react-helmet'

const Container = styled.div`
	display: flex;
	max-width: 1200px;
	width: 100%;
	flex-wrap: wrap;
	margin: 0 auto;
`
const RelatedLinkDiv = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	height: 220px;
	margin: 20px 0;
`

export function butech() {
    const description = 'BuTech a leading brand of high pressure valves, fittings and tubing. The BuTech line of ' +
        'products was established in 1973, offering high pressure piping components and the most extensive and versatile' +
        ' product line available for pressures up to 150,000 PSI. BuTech products are used in oil, natural gas, chemical' +
        ' and petrochemical industries, as well as waterjet/waterblast, aerospace, marine, government and niche ' +
        'industrial markets.'

    return (
        <>
            <Helmet>
                <title>Butech Authorized Distributor | Airline Hydraulics</title>
                <meta name="description" content="Shop online for BuTech products from Airline Hydraulics, a leading distributor. Find products and information on ball valves, needle valves, check valves, and high pressure fittings."/>
            </Helmet>
            
            <FeaturedBrandLogo src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/BuTech_Logo.png" />
            <Container>
                <H1 text="BuTech"/>
                <BrandDetail text={description}/>
                <ShopProductBtn
                    searchTerm="BuTech"
                    text="Shop Products"
                />
                <SectionHeader
                    text="Products"
                />
                <ProductItems
                    searchTerm="BuTech"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Butech/Ball%20Valves.png"
                    text="Ball valves are available in 2-way, 3-way, 4-way, and 5-way designs with pressures to 20,000 PSI (1,380 bar) at 72°F (22°C) and a wide range of connections including male and female NPT, low-pressure compression fittings, medium- and high-pressure tube ends, medium- and high-pressure female, JIC 37° flare, SAE O-ring boss, socket-weld, butt-weld, and metric connections. They are available with special seal materials or manufactured from any machinable material for extreme applications. They also can be fitted with pneumatic or electric actuators for remote control."
                    title="Ball Valves"
                />
                <ProductItems
                    searchTerm="BuTech"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Butech/check%20valves.png"
                    title="Check Valves"
                    text="BuTech check valves are designed for liquid and gas flow control in petroleum, chemical, power generating and general industrial applications. Available in a variety of body styles, the valves are designed for manual operation in temperatures ranging from 0° to 600°F (-18° to 315°C). Rugged construction provides assurance of fail-safe operation at pressures up to 15,000 PSI (1,030 bar). Note: BuTech Pressure Systems does not recommend compression sleeve connections below 0°F (-18°C) or above 650°F (343°C)."
                    reverse
                />
                <ProductItems
                    searchTerm="BuTech"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Butech/high%20pressure%20fitting.png"
                    title="High Pressure Fittings"
                    text="BuTech offers a complete line of elbows, tees, crosses, bulkhead fittings and nipples, as well as adapters and couplings to connect different sizes and pressure ratings of tubing and pipe. Standard construction is 316 cold – worked stainless steel."
                />
                <ProductItems
                    searchTerm="BuTech"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Butech/needle%20valves.png"
                    title="Needle Valves"
                    text="Low, Medium and High Pressure with pressure ratings to 150,000 psi (1030 bar), are designed for liquid and gas flow control in petroleum, chemical, power generating and general industrial applications. Available in a variety of body styles, the valves are designed for operation at temperatures ranging from -100° to +600°F (-73° to +315°C). Optional packings and/or extended stuffing boxes increase the range to -423° to +1200°F (-253° to +648°C)."
                    reverse
                />
                <ProductItems
                    searchTerm="BuTech"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Butech/Butech%20accessories.png"
                    title="BuTech Accessories"
                    text=" BuTech Pressure Systems offers a complete line of accessories for use with its valve and pipe equipment."
                />

                <SectionHeader
                    text="Related Links"
                />
                <RelatedLinkDiv>
                    <RelatedLink
                        href="https://www.haskel.com/en-us/products/butech-high-pressure-valvesl"
                        text="BuTech's Website"
                        icon="globe-americas"
                    />
                    <RelatedLink
                        searchTerm="BuTech"
                        text="Shop BuTech Products"
                        icon="shopping-cart"
                    />
                    <RelatedLink
                        href="https://www.youtube.com/playlist?list=PLZbHgsYLXoywK3588_U-PM_nMe-knQhTj"
                        text="Videos"
                        icon={faYoutube}
                    />
                    <RelatedLink
                        href="/pages/resources/catalog-request"
                        text="BuTech Catalogs"
                        icon="address-book"
                    />
                </RelatedLinkDiv>
            </Container>
        </>
    )
}