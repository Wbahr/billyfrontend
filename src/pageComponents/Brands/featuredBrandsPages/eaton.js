import React, { useState, useContext } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import Context from '../../../config/context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import EatonImg from '../../../imgs/homepage/Eaton.png'
import EatonImg2 from '../../../imgs/homepage/Eaton2.png'

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
  background-image: url('https://media.istockphoto.com/photos/white-silver-geometric-universal-background-for-business-presentation-picture-id1207126778?s=2048x2048');
  // background-image: url('https://media.istockphoto.com/photos/abstract-white-background-picture-id674723944?s=2048x2048');
  // background-image: url('https://media.istockphoto.com/photos/abstract-background-of-polygons-on-white-background-picture-id857482302?s=2048x2048');
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
`
const ProductsTitle = styled.div`
  font-size: 25px;
  color: #555555;
  text-transform: uppercase;
  letter-spacing: 2px;
  display: flex;
  flex: 1;
`
const Div = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  margin: 25px 0;
  align-items: center;
`
const SectionDiv = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  margin: 25px 0;
  align-items: center;
`
const ProductsDiv = styled.div`
  display: flex;  
  flex-wrap: nowrap;
  margin: 20px 0 20px 0;
  background-color: #f2f3f4;
  padding: 15px;
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
const ShopAbbButton = styled.button`
  background-image: linear-gradient(to left top, rgb(149, 15, 35), rgb(219, 22, 51));
  width: 20%
  color: white;
  font-weight: 600;
  border-radius:28px;
  border: 0;
  padding: 5px;
  margin: 0 auto;
  outline: none;
  `
const BorderBottom = styled.div`
  display: flex;
  border-bottom: 1px solid #555555;
  flex: 3.5;
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
const VideoDiv = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  margin-bottom: 30px;
  flex-direction:s
  margin: 0 auto;
  position: relative;
  justify-content: space-between;
`
const ArticlesVideo = styled.iframe`
  width: 450px;
  height: 250px;
  margin: 0 15px 0 15px;
`
const ArticlesContentDiv = styled.div`
  margin-left: 20px;
  text-align: center;
  padding: 15px 0;
`
const ArticlesPicture = styled.img`
  width: 100%;
  min-height: 100%;
`
const ArticlesShortLine = styled.div`
  display: flex;
  border-bottom: 2px solid #555555;
  width: 15%;
  margin: 25px 0 0;
  `
const ArticlesTopic = styled.h6`
  color: #B51F2B;
  font-weight: bold;
  margin: 25px 15px;
  font-size: 18px;
  text-align: left;
`
const ArticlesImgDiv = styled.div`
  max-width: 350px;
  padding: 20px;
  height: 300px;
  overflow: hidden;
`
const SmallArticlesContent = styled.div`
  display: flex
  flex-wrap: nowrap;
  max-width: 380px;
  margin-bottom: 30px;
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
  color: white;
`

const ArticlesContentDetails = styled.p`
  margin: 0 15px;
  text-align: left;
  font-size: 14px;
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
const ListItemDiv = styled.div`
  font-size: 15px;
  margin-top: 10px;
  display: flex;
`
const ShopProducts = styled.a`
  color: #246696;
  font-size: 14px;
  margin-top: 10px; 
`
const LongProductDetails = styled.p`
   margin:0;
`
const BannerDiv = styled.div`
 
`
const BannerImg = styled.img`
  width: 300px;
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
  width: 100%;
  height: 350px;
`
const RelatedContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
`
const ArticlesDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`
const Video = styled.div`
  display: flex;
  flex: 1;
  max-width: 380px;
  height: 250px;
