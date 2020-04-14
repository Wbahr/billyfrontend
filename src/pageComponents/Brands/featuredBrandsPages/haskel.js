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
  align-items: center;
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
`
const Img = styled.img`
  width: 100%;
  object-fit: contain;
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
export default function Haskel() {
  const [showText1, setShowText1] = useState(false);

  return (
    <Container>
      <FeaturedBrandLogo>
        <BannerDiv><BannerImg src="https://www.airlinehyd.com/customer/aihyco/images/haskel-logo-master.png" /></BannerDiv>
      </FeaturedBrandLogo>
      <BrandDetailsContainer>
        <AirlineDistributorH1>Haskel
        </AirlineDistributorH1>
        <DistributorDetails>Haskel International, Inc. is the world's leading manufacturer of high-pressure liquid pumps, gas boosters, air pressure amplifiers, and high pressure systems and accessories. For over a half-century, the Company has been recognized as a leader in high-pressure technology. Haskel’s products have a wide range of applications generally focused on the pressurization, transfer, storage or control of liquids and gases under pressure. Typically, the applications include pressure testing, work holding and actuation, transferring and mixing of liquids and gases under pressure and generally ensuring the effectiveness of the customer's production and quality processes. Haskel's products are frequently used in safety devices and the protection of the environment.</DistributorDetails>
        <Div>
          <ShopAbbButton>Shop for Haskel Products </ShopAbbButton>
        </Div>

        {/*............................... PRODUCTS................................... */}

        <SectionDiv>
          <ProductsTitle>Products</ProductsTitle>
          <BorderBottom></BorderBottom>
        </SectionDiv>
        <ProductsDiv>
          <ImgDiv> <Img src="https://www.haskel.com/wp-content/uploads/aad-2-2.jpg" /></ImgDiv>
          <ProductsDetails>
            <ProductsH4 href="#">Air pressure amplifiers</ProductsH4>
          Haskel air pressure amplifiers offer the most comprehensive operating range in the industry, combining simple principles of operation with rugged construction suitable for the most demanding industrial applications.  Capable of producing pressure outputs up to 5000 psi (345 bar), Haskel air amplifiers are compact, require no electrical or mechanical drive connections, are powered by the same air that they amplify, and can be mounted in any position.
              <ListItemDiv>
              <ul>
                <li>Infinitely variable outlet pressure and flow capability</li>
                <li>No heat, flame or spark risk</li>
                <li>No air line lubrication required - eliminates oily exhausts</li>
                <li>Long seal life with easy maintenance</li>
                <li>Wide range of models, controls and options</li>
                <li>Wide range of standard and custom systems</li>
              </ul>
            </ListItemDiv>
            <ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop Haskel's Air pressure amplifiers Products</ShopProducts>
          </ProductsDetails>
        </ProductsDiv>
        <ProductsDiv>
          <ProductsDetails>
            <ProductsH4 href="#">Air-driven liquid pumps</ProductsH4>
            Air Driven Pumps are used industrially to pump a wide variety of liquids, handling a consistency range from thin and viscous to thick slurries. The pumps are ideal when flammable gas is present, requiring no electricity to work and delivering constant flow and a consistently high pressure. Liquids handled include, but are not limited to – petroleum based oils, water, diesel fuel, most phosphate-ester based fire-resistant hydraulic fluids, petroleum based solvents, Skydrol and Aerosafe fluid, deionized water and demineralized water.
            <ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop Haskel's Air-driven liquid pumps Products</ShopProducts>
          </ProductsDetails>
          <ImgDiv><Img src="https://www.haskel.com/wp-content/uploads/GFS35.jpg" /></ImgDiv>
        </ProductsDiv>
        <ProductsDiv>
          <ImgDiv><Img src="https://www.haskel.com/wp-content/uploads/Refrigerant-Pump.png" /></ImgDiv>
          <ProductsDetails>
            <ProductsH4 href="#">Air & hydraulic-driven gas boosters</ProductsH4>
            Haskel Gas Boosters are used to clean and boost the pressures — up to 39,000 psi (2690 bar) — of most types of gas, such as oxygen, argon and hydrogen. A Gas Booster eliminates the need for potentially more costly gas stored in higher-pressure supply cylinders. Instead, you will be able to boost gas repeatedly to the required pressures in a safe, reliable manner, with no heat, flame or spark risk.
            <LongProductDetails> Gas Boosters are ideal for increasing gas pressure, transferring high-pressure gas, charging cylinders and scavenging.
            <ShowMoreBtn1 onClick={() => setShowText1(!showText1)}>{showText1 ? <><FontAwesomeIcon icon='minus-circle' size='1x' /> Show Less </>: <><FontAwesomeIcon icon='plus-circle' size='1x' /> Show More  </>} </ShowMoreBtn1> </LongProductDetails>
            {showText1 && <div>
              <ListItemDiv>
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
              </ListItemDiv>
              <LongProductDetails>Before you think about what you are building next, think about how you will defend it. You need a device with connected and communicating built-in electronics, ability to generate the data to help you optimize your facilities performance, and the ability to mitigate arc ﬂash keeping your employees, customers and end-users safe. With Eaton’s new globally rated Power Defense™ molded case circuit breakers, you can now plan with conﬁdence. Start planning your defense now.</LongProductDetails>
            </div>}
            <ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop Haskel's Air & hydraulic-driven gas boosters Products</ShopProducts>
          </ProductsDetails>
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
                <ArticlesPicture src="https://solutions.haskel.com/hs-fs/hubfs/IIot_header.jpg?width=628&name=IIot_header.jpg" />
              </ArticlesImgDiv>
              <ArticlesTopic>
                Embracing the Industrial IoT to Advance High-Pressure Manufacturing
              <ArticlesShortLine></ArticlesShortLine>
              </ArticlesTopic>
              <ArticlesContentDetails>The “Internet of Things (IoT)” is a concept that has gained considerable exposure over the past decade, becoming increasingly embedded in household objects in order to more easily enable the sending and receiving of data. The IoT has already significantly changed the way that we live and work (Amazon’s Alexa, anyone?). <a href="https://solutions.haskel.com/blog/embracing-the-industrial-iot-to-advance-high-pressure-manufacturing" target="_blank"> Read more >> </a></ArticlesContentDetails>
            </ArticlesContentDiv>
          </SmallArticlesContent>
          <SmallArticlesContent>
            <ArticlesContentDiv>
              <ArticlesImgDiv>
                <ArticlesPicture src="https://solutions.haskel.com/hs-fs/hubfs/Images%20Blog/Noise%20Levels_chart%20comparison.jpg?width=371&name=Noise%20Levels_chart%20comparison.jpg" />
              </ArticlesImgDiv>
              <ArticlesTopic>
                A Quiet Change in Compression Technology has Arrived
              <ArticlesShortLine></ArticlesShortLine>
              </ArticlesTopic>
              <ArticlesContentDetails>When it comes to workplace noise levels, how loud is too loud? Ear-damaging workplace noise is a widespread problem that impacts employees in many lines of work. According to the Occupational Safety and Health Organization (OSHA), at least 22 million workers are exposed to potentially damaging noise every year. <a href="https://solutions.haskel.com/blog/a-quiet-change-to-compression-technology-has-arrived" target="_blank"> Read more >> </a>
              </ArticlesContentDetails>
            </ArticlesContentDiv>
          </SmallArticlesContent>
          <SmallArticlesContent>
            <ArticlesContentDiv>
              <ArticlesImgDiv>
                <ArticlesPicture src="https://solutions.haskel.com/hs-fs/hubfs/Images%20Blog/4%20Steps%20Planning_High%20Pressure%20System_resize.png?width=608&name=4%20Steps%20Planning_High%20Pressure%20System_resize.png" />
              </ArticlesImgDiv>
              <ArticlesTopic>
                4 Steps for Planning Your High-Pressure Gas & Liquid System Purchase
              <ArticlesShortLine></ArticlesShortLine>
              </ArticlesTopic>
              <ArticlesContentDetails>Designing a system for delivering highly pressurized gas and liquids requires engineers to successfully meet the challenge of achieving necessary flow input while mitigating potentially dangerous flow failure situations. The unique needs of the application the system is being used in must be carefully considered prior to the purchase of system equipment. <a href="https://solutions.haskel.com/blog/4-steps-for-planning-your-high-pressure-gas-liquid-system-purchase" target="_blank"> Read more >> </a>
              </ArticlesContentDetails>
            </ArticlesContentDiv>
          </SmallArticlesContent>
        </ArticlesDiv>

        {/*.............................. RELATED LINK ................................... */}

        <RelatedLinkDiv>
          <SectionDiv>
            <ProductsTitle>Related Links</ProductsTitle>
            <BorderBottom></BorderBottom>
          </SectionDiv>
          <RelatedContainer>
            <RelatedLinkCircle>
              <LinkStyleDiv>
                <LinkStyle href="http://www.haskel.com/" target="_blank">
                  <FontAwesomeDiv>
                    <FontAwesomeIcon icon='globe-americas' size='4x' />
                  </FontAwesomeDiv>
                Haskel's US Website</LinkStyle>
              </LinkStyleDiv>
            </RelatedLinkCircle>
            <RelatedLinkCircle>
              <LinkStyleDiv>
                <LinkStyle href="#" target="_blank">
                  <FontAwesomeDiv>
                    <FontAwesomeIcon icon='shopping-cart' size='4x' />
                  </FontAwesomeDiv>
                Shop Haskel products</LinkStyle>
              </LinkStyleDiv>
            </RelatedLinkCircle>
            <RelatedLinkCircle>
              <LinkStyleDiv>
                <LinkStyle href="https://www.airlinehyd.com/customer/aihyco/b2bse/catalogrequest.aspx?mfg=Eaton" target="_blank">
                  <FontAwesomeDiv>
                    <FontAwesomeIcon icon='address-book' size='4x' />
                  </FontAwesomeDiv>
                Haskel Catalogs</LinkStyle>
              </LinkStyleDiv>
            </RelatedLinkCircle>
          </RelatedContainer>
        </RelatedLinkDiv>
      </BrandDetailsContainer>
    </Container >
  );
}