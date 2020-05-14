import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Banner from '../../../imgs/locationPage/map1.png'

const Container = styled.div`
  max-width: 1300px;
  margin: 50px auto;
`
const LocationHeaderDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`
const HeaderDivDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 40px 0 20px;
  align-items: center;
`
const H1 = styled.h1`
  font-family: verdana;
  color: #333;
  margin: 0;
  text-transform: uppercase;
  // font-size: 30px;
  letter-spacing: 1px;
  padding-bottom: 15px;
  letter-spacing: 2px;
`
const ShortBorder = styled.div`
  border-bottom: 3px solid #B51F2B;
  width: 7%;
`
const HeaderDetailsDiv = styled.div`
  display: flex;
  font-size: 20px;
  justify-content: center;
`
const MapDiv = styled.div`
    max-width: 1300px;
    height: 400px;
    overflow: hidden;
`
const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
const MapContainer = styled.div`
    margin: 20px 0;
`
const ListDiv = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    padding-top: 15px;
`
const ListDiv1 = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 0 20px;
`
const City = styled.div`
    color: #555555;
    font-weight: bold;
    font-size: 20px;
`
const Address = styled.a`
    &:hover{
        text-decoration: none;
        color: #B51F2B;
    }
`
const Phone = styled.a`
    color: #555555;
    &:hover{
        text-decoration: none;
        color: #B51F2B;
    }
`
const Fax = styled.div`
    color: #555555; 
`
const LocationContainer = styled.div`
    display: flex;
    flex-direction: column;
    // justify-content: space-around;
    margin: 60px 0;
`
const TollFree = styled.p`
    color: #555555;
`
const SubDetail = styled.p`
    margin: 0;
`
const Span = styled.span`
    font-weight: 500;
`
const Border = styled.div`
    border-right: 3px solid #f2f3f4;
    height: 70px;
    margin: 20px;
`
const Blog = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #f2f3f4;
    flex: 1;
    padding: 20px;
    place-self: flex-start;
`
const BlogHeader = styled.p`
    color: #B51F2B;
    font-weight: bold;
    font-size: 20px;
`
const HeaderSection = styled.div`  
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-bottom: 20px;
`
const BranchSection = styled.div`  
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-bottom: 20px;
`
const H2 = styled.h4`
    text-transform: uppercase;
    color: #B51F2B;
    letter-spacing: 2px;
`
const Underline = styled.div`
    width: 60px;
    border: 1px solid #f2f3f4;
`

const LocationDiv = styled.div`
    display: flex;
    margin-bottom: 60px;
`
const ImgDiv = styled.div`
    width: 370px;
    height: 250px;
    overflow: hidden;
`
const LocationImg = styled.img`
    width: 100%;
