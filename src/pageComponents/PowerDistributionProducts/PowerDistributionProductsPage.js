import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'

const Container = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
`
const FeaturedBrandLogo = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 80px 0;
    background-image: url('https://media.istockphoto.com/vectors/abstract-grey-and-white-tech-geometric-corporate-design-background-vector-id1002881104?s=2048x2048');
    background-repeat: no-repeat;
    background-size: cover;
  `
const BrandDetailsContainer = styled.div`
    display: flex;
    max-width: 1200px;
    width: 100%;
    flex-wrap: wrap;
    margin: 0 auto;
  `
const ProductsDetails = styled.div`
    display: flex;
    flex-wrap: wrap;
    font-size: 16px;
    margin: 0px 30px 0 30px;
    align-content: center;
    flex: 2;
    flex-direction: column;
`
const AirlineDistributorH1 = styled.h1`
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
    margin-top: 40px;
`
const DistributorDetails = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 18px;
    margin: 0 0 30px;
`
const ProductsTitle = styled.div`
    font-size: 25px;
    color: #555555;
    text-transform: uppercase;
    letter-spacing: 2px;
    display: flex;
    flex-wrap: nowrap;
    margin-right: 40px;
    min-width: max-content;
`
const SectionDiv = styled.div`
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    margin: 40px 0;
    align-items: center;
`
const ProductsDiv = styled.div`
    display: flex;  
    flex-wrap: nowrap;
    margin: 20px 0 20px 0;
    background-color:  #f2f3f4;
    padding: 15px 
`
const ProductsH4 = styled.a`
    margin: 0 auto;
    color: 	#000000;
    margin-bottom: 15px;
    font-size: 25px;
    font-weight: bold;
    &:hover{
        color: #b51029;
        text-decoration: none;
    }
`
const BorderBottom = styled.div`
    display: flex;
    border-bottom: 1px solid #555555;
    flex-grow: 99;
  `
const RelatedLinkCircle = styled.div`
    margin: 0 auto;
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
 `
const LinkStyle = styled.a`
    color: #246696;
    font-size: 16px;
    position: absolute;
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
    padding: 0 15px;
    background-color: #f2f3f4;
    width: 200px;
    height: 200px;    
    border-radius: 50%;
    &:hover{
    color: #133752 ;
    text-decoration: none;
    }
 `
const ListItemDiv = styled.div`
    font-size: 15px;
    margin-top: 10px;
    display: flex;
`
const FontAwesomeDiv = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 40px;
    margin-bottom: 20px;
    color: #DB1633;
    &:hover{
    color: #555555;
    }
`
const LinkStyleDiv = styled.div`
    display: flex;
    justify-content: center;
    height: 200px;
    width: 200px;
`
const LongProductDetails = styled.p`
    margin:0;
`
const ShowMoreBtn1 = styled.button`
    font-size: 14px;
    border: none;
    border-radius:2em;
    padding: 4px 10px;
    margin: 0 auto;
    outline: none;
    background-color: #f2f3f4;
`
const ShopProducts = styled.a`
    color: #246696;
    font-size: 14px;
    margin-top: 10px;
`
const ImgDiv = styled.div`
    display: flex;
    flex: 1;
    max-width: 350px;
    height: 250px;
`
const Img = styled.img`
    width: 100%;
`
const RelatedLinkDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin: 20px 0;
`
const RelatedContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
`
const BannerDiv = styled.div`
    margin: 0 30px;
    width: 250px;
    height: 115px;
`
const BannerImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: fill;
`
const MainProductDiv = styled.div`
   
