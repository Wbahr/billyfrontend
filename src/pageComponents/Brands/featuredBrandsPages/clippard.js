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

export function clippard() {
    const description = 'Clippard Instrument Laboratory, Inc. is the leading manufacturer of miniature pneumatic valves,' +
        ' electronic valves, brass, stainless, and corrosion resistant cylinders, modular components, and fittings. The ' +
        'Minimatic line includes over 3,400 standard products and the company’s growth continues today maintaining its ' +
        'position as the industry’s most complete supplier of quality, miniature pneumatic components.'

    return (
        <>
            <Helmet>
                <title>Clippard Authorized Distributor | Airline Hydraulics</title>
                <meta name="description" content="Shop online for Clippard products from Airline Hydraulics, a leading distributor. Find products and information on pneumatic cylinders, directional control valves, electronic valves, circuit boards, I/O modules, fittings, hose, tubing, and air prep equipment."/>
            </Helmet>
            <FeaturedBrandLogo src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/Clippard.png" />
            <Container>
                <H1 text="Clippard"/>
                <BrandDetail
                    text={description}
                />
                <ShopProductBtn
                    searchTerm="Clippard"
                    text="Shop Products"
                />
                <SectionHeader
                    text="Products"
                />
                <ProductItems
                    searchTerm="Clippard"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Clippard/cylinders.png"
                    text='Minimatic Cylinders range from 5/32" to 1 1/8" in bore size, and are available in spring return and double acting models, with a full line of associated devices for mounting and use.'
                    title="Cylinders"
                />
                <ProductItems
                    searchTerm="Clippard"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Clippard/Directional%20control%20valves.png"
                    title="Directional Control Valves"
                    text=" Every air system is unique, and Clippard has the air valve you need. Clippard control valves are available in poppet or spool design; 2-, 3-, or 4-way functions, in sizes from #3-56 and #10-32 (M5) through 1/8” NPT (G1/8) ports; and for pressures to 300 psig/21 bar. They are available with solenoid, air pilot, manual and mechanical actuators. Mounting styles include in-line, panel mount, manifold mount or clearance holes for mounting screws."
                    reverse
                />
                <ProductItems
                    searchTerm="Clippard"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Clippard/electronic%20valves.png"
                    title="Electronic Valves"
                    text={(
                        <div>
                            <p>Clippard’s product range includes:</p>
                            <ul>
                                <li>Mouse Valve Series – The industry standard for leak-free operation and fast response</li>
                                <li>Proportional Valve Series – Direct-operated performance from Clippard’s EVP and SCPV Series valves</li>
                                <li>10 & 15 mm Valve Series – 2- or 3-way operation with detachable coil and connector for orientation options.</li>
                                <li>Maximatic & Valve Series – General Purpose, 2-, 3- and 4-way configurations for maximum value and maximum performance.</li>
                                <li>Custom Electronic Valves – Clippard has years of engineering and technical experience and is a leader in manufacturing special products for a broad spectrum of industries.</li>
                            </ul>
                        </div>
                    )}
                />
                <ProductItems
                    searchTerm="Clippard"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Clippard/circuit%20boards.jpg"
                    title="Circuit Boards & I/O Modules"
                    text="Clippard clear acrylic pneumatic circuit boards are designed to provide a compact and highly efficient pneumatic control system, with the use of Clippard modular components and other Clippard products. Clippard’s pneumatic I/O devices are ideal for Intrinsically Safe environments; simple custom machinery requiring only one program; and PLC type applications that have all pneumatic components for inputs and outputs. This system provides a safe, simple, and cost-efficient answer for pneumatic automation control solutions."
                    reverse
                />
                <ProductItems
                    searchTerm="Clippard"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Clippard/fitting.jpg"
                    title="Fittings"
                    text="Clippard precision fittings will save you time, space, and money when designing versatile, productive, trouble free, pneumatic circuits. Our endless variety of fittings insure that you find just the right “fit” when plumbing pneumatic circuits or assemblies. These fittings are small in size but large in performance, allowing for streamlining of pneumatic assemblies and eliminating the need for larger, more expensive, cumbersome fittings"
                />
                <ProductItems
                    searchTerm="Clippard"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/no-image.jpg"
                    title="Hose & Tubing"
                    text="Clippard offers a variety of miniature hose and tubing from copper and nylon tubing to flexible urethane, and vinyl."
                    reverse
                />
                <ProductItems
                    searchTerm="Clippard"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Clippard/air%20prep%20equipment.png"
                    title="Air Prep Equipment"
                    text={(
                        <div>
                            <p><Span>Filters :</Span> Filters capture solid particulate and remove water by “spinning” the air centrifugally. Water and larger particles are thrown against the side of the bowl where they condense and/or fall to the lower part of the bowl. Smaller particles are captured as the air flows through the filter element.</p> 
                            <p><Span>Regulators :</Span> Controlling pressure is an important requirement in all systems. Maximatic Regulators are adjustable from 7 to 125 psig. For applications requiring better resolution, 7 to 30 or 7 to 60 psig models with spring are available. The #10-32 size is a piston-style due to its small size, while the 1/8” to 1” are a diaphragm design.</p> 
                            <p><Span>Lubricators :</Span> Pneumatic actuators and valves perform better and last longer when properly lubricated. The bowl serves as a reservoir for the oil and supplies oil through the pick-up tube when pressurized. The amount of oil dispersed is controlled by an adjustable needle valve.</p> 
                        </div>
                    )}
                />
                <SectionHeader
                    text="Articles & Videos"
                />
                <ArticlesDiv>
                    <Articles
                        src="https://www.clippard.com/cms/sites/default/files/wiki_images/cordis-high-resolution-proportional-pressure-controls_1.png"
                        text="6 Ways Clippard's New Cordis EPR is Revolutionizing Electronic Pressure Control"
                        link="https://www.clippard.com/cms/wiki/6-ways-clippards-new-cordis-epr-revolutionizing-electronic-pressure-control"
                        detail="The future of proportional control has arrived—and it's digital! The Clippard Cordis is a revolutionary microcontroller primed for escape velocity from a proportional control market that has grown stagnant."
                    />
                    <Articles
                        src="https://www.clippard.com/cms/sites/default/files/wiki_images/stepper-motor-diagram.jpg"
                        text=" How Stepper Motors Provide Precision Control"
                        link="https://www.clippard.com/cms/wiki/how-stepper-motors-provide-precision-control"
                        detail="Stepper motors are used in a variety of applications to provide a means for tightly controlled motion. But what is a stepper motor, and how does it work? "
                    />

                    <Articles
                        src="https://www.clippard.com/cms/sites/default/files/wiki_images/digital-proportional-pressure-controls.jpg"
                        text="New Cordis Proportional Pressure Controls"
                        detail="Clippard Releases New High Resolution Digital Proportional Pressure Controls"
                        link="https://www.clippard.com/cms/wiki/press-release-new-cordis-proportional-pressure-controls"

                    />
                </ArticlesDiv>

                <VideoDiv>
                    <Videos
                        src="https://www.youtube.com/embed/o-3qARvYH8E"
                    />
                    <Videos
                        src="https://www.youtube.com/embed/k--xLEFsYoY"
                    />
                    <Videos
                        src="https://www.youtube.com/embed/dWKfQ-LcRSM"
                    />
                </VideoDiv>
                <SectionHeader
                    text="Related Links"
                />
                <RelatedLinkDiv>
                    <RelatedLink
                        href="http://www.clippard.com/"
                        text="Clippard's Website"
                        icon="globe-americas"
                    />
                    <RelatedLink
                        searchTerm="Clippard"
                        text="Shop Clippard Products"
                        icon="shopping-cart"
                    />
                    <RelatedLink
                        href="http://www.youtube.com/playlist?list=PLZbHgsYLXoyypueELRwWRNdFQnrm-Mv5-"
                        text="Videos"
                        icon={faYoutube}
                    />
                    <RelatedLink
                        href="/pages/resources/catalog-request"
                        text="Clippard Catalogs"
                        icon="address-book"
                    />
                </RelatedLinkDiv>
            </Container>
        </>
    )
}