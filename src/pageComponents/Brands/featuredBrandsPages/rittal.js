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

export function rittal() {
    const description = 'Since 1961, Rittal has designed and manufactured the world’s most comprehensive offering of ' +
        'affordable, reliable and durable industrial enclosures. Rittal cabinets can be found all over the world in ' +
        'some of the most rugged and demanding environments, helping companies, large and small, power their ' +
        'manufacturing operations. The experts here at Airline Hydraulics can help you select the right Rittal product ' +
        'for your application. Our product offering doesn\'t stop at the cabinet. We also provide the electriacl and ' +
        'automation products that fill Rittal enclosures.\n ' +
        'Let us help you take your project from start to finish with our automation engineering services or let our ' +
        'sub-assembly department provide you with a pre-assembled, ready to use unit.'

    return (
        <>
            <Helmet>
                <title>Rittal Authorized Distributor | Airline Hydraulics</title>
                <meta name="description" content={description}/>
            </Helmet>
            <FeaturedBrandLogo src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/RITTAL.png" />
            <Container>
                <H1 text="Rittal"/>
                <BrandDetail
                    text={description}
                />
                <ShopProductBtn
                    searchTerm="Rittal"
                    text="Shop Products"
                />
                <SectionHeader
                    text="Products"
                />
                <ProductItems
                    searchTerm="Rittal"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Rittal/Rittal_Enclosure.png"
                    text={(
                        <div>
                            <p>Millions of Rittal enclosures have been installed worldwide, providing reliable and secure protection for customers’ valuable equipment and resources. Their industrial enclosures are made from durable, quality materials including powder-coated sheet steel and stainless steel. Even in extreme conditions, stainless steel enclosures are wash-down friendly and corrosion resistant, ensuring a clean, consistent internal environment. With a wide range of sizes and door hinge configurations, Rittal offers an enclosure suitable for any application environment. Choose from:</p>
                            <ul>
                                <li>Junction Boxes</li>
                                <li>Wallmount Enclosures</li>
                                <li>Floormount Enclosures</li>
                                <li>Freestanding Enclosures</li>
                                <li>Modular Enclosures</li>
                                <li>Operator Interface Enclosures</li>
                            </ul>
                        </div>
                    )}
                    title="Control Technology, I/O Systems and Automation"
                />
                <ProductItems
                    searchTerm="Rittal"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Rittal/Rittal_Climate.png"
                    text={(
                        <div>
                            <p>Rittal’s climate control products offer perfect solutions for forward-thinking and comprehensive process control. Perfectly coordinated enclosure systems, climate control technology and remote monitoring systems provide state-of-the-art security and availability for your production facility. Rittal is able to develop customized climate control solutions for virtually any application. Identical installation cutouts for a variety of air conditioners, heat exchangers and fans make the installation of climate control simple and adaptable for your individual cooling needs. Choose from:</p>
                            <ul>
                                <li>Air conditioners</li>
                                <li>Air heat exchangers</li>
                                <li>Air-to-water heat exchangers</li>
                                <li>Chillers</li>
                                <li>Fans</li>
                                <li>Heating products</li>
                                <li>Thermostats</li>
                                <li>Humidistats</li>
                            </ul>
                        </div>
                    )}
                    title="Interface Technology and Switching Devicess"
                    reverse
                />
                <SectionHeader
                    text="Articles & Videos"
                />
                <ArticlesDiv>
                    <Articles
                        src="https://www.rittal.us/contents/wp-content/uploads/2020/04/LCP-Display-Screen-504x504.jpg"
                        text="IT Enclosure Climate Control: Closed Loop Cooling for Rack and Row Solutions"
                        detail="Closed Loop Cooling Solutions for IT Enclosures Every data center Facility Manager knows that one of the biggest factors influencing uptime is the effective removal of heat being generated by the equipment – and their job is to remove it."
                        link="https://www.rittal.us/contents/enclosure-climate-control-closed-loop-cooling/"
                    />
                    <Articles
                        src="https://www.rittal.us/contents/wp-content/uploads/2020/04/Phone-in-use-at-data-center-504x504.jpg"
                        text="The 3 Most Important Features of an IT Enclosure"
                        detail="Data Center IT Enclosures: The Most Important Features Are you under the impression that all data center IT enclosures are created equal? Think again. While the dimensions and general functionality of many enclosures may be somewhat similar, some “rise to"
                        link="https://www.rittal.us/contents/it-enclosure-most-important-features/"
                    />
                    <Articles
                        src="https://www.rittal.us/contents/wp-content/uploads/2020/03/Rittal_enclosure_door_open_504px.jpg"
                        text="IT Enclosures and IP Ratings: Why They Matter"
                        detail="Why IP Ratings Matter for IT Enclosures The release of Apple’s iPhone XS and XS Max models in late 2018 came with much fanfare about the phones’ water-resistance – the devices were promoted as having an IP68 certification, indicating that"
                        link="https://www.rittal.us/contents/why-it-enclosure-ip-ratings-matter/"
                    />
                </ArticlesDiv>

                <VideoDiv>
                    <Videos
                        src="https://www.youtube.com/embed/3cPnLfD_1Tw"
                    />
                    <Videos
                        src="https://www.youtube.com/embed/3H3l0PNvlmg"
                    />
                    <Videos
                        src="https://www.youtube.com/embed/tFww-Sk0NSE"
                    />
                </VideoDiv>
                <SectionHeader
                    text="Related Links"
                />
                <RelatedLinkDiv>
                    <RelatedLink
                        href="https://www.rittal.us/"
                        text="Rittal's Website"
                        icon="globe-americas"
                    />
                    <RelatedLink
                        searchTerm="Rittal"
                        text="Shop Rittal Products"
                        icon="shopping-cart"
                    />
                    <RelatedLink
                        href="/pages/resources/catalog-request"
                        text="Rittal Catalogs"
                        icon="address-book"
                    />
                    <RelatedLink
                        href="https://www.youtube.com/channel/UCEqflqvRWzGtG4Zk5Eb2Sxg"
                        text="Videos"
                        icon={faYoutube}
                    />
                </RelatedLinkDiv>
            </Container>
        </>
    )
}