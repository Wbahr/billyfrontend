import React from 'react'
import styled from 'styled-components'
import AirlineLogo from '../../imgs/airline/airline_vector.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ButtonBlack } from 'styles/buttons'
import OttoDrift from 'pageComponents/_common/ottoDrift'

const Newsletter = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	background-color: black;
	height: 70px;
	background-image: linear-gradient( rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2) ), url(${props => props.theme.sectionBackgroundImageUrl});
	background-color: black;
	box-shadow: inset 0px 1px 2px black;
	padding-right: 350px;
	@media (max-width: 1200px){
		padding: 0;
		justify-content: center;
	}
	@media (max-width: 800px){
		height: max-content;
		flex-direction: column;
		padding: 10px 0;
	}
`

const NewsletterLabel = styled.label`
	font-family: ${props => props.theme.fancyFontNameBold};
	font-size: 18px;
	font-weight: 700;
	color: ${props => props.theme.buttonForegroundColor};
	margin: 0;
`

const NewsletterInput = styled.input`
	height: 35px;
	width: 300px;
	font-weight: 600;
	color: rgb(33, 37, 41);
	border: 0;
	margin: 0 12px;
	padding: 4px 12px;
	text-transform: uppercase;
	::placeholder {
		text-transform: none;
	}
`
const ContainerTop = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: white;
	padding: 16px 0;
`

const ContentContainer = styled.div`
	display: flex;
	justify-content: space-between;
	width: 1100px;
	margin: 0 auto;
	@media (max-width: 1200px){
		width: 90%;
	}
	@media (max-width: 800px){
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
`

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	background-color: #535353;
`

const DivSocial = styled.div`
	display: flex;
	flex-direction: column;
`

const DivSocialIcons = styled.div`
	display: flex;
	justify-content: space-between;
	width: 170px;
	height: 30px;
	@media (max-width: 800px){
		align-self: center;
	}
`

const DivAirline = styled.div`
	display: flex;
	flex-direction: column;
	margin-right: 30px;
	@media (max-width: 800px){
		width: 90%;
		align-self: center;
		margin: 0 0 40px 0;
	}
`

const DivMenu = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin: 8px 32px;
	@media (max-width: 1000px){
		display: none;
	}
`
const Head = styled.h4`
	font-size: 16px;
	font-weight: 700;
	color: rgb(33, 37, 41);
	margin: 0;
`

const Item = styled.a`
	cursor: pointer;
	font-size: 12px;
	font-weight: 300;
	color: grey;
	margin: 0;
	margin-left: 4px;
	line-height: 1.5;
	:hover{
		color: #328EFC;
		font-weight: 400;
	}
`

const ADim = styled.a`
	cursor: pointer;
	opacity: 0.75;
	:hover{
		opacity: 1;
	}
`

const Pcopyright = styled.p`
	font-size: 12px;
	font-weight: 500;
	color: whitesmoke;
	margin: 0 16px;
`
const P = styled.p`
	font-size: 12px;
	font-weight: 500;
	color: black;
	margin: 0 0 0 4px;
`

const DivRow = styled.div`
	display: flex;
	align-items: center;
	margin-top: 9px;
`

const ACallUs = styled.a`
	font-size: 20px;
	font-weight: 600;
	margin: 0 0 0 8px;
`

export default function FooterComponent() {
    return (
        <>
            <Newsletter>
                <NewsletterLabel>Subscribe to Airline Tech Journals</NewsletterLabel>
                <NewsletterInput placeholder='your@email.com'/>
                <ButtonBlack>Subscribe</ButtonBlack>
            </Newsletter>
			
            <ContainerTop>
                <ContentContainer>
                    <DivAirline>
                        <DivRow style={{ flexWrap: 'wrap' }}>
                            <img src={AirlineLogo} height="45px" />
                            <ACallUs href="tel:1-800-999-7378">800-999-7378</ACallUs>
                        </DivRow>
						
                        <a target='_blank' rel='noopener noreferrer'
                            href='https://www.google.com/maps/place/3557+Progress+Dr,+Bensalem,+PA+19020'
                        >
                            <DivRow>
                                <FontAwesomeIcon icon='map-pin' size="sm" color="#535353"/>
                                <P>3557 Progress Drive, Bensalem, PA 19020</P>
                            </DivRow>
                        </a>
						
                        <a href='tel:215-638-4700'>
                            <DivRow><FontAwesomeIcon icon='phone-alt' size="sm" color="#535353"/>
                                <P>215-638-4700</P>
                            </DivRow>
                        </a>
						
                        <DivRow>
                            <FontAwesomeIcon icon='fax' size="sm" color="#535353"/>
                            <P>Fax: 215-638-1707</P>
                        </DivRow>
                    </DivAirline>
					
                    <DivMenu>
                        <Head>Featured Brands</Head>
                        <Item href="/brands/featured/smc">SMC</Item>
                        <Item href="/brands/featured/rexroth">Rexroth</Item>
                        <Item href="/brands/featured/hydac">Hydac</Item>
                        <Item href="/brands/featured/eaton">Eaton</Item>
                        <Item href="/brands/featured/omron">Omron</Item>
                        <Item href="/brands/featured/phoenix-contact">Phoenix</Item>
                    </DivMenu>
				
                    <DivMenu>
                        <Head>Products</Head>
                        <Item href="/search?searchTerm=valves">Valves</Item>
                        <Item href="/search?searchTerm=hydraulics">Hydraulics</Item>
                        <Item href="/search?searchTerm=gear">Gears</Item>
                        <Item href="/search?searchTerm=tubing">Tubing</Item>
                        <Item href="/categories/aluminum-structural-framing">Aluminum Framing</Item>
                        <Item href="/categories/process-controls-components">Controls</Item>
                    </DivMenu>
				
                    <DivSocial>
                        <DivSocialIcons>
                            <ADim target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/Airlinehyd/">
                                <FontAwesomeIcon icon={['fab', 'facebook']} size="2x" color="black"/>
                            </ADim>
							
                            <ADim target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/company/airline-hydraulics-corporation">
                                <FontAwesomeIcon icon={['fab', 'linkedin-in']} size="2x" color="black"/>
                            </ADim>
							
                            <ADim target="_blank" rel="noopener noreferrer" href="https://twitter.com/AirlineHyd">
                                <FontAwesomeIcon icon={['fab', 'twitter']} size="2x" color="black"/>
                            </ADim>
							
                            <ADim target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/user/AirlineHydraulics">
                                <FontAwesomeIcon icon={['fab', 'youtube']} size="2x" color="black"/>
                            </ADim>
                        </DivSocialIcons>
                    </DivSocial>
                </ContentContainer>
            </ContainerTop>
			
            <Container>
                <Pcopyright> © Airline Hydraulics Corporation, {new Date().getFullYear()}</Pcopyright> |
                <Pcopyright>Privacy Policy</Pcopyright> |
                <Pcopyright>Terms &amp; Conditions</Pcopyright> |
                <Pcopyright>Legal Disclaimer</Pcopyright> |
                <Pcopyright>Help Center</Pcopyright>
            </Container>
            <OttoDrift />
        </>
    )
}