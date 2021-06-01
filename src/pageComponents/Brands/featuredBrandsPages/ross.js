import React from 'react'
import styled from 'styled-components'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import FeaturedBrandLogo from '../uiComponents/FeaturedBrandLogo'
import H1 from '../uiComponents/H1'
import BrandDetail from '../uiComponents/BrandDetail'
import ShopProductBtn from '../uiComponents/ShopProductBtn'
import SectionHeader from '../uiComponents/SectionHeader'
import ProductItems from '../uiComponents/ProductItems'
import Articles from '../uiComponents/Articles'
import Videos from '../uiComponents/Videos'
import RelatedLink from '../uiComponents/RelatedLink'
import { Helmet } from 'react-helmet'

const Container = styled.div`
	display: flex;
	max-width: 1200px;
	width: 100%;
	flex-wrap: wrap;
	margin: 0 auto;
    padding: 0 5px;
	`
const ArticlesDiv = styled.div`
	display: flex;
	justify-content: space-around;
	width: 100%;
	flex-wrap: wrap;
`
const VideoDiv = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	width: 100%;
`
const RelatedLinkDiv = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	margin: 20px 0;
`
const Span = styled.span`
	font-weight: bold;
`

export function ross() {
    const description = 'Ross controls is a global manufacturer of pneumatic valves, control systems and safety ' +
        'products. Their products are used anywhere compressed air is used to perform a work process.'

    return (
        <>
            <Helmet>
                <title>Ross Controls Authorized Distributor | Airline Hydraulics</title>
                <meta name="description" content="Shop online for Ross Controls products from Airline Hydraulics, a leading distributor. Find products and information on line-mounted valves, base-mounted valves, safety related products, check valves, and flow control valves."/>
            </Helmet>
            <FeaturedBrandLogo src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/ROSS_LOGO.png" />
            <Container>
                <H1 text="Ross controls"/>
                <BrandDetail
                    text={description}
                />
                <ShopProductBtn
                    searchTerm="Ross"
                    text="Shop Products"
                />
                <SectionHeader
                    text="Products"
                />
                <ProductItems
                    searchTerm="Ross"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Ross/line-mounted.png"
                    title="Line-Mounted Valves"
                    text="Line-mounted valves can be placed close to the action. The rugged construction of the line-mounted valve allows it to be effective in harsh environments. Their durability makes them ideal for industries that tend to be dirtier than most. Line-mounted valves feature poppet internals and are simple to maintain. ROSS line-mounted valves are frequently used in the aluminum, glass, steel, and forest products industries."
                />
                <ProductItems
                    searchTerm="Ross"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Ross/base-mounted.png"
                    title="Base-Mounted Valves"
                    text="Line-mounted valves can be placed close to the action. The rugged construction of the line-mounted valve allows it to be effective in harsh environments. Their durability makes them ideal for industries that tend to be dirtier than most. Line-mounted valves feature poppet internals and are simple to maintain. ROSS line-mounted valves are frequently used in the aluminum, glass, steel, and forest products industries."
                    reverse
                />
                <ProductItems
                    searchTerm="Ross"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Ross/safety-related.png"
                    title="Safety Related Products"
                    text={(
                        <div>
                            <p><Span>L-O-X Valves</Span></p>
                            <p>OSHA has established federal regulations regarding the "control of energy sources" in manufacturing. These regulations require energy shutoff devices to be installed on pneumatically powered equipment. L-O-X valves have been manufactured for more than 30 years. They are the most specified valve of their kind throughout the world, and they provide an immediate shutoff of system air supply. ROSS also offers a combination unit of the L-O-X valve and the EEZ-ON valve. The L-O-X/EEZ-ON valves provides the features of both the individual valve, but in one body. For more information, click the L-O-X/EEZ-ON valve.</p>          
                        </div>
                    )}
                    additionalText={(
                        <div>
                            <p><Span>EEZ-ON Valves</Span></p>
                            <p>EEZ-ON Valves gently turn on air for pneumatic circuits. When compressed air is initially applied to a pneumatic circuit, the working parts may move suddenly, potentially causing machine damage or injury to employees. The EEZ-ON valve provides a gradual startup by allowing a gradual and adjustable increase in downstream pressure.</p>
                        </div>
                    )}
                />
                <ProductItems
                    searchTerm="Ross"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Ross/check-valves.png"
                    title="Check Valves"
                    text="Check valves allow full flow through a pneumatic circuit, but in only one direction. They are ideal for applications in which reverse flow of air pressure is unnecessary or detrimental. Pilot-operated check valves operate like regular check valves. The flow in only one direction, but when the pilot is actuated, the check valve is forced open so flow can go both ways. The pilot-operated check valve can stop a cylinder in any position."
                    reverse
                />
                <ProductItems
                    searchTerm="Ross"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Ross/flow-control.png"
                    title="Flow Control Valves"
                    text="A flow control valve should be used on almost every pneumatic circuit. Some are mounted inline while others are placed directly into cylinder ports. Flow control valves allow air flow to go in both directions. In one direction, flow is at full speed. In the other direction, flow is metered. By managing the air flow out of the cylinder, a flow control valve controls the speed of the cylinder. Cylinder speed determines the speed of work processes."
                />
                <SectionHeader
                    text="Articles & Videos"
                />
                <ArticlesDiv>
                    <Articles
                        src="https://assets-ross-controls.s3.amazonaws.com/production/uploads/news_event/image/34/covid19-1585926320.png"
                        text="Company Update for Customers & Channel Partners"
                        link="https://assets-ross-controls.s3.amazonaws.com/production/uploads/news_event/pdf/34/Covid-19_Letter_jjh__002_-1585926320.pdf"
                        detail="An update on what ROSS Controls® is doing to keep employees safe and our critical infrastructure customer base supported."
                    />
                    <Articles
                        src="https://assets-ross-controls.s3.amazonaws.com/production/uploads/news_event/image/33/MCSE-Double-Valve-_L2__with-Gauge-1574861538.png"
                        text="MCSE Series Safety Exhaust Double Valve"
                        link="https://assets-ross-controls.s3.amazonaws.com/production/uploads/news_event/pdf/33/ROSS_MCSE_Series_Safety_Exhaust_Double_Valves_Press-Release-1574861538.pdf"
                        detail="ROSS Controls® introduces its new internal monitored MCSE Series safety exhaust (dump) valves with EEZ-ON® Soft Start function for Category-4, PL e machine guarding applications."
                    />

                    <Articles
                        src="https://assets-ross-controls.s3.amazonaws.com/production/uploads/news_event/image/32/ROSS-Die-Cushion-RF2018005-Non-Redundant-_2s-1569960758.png"
                        text="Automatic Die Cushion Control System"
                        detail="ROSS Controls® introduces its new Automatic Systems Series valve manifold assemblies for automatic pressure control, press metal forming applications."
                        link="https://assets-ross-controls.s3.amazonaws.com/production/uploads/news_event/pdf/32/Automatic_Die_Cushion_Control_Systems_for_Press_Metal_Forming_Applications-1569960758.pdf"

                    />
                </ArticlesDiv>
                <VideoDiv>
                    <Videos
                        src="https://www.youtube.com/embed/abldMtJLJaw"
                    />
                    <Videos
                        src="https://www.youtube.com/embed/TgwOfqkywT0"
                    />
                    <Videos
                        src="https://www.youtube.com/embed/anklBSgYUf8"
                    />
                </VideoDiv>
                <SectionHeader
                    text="Related Links"
                />
                <RelatedLinkDiv>
                    <RelatedLink
                        href="https://www.rosscontrols.com/"
                        text="Ross's Website"
                        icon="globe-americas"
                    />
                    <RelatedLink
                        searchTerm="Ross"
                        text="Shop Ross Products"
                        icon="shopping-cart"
                    />
                    <RelatedLink
                        href="https://www.youtube.com/channel/UCvwDJ-23iq8DgB434fLM_yQ"
                        text="Videos"
                        icon={faYoutube}
                    />
                    <RelatedLink
                        href="/pages/resources/catalog-request"
                        text="Ross Catalogs"
                        icon="address-book"
                    />
                </RelatedLinkDiv>
            </Container>
        </>
    )
}