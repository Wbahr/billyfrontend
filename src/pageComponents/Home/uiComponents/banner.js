import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const BannerContainer = styled.div`
	display: flex;
	flex-direction: column;
`
const Col = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 10px;
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
const AboutP = styled.p`
    margin: 0;
    font-size: 20px;
	color: #B51F2B;
	@media (max-width: 800px) {
		font-size: 18px;
	}
`
const LgBannerLink = styled.a`
		
`

export default () =>  (
    <BannerContainer>
        <Col>
            <LgBanner>
                <LgImg src="https://airlinemedia.airlinehyd.com/Static_pages/home/banner/new-site-background-02.png" alt="banner image"/>
            </LgBanner>

            <SmBanner>
                <BannerDiv>
                    <ImgDiv><Img src="https://airlinemedia.airlinehyd.com/Static_pages/home/otto.png" alt="otto" /></ImgDiv>

                    <AboutAirline>
                        <AboutP>About Airline Hydraulics</AboutP>
                        We offer components, engineered systems and service & repair for the technology fields of fluid power and more!
                    </AboutAirline>
                </BannerDiv>

                <BannerDiv>
                    <ImgDiv><Img src="https://airlinemedia.airlinehyd.com/Static_pages/home/esop.png" alt="esop" /></ImgDiv>

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
