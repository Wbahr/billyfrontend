import React, { useState, useContext } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import Context from '../../../config/context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import "react-responsive-carousel/lib/styles/carousel.min.css";




const Container = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

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

  `;


const BrandDetailsContainer = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;
  flex-wrap: wrap;
  margin: 0 auto;
  

  `;


const ProductsDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 16px;
  margin: 0px 30px 0 30px;
  align-content: center;
  
`;


const AirlineDistributorH1 = styled.h1`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  margin-top: 40px;

`;

const DistributorDetails = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;
`;

const ProductsTitle = styled.div`
  font-size: 25px;
  margin-top: 27px;
  color: #555555;
  text-transform: uppercase;
  margin-right: 30px;
  letter-spacing: 2px;
`;

const Div = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  
`;

const ProductsDiv = styled.div`
  display: flex;  
  flex-wrap: nowrap;
  margin: 20px 0 20px 0;
  background-color:  #f2f2f2;
  padding: 15px 
`;

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
 
`;

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
  `;


const BorderBottom = styled.div`
  display: flex;
  border-bottom: 1px solid #555555;
  width: 75%;
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 50px;
  
  `;

const RelatedLinkCircle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: #ebe7e7; 
  margin: 0 auto;
  position: relative;
  margin-bottom: 30px;

 `;

const LinkStyle = styled.a`
  color: #246696;
  font-size: 16px;
  position: absolute;
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
  &:hover{
    color: #133752 ;
    text-decoration: none;
  }
 
 
 `;

const VideoDiv = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  margin-bottom: 30px;
  flex-direction:s
  margin: 0 auto;
  position: relative;

`;

const ArticlesVideo = styled.iframe`
  width: 450px;
  height: 250px;
  margin: 0 15px 0 15px;
 
`;

const ArticlesContentDiv = styled.div`
  margin-left: 20px;
  text-align: center;
  padding: 15px 0;


`;

const ArticlesPicture = styled.img`
  // width: 100%;
  height: 282.47px;
`;

const ArticlesShortLine = styled.div`
  display: flex;
  border-bottom: 2px solid #555555;
  width: 15%;
  margin: 25px 0;
 
  
  `;

const ArticlesTopic = styled.h6`
  color: #B51F2B;
  font-weight: bold;
  margin: 25px 15px;
  font-size: 18px;
  text-align: left;
`;

const ArticlesImgDiv = styled.div`

`;

const SmallArticlesContent = styled.div`
  display: flex
  flex-wrap: nowrap;
  width: 33%;
  margin-bottom: 30px;


`;

const FontAwesomeDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 20px;
  color: #DB1633;
  &:hover{
  color: #555555;
    
  }
`;

const LinkStyleDiv = styled.div`
  display: flex;
  justify-content: center;
  color: white;
`;


const ArticlesContentDetails = styled.p`
  margin: 0 15px;
  text-align: left;
  font-size: 14px;
`;

const ShowMoreBtn1 = styled.button`
  // background-color:  #246696;
  font-size: 12px;
  // color: white;
  border: none;
  border-radius:2em;
  padding: 4px 10px;
  margin: 0 auto;
  outline: none;

`;

const ShowMoreBtn2 = styled.button`
  // background-color:  #246696;
  font-size: 12px;
  // color: white;
  border: 0;
  border-radius:2em;
  padding: 4px 10px;
  margin: 0 auto;
 
  outline: none;
`;

const ListItemDiv = styled.div`
  font-size: 13px;
  margin-top: 10px;
  display: flex;

`;

const ShopProducts = styled.a`
  color: #246696;
  font-size: 14px;
  margin-top: 10px;
  
`;

const LongProductDetails = styled.p`
   margin:0;
`;

const CarouselDiv = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 1200px;
  width: 55%;