`
export default function Eaton() {
  const [showText1, setShowText1] = useState(false);

  return (
    <Container>
      <FeaturedBrandLogo>
        <BannerDiv><BannerImg src="https://www.airlinehyd.com/customer/aihyco/images/eaton_logo_new.png" /></BannerDiv>
      </FeaturedBrandLogo>
      <BrandDetailsContainer>
        <AirlineDistributorH1>Eaton
        </AirlineDistributorH1>
        <DistributorDetails>Eaton is a global technology leader in power management solutions that make electrical, hydraulic and mechanical power operate more efficiently, reliably, safely and sustainably. Airline carries a wide range of Eaton Cutler-Hammer products for circuit protection, automation and control.</DistributorDetails>
        <Div>
          <ShopAbbButton>Shop for Eaton Products </ShopAbbButton>
        </Div>

        {/*............................... PRODUCTS................................... */}

        <SectionDiv>
          <ProductsTitle>Products</ProductsTitle>
          <BorderBottom></BorderBottom>
        </SectionDiv>
        <ProductsDiv>
          <ImgDiv> <Img src="https://www.eaton.com/content/dam/eaton/products/electrical-circuit-protection/low-voltage-air-circuit-breakers/magnum-dssb-circuit-breakers/Magnum-breaker.jpg" /></ImgDiv>
          <ProductsDetails>
            <ProductsH4 href="#">Circuit Protection</ProductsH4>
            <LongProductDetails>Eaton’s complete line of low and medium voltage circuit breakers are used to provide circuit protection in a wide range of industries, where they protect against overloads and short circuits in conductors. These circuit breakers are applied in panel boards, switchboards, motor control centers, control panels, combination starters, individual enclosures, and as bus duct plug-in units. A partial list of Eaton’s circuit protection offering includes:
              <ShowMoreBtn1 onClick={() => setShowText1(!showText1)}><FontAwesomeIcon icon='plus-circle' size='1x' /> {showText1 ? 'Show Less' : 'Show More '} </ShowMoreBtn1> </LongProductDetails>
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

        {/*.................................. ARTICLES................................... */}

        <SectionDiv>
          <ProductsTitle>Articles & Videos</ProductsTitle>
          <BorderBottom></BorderBottom>
        </SectionDiv>
        <ArticlesDiv>
          <SmallArticlesContent>
            <ArticlesContentDiv>
              <ArticlesImgDiv>
                <ArticlesPicture src="https://www.eaton.com/content/dam/eaton/eaton-own-or-royalty-free-purchased-images/city-top-view.jpg.transform/default-desktop/image.jpg" />
              </ArticlesImgDiv>
              <ArticlesTopic>
                Managing complexities to prepare the grid of the future
              <ArticlesShortLine></ArticlesShortLine>
              </ArticlesTopic>
              <ArticlesContentDetails>The electrical grid has served businesses and consumers for over 100 years. Utility system planners, operators and maintenance personnel have always faced challenges, but never have they compounded as rapidly as they are now. <a href="https://www.eaton.com/us/en-us/company/news-insights/grid-modernization.html" target="_blank"> Read more >> </a></ArticlesContentDetails>
            </ArticlesContentDiv>
          </SmallArticlesContent>
          <SmallArticlesContent>
            <ArticlesContentDiv>
              <ArticlesImgDiv>
                <ArticlesPicture src={EatonImg} />
              </ArticlesImgDiv>
              <ArticlesTopic>
                Innovation that enables dynamic machine control
              <ArticlesShortLine></ArticlesShortLine>
              </ArticlesTopic>
              <ArticlesContentDetails>The industry is moving to smarter, more efficient machines. It’s no longer just about components, it’s about how those components connect to create intelligent subsystems that dynamically adapt and respond. <a href="https://www.eaton.com/us/en-us/services/dynamic-machine-control.html" target="_blank"> Read more >> </a>
              </ArticlesContentDetails>
            </ArticlesContentDiv>
          </SmallArticlesContent>
          <SmallArticlesContent>
            <ArticlesContentDiv>
              <ArticlesImgDiv>
                <ArticlesPicture src={EatonImg2} />
              </ArticlesImgDiv>
              <ArticlesTopic>
                Proactively managing risks through the entire product lifecycle
              <ArticlesShortLine></ArticlesShortLine>
              </ArticlesTopic>
              <ArticlesContentDetails>Our world is digitized, networked and connected. Artificial intelligence and advanced data-sharing provide many benefits, but they can also make your organization vulnerable to attack. Resilience against cyber attack is critical. We can help.
          </ArticlesContentDetails>
            </ArticlesContentDiv>
          </SmallArticlesContent>
        </ArticlesDiv>
        <VideoDiv>
          <Video><ArticlesVideo src="https://www.youtube.com/embed/01gNSqKiokk"></ArticlesVideo></Video>
          <Video><ArticlesVideo src="https://www.youtube.com/embed/jEL5t_rMxqU"></ArticlesVideo></Video>
          <Video><ArticlesVideo src="https://www.youtube.com/embed/VTcS5HBrP7g"></ArticlesVideo></Video>
        </VideoDiv>

        {/*.............................. RELATED LINK ................................... */}

        <RelatedLinkDiv>
          <SectionDiv>
            <ProductsTitle>Related Links</ProductsTitle>
            <BorderBottom></BorderBottom>
          </SectionDiv>
          <RelatedContainer>
            <RelatedLinkCircle>
              <LinkStyleDiv>
                <LinkStyle href="http://www.eaton.com/" target="_blank">
                  <FontAwesomeDiv>
                    <FontAwesomeIcon icon='globe-americas' size='4x' />
                  </FontAwesomeDiv>
                Eaton's Website</LinkStyle>
              </LinkStyleDiv>
            </RelatedLinkCircle>
            <RelatedLinkCircle>
              <LinkStyleDiv>
                <LinkStyle href="https://www.youtube.com/channel/UCF7vz2IAPNHv7BKTiFC9Xhw" target="_blank">
                  <FontAwesomeDiv>
                    <FontAwesomeIcon icon={faYoutube} size='4x' />
                  </FontAwesomeDiv>
                Videos</LinkStyle>
              </LinkStyleDiv>
            </RelatedLinkCircle>
            <RelatedLinkCircle>
              <LinkStyleDiv>
                <LinkStyle href="#" target="_blank">
                  <FontAwesomeDiv>
                    <FontAwesomeIcon icon='shopping-cart' size='4x' />
                  </FontAwesomeDiv>
                shop Eaton products</LinkStyle>
              </LinkStyleDiv>
            </RelatedLinkCircle>
            <RelatedLinkCircle>
              <LinkStyleDiv>
                <LinkStyle href="https://www.airlinehyd.com/customer/aihyco/b2bse/catalogrequest.aspx?mfg=Eaton" target="_blank">
                  <FontAwesomeDiv>
                    <FontAwesomeIcon icon='address-book' size='4x' />
                  </FontAwesomeDiv>
                Eaton Catalogs</LinkStyle>
              </LinkStyleDiv>
            </RelatedLinkCircle>
          </RelatedContainer>
        </RelatedLinkDiv>
      </BrandDetailsContainer>
    </Container >
  );
}