import React, { useState, useContext } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import Context from '../../../config/context'
import { faAutoprefixer } from '@fortawesome/free-brands-svg-icons'
import ShowMoreText from 'react-show-more-text';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



const Container = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

const FeaturedBrandLogo = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 50px 0 50px 0;
  background-image: url('https://www.thomaselectrical.co.za/wp-content/uploads/2016/06/BACKGROUND-TOP.jpg');
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
  color:  	 #595959;
  text-transform: uppercase;
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

const ProductsH4 = styled.h4`
  margin: 0 auto;
  color: 	#000000;
  margin-bottom: 15px;
`;
const ShopAbbButton = styled.button`
  background-color: #b51029;
  width: 20%
  color: white;
  font-weight: 600;
  border-radius:28px;
  cursor:pointer;
  border: 0;
  padding: 5px;
  margin: 0 auto;
  margin-top: 30px;
  `;


const BorderBottom = styled.div`
  display: flex;
  border-bottom: 1px solid red;
  width: 80%;
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 50px;
  color: #b51029;
  `;

const RelatedLinkCircle = styled.div`
 width: 200px;
 height: 200px;
 border-radius: 100px;
 background-color: #b51029; 
 margin: 0 auto;
 position: relative;
 margin-bottom: 30px;

 `;

const LinkStyle = styled.a`
  color: white;
  text-decoration: none;
  font-size: 14px;
  position: absolute;
  top: 130px;
  margin-left: 50px;

 `;

const IconImg = styled.img`
 width: 35%;
 position: absolute;
 margin: 50px 0 0 65px;
 `;


const ArticlesDiv = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  margin-bottom: 30px;
  flex-direction:
`;

const ArticlesVideo = styled.iframe`
  width: 450px;
  height: 250px;
  margin: 0 15px 0 15px;
 
`;

const ArticlesContentDiv = styled.div`
  margin-left: 20px;
  text-align: center;
  // background-color: #E5E4E2;
  padding: 15px 0;
`;

const ArticlesTopic = styled.h6`
  color: #b51029;
  font-weight: bold;
  margin: 10px; 0 10px 0;
`;

const SmallArticlesContent = styled.div`
display: flex
flex-wrap: nowrap;
width: 33%;
margin-bottom: 30px;


