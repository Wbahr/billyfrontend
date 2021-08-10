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
export function omron() {
    const description = 'Omron Automation & Safety is a worldwide company and leading manufacturer of technologically ' +
        'advanced industrial automation products offering unsurpassed application expertise. With core competences in ' +
        'sensing, control, vision and panel components, Omron is also a world-class supplier of complete motion control ' +
        'solutions including programmable logic controllers (PLCs), machine controllers, human machine interfaces, ' +
        'variable frequency drives and servos.'
    
    return (
        <>
            <Helmet>
                <title>Omron Authorized Distributor | Airline Hydraulics</title>
                <meta name="description" content="Shop online for Omron products from Airline Hydraulics, a leading distributor. Find products and information on automation, motion and drives, sensing, safety products, control components, and switching components."/>
            </Helmet>
            <FeaturedBrandLogo src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/OMRON_logo.png" />
            <Container>
                <H1 text="Omron"/>
                <BrandDetail
                    text={description}
                />
                <ShopProductBtn
                    searchTerm="Omron"
                    text="Shop Products"
                />
                <SectionHeader
                    text="Products"
                />
                <ProductItems
                    brand="Omron Electronics LLC"
                    searchTerm="Omron"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Omron/automation_systems.png"
                    text=" Omron's Automation Systems include programmable controllers that support machine control, and network/software products to support easy information exchange with host systems."
                    additionalText={(
                        <div>
                            <ul>
                                <li><Span>Machine Automation Controllers</Span> - Omron's Sysmac NJ machine automation controller integrates logic, motion, vision and networks using their new software, Sysmac Studio.</li>
                                <li><Span>Programmable Logic Controllers</Span> - Omron offers smart remote I/Os, compact CP1 PLCs, the high-performance modular CJ2, and the backplane-based CS1 series for large applications. All Omron PLCs are programmed and commissioned via CX-Programmer, a part of Omron's CX-One automation suite.</li>
                                <li><Span>Remote I/O </Span> - Omron offers open networks such as Ethernet/IP, EtherCAT, DeviceNET, and PROFIBUS-DP that allow easy integration in existing installations and ensure compatibility with third party systems. In addition, Omron offers Compobus/S, Omron's proprietary sensor/actuator bus, for cost efficient, fast and program-less configuration.</li>
                                <li><Span>Human Machine Interfaces (HMIs)</Span> - Omron's range includes the NS Series scalable HMI, the NB Series compact touch screens, the NV Series Micro-HMI, and the NT function-key type displays.</li>
                                <li><Span>Software</Span> - Omron's software solutions reduce complexity by providing an integrated environment, with single install and lifetime online upgrades, enabling users to design a complete multi-discipline modular automation system.</li>
                            </ul>
                        </div>
                    )}
                    title="Automation Systems"
                />
                <ProductItems
                    brand="Omron Electronics LLC"
                    searchTerm="Omron"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Omron/motion-drives.png"
                    title="Motion & Drives"
                    text={(
                        <div>
                            <p>Omron's Motion & Drives offering includes Sysmac machine automation controllers (described above), motion controllers, servo motors and inverters ideal for positioning, speed and torque controls in various automation systems.</p>
                            <ul>
                                <li><Span>Motion Controllers</Span> - Omron's range of servo systems are unique in offering the highest performance in the most compact size.</li>
                                <li><Span>Servo Systems</Span> - Omron offers smart remote I/Os, compact CP1 PLCs, the high-performance modular CJ2, and the backplane-based CS1 series for large applications. All Omron PLCs are programmed and commissioned via CX-Programmer, a part of Omron's CX-One automation suite.</li>
                                <li><Span>Variable Frequency Drives</Span> - Developed to harmonize motor and machine control, Omron's frequency inverters provide precise operation for fast cyclic operations and torque control capability in open and closed loop configuration.</li>
                            </ul>
                        </div>
                    )}
                    reverse
                />
                <ProductItems
                    brand="Omron Electronics LLC"
                    searchTerm="Omron"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Omron/sensing.png"
                    title="Sensing"
                    text={(
                        <div>
                            <p>OMRON Sensing Components detect, measure, analyze, and process various changes that occur on production sites, such as changes in position, length, height, displacement, and appearance. They also contribute to predicting and preventing future events. Their vast product range includes:</p>
                            <ul>
                                <li>Photoelectric Sensors</li>
                                <li>Fiber Optic Sensors</li>
                                <li>Proximity Sensors</li>
                                <li>Limit Switches</li>
                                <li>Vision Sensors and Systems</li>
                                <li>Measurement Sensors</li>
                                <li>Rotary Encoders</li>
                                <li>Auto Identification Systems (RFID)</li>
                                <li>Ultrasonic Sensors</li>
                            </ul>
                        </div>
                    )}
                />
                <ProductItems
                    brand="Omron Electronics LLC"
                    selectedCategoryId="4141"
                    searchTerm="Omron"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Omron/control.png"
                    title="Control Components"
                    text={(
                        <div>
                            <p>From power suppliers to counters to temperature controllers, we have all needed components for a successful and complete automation solution.</p>
                            <ul>
                                <li>Temperature Controllers</li>
                                <li>Power Supplies</li>
                                <li>Timers</li>
                                <li>Counters</li>
                                <li>Programmable Relays</li>
                                <li>Digital Panel Meters</li>
                                <li>Metering & Monitoring Devices</li>
                            </ul>
                        </div>
                    )}
                    reverse
                />
                <ProductItems
                    brand="Omron Electronics LLC"
                    searchTerm="Omron"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Omron/switching_components.png"
                    title="Switching Components"
                    text={(
                        <div>
                            <p>OMRON Switching Components provide high levels of control, reliability and accuracy with a line that includes the following products:</p>
                            <ul>
                                <li><Span>Electromechanical Relays</Span> - A comprehensive range of general purpose and special purpose industrial relays capable of switching loads from micro-amps to 40 A.</li>
                                <li><Span>Solid-State Relays </Span>- With output current ranging from 2 to 150, these solid state relays are suitable for almost every need.</li>
                                <li><Span>Monitoring Products</Span> - Consisting of single-phase current and voltage relays, three-phase voltage relays and conductive level and leakage controllers, this range is suitable for a wide range of applications.</li>
                                <li><Span>Pushbutton Switches</Span> - This diverse range of high quality 16 or 22 mm pushbutton switches offer practical solutions for industrial applications.</li>
                            </ul>
                        </div>
                    )}
                />
                <ProductItems
                    brand="Omron Electronics LLC"
                    searchTerm="Omron"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Omron/robotics.png"
                    title="Robotics"
                    text=" Omron Robotic automation solutions enhance the most demanding manufacturing lines. Choose from collaborative robots (cobots), industrial SCARA robots, spider robots, six-axis robots, or AIV (Automated Intelligent Vehicle) mobile robots."
                    reverse
                />
   
                <SectionHeader
                    text="Articles & Videos"
                />
                <ArticlesDiv>
                    <Articles
                        src="https://airlinemedia.airlinehyd.com/Static_pages/images/articles/webimage-2F29037D-0898-4BAD-851A0C0E753D96FA.jpg"
                        text="New V275 Series from Omron improves label compliance and quality monitoring"
                        link="https://solutions.haskel.com/blog/embracing-the-industrial-iot-to-advance-high-pressure-manufacturing"
                        detail="Industry-leading automation solutions pioneer Omron Automation Americas recently released a new system for inspecting and verifying labels and barcodes to improve compliance in medical device manufacturing, automotive labeling, food and beverage secondary and tertiary package labeling, and other applications requiring comprehensive label quality monitoring."
                    />
                    <Articles
                        src="https://airlinemedia.airlinehyd.com/Static_pages/images/articles/webimage-E243EBE9-F882-4123-88CEAEEA82C62846.png"
                        text=" Omron provides college students with free access to the Sysmac Studio automation platform."
                        link="https://solutions.haskel.com/blog/a-quiet-change-to-compression-technology-has-arrived"
                        detail="For the college students just getting started on their path to becoming an engineer, automation solutions provider Omron Automation Americas is offering a powerful resource for preparation at a professional level."
                    />

                    <Articles
                        src="https://airlinemedia.airlinehyd.com/Static_pages/images/articles/webimage-E5B4D683-D2CE-49A6-8B9A661D40561A78.jpg"
                        text="Four major safety-related benefits of robots"
                        detail="Manufacturing facilities employ a variety of hazardous machines, and safeguarding is paramount. While traditional safety strategies are designed to mitigate risk in hazardous situations, it’s possible to eliminate this risk altogether by letting robots cover the dangerous tasks. Let’s take a look at a few ways that robots make manufacturing safer overall. "
                        link="https://solutions.haskel.com/blog/4-steps-for-planning-your-high-pressure-gas-liquid-system-purchase"

                    />
                </ArticlesDiv>

                <VideoDiv>
                    <Videos
                        src="https://www.youtube.com/embed/2G2WbqJ4644"
                    />
                    <Videos
                        src="https://www.youtube.com/embed/pAXAG7UPDxw"
                    />
                    <Videos
                        src="https://www.youtube.com/embed/VK0WU0Gu4Tg"
                    />
                </VideoDiv>
                <SectionHeader
                    text="Related Links"
                />
                <RelatedLinkDiv>
                    <RelatedLink
                        href="https://automation.omron.com/en/us/"
                        text="Omron's Website"
                        icon="globe-americas"
                    />
                    <RelatedLink
                        searchTerm="Omron"
                        text="Shop Omron Products"
                        icon="shopping-cart"
                    />
                    <RelatedLink
                        href="https://www.youtube.com/playlist?list=PLZbHgsYLXoyyQ_ahmjAhfhVg6Cvyu7JpU"
                        text="Videos"
                        icon={faYoutube}
                    />
                    <RelatedLink
                        href="/pages/resources/catalog-request"
                        text="Omron Catalogs"
                        icon="address-book"
                    />
                </RelatedLinkDiv>
            </Container>
        </>
    )
}