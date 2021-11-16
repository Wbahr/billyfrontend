import React from 'react'
import styled from 'styled-components'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import FeaturedBrandLogo from '../uiComponents/FeaturedBrandLogo'
import H1 from '../uiComponents/H1'
import BrandDetail from '../uiComponents/BrandDetail'
import ShopProductBtn from '../uiComponents/ShopProductBtn'
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

export function hydac() {
    const description = 'HYDAC is a global leader in fluid power, offering a complete range of hydraulic products ' +
        'including filters, accumulators, power units, valves, coolers, electronics, and much more. Airline provides ' +
        'HYDAC fluid power solutions to OEMs and end-users in a wide range of industries where industrial or mobile ' +
        'hydraulic applications are found. In addition, HYDAC offers water and process filtration equipment to meet ' +
        'the growing need for these products.'

    return (
        <>
            <Helmet>
                <title>Hydac Authorized Distributor | Airline Hydraulics</title>
                <meta name="description" content="Shop online for HYDAC products from Airline Hydraulics, a leading distributor. Find products and information on filters and filter systems, accumulators, valves, clamps, electronics, diagnostics, compact hydraulics, mobile directional control valves, and hydraulic cylinders."/>
            </Helmet>
            <FeaturedBrandLogo src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/hydac.png" />
            <Container>
                <H1 text="Hydac"/>
                <BrandDetail
                    text={description}
                />
                <ShopProductBtn
                    searchTerm="Hydac"
                    text="Shop Products"
                />
                <SectionHeader
                    text="Products"
                />
                <ProductItems
                    searchTerm="Hydac"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Hydac/Filters.png"
                    text={(
                        <div>
                            <p>The contamination in a hydraulic system may be invisible to the human eye, but these tiny particles act as an abrasive which "sand-blasts" the surface of all components in a hydraulic system, causing them to function inefficiently and eventually break down. In fact, it is estimated that nearly 85% of hydraulic component failures result from contaminated oil. Airline carries the HYDAC filtration products you need to help you maintain ISO cleanliness levels, increase machine uptime and lengthen component life.</p>        
                        </div>
                    )}
                    additionalText={(
                        <div>
                            <p>In addition, Airline service professionals will work with you to diagnose and maintain cleanliness in your hydraulic or lubrication system.</p>
                            <ul>
                                <li><Span>Contamination Monitors</Span> - HYDAC offers products to detect and measure particulate contamination and the water saturation level in hydraulic and lubrication systems, allowing you to have total predictive maintenance.</li>
                                <li><Span>Filtration Systems</Span> - HYDAC has a variety of offline filtration systems to monitor and remove particulate contamination, water or both from your hydraulic fluids.</li>
                                <li><Span>Hydraulic & Lubrication Filters</Span> - HYDAC carries inline, return line, suction, tank breather and offline filter assemblies as well as breather filters and state-of-the-art filter elements.</li>
                                <li><Span>Diesel Fuel Filters</Span> - HYDAC offers a system for diesel filtration which protects vehicle manufacturers and operators against downtimes and premature service calls.</li>
                                <li><Span>Water/Process Filtration</Span> - HYDAC has individual filter elements, filters in simplex and duplex versions and complete filter systems, some with automatic back-flushing, which are used in different areas of process technology.</li>

                            </ul>
                        </div>
                    )}
                    title="Filters & Filter Systems"
                />
                <ProductItems
                    brand="Hydac Technology Corporation"
                    searchTerm="Hydac"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Hydac/Accumulators.png"
                    title="Accumulators"
                    text=" Three distinct accumulator designs are available, ensuring the accumulator fits the application, rather than forcing the application to fit the accumulator. The designs are Bladder, Diaphragm and Piston. Available up to 15,000 psi working pressure. Specialized variations of Diaphragm and Bladder Accumulators are available for pulsation dampening, silencing and shock absorption. In addition, HYDAC carries accumulator accessories to ensure proper installation and correct maintenance."
                    reverse
                />
                <ProductItems
                    brand="Hydac Technology Corporation"
                    searchTerm="Hydac"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Hydac/valves.png"
                    title="Valves, Clamps & Accessories"
                    text=" HYDAC manufactures high-pressure ball valves, needle valves, flow control valves, check valves and cartridge valves to ensure safe and reliable operation. A complete range of DIN 3015 clamps for mounting hoses, tubes, and pipes is complimented by HYDAC's specialty and custom mounting solutions. Reservoir accessories include breathers, fluid level indicators, test points, gauge isolators and more."
                />
                <ProductItems
                    brand="Hydac Technology Corporation"
                    searchTerm="Hydac"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Hydac/electronics.png"
                    title="Electronics & Diagnostics"
                    text="HYDAC's product range includes diagnostics, pressure transducers and switches, temperature transducers and switches, flow sensors, level sensors, displays and accessories. HYDAC also offers intrinsically safe pressure transducers and sensors for applications in hazardous environments. OEM pressure transducers and switches are available for use in volume production machines."
                    reverse
                />
                <ProductItems
                    brand="Hydac Technology Corporation"
                    searchTerm="Hydac"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Hydac/compact.png"
                    title="Compact Hydraulics"
                    text="  HYDAC carries compact and high-pressure power units, cartridge valves, manifold assemblies and controls. Compact power units feature a seamless reservoir and pressure-balanced gear pump offering efficiencies over 90%, even at full load, greatly reducing wear and noise. HYDAC also has a wide range of cooling systems for mobile and industrial applications, including combination coolers, pump-filter cooler units, plate-in-frame coolers and brazed plate heat exchangers."
                />
                <ProductItems
                    brand="Hydac Technology Corporation"
                    searchTerm="Hydac"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Hydac/mobile%20directional.png"
                    title="Mobile Directional Control Valves"
                    text=" HYDAC line of directional control spool valves for mobile applications fulfill the requirements of truck-mounted cranes, front end loaders, wheel loaders, skid steer loaders, fork lift trucks, refuse trucks, roll off trucks & trailers, and many other specialized machine applications. The valves are characterized by highly advanced design solutions including customized spools for optimal metering and load interference management. Valve types include monoblock, sectional, cable or radio, pressure control valves and selector valves."
                    reverse
                />
                <ProductItems
                    brand="Hydac Technology Corporation"
                    searchTerm="Hydac"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Hydac/hydraulic-cylinders.png"
                    title="Hydraulic Cylinders"
                    text="HYDAC is your source for custom hydraulic cylinders, available in bore sizes from 1.5' - 30' with stroke lengths up to 30'. Various engineered designs are available, including: welded, mobile type, mill type, custom hybrids, special custom tie rod type, and double rod end. Customers may specify virtually any mounting configuration or port options. These heavy-duty cylinders are ideal for the toughest applications, including: earthmoving, oilfield, logging and forestry equipment; steel and foundry machinery; press applications such as forming, stamping and molding; cranes and lifting equipment; and many others."
                />
                <SectionHeader
                    text="Articles & Videos"
                />
                <ArticlesDiv>
                    <VideoDiv>
                        <Videos
                            src="https://www.youtube.com/embed/dNRz2Efm8o8"
                        />
                        <Videos
                            src="https://www.youtube.com/embed/M0yLeDeEStQ"
                        />
                        <Videos
                            src="https://www.youtube.com/embed/awxk3lFYGIo"
                        />
                    </VideoDiv>
                </ArticlesDiv>
                <SectionHeader
                    text="Related Links"
                />
                <RelatedLinkDiv>
                    <RelatedLink
                        href="http://www.hydacusa.com/"
                        text="Hydac's Website"
                        icon="globe-americas"
                    />
                    <RelatedLink
                        searchTerm="Hydac"
                        text="Shop Hydac Products"
                        icon="shopping-cart"
                    />
                    <RelatedLink
                        href="https://www.youtube.com/playlist?list=PLZbHgsYLXoyyFXduUAZ8C9VwdnmRJfgIJ"
                        text="Videos"
                        icon={faYoutube}
                    />
                    <RelatedLink
                        href="/pages/resources/catalog-request"
                        text="Hydac Catalogs"
                        icon="address-book"
                    />
                </RelatedLinkDiv>
            </Container>
        </>
    )
}