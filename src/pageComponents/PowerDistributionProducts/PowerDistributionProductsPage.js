import React from 'react'
import styled from 'styled-components'

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
    background-image: url('https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/power-distribution.jpg');
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
const BorderBottom = styled.div`
    display: flex;
    border-bottom: 2px solid #f2f3f4;
    flex-grow: 99;
  `
const BannerDiv = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 2px solid #f2f3f4;
`
const BannerImg = styled.img`
    width: 82%;
    height: 100%;
    object-fit: contain;
    margin-left: 19px;
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
    flex-wrap: wrap;
`
const ProductDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin: 15px 25px;
    width: 250px;
    align-items: center;
    justify-content: space-evenly;
`
const ProductImgDiv = styled.div`
    width: 200px;
    height: 170px;
    overflow: hidden;
`
const ProductImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`
const ProductHeaderDiv = styled.div`
    margin-top: 10px;
`
const ProductHeader = styled.p`
    margin-bottom: 0;
    font-weight: bold;
    text-align: center;
`
const ProductDetailsDiv = styled.div`
    padding: 0 5px;
`
const ProductDetails = styled.p`
    margin-bottom: 0;
    font-size: 12px;
`
const ProductSection = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    flex-wrap: wrap;   
`
const ProductBtn = styled.button`
		background-image: linear-gradient(to top left,#950f23,#DB1633);
		color: white;
		text-transform: uppercase;
    border-radius: 3px;
    font-size: 12px;
    margin: 15px 0;
    border: 0;
    padding: 3px 18px;
`
const LogoDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 260px;
    margin: 0 25px;
`
const LogoText = styled.p`
    margin-top: 10px;
    color: #B51F2B;
    font-weight: bold;
`
const LogoBtn = styled.button`
    background-color: #246696;
    color: white;
    padding: 10px;
    border: 0;
    border-radius: 5px;
`
const InfoDiv = styled.div`
    display: flex;
    margin: 20px 0 50px;
`
const ServiceSection = styled.div`
    display: flex;
    flex-direction: column;
`
const ServiceMainDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 40px;
`
const Services = styled.div`
    display: flex;
    flex-direction: column;
    width: 260px;
    margin: 0 20px;
    font-size: 14px;
`
const ServiceName = styled.p`
    margin-bottom: 5px;
    font-weight: bold;
`
const SubText = styled.p`
    text-align: center;
    font-weight: bold;
    color: #133752;
    font-size: 25px;
    margin-bottom: 0;
`

