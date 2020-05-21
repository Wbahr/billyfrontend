import React, { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'

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
	background-image: url('https://media.istockphoto.com/photos/white-silver-geometric-universal-background-for-business-presentation-picture-id1207126778?s=2048x2048');
	// background-image: url('https://media.istockphoto.com/photos/abstract-white-background-picture-id674723944?s=2048x2048');
	// background-image: url('https://media.istockphoto.com/photos/abstract-background-of-polygons-on-white-background-picture-id857482302?s=2048x2048');
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
	background-image: linear-gradient(to left top, rgb(149, 15, 35), rgb(219, 22, 51));
	width: 20%
	color: white;
	font-weight: 600;
	border-radius:28px;
	border: 0;
	padding: 5px;
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
const VideoDiv = styled.div`
	display: flex;
	flex-wrap: nowrap;
	width: 100%;
	margin-bottom: 30px; 
	justify-content: space-between;
`
const ArticlesVideo = styled.iframe`
	width: 100%;
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
`
const RelatedLinkDiv = styled.div`
	width: 100%;
	height: 350px;
`
const Video = styled.div`
	display: flex;
	flex: 1;
	max-width: 380px;
	height: 250px;
`
const RelatedContainer = styled.div`
	display: flex;
	flex-wrap: nowrap;
	width: 100%;
`
const BannerImg = styled.img`
	width: 250px;
`
const ShowMoreBtn1 = styled.button`
	font-size: 14px;
	border: none;
  border-radius: 2px;
	padding: 4px 10px;
  margin: 0 auto;
	outline: none;
	background-color: #f2f3f4;
`
const LongProductDetails = styled.p`
	 margin:0;
`
const ListItemDiv = styled.div`
	font-size: 15px;
	margin-top: 10px;
	display: flex;
`
const Span = styled.span`
	font-weight: bold;
`
export default function Hydac() {
	const [showText1, setShowText1] = useState(false)

	return (
		<Container>
			<FeaturedBrandLogo>
				<div> <BannerImg src="https://www.airlinehyd.com/customer/aihyco/images/hydacweb.jpg" /></div>
			</FeaturedBrandLogo>
			<BrandDetailsContainer>
				<AirlineDistributorH1>Hydac
				</AirlineDistributorH1>
				<DistributorDetails>HYDAC is a global leader in fluid power, offering a complete range of hydraulic products including filters, accumulators, power units, valves, coolers, electronics, and much more. Airline provides HYDAC fluid power solutions to OEMs and end-users in a wide range of industries where industrial or mobile hydraulic applications are found. In addition, HYDAC offers water and process filtration equipment to meet the growing need for these products.</DistributorDetails>
				<Div>
					<ShopAbbButton>Shop for Hydac Products </ShopAbbButton>
				</Div>

				{/*............................... PRODUCTS................................... */}

				<SectionDiv>
					<ProductsTitle>Products</ProductsTitle>
					<BorderBottom></BorderBottom>
				</SectionDiv>
				<ProductsDiv>
					<ImgDiv><Img src="https://www.airlinehyd.com/customer/aihyco/images/HYDAC_Filters.jpg" /></ImgDiv>
					<ProductsDetails>
						<ProductsH4 href="#">Filters & Filter Systems</ProductsH4>
						The contamination in a hydraulic system may be invisible to the human eye, but these tiny particles act as an abrasive which "sand-blasts" the surface of all components in a hydraulic system, causing them to function inefficiently and eventually break down. In fact, it is estimated that nearly 85% of hydraulic component failures result from contaminated oil. Airline carries the HYDAC filtration products you need to help you maintain ISO cleanliness levels, increase machine uptime and lengthen component life.
						<LongProductDetails>In addition, Airline service professionals will work with you to diagnose and maintain cleanliness in your hydraulic or lubrication system.
							<ShowMoreBtn1 onClick={() => setShowText1(!showText1)}>{showText1 ? <><FontAwesomeIcon icon='minus-circle' size='1x' /> Show Less </> : <><FontAwesomeIcon icon='plus-circle' size='1x' /> Show More  </>} </ShowMoreBtn1> </LongProductDetails>
						{showText1 && <div>
							<ListItemDiv>
								<ul>
									<li><Span>Contamination Monitors</Span> - HYDAC offers products to detect and measure particulate contamination and the water saturation level in hydraulic and lubrication systems, allowing you to have total predictive maintenance.</li>
									<li><Span>Filtration Systems</Span> - HYDAC has a variety of offline filtration systems to monitor and remove particulate contamination, water or both from your hydraulic fluids.</li>
									<li><Span>Hydraulic & Lubrication Filters</Span> - HYDAC carries inline, return line, suction, tank breather and offline filter assemblies as well as breather filters and state-of-the-art filter elements.</li>
									<li><Span>Diesel Fuel Filters</Span> - HYDAC offers a system for diesel filtration which protects vehicle manufacturers and operators against downtimes and premature service calls.</li>
									<li><Span>Water/Process Filtration</Span> - HYDAC has individual filter elements, filters in simplex and duplex versions and complete filter systems, some with automatic back-flushing, which are used in different areas of process technology.</li>

								</ul>
							</ListItemDiv>
						</div>}
						<ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop Hydac's Filters & Filter Systems Products</ShopProducts>
					</ProductsDetails>
				</ProductsDiv>
				<ProductsDiv>
					<ProductsDetails>
						<ProductsH4 href="#">Accumulators</ProductsH4>
						Three distinct accumulator designs are available, ensuring the accumulator fits the application, rather than forcing the application to fit the accumulator. The designs are Bladder, Diaphragm and Piston. Available up to 15,000 psi working pressure. Specialized variations of Diaphragm and Bladder Accumulators are available for pulsation dampening, silencing and shock absorption. In addition, HYDAC carries accumulator accessories to ensure proper installation and correct maintenance.
						<ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop Hydac's Air Accumulators Products</ShopProducts>
					</ProductsDetails>
					<ImgDiv><Img src="https://www.airlinehyd.com/customer/aihyco/images/HYDAC_Accumulators.jpg" /></ImgDiv>
				</ProductsDiv>
				<ProductsDiv>
					<ImgDiv><Img src="https://www.airlinehyd.com/customer/aihyco/images/HYDAC_Accessories.jpg" /></ImgDiv>
					<ProductsDetails>
						<ProductsH4 href="#">Valves, Clamps & Accessories</ProductsH4>
						HYDAC manufactures high-pressure ball valves, needle valves, flow control valves, check valves and cartridge valves to ensure safe and reliable operation. A complete range of DIN 3015 clamps for mounting hoses, tubes, and pipes is complimented by HYDAC's specialty and custom mounting solutions. Reservoir accessories include breathers, fluid level indicators, test points, gauge isolators and more.
						<ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop Hydac's Valves, Clamps & Accessories</ShopProducts>
					</ProductsDetails>
				</ProductsDiv>
				<ProductsDiv>
					<ProductsDetails>
						<ProductsH4 href="#">Electronics & Diagnostics</ProductsH4>
						HYDAC's product range includes diagnostics, pressure transducers and switches, temperature transducers and switches, flow sensors, level sensors, displays and accessories. HYDAC also offers intrinsically safe pressure transducers and sensors for applications in hazardous environments. OEM pressure transducers and switches are available for use in volume production machines.
						<ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop Hydac's Electronics & Diagnostics Products</ShopProducts>
					</ProductsDetails>
					<ImgDiv><Img src="https://www.airlinehyd.com/customer/aihyco/images/HYDAC_Electronics.jpg" /></ImgDiv>
				</ProductsDiv>
				<ProductsDiv>
					<ImgDiv><Img src="https://www.airlinehyd.com/customer/aihyco/images/HYDAC_Compact.jpg" /></ImgDiv>
					<ProductsDetails>
						<ProductsH4 href="#">Compact Hydraulics</ProductsH4>
						HYDAC carries compact and high-pressure power units, cartridge valves, manifold assemblies and controls. Compact power units feature a seamless reservoir and pressure-balanced gear pump offering efficiencies over 90%, even at full load, greatly reducing wear and noise. HYDAC also has a wide range of cooling systems for mobile and industrial applications, including combination coolers, pump-filter cooler units, plate-in-frame coolers and brazed plate heat exchangers.
						<ShopProducts href="https://www.airlinehyd.com/Results.aspx?cat=PNEUMATIC-COMPONENTS-5|2239"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop Hydac's Compact Hydraulics Products</ShopProducts>
					</ProductsDetails>
				</ProductsDiv>
				<ProductsDiv>
					<ProductsDetails>
						<ProductsH4 href="#">Mobile Directional Control Valves</ProductsH4>
						HYDAC line of directional control spool valves for mobile applications fulfill the requirements of truck-mounted cranes, front end loaders, wheel loaders, skid steer loaders, fork lift trucks, refuse trucks, roll off trucks & trailers, and many other specialized machine applications. The valves are characterized by highly advanced design solutions including customized spools for optimal metering and load interference management. Valve types include monoblock, sectional, cable or radio, pressure control valves and selector valves.
						<ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop Hydac's Mobile Directional Control Valves Products</ShopProducts>
					</ProductsDetails>
					<ImgDiv><Img src="https://www.airlinehyd.com/customer/aihyco/images/connectivity.jpg" /></ImgDiv>
				</ProductsDiv>
				<ProductsDiv>
					<ImgDiv><Img src="http://www.hydac-na.com/sites/content/PublishingImages/Cylinders/TensioningCylinder_nobkgrnd.jpg"/></ImgDiv>
					<ProductsDetails>
						<ProductsH4 href="#">Hydraulic Cylinders</ProductsH4>
						HYDAC is your source for custom hydraulic cylinders, available in bore sizes from 1.5" - 30" with stroke lengths up to 30'. Various engineered designs are available, including: welded, mobile type, mill type, custom hybrids, special custom tie rod type, and double rod end. Customers may specify virtually any mounting configuration or port options. These heavy-duty cylinders are ideal for the toughest applications, including: earthmoving, oilfield, logging and forestry equipment; steel and foundry machinery; press applications such as forming, stamping and molding; cranes and lifting equipment; and many others.
						<ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop Hydac's Hydraulic Cylinders Products</ShopProducts>
					</ProductsDetails>
				</ProductsDiv>

				{/*.................................. ARTICLES................................... */}

				<SectionDiv>
					<ProductsTitle>Articles & Videos</ProductsTitle>
					<BorderBottom></BorderBottom>
				</SectionDiv>	 
				<VideoDiv>
					<Video><ArticlesVideo src="https://www.youtube.com/embed/dNRz2Efm8o8"></ArticlesVideo></Video>
					<Video><ArticlesVideo src="https://www.youtube.com/embed/M0yLeDeEStQ"></ArticlesVideo></Video>
					<Video><ArticlesVideo src="https://www.youtube.com/embed/awxk3lFYGIo"></ArticlesVideo></Video>
				</VideoDiv>

				{/*.............................. RELATED LINK ................................... */}

				<RelatedLinkDiv>
					<SectionDiv>
						<ProductsTitle>Related Links</ProductsTitle>
						<BorderBottom></BorderBottom>
					</SectionDiv>
					<RelatedContainer>
						<RelatedLinkCircle>
							<LinkStyleDiv>
								<LinkStyle href="http://www.hydacusa.com/" target="_blank" rel="noopener noreferrer">
									<FontAwesomeDiv>
										<FontAwesomeIcon icon='globe-americas' size='4x' />
									</FontAwesomeDiv>
								Hydac's US Website</LinkStyle>
							</LinkStyleDiv>
						</RelatedLinkCircle>
						<RelatedLinkCircle>
							<LinkStyleDiv>
								<LinkStyle href="https://www.youtube.com/user/aventics" target="_blank" rel="noopener noreferrer">
									<FontAwesomeDiv>
										<FontAwesomeIcon icon={faYoutube} size='4x' />
									</FontAwesomeDiv>
								Videos</LinkStyle>
							</LinkStyleDiv>
						</RelatedLinkCircle>
						<RelatedLinkCircle>
							<LinkStyleDiv>
								<LinkStyle href="https://www.airlinehyd.com/Results.aspx?srh=HYDAC&x=0&y=0" target="_blank" rel="noopener noreferrer">
									<FontAwesomeDiv>
										<FontAwesomeIcon icon='shopping-cart' size='4x' />
									</FontAwesomeDiv>
								Shop Hydac Products</LinkStyle>
							</LinkStyleDiv>
						</RelatedLinkCircle>
						<RelatedLinkCircle>
							<LinkStyleDiv>
								<LinkStyle href="#" target="_blank" rel="noopener noreferrer">
									<FontAwesomeDiv>
										<FontAwesomeIcon icon='address-book' size='4x' />
									</FontAwesomeDiv>
								Hydac Catalogs</LinkStyle>
							</LinkStyleDiv>
						</RelatedLinkCircle>
					</RelatedContainer>
				</RelatedLinkDiv>
			</BrandDetailsContainer>
		</Container >

	)
}


