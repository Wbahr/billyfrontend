import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import CategoryImage from './categoryImage'
import gql from 'graphql-tag'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import Loader from 'pageComponents/_common/loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import framing from '../../../imgs/homepage/framing 1.png'
import hydraulic from '../../../imgs/homepage/hydraulics 1.png'
import pneumatics from '../../../imgs/homepage/pneumatics 1.png'

const DivContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1200px;
  justify-content: space-evenly
  margin-bottom: 50px;
  @media (max-width: 800px) {
    max-width: 900px;
  }
`
const ImgDiv = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  // border: 1px solid red;
  display: flex;
`
const P = styled.a`
  margin: 0;
  font-size: 14px;
  color: #5a5a5a;
  font-weight: bold;
  text-align: center;
  font-family: Verdana;
  &:hover{
    color: #007bff;
  }
`
const Icon = styled.a`
  display: flex;
  margin: auto;
  color: #555555;
  max-width: 100%;
  &:hover{
    color: #B51F2B;
  }
`
const CategoryName = styled.div`
  display: flex;
  margin: 13px 0;
`
const CategoryDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 200px;
`
const Img = styled.img`
  max-width: 100%;
    &:hover {
      transform: scale(1.1);
    }
`
export default function CategoryGrid({ history }) {

  return (
    <DivContainer>
      <CategoryDiv>
        <ImgDiv>
          <Icon href="#" target="_blank">
            <Img src={framing} /></Icon>
        </ImgDiv>
        <CategoryName> <P href="#" target="_blank">Aluminum Structural Framing</P> </CategoryName>
      </CategoryDiv>
      <CategoryDiv>
        <ImgDiv>
          <Icon href="#" target="_blank"><Img src={hydraulic} /></Icon>
        </ImgDiv>
        <CategoryName> <P href="#" target="_blank">Hydraulic Components</P> </CategoryName>
      </CategoryDiv>
      <CategoryDiv>
        <ImgDiv>
          <Icon href="#" target="_blank"><Img src={pneumatics} /></Icon>
        </ImgDiv>
        <CategoryName> <P href="#" target="_blank">Pneumatic Components</P> </CategoryName>
      </CategoryDiv>
      <CategoryDiv>
        <ImgDiv>
          <Icon href="#" target="_blank"><Img src="https://www.airlinehyd.com/customer/aihyco/images/GEAR-BOXES-COUPLINGS_s.jpg" /></Icon>
        </ImgDiv>
        <CategoryName> <P href="#" target="_blank">Automation & Control Products</P> </CategoryName>
      </CategoryDiv>
      <CategoryDiv>
        <ImgDiv>
          <Icon href="#" target="_blank"><Img src="https://www.airlinehyd.com/customer/aihyco/images/CIRCUIT-PROTECTIVE-DEVICES-62_s.jpg" /></Icon>
        </ImgDiv>
        <CategoryName> <P href="#" target="_blank">Electrical Components</P> </CategoryName>
      </CategoryDiv>
      <CategoryDiv>
        <ImgDiv>
          <Icon href="#" target="_blank"><Img src="https://www.airlinehyd.com/customer/aihyco/images/HOSE-END-FITTINGS-2_s.jpg" /></Icon>
        </ImgDiv>
        <CategoryName> <P href="#" target="_blank">Hose & Connectors</P> </CategoryName>
      </CategoryDiv>

      <CategoryDiv>
        <ImgDiv>
          <Icon href="#" target="_blank"><Img src="https://www.airlinehyd.com/customer/aihyco/images/AIR-HYDRAULIC-DRIVEN-GAS-BOOSTERS-47_s.jpg" /></Icon>
        </ImgDiv>
        <CategoryName> <P href="#" target="_blank">Liquid & Gas Pressure Products</P> </CategoryName>
      </CategoryDiv>
      <CategoryDiv>
        <ImgDiv>
          <Icon href="#" target="_blank"><Img src="https://www.airlinehyd.com/customer/aihyco/images/GENERAL-LUBRICATION-EQUIPMENT-31_s.jpg" /></Icon>
        </ImgDiv>
        <CategoryName> <P href="#" target="_blank">Lubrication</P> </CategoryName>
      </CategoryDiv>
      <CategoryDiv>
        <ImgDiv>
          <Icon href="#" target="_blank"><Img src="https://www.airlinehyd.com/customer/aihyco/images/LIGHT-CURTAINS-BEAMS-SCANNERS-81_s.jpg" /></Icon>
        </ImgDiv>
        <CategoryName> <P href="#" target="_blank">Machine Safety Products</P> </CategoryName>
      </CategoryDiv>

      <CategoryDiv>
        <ImgDiv>
          <Icon href="#" target="_blank"><Img src="https://triactivestorage.blob.core.windows.net/corvustriactivemedia/Category/Images/Thumbnails/936b7a79-cd3a-440b-9a2d-3f06d7a4a2eb.jpg" /></Icon>
        </ImgDiv>
        <CategoryName> <P href="#" target="_blank">Process Control & Components</P> </CategoryName>
      </CategoryDiv>
      <CategoryDiv>
        <ImgDiv>
          <Icon href="#" target="_blank"><Img src="https://www.airlinehyd.com/customer/aihyco/images/WINCHES-32_s.jpg" /></Icon>
        </ImgDiv>
        <CategoryName> <P href="#" target="_blank">Winches & Gear Drives</P> </CategoryName>
      </CategoryDiv>
      <CategoryDiv>
        <ImgDiv >
          <Icon href="#" target="_blank"><FontAwesomeIcon icon='tools' size='4x' /></Icon>
        </ImgDiv>
        <CategoryName> <P href="#" target="_blank">SMC ETech</P> </CategoryName>
      </CategoryDiv>
    </DivContainer>
  )
}