export default function PowerDistributionProducts() {
    return (
        <Container>
            <FeaturedBrandLogo>
            </FeaturedBrandLogo>
            <BrandDetailsContainer>
                <AirlineDistributorH1>Power Distribution Products and Electrical Enclosures</AirlineDistributorH1>
                <DistributorDiv>
                    <DistributorDiv>Airline can provide the service and products you need when thinking about your facilities electrical power distribution system. Airline is uniquely situated as a preferred Rittal and Eaton industrial distributor. This allows us to be committed to serving the industrial end user market. The following are some examples of the Rittal and Eaton products/solutions that we can offer as well as the capabilities of Eaton’s Engineering Services Team.
                    </DistributorDiv>
                </DistributorDiv>
                <BrandDiv>
                    <AirlineDistributorH4>Airline is an authorized distributor of quality brands such as:</AirlineDistributorH4>
                    <DistributorDetails>
                        <LogoDiv>
                            <BannerDiv><BannerImg src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/Eaton_logo.png" /></BannerDiv>
                            <LogoText>Interested in Eaton?</LogoText>
                            <div><LogoBtn>Request more information</LogoBtn></div>
                        </LogoDiv>
                        <LogoDiv>
                            <BannerDiv><BannerImg src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/RITTAL.png" /></BannerDiv>
                            <LogoText>Interested in Rittal?</LogoText>
                            <div><LogoBtn>Request more information</LogoBtn></div>
                        </LogoDiv>
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
                                <IndustryImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/Plantfloor_MRO-300x189.png" />
                            </IndustryImgDiv>
                            <IndustryTextDiv>
                                <IndustryText>Plant Floor/MRO</IndustryText>
                            </IndustryTextDiv>
                        </IndustryCol>
                        <IndustryCol>
                            <IndustryImgDiv>
                                <IndustryImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/Power%20Generation.png" />
                            </IndustryImgDiv>
                            <IndustryTextDiv>
                                <IndustryText>Power Generation</IndustryText>
                            </IndustryTextDiv>
                        </IndustryCol>
                        <IndustryCol>
                            <IndustryImgDiv>
                                <IndustryImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/food%20and%20bev.png" />
                            </IndustryImgDiv>
                            <IndustryTextDiv>
                                <IndustryText>Food & Beverage</IndustryText>
                            </IndustryTextDiv>
                        </IndustryCol>
                        <IndustryCol>
                            <IndustryImgDiv>
                                <IndustryImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/Manufacturing-300x189.png" />
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
                <ProductSection>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/OEM%20drives.jpg" />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>OEM drives</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Unique, space-saving drives with programmable features provide valuable energy savings for OEM drives applications.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/General%20purpose%20drives.jpg" />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>General purpose drives</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Engineered for today’s demanding commercial and industrial applications, these robust drives provide reliable, efficient and precise motor control.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/HVAC%20drives.jpg" />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>HVAC drives</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Designed to significantly reduce energy consumption, these ultra-efficient drives increase cost savings for most HVAC applications.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/Wallmount.jpg" />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Wallmount Enclosures</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>NEMA protection ratings are ensured through a secure locking system, foamed-in-place gasket and knife edge perimeter. Features include a body constructed of cold rolled steel, steel doors and zinc-plated mounting panels.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/Standard%20enclosed%20drives.jpg" />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Standard enclosed drives</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Innovative drives offer pilot devices, circuit breaker/ fused disconnects, input/output filtering and bypass capabilities.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/Freestanding.jpg" />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Freestanding Enclosures</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Select from raised and removable 12" floor mounts or freestanding enclosures with or without base/plinth panels.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/Flex%20Center.jpg" />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Flex Center</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>The Drives Flex Center in Watertown, WI provides value-engineered enclosed drive solutions to fit exact specifications, from standard modifications to complete custom design/builds.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Request a quote</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/Advanced%20VFD%20solutions.jpg" />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Advanced VFD solutions</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Engineered-to-order configurations with motor protection relays, custom bypass, custom enclosures and harmonics mitigation.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Request a quote</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/XT%20contactors.jpg" />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>XT contactors and starters</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Compact, space-saving and easy-to-install XT line of IEC contactors and starters is the efficient and effective solution</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/XT%20manual%20motor.jpg" />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>XT manual motor protectors and combination motor controllers</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>XT IEC open non-reversing and reversing manual motor controllers combine a manual motor protector with an IEC contactor(s) to provide a complete motor protection solution.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/EMS.jpg" />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Electronic motor starters (EMS)</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Full starter with built-in solid-state contacts and integral overload protection. Compact size and high electrical life make it an ideal replacement for traditional contactor/overload relay starter configuration.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/Floormount%20Disconnect.jpg" />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Floormount Disconnect Enclosures</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>These enclosures provide personnel safety, protect electrical components and support the addition of a flange-mounted disconnect handle.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/NEMA%20power%20control.jpg" />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>NEMA power control</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Freedom NEMA-rated contactors and starters with solid-state and bi-metallic overload options; universal retrofit kits; UL listed.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/Specialty%20power%20control.jpg" />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Specialty power control</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Designed to deliver application versatility, simple configuration and high-performance operation.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/Fan.jpg" />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Fans</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Rittal filter fans are adaptable with filter blankets, hoods and louvers.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/Solid-state.jpg" />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Solid-state starters (soft starters)</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Control acceleration and deceleration of three-phase motors with current ranges from 0.8 A to 1000 A. Compact, multifunctional, easy to install and program.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/Motor%20protection.jpg" />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Motor protection</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Providing the highest level of motor protection and versatility while maximizing uptime.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/Enclosed%20control.jpg" />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Enclosed control</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Expansive, flexible offering with a variety of modifications to meet your enclosed control needs.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/Roofmount%20Air%20Conditioner.jpg" />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Roofmount & Wallmount Air conditioners</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails> Rittal’s roof-mounted cooling units ensures doors, side panels and escape routes are kept free. Electrical condensate evaporation, nano-coated condenser.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/Aftermarket.jpg" />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Aftermarket and renewal parts</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Extend the life of existing products with quality replacement parts.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/Push%20Button%20Box.jpg" />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Push Button Boxes</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>The NEMA rated PB series pushbutton box enclosure is designed for indoor use to house pushbuttons, selector switches, and pilot lights. This enclosure protects equipment from dirt, dust, sprayed water, oil, and coolants.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/Industrial%20relays.jpg" />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Industrial relays</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Extensive relay line that can be customized to meet many application requirements.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/Easy-E4-UC-12rc1-Effortless-Control.jpg" />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Programmable logic controllers</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Ideal for lighting, energy management, industrial control, irrigation, pump control and HVAC.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/Operator%20interface.jpg" />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Operator interface</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Features familiar, easy-to-understand control interfaces and command methods that are used in consumer electronics.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/Intelligent%20wiring%20solutions.jpg" />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Intelligent wiring solutions</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Wiring solutions for control panels and OEM drives machinery that simplifies and consolidates complex circuit wiring into a single cable.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/Hygienic%20Design.jpg" />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Hygienic Design Enclosures</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Our Hygienic Design Solutions deliver full protection from caustic washdowns and thermal management to keep your vital equipment running.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/Safety%20products.jpg" />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Safety products</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Created to enhance machine operator safety and machine motor control.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/Terminal%20blocks.jpg" />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Terminal blocks</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Built for years of use under demanding conditions, these terminal blocks are available in three simple and reliable terminal connection styles with universal accessories.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/Pilot%20devices.jpg" />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Pilot devices</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Available in many shapes and sizes, these versatile pilot devices are ideal for applications in the North American (NEMA) and global (IEC) markets.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/Control%20stations.jpg" />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Control stations</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>General purpose and heavy-duty options with fixed element or modular design to suit virtually any industrial or commercial application.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/Modular%20Enclosures.jpg" />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Modular Enclosures</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Modular enclosures provide the protection required for industrial drives, controls and other equipment. They deliver the practical flexibility to evolve with the changing demands of modern business.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/Control%20power.jpg" />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Control power</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Wide selection of durable and reliable DIN rail power supplies, available in 12 and 24 Vdc, for general, compact and low-profile applications.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/Sensors.jpg" />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Sensors and limit switches</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Sensing option for many applications—from rugged, mechanically actuated switches to sophisticated, noncontact, sensing solutions.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/Signal%20towers.jpg" />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Signal towers</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Provide highly versatile, completely modular signaling for key processes—and with IP66 protection, these signal towers thrive indoors and out.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/Power%20Defense.jpg" />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Power Defense circuit breakers</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Eaton’s globally rated Power Defense circuit breakers increase personnel safety and provide a foundation for IoT, with embedded communications and metering functionality, helping to optimize your facility’s performance.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/Bussmann.jpg" />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Bussmann® series fuses, blocks, holders and disconnect switches</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Eaton develops and manufactures Bussmann series fusible circuit protection, power management and electrical safety products for industrial, commercial and alternative energy markets.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/distribution%20transformers.jpg" />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Power and distribution transformers and busway</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails></ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Request a quote</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/HMI.png" />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>HMI Arm Enclosures</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Rittal offers HMI solutions for all types of applications: Pendant arm systems, PC enclosures, industrial workstations and consoles. All designed for user efficiency.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/LV%20medium-low-voltage.jpg" />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Medium- and low-voltage switchgear</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails></ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Request a quote</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/LV%20motor%20control.jpg" />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Medium- and low-voltage motor control centers</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails></ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Request a quote</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src="https://airlinemedia.airlinehyd.com/Static_pages/industries/power-distribution/LV%20Drive.jpg" />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Medium- and low-voltage drives</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails></ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Request a quote</ProductBtn>
                    </ProductDiv>
                </ProductSection>

                {/*.............................. NEED MORE INFO................................... */}

                <SectionDiv>
                    <ProductsTitle>Need more information</ProductsTitle>
                    <BorderBottom></BorderBottom>
                </SectionDiv>
                <InfoDiv>
                    <LogoDiv>
                        <BannerDiv><BannerImg src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/Eaton_logo.png" /></BannerDiv>
                        <LogoText>Interested in Eaton?</LogoText>
                        <div><LogoBtn>Request more information</LogoBtn></div>
                    </LogoDiv>
                    <LogoDiv>
                        <BannerDiv><BannerImg src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/RITTAL.png" /></BannerDiv>
                        <LogoText>Interested in Rittal?</LogoText>
                        <div><LogoBtn>Request more information</LogoBtn></div>
                    </LogoDiv>
                </InfoDiv>

                {/*.............................. SERVICES................................... */}

                <SectionDiv>
                    <ProductsTitle>services</ProductsTitle>
                    <BorderBottom></BorderBottom>
                </SectionDiv>
                <ServiceSection>
                    <SubHeaderDiv>
                        <SubText>Eaton’s Electrical Engineering Services</SubText>
                    </SubHeaderDiv>
                    <ServiceMainDiv>
                        <Services>
                            <ServiceName>Predictive and preventive maintenance for generation equipment</ServiceName>
                            <ul>
                                <li>Preventive maintenance and test of transformers, OCBs, SF6 breakers, circuit interrupters, cutouts, relays, switchgear, PTs, CPTs, CTs, reactors, grounding systems and lightning arresters</li>
                                <li>Transformer and breaker oil analysis</li>
                                <li>Preventive-maintenance program design and implementation</li>
                                <li>Partial-discharge testingvand analysis</li>
                                <li>Maintenance contracts</li>
                                <li>Thermographic surveys</li>
                                <li>Performance-based maintenance programs</li>
                            </ul>
                        </Services>
                        <Services>
                            <ServiceName>Substation turnkey design capabilities</ServiceName>
                            <ul>
                                <li>Crisis response—nationwide</li>
                                <li>Substation commissioning and startup</li>
                                <li>Substation operation and maintenance</li>
                                <li>Integrated project solutions</li>
                                <li>New substation design and construction</li>
                                <li>Energy management</li>
                                <li>Project management</li>
                            </ul>
                            <ServiceName>Power system design and analysis capabilities</ServiceName>
                            <ul>
                                <li>Arc flash studies</li>
                                <li>NERC compliance reporting</li>
                                <li>Coordination / short circuit/ fault current studies</li>
                                <li>Load flow / power factor studies</li>
                                <li>Grounding analysis/ ground grid design</li>
                                <li>Transient stability studies</li>
                            </ul>
                        </Services>
                        <Services>
                            <ServiceName>Equipment life extension</ServiceName>
                            <ul>
                                <li>Medium-voltage vacuum replacement breaker designs for most OEM’s breakers</li>
                                <li>Generator breaker replacements</li>
                                <li>More than 200 ANSIapproved designs</li>
                                <li>Switchgear modifications, bus-bracing analysis</li>
                                <li>Protective relay upgrades, retrofits and redesign; new doors, etc.</li>
                                <li>Add to existing switchgear</li>
                                <li>Energy management, PLC control and load shedding</li>
                                <li>System metering and control</li>
                                <li>Power breaker centers dedicated to the reconditioning of low- and medium-voltage breakers and contactors per ANSI C37.59-2002</li>
                                <li>Excitation system replacement and upgrades</li>
                                <li>High-resistance grounding system design and installation</li>
                                <li>Low-voltage replacement breaker (LVAR) and vacuum starter replacement (VSR)</li>
                            </ul>
                        </Services>
                        <Services>
                            <ServiceName>Transformer capabilities</ServiceName>
                            <ul>
                                <li>Bushing monitoring systems</li>
                                <li>Oil processing rigs—oil-fill/degasification/vacuum-fill</li>
                                <li>Transformer internal inspections, reblocking, rewinding, etc.</li>
                                <li>PCB disposal</li>
                                <li>Dress out / startup</li>
                                <li>On-site repairs</li>
                                <li>Power factor (Doble) testing</li>
                                <li>Tap changer repairs and replacements</li>
                                <li>EnvirotempE FR3E fluid retrofil</li>
                            </ul>
                        </Services>
                    </ServiceMainDiv>
                    <SubHeaderDiv>
                        <SubText>Rittal Services & Support</SubText>
                    </SubHeaderDiv>
                    <ServiceMainDiv>
                        <Services>
                            <ServiceName>On-site repairs</ServiceName>
                            <ul>
                                <li>Fast expert assistance</li>
                                <li>Qualified technicians to handle any problems</li>
                            </ul>
                        </Services>
                        <Services>
                            <ServiceName>Maintenance and spare parts</ServiceName>
                            <ul>
                                <li>Preventative maintenance to safeguard the performance of your equipment</li>
                                <li>Worldwide availability of spare parts and multiple regional stocking locations</li>
                                <li>Customer-specific inventory of spare parts with service contract</li>
                                <li>Approved, OEM spare parts shipped direct from Rittal</li>
                            </ul>
                        </Services>
                        <Services>
                            <ServiceName>Rittal Climate Inspections</ServiceName>
                            <ul>
                                <li>Rittal Service expert will come to your site to inventory, document, and evaluate the state of the operating environment.</li>
                                <li>Enclosure cooling equipment will be checked for cleanliness, function, and serviceability.</li>
                            </ul>
                        </Services>
                        <Services>
                            <ServiceName>Installation and Start-Up:</ServiceName>
                            <ul>
                                <li>Installation/assembly and commissioning of individual devices or complete systems</li>
                            </ul>
                        </Services>
                    </ServiceMainDiv>
                </ServiceSection>
            </BrandDetailsContainer>
        </Container >
    )
}

