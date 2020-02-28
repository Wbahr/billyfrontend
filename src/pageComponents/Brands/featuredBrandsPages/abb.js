import React, { useState, useContext } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import Context from '../../../config/context'
import { faAutoprefixer } from '@fortawesome/free-brands-svg-icons'



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
  font-size: 16px;
  margin: 45px 20px 0 20px;
 
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
  color: gray;
  text-transform: uppercase;
`;

const Div = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  align-content: center;
  margin-bottom: 20px;
`;

const ProductsDiv = styled.div`
display: flex;  
flex-wrap: nowrap;
margin: 20px 0 20px 0;
`;

const ProductsH4 = styled.h4`
    text-align: center;
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
  `;

 const RelatedLinkCircle = styled.div`
 width: 200px;
 height: 200px;
 border-radius: 100px;
 background: red; 
 margin: 0 5px 0 5px;
 position: relative;
 text-align:center;

 `;

 const LinkStyle = styled.a`
  color: black;
  text-decoration: none;
  font-size: 14px;
  position: absolute;
  top: 50px;
 

 `;
export default function Abb() {

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
          <img src="https://base.imgix.net/files/base/ebm/machinedesign/image/2019/04/machinedesign_11709_wtdmotors_promo.png?auto=format&fit=crop&h=432&w=768" width="450px" height="250px"/>
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
          <img src="https://www07.abb.com/images/librariesprovider100/pg-iec-lv-motors/group-photo-of-iec-lv-motors_crop.jpg?sfvrsn=c1785e14_1" width="450px" height="250px"/>
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
          <img src="https://library.automationdirect.com/wp-content/uploads/2019/04/Figure-1-BRX-control-panel.jpg" width="450px" height="250px"/>
        </ProductsDiv>
        <ProductsDiv>
          <img src="https://www07.abb.com/images/librariesprovider84/home-page/dr-newemax_emax2acdd56edc1f463c09537ff0000433538.jpg?sfvrsn=9c293515_1"  width="450px" height="250px"/>
          <ProductsDetails>
            <ProductsH4>Low Voltage Products and Systems</ProductsH4>
            ABB offers the largest product range that meets NEMA, UL & CSA standards. Their unique offering of electrical control and protection products enable customers to significantly reduce panel costs. This vast group of products includes:

</ProductsDetails>
        </ProductsDiv>
        <ProductsDiv>
          <ProductsDetails>
            <ProductsH4>Medium Voltage Products and Systems</ProductsH4>
            ABB provides utility, industrial and commercial customers with safe, reliable and smart technologies for the distribution of electricity. Airline’s offering includes Circuit Breakers, Compact Secondary Substations (CSS), Contactors, E-Houses, Fault Current Limitation and Arc Protection.
          </ProductsDetails>
          <img src="https://www.gegridsolutions.com/HVMV_Equipment/Images/PrimaryEquipment/hvmv-gis.jpg"  width="450px" height="250px"/>
        </ProductsDiv>

        <Div>
        <ProductsTitle>Related Link</ProductsTitle>
          <BorderBottom></BorderBottom>
        </Div>

        <Div>
          <RelatedLinkCircle><LinkStyle href="https://new.abb.com/us" target="_blank">ABB's US Website</LinkStyle></RelatedLinkCircle>
          <RelatedLinkCircle></RelatedLinkCircle>
          <RelatedLinkCircle></RelatedLinkCircle>
          <RelatedLinkCircle></RelatedLinkCircle>
          <RelatedLinkCircle></RelatedLinkCircle>
          <RelatedLinkCircle></RelatedLinkCircle>
          
        </Div>


      </BrandDetailsContainer>

    </Container>

  );
}

