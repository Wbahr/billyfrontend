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
const BrandHeader = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  margin: 20px 0 10px 0;
  `;

const BrandDetails = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;
 
 
`;

const BorderBottom = styled.div`
  border-bottom: 1px solid red;
  width: 25%;
  margin: 0 auto;
  margin-top: 50px;


  
`;



export default function Abb() {

  return (
    
    <Container>
      <FeaturedBrandLogo>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/ABB_logo.svg/1280px-ABB_logo.svg.png" width="10%" />
      </FeaturedBrandLogo>
      <BrandDetailsContainer>
      <BrandHeader>
        <h1> ABB</h1>
      </BrandHeader>
      <BrandDetails>
        <p>ABB’s offering includes low voltage AC and DC drives and medium voltage AC drives which are used across all industries and applications. ABB drives offer application-specific functionality, control for different types of motors as well as flexible connectivity to automation networks.</p>
      </BrandDetails>
      <BorderBottom>
      </BorderBottom>
      </BrandDetailsContainer>
      </Container>
    
  );
}

