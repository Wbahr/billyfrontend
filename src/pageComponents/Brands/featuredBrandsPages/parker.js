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
const ListDiv = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
`

export function parker() {
    const description = 'Parker Hannifin provides precision-engineered solutions for a wide variety of mobile, ' +
        'industrial and aerospace markets. As a Parker Fluid Connector distributor, Airline carries Parker’s full line ' +
        'of high-quality hose and hose fittings, tube fittings, thermoplastic tubing, brass fittings and valves, ' +
        'quick-disconnect couplings and assembly tools. In addition, Airline is your source for many fluid power and ' +
        'automation products that are now a part of Parker’s offering, including:'
    
    return (
        <>
            <Helmet>
                <title>Parker Authorized Distributor | Airline Hydraulics</title>
                <meta name="description" content={description}/>
            </Helmet>
            <FeaturedBrandLogo src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/parker_logo.jpg" />
            <Container>
                <H1 text="Parker"/>
                <BrandDetail
                    text={(
                        <div>
                            <p>{description}</p>
                            <ListDiv>
                                <ul>
                                    <li>Ross High-Torque, Low-Speed Motors</li>
                                    <li>Gresen Valves</li>
                                    <li>Greer Bladder Piston Accumulators</li>
                                    <li>Snap-Tite Quick Disconnect Couplings</li>
                                    <li>Tyrone Gear Pumps</li>
                                    <li>Kleenvent Reservoir Isolators</li>
                                </ul>
                                <ul>
                                    <li>Oildyne Power Units</li>
                                    <li>Rectus Couplings</li>
                                    <li>Pioneer Quick Couplings</li>
                                    <li>Skinner Solenoid Valves</li>
                                    <li>Nycoil Tubing</li>
                                    <li>ORIGA Pneumatic and Electric Actuators</li>
                                </ul>
                            </ListDiv>
                        </div>
                    )}
                />
                <ShopProductBtn
                    searchTerm="Parker"
                    text="Shop Products"
                />
                <SectionHeader
                    text="Products"
                />
                <ProductItems
                    searchTerm="Parker"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Parker/hose-fittings.png"
                    text="Parker offers the largest selection of hoses plus more fitting sizes than any other manufacturer. You’ll find a wide variety of hoses including braided, spiral and multi-purpose, and more than 4500 Parkrimp fittings. Parker products have been designed, tested and approved to meet and exceed global standards. The right product is available for your application, including hose that features a variety of abrasion-resistant cover choices, flexibility, a wide range of media compatibility, and more characteristics that make Parker the hose supplier of choice for leading companies everywhere."
                    title="Hose & Hose Fittings"
                />
                <ProductItems
                    searchTerm="Parker"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/no-image.jpg"
                    text="One motion completes multiple connections. That is the basic concept behind multi-coupling technology. Parker Quick Coupling Division is the market leader for single point connections. Choose from Pioneer Agricultural Quick Coupling Products, or quick couplings for hydraulic, pneumatic, process, power and instrumentation applications. Parker's Quick Coupling Division also carries thermoplastic quick couplings, hydraulic swivels, valves and more."
                    title="Quick Couplings"
                    reverse
                />
                <ProductItems
                    searchTerm="Parker"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/no-image.jpg"
                    title="Parflex"
                    text={(
                        <div>
                            <p>Parflex designs and manufactures thermoplastic and fluoropolymer hose, tubing and accessories that provide unique application solutions, such as the examples below which were created in response to customers' application challenges:</p>
                            <ul>
                                <li>eXtreme™ Duty Hose</li>
                                <li>SCR Electrically Heated Hose</li>
                                <li>Fast-Stor® Dura-Flex™</li>
                                <li>Pageflex SBF™</li>
                                <li>High Pressure PTFE Hose Assemblies</li>
                                <li>Porous Fluoropolymer Tubing (ePTFE)</li>
                            </ul>
                        </div>
                    )}
                />
                <ProductItems
                    searchTerm="Parker"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Parker/industrial-hose.png"
                    text="Parker industrial hose products are the preferred choice for transferring abrasive materials, acid and chemicals, air, compressed gases, food, fuel, oil, steam, welding gases, water and many other materials. Parker manufactures a variety of hoses with covers resistant to abrasion, chemicals, flame, heat, oil, ozone, ultraviolet light and weathering."
                    title="Industrial Hose Products"
                    reverse
                />
                <ProductItems
                    searchTerm="Parker"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Parker/tube-fittings.png"
                    text=" Superior plating gives fittings from the Tube Fittings Division (TFD) unmatched protection against red rust. This helps customers avoid the many costs of corrosion - calculated not only in terms of possible leak points and replacement fittings, but also potential lost sales stemming from poor product perception. Parker TFD fittings withstand the harshest operating environments and are an integral component of any leak-free, well-functioning - and great looking - hydraulic system."
                    title="Tube Fittings"
                />
                <ProductItems
                    searchTerm="Parker"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Parker/fluid-system-connectors.png"
                    text="Parker's Fluid System Connectors Division is a leader in brass, composite and thermoplastic fittings and valves for markets including: automation, industrial, food processing, life science, petrochemical, transportation, water and beverage. Fitting types range from Push-to-Connect to compression, flare, adapters, barbed, DOT, cartridges, manifolds, flow controls, ball valves and hose barb fittings."
                    title="Fluid System Connectors"
                    reverse
                />

                <SectionHeader
                    text="Articles & Videos"
                />
                <ArticlesDiv>
                    <Articles
                        src="https://www.parker.com/parkerimages/Parker.com/News%20Release/2020%20News%20Release/Multi-Coupler%20Hero%20Image%20Newsroom.jpg"
                        text="The Sub-Compact Tractor Multi-Coupler: Making Connections with Purpose"
                        link="https://www.parker.com/portal/site/PARKER/menuitem.31c35c58f54e63cb97b11b10237ad1ca/?vgnextoid=a116371ed94d0710VgnVCM100000e6651dacRCRD&vgnextchannel=c38888b5bd16e010VgnVCM1000000308a8c0RCRD&vgnextfmt=EN&newsroom=Y&vgnextcat=News%20Release%20Details"
                        detail="At Parker, we love a breakthrough product story. But innovation doesn’t always mean reinventing the wheel. Or the multi-coupler. In the case of Parker’s Sub-Compact Tractor Multi-Coupler, the innovation was in taking a proven product for large commercial tractors and adapting it for use in a whole new market segment."
                    />
                    <Articles
                        src="https://www.parker.com/parkerimages/Parker.com/News%20Release/2020%20News%20Release/Purpose%20Firefighter%20Video%20Thumb%20386play.jpg"
                        text="SCBA Quick Disconnect Couplings: A Breath of Fresh Air"
                        link="https://www.parker.com/portal/site/PARKER/menuitem.31c35c58f54e63cb97b11b10237ad1ca/?vgnextoid=25096193498df610VgnVCM100000e6651dacRCRD&vgnextchannel=c38888b5bd16e010VgnVCM1000000308a8c0RCRD&vgnextfmt=EN&newsroom=Y&vgnextcat=News%20Release%20Details"
                        detail="Many Parker team members, driven by Purpose, wish to give back and have a positive impact in the communities they call home. For Jason Manning, Environmental, Health & Safety Manager for the Quick Coupling Division, that impact has been twofold."
                    />

                    <Articles
                        src="https://www.parker.com/parkerimages/Parker.com/Countries-2011/United%20States/Newsroom/Media%20Gallery/Purpose-Thumb-withPlay-386.jpg"
                        text="Parker Hannifin Defines its Unique Contribution to the World Through New Purpose Statement"
                        detail="CLEVELAND – October 14, 2019 – Parker Hannifin Corporation (NYSE:PH), the global leader in motion and control technologies, today announced a new purpose statement that defines its unique contribution to the world. The simple expression: Enabling Engineering Breakthroughs that Lead to a Better Tomorrow, is the culmination of months of research and team member input and refinement. To bring the purpose to life, the company has developed a website at parker.com/purpose and created a signature video."
                        link="https://www.parker.com/portal/site/PARKER/menuitem.31c35c58f54e63cb97b11b10237ad1ca/?vgnextoid=cb5accf44bbbd610VgnVCM100000e6651dacRCRD&vgnextchannel=c38888b5bd16e010VgnVCM1000000308a8c0RCRD&vgnextfmt=EN&newsroom=Y&vgnextcat=News%20Release%20Details"

                    />
                </ArticlesDiv>

                <VideoDiv>
                    <Videos
                        src="https://www.youtube.com/embed/INfjCiFXUwo"
                    />
                    <Videos
                        src="https://www.youtube.com/embed/-ZJbwmTwe40"
                    />
                    <Videos
                        src="https://www.youtube.com/embed/naLsSyYz6os"
                    />
                </VideoDiv>
                <SectionHeader
                    text="Related Links"
                />
                <RelatedLinkDiv>
                    <RelatedLink
                        href="http://www.parker.com/"
                        text="Parker's Website"
                        icon="globe-americas"
                    />
                    <RelatedLink
                        searchTerm="Parker"
                        text="Shop Parker Products"
                        icon="shopping-cart"
                    />
                    <RelatedLink
                        href="https://www.youtube.com/channel/UCe74hvmtnVrXfZPBofJ_GJA"
                        text="Videos"
                        icon={faYoutube}
                    />
                </RelatedLinkDiv>
            </Container>
        </>
    )
}