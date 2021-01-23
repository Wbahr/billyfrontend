import React, { useState } from 'react'
import styled from 'styled-components'
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
  background-image: url('https://airlinemedia.airlinehyd.com/Static_pages/Brands/brands-bg.jpg');
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
  background-color:  #f2f3f4;
  padding: 15px 
  width: 100%;
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
	background-image: linear-gradient(to top left,#950f23,#DB1633);
	color: white;
	font-weight: 600;
	border-radius:3px;
	font-size: 16px;
	text-transform: uppercase;
	letter-spacing: 1px;
	border: 0;
	padding: 10px 15px;
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
  // position: relative;
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
  justify-content: space-between;
`
const ArticlesVideo = styled.iframe`
  width: 100%;

`
const ArticlesContentDiv = styled.div`
  text-align: center;
  padding: 15px;
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
`
const ArticlesPicture = styled.img`
  width: 100%;
  min-height: 100%;
  object-fit: cover;
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
  object-fit: scale-down;
`
const RelatedLinkDiv = styled.div`
  width: 100%;
  height: 350px;
`
const Video = styled.div`
  display: flex;
  flex: 1;
  max-width: 380px;
  height: 250px;
`
const ArticlesDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`
const RelatedContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
`
const BannerDiv = styled.div`

`
const BannerImg = styled.img`
  width: 250px;
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
const ShowMoreBtn2 = styled.button`
  font-size: 14px;
	border: none;	
	border-radius:2em;
  padding: 4px 10px;
	margin: 0 auto;
  outline: none;
  background-color: #f2f3f4;
`
const LongProductDetails = styled.p`
   margin:0;
`
const ListItemDiv = styled.div`
  font-size: 15px;
  margin-top: 10px;
  display: flex;
`
const Span = styled.span`
  font-weight: bold;
`
export default function Omron() {
  const [showText1, setShowText1] = useState(false)
  const [showText2, setShowText2] = useState(false)
  return (
    <Container>
      <FeaturedBrandLogo>
        <BannerDiv> <BannerImg src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/OMRON_logo.png" /></BannerDiv>
      </FeaturedBrandLogo>
      <BrandDetailsContainer>
        <AirlineDistributorH1>Omron
        </AirlineDistributorH1>
        <DistributorDetails>Omron Automation & Safety is a worldwide company and leading manufacturer of technologically advanced industrial automation products offering unsurpassed application expertise. With core competences in sensing, control, vision and panel components, Omron is also a world-class supplier of complete motion control solutions including programmable logic controllers (PLCs), machine controllers, human machine interfaces, variable frequency drives and servos.</DistributorDetails>
        <Div>
          <ShopAbbButton>Shop Products </ShopAbbButton>
        </Div>

        {/*............................... PRODUCTS................................... */}

        <SectionDiv>
          <ProductsTitle>Products</ProductsTitle>
          <BorderBottom></BorderBottom>
        </SectionDiv>
        <ProductsDiv>
          <ImgDiv><Img src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Omron/automation.png" /></ImgDiv>
          <ProductsDetails>
            <ProductsH4 href="#">Automation Systems</ProductsH4>
            Omron's Automation Systems include programmable controllers that support machine control, and network/software products to support easy information exchange with host systems.
            <LongProductDetails>
              <ShowMoreBtn1 onClick={() => setShowText1(!showText1)}>{showText1 ? <><FontAwesomeIcon icon='minus-circle' size='1x' /> Show Less </> : <><FontAwesomeIcon icon='plus-circle' size='1x' /> Show More  </>} </ShowMoreBtn1> 
            </LongProductDetails>
            {showText1 && (
              <div>
                <ListItemDiv>
                  <ul>
                    <li><Span>Machine Automation Controllers</Span> - Omron's Sysmac NJ machine automation controller integrates logic, motion, vision and networks using their new software, Sysmac Studio.</li>
                    <li><Span>Programmable Logic Controllers</Span> - Omron offers smart remote I/Os, compact CP1 PLCs, the high-performance modular CJ2, and the backplane-based CS1 series for large applications. All Omron PLCs are programmed and commissioned via CX-Programmer, a part of Omron's CX-One automation suite.</li>
                    <li><Span>Remote I/O </Span> - Omron offers open networks such as Ethernet/IP, EtherCAT, DeviceNET, and PROFIBUS-DP that allow easy integration in existing installations and ensure compatibility with third party systems. In addition, Omron offers Compobus/S, Omron's proprietary sensor/actuator bus, for cost efficient, fast and program-less configuration.</li>
                    <li><Span>Human Machine Interfaces (HMIs)</Span> - Omron's range includes the NS Series scalable HMI, the NB Series compact touch screens, the NV Series Micro-HMI, and the NT function-key type displays.</li>
                    <li><Span>Software</Span> - Omron's software solutions reduce complexity by providing an integrated environment, with single install and lifetime online upgrades, enabling users to design a complete multi-discipline modular automation system.</li>
                  </ul>
                </ListItemDiv>
              </div>
            )}
            <ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop Omron's Automation Systems Products</ShopProducts>
          </ProductsDetails>
        </ProductsDiv>
        <ProductsDiv>
          <ProductsDetails>
            <ProductsH4 href="#">Motion & Drives</ProductsH4>
            Omron's Motion & Drives offering includes Sysmac machine automation controllers (described above), motion controllers, servo motors and inverters ideal for positioning, speed and torque controls in various automation systems.
            <ListItemDiv>
              <ul>
                <li><Span>Motion Controllers</Span> - Omron's range of servo systems are unique in offering the highest performance in the most compact size.</li>
                <li><Span>Servo Systems</Span> - Omron offers smart remote I/Os, compact CP1 PLCs, the high-performance modular CJ2, and the backplane-based CS1 series for large applications. All Omron PLCs are programmed and commissioned via CX-Programmer, a part of Omron's CX-One automation suite.</li>
                <li><Span>Variable Frequency Drives</Span> - Developed to harmonize motor and machine control, Omron's frequency inverters provide precise operation for fast cyclic operations and torque control capability in open and closed loop configuration.</li>
              </ul>
            </ListItemDiv>
            <ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop Omron's Motion & Drives Products</ShopProducts>
          </ProductsDetails>
          <ImgDiv><Img src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Omron/motion-drives.png" /></ImgDiv>
        </ProductsDiv>
        <ProductsDiv>
          <ImgDiv><Img src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Omron/sensing.png" /></ImgDiv>
          <ProductsDetails>
            <ProductsH4 href="#">Sensing</ProductsH4>
            OMRON Sensing Components detect, measure, analyze, and process various changes that occur on production sites, such as changes in position, length, height, displacement, and appearance. They also contribute to predicting and preventing future events. Their vast product range includes:
            <LongProductDetails><ShowMoreBtn2 onClick={() => setShowText2(!showText2)}>{showText2 ? <><FontAwesomeIcon icon='minus-circle' size='1x' /> Show Less </> : <><FontAwesomeIcon icon='plus-circle' size='1x' /> Show More  </>} </ShowMoreBtn2> </LongProductDetails>
            {showText2 && (
              <div>
                <ListItemDiv>
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
                </ListItemDiv>
              </div>
            )}
            <ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop Omron's Sensing Products</ShopProducts>
          </ProductsDetails>
        </ProductsDiv>
        <ProductsDiv>
          <ProductsDetails>
            <ProductsH4 href="#">Control Components</ProductsH4>
            From power suppliers to counters to temperature controllers, we have all needed components for a successful and complete automation solution.
            <ListItemDiv>
              <ul>
                <li>Temperature Controllers</li>
                <li>Power Supplies</li>
                <li>Timers</li>
                <li>Counters</li>
                <li>Programmable Relays</li>
                <li>Digital Panel Meters</li>
                <li>Metering & Monitoring Devices</li>
              </ul>
            </ListItemDiv>
            <ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop Omron's Control Components Products</ShopProducts>
          </ProductsDetails>
          <ImgDiv><Img src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Omron/control-components.png" /></ImgDiv>
        </ProductsDiv>
        <ProductsDiv>
          <ImgDiv><Img src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Omron/switching-components.png" /></ImgDiv>
          <ProductsDetails>
            <ProductsH4 href="#">Switching Components</ProductsH4>
            OMRON Switching Components provide high levels of control, reliability and accuracy with a line that includes the following products:
            <ListItemDiv>
              <ul>
                <li><Span>Electromechanical Relays</Span> - A comprehensive range of general purpose and special purpose industrial relays capable of switching loads from micro-amps to 40 A.</li>
                <li><Span>Solid-State Relays </Span>- With output current ranging from 2 to 150, these solid state relays are suitable for almost every need.</li>
                <li><Span>Monitoring Products</Span> - Consisting of single-phase current and voltage relays, three-phase voltage relays and conductive level and leakage controllers, this range is suitable for a wide range of applications.</li>
                <li><Span>Pushbutton Switches</Span> - This diverse range of high quality 16 or 22 mm pushbutton switches offer practical solutions for industrial applications.</li>
              </ul>
            </ListItemDiv>
            <ShopProducts href="https://www.airlinehyd.com/pages/blog/robots.htm"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Learn more about the features and specs of Omron's robots here.</ShopProducts>
          </ProductsDetails>
        </ProductsDiv>
        <ProductsDiv>
          <ProductsDetails>
            <ProductsH4 href="#">Robotics</ProductsH4>
            Omron Robotic automation solutions enhance the most demanding manufacturing lines. Choose from collaborative robots (cobots), industrial SCARA robots, spider robots, six-axis robots, or AIV (Automated Intelligent Vehicle) mobile robots.
            <ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop Omron's Control Components Products</ShopProducts>
          </ProductsDetails>
          <ImgDiv><Img src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Omron/robotics.png" /></ImgDiv>
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
                <ArticlesPicture src="https://assets.omron.com/m/178c5ef7e77e4b3d/webimage-Blog-Post-20200413_E-Stops_EN_202004.jpg" />
              </ArticlesImgDiv>
              <ArticlesTopic>
                Five essential requirements for the behavior of emergency stop devices
                <ArticlesShortLine></ArticlesShortLine>
              </ArticlesTopic>
              <ArticlesContentDetails>Emergency stops are a must-have for any safety system, as they are often the last resort for stopping or mitigating a major accident on the factory floor. We’ve discussed the specific requirements for the layout, color and shape of an E-stop pushbutton in a previous blog post, but there are also several requirements for E-stop behavior that we will go over now. <a href="https://solutions.haskel.com/blog/embracing-the-industrial-iot-to-advance-high-pressure-manufacturing" target="_blank" rel="noopener noreferrer"> Read more >> </a></ArticlesContentDetails>
            </ArticlesContentDiv>
          </SmallArticlesContent>
          <SmallArticlesContent>
            <ArticlesContentDiv>
              <ArticlesImgDiv>
                <ArticlesPicture src="https://assets.omron.com/m/2a34a840f7735446/webimage-auto-blog-march2.jpg" />
              </ArticlesImgDiv>
              <ArticlesTopic>
                The importance of label verification in automotive manufacturing
                <ArticlesShortLine></ArticlesShortLine>
              </ArticlesTopic>
              <ArticlesContentDetails>As many as 20,000 individual parts go into the production of a single vehicle, and each of these parts must be subjected to rigorous tracking. There are many ways to mark a part – including laser marking, dot peening, inkjet marking and labeling – and automakers generally use several of these, depending on the situation.<a href="https://solutions.haskel.com/blog/a-quiet-change-to-compression-technology-has-arrived" target="_blank" rel="noopener noreferrer"> Read more >> </a>
              </ArticlesContentDetails>
            </ArticlesContentDiv>
          </SmallArticlesContent>
          <SmallArticlesContent>
            <ArticlesContentDiv>
              <ArticlesImgDiv>
                <ArticlesPicture src="https://assets.omron.com/m/3ce72d310ea52cc5/webimage-ld250-blog-post-photo.jpg" />
              </ArticlesImgDiv>
              <ArticlesTopic>
                Four major safety-related benefits of robots
                <ArticlesShortLine></ArticlesShortLine>
              </ArticlesTopic>
              <ArticlesContentDetails>Manufacturing facilities employ a variety of hazardous machines, and safeguarding is paramount. While traditional safety strategies are designed to mitigate risk in hazardous situations, it’s possible to eliminate this risk altogether by letting robots cover the dangerous tasks. Let’s take a look at a few ways that robots make manufacturing safer overall. <a href="https://solutions.haskel.com/blog/4-steps-for-planning-your-high-pressure-gas-liquid-system-purchase" target="_blank" rel="noopener noreferrer"> Read more >> </a>
              </ArticlesContentDetails>
            </ArticlesContentDiv>
          </SmallArticlesContent>
        </ArticlesDiv>
        <VideoDiv>
          <Video><ArticlesVideo src="https://www.youtube.com/embed/2G2WbqJ4644"></ArticlesVideo></Video>
          <Video><ArticlesVideo src="https://www.youtube.com/embed/pAXAG7UPDxw"></ArticlesVideo></Video>
          <Video><ArticlesVideo src="https://www.youtube.com/embed/VK0WU0Gu4Tg"></ArticlesVideo></Video>
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
                <LinkStyle href="http://www.hydacusa.com/" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeDiv>
                    <FontAwesomeIcon icon='globe-americas' size='4x' />
                  </FontAwesomeDiv>
                  Omron's US Website
                </LinkStyle>
              </LinkStyleDiv>
            </RelatedLinkCircle>
            <RelatedLinkCircle>
              <LinkStyleDiv>
                <LinkStyle href="https://www.youtube.com/user/aventics" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeDiv>
                    <FontAwesomeIcon icon={faYoutube} size='4x' />
                  </FontAwesomeDiv>
                  Videos
                </LinkStyle>
              </LinkStyleDiv>
            </RelatedLinkCircle>
            <RelatedLinkCircle>
              <LinkStyleDiv>
                <LinkStyle href="https://www.airlinehyd.com/Results.aspx?srh=HYDAC&x=0&y=0" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeDiv>
                    <FontAwesomeIcon icon='shopping-cart' size='4x' />
                  </FontAwesomeDiv>
                  Shop Omron Products
                </LinkStyle>
              </LinkStyleDiv>
            </RelatedLinkCircle>
            <RelatedLinkCircle>
              <LinkStyleDiv>
                <LinkStyle href="#" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeDiv>
                    <FontAwesomeIcon icon='address-book' size='4x' />
                  </FontAwesomeDiv>
                  Omron Catalogs
                </LinkStyle>
              </LinkStyleDiv>
            </RelatedLinkCircle>
          </RelatedContainer>
        </RelatedLinkDiv>
      </BrandDetailsContainer>
    </Container >

  )
}