`;

const BorderRight = styled.div`
border-right: 1px solid grey;
height: 45px;
`;



const ArticlesContentDetails = styled.p`
margin: 0 15px;
`;

export default function Abb() {
  function executeOnClick(isExpanded) {
    console.log(isExpanded);
  }

  return (

    <Container>
      <FeaturedBrandLogo>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/ABB_logo.svg/1280px-ABB_logo.svg.png" width="8%" />
      </FeaturedBrandLogo>
      <BrandDetailsContainer>

        <AirlineDistributorH1>Airline is your Authorized Distributor of ABB Products
        </AirlineDistributorH1>
        <DistributorDetails>ABB is a leader in power and automation technologies that enable utility and industry customers to improve performance while lowering environmental impact. ABB’s automation technologies blend a robust product portfolio with end-user expertise to deliver solutions for control, motion, protection, and plant integration.</DistributorDetails>
        <Div>
          <ShopAbbButton onClick={() => alert("clicked!")}>Shop for ABB Products </ShopAbbButton>
        </Div>

        <Div>
          <ProductsTitle>Products</ProductsTitle>
          <BorderBottom></BorderBottom>
        </Div>

        <ProductsDiv>
          <img src="https://base.imgix.net/files/base/ebm/machinedesign/image/2019/04/machinedesign_11709_wtdmotors_promo.png?auto=format&fit=crop&h=432&w=768" width="450px" height="250px" />
          <ProductsDetails>
            <ProductsH4>Drives</ProductsH4>
            ABB’s offering includes low voltage AC and DC drives and medium voltage AC drives which are used across all industries and applications. ABB drives offer application-specific functionality, control for different types of motors as well as flexible connectivity to automation networks.
          </ProductsDetails>

        </ProductsDiv>
        <ProductsDiv>
          <ProductsDetails>
            <ProductsH4>Motors and Generators</ProductsH4>
            ABB offers a comprehensive range of reliable and high-efficiency motors and generators for all applications. Choose from IEC DC Motors, IEC Low Voltage AC Motors, Servo Motors, Synchronous Motors, or Synchronous Reluctance Motor and Drive Packages.
            </ProductsDetails>
          <img src="https://www07.abb.com/images/librariesprovider100/pg-iec-lv-motors/group-photo-of-iec-lv-motors_crop.jpg?sfvrsn=c1785e14_1" width="450px" height="250px" />
        </ProductsDiv>
        <ProductsDiv>
          <img src="https://img.directindustry.com/images_di/photo-g/19831-10658086.jpg" width="450px" height="250px" />
          <ProductsDetails>
            <ProductsH4>Transformers</ProductsH4>
            ABB offers a full range of transformer products and solutions for ANSI, IEC and other local standards. ABB is a major transformer manufacturer throughout the world and offers both liquid-filled and dry-type transformers.
          </ProductsDetails>
        </ProductsDiv>
        <ProductsDiv>
          <ProductsDetails>
            <ProductsH4>Control Components</ProductsH4>
            ABB is the #1 global provider of control technologies for industry, power and water. Airline offers the platforms and systems listed below to optimize processes and deliver operational excellence.
          </ProductsDetails>
          <img src="https://library.automationdirect.com/wp-content/uploads/2019/04/Figure-1-BRX-control-panel.jpg" width="450px" height="250px" />
        </ProductsDiv>
        <ProductsDiv>
          <img src="https://www07.abb.com/images/librariesprovider84/home-page/dr-newemax_emax2acdd56edc1f463c09537ff0000433538.jpg?sfvrsn=9c293515_1" width="450px" height="250px" />
          <ProductsDetails>
            <ProductsH4>Low Voltage Products and Systems</ProductsH4>
            <ShowMoreText
              lines={4}
              more='Show more'
              less='Show less'
              anchorClass=''
              onClick={() => executeOnClick()}
              expanded={false}
            >

              {/* ABB offers the largest product range that meets NEMA, UL & CSA standards. Their unique offering of electrical control and protection products enable customers to significantly reduce panel costs. This vast group of products includes: */}
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
 Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
 
 
          </ShowMoreText>
          </ProductsDetails>


        </ProductsDiv>
        <ProductsDiv>
          <ProductsDetails>
            <ProductsH4>Medium Voltage Products and Systems</ProductsH4>
            ABB provides utility, industrial and commercial customers with safe, reliable and smart technologies for the distribution of electricity. Airline’s offering includes Circuit Breakers, Compact Secondary Substations (CSS), Contactors, E-Houses, Fault Current Limitation and Arc Protection.
          </ProductsDetails>
          <img src="https://www.gegridsolutions.com/HVMV_Equipment/Images/PrimaryEquipment/hvmv-gis.jpg" width="450px" height="250px" />
        </ProductsDiv>

        <Div>
          <ProductsTitle>Articles</ProductsTitle>
          <BorderBottom></BorderBottom>
        </Div>

        <SmallArticlesContent>
          <ArticlesContentDiv>
          <img src="https://www07.abb.com/images/librariesprovider87/products/packages/Ex-motor-and-drive-packages/thermistor-protection-modules-fptc-01-and-02.jpg?sfvrsn=1" width="260px" height="160px" />
            <ArticlesTopic>
              Thermistor protection modules for ACS880 drives</ArticlesTopic>
            <ArticlesContentDetails>The ACS880 drives are available with ATEX-certified thermistor protection module FPTC-02 or with functional safety certified thermistor protection module FPTC-01 for ensuring safe motor temperature. These option modules enhance process safety and simplify installation.<a href="https://new.abb.com/drives/segments/motors-and-drives-in-potentially-explosive-atmospheres/thermistor-protection-modules" target="_blank"> Read more >> </a></ArticlesContentDetails>
          </ArticlesContentDiv>
        </SmallArticlesContent>

        <SmallArticlesContent>
          <ArticlesContentDiv>
          <img src="https://www07.abb.com/images/librariesprovider87/Customer-cases/riecor-farming-abb-drive-installed.jpg?sfvrsn=1"  width="260px" height="160px"/>
            <ArticlesTopic>
              Drives give South African farmer 40% energy savings, smoother operation and less work</ArticlesTopic>
            <ArticlesContentDetails>Sometimes, when you are trying to solve one problem you can inadvertently cause another one. However, in the case of Riecor Farming in South Africa an attempt to resolve one problem actually solved it extremely well and, in addition, gave numerous side benefits that decreases costs, work and headaches while making the farmer’s job easier. <a href="https://new.abb.com/drives/media/customer-case-riecor-farming" target="_blank"> Read more >> </a>
            </ArticlesContentDetails>
          </ArticlesContentDiv>
          </SmallArticlesContent>

          <SmallArticlesContent>
          <ArticlesContentDiv>
            <img src="https://www07.abb.com/images/librariesprovider87/Customer-cases/riecor-farming-motors.jpg?sfvrsn=1"  width="260px" height="160px" />
            <ArticlesTopic>
              Lorem ipsum dolor sit amet</ArticlesTopic>
            <ArticlesContentDetails>Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,  <a href="#" target="_blank"> Read more >> </a> </ArticlesContentDetails>
          </ArticlesContentDiv>
          </SmallArticlesContent>


          <ArticlesDiv>
          <ArticlesVideo src="https://www.youtube.com/embed/DOM7Eqg5Pzg"></ArticlesVideo>
          <ArticlesVideo src="https://www.youtube.com/embed/9YwszNopXY4"></ArticlesVideo>
          <ArticlesVideo src="https://www.youtube.com/embed/BLV5Qbkks6U"></ArticlesVideo>
        </ArticlesDiv>

        <Div>
          <ProductsTitle>Related Link</ProductsTitle>
          <BorderBottom></BorderBottom>
        </Div>

        <Div>
          <RelatedLinkCircle>
            <IconImg src="https://www.konfest.com/wp-content/uploads/2019/05/Konfest-PNG-JPG-Image-Pic-Photo-Free-Download-Royalty-Unlimited-clip-art-sticker-world-wide-web-icons-website-earth-grid-globe-black-white-12.png"></IconImg>

            <LinkStyle href="https://new.abb.com/us" target="_blank">ABB's US Website</LinkStyle>
          </RelatedLinkCircle>
          <RelatedLinkCircle>
            <IconImg src="#"></IconImg>
            <LinkStyle href="https://www.youtube.com/playlist?list=PLZbHgsYLXoyyGUCZ0_XgWc3-7agdSwrNX" target="_blank">Videos</LinkStyle>
          </RelatedLinkCircle>
          <RelatedLinkCircle></RelatedLinkCircle>
          <RelatedLinkCircle></RelatedLinkCircle>
        </Div>


      </BrandDetailsContainer>

    </Container>

  );
}

