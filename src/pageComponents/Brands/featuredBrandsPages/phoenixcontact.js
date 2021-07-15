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

export function phoenixcontact() {
    const description = 'Phoenix Contact is a world leader for electronic components, systems, and solutions in the ' +
        'fields of electrical engineering, electronics, and automation. Phoenix Contact provides products for ' +
        'applications in a wide range of industries such as automotive, oil and gas, solar power, transportation, ' +
        'water management, and wind power.'

    return (
        <>
            <Helmet>
                <title>Phoenix Contact Authorized Distributor | Airline Hydraulics</title>
                <meta name="description" content="Shop online for Phoenix Contact products from Airline Hydraulics, a leading distributor. Find products and information on Control Technology, I/O Systems, Automation, Interface Technology, Switching Devicess, Surge Protection, Power Supply Units, Marking Systems, Tools, Mounting Material, Sensor/Actuator Cabling, Plug-in Connectors, Modular Terminal Blocks, Connection Technology for Field Devices, PCB connection technology, and Electronics Enclosure."/>
            </Helmet>
            <FeaturedBrandLogo src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/phoenix-contact-logo.png" />
            <Container>
                <H1 text="Phoenix Contact"/>
                <BrandDetail
                    text={description}
                />
                <ShopProductBtn
                    searchTerm="Phoenix"
                    text="Shop Products"
                />
                <SectionHeader
                    text="Products"
                />
                <ProductItems
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Phoenix/control/control.png"
                    text="The heart of your control cabinet is the logic platform. For OEMs and control engineers alike, it has never been easier to build smaller, smarter machines faster - and free themselves from using controllers and equipment based solely on prior familiarity or specification. Industrial PCs/HMIs and scalable controllers can streamline functionality, reduce equipment and costs, as well as usher in the next generation of intelligent machine control."
                    title="Control"
                    learnMoreLink="/pages/phoenix/control"
                />
                <ProductItems
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Phoenix/control/power-reliability.png"
                    title="Power Reliability"
                    text="Don't overlook the basics. No matter how sophisticated your control system, a 'line down' situation is only one power disturbance away. Manufacturing processes depend on being properly powered and protected. Surge and circuit protection, UPS backup, and redundant power solutions are the foundation of your control system's reliability."
                    learnMoreLink="/pages/phoenix/power-reliability"
                    reverse
                />
                <ProductItems
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Phoenix/control/connectivity.png"
                    title="Connectivity"
                    text="Every wire in your control cabinet is there for a reason. The connections of those wires-via spring, screw, IDC, or crimp-are only as reliable as the integrity of the terminations. For nearly a century, Phoenix Contact has been the trusted partner for reliable connections."
                    learnMoreLink="/pages/phoenix/connectivity"
                />
                <ProductItems
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Phoenix/control/etherNet.png"
                    title="EtherNet I/P and Profinet"
                    text="Liberate your EtherNet/IP application from dependence on a single vendor. Phoenix Contact offers EtherNet/IP IO, Ethernet switches, and wireless components to make cost-effective and open solutions a reality."
                    learnMoreLink="/pages/phoenix/ethernetIP-profinet"
                    reverse
                />
                <ProductItems
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Phoenix/control/networking.png"
                    title="Networking & Remote"
                    text="Smarter factories and convergences with enterprise IT are increasing the demand for remote access and collection of real-time data. With this power comes responsibility. In a single network, everything is vulnerable. Intelligent network infrastructure starts with the selection of switches, routers, wireless, and security components to harness opportunity and minimize risk."
                    learnMoreLink="/pages/phoenix/networking"
                />
                <ProductItems
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Phoenix/control/safety..png"
                    title="Safety"
                    text="Emergency stop, light grid or safety door - safety relays from Phoenix Contact can be used to implement all safety functions for applications with one function, one device."
                    learnMoreLink="/pages/phoenix/safety"
                    reverse
                />
                <ProductItems
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Phoenix/control/floor.png"
                    title="Floor Productivity"
                    text="Time is money. Efficiently building a quality control cabinet starts with what you use to build it. Quick, flexible marking systems, automated tools and hand tools, cable/wire management, and cabinet accessories are often overlooked methods to reduce errors and cut commissioning time. Thoughtful selection of these 'secret weapons' translates directly to the bottom line profitability of any shop floor."
                    learnMoreLink="/pages/phoenix/shop-floor-productivity"
                />
				
                <SectionHeader
                    text="Articles & Videos"
                />
                <ArticlesDiv>
                    <Articles
                        src="https://airlinemedia.airlinehyd.com/Static_pages/images/articles/-S220x217-C747x738,8,42-FPNG.png"
                        text="Loop-powered temperature transducers"
                        link="https://www.phoenixcontact.com/online/portal/us?1dmy&urile=wcm%3apath%3a/usen/web/corporate/Press/press_information/2aac9d14-e323-4341-8f6d-1737844bd68a"
                        detail="Dual-channel temperature transmitters with HART compatibilityMiddletown, Pa. – Phoenix Contact introduces six new universal temperature transducers. These new additions to the MACX MCR family are loop-powered and have two channels."
                    />
                    <Articles
                        src="https://airlinemedia.airlinehyd.com/Static_pages/images/articles/-S220x172-C2362x1846,0,603-FPNG.png"
                        text="Reduce energy costs"
                        link="https://www.phoenixcontact.com/online/portal/us?1dmy&urile=wcm%3apath%3a/usen/web/corporate/Press/press_information/703e7164-375b-4a41-adf6-d6b9bc28e233"
                        detail="Easy-to-configure EMpro simplifies remote energy monitoring Middletown, Pa. – Plant operators and facility managers now have real-time, remote access to their machines’ energy consumption data, with Phoenix Contact’s EMpro. "
                    />

                    <Articles
                        src="https://airlinemedia.airlinehyd.com/Static_pages/images/articles/-S220x228-C753x779,3,12-FPNG.png"
                        text="Value-powered reliability now available in 480 W"
                        detail="New 24 V DC/20 A UNO power supply provides high-quality, cost-effective power

						Middletown, Pa. – Phoenix Contact’s UNO POWER family now includes a cost-effective option for applications requiring a basic DC voltage. The newest single-phase power supply is ideal for loads of up to 480 W."
                        link="https://www.phoenixcontact.com/online/portal/us?1dmy&urile=wcm%3apath%3a/usen/web/corporate/Press/press_information/ecafb002-18da-430b-a6a9-8e67dc610b65"

                    />
                </ArticlesDiv>

                <VideoDiv>
                    <Videos
                        src="https://www.youtube.com/embed/qKRFmJ8vZeQ"
                    />
                    <Videos
                        src="https://www.youtube.com/embed/O3N7iV0NLdc"
                    />
                    <Videos
                        src="https://www.youtube.com/embed/9akIIRY2e7I"
                    />
                </VideoDiv>
                <SectionHeader
                    text="Related Links"
                />
                <RelatedLinkDiv>
                    <RelatedLink
                        href="https://www.phoenixcontact.com/online/portal/us?1dmy&urile=wcm%3apath%3a/usen/web/home"
                        text="Phoenix Contact's Website"
                        icon="globe-americas"
                    />
                    <RelatedLink
                        searchTerm="Phoenix"
                        text="Shop Phoenix Contact Products"
                        icon="shopping-cart"
                    />
                    <RelatedLink
                        href="https://www.youtube.com/user/PhoenixContactUSA/featured"
                        text="Videos"
                        icon={faYoutube}
                    />
                    <RelatedLink
                        href="/pages/resources/catalog-request"
                        text="Phoenix Contact Catalogs"
                        icon="address-book"
                    />
                </RelatedLinkDiv>
            </Container>
        </>
    )
}