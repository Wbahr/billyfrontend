import React from 'react'
import styled from 'styled-components'
import otto from '../../../imgs/homepage/otto1.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Header from '../../../imgs/homepage/new desktop art-02-03 copy.png'

const BannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  @media (max-width: 800px) {
    max-width: 800px;
  }
`
const Col = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  @media (max-width: 800px) {
   
  }
`
const Img = styled.img`
  max-width: 80%;
`
const LgBanner = styled.div`
  display: flex;
  height: 280px;
  @media (max-width: 800px) {

   
  }
 
`
const LgImg = styled.img`
  max-width: 100%;
  object-fit: cover;
`
const SmBanner = styled.div`
  display: flex;
  flex-direction: row;
  margin: 15px 0;
  justify-content: space-between;
  @media (max-width: 800px) {
    justify-content: space-between;
    max-width: 800px;
  }
`
const BannerDiv = styled.div`
  display: flex;
  background-color: #f2f3f4;
  width: 420px;
  height: 180px;
  align-items: center;
  justify-content: center;
  @media (max-width: 800px) {
    width: 265px;
    height: 220px;
    flex-direction: column-reverse;
    justify-content: start;
    margin: 1px;
  }
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
const A = styled.a`
  display: flex;
  color: #212529;
  &:hover{
    text-decoration: none;
    color: #246696;
  }
  @media (max-width: 800px) {
   margin: auto;
  }
  `
const SideBorder = styled.div`
  // border-right: 2px solid #f2f3f4;
  height: 70px;
  display: flex;
  margin: auto;
`
class Banner extends React.Component {

  render() {
    return (
      <BannerContainer>
        <Col>
          <LgBanner>
            <LgImg src={Header} />
          </LgBanner>
          <SmBanner>
            <BannerDiv>
            <ImgDiv> <Img src={otto} /></ImgDiv>
                <AboutAirline>
                  <H5>About Airline Hydraulics</H5>
                We offer components, engineered systems and service & repair for the technology fields of fluid power and more!
              </AboutAirline>
            </BannerDiv>
            <BannerDiv>
            <ImgDiv> <Img src="https://crescentind.com/wp-content/uploads/2018/01/ESOP-logo.png" /></ImgDiv>
                <AboutAirline>
                  <P> We're 100% Employee Owned and pround of it! </P>
                </AboutAirline>
            </BannerDiv>
            <BannerDiv>
                <ImgDiv> <FontAwesomeIcon icon='shipping-fast' size='3x' /></ImgDiv>
                <AboutAirline>
                  <P> Expect same-day shipping on most in-stock orders placed before 3:00pm Est & shipped by UPS.</P>
                </AboutAirline>
            </BannerDiv>
          </SmBanner>
        </Col>
      </BannerContainer>
    )
  }
}

export default Banner