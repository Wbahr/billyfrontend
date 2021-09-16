import React from 'react'
import styled from 'styled-components'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import FeaturedBrandLogo from '../uiComponents/FeaturedBrandLogo'
import H1 from '../uiComponents/H1'
import BrandDetail from '../uiComponents/BrandDetail'
import ShopProductBtn, {  ProductConfiguratorBtn } from '../uiComponents/ShopProductBtn'
import SectionHeader from '../uiComponents/SectionHeader'
import ProductItems from '../uiComponents/ProductItems'
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

export function smc() {
    const description = 'SMC has established a position as the world leader in pneumatic technology and supports a range' +
        ' of over 600,000 product variations to meet the complex and diversified needs of its customers. The company is ' +
        'continually applying world class design to pneumatic component and power control technology to develop advanced' +
        ' products with ever higher levels of performance.'

    return (
        <>
            <Helmet>
                <title>SMC Authorized Distributor | Airline Hydraulics</title>
                <meta name="description" content="SMC has established a position as the world leader in pneumatic technology and supports a range of over 600,000 product variations to meet the complex and diversified needs of its customers. "/>
            </Helmet>
            <FeaturedBrandLogo src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/SMC%20Elite%20Dist%20web.png" />
            <Container>
                <H1 text="SMC"/>
                <BrandDetail
                    text={description}
                />
                <ShopProductBtn
                    searchTerm="SMC"
                    text="Shop Products"
                />
                <ProductConfiguratorBtn
                    url="/srf/SmcUSA"
                    text="SMC Product Configurator"
                />
                <SectionHeader
                    text="Products"
                />
                <ProductItems
                    brand="SMC Corporation Of America"
                    searchTerm="SMC"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/SMC/Actuator-and-Air-cylinders.png"
                    title="Actuators & Air Cylinders"
                    text="Actuator and air cylinders from SMC offer innovative design features to provide precision performance and reliability for the automation industry. Engineers trust SMC actuators to provide long life, and reliable service. SMC’s standard air cylinders are available in a wide range of bore sizes, multiple mounting configurations and auto switch capability as a standard on most series. SMC also offers electric actuators, designed with a focus on easy setup and operation. Pneumatic and electric actuator products are available in a wide variety of styles, including linear, guided, rotary, gripper, rodless air cylinders and specialty air cylinders. Each pneumatic or electric actuator series comes with a full complement of standard options and related products."
                />
                <ProductItems
                    brand="SMC Corporation Of America"
                    searchTerm="SMC"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/SMC/valves.png"
                    title="Valves"
                    text="SMC's solenoid valves and manifolds offer industry leading valve performance advancements such as remarkably high flow capacities from very compact designs, low power consumption, high speed response, long life, built-in surge suppression and indicator lights.
					SMC mechanical, manual and air pilot valves are designed to meet general industry standards and are capable of long, trouble-free life. SMC also offers fluid process valves for air, water, steam, oil, chemicals and liquids as well as valve accessories and fieldbus solutions."
                    reverse
                />
                <ProductItems
                    brand="SMC Corporation Of America"
                    searchTerm="SMC"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/SMC/temperature%20controls.png"
                    title="Temperature Controls"
                    text="Chillers are products that control the temperature of heat sources in customers' devices and equipment using temperature-controlled circulating fluid. Maintaining a fixed temperature can improve the quality, reliability and service life of devices or equipment. SMC's line of temperature control units utilizes best-in-class technologies to accomplish the exact range of temperature ranges and temperature stability desired by our customers."
                />
                <ProductItems
                    brand="SMC Corporation Of America"
                    searchTerm="SMC"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/SMC/electrical%20products.png"
                    title="Electrical Products"
                    text="SMC provides multiple options for pneumatic solutions such as electronic regulators, pressure switches, flow switches, and vacuum flow switches."
                    reverse
                />
                <ProductItems
                    brand="SMC Corporation Of America"
                    searchTerm="SMC"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/SMC/smc%20-%20vacuum.png"
                    title="Vacuum Products"
                    text="SMC vacuum products offer comprehensive options for vacuum applications. Compact, lightweight air vacuum generators are available in a wide range of sizes and performance ranges."
                />
                <ProductItems
                    brand="SMC Corporation Of America"
                    searchTerm="SMC"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/SMC/connectors.png"
                    title="FITTINGS AND CONNECTORS"
                    text={(
                        <div>
                            <p>The SMC connector line includes inch and metric one touch fittings, fitting manifolds, and pneumatic tubing available in multiple colors, sizes, and materials:</p>
                            <ul>
                                <li>Comprehensive line of inch or metric sized fittings, speed controllers, and tubing</li>
                                <li>Includes clean room options and a broad set of specialized fitting and pneumatic tubing options</li>
                                <li>Integrates one-touch fitting technology in both pneumatic fittings and speed controls</li>
                                <li>Provides stainless steel fitting and brass fitting options</li>
                                <li>Improves energy consumption, by providing lower pressure return stroke options</li>
                                <li>Air cylinder speed control is critical to the longevity of your machine operation</li>
                            </ul>
                        </div>
                    )}
                    reverse
                />
                <ProductItems
                    brand="SMC Corporation Of America"
                    searchTerm="SMC"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/SMC/air-dryers.png"
                    title="Air Dryers"
                    text="Compressed air contains moisture (water vapor, droplets), oil, debris and other foreign matter. Filters and mist separators can be used to remove droplets, oil, debris and so on, but a dryer is necessary to remove water vapor. SMC air dryers are insurance for downstream components, and in the long run, allow for sustainable performance/production for an end customer."
                />
                <ProductItems
                    brand="SMC Corporation Of America"
                    searchTerm="SMC"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/SMC/Air%20Prep%20Equipment.png"
                    title="Air Prep Equipment"
                    text="SMC's air preparation equipment and instrumentation provides unsurpassed sensing, regulation and filtration to provide the clean dry air necessary for the peak performance of your pneumatic system. SMC’s offering includes many sizes and variations of filter, regulator and/or lubrication (FRL) units and a wide range of accessories. Their electronic controls include electronic regulators, pressure switches and vacuum switches. SMC also has membrane dryers, desiccant dryers, and refrigerated dryers to keep moisture out of your systems."
                    reverse
                />
                <SectionHeader
                    text="Articles & Videos"
                />
			
                <VideoDiv>
                    <Videos
                        src="https://www.youtube.com/embed/mMfG2f6py9Y"
                    />
                    <Videos
                        src="https://www.youtube.com/embed/W87yvy6O98I"
                    />
                    <Videos
                        src="https://www.youtube.com/embed/uYxvLXFttdw"
                    />
                </VideoDiv>
                <SectionHeader
                    text="Related Links"
                />
                <RelatedLinkDiv>
                    <RelatedLink
                        href="https://www.smcusa.com/"
                        text="SMC's Website"
                        icon="globe-americas"
                    />
                    <RelatedLink
                        searchTerm="SMC"
                        text="Shop SMC Products"
                        icon="shopping-cart"
                    />
                    <RelatedLink
                        href="https://www.youtube.com/channel/UC9De0Z_VIjdMhA7x722lA4A"
                        text="Videos"
                        icon={faYoutube}
                    />
                    <RelatedLink
                        href="/pages/resources/catalog-request"
                        text="SMC Catalogs"
                        icon="address-book"
                    />
                </RelatedLinkDiv>
            </Container>
        </>
    )
}