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

export function haskel() {
    const description = 'Haskel International, Inc. is the world\'s leading manufacturer of high-pressure liquid pumps, ' +
        'gas boosters, air pressure amplifiers, and high pressure systems and accessories. For over a half-century, the ' +
        'Company has been recognized as a leader in high-pressure technology. Haskel’s products have a wide range of ' +
        'applications generally focused on the pressurization, transfer, storage or control of liquids and gases under ' +
        'pressure. Typically, the applications include pressure testing, work holding and actuation, transferring and ' +
        'mixing of liquids and gases under pressure and generally ensuring the effectiveness of the customer\'s ' +
        'production and quality processes. Haskel\'s products are frequently used in safety devices and the protection ' +
        'of the environment.'

    return (
        <>
            <Helmet>
                <title>Haskel Authorized Distributor | Airline Hydraulics</title>
                <meta name="description" content="Shop online for Haskel products from Airline Hydraulics, a leading distributor. Find products and information on air pressure amplifiers, air-driven liquid pumps, air and hydraulic-driven gas boosters."/>
            </Helmet>
            <FeaturedBrandLogo src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/Haskel.png" />
            <Container>
                <H1 text="Haskel"/>
                <BrandDetail
                    text={description}
                />
                <ShopProductBtn
                    searchTerm="Haskel"
                    text="Shop Products"
                />
                <SectionHeader
                    text="Products"
                />
                <ProductItems
                    searchTerm="Haskel"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Haskel/Air-pressure.png"
                    text={(
                        <div>
                            <p>Haskel air pressure amplifiers offer the most comprehensive operating range in the industry, combining simple principles of operation with rugged construction suitable for the most demanding industrial applications.  Capable of producing pressure outputs up to 5000 psi (345 bar), Haskel air amplifiers are compact, require no electrical or mechanical drive connections, are powered by the same air that they amplify, and can be mounted in any position.</p>
                            <ul>
                                <li>Infinitely variable outlet pressure and flow capability</li>
                                <li>No heat, flame or spark risk</li>
                                <li>No air line lubrication required - eliminates oily exhausts</li>
                                <li>Long seal life with easy maintenance</li>
                                <li>Wide range of models, controls and options</li>
                                <li>Wide range of standard and custom systems</li>
                            </ul>
                        </div>
                    )}
                    title="Air pressure amplifiers"
                />
                <ProductItems
                    searchTerm="Haskel"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Haskel/Air-driven.png"
                    title="Air-driven liquid pumps"
                    text=" Air Driven Pumps are used industrially to pump a wide variety of liquids, handling a consistency range from thin and viscous to thick slurries. The pumps are ideal when flammable gas is present, requiring no electricity to work and delivering constant flow and a consistently high pressure. Liquids handled include, but are not limited to – petroleum based oils, water, diesel fuel, most phosphate-ester based fire-resistant hydraulic fluids, petroleum based solvents, Skydrol and Aerosafe fluid, deionized water and demineralized water."
                    reverse
                />
                <ProductItems
                    searchTerm="Haskel"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Haskel/Air-hydraulic.png"
                    title="Air & hydraulic-driven gas boosters"
                    text={(
                        <div>
                            <p>Haskel Gas Boosters are used to clean and boost the pressures — up to 39,000 psi (2690 bar) — of most types of gas, such as oxygen, argon and hydrogen. A Gas Booster eliminates the need for potentially more costly gas stored in higher-pressure supply cylinders. Instead, you will be able to boost gas repeatedly to the required pressures in a safe, reliable manner, with no heat, flame or spark risk.</p>
                        </div>
                    )}
                    additionalText={(
                        <div>
                            <p>Gas Boosters are ideal for increasing gas pressure, transferring high-pressure gas, charging cylinders and scavenging.</p>
                            <ul>
                                <li>Air driven - no electricity required</li>
                                <li>No airline lubricator required</li>
                                <li>Hydrocarbon free - separation between air and gas sectionss</li>
                                <li>Pressures to 39,000 psi (2690 bar)</li>
                                <li>Wide range of models</li>
                                <li>Built-in-cooling on most models</li>
                                <li>Easy-to-use automatic controls</li>
                                <li>Standard and custom systems available</li>
                            </ul>
                            <p>Before you think about what you are building next, think about how you will defend it. You need a device with connected and communicating built-in electronics, ability to generate the data to help you optimize your facilities performance, and the ability to mitigate arc ﬂash keeping your employees, customers and end-users safe. With Eaton’s new globally rated Power Defense™ molded case circuit breakers, you can now plan with conﬁdence. Start planning your defense now.</p>
                        </div>
                    )}
                />
                <SectionHeader
                    text="Articles & Videos"
                />
                <ArticlesDiv>
                    <Articles
                        src="https://www.haskel.com/-/media/images/haskel/blog/hydrogen-mobility-in-the-us/insider-evs-us-sales.png?mh=301&mw=624"
                        text="Three Major Signs that May Change the Future of Hydrogen Mobility in the U.S."
                        link="https://www.haskel.com/en-us/blog/hydrogen-mobility-in-the-us"
                        detail="As the global hydrogen economy makes significant progress, investing in the innovation and infrastructure needed to make fuel cell vehicles a powerful tool in achieving emissions targets, where is the U.S.?
                        The United States has largely been considered a bystander to the hydrogen mobility movement in recent years. While there are FCEV (fuel cell electric vehicles) passenger cars commercially available and"
                    />
                    <Articles
                        src="https://www.haskel.com/-/media/images/haskel/blog/driving-consumer-adoption/haskel-toyota-shoot-sunderland-min06.png?mh=1872&mw=1140"
                        text="Driving Consumer Adoption in Hydrogen Mobility Market"
                        link="https://www.haskel.com/en-us/blog/driving-consumer-adoption-in-hydrogen-mobility"
                        detail="One of hydrogen mobility’s biggest barriers to widespread adoption is consumer awareness and education. Despite fuel cell electric vehicles (FCEVs) and hydrogen-powered technology being far from new, there are still several misconceptions and a lack of consumer information."
                    />

                    <Articles
                        src="https://www.haskel.com/-/media/images/haskel/blog/embracing-industry-iot/iiot_header.jpg?mh=229&mw=1140"
                        text="Embracing the Industrial IoT to Advance High-Pressure Manufacturing"
                        detail="The “Internet of Things (IoT)” is a concept that has gained considerable exposure over the past decade, becoming increasingly embedded in household objects in order to more easily enable the sending and receiving of data. The IoT has already significantly changed the way that we live and work (Amazon’s Alexa, anyone?)."
                        link="https://www.haskel.com/en-us/blog/embracing-the-industrial-iot-to-advance-high-pressure-manufacturing"
                    />
                </ArticlesDiv>

                <VideoDiv>
                    <Videos
                        src="https://www.youtube.com/embed/szMXUOhItw4"
                    />
                    <Videos
                        src="https://www.youtube.com/embed/rCNbmx4f7HE"
                    />
                    <Videos
                        src="https://www.youtube.com/embed/5uFHJFec9bI"
                    />
                </VideoDiv>
                <SectionHeader
                    text="Related Links"
                />
                <RelatedLinkDiv>
                    <RelatedLink
                        href="https://www.haskel.com/en-us"
                        text="Haskel's Website"
                        icon="globe-americas"
                    />
                    <RelatedLink
                        searchTerm="Haskel"
                        text="Shop Haskel Products"
                        icon="shopping-cart"
                    />
                    <RelatedLink
                        href="https://www.youtube.com/playlist?list=PLZbHgsYLXoywK3588_U-PM_nMe-knQhTj"
                        text="Videos"
                        icon={faYoutube}
                    />
                    <RelatedLink
                        href="/pages/resources/catalog-request"
                        text="Haskel Catalogs"
                        icon="address-book"
                    />
                </RelatedLinkDiv>
            </Container>
        </>
    )
}