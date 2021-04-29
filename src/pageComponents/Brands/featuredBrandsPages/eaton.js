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
	`
const ArticlesDiv = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	flex-wrap: wrap;
`
const VideoDiv = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	width: 100%;
`
const RelatedLinkDiv = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	height: 220px;
	margin: 20px 0;
`

export function eaton() {
    const description = 'Eaton is a global technology leader in power management solutions that make electrical, ' +
        'hydraulic and mechanical power operate more efficiently, reliably, safely and sustainably. Airline carries a ' +
        'wide range of Eaton Cutler-Hammer products for circuit protection, automation and control.'

    return (
        <>
            <Helmet>
                <title>Eaton Authorized Distributor | Airline Hydraulics</title>
                <meta name="description" content="Shop online for Eaton products from Airline Hydraulics, a leading distributor. Find products and information on circuit protection, contactors, starters, protective relays, distribution, termination,transformers, power supplies, pushbuttons, pilot lights, selector switches, connectivity, relays, timers, operator interfaces, HMI/PLC, and variable frequency drives."/>
            </Helmet>
            <FeaturedBrandLogo src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/Eaton_logo.png" />
            <Container>
                <H1 text="Eaton"/>
                <BrandDetail
                    text={description}
                />
                <ShopProductBtn
                    searchTerm="Eaton"
                    text="Shop Products"
                />
                <SectionHeader
                    text="Products"
                />
                <ProductItems
                    searchTerm="Eaton"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Eaton/circuit%20protection.png"
                    text={(
                        <div>
                            <p>Eaton’s complete line of low and medium voltage circuit breakers are used to provide circuit protection in a wide range of industries, where they protect against overloads and short circuits in conductors. These circuit breakers are applied in panel boards, switchboards, motor control centers, control panels, combination starters, individual enclosures, and as bus duct plug-in units. A partial list of Eaton’s circuit protection offering includes:</p>
                        </div>
                    )}
                    additionalText={(
                        <div>
                            <ul>
                                <li>Molded Case Circuit Breakers</li>
                                <li>Miniature Circuit Breakers</li>
                                <li>Rotary Disconnects</li>
                                <li>Safety Switches</li>
                            </ul>
                            <p>Before you think about what you are building next, think about how you will defend it. You need a device with connected and communicating built-in electronics, ability to generate the data to help you optimize your facilities performance, and the ability to mitigate arc ﬂash keeping your employees, customers and end-users safe. With Eaton’s new globally rated Power Defense™ molded case circuit breakers, you can now plan with conﬁdence. Start planning your defense now.</p>
                        </div>
                    )}
                    title="Circuit Protection"
                />
                <ProductItems
                    searchTerm="Eaton"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Eaton/contactors.png"
                    title="Contactors, Starters and Protective Relays"
                    text={(
                        <div>
                            <p> Eaton offers the protection your system needs against equipment failure and danger caused by voltage faults, current conditions or excessive load requirements. Their extensive line includes:</p>
                            <ul>
                                <li>Electromechanical Contactors and Starters</li>
                                <li>Manual Motor Starters</li>
                                <li>Soft Starters</li>
                                <li>Monitoring Relays</li>
                                <li>Motor Protection Relays</li>
                                <li>Motor Protection Circuit Breakers</li>
                                <li>Manual Motor Protection</li>
                            </ul>
                        </div>
                    )}
                    reverse
                />
                <ProductItems
                    searchTerm="Eaton"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Eaton/safety-relays.png"
                    title="Safety Contactors"
                    text="Providing enhanced levels of safety, XTSE contactors integrate to applications to not only achieve the highest safety circuits, but provide additional levels of protection that reinforce end-user safety."
                />
                <ProductItems
                    searchTerm="Eaton"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Eaton/distribution_termination.png"
                    title="Distribution and Termination"
                    text="Power distribution blocks provide a means for termination of up to 12 load wires in a single point while being supplied by a single line. Terminal blocks are suited to conserve space while allowing maximum flexibility, when labor cost reduction and ease of assembly is desired. Eaton’s fuse blocks and holders provide a simple DIN mounting device for protection in control circuits."
                    reverse
                />
                <ProductItems
                    searchTerm="Eaton"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Eaton/pushbuttons.png"
                    title="Pushbuttons, Pilot Lights and Selector Switche"
                    text={(
                        <div>
                            <p>Eaton offers an extensive variety of pushbuttons, pilot lights and selector switches to suit virtually any industrial or commercial application. Choose from:</p>
                            <ul>
                                <li>22 mm Pilot Devices</li>
                                <li>30 mm Pilot Devices</li>
                                <li>Stacklights providing illuminated and audible signaling</li>
                            </ul>
                        </div>
                    )}
                />
                <ProductItems
                    searchTerm="Eaton"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Eaton/connectivity.png"
                    title="Connectivity"
                    text="Eaton’s SmartWire-DT system uses a continuous green flat cable located in the control cabinet to connect motor starters, pushbutton actuators, and indicator lights."
                    reverse
                />
                <ProductItems
                    searchTerm="Eaton"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Eaton/relays_timers.png"
                    title="Relays and Timers"
                    text={(
                        <div>
                            <p>Whether you're a machine builder or end user, control panel designer or facility maintenance manager, Eaton's expansive offering of relay options with customization capabilities can meet all of your specific application requirements:</p>
                            <ul>
                                <li>Easy Programmable Relays</li>
                                <li>Control Relays</li>
                                <li>Timing Relays</li>
                                <li>Monitoring Relays</li>
                                <li>Machine Tool Relays</li>
                                <li>Plug-in Relays</li>
                                <li>Terminal Block Relays</li>
                            </ul>
                        </div>
                    )}
                />
                <ProductItems
                    searchTerm="Eaton"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Eaton/operator%20interfaces.png"
                    title="Operator Interfaces"
                    text="Manufacturing environments are complex and require products that offer control, reduce downtime and increase efficiency. Eaton’s electronic operator interfaces (OI) do that while being easy to install, understand, modify and use. The features, hardware design, development software and high quality provide the best value on the market."
                    reverse
                />
                <ProductItems
                    searchTerm="Eaton"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Eaton/HMI-PLCs.png"
                    title="HMI-PLCs"
                    text="Eaton's Programmable Logic Controllers (PLCs) are microprocessor-based devices used to control industrial processes or machines. They provide advanced functions, including analog monitoring, control and high speed motion control as well as share data over communication networks."
                />
                <ProductItems
                    searchTerm="Eaton"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Eaton/variable_frequency_drives.png"
                    title="Variable Frequency Drives"
                    text="Adjustable frequency drives (also known as variable frequency drives) adjust a motor's speed to closely match output requirements, resulting in a typical energy savings of 10 to 50 percent."
                    reverse
                />
                <ProductItems
                    searchTerm="Eaton"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Eaton/transformers_power.png"
                    title="Transformers and Power Supplies"
                    text="Eaton offers control power transformers that provide stepped-down voltages to machine tool control devices, enabling circuits to be isolated from all power and lighting circuits. Eaton also provides a wide selection of durable and reliable power supplies for many 24 Vdc applications in a variety of sizes and features."
                />
                <SectionHeader
                    text="Articles & Videos"
                />
                <ArticlesDiv>
                    <Articles
                        src="https://www.eaton.com/content/dam/eaton/eaton-own-or-royalty-free-purchased-images/city-top-view.jpg.transform/default-desktop/image.jpg"
                        text=" Managing complexities to prepare the grid of the future"
                        link="https://www.eaton.com/us/en-us/company/news-insights/grid-modernization.html"
                        detail="The electrical grid has served businesses and consumers for over 100 years. Utility system planners, operators and maintenance personnel have always faced challenges, but never have they compounded as rapidly as they are now."
                    />
                    <Articles
                        src="https://cf-images.us-east-1.prod.boltdns.net/v1/static/1302165871001/ed09b29e-bf96-4ea1-bf8e-64503d71ac3e/21360df1-8321-4a10-9cd6-0c9a4e1551c2/1280x720/match/image.jpg"
                        text="Innovation that enables dynamic machine control"
                        link="https://www.eaton.com/us/en-us/services/dynamic-machine-control.html"
                        detail="The industry is moving to smarter, more efficient machines. It’s no longer just about components, it’s about how those components connect to create intelligent subsystems that dynamically adapt and respond.  "
                    />

                    <Articles
                        src="https://www.eaton.com/content/dam/eaton/markets/utility/inteligent-microgrid-thumb.jpg.transform/default-desktop/image.jpg"
                        text="Powering resilience: preparing for the unexpected"
                        detail="It’s devasting to see how climate emergencies are affecting millions of people with increasing frequency. The impact of natural disasters makes it clear that the climate challenges we face are not abstract issues.  More than ever, our global energy supply and infrastructure must be able to withstand extreme conditions. Our lives and livelihoods depend on it."
                        link="https://www.eaton.com/us/en-us/company/news-insights/resilience.html"
                    />
                </ArticlesDiv>

                <VideoDiv>
                    <Videos
                        src="https://www.youtube.com/embed/01gNSqKiokk"
                    />
                    <Videos
                        src="https://www.youtube.com/embed/jEL5t_rMxqU"
                    />
                    <Videos
                        src="https://www.youtube.com/embed/VTcS5HBrP7g"
                    />
                </VideoDiv>
                <SectionHeader
                    text="Related Links"
                />
                <RelatedLinkDiv>
                    <RelatedLink
                        href="http://www.eaton.com/"
                        text="Eaton's Website"
                        icon="globe-americas"
                    />
                    <RelatedLink
                        searchTerm="Eaton"
                        text="Shop Eaton Products"
                        icon="shopping-cart"
                    />
                    <RelatedLink
                        href="https://www.youtube.com/channel/UCF7vz2IAPNHv7BKTiFC9Xhw"
                        text="Videos"
                        icon={faYoutube}
                    />
                    <RelatedLink
                        href="/pages/resources/catalog-request"
                        text="Eaton Catalogs"
                        icon="address-book"
                    />
                </RelatedLinkDiv>
            </Container>
        </>
    )
}