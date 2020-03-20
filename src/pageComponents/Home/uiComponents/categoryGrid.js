import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import CategoryImage from './categoryImage'
import gql from 'graphql-tag'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import Loader from 'pageComponents/_common/loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const DivContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1200px;
  justify-content: space-evenly
`
const ImgDiv = styled.div`
width: 150px;
height: 150px;
border-radius: 50%;
// border: 1px solid red;
display: flex;
`;
const P = styled.a`
  margin: 0;
  font-size: 15px;
  color: #5a5a5a;
  font-weight: bold;
  &:hover{
    color: #007bff;
  }
`;

const Icon = styled.a`
  display: flex;
  margin: auto;
  color: #555555;
  &:hover{
    color: #B51F2B;
  }
`;

const CategoryName = styled.div`
  display: flex;
  margin: 13px 0;
`;

const CategoryDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  width: 250px;
`;


export default function CategoryGrid({ history }) {
  return (
    <DivContainer>
      <CategoryDiv>

        <ImgDiv>
          <Icon href="#" target="_blank"><FontAwesomeIcon icon='tools' size='4x' /></Icon>
        </ImgDiv>

        <CategoryName> <P href="#" target="_blank">Aluminum Structural Framing</P> </CategoryName>
      </CategoryDiv>


      <CategoryDiv>

        <ImgDiv>
          <Icon href="#" target="_blank"><FontAwesomeIcon icon='tools' size='4x' /></Icon>
        </ImgDiv>

        <CategoryName> <P href="#" target="_blank">Automation & Control Products</P> </CategoryName>
      </CategoryDiv>

      <CategoryDiv>

        <ImgDiv>
          <Icon href="#" target="_blank"><FontAwesomeIcon icon='tools' size='4x' /></Icon>
        </ImgDiv>

        <CategoryName> <P href="#" target="_blank">Electrical Components</P> </CategoryName>
      </CategoryDiv>


      <CategoryDiv>

        <ImgDiv>
          <Icon href="#" target="_blank"><FontAwesomeIcon icon='tools' size='4x' /></Icon>
        </ImgDiv>

        <CategoryName> <P href="#" target="_blank">Hose & Connectors</P> </CategoryName>
      </CategoryDiv>


      <CategoryDiv>

        <ImgDiv>
          <Icon href="#" target="_blank"><FontAwesomeIcon icon='tools' size='4x' /></Icon>
        </ImgDiv>

        <CategoryName> <P href="#" target="_blank">Hydraulic Components</P> </CategoryName>
      </CategoryDiv>


      <CategoryDiv>

        <ImgDiv>
          <Icon href="#" target="_blank"><FontAwesomeIcon icon='tools' size='4x' /></Icon>
        </ImgDiv>

        <CategoryName> <P href="#" target="_blank">Liquid & Gas Pressure Products</P> </CategoryName>
      </CategoryDiv>

      <CategoryDiv>

        <ImgDiv>
          <Icon href="#" target="_blank"><FontAwesomeIcon icon='tools' size='4x' /></Icon>
        </ImgDiv>

        <CategoryName> <P href="#" target="_blank">Lubrication</P> </CategoryName>
      </CategoryDiv>


      <CategoryDiv>

        <ImgDiv>
          <Icon href="#" target="_blank"><FontAwesomeIcon icon='tools' size='4x' /></Icon>
        </ImgDiv>

        <CategoryName> <P href="#" target="_blank">Machine Safety Products</P> </CategoryName>
      </CategoryDiv>


      <CategoryDiv>

        <ImgDiv>
          <Icon href="#" target="_blank"><FontAwesomeIcon icon='tools' size='4x' /></Icon>
        </ImgDiv>

        <CategoryName> <P href="#" target="_blank">Pneumatic Components</P> </CategoryName>
      </CategoryDiv>


      <CategoryDiv>

        <ImgDiv>
          <Icon href="#" target="_blank"><FontAwesomeIcon icon='tools' size='4x' /></Icon>
        </ImgDiv>

        <CategoryName> <P href="#" target="_blank">Process Control & Components</P> </CategoryName>
      </CategoryDiv>

      <CategoryDiv>

        <ImgDiv>
          <Icon href="#" target="_blank"><FontAwesomeIcon icon='tools' size='4x' /></Icon>
        </ImgDiv>

        <CategoryName> <P href="#" target="_blank">Winches & Gear Drives</P> </CategoryName>
      </CategoryDiv>


      <CategoryDiv>

        <ImgDiv >
          <Icon href="#" target="_blank"><FontAwesomeIcon icon='tools' size='4x' /></Icon>
        </ImgDiv>

        <CategoryName> <P href="#" target="_blank">SMC ETech</P> </CategoryName>
      </CategoryDiv>




























      {/* <CategoryImage
        text='Aluminum Structural Framing'
        src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
        history={history}
      />
      
      <CategoryImage
        text='Automation & Control Products'
        src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
        history={history}
      />
      <CategoryImage
        text='Electrical Components'
        src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
        history={history}
      />
      <CategoryImage
        text='Hose & Connectors'
        src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
        history={history}
      />
      <CategoryImage
        text='Hydraulic Components'
        src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
        history={history}
      />
      <CategoryImage
        text='Liquid & Gas Pressure Products'
        src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
        history={history}
      />
      <CategoryImage
        text='Lubrication'
        src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
        history={history}
      />
      <CategoryImage
        text='Machine Safety Products'
        src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
        history={history}
      />
      <CategoryImage
        text='Pneumatic Components'
        src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
        history={history}
      />
      <CategoryImage
        text='Process Control & Components'
        src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
        history={history}
      />
      <CategoryImage
        text='Winches & Gear Drives'
        src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
        history={history}
      />
      <CategoryImage
        text='Product Spotlights'
        src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
        history={history}
      /> */}
    </DivContainer>
  )
}