`;


export default function Abb() {

  const [showText1, setShowText1] = useState(false);
  const [showText2, setShowText2] = useState(false);


  return (

    <Container>
      <FeaturedBrandLogo>
        <img src="https://clthompson.com/wp-content/uploads/2019/10/aventics-logo.png" width="15%" />
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
          <img src="https://www.aventics.com/media/_processed_/a/6/zugankerzylinder-p_689622bbc4.jpg" width="450px" height="250px" />
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
          <img src="https://www.aventics.com/media/_processed_/5/a/FRLs2019-p_09c5aff1f5.png" width="450px" height="250px" />
        </ProductsDiv>
        <ProductsDiv>
          <img src="https://www.aventics.com/media/_processed_/2/2/ventilsysteme-p_141dc6d694.jpg" width="450px" height="250px" />
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
          <img src="https://www.aventics.com/media/_processed_/a/f/AVENTICS_EV03_E-P_Pair_21a36c392d.jpg" width="450px" height="250px" />
        </ProductsDiv>
        <ProductsDiv>
          <img src="https://www.aventics.com/media/_processed_/d/7/CERAM-ib_2998298d11.jpg" width="450px" height="250px" />
          <ProductsDetails>
            <ProductsH4 href="#">Pneumatic Accessories</ProductsH4>
            Accessory air valves and devices such as flow control valves and quick exhaust valves, plus part present sensing, air gauges, timing volumes, shock absorbers, fittings and air line tubing.
            <ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop Aventics's Pneumatic Accessories Products</ShopProducts>
          </ProductsDetails>
        </ProductsDiv>
       
        {/*.................................. ARTICLES................................... */}

        <Div>
          <ProductsTitle>Articles & Videos</ProductsTitle>
          <BorderBottom></BorderBottom>
        </Div>

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
              <ArticlesPicture src="https://www07.abb.com/images/librariesprovider87/Customer-cases/riecor-farming-abb-drive-installed.jpg?sfvrsn=1" />
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
              <ArticlesPicture src="https://www07.abb.com/images/librariesprovider87/Customer-cases/riecor-farming-motors.jpg?sfvrsn=1" />
            </ArticlesImgDiv>
            <ArticlesTopic>
              Lorem ipsum dolor sit amet
              <ArticlesShortLine></ArticlesShortLine>
            </ArticlesTopic>
            <ArticlesContentDetails>Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,  <a href="#" target="_blank"> Read more >> </a> </ArticlesContentDetails>
          </ArticlesContentDiv>
        </SmallArticlesContent>


        <VideoDiv>

          <ArticlesVideo src="https://www.youtube.com/embed/_r27LoChqMA"></ArticlesVideo>
          <ArticlesVideo src="https://www.youtube.com/embed/sILf43yMi3c"></ArticlesVideo>
          <ArticlesVideo src="https://www.youtube.com/embed/H9slLX3o3KQ"></ArticlesVideo>
        </VideoDiv>






        {/* ........................................SLIDESHOW TEST..................................... */}

        {/* <CarouselDiv>
          <Carousel>
            <VideoDiv>
              <iframe width="100%" height="100%" src="https://www.youtube.com/embed/DOM7Eqg5Pzg"></iframe>
            </VideoDiv>


            <VideoDiv>
              <iframe width="100%" height="100%" src="https://www.youtube.com/embed/9YwszNopXY4"></iframe>
            </VideoDiv>
            <VideoDiv>
              <iframe width="100%" height="100%" src="https://www.youtube.com/embed/BLV5Qbkks6U"></iframe>
            </VideoDiv>
            <VideoDiv>
              <img src="https://i0.wp.com/www.designgroupitalia.com/dgiuploads/2019/04/ABB_Group_Cover-2-960x542.jpg" />

            </VideoDiv>
          </Carousel>

        </CarouselDiv> */}



        {/* ........................................ END SLIDESHOW TEST..................................... */}





        {/*.............................. RELATED LINK ................................... */}

        <Div>
          <ProductsTitle>Related Links</ProductsTitle>
          <BorderBottom></BorderBottom>
        </Div>

        <Div>
          <RelatedLinkCircle>

            <LinkStyleDiv>
              <LinkStyle href="https://new.abb.com/us" target="_blank">
                <FontAwesomeDiv>
                  <FontAwesomeIcon icon='globe-americas' size='4x' />
                </FontAwesomeDiv>
                Aventics's US Website</LinkStyle>
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
                shop Aventics products</LinkStyle>
            </LinkStyleDiv>
          </RelatedLinkCircle>

          <RelatedLinkCircle>
            <LinkStyleDiv>
              <LinkStyle href="#" target="_blank">
                <FontAwesomeDiv>
                  <FontAwesomeIcon icon='address-book' size='4x' />
                </FontAwesomeDiv>
                Aventics Catalogs</LinkStyle>
            </LinkStyleDiv>
          </RelatedLinkCircle>
        </Div>


      </BrandDetailsContainer>

    </Container >

  );
}