`

export default function PowerDistributionProducts() {
    const [showText1, setShowText1] = useState(false);
    return (

        <Container>
            <FeaturedBrandLogo>
                <BannerDiv><BannerImg src="https://www.airlinehyd.com/customer/aihyco/images/eaton_logo_new.png" /></BannerDiv>
                <BannerDiv> <BannerImg src="data:image/png;base64,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" /></BannerDiv>
            </FeaturedBrandLogo>
            <BrandDetailsContainer>
                <AirlineDistributorH1>Power Distribution Products and Electrical Enclosures
        </AirlineDistributorH1>
                <DistributorDetails>For over 65 years, Airline has been manufacturing hydraulic powerunits and building a reputation for engineering excellence. Our Fluid Systems Group provides products and engineered system solutions related to hydraulics, a form of fluid power which enables industrial
                or mobile machinery to move, push, pull, lift, dig or drill. Airline’s Automation Group draws upon years of experience and an expansive inventory
                of motion, power, control, electrical and pneumatic components to deliver automation systems and sub-system solutions that provide precise and reliable performance.
                </DistributorDetails>

                {/*............................... PRODUCTS................................... */}

                <SectionDiv>
                    <ProductsTitle>Products</ProductsTitle>
                    <BorderBottom></BorderBottom>
                </SectionDiv>
                <MainProductDiv>
                    <ProductsDiv>
                        <ImgDiv> <Img src="https://www.eaton.com/content/dam/eaton/products/electrical-circuit-protection/low-voltage-air-circuit-breakers/magnum-dssb-circuit-breakers/Magnum-breaker.jpg" /></ImgDiv>
                        <ProductsDetails>
                            <ProductsH4 href="#">Circuit Protection</ProductsH4>
                            <LongProductDetails>Eaton’s complete line of low and medium voltage circuit breakers are used to provide circuit protection in a wide range of industries, where they protect against overloads and short circuits in conductors. These circuit breakers are applied in panel boards, switchboards, motor control centers, control panels, combination starters, individual enclosures, and as bus duct plug-in units. A partial list of Eaton’s circuit protection offering includes:
            <ShowMoreBtn1 onClick={() => setShowText1(!showText1)}>{showText1 ? <><FontAwesomeIcon icon='minus-circle' size='1x' /> Show Less </> : <><FontAwesomeIcon icon='plus-circle' size='1x' /> Show More  </>} </ShowMoreBtn1>  </LongProductDetails>
                            {showText1 && <div>
                                <ListItemDiv>
                                    <ul>
                                        <li>Molded Case Circuit Breakers</li>
                                        <li>Miniature Circuit Breakers</li>
                                        <li>Rotary Disconnects</li>
                                        <li>Safety Switches</li>
                                    </ul>
                                </ListItemDiv>
                                <LongProductDetails>Before you think about what you are building next, think about how you will defend it. You need a device with connected and communicating built-in electronics, ability to generate the data to help you optimize your facilities performance, and the ability to mitigate arc ﬂash keeping your employees, customers and end-users safe. With Eaton’s new globally rated Power Defense™ molded case circuit breakers, you can now plan with conﬁdence. Start planning your defense now.</LongProductDetails>
                            </div>}
                            <ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop Eaton's Circuit Protection Products</ShopProducts>
                        </ProductsDetails>
                    </ProductsDiv>
                    <ProductsDiv>
                        <ProductsDetails>
                            <ProductsH4 href="#">Contactors, Starters and Protective Relays</ProductsH4>
            Eaton offers the protection your system needs against equipment failure and danger caused by voltage faults, current conditions or excessive load requirements. Their extensive line includes:
            <ListItemDiv>
                                <ul>
                                    <li>Electromechanical Contactors and Starters</li>
                                    <li>Manual Motor Starters</li>
                                    <li>Soft Starters</li>
                                    <li>Monitoring Relays</li>
                                    <li>Motor Protection Relays</li>
                                    <li>Motor Protection Circuit Breakers</li>
                                    <li>Manual Motor Protection</li>
                                </ul>
                            </ListItemDiv>
                            <ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop Eaton's Contactors, Starters and Protective Relayst Products</ShopProducts>
                        </ProductsDetails>
                        <ImgDiv><Img src="https://www.eaton.com/content/dam/eaton/products/industrialcontrols-drives-automation-sensors/s611-soft-starters/s611-soft-starters-product-shot-500x500.jpg" /></ImgDiv>
                    </ProductsDiv>
                    <ProductsDiv>
                        <ImgDiv><Img src="https://www.eaton.com/content/dam/eaton/products/industrialcontrols-drives-automation-sensors/safety-relays-product-shot-500x500.jpg" /></ImgDiv>
                        <ProductsDetails>
                            <ProductsH4 href="#">Safety Contactors</ProductsH4>
            Providing enhanced levels of safety, XTSE contactors integrate to applications to not only achieve the highest safety circuits, but provide additional levels of protection that reinforce end-user safety.
          <ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Learn More about XTSE Safety Contactors</ShopProducts>
                        </ProductsDetails>
                    </ProductsDiv>
                    <ProductsDiv>
                        <ProductsDetails>
                            <ProductsH4 href="#">Distribution and Termination</ProductsH4>
            Power distribution blocks provide a means for termination of up to 12 load wires in a single point while being supplied by a single line. Terminal blocks are suited to conserve space while allowing maximum flexibility, when labor cost reduction and ease of assembly is desired. Eaton’s fuse blocks and holders provide a simple DIN mounting device for protection in control circuits.
            <ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop Eaton's Distribution and Termination Products</ShopProducts>
                        </ProductsDetails>
                        <ImgDiv><Img src="https://www.airlinehyd.com/customer/aihyco/images/distribution_termination.png" /></ImgDiv>
                    </ProductsDiv>
                    <ProductsDiv>
                        <ImgDiv><Img src="https://www.airlinehyd.com/customer/aihyco/images/pushbuttons.png" /></ImgDiv>
                        <ProductsDetails>
                            <ProductsH4 href="#">Pushbuttons, Pilot Lights and Selector Switches</ProductsH4>
            Eaton offers an extensive variety of pushbuttons, pilot lights and selector switches to suit virtually any industrial or commercial application. Choose from:
            <ListItemDiv>
                                <ul>
                                    <li>22 mm Pilot Devices</li>
                                    <li>30 mm Pilot Devices</li>
                                    <li>Stacklights providing illuminated and audible signaling</li>
                                </ul>
                            </ListItemDiv>
                            <ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop Eaton's Pushbuttons, Pilot Lights and Selector Switches Products</ShopProducts>
                        </ProductsDetails>
                    </ProductsDiv>
                    <ProductsDiv>
                        <ProductsDetails>
                            <ProductsH4 href="#">Connectivity</ProductsH4>
            Eaton’s SmartWire-DT system uses a continuous green flat cable located in the control cabinet to connect motor starters, pushbutton actuators, and indicator lights.
            <ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop Eaton's Connectivity Products</ShopProducts>
                        </ProductsDetails>
                        <ImgDiv><Img src="https://www.airlinehyd.com/customer/aihyco/images/connectivity.png" /></ImgDiv>
                    </ProductsDiv>
                    <ProductsDiv>
                        <ImgDiv><Img src="https://www.airlinehyd.com/customer/aihyco/images/relays_timers.png" /></ImgDiv>
                        <ProductsDetails>
                            <ProductsH4 href="#">Relays and Timers</ProductsH4>
            Whether you're a machine builder or end user, control panel designer or facility maintenance manager, Eaton's expansive offering of relay options with customization capabilities can meet all of your specific application requirements:
            <ListItemDiv>
                                <ul>
                                    <li>Easy Programmable Relays</li>
                                    <li>Control Relays</li>
                                    <li>Timing Relays</li>
                                    <li>Monitoring Relays</li>
                                    <li>Machine Tool Relays</li>
                                    <li>Plug-in Relays</li>
                                    <li>Terminal Block Relays</li>
                                </ul>
                            </ListItemDiv>
                            <ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop Eaton's Relays and Timers Products</ShopProducts>
                        </ProductsDetails>
                    </ProductsDiv>
                    <ProductsDiv>
                        <ProductsDetails>
                            <ProductsH4 href="#">Operator Interfaces</ProductsH4>
            Manufacturing environments are complex and require products that offer control, reduce downtime and increase efficiency. Eaton’s electronic operator interfaces (OI) do that while being easy to install, understand, modify and use. The features, hardware design, development software and high quality provide the best value on the market.
            <ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop Eaton's Operator Interfaces Products</ShopProducts>
                        </ProductsDetails>
                        <ImgDiv><Img src="https://www.airlinehyd.com/customer/aihyco/images/operator_interfaces.png" /></ImgDiv>
                    </ProductsDiv>
                    <ProductsDiv>
                        <ImgDiv><Img src="https://www.airlinehyd.com/customer/aihyco/images/HMI-PLCs.png" /></ImgDiv>
                        <ProductsDetails>
                            <ProductsH4 href="#">HMI-PLCs</ProductsH4>
            Eaton's Programmable Logic Controllers (PLCs) are microprocessor-based devices used to control industrial processes or machines. They provide advanced functions, including analog monitoring, control and high speed motion control as well as share data over communication networks.

            <ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop Eaton's HMI-PLCs Products</ShopProducts>
                        </ProductsDetails>
                    </ProductsDiv>
                    <ProductsDiv>
                        <ProductsDetails>
                            <ProductsH4 href="#">Variable Frequency Drives</ProductsH4>
            Adjustable frequency drives (also known as variable frequency drives) adjust a motor's speed to closely match output requirements, resulting in a typical energy savings of 10 to 50 percent.
            <ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop Eaton's Variable Frequency Drives Products</ShopProducts>
                        </ProductsDetails>
                        <ImgDiv><Img src="https://www.airlinehyd.com/customer/aihyco/images/variable_frequency_drives.png" /></ImgDiv>
                    </ProductsDiv>
                    <ProductsDiv>
                        <ImgDiv><Img src="https://www.airlinehyd.com/customer/aihyco/images/Rittal_Enclosure.png" /></ImgDiv>
                        <ProductsDetails>
                            <ProductsH4 href="#">Control Technology, I/O Systems and Automation</ProductsH4>
            Millions of Rittal enclosures have been installed worldwide, providing reliable and secure protection for customers’ valuable equipment and resources. Their industrial enclosures are made from durable, quality materials including powder-coated sheet steel and stainless steel. Even in extreme conditions, stainless steel enclosures are wash-down friendly and corrosion resistant, ensuring a clean, consistent internal environment. With a wide range of sizes and door hinge configurations, Rittal offers an enclosure suitable for any application environment. Choose from:            <ListItemDiv>
                                <ul>
                                    <li>Junction Boxes</li>
                                    <li>Wallmount Enclosures</li>
                                    <li>Floormount Enclosures</li>
                                    <li>Freestanding Enclosures</li>
                                    <li>Modular Enclosures</li>
                                    <li>Operator Interface Enclosures</li>
                                </ul>
                            </ListItemDiv>
                            <ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop Rittal's Control Technology, I/O Systems and Automation Products</ShopProducts>
                        </ProductsDetails>
                    </ProductsDiv>
                    <ProductsDiv>
                        <ProductsDetails>
                            <ProductsH4 href="#">Interface Technology and Switching Devicess</ProductsH4>
            Rittal’s climate control products offer perfect solutions for forward-thinking and comprehensive process control. Perfectly coordinated enclosure systems, climate control technology and remote monitoring systems provide state-of-the-art security and availability for your production facility. Rittal is able to develop customized climate control solutions for virtually any application. Identical installation cutouts for a variety of air conditioners, heat exchangers and fans make the installation of climate control simple and adaptable for your individual cooling needs. Choose from:
            <ListItemDiv>
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
                            </ListItemDiv>
                            <ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop Rittal's Interface Technology and Switching Devicess Products</ShopProducts>
                        </ProductsDetails>
                        <ImgDiv><Img src="https://www.airlinehyd.com/customer/aihyco/images/Rittal_Climate.png" /></ImgDiv>
                    </ProductsDiv>
                </MainProductDiv>


                {/*.............................. RELATED LINK ................................... */}

                <RelatedLinkDiv>
                    <SectionDiv>
                        <ProductsTitle>Related Links</ProductsTitle>
                        <BorderBottom></BorderBottom>
                    </SectionDiv>
                    <RelatedContainer>
                        <RelatedLinkCircle>
                            <LinkStyleDiv>
                                <LinkStyle href="#" target="_blank">
                                    <FontAwesomeDiv>
                                        <FontAwesomeIcon icon='globe-americas' size='4x' />
                                    </FontAwesomeDiv>
               Website
               </LinkStyle>
                            </LinkStyleDiv>
                        </RelatedLinkCircle>
                        <RelatedLinkCircle>
                            <LinkStyleDiv>
                                <LinkStyle href="#" target="_blank">
                                    <FontAwesomeDiv>
                                        <FontAwesomeIcon icon={faYoutube} size='4x' />
                                    </FontAwesomeDiv>
                Videos
                </LinkStyle>
                            </LinkStyleDiv>
                        </RelatedLinkCircle>
                        <RelatedLinkCircle>
                            <LinkStyleDiv>
                                <LinkStyle href="#" target="_blank">
                                    <FontAwesomeDiv>
                                        <FontAwesomeIcon icon='shopping-cart' size='4x' />
                                    </FontAwesomeDiv>
                shop
                </LinkStyle>
                            </LinkStyleDiv>
                        </RelatedLinkCircle>
                        <RelatedLinkCircle>
                            <LinkStyleDiv>
                                <LinkStyle href="#" target="_blank">
                                    <FontAwesomeDiv>
                                        <FontAwesomeIcon icon='address-book' size='4x' />
                                    </FontAwesomeDiv>
                Catalogs
                </LinkStyle>
                            </LinkStyleDiv>
                        </RelatedLinkCircle>
                    </RelatedContainer>
                </RelatedLinkDiv>
            </BrandDetailsContainer>
        </Container >

    );
}

