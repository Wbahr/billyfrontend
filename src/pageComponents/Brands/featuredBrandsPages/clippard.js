import React, { useState, useContext } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import Context from '../../../config/context'
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
const ListItemDiv = styled.div`
  font-size: 13px;
  margin-top: 10px;
  display: flex;
`
const ArticlesContentDiv = styled.div`
  text-align: center;
  padding: 15px;
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
`
const ArticlesPicture = styled.img`
  width: 100%;
  min-height: 100%;
`
const ArticlesShortLine = styled.div`
  display: flex;
  border-bottom: 2px solid #555555;
  width: 15%;
  margin: 25px 0 0;
  `
const ArticlesTopic = styled.h6`
  color: #B51F2B;
  font-weight: bold;
  margin: 25px 15px;
  font-size: 18px;
  text-align: left;
`
const ArticlesImgDiv = styled.div`
  max-width: 350px;
  padding: 20px;
  height: 300px;
  overflow: hidden;
`

const SmallArticlesContent = styled.div`
  display: flex
  flex-wrap: nowrap;
  max-width: 380px;
  margin-bottom: 30px;
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
const ArticlesContentDetails = styled.p`
  margin: 0 15px;
  text-align: left;
  font-size: 14px;
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
const ArticlesDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`
const RelatedContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
`
const BannerDiv = styled.div`
  
`
const BannerImg = styled.img`
  width: 250px;
`
const LongProductDetails = styled.p`
   margin:0;
`
const ClippardProduct = styled.p`
`
const Span = styled.span`
  font-weight: bold;
`
export default function Clippard() {

	return (
		<Container>
			<FeaturedBrandLogo>
				<BannerDiv> <BannerImg src="https://www.airlinehyd.com/customer/aihyco/images/clippard.jpg" /></BannerDiv>
			</FeaturedBrandLogo>
			<BrandDetailsContainer>
				<AirlineDistributorH1>Clippard
				</AirlineDistributorH1>
				<DistributorDetails>Clippard Instrument Laboratory, Inc. is the leading manufacturer of miniature pneumatic valves, electronic valves, brass, stainless, and corrosion resistant cylinders, modular components, and fittings. The Minimatic line includes over 3,400 standard products and the company’s growth continues today maintaining its position as the industry’s most complete supplier of quality, miniature pneumatic components.</DistributorDetails>
				<Div>
					<ShopAbbButton>Shop for Clippard Products </ShopAbbButton>
				</Div>

				{/*............................... PRODUCTS................................... */}

				<SectionDiv>
					<ProductsTitle>Products</ProductsTitle>
					<BorderBottom></BorderBottom>
				</SectionDiv>
				<ProductsDiv>
					<ImgDiv><Img src="http://www.clippard.com/cms/sites/default/files/wiki_images/Clippard-Minimatic-Cylinders.png" /></ImgDiv>
					<ProductsDetails>
						<ProductsH4 href="#">Cylinders</ProductsH4>
          Minimatic Cylinders range from 5/32" to 1 1/8" in bore size, and are available in spring return and double acting models, with a full line of associated devices for mounting and use.
						<ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop Clippard's Cylinders Products</ShopProducts>
					</ProductsDetails>
				</ProductsDiv>
				<ProductsDiv>
					<ProductsDetails>
						<ProductsH4 href="#">Directional Control Valves</ProductsH4>
          Every air system is unique, and Clippard has the air valve you need. Clippard control valves are available in poppet or spool design; 2-, 3-, or 4-way functions, in sizes from #3-56 and #10-32 (M5) through 1/8” NPT (G1/8) ports; and for pressures to 300 psig/21 bar. They are available with solenoid, air pilot, manual and mechanical actuators. Mounting styles include in-line, panel mount, manifold mount or clearance holes for mounting screws.
						<ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop Clippard's Directional Control Valves Products</ShopProducts>
					</ProductsDetails>
					<ImgDiv><Img src="http://www.clippard.com/cms/sites/default/files/wiki_images/flow-controls.jpg" /></ImgDiv>
				</ProductsDiv>
				<ProductsDiv>
					<ImgDiv><Img src="https://www.clippard.com/cms/sites/default/files/wiki_images/Clippard-MME-Manifold-Stack.png" /></ImgDiv>
					<ProductsDetails>
						<ProductsH4 href="#">Electronic Valves</ProductsH4>
						<LongProductDetails> Clippard’s product range includes:
							<ListItemDiv>
								<ul>
									<li>Mouse Valve Series – The industry standard for leak-free operation and fast response</li>
									<li>Proportional Valve Series – Direct-operated performance from Clippard’s EVP and SCPV Series valves</li>
									<li>10 & 15 mm Valve Series – 2- or 3-way operation with detachable coil and connector for orientation options.</li>
									<li>Maximatic & Valve Series – General Purpose, 2-, 3- and 4-way configurations for maximum value and maximum performance.</li>
									<li>Custom Electronic Valves – Clippard has years of engineering and technical experience and is a leader in manufacturing special products for a broad spectrum of industries.</li>
								</ul>
							</ListItemDiv>
						</LongProductDetails>
						<ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop Clippard's Electronic Valves Products</ShopProducts>
					</ProductsDetails>
				</ProductsDiv>
				<ProductsDiv>
					<ProductsDetails>
						<ProductsH4 href="#">Circuit Boards & I/O Modules</ProductsH4>
            Clippard clear acrylic pneumatic circuit boards are designed to provide a compact and highly efficient pneumatic control system, with the use of Clippard modular components and other Clippard products. Clippard’s pneumatic I/O devices are ideal for Intrinsically Safe environments; simple custom machinery requiring only one program; and PLC type applications that have all pneumatic components for inputs and outputs. This system provides a safe, simple, and cost-efficient answer for pneumatic automation control solutions.
						<ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop Clippard's Circuit Boards & I/O Modules Products</ShopProducts>
					</ProductsDetails>
					<ImgDiv><Img src="https://www.clippard.com/cms/sites/default/files/wiki_images/clippard-value-added-subassembly-custom-acrylic-manifold.jpg" /></ImgDiv>
				</ProductsDiv>
				<ProductsDiv>
					<ImgDiv><Img src="https://www.clippard.com/cms/sites/default/files/wiki_images/PQ-Fittings-Group.jpg" /></ImgDiv>
					<ProductsDetails>
						<ProductsH4 href="#">Fittings</ProductsH4>
            Clippard precision fittings will save you time, space, and money when designing versatile, productive, trouble free, pneumatic circuits. Our endless variety of fittings insure that you find just the right “fit” when plumbing pneumatic circuits or assemblies. These fittings are small in size but large in performance, allowing for streamlining of pneumatic assemblies and eliminating the need for larger, more expensive, cumbersome fittings
						<ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop Clippard's Fittings Products</ShopProducts>
					</ProductsDetails>
				</ProductsDiv>
				<ProductsDiv>
					<ProductsDetails>
						<ProductsH4 href="#">Hose & Tubing</ProductsH4>
            Clippard offers a variety of miniature hose and tubing from copper and nylon tubing to flexible urethane, and vinyl.
						<ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop Clippard'sHose & Tubing Products</ShopProducts>
					</ProductsDetails>
					<ImgDiv><Img src="https://www.clippard.com/static/images/cache/5e/5e14e6ce57f031c0ff4a9c1fc20f0349e197031a-256.jpg" /></ImgDiv>
				</ProductsDiv>
				<ProductsDiv>
					<ImgDiv><Img src="https://www.clippard.com/cms/sites/default/files/wiki_images/frl.jpg" /></ImgDiv>
					<ProductsDetails>
						<ProductsH4 href="#">Air Prep Equipment</ProductsH4>
						<ClippardProduct><Span>Filters :</Span>  Filters capture solid particulate and remove water by “spinning” the air centrifugally. Water and larger particles are thrown against the side of the bowl where they condense and/or fall to the lower part of the bowl. Smaller particles are captured as the air flows through the filter element.</ClippardProduct>
						<ClippardProduct><Span>Regulators :</Span>  Controlling pressure is an important requirement in all systems. Maximatic Regulators are adjustable from 7 to 125 psig. For applications requiring better resolution, 7 to 30 or 7 to 60 psig models with spring are available. The #10-32 size is a piston-style due to its small size, while the 1/8” to 1” are a diaphragm design.</ClippardProduct>
						<ClippardProduct><Span>Lubricators :</Span> Pneumatic actuators and valves perform better and last longer when properly lubricated. The bowl serves as a reservoir for the oil and supplies oil through the pick-up tube when pressurized. The amount of oil dispersed is controlled by an adjustable needle valve.</ClippardProduct>
						<ShopProducts href="#"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> Shop Clippard's Air Prep Equipment Products</ShopProducts>
					</ProductsDetails>
				</ProductsDiv>

				{/*.................................. ARTICLES................................... */}

				<SectionDiv>
					<ProductsTitle>Articles & Videos</ProductsTitle>
					<BorderBottom></BorderBottom>
				</SectionDiv>
				<ArticlesDiv>
					<SmallArticlesContent>
						<ArticlesContentDiv>
							<ArticlesImgDiv>
								<ArticlesPicture src="https://www.clippard.com/cms/sites/default/files/wiki_images/cordis-high-resolution-proportional-pressure-controls_1.png" />
							</ArticlesImgDiv>
							<ArticlesTopic>
                6 Ways Clippard's New Cordis EPR is Revolutionizing Electronic Pressure Control
								<ArticlesShortLine></ArticlesShortLine>
							</ArticlesTopic>
							<ArticlesContentDetails>The future of proportional control has arrived—and it's digital! The Clippard Cordis is a revolutionary microcontroller primed for escape velocity from a proportional control market that has grown stagnant.<a href="https://www.clippard.com/cms/wiki/6-ways-clippards-new-cordis-epr-revolutionizing-electronic-pressure-control" target="_blank" rel="noopener noreferrer"> Read more >> </a></ArticlesContentDetails>
						</ArticlesContentDiv>
					</SmallArticlesContent>
					<SmallArticlesContent>
						<ArticlesContentDiv>
							<ArticlesImgDiv>
								<ArticlesPicture src="https://www.clippard.com/cms/sites/default/files/wiki_images/stepper-motor-diagram.jpg" />
							</ArticlesImgDiv>
							<ArticlesTopic>
                How Stepper Motors Provide Precision Control
								<ArticlesShortLine></ArticlesShortLine>
							</ArticlesTopic>
							<ArticlesContentDetails>Stepper motors are used in a variety of applications to provide a means for tightly controlled motion. But what is a stepper motor, and how does it work? <a href="https://www.clippard.com/cms/wiki/how-stepper-motors-provide-precision-control" target="_blank" rel="noopener noreferrer"> Read more >> </a>
							</ArticlesContentDetails>
						</ArticlesContentDiv>
					</SmallArticlesContent>
					<SmallArticlesContent>
						<ArticlesContentDiv>
							<ArticlesImgDiv>
								<ArticlesPicture src="https://www.clippard.com/cms/sites/default/files/wiki_images/digital-proportional-pressure-controls.jpg" />
							</ArticlesImgDiv>
							<ArticlesTopic>
                Press Release: New Cordis Proportional Pressure Controls
								<ArticlesShortLine></ArticlesShortLine>
							</ArticlesTopic>
							<ArticlesContentDetails>Clippard Releases New High Resolution Digital Proportional Pressure Controls <a href="https://www.clippard.com/cms/wiki/press-release-new-cordis-proportional-pressure-controls" target="_blank" rel="noopener noreferrer"> Read more >> </a>
							</ArticlesContentDetails>
						</ArticlesContentDiv>
					</SmallArticlesContent>
				</ArticlesDiv>
				<VideoDiv>
					<Video><ArticlesVideo src="https://www.youtube.com/embed/o-3qARvYH8E"></ArticlesVideo></Video>
					<Video><ArticlesVideo src="https://www.youtube.com/embed/k--xLEFsYoY"></ArticlesVideo></Video>
					<Video><ArticlesVideo src="https://www.youtube.com/embed/dWKfQ-LcRSM"></ArticlesVideo></Video>
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
								<LinkStyle href="http://www.clippard.com/" target="_blank" rel="noopener noreferrer">
									<FontAwesomeDiv>
										<FontAwesomeIcon icon='globe-americas' size='4x' />
									</FontAwesomeDiv>
              Clippard's Website</LinkStyle>
							</LinkStyleDiv>
						</RelatedLinkCircle>
						<RelatedLinkCircle>
							<LinkStyleDiv>
								<LinkStyle href="http://www.youtube.com/playlist?list=PLZbHgsYLXoyypueELRwWRNdFQnrm-Mv5-" target="_blank" rel="noopener noreferrer">
									<FontAwesomeDiv>
										<FontAwesomeIcon icon={faYoutube} size='4x' />
									</FontAwesomeDiv>
              Videos</LinkStyle>
							</LinkStyleDiv>
						</RelatedLinkCircle>
						<RelatedLinkCircle>
							<LinkStyleDiv>
								<LinkStyle href="https://www.airlinehyd.com/Results.aspx?srh=Clippard&x=0&y=0" target="_blank" rel="noopener noreferrer">
									<FontAwesomeDiv>
										<FontAwesomeIcon icon='shopping-cart' size='4x' />
									</FontAwesomeDiv>
              shop Clippard products</LinkStyle>
							</LinkStyleDiv>
						</RelatedLinkCircle>
						<RelatedLinkCircle>
							<LinkStyleDiv>
								<LinkStyle href="https://www.airlinehyd.com/customer/aihyco/b2bse/catalogrequest.aspx?mfg=Clippard" target="_blank" rel="noopener noreferrer">
									<FontAwesomeDiv>
										<FontAwesomeIcon icon='address-book' size='4x' />
									</FontAwesomeDiv>
              Clippard Catalogs</LinkStyle>
							</LinkStyleDiv>
						</RelatedLinkCircle>
					</RelatedContainer>
				</RelatedLinkDiv>
			</BrandDetailsContainer>
		</Container >
	)
}
