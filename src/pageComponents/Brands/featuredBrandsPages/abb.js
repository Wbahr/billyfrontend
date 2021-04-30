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

export function abb() {
    
    const description = 'ABB is a leader in power and automation technologies that enable utility and industry ' +
        'customers to improve performance while lowering environmental impact. ABB’s automation technologies blend a ' +
        'robust product portfolio with end-user expertise to deliver solutions for control, motion, protection, and ' +
        'plant integration.'

    return (
        <>
            <Helmet>
                <title>ABB Authorized Distributor | Airline Hydraulics</title>
                <meta name="description" content="Shop online for ABB products from Airline Hydraulics, a leading authorized distributor. Find products and information on drives, motors, generators, control systems, transformers, and low and medium voltage products."/>
            </Helmet>
            
            <FeaturedBrandLogo src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/ABB_logo.png" />
            <Container>
                <H1 text="ABB"/>
                <BrandDetail text={description}/>
                <ShopProductBtn
                    searchTerm="ABB"
                    text="Shop Products"
                />
                <SectionHeader
                    text="Products"
                />
                <ProductItems
                    searchTerm="ABB"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Abb/drives.png"
                    text="ABB’s offering includes low voltage AC and DC drives and medium voltage AC drives which are used across all industries and applications. ABB drives offer application-specific functionality, control for different types of motors as well as flexible connectivity to automation networks."
                    title="Drives"
                />
                <ProductItems
                    searchTerm="ABB"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Abb/motors%20and%20generators.png"
                    title="Motors and Generators"
                    text=" ABB offers a comprehensive range of reliable and high-efficiency motors and generators for all applications. Choose from IEC DC Motors, IEC Low Voltage AC Motors, Servo Motors, Synchronous Motors, or Synchronous Reluctance Motor and Drive Packages."
                    reverse
                />
                <ProductItems
                    searchTerm="ABB"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Abb/transformers.png"
                    title="Transformers"
                    text="ABB offers a full range of transformer products and solutions for ANSI, IEC and other local standards. ABB is a major transformer manufacturer throughout the world and offers both liquid-filled and dry-type transformers."
                />
                <ProductItems
                    searchTerm="ABB"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Abb/control%20systems.png"
                    title="Control Systems"
                    text={(
                        <div>
                            <p>ABB is the #1 global provider of control technologies for industry, power and water. Airline offers the platforms and systems listed below to optimize processes and deliver operational excellence.</p>
                        </div>
                    )}
                    additionalText={(
                        <div>
                            <ul>
                                <li>ABB's 800xA platform provides the collaborative environment necessary for various organizations and departments to work as one and achieve operational excellence.</li>
                                <li>Advant OCS (Open Control System) is an ABB solution for operators to improve their manufacturing productivity and achieve sustainable competitive advantages.</li>
                                <li>The Compact Product Suite is a comprehensive group of control products for system integrators, OEMs and customers who like to engineer their own solution to meet their specific automation needs.</li>
                                <li>ABB's Freelance Distributed Control System can run on any PC and is easy to install, learn, engineer, commission, back-up, maintain and expand.</li>
                                <li>ABB offers Safety Systems to satisfy the safety requirements of industry (process and machinery). Additionally, it also provides the availability required in the most critical applications.</li>
                                <li>Satt OCS comprises everything from products to total solutions for a wide variety of industries, including food processing, water, energy, pharmaceutical, light chemical, infrastructure, etc.</li>
                            </ul>
                        </div>
                    )}
                    reverse
                />
                <ProductItems
                    searchTerm="ABB"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Abb/low%20voltage%20products%20and%20systems.png"
                    title="Low Voltage Products and Systems"
                    text={(
                        <div>
                            <p>ABB offers the largest product range that meets NEMA, UL & CSA standards. Their unique offering of electrical control and protection products enable customers to significantly reduce panel costs. This vast group of products includes:</p>
                        </div>
                    )}
                    additionalText={(
                        <div style={{ display: 'flex' }}>
                            <ul>
                                <li>Alternating Relays</li>
                                <li>Analog Signal Converters</li>
                                <li>Arc Guard Systems</li>
                                <li>Cable Distribution Cabinets</li>
                                <li>Cam Switches</li>
                                <li>Circuit Breakers</li>
                                <li>Connection Devices</li>
                                <li>Contactors</li>
                                <li>Contact Protection Relays</li>
                                <li>Current Sensors</li>
                                <li>Current Monitors, 1PH</li>
                                <li>Current Transducers</li>
                                <li>Cycle Monitors</li>
                                <li>Distributed I/O</li>
                                <li>Disconnect Switches</li>
                                <li>Door Entry Systems</li>
                                <li>Electronic Relays</li>
                                <li>Enclosed Switches</li>
                                <li>Enclosures</li>
                                <li>Electronic Relays & Controls</li>
                                <li>Fieldbus Devices</li>
                                <li>Fieldbus Plug</li>
                            </ul>
                            <ul>
                                <li>Flashers</li>
                                <li>Fusegear</li>
                                <li>HVAC Controls</li>
                                <li>Interface Relays</li>
                                <li>Isolation Monitors</li>
                                <li>Limit Switches</li>
                                <li>Liquid Level Controls</li>
                                <li>Logic Relays</li>
                                <li>Man Machine Interface</li>
                                <li>Manual Motor Starters</li>
                                <li>Manual Motor Protectors</li>
                                <li>Modular DIN Rail Products</li>
                                <li>Motion Detectors</li>
                                <li>Motor Protectors, Electronic</li>
                                <li>Obstruction Lighting Controls</li>
                                <li>Operator Panels</li>
                                <li>Opto Couplers</li>
                                <li>Overload Relays</li>
                                <li>Panel Lamps</li>
                                <li>Panel Switches</li>
                                <li>Pilot Devices</li>
                                <li>Power Supplies</li>
                            </ul>
                            <ul>
                                <li>PLC's</li>
                                <li>Power Quality Products</li>
                                <li>Relays, Mechanical</li>
                                <li>Scalable PLC ACS500</li>
                                <li>Sensors</li>
                                <li>Sensor Interface Relays</li>
                                <li>Serial Data Converters</li>
                                <li>Signal Converters, Universal</li>
                                <li>Softstarters</li>
                                <li>Starters</li>
                                <li>Switches</li>
                                <li>Terminal Blocks</li>
                                <li>Thermistor Motor Protectors</li>
                                <li>Timers</li>
                                <li>Tower Lighting Controls</li>
                                <li>Universal Motor Controller</li>
                                <li>Vending Controls</li>
                                <li>Voltage Monitors</li>
                                <li>Wireless Devices</li>
                                <li>Winding Overtemperature Monitors</li>
                            </ul>
                        </div>
                    )}
                />
                <ProductItems
                    searchTerm="ABB"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Abb/medium%20voltage%20products%20and%20systems.png"
                    title="Medium Voltage Products and Systems"
                    text={(
                        <div>
                            <p>ABB provides utility, industrial and commercial customers with safe, reliable and smart technologies for the distribution of electricity. Airline’s offering includes Circuit Breakers, Compact Secondary Substations (CSS), Contactors, E-Houses, Fault Current Limitation and Arc Protection.</p>
                        </div>
                    )}
                    reverse
                />
                <SectionHeader
                    text="Articles & Videos"
                />
                <ArticlesDiv>
                    <Articles
                        src="https://www07.abb.com/images/librariesprovider87/products/packages/Ex-motor-and-drive-packages/thermistor-protection-modules-fptc-01-and-02.jpg?sfvrsn=1"
                        text="Thermistor protection modules for ACS880 drives"
                        link="https://new.abb.com/drives/segments/motors-and-drives-in-potentially-explosive-atmospheres/thermistor-protection-modules"
                        detail="The ACS880 drives are available with ATEX-certified thermistor protection module FPTC-02 or with functional safety certified thermistor protection module FPTC-01 for ensuring safe motor temperature. These option modules enhance process safety and simplify installation."
                    />
                    <Articles
                        src="https://www07.abb.com/images/librariesprovider87/Customer-cases/riecor-farming-motors.jpg?sfvrsn=1"
                        text="Drives give South African farmer 40% energy savings, smoother operation and less work"
                        link="https://new.abb.com/drives/media/customer-case-riecor-farming"
                        detail="Sometimes, when you are trying to solve one problem you can inadvertently cause another one. However, in the case of Riecor Farming in South Africa an attempt to resolve one problem actually solved it extremely well and, in addition, gave numerous side benefits that decreases costs, work and headaches while making the farmer’s job easier."
                    />

                    <Articles
                        src="https://www07.abb.com/images/librariesprovider87/Energy-efficiency/energy-efficient-drives.jpg?sfvrsn=1"
                        text="Energy efficiency: Using drives to control motors can lead to big savings"
                        detail="Nearly 70 percent of all industrial electrical energy use goes to powering electric motors. These motors are the workhorses of business, from pumps moving fluids to fans moving air to compressors, conveyors, and every type of machine that depends on rotational force to get its job done."
                        link="https://new.abb.com/drives/energy-efficiency"

                    />
                </ArticlesDiv>

                <VideoDiv>
                    <Videos
                        src="https://www.youtube.com/embed/DOM7Eqg5Pzg"
                    />
                    <Videos
                        src="https://www.youtube.com/embed/9YwszNopXY4"
                    />
                    <Videos
                        src="https://www.youtube.com/embed/BLV5Qbkks6U"
                    />
                </VideoDiv>
                <SectionHeader
                    text="Related Links"
                />
                <RelatedLinkDiv>
                    <RelatedLink
                        href="https://new.abb.com/us"
                        text="ABB's Website"
                        icon="globe-americas"
                    />
                    <RelatedLink
                        searchTerm="ABB"
                        text="Shop ABB Products"
                        icon="shopping-cart"
                    />
                    <RelatedLink
                        href="https://www.youtube.com/playlist?list=PLZbHgsYLXoyyGUCZ0_XgWc3-7agdSwrNX"
                        text="Videos"
                        icon={faYoutube}
                    />
                    <RelatedLink
                        href="/pages/resources/catalog-request"
                        text="ABB Catalogs"
                        icon="address-book"
                    />
                </RelatedLinkDiv>
            </Container>
        </>
    )
}