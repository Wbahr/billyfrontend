import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`
const FeaturedBrandLogo = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 80px 0;
  background-image: url('https://airlinemedia.airlinehyd.com/Static_pages/Brands/brands-bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  `
const BrandDetailsContainer = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;
  flex-wrap: wrap;
  margin: 0 auto;
  `
const ProductsDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 16px;
  margin: 0px 30px 0 30px;
  align-content: center;
  flex: 2;
`
const AirlineDistributorH1 = styled.h1`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  margin-top: 40px;
`
const DistributorDetails = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;
`
const ProductsTitle = styled.div`
  font-size: 25px;
  color: #555555;
  text-transform: uppercase;
  letter-spacing: 2px;
  display: flex;
  flex: 1;
`
const Div = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  margin: 25px 0;
  align-items: center;
`
const SectionDiv = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  margin: 25px 0;
  align-items: center;
`
const ProductsDiv = styled.div`
  display: flex;  
  flex-wrap: nowrap;
  margin: 20px 0 20px 0;
  background-color:  #f2f3f4;
  padding: 15px 
`
const ProductsH4 = styled.a`
  margin: 0 auto;
  color: 	#000000;
  margin-bottom: 15px;
  font-size: 25px;
  font-weight: bold;
  &:hover{
    color: #b51029;
    text-decoration: none;
  }
