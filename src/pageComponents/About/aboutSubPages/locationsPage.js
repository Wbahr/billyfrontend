import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Header from '../uiComponents/Header'

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
const HeaderDetailsDiv = styled.div`
  display: flex;
  font-size: 20px;
  justify-content: center;
  margin-top: 20px;
`
const MapDiv = styled.div`
    max-width: 1300px;
    height: 400px;
    overflow: hidden;
`
const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
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
				transition: 0.4s;
    }
`
const LineCardImgDiv = styled.div`
    height: 261.72px;
    overflow: hidden;

`
const LineCardImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
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
        <Header text="Locations"/>
        <HeaderDetailsDiv>
          <p>Airline offers support and service throughout the Northeast</p>
        </HeaderDetailsDiv>
      </LocationHeaderDiv>
      <MapContainer>
        <MapDiv><LocationImg src="https://airlinemedia.airlinehyd.com/Static_pages/about/locations/bg.png" /></MapDiv>
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
                <Img src="https://airlinemedia.airlinehyd.com/Static_pages/about/locations/headquarters.jpg" />
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
                <Img src="https://airlinemedia.airlinehyd.com/Static_pages/no-image.jpg" />
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
              <LineCardImg src="https://airlinemedia.airlinehyd.com/Static_pages/about/locations/ocean-view-NJ.jpg" />
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
              <LineCardImg src="https://airlinemedia.airlinehyd.com/Static_pages/about/locations/Pittsburgh.jpg" />
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
              <LineCardImg src="https://airlinemedia.airlinehyd.com/Static_pages/no-image.jpg" />
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
              <LineCardImg src="https://airlinemedia.airlinehyd.com/Static_pages/about/locations/Ashland-VA.jpg" />
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
              <LineCardImg src="https://airlinemedia.airlinehyd.com/Static_pages/about/locations/RI-office.jpg" />
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
