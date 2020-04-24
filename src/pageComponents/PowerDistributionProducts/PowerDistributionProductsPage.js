import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import RittalLogo from '../../imgs/PowerDistributionPage/rittal-logo.jpg'
import EncloseControl from '../../imgs/PowerDistributionPage/Enclosed Control.jpg'
import Electric from '../../imgs/PowerDistributionPage/Electric Motors.jpg'
import Food from '../../imgs/powerDistributionPage/food and bev.png'
import PowerGeneration from '../../imgs/powerDistributionPage/power generation.png'


const Container = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
`
const FeaturedBrandLogo = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 200px 0;
    background-image: url('https://media.istockphoto.com/photos/fiberglass-production-industry-equipment-at-manufacture-background-picture-id1130458099?s=2048x2048');
    // background-image: url('https://media.istockphoto.com/photos/inside-production-hall-picture-id1094819418?s=2048x2048');
    // background-image: url('  https://media.istockphoto.com/photos/home-appliance-quality-control-checks-picture-id1151823344?s=2048x2048');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
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
const AirlineDistributorH4 = styled.h4`
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
    margin-top: 40px;
`
const DistributorDetails = styled.div`
    display: flex;
    font-size: 18px;
    margin: 0 0 30px;
`
const ProductsTitle = styled.div`
    font-size: 25px;
    font-weight: bold;
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
    font-size: 17px;
    margin-top: 10px;
    display: flex;
    margin-left: 40px;
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
    height: 100%;
    object-fit: scale-down;;
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
    width: 150px;
    height: 115px;
`
const BannerImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`
const MainProductDiv = styled.div`
   
`
const BrandDiv = styled.div`
    display: flex;
    flex-direction: column;
`
const DistributorDiv = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 18px;
`

const Industry = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    flex-direction: column;
`
const IndustryCol = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 20px;

`
const IndustryImgDiv = styled.div`
    width: 250px;
    height 200px;
    overflow: hidden;
`
const IndustryImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
const IndustryTextDiv = styled.div`
    margin: 20px 0; 
`
const IndustryText = styled.p`
    text-align: center;
    font-weight: bold;
    margin-bottom: 0;
    font-size: 20px;
    color: #555555;
`
const SubHeaderDiv = styled.div`
    margin-bottom: 30px;
`
const SubHeader = styled.p`
    margin-bottom: 0;
    font-size: 25px;
    
`
const IndustryColDiv = styled.div`
    display: flex;