`
const ShopAbbButton = styled.button`
	background-image: linear-gradient(to top left,#950f23,#DB1633);
	color: white;
	font-weight: 600;
	border-radius:3px;
	font-size: 16px;
	text-transform: uppercase;
	letter-spacing: 1px;
	border: 0;
	padding: 10px 15px;
	margin: 0 auto;
	outline: none;
`
const BorderBottom = styled.div`
  display: flex;
  border-bottom: 1px solid #555555;
  flex: 3.5;
  `
const RelatedLinkCircle = styled.div`
  margin: 0 auto;
  // position: relative;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
 `
const LinkStyle = styled.a`
  color: #246696;
  font-size: 16px;
  position: absolute;
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
  padding: 0 15px;
  background-color: #f2f3f4;
  width: 200px;
  height: 200px;    
  border-radius: 50%;
  &:hover{
    color: #133752 ;
    text-decoration: none;
  }
 `
const FontAwesomeDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 20px;
  color: #DB1633;
  &:hover{
  color: #555555;
  }
`
const LinkStyleDiv = styled.div`
  display: flex;
  justify-content: center;
  color: white;
`
const ShopProducts = styled.a`
  color: #246696;
  font-size: 14px;
  margin-top: 10px;
`
const ImgDiv = styled.div`
  display: flex;
  flex: 1;
  max-width: 350px;
  height: 250px;
`
const Img = styled.img`
  width: 100%;
  object-fit: contain;
`
const RelatedLinkDiv = styled.div`
  width: 100%;
  height: 350px;
`
const RelatedContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
`
const BannerImg = styled.img`
  width: 250px;
`

export default function Butech() {

    return (
        <Container>
            <FeaturedBrandLogo>
                <div> <BannerImg src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/BuTech_Logo.png" /></div>
            </FeaturedBrandLogo>
            <BrandDetailsContainer>
                <AirlineDistributorH1>BuTech
                </AirlineDistributorH1>
                <DistributorDetails>BuTech a leading brand of high pressure valves, fittings and tubing. The BuTech line of products was established in 1973, offering high pressure piping components and the most extensive and versatile product line available for pressures up to 150,000 PSI. BuTech products are used in oil, natural gas, chemical and petrochemical industries, as well as waterjet/waterblast, aerospace, marine, government and niche industrial markets.</DistributorDetails>
                <Div>
                    <ShopAbbButton>Shop Products </ShopAbbButton>
                </Div>

                {/*............................... PRODUCTS................................... */}

                <SectionDiv>
                    <ProductsTitle>Products</ProductsTitle>
                    <BorderBottom></BorderBottom>
                </SectionDiv>
                <ProductsDiv>
                    <ImgDiv>  <Img src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Butech/Ball%20Valves.png" /></ImgDiv>
                    <ProductsDetails>
                        <ProductsH4 href="#">Ball Valves</ProductsH4>
                        Ball valves are available in 2-way, 3-way, 4-way, and 5-way designs with pressures to 20,000 PSI (1,380 bar) at 72°F (22°C) and a wide range of connections including male and female NPT, low-pressure compression fittings, medium- and high-pressure tube ends, medium- and high-pressure female, JIC 37° flare, SAE O-ring boss, socket-weld, butt-weld, and metric connections. They are available with special seal materials or manufactured from any machinable material for extreme applications. They also can be fitted with pneumatic or electric actuators for remote control.
                        <ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop BuTech's Ball Valves Products</ShopProducts>
                    </ProductsDetails>
                </ProductsDiv>
                <ProductsDiv>
                    <ProductsDetails>
                        <ProductsH4 href="#">Needle Valves</ProductsH4>
                        Low, Medium and High Pressure with pressure ratings to 150,000 psi (1030 bar), are designed for liquid and gas flow control in petroleum, chemical, power generating and general industrial applications. Available in a variety of body styles, the valves are designed for operation at temperatures ranging from -100° to +600°F (-73° to +315°C). Optional packings and/or extended stuffing boxes increase the range to -423° to +1200°F (-253° to +648°C).
                        <ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop BuTech's Needle Valves Products</ShopProducts>
                    </ProductsDetails>
                    <ImgDiv><Img src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Butech/needle%20valves.png" /></ImgDiv>
                </ProductsDiv>
                <ProductsDiv>
                    <ImgDiv><Img src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Butech/check%20valves.png" /></ImgDiv>
                    <ProductsDetails>
                        <ProductsH4 href="#">Check Valves</ProductsH4>
                        BuTech check valves are designed for liquid and gas flow control in petroleum, chemical, power generating and general industrial applications. Available in a variety of body styles, the valves are designed for manual operation in temperatures ranging from 0° to 600°F (-18° to 315°C). Rugged construction provides assurance of fail-safe operation at pressures up to 15,000 PSI (1,030 bar). Note: BuTech Pressure Systems does not recommend compression sleeve connections below 0°F (-18°C) or above 650°F (343°C).
                        <ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop BuTech's Check Valves Products</ShopProducts>
                    </ProductsDetails>
                </ProductsDiv>
                <ProductsDiv>
                    <ProductsDetails>
                        <ProductsH4 href="#">High Pressure Fittings</ProductsH4>
                        BuTech offers a complete line of elbows, tees, crosses, bulkhead fittings and nipples, as well as adapters and couplings to connect different sizes and pressure ratings of tubing and pipe. Standard construction is 316 cold – worked stainless steel
                        <ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop BuTech's High Pressure Fittings Products</ShopProducts>
                    </ProductsDetails>
                    <ImgDiv><Img src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Butech/high%20pressure%20fitting.png" /></ImgDiv>
                </ProductsDiv>
                <ProductsDiv>
                    <ImgDiv><Img src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Butech/Butech%20accessories.png" /></ImgDiv>
                    <ProductsDetails>
                        <ProductsH4 href="#">BuTech Accessories</ProductsH4>
                        BuTech Pressure Systems offers a complete line of accessories for use with its valve and pipe equipment.
                        <ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop BuTech's Accessories Products</ShopProducts>
                    </ProductsDetails>
                </ProductsDiv>
                <RelatedLinkDiv>
                    <SectionDiv>
                        <ProductsTitle>Related Links</ProductsTitle>
                        <BorderBottom></BorderBottom>
                    </SectionDiv>
                    <RelatedContainer>
                        <RelatedLinkCircle>
                            <LinkStyleDiv>
                                <LinkStyle href="#" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeDiv>
                                        <FontAwesomeIcon icon='globe-americas' size='4x' />
                                    </FontAwesomeDiv>
                                    BuTech's US Website
                                </LinkStyle>
                            </LinkStyleDiv>
                        </RelatedLinkCircle>
                        <RelatedLinkCircle>
                            <LinkStyleDiv>
                                <LinkStyle href="#" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeDiv>
                                        <FontAwesomeIcon icon='shopping-cart' size='4x' />
                                    </FontAwesomeDiv>
                                    shop BuTech products
                                </LinkStyle>
                            </LinkStyleDiv>
                        </RelatedLinkCircle>
                        <RelatedLinkCircle>
                            <LinkStyleDiv>
                                <LinkStyle href="#" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeDiv>
                                        <FontAwesomeIcon icon='address-book' size='4x' />
                                    </FontAwesomeDiv>
                                    BuTech Catalogs
                                </LinkStyle>
                            </LinkStyleDiv>
                        </RelatedLinkCircle>
                    </RelatedContainer>
                </RelatedLinkDiv>
            </BrandDetailsContainer>
        </Container >
    )
}

