import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import CategoryImage from './categoryImage'
import gql from 'graphql-tag'
import { useQuery, useLazyQuery } from '@apollo/client'
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
    text-decoration: none;
  }
`
const Icon = styled.div`
  display: flex;
  margin: auto;
  color: #555555;
  max-width: 100%;
  font-size: 14px;
  &:hover {
    transition: transform 200ms;
    transform: scale(1.1);
    text-decoration: none;
  }
`
const CategoryName = styled.div`
  display: flex;
  margin: 13px 0;
  font-weight: bold;
  text-align: center;
  font-family: Verdana;
  &:hover {
    color: #007bff;
  }
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
`
export default function CategoryGrid({ history }) {

	return (
		<DivContainer>
			<Icon>
				{/* <Icon href="#" target="_blank"> dont nest divs inside a tags */}
				<CategoryDiv>
					<ImgDiv>
						<Img src={framing} />
					</ImgDiv>
					<CategoryName>Aluminum Structural Framing</CategoryName>
				</CategoryDiv>
			</Icon>
			<Icon>
				<CategoryDiv>
					<ImgDiv>
						<Img src={hydraulic} />
					</ImgDiv>
					<CategoryName>Hydraulic Components</CategoryName>
				</CategoryDiv>
			</Icon>
			<Icon>
				<CategoryDiv>
					<ImgDiv>
						<Img src={pneumatics} />
					</ImgDiv>
					<CategoryName>Pneumatic Components</CategoryName>
				</CategoryDiv>
			</Icon>
			<Icon>
				<CategoryDiv>
					<ImgDiv>
						<Img src="https://www.airlinehyd.com/customer/aihyco/images/GEAR-BOXES-COUPLINGS_s.jpg" />
					</ImgDiv>
					<CategoryName>Automation & Control Products</CategoryName>
				</CategoryDiv>
			</Icon>
			<Icon>
				<CategoryDiv>
					<ImgDiv>
						<Img src="https://www.airlinehyd.com/customer/aihyco/images/CIRCUIT-PROTECTIVE-DEVICES-62_s.jpg" />
					</ImgDiv>
					<CategoryName>Electrical Components</CategoryName>
				</CategoryDiv>
			</Icon>
			<Icon>
				<CategoryDiv>
					<ImgDiv>
						<Img src="https://www.airlinehyd.com/customer/aihyco/images/HOSE-END-FITTINGS-2_s.jpg" />
					</ImgDiv>
					<CategoryName>Hose & Connectors</CategoryName>
				</CategoryDiv>
			</Icon>
			<Icon>
				<CategoryDiv>
					<ImgDiv>
						<Img src="https://www.airlinehyd.com/customer/aihyco/images/AIR-HYDRAULIC-DRIVEN-GAS-BOOSTERS-47_s.jpg" />
					</ImgDiv>
					<CategoryName>Liquid & Gas Pressure Products</CategoryName>
				</CategoryDiv>
			</Icon>
			<Icon>
				<CategoryDiv>
					<ImgDiv>
						<Img src="https://www.airlinehyd.com/customer/aihyco/images/GENERAL-LUBRICATION-EQUIPMENT-31_s.jpg" />
					</ImgDiv>
					<CategoryName>Lubrication</CategoryName>
				</CategoryDiv>
			</Icon>
			<Icon>
				<CategoryDiv>
					<ImgDiv>
						<Img src="https://www.airlinehyd.com/customer/aihyco/images/LIGHT-CURTAINS-BEAMS-SCANNERS-81_s.jpg" />
					</ImgDiv>
					<CategoryName>Machine Safety Products</CategoryName>
				</CategoryDiv>
			</Icon>
			<Icon>
				<CategoryDiv>
					<ImgDiv>
						<Img src="https://triactivestorage.blob.core.windows.net/corvustriactivemedia/Category/Images/Thumbnails/936b7a79-cd3a-440b-9a2d-3f06d7a4a2eb.jpg" />
					</ImgDiv>
					<CategoryName>Process Control & Components</CategoryName>
				</CategoryDiv>
			</Icon>
			<Icon>
				<CategoryDiv>
					<ImgDiv>
						<Img src="https://www.airlinehyd.com/customer/aihyco/images/WINCHES-32_s.jpg" />
					</ImgDiv>
					<CategoryName>Winches & Gear Drives</CategoryName>
				</CategoryDiv>
			</Icon>
			<Icon>
				<CategoryDiv>
					<ImgDiv >
						<FontAwesomeIcon icon='tools' size='4x' />
					</ImgDiv>
					<CategoryName> <P href="#" target="_blank">SMC ETech</P> </CategoryName>
				</CategoryDiv>
			</Icon>
		</DivContainer>
	)
}