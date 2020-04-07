import React, { useState, useContext } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import Context from '../../../config/context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import SectionHeader from '../../_common/sectionHeader.js'

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
const ShopAbbButton = styled.button`
  background-image: linear-gradient(to left top, rgb(149, 15, 35), rgb(219, 22, 51));
  width: 20%
  color: white;
  font-weight: 600;
  border-radius:28px;
  border: 0;
  padding: 5px;
  margin: 0 auto;
  margin-top: 30px;
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
  max-width: 150px;
`
const BannerImg = styled.img`
  width: 100%;
`

export default function Abb() {

  return (

    <Container>
      <FeaturedBrandLogo>
       <BannerDiv> <BannerImg src="https://clthompson.com/wp-content/uploads/2019/10/aventics-logo.png"/></BannerDiv>
      </FeaturedBrandLogo>
      <BrandDetailsContainer>
        <AirlineDistributorH1>Aventics
        </AirlineDistributorH1>
        <DistributorDetails>Aventics, formerly Bosch Rexroth Pneumatics, provides pneumatic, electro-pneumatic, and electronic products for industrial automation, oilfield, mobile and marine applications. Aventics has a sophisticated and extensive product line, offering standard products in both NPT and ISO G (BSPP) port configurations, as well as application-specific custom product solutions. Products include pneumatic valves and actuators, pneumatic and hydraulic cylinders, pneumatic fieldbus valve manifolds, electro-pneumatic valves and positioners, FRLs, tubing and fittings, vacuum components, industrial shock absorbers and tooth chain products.</DistributorDetails>
        <Div>
          <ShopAbbButton>Shop for Aventics Products </ShopAbbButton>
        </Div>

        {/*............................... PRODUCTS................................... */}

        <Div>
          <ProductsTitle>Products</ProductsTitle>
          <BorderBottom></BorderBottom>
        </Div>
        <ProductsDiv>
          <ImgDiv>  <Img src="https://www.aventics.com/media/_processed_/a/6/zugankerzylinder-p_689622bbc4.jpg" /></ImgDiv>
          <ProductsDetails>
            <ProductsH4 href="#">Air Cylinders</ProductsH4>
            NFPA steel air cylinders, rodless shuttle cylinders, round mini cylinders, aluminum cylinders, stainless steel cylinders and compact cylinders. Construction grade (cast iron) and multi-position air cylinders normally used for mobile/construction and oilfield applications, mounting bracket kits for mating to SUNSTRAND pumps.
            <ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop Aventics's Air Cylinders Products</ShopProducts>
          </ProductsDetails>
        </ProductsDiv>
        <ProductsDiv>
          <ProductsDetails>
            <ProductsH4 href="#">Air Prep Equipment</ProductsH4>
            Filters, regulators and lubricators with NPT or G(ISO) BSPP ports, as well as lockout valves, slow start valves and anti-freezer units.
             <ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop Aventics's Air Prep Equipment Products</ShopProducts>
          </ProductsDetails>
          <ImgDiv><Img src="https://www.aventics.com/media/_processed_/5/a/FRLs2019-p_09c5aff1f5.png" /></ImgDiv>
        </ProductsDiv>
        <ProductsDiv>
          <ImgDiv><Img src="https://www.aventics.com/media/_processed_/2/2/ventilsysteme-p_141dc6d694.jpg" /></ImgDiv>
          <ProductsDetails>
            <ProductsH4 href="#">Valves</ProductsH4>
            Pneumatic directional control valves, choose from in-line valves, manual / mechanical valves, plug-in valve manifold systems or traditional valve manifold systems. AVENTICS pneumatic valves for oilfield and mobile applications have been the industry leader for decades due to their rugged, proven reliability and precise control. Graduated pneumatic pressure delivery, most often used for mobile, oilfield and marine application.
          <ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop Aventics's Valves Products</ShopProducts>
          </ProductsDetails>
        </ProductsDiv>
        <ProductsDiv>
          <ProductsDetails>
            <ProductsH4 href="#">Electrical Products</ProductsH4>
            AVENTICS electro-pneumatic (E/P) pressure control valves offer industry leading performance. The converter valves provide graduated pneumatic pressure outputs directly proportional to analog electrical signal inputs (voltage or current). AVENTICS pneumatic valves for oilfield and mobile applications have been the industry leader for decades due to their rugged, proven reliability and precise control. Graduated pneumatic pressure delivery, most often used for mobile, oilfield and marine application.
            <ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop Aventics's Electrical Products</ShopProducts>
          </ProductsDetails>
          <ImgDiv><Img src="https://www.aventics.com/media/_processed_/a/f/AVENTICS_EV03_E-P_Pair_21a36c392d.jpg" /></ImgDiv>
        </ProductsDiv>
        <ProductsDiv>
          <ImgDiv><Img src="https://www.aventics.com/media/_processed_/d/7/CERAM-ib_2998298d11.jpg" /></ImgDiv>
          <ProductsDetails>
            <ProductsH4 href="#">Pneumatic Accessories</ProductsH4>
            Accessory air valves and devices such as flow control valves and quick exhaust valves, plus part present sensing, air gauges, timing volumes, shock absorbers, fittings and air line tubing.
            <ShopProducts href="https://www.airlinehyd.com/Results.aspx?cat=PNEUMATIC-COMPONENTS-5|2239"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop Aventics's Pneumatic Accessories Products</ShopProducts>
          </ProductsDetails>
        </ProductsDiv>

        {/*.................................. ARTICLES................................... */}

        <Div>
          <ProductsTitle>Articles & Videos</ProductsTitle>
          <BorderBottom></BorderBottom>
        </Div>
        <ArticlesDiv>
          <SmallArticlesContent>
            <ArticlesContentDiv>
              <ArticlesImgDiv>
                <ArticlesPicture src="https://www.aventics.com/media/_processed_/5/5/Landingpage-ib_140d01280c.jpg" />
              </ArticlesImgDiv>
              <ArticlesTopic>
                The Internet of Things
              <ArticlesShortLine></ArticlesShortLine>
              </ArticlesTopic>
              <ArticlesContentDetails>Intelligent pneumatic systems build bridges to the Internet of Things, ensure system availability, and lower operating costs thanks to central analysis and control electronics.<a href="https://www.aventics.com/us/en/industries-trends/top-trends-and-topics/industry-40-iot/" target="_blank"> Read more >> </a></ArticlesContentDetails>
            </ArticlesContentDiv>
          </SmallArticlesContent>
          <SmallArticlesContent>
            <ArticlesContentDiv>
              <ArticlesImgDiv>
                <ArticlesPicture src="https://www.aventics.com/media/_processed_/3/e/ES05_-_the_simple_solution_for_elementary_pneumatics_6319ac1552.jpg" />
              </ArticlesImgDiv>
              <ArticlesTopic>
                ES05 – the simple solution for elementary pneumatics
              <ArticlesShortLine></ArticlesShortLine>
              </ArticlesTopic>
              <ArticlesContentDetails>ES05 is a valve system that has been designed especially for standard pneumatics applications and industrial automation. Simple, flexible and efficient – without bells and whistles. <a href="https://www.aventics.com/us/en/pneumatics-shop/single-valves-pgr.256154" target="_blank"> Read more >> </a>
              </ArticlesContentDetails>
            </ArticlesContentDiv>
          </SmallArticlesContent>
          <SmallArticlesContent>
            <ArticlesContentDiv>
              <ArticlesImgDiv>
                <ArticlesPicture src="https://www.aventics.com/media/AVENTICS_USA/Expertise/Trends_topics/IoT/SPA_250wide.jpg" />
              </ArticlesImgDiv>
              <ArticlesTopic>
                It’s that easy: AVENTICS supplies pneumatics at the press of a button
              <ArticlesShortLine></ArticlesShortLine>
              </ArticlesTopic>
              <ArticlesContentDetails>You are the center of our attention. We offer fast results and reliable, simple solutions for industrial pneumatics. Based on our many years of expertise, we develop customized products for your applications, tailored to your needs and delivered just in time. Our service: We are at your service at the press of a button! Our ambition is being the smart pneumatic company that is easy to do business with: It’s that easy.
          </ArticlesContentDetails>
            </ArticlesContentDiv>
          </SmallArticlesContent>
        </ArticlesDiv>
        <VideoDiv>
          <Video><ArticlesVideo src="https://www.youtube.com/embed/_r27LoChqMA"></ArticlesVideo></Video>
          <Video><ArticlesVideo src="https://www.youtube.com/embed/sILf43yMi3c"></ArticlesVideo></Video>
          <Video><ArticlesVideo src="https://www.youtube.com/embed/H9slLX3o3KQ"></ArticlesVideo></Video>
        </VideoDiv>

        {/*.............................. RELATED LINK ................................... */}

        <RelatedLinkDiv>
          <Div>
            <ProductsTitle>Related Links</ProductsTitle>
            <BorderBottom></BorderBottom>
          </Div>
          <RelatedContainer>
            <RelatedLinkCircle>
              <LinkStyleDiv>
                <LinkStyle href="http://www.aventics.us/en/homepage/" target="_blank">
                  <FontAwesomeDiv>
                    <FontAwesomeIcon icon='globe-americas' size='4x' />
                  </FontAwesomeDiv>
                Aventics's US Website</LinkStyle>
              </LinkStyleDiv>
            </RelatedLinkCircle>
            <RelatedLinkCircle>
              <LinkStyleDiv>
                <LinkStyle href="https://www.youtube.com/user/aventics" target="_blank">
                  <FontAwesomeDiv>
                    <FontAwesomeIcon icon={faYoutube} size='4x' />
                  </FontAwesomeDiv>
                Videos</LinkStyle>
              </LinkStyleDiv>
            </RelatedLinkCircle>
            <RelatedLinkCircle>
              <LinkStyleDiv>
                <LinkStyle href="https://www.airlinehyd.com/Results.aspx?srh=Aventics&x=0&y=0" target="_blank">
                  <FontAwesomeDiv>
                    <FontAwesomeIcon icon='shopping-cart' size='4x' />
                  </FontAwesomeDiv>
                shop Aventics products</LinkStyle>
              </LinkStyleDiv>
            </RelatedLinkCircle>
            <RelatedLinkCircle>
              <LinkStyleDiv>
                <LinkStyle href="https://www.airlinehyd.com/customer/aihyco/b2bse/catalogrequest.aspx?mfg=Aventics%20(Bosch%20Rexroth)" target="_blank">
                  <FontAwesomeDiv>
                    <FontAwesomeIcon icon='address-book' size='4x' />
                  </FontAwesomeDiv>
                Aventics Catalogs</LinkStyle>
              </LinkStyleDiv>
            </RelatedLinkCircle>
          </RelatedContainer>
        </RelatedLinkDiv>
      </BrandDetailsContainer>
    </Container >

  );
}


