import React, { useState, useContext } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import Context from '../../../config/context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import Motor from '../../../imgs/homepage/AbbsMotors.png'

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
  font-size: 12px;
  border: none;
  border-radius:2em;
  padding: 4px 10px;
  margin: 0 auto;
  outline: none;
`
const ShowMoreBtn2 = styled.button`
  font-size: 12px;
  // color: white;
  border: 0;
  border-radius:2em;
  padding: 4px 10px;
  margin: 0 auto;
  outline: none;
`
const ListItemDiv = styled.div`
  font-size: 13px;
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
export default function Abb() {
  const [showText1, setShowText1] = useState(false);
  const [showText2, setShowText2] = useState(false);
  return (

    <Container>
      <FeaturedBrandLogo>
        <BannerDiv> <BannerImg src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/ABB_logo.svg/1280px-ABB_logo.svg.png" width="8%" /></BannerDiv>
      </FeaturedBrandLogo>
      <BrandDetailsContainer>
        <AirlineDistributorH1>Airline is your Authorized Distributor of ABB Products
        </AirlineDistributorH1>
        <DistributorDetails>ABB is a leader in power and automation technologies that enable utility and industry customers to improve performance while lowering environmental impact. ABB’s automation technologies blend a robust product portfolio with end-user expertise to deliver solutions for control, motion, protection, and plant integration.</DistributorDetails>
        <Div>
          <ShopAbbButton>Shop for ABB Products </ShopAbbButton>
        </Div>

        {/*............................... PRODUCTS................................... */}

        <SectionDiv>
          <ProductsTitle>Products</ProductsTitle>
          <BorderBottom></BorderBottom>
        </SectionDiv>
        <ProductsDiv>
          <ImgDiv><Img src="https://webimages.imagebank.abb.com/public/default/product/9AAC130891/preview" /></ImgDiv>
          <ProductsDetails>
            <ProductsH4 href="#">Drives</ProductsH4>
            ABB’s offering includes low voltage AC and DC drives and medium voltage AC drives which are used across all industries and applications. ABB drives offer application-specific functionality, control for different types of motors as well as flexible connectivity to automation networks.
            <ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop ABB's Drives Products</ShopProducts>
          </ProductsDetails>
        </ProductsDiv>
        <ProductsDiv>
          <ProductsDetails>
            <ProductsH4 href="#">Motors and Generators</ProductsH4>
            ABB offers a comprehensive range of reliable and high-efficiency motors and generators for all applications. Choose from IEC DC Motors, IEC Low Voltage AC Motors, Servo Motors, Synchronous Motors, or Synchronous Reluctance Motor and Drive Packages.
            <ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop ABB's Motors and Generators Products</ShopProducts>
          </ProductsDetails>
          <ImgDiv><Img src={Motor} /></ImgDiv>
        </ProductsDiv>
        <ProductsDiv>
          <ImgDiv> <Img src="https://webimages.imagebank.abb.com/public/default/product/9AAC30300224/preview" /></ImgDiv>
          <ProductsDetails>
            <ProductsH4 href="#">Transformers</ProductsH4>
            ABB offers a full range of transformer products and solutions for ANSI, IEC and other local standards. ABB is a major transformer manufacturer throughout the world and offers both liquid-filled and dry-type transformers.
            <ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop ABB's Transformers Products</ShopProducts>
          </ProductsDetails>
        </ProductsDiv>
        <ProductsDiv>
          <ProductsDetails>
            <ProductsH4 href="#">Control Systems</ProductsH4>
            <LongProductDetails> ABB is the #1 global provider of control technologies for industry, power and water. Airline offers the platforms and systems listed below to optimize processes and deliver operational excellence.
            <ShowMoreBtn1 onClick={() => setShowText1(!showText1)}><FontAwesomeIcon icon='plus-circle' size='1x' /> {showText1 ? 'Show Less' : 'Show More '}</ShowMoreBtn1> </LongProductDetails>
            {showText1 && <div>
              <ListItemDiv>
                <ul>
                  <li>ABB's 800xA platform provides the collaborative environment necessary for various organizations and departments to work as one and achieve operational excellence.</li>
                  <li>Advant OCS (Open Control System) is an ABB solution for operators to improve their manufacturing productivity and achieve sustainable competitive advantages.</li>
                  <li>The Compact Product Suite is a comprehensive group of control products for system integrators, OEMs and customers who like to engineer their own solution to meet their specific automation needs.</li>
                  <li>ABB's Freelance Distributed Control System can run on any PC and is easy to install, learn, engineer, commission, back-up, maintain and expand.</li>
                  <li>ABB offers Safety Systems to satisfy the safety requirements of industry (process and machinery). Additionally, it also provides the availability required in the most critical applications.</li>
                  <li>Satt OCS comprises everything from products to total solutions for a wide variety of industries, including food processing, water, energy, pharmaceutical, light chemical, infrastructure, etc.</li>
                </ul>
              </ListItemDiv>

            </div>}
            <ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop ABB's Control Systems Products</ShopProducts>
          </ProductsDetails>
          <ImgDiv><Img src="https://www07.abb.com/images/librariesprovider104/default-album/ac-800m-without-reflection-292x146.jpg?sfvrsn=1d63db1f_1&CropWidth=292&CropHeight=146&Quality=High&CropX=0&CropY=0&Width=292&Height=146&Method=CropToFixedAreaCropToFixedAreaArguments&Key=95cd1e3cafa590beaef40471cf162259" /></ImgDiv>
        </ProductsDiv>
        <ProductsDiv>
          <ImgDiv> <Img src="https://imageservice.abb.com/public/v2/2dd265e9-3194-4fbc-ae11-c32689b67dd3/preview.jpg?target=https%3A%2F%2Fwebimages.imagebank.abb.com%2fpublic%2fv2%2f2dd265e9-3194-4fbc-ae11-c32689b67dd3%2fpreview.jpg%3fcrop%3d0%2c0%2c0%2c0%26width%3d0%26height%3d0&key=5a9a85fb039414a94b82246eae7f93f8" /></ImgDiv>
          <ProductsDetails>
            <ProductsH4 href="#">Low Voltage Products and Systems</ProductsH4>
            <LongProductDetails> ABB offers the largest product range that meets NEMA, UL & CSA standards. Their unique offering of electrical control and protection products enable customers to significantly reduce panel costs. This vast group of products includes:  <ShowMoreBtn2 onClick={() => setShowText2(!showText2)}><FontAwesomeIcon icon='plus-circle' size='1x' /> {showText2 ? 'Show Less' : 'Show More '} </ShowMoreBtn2> </LongProductDetails>
            {showText2 && <div>
              <ListItemDiv>
                <ul>
                  <li>Alternating Relays</li>
                  <li>Analog Signal Converters</li>
                  <li>Arc Guard Systems</li>
                  <li>Cable Distribution Cabinets</li>
                  <li>Cam Switches</li>
                  <li>Circuit Breakers</li>
                  <li>Connection Devices</li>
                  <li>Contactors</li>
                  <li>Contact Protection Relays</li>
                  <li>Current Sensors</li>
                  <li>Current Monitors, 1PH</li>
                  <li>Current Transducers</li>
                  <li>Cycle Monitors</li>
                  <li>Distributed I/O</li>
                  <li>Disconnect Switches</li>
                  <li>Door Entry Systems</li>
                  <li>Electronic Relays</li>
                  <li>Enclosed Switches</li>
                  <li>Enclosures</li>
                  <li>Electronic Relays & Controls</li>
                  <li>Fieldbus Devices</li>
                  <li>Fieldbus Plug</li>
                </ul>
                <ul>
                  <li>Flashers</li>
                  <li>Fusegear</li>
                  <li>HVAC Controls</li>
                  <li>Interface Relays</li>
                  <li>Isolation Monitors</li>
                  <li>Limit Switches</li>
                  <li>Liquid Level Controls</li>
                  <li>Logic Relays</li>
                  <li>Man Machine Interface</li>
                  <li>Manual Motor Starters</li>
                  <li>Manual Motor Protectors</li>
                  <li>Modular DIN Rail Products</li>
                  <li>Motion Detectors</li>
                  <li>Motor Protectors, Electronic</li>
                  <li>Obstruction Lighting Controls</li>
                  <li>Operator Panels</li>
                  <li>Opto Couplers</li>
                  <li>Overload Relays</li>
                  <li>Panel Lamps</li>
                  <li>Panel Switches</li>
                  <li>Pilot Devices</li>
                  <li>Power Supplies</li>
                </ul>
                <ul>
                  <li>PLC's</li>
                  <li>Power Quality Products</li>
                  <li>Relays, Mechanical</li>
                  <li>Scalable PLC ACS500</li>
                  <li>Sensors</li>
                  <li>Sensor Interface Relays</li>
                  <li>Serial Data Converters</li>
                  <li>Signal Converters, Universal</li>
                  <li>Softstarters</li>
                  <li>Starters</li>
                  <li>Switches</li>
                  <li>Terminal Blocks</li>
                  <li>Thermistor Motor Protectors</li>
                  <li>Timers</li>
                  <li>Tower Lighting Controls</li>
                  <li>Universal Motor Controller</li>
                  <li>Vending Controls</li>
                  <li>Voltage Monitors</li>
                  <li>Wireless Devices</li>
                  <li>Winding Overtemperature Monitors</li>
                </ul>
              </ListItemDiv>
            </div>}
            <ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop ABB's Control Systems Products</ShopProducts>
          </ProductsDetails>
        </ProductsDiv>
        <ProductsDiv>
          <ProductsDetails>
            <ProductsH4 href="#">Medium Voltage Products and Systems</ProductsH4>
            ABB provides utility, industrial and commercial customers with safe, reliable and smart technologies for the distribution of electricity. Airline’s offering includes Circuit Breakers, Compact Secondary Substations (CSS), Contactors, E-Houses, Fault Current Limitation and Arc Protection.
              <ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop ABB's Medium Voltage Products and Systems Products</ShopProducts>

          </ProductsDetails>
          <ImgDiv><Img src="https://resources.news.e.abb.com/images/2020/3/12/3/9IBA252859_720x540.jpg" /></ImgDiv>
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
                <ArticlesPicture src="https://www07.abb.com/images/librariesprovider87/products/packages/Ex-motor-and-drive-packages/thermistor-protection-modules-fptc-01-and-02.jpg?sfvrsn=1" />
              </ArticlesImgDiv>
              <ArticlesTopic>
                Thermistor protection modules for ACS880 drives
              <ArticlesShortLine></ArticlesShortLine>
              </ArticlesTopic>
              <ArticlesContentDetails>The ACS880 drives are available with ATEX-certified thermistor protection module FPTC-02 or with functional safety certified thermistor protection module FPTC-01 for ensuring safe motor temperature. These option modules enhance process safety and simplify installation.<a href="https://new.abb.com/drives/segments/motors-and-drives-in-potentially-explosive-atmospheres/thermistor-protection-modules" target="_blank"> Read more >> </a></ArticlesContentDetails>
            </ArticlesContentDiv>
          </SmallArticlesContent>
          <SmallArticlesContent>
            <ArticlesContentDiv>
              <ArticlesImgDiv>
                <ArticlesPicture src="https://www07.abb.com/images/librariesprovider87/Customer-cases/riecor-farming-motors.jpg?sfvrsn=1" />
              </ArticlesImgDiv>
              <ArticlesTopic>
                Drives give South African farmer 40% energy savings, smoother operation and less work
              <ArticlesShortLine></ArticlesShortLine>
              </ArticlesTopic>
              <ArticlesContentDetails>Sometimes, when you are trying to solve one problem you can inadvertently cause another one. However, in the case of Riecor Farming in South Africa an attempt to resolve one problem actually solved it extremely well and, in addition, gave numerous side benefits that decreases costs, work and headaches while making the farmer’s job easier. <a href="https://new.abb.com/drives/media/customer-case-riecor-farming" target="_blank"> Read more >> </a>
              </ArticlesContentDetails>
            </ArticlesContentDiv>
          </SmallArticlesContent>
          <SmallArticlesContent>
            <ArticlesContentDiv>
              <ArticlesImgDiv>
                <ArticlesPicture src="https://www07.abb.com/images/librariesprovider100/references/m%C3%A4larenergi/malarenergi_waste-to-energy-plant.jpg?sfvrsn=32aa5715_1" />
              </ArticlesImgDiv>
              <ArticlesTopic>
                ABB drives and motors increase efficiency of Mälarenergi’s waste-to-energy plant
              <ArticlesShortLine></ArticlesShortLine>
              </ArticlesTopic>
              <ArticlesContentDetails>How can society meet its increasing demand for energy while reducing carbon emissions? Swedish utility Mälarenergi has achieved something significant as it faces this challenge head-on with its waste-to-energy plant Unit 6, one of the biggest in the world. <a href="#" target="_blank"> Read more >> </a> </ArticlesContentDetails>
            </ArticlesContentDiv>
          </SmallArticlesContent>
        </ArticlesDiv>
        <VideoDiv>
          <Video><ArticlesVideo src="https://www.youtube.com/embed/DOM7Eqg5Pzg"></ArticlesVideo></Video>
          <Video><ArticlesVideo src="https://www.youtube.com/embed/9YwszNopXY4"></ArticlesVideo></Video>
          <Video><ArticlesVideo src="https://www.youtube.com/embed/BLV5Qbkks6U"></ArticlesVideo></Video>
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
                <LinkStyle href="https://new.abb.com/us" target="_blank">
                  <FontAwesomeDiv>
                    <FontAwesomeIcon icon='globe-americas' size='4x' />
                  </FontAwesomeDiv>
                ABB's US Website</LinkStyle>
              </LinkStyleDiv>
            </RelatedLinkCircle>
            <RelatedLinkCircle>
              <LinkStyleDiv>
                <LinkStyle href="https://www.youtube.com/playlist?list=PLZbHgsYLXoyyGUCZ0_XgWc3-7agdSwrNX" target="_blank">
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
                shop abb products</LinkStyle>
              </LinkStyleDiv>
            </RelatedLinkCircle>
            <RelatedLinkCircle>
              <LinkStyleDiv>
                <LinkStyle href="#" target="_blank">
                  <FontAwesomeDiv>
                    <FontAwesomeIcon icon='address-book' size='4x' />
                  </FontAwesomeDiv>
                abb Catalogs</LinkStyle>
              </LinkStyleDiv>
            </RelatedLinkCircle>
          </RelatedContainer>
        </RelatedLinkDiv>
      </BrandDetailsContainer>
    </Container >

  );
}