`
const Div = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`
const MainLocationDiv = styled.div`
    display: flex;
    justify-content: space-between;  
`
const LineCards = styled.a`
    margin: 20px;
    display: flex;
    flex-direction: column;
    flex: 1;
    color: #555555;
    &:hover{
        text-decoration: none;
        transform: scale(1.1);
        color: #555555;
    }
`
const LineCardImgDiv = styled.div`
    height: 261.72px;
    overflow: hidden;

`
const LineCardImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
const Col = styled.div`
    display: flex;
    flex:4;
    flex-direction: column;
`
const ColDiv = styled.div`
    display: flex;
    flex:2;
    flex-direction: column;
    align-self: flex-start;
`
const Blog1 = styled.div`
    margin-top: 20px;
    padding: 20px;
    background-color: #f2f3f4;
    text-align: center;
`
const Contact = styled.p`
    color: #B51F2B;
    font-weight: bold;
    font-size: 20px;
`
const CallUs = styled.p`
`
const Number = styled.a`
`
const Button = styled.a`
    border: 0;
    background-color: #B51F2B;
    color: white;
    padding: 5px 20px;
    border-radius: 30px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    &:hover{
        text-decoration: none;
        color:white;
        }
`
const ButtonDiv = styled.div`
    &:hover{
        transform: scale(1.1);
        }
`
const HourDiv = styled.div`
`
export default function Locations() {
	return (
		<Container>
			<LocationHeaderDiv>
				<HeaderDivDiv>
					<H1> Locations</H1>
					<ShortBorder></ShortBorder>
				</HeaderDivDiv>
				<HeaderDetailsDiv>
					<p>Airline offers support and service throughout the Northeast</p>
				</HeaderDetailsDiv>
			</LocationHeaderDiv>
			<MapContainer>
				<MapDiv><LocationImg src={Banner} /></MapDiv>
			</MapContainer>
			<LocationContainer>
				<MainLocationDiv>
					<Col>
						<HeaderSection>
							<H2>Headquarters</H2>
							<Underline></Underline>
						</HeaderSection>
						<LocationDiv>
							<ImgDiv>
								<Img src="https://fastly.4sqi.net/img/general/200x200/77936780_hucHOfr6tXf-Cq5DJ7x9gINw-E6Xi02NSAdSMqXArKM.jpg" />
							</ImgDiv>
							<ListDiv1>
								<City>Bensalem, PA</City>
								<Address href="https://www.google.com/maps/place/3557+Progress+Dr,+Bensalem,+PA+19020/@40.0862477,-74.9261714,17z/data=!3m1!4b1!4m5!3m4!1s0x89c14cfe538e2f31:0x59632a43cd81d74c!8m2!3d40.0861436!4d-74.9240375"><FontAwesomeIcon icon="map-marker-alt" /> 3557 Progress Drive Bensalem, PA 19020</Address>
								<Phone href="tel:+12156384700"><FontAwesomeIcon icon="phone-alt" size="2px" /> (215) 638-4700</Phone>
								<Fax><FontAwesomeIcon icon="print" size="2px" /> (215) 638-1707</Fax>
								<HourDiv><Span>Customer Service Hours:</Span> 8:00AM-6:00PM EST</HourDiv>
							</ListDiv1>
						</LocationDiv>
						<HeaderSection>
							<H2>Main warehouse</H2>
							<Underline></Underline>
						</HeaderSection>
						<LocationDiv>
							<ImgDiv>
								<Img src="data:image/jpeg;base64,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" />
							</ImgDiv>
							<ListDiv1>
								<City>Bristol, PA</City>
								<Address href="https://www.google.com/maps/place/2100+Frost+Rd+%23100,+Bristol,+PA+19007/@40.1171152,-74.8969406,17z/data=!3m1!4b1!4m5!3m4!1s0x89c14df3023d4eaf:0x81137df6cd22ca85!8m2!3d40.1175442!4d-74.8945687"><FontAwesomeIcon icon="map-marker-alt" /> 2100 Frost Rd #100, Bristol, PA 19007</Address>
							</ListDiv1>
						</LocationDiv>
					</Col>
					<ColDiv>
						<Blog>
							<BlogHeader>Airline's Sales Territories</BlogHeader>
							<ul>
								<li>Our <Span>sales territory</Span> services the Northeast from Maine to Virginia, providing local support and technical expertise.</li>
								<li>Our <Span>distribution territory</Span> generally covers the Northeastern U.S. (certain product lines may be restricted to specific regions).</li>
								<li>Our manufactured systems and value-added services are available to all areas, both within and outside of our distribution territory. This includes areas outside of the U.S.</li>
							</ul>
						</Blog>
						<Blog1>
							<Contact>Need More Information?</Contact>
							<CallUs>Call us at<Number href="tel:+18009997378"> 800-999-7378</Number> or click below</CallUs>
							<ButtonDiv><Button href="mailto:customer.service@airlinehyd.com">Contact Us</Button></ButtonDiv>
						</Blog1>
					</ColDiv>
				</MainLocationDiv>
				<BranchSection>
					<H2>Branch Locations</H2>
					<Underline></Underline>
				</BranchSection>
				<Div>
					<LineCards href="#">
						<LineCardImgDiv>
							<LineCardImg src="https://lh5.googleusercontent.com/p/AF1QipMbpxEbUavthiDVkSJTbBSZoD5fN9aCg78SGzy8=w408-h306-k-no" />
						</LineCardImgDiv>
						<ListDiv>
							<City>Ocean View, NJ</City>
							<SubDetail><Span>Marine & Mobile Systems</Span></SubDetail>
							<Address href="https://www.google.com/maps/place/Airline+Hydraulics+(Marine+and+Mobile)/@39.1974524,-74.750228,17z/data=!4m13!1m7!3m6!1s0x89c0ba4781e2e19b:0x3a75370469b7b2a7!2s428+Woodbine+Ocean+View+Rd,+Ocean+View,+NJ+08230!3b1!8m2!3d39.1974524!4d-74.7480393!3m4!1s0x89c0ba47845f22a9:0x424f8ea40083516e!8m2!3d39.1974524!4d-74.7480393"><FontAwesomeIcon icon="map-marker-alt" /> 428 Woodbine Ocean View Rd, Ocean View, NJ 08230</Address>
							<Phone href="tel:+16096243700"><FontAwesomeIcon icon="phone-alt" size="2px" /> (609) 624-3700</Phone>
							<Fax><FontAwesomeIcon icon="print" size="2px" /> (609) 624-0863</Fax>
							<TollFree><Span>Toll Free:</Span> (877) Marine2</TollFree>
						</ListDiv>
					</LineCards>
					<LineCards href="#">
						<LineCardImgDiv>
							<LineCardImg src="https://geo3.ggpht.com/cbk?panoid=pMofFy1jIm7kgoxFV_e1HA&output=thumbnail&cb_client=search.gws-prod.gps&thumb=2&w=408&h=240&yaw=344.34753&pitch=0&thumbfov=100" />
						</LineCardImgDiv>
						<ListDiv>
							<City>Lancaster, NY</City>
							<SubDetail><Span>Previously Fluid Power Service (FPS)</Span></SubDetail>
							<Address href="https://www.google.com/maps/place/4474+Walden+Ave,+Lancaster,+NY+14086/@42.928039,-78.6025142,17z/data=!3m1!4b1!4m5!3m4!1s0x89d39f71fc499be5:0x37a676aa6618d695!8m2!3d42.928191!4d-78.600019"><FontAwesomeIcon icon="map-marker-alt" /> 4474 Walden Ave, Lancaster, NY 14086</Address>
							<Phone href="tel:+17166818474"><FontAwesomeIcon icon="phone-alt" size="2px" /> (716) 681-8474</Phone>
							<Fax><FontAwesomeIcon icon="print" size="2px" /> (716) 681-8514</Fax>
						</ListDiv>
					</LineCards>
					<LineCards href="#">
						<LineCardImgDiv>
							<LineCardImg src="https://lh5.googleusercontent.com/p/AF1QipO9ekkM2h9tdAxIlllrnoYJERIcb0guG4P8LX_9=w408-h306-k-no" />
						</LineCardImgDiv>
						<ListDiv>
							<City>Pittsburgh, PA</City>
							<Address href="https://www.google.com/maps/place/145+Delta+Dr,+Pittsburgh,+PA+15238/@40.4985688,-79.8767322,17z/data=!3m1!4b1!4m5!3m4!1s0x8834ed20aa175365:0x53141293fd88c149!8m2!3d40.4985933!4d-79.8746285"><FontAwesomeIcon icon="map-marker-alt" /> 145 Delta Dr, Pittsburgh, PA 15238</Address>
							<Phone href="tel:+14129636633"><FontAwesomeIcon icon="phone-alt" size="2px" /> (412) 963-6633</Phone>
							<Fax><FontAwesomeIcon icon="print" size="2px" /> (412) 963-7040</Fax>
							<TollFree><Span>Toll Free:</Span> (877) 288-6623</TollFree>
						</ListDiv>
					</LineCards>
				</Div>
				<Div>
					<LineCards href="#">
						<LineCardImgDiv>
							<LineCardImg src="data:image/jpeg;base64,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" />
						</LineCardImgDiv>
						<ListDiv href="#">
							<City>York, PA</City>
							<Address href="https://www.google.com/maps/place/2+Interchange+Pl,+York,+PA+17406/@40.0199164,-76.742094,17z/data=!4m15!1m9!4m8!1m0!1m6!1m2!1s0x89c88de47c295b47:0xf02eacc89375d98!2s2+Interchange+Pl,+York,+PA+17406!2m2!1d-76.740055!2d40.0198594!3m4!1s0x89c88de47c295b47:0xf02eacc89375d98!8m2!3d40.0199164!4d-76.7399053"><FontAwesomeIcon icon="map-marker-alt" /> 2 Interchange Pl, York, PA 17406</Address>
							<Phone href="tel:+17177676466"><FontAwesomeIcon icon="phone-alt" size="2px" /> (717) 767-6466</Phone>
							<Fax><FontAwesomeIcon icon="print" size="2px" /> (717) 764-2147</Fax>
						</ListDiv>
					</LineCards>
					<LineCards href="#">
						<LineCardImgDiv>
							<LineCardImg src="https://geo2.ggpht.com/cbk?panoid=nXpVkcc8sEPp8N7-HDGZyQ&output=thumbnail&cb_client=search.gws-prod.gps&thumb=2&w=408&h=240&yaw=104.93872&pitch=0&thumbfov=100" />
						</LineCardImgDiv>
						<ListDiv>
							<City>Ashland, VA</City>
							<SubDetail><Span>Previously Hanover Controls & Supply Corp.</Span></SubDetail>
							<Address href="https://www.google.com/maps/place/10964+Richardson+Rd,+Ashland,+VA+23005/@37.6943658,-77.4433588,17z/data=!3m1!4b1!4m5!3m4!1s0x89b13c4f34214a05:0xa83c3b377dbf601d!8m2!3d37.6943658!4d-77.4411701?shorturl=1"><FontAwesomeIcon icon="map-marker-alt" /> 10964 Richardson Rd, Ashland, VA 23005</Address>
							<Phone href="tel:+18045502449"><FontAwesomeIcon icon="phone-alt" size="2px" /> (804) 550-2449</Phone>
							<Fax><FontAwesomeIcon icon="print" size="2px" /> (804) 550-2673</Fax>
							<TollFree><Span>Toll Free:</Span> (800) 550-6564</TollFree>
						</ListDiv>
					</LineCards>
					<LineCards href="#">
						<LineCardImgDiv>
							<LineCardImg src="data:image/jpeg;base64,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" />
						</LineCardImgDiv>
						<ListDiv>
							<City>North Kingstown, RI</City>
							<Address href="https://www.google.com/maps/place/376+Dry+Bridge+Rd,+North+Kingstown,+RI+02852/@41.5506904,-71.5153539,17z/data=!3m1!4b1!4m5!3m4!1s0x89e5b6e36a378737:0xa10be827a7437532!8m2!3d41.5506904!4d-71.5131652"><FontAwesomeIcon icon="map-marker-alt" /> 376 Dry Bridge Rd, North Kingstown, RI 02852</Address>
							<Phone href="tel:+14015830190"><FontAwesomeIcon icon="phone-alt" size="2px" /> (401) 583-0190</Phone>
							<Fax><FontAwesomeIcon icon="print" size="2px" /> (401) 583 0191</Fax>
						</ListDiv>
					</LineCards>
				</Div>
			</LocationContainer>
		</Container>
	)
}
