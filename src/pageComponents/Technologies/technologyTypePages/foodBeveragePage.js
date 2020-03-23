import React, { useState, useContext } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
// import Context from '../../../config/context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import "react-responsive-carousel/lib/styles/carousel.min.css";





const Container = styled.div`
  display: flex;
 
  flex-wrap: wrap;
`;

const FeaturedBrandLogo = styled.div`
  display: flex;
  width: 2000px;
  justify-content: center;
  padding: 150px 0;
  background-image: url('https://media.istockphoto.com/photos/factory-line-and-products-picture-id172401094?s=2048x2048');
 
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



const ShopProducts = styled.a`
  color: #246696;
  font-size: 14px;
  margin-top: 10px;
  
`;






export default function FoodBeverage() {

  const [showText1, setShowText1] = useState(false);
  const [showText2, setShowText2] = useState(false);




  return (



    
    <Container>
        <FeaturedBrandLogo>
      
      </FeaturedBrandLogo>
        
      <BrandDetailsContainer>

        <AirlineDistributorH1>Food and Beverage
        </AirlineDistributorH1>
        <DistributorDetails>ABB is a leader in power and automation technologies that enable utility and industry customers to improve performance while lowering environmental impact. ABB’s automation technologies blend a robust product portfolio with end-user expertise to deliver solutions for control, motion, protection, and plant integration.</DistributorDetails>
        <Div>
          <ShopAbbButton>Shop for ABB Products </ShopAbbButton>
        </Div>


        {/*............................... PRODUCTS................................... */}

        <Div>
          <ProductsTitle>applications</ProductsTitle>
          <BorderBottom></BorderBottom>
        </Div>

        <ProductsDiv>
          <img src="https://base.imgix.net/files/base/ebm/machinedesign/image/2019/04/machinedesign_11709_wtdmotors_promo.png?auto=format&fit=crop&h=432&w=768" width="450px" height="250px" />
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
          <img src="https://www07.abb.com/images/librariesprovider100/pg-iec-lv-motors/group-photo-of-iec-lv-motors_crop.jpg?sfvrsn=c1785e14_1" width="450px" height="250px" />
        </ProductsDiv>
        <ProductsDiv>
          <img src="https://img.directindustry.com/images_di/photo-g/19831-10658086.jpg" width="450px" height="250px" />
          <ProductsDetails>
            <ProductsH4 href="#">Transformers</ProductsH4>
            ABB offers a full range of transformer products and solutions for ANSI, IEC and other local standards. ABB is a major transformer manufacturer throughout the world and offers both liquid-filled and dry-type transformers.
            <ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop ABB's Transformers Products</ShopProducts>
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

          <ArticlesVideo src="https://www.youtube.com/embed/DOM7Eqg5Pzg"></ArticlesVideo>
          <ArticlesVideo src="https://www.youtube.com/embed/9YwszNopXY4"></ArticlesVideo>
          <ArticlesVideo src="https://www.youtube.com/embed/BLV5Qbkks6U"></ArticlesVideo>
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
        </Div>


      </BrandDetailsContainer>

    </Container >
   
  );
}

