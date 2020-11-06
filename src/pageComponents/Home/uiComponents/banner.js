import React from 'react'
import styled from 'styled-components'
import otto from '../../../imgs/homepage/otto1.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Header from '../../../imgs/homepage/new desktop art-02-03 copy.png'

const BannerContainer = styled.div`
	display: flex;
	flex-direction: column;
`
const Col = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 50px;
`
const Img = styled.img`
	max-width: 80%;
`
const LgBanner = styled.div`
	display: flex;
	width: 100%;
`
const LgImg = styled.img`
	width: 100%;
`
const SmBanner = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	margin: 15px 0;
	justify-content: center;
`
const BannerDiv = styled.div`
	display: flex;
	flex-wrap: wrap;
	background-color: #f2f3f4;
	justify-content: center;
	padding: 10px 20px;
	margin: 10px;
`
const P = styled.p`
	margin: 0;
	font-size: 16px;
	max-width: 100%;
	padding: 10px;
	@media (max-width: 800px) {
		font-size: 16px;
	}
`
const AboutAirline = styled.div`
	width: 240px;
	font-size: 14px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	@media (max-width: 800px) {
		width: 250px;
		font-size: 14px;
		text-align: center;
	}
`
const ImgDiv = styled.div`
	width: 120px;
	display: flex;
	align-items: center;
	justify-content: center;
	@media (max-width: 800px) {
		width: 100px;
		padding: 10px;
	}
`
const H5 = styled.h5`
	color: #B51F2B;
	@media (max-width: 800px) {
		font-size: 18px;
	}
`

export default () =>  (
	<BannerContainer>
		<Col>
			<LgBanner>
				<LgImg src={Header} />
			</LgBanner>
			
			<SmBanner>
				<BannerDiv>
					<ImgDiv><Img src={otto} /></ImgDiv>
					
					<AboutAirline>
						<H5>About Airline Hydraulics</H5>
						We offer components, engineered systems and service & repair for the technology fields of fluid power and more!
					</AboutAirline>
				</BannerDiv>
				
				<BannerDiv>
					<ImgDiv><Img src="https://www.airlinehyd.com/customer/aihyco/images/icons/Esop.png" /></ImgDiv>
					
					<AboutAirline>
						<P> We're 100% Employee Owned and proud of it! </P>
					</AboutAirline>
				</BannerDiv>
				
				<BannerDiv>
					<ImgDiv><FontAwesomeIcon icon='shipping-fast' size='3x' /></ImgDiv>
					<AboutAirline>
						<P> Expect same-day shipping on most in-stock orders placed before 3:00pm EST & shipped by UPS.</P>
					</AboutAirline>
				</BannerDiv>
			</SmBanner>
		</Col>
	</BannerContainer>
)