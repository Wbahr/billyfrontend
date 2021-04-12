import React from 'react'
import styled from 'styled-components'
import FeaturedBrandLogo from '../uiComponents/FeaturedBrandLogo'
import H1 from '../uiComponents/H1'
import BrandDetail from '../uiComponents/BrandDetail'
import ShopProductBtn from '../uiComponents/ShopProductBtn'
import SectionHeader from '../uiComponents/SectionHeader'
import ProductItems from '../uiComponents/ProductItems'
import Articles from '../uiComponents/Articles'
import Videos from '../uiComponents/Videos'
import RelatedLink from '../uiComponents/RelatedLink'

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

export default function Paccar() {

    return (
        <>
            <FeaturedBrandLogo src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/paccar-logo.png" />
            <Container>
                <H1 text="Paccar"/>
                <BrandDetail
                    text="PACCAR Winch Division is the industry leader in the design and manufacture of winch, hoist and drive systems. Their products are sold under the brands of Braden, Carco and Gearmatic. PACCAR manufactures high quality, high value winches, hoists and drive systems and offers custom-engineered products that meet the highest manufacturing standards."
                />
                <ShopProductBtn
                    searchTerm="Paccar"
                    text="Shop Products"
                />
                <SectionHeader
                    text="Products"
                />
                <ProductItems
                    searchTerm="Paccar"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Paccar/bg_series.png"
                    text="Braden’s BG Series is designed for long life and efficient operation to meet a variety of applications—from marine industry boom hoists to the dynamic swing winch systems used on dredges. Dynamic and static braking features provide safe, smooth operation."
                    title="Braden BG Series Planetary Hoists"
                    additionalText={(
                        <div>
                            <p>Standard Features:</p>
                            <ul>
                                <li>Multi-disc spring applied, hydraulically released brake to hold the load even if a hydraulic line brakes</li>
                                <li>Anti-friction bearings used throughout to maximize efficiency</li>
                                <li>Brake valve for smooth performance</li>
                                <li>Full load wire rope anchor</li>
                                <li>High-efficiency motor</li>
                            </ul>
                            <p>Optional:</p>
                            <ul>
                                <li>Gear ratios, motor displacements and drum sizes to tailor winch to specific applications</li>
                                <li>Personnel Rating in compliance with API 2C</li>
                            </ul>
                        </div>
                    )}
                />
                <ProductItems
                    searchTerm="Paccar"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Paccar/plantary_swing.png"
                    text="The compact and durable Braden SD Planetary Swing Drive offers superior performance in a wide range of cost-effective configurations that provide turnkey power solutions for utility and construction applications."
                    title="Braden Planetary Swing Drives"
                    additionalText={(
                        <div>
                            <p>Features:</p>
                            <ul>
                                <li>20,000–110,000 lb-in. (2,260–12,428 N·m output torque range)</li>
                                <li>Standard SAE motor mounting flanges/input shafts</li>
                                <li>Static/dynamic brake options</li>
                                <li>Heat-treated alloy steel ring gear</li>
                                <li>High-strength pinion</li>
                                <li>Heavy-duty bearing design</li>
                                <li>Optional eccentric ring for gear backlash adjustment</li>
                                <li>Optional LoadSense system (select models)</li>
                            </ul>
                            <p>Optional:</p>
                            <ul>
                                <li>Readily available torque and motor options</li>
                                <li>Robust side-load capacity</li>
                                <li>Low-decibel operation</li>
                                <li>Long-lasting, reliable performance</li>
                                <li>Designed for minimal backlash</li>
                            </ul>
                        </div>
                    )}
                    reverse
                />
                <ProductItems
                    searchTerm="Paccar"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/no-image.jpg"
                    title="PD18D Utility Bumper"
                    text={(
                        <div>
                            <p>PD18D Standard Features:</p>
                            <ul>
                                <li>20,000 lbs First Layer Line Pull</li>
                                <li>Composite bumper is 100 to 150 lbs. lighter than standard steel bumper packages</li>
                                <li>20,000 lbs. first layer line pull</li>
                                <li>Designed for SAE J706 compliance</li>
                                <li>Low-speed high-torque hydraulic motor</li>
                                <li>Hydraulic brake valve for precision load control</li>
                                <li>Jaw clutch with negative draft for positive clutch engagement</li>
                                <li>Extension shaft rotates at 4 times the cable drum speed</li>
                            </ul>

                        </div>
                    )}
                    additionalText={(
                        <div>
                            <p>PD18D Standard Features:</p>
                            <ul>
                                <li>Light weight—100 to 150 lb lighter than standard steel bumper packages</li>
                                <li>Corrosion resistant—the composite material is designed to endure all environments</li>
                                <li>Improved style—designed to complement modern aerodynamic vehicle body styles</li>
                            </ul>
                            <p>Light Weight</p>
                            <ul>
                                <li>More than 120 lbs lighter than standard bumper packages</li>
                            </ul>
                            <p>Corrosion Resistance</p>
                            <ul>
                                <li>The composite material is designed to endure all environments</li>
                            </ul>
                            <p>Improved Style</p>
                            <ul>
                                <li>Designed to complement the new aerodynamic body styles</li>
                            </ul>
                            <p>Optimized Design</p>
                            <ul>
                                <li>The bumper, winch, and mounting are engineered to provide the lowest weight and longest life in the industry.</li>
                            </ul>

                        </div>
                    )}
                />
                <SectionHeader
                    text="Articles & Videos"
                />
                <ArticlesDiv>
                    <Articles
                        src="https://www.paccarwinch.com/images/c9388ef0-1d48-49c9-91bf-a140a5528245"
                        text="PACCAR Winch Believes in SafetyPACCAR Winch Believes in Safety"
                        detail="PACCAR Winch believes in safety. We provide hands-on training, build products with rigorous safety standards, and encourage preparedness in a day-to-day work environment. Of course, this dedication to protect those involved in our industry reflects on our employees."
                        link="https://www.paccarwinch.com/media/display/55a70e8a-0587-4044-b8da-1da867004d79?listtype=news"
                    />
                    <Articles
                        src="https://www.paccarwinch.com/images/4690f8cc-8b53-4916-b29c-7ee9650a4475"
                        text="PACCAR Winch Presents Educational Session on Hoist Safety at NATE UNITE’s 25th annual Conference."
                        detail="NATE UNITE’s 25th annual conference was this week in Raleigh, North Carolina. PACCAR Winches Training Manager Clint Ross and North American Sales Manager Jim Braden presented an educational session on hoist safety.
					NATE: The Communications Infrastructure Contractors Association is a non-profit trade association in the wireless and broadcast infrastructure industries providing a unified voice for tower erection, maintenance and service companies."
                        link="https://www.paccarwinch.com/media/display/b6c0645c-76eb-4d26-9933-506c1a3c413a?listtype=news"
                    />
                    <Articles
                        src="https://www.paccarwinch.com/images/55d9676f-c142-42f5-afdf-42c80b700509"
                        text="PACCAR Winch Announces New Vice President of Sales & Marketing"
                        detail="We are pleased to announce that Roger Kelly has joined PACCAR Winch as the Vice President of Sales and Marketing. Mr. Kelly brings 30 years of operations and sales experience including Business Manager at Hilti, Business Development at Ametek, and Vice President of Sales and Marketing at Bliss Industries.  We're excited to have him as an integral leader at PACCAR Winch."
                        link="https://www.paccarwinch.com/media/display/fb0c092f-7300-47a4-9a6e-d2831e300d52?listtype=news"
                    />
                </ArticlesDiv>

                <VideoDiv>
                    <Videos
                        src="https://www.youtube.com/embed/2XcUGpjPEcw"
                    />
                    <Videos
                        src="https://www.youtube.com/embed/2XcUGpjPEcw"
                    />
                    <Videos
                        src="https://www.youtube.com/embed/2XcUGpjPEcw"
                    />
                </VideoDiv>
                <SectionHeader
                    text="Related Links"
                />
                <RelatedLinkDiv>
                    <RelatedLink
                        href="http://www.paccarwinch.com/"
                        text="Paccar's Website"
                        icon="globe-americas"
                    />
                    <RelatedLink
                        searchTerm="Paccar"
                        text="Shop Paccar Products"
                        icon="shopping-cart"
                    />
                    <RelatedLink
                        href="/pages/resources/catalog-request"
                        text="Paccar Catalogs"
                        icon="address-book"
                    />
                </RelatedLinkDiv>
            </Container>
        </>
    )
}