`

export default function PowerDistributionProducts() {
    const [showText1, setShowText1] = useState(false);
    return (

        <Container>
            <FeaturedBrandLogo>
                {/* <BannerDiv><BannerImg src="https://www.airlinehyd.com/customer/aihyco/images/eaton_logo_new.png" /></BannerDiv> */}
            </FeaturedBrandLogo>
            <BrandDetailsContainer>
                <AirlineDistributorH1>Power Distribution Products and Electrical Enclosures</AirlineDistributorH1>
                <DistributorDiv>
                    <DistributorDiv>Airline is an ISO 9001:2015 certified distributor of fluid power, electrical, and automation products that has been in business for over 65 years. With $12,000,000 of inventory, years of experience in electrical products, and preferred status with vendors such as Eaton and Rittal, Airline has the products and expertise to keep your facility running.
                    In addition to quality products, Airline provides services for facilities such as:
                    <ListItemDiv>
                            <ul>
                                <li>Designing and building custom turnkey conveyor, pick and place, motion control, and vision systems.</li>
                                <li>PLC and motion control programming and start-up assistance.</li>
                                <li>A UL-508A panel shop for the US. and Canada, for designing and building quality industrial control panels and sub-systems.</li>
                                <li>Arc-flash safety consulting and solutions</li>
                            </ul>
                        </ListItemDiv>
                    </DistributorDiv>
                </DistributorDiv>
                <BrandDiv>
                    <AirlineDistributorH4>Airline is an authorized distributor of quality brands such as:</AirlineDistributorH4>
                    <DistributorDetails>
                        <BannerDiv><BannerImg src="https://www.airlinehyd.com/customer/aihyco/images/eaton_logo_new.png" /></BannerDiv>
                        <BannerDiv><BannerImg src={RittalLogo} /></BannerDiv>
                    </DistributorDetails>
                </BrandDiv>

                {/*............................... INDUSTRY................................... */}

                <SectionDiv>
                    <ProductsTitle> industries</ProductsTitle>
                    <BorderBottom></BorderBottom>
                </SectionDiv>
                <Industry>
                    <SubHeaderDiv>
                        <SubHeader>We serve a variety of industries such as:</SubHeader>
                    </SubHeaderDiv>
                    <IndustryColDiv>
                    <IndustryCol>
                        <IndustryImgDiv>
                            <IndustryImg src="https://www.rittal.us/contents/wp-content/uploads/2018/09/Plantfloor_MRO-300x189.png" />
                        </IndustryImgDiv>
                        <IndustryTextDiv>
                            <IndustryText>Plant Floor/MRO</IndustryText>
                        </IndustryTextDiv>
                    </IndustryCol>
                    <IndustryCol>
                        <IndustryImgDiv>
                            <IndustryImg src={PowerGeneration} />
                        </IndustryImgDiv>
                        <IndustryTextDiv>
                            <IndustryText>Power Generation</IndustryText>
                        </IndustryTextDiv>
                    </IndustryCol>
                    <IndustryCol>
                        <IndustryImgDiv>
                            <IndustryImg src={Food} />
                        </IndustryImgDiv>
                        <IndustryTextDiv>
                            <IndustryText>Food & Beverage</IndustryText>
                        </IndustryTextDiv>
                    </IndustryCol>
                    <IndustryCol>
                        <IndustryImgDiv>
                            <IndustryImg src="https://www.rittal.us/contents/wp-content/uploads/2018/09/Manufacturing-300x189.png" />
                        </IndustryImgDiv>
                        <IndustryTextDiv>
                            <IndustryText>Manufacturing</IndustryText>
                        </IndustryTextDiv>
                    </IndustryCol>
                    </IndustryColDiv>
                </Industry>

                {/*............................... PRODUCTS................................... */}

                <SectionDiv>
                    <ProductsTitle>Products</ProductsTitle>
                    <BorderBottom></BorderBottom>
                </SectionDiv>
                <MainProductDiv>
                    <ProductsDiv>
                        <ImgDiv> <Img src="https://www.eaton.com/content/dam/eaton/products/electrical-circuit-protection/industrial-miniature-circuit-breakers/FAZ-RCCB.jpg" /></ImgDiv>
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
                        <ImgDiv><Img src="https://www.airlinehyd.com/customer/aihyco/images/contactors_starters.png" /></ImgDiv>
                    </ProductsDiv>
                    <ProductsDiv>
                        <ImgDiv><Img src="https://www.airlinehyd.com/customer/aihyco/pages/product/xtse_large.png" /></ImgDiv>
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
                        <ImgDiv><Img src="https://www.eaton.com/content/dam/eaton/products/industrialcontrols-drives-automation-sensors/m22-modular-pushbuttons/m22-pushbuttons.jpg" /></ImgDiv>
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
                            <ProductsH4 href="#">Enclosed Control</ProductsH4>
                            Eaton offers one of the broadest lines of enclosed electrical control devices available. These assemblies provide mechanical and electrical protection for operators and equipment.
                            <ListItemDiv>
                                <ul>
                                    <li>Customer-Specific and Special Application</li>
                                    <li>NEMA-Rated Enclosed Control</li>
                                    <li>Non-Combination Box 1 and Box 2 Enclosed Control</li>
                                    <li>Enclosed Control Product Catalog</li>
                                    <li>IEC-Rated Enclosed Control</li>
                                    <li>Lighting Enclosed Control</li>
                                    <li>Soft-Starters Enclosed Control</li>
                                </ul>
                            </ListItemDiv>
                            <ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop Eaton's Enclosed Control Products</ShopProducts>
                        </ProductsDetails>
                        <ImgDiv><Img src={EncloseControl} /></ImgDiv>
                    </ProductsDiv>
                    <ProductsDiv>
                        <ImgDiv><Img src={Electric} /></ImgDiv>
                        <ProductsDetails>
                            <ProductsH4 href="#">Electric Motors</ProductsH4>
                        Eaton's Programmable Logic Controllers (PLCs) are microprocessor-based devices used to control industrial processes or machines. They provide advanced functions, including analog monitoring, control and high speed motion control as well as share data over communication networks.
                    <ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop Eaton's Electric Motors Products</ShopProducts>
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
                            <ProductsH4 href="#">Enclosures</ProductsH4>
                                Millions of Rittal enclosures have been installed worldwide, providing reliable and secure protection for customers’ valuable equipment and resources. Their industrial enclosures are made from durable, quality materials including powder-coated sheet steel and stainless steel. Even in extreme conditions, stainless steel enclosures are wash-down friendly and corrosion resistant, ensuring a clean, consistent internal environment. With a wide range of sizes and door hinge configurations, Rittal offers an enclosure suitable for any application environment. Choose from:
                            <ListItemDiv>
                                <ul>
                                    <li>Push Button Boxes</li>
                                    <li>Junction Boxes</li>
                                    <li>Wallmount Enclosures</li>
                                    <li>Floormount Enclosures</li>
                                    <li>Freestanding Enclosures</li>
                                    <li>Modular Enclosures & HMI Arm Enclosures</li>
                                    <li>Operator Interface Enclosures</li>
                                </ul>
                            </ListItemDiv>
                            <ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop Rittal's Enclosures Products</ShopProducts>
                        </ProductsDetails>
                    </ProductsDiv>
                    <ProductsDiv>
                        <ProductsDetails>
                            <ProductsH4 href="#">Climate Control</ProductsH4>
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
                            <ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop Rittal's Climate Control Products</ShopProducts>
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

