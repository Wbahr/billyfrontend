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
  padding: 40px 0 40px 0;
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
const BrandH1 = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  margin: 20px 0 10px 0;
  `;

const DrivesDetails = styled.div`
  font-size: 16px;
  margin-left: 20px;


 
`;


const DistributorH4 = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  margin-top: 40px;

`;

const DistributorDetails = styled.div`
  display: flex;
  flex-direction: column;
`;


const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-content: center;
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
  margin-bottom: 50px;
 

  `;



export default function Abb() {

  return (

    <Container>
      <FeaturedBrandLogo>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/ABB_logo.svg/1280px-ABB_logo.svg.png" width="10%" />
      </FeaturedBrandLogo>
      <BrandDetailsContainer>

        <DistributorH4><h4>Airline is your Authorized Distributor of ABB Products</h4>
        </DistributorH4>
        <DistributorDetails>ABB is a leader in power and automation technologies that enable utility and industry customers to improve performance while lowering environmental impact. ABB’s automation technologies blend a robust product portfolio with end-user expertise to deliver solutions for control, motion, protection, and plant integration.</DistributorDetails>
        <Div>
          <ShopAbbButton>Shop for ABB Products </ShopAbbButton>
        </Div>

        <ProductsDiv>
          <img src="https://via.placeholder.com/450x250" />
          <DrivesDetails>
            <ProductsH4>Drives</ProductsH4>
            ABB’s offering includes low voltage AC and DC drives and medium voltage AC drives which are used across all industries and applications. ABB drives offer application-specific functionality, control for different types of motors as well as flexible connectivity to automation networks.
          </DrivesDetails>

        </ProductsDiv>
        <ProductsDiv>
          <DrivesDetails>
            <ProductsH4>Motors and Generators</ProductsH4>
            ABB offers a comprehensive range of reliable and high-efficiency motors and generators for all applications. Choose from IEC DC Motors, IEC Low Voltage AC Motors, Servo Motors, Synchronous Motors, or Synchronous Reluctance Motor and Drive Packages.
            </DrivesDetails>
          <img src="https://via.placeholder.com/450x250" />
        </ProductsDiv>
        <ProductsDiv>
          <img src="https://via.placeholder.com/450x250" />
          <DrivesDetails>
            <ProductsH4>Transformers</ProductsH4>
            ABB offers a full range of transformer products and solutions for ANSI, IEC and other local standards. ABB is a major transformer manufacturer throughout the world and offers both liquid-filled and dry-type transformers.
          </DrivesDetails>
        </ProductsDiv>
        <ProductsDiv>
          <DrivesDetails>
            <ProductsH4>Control Components</ProductsH4>
            ABB is the #1 global provider of control technologies for industry, power and water. Airline offers the platforms and systems listed below to optimize processes and deliver operational excellence.
          </DrivesDetails>
          <img src="https://via.placeholder.com/450x250" />
        </ProductsDiv>
        <ProductsDiv>
          <img src="https://via.placeholder.com/450x250" />
          <DrivesDetails>
            <ProductsH4>Low Voltage Products and Systems</ProductsH4>
            ABB offers the largest product range that meets NEMA, UL & CSA standards. Their unique offering of electrical control and protection products enable customers to significantly reduce panel costs. This vast group of products includes:

</DrivesDetails>
        </ProductsDiv>
        <ProductsDiv>
          <DrivesDetails>
            <ProductsH4>Medium Voltage Products and Systems</ProductsH4>
            ABB provides utility, industrial and commercial customers with safe, reliable and smart technologies for the distribution of electricity. Airline’s offering includes Circuit Breakers, Compact Secondary Substations (CSS), Contactors, E-Houses, Fault Current Limitation and Arc Protection.
          </DrivesDetails>
          <img src="https://via.placeholder.com/450x250" />
        </ProductsDiv>


      </BrandDetailsContainer>

    </Container>

  );
}

