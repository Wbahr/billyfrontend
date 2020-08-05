import React from 'react'
import styled from 'styled-components'
import AirlineLogo from '../../imgs/airline/airline_vector.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Newsletter = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	background-color: black;
	height: 70px;
	background-image: linear-gradient( rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2) ), url("https://www.airlinehyd.com/customer/aihyco/images/Headers/Basic_Background.png");
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
	font-family: ProximaBold;
	font-size: 18px;
	font-weight: 700;
	color: white;
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

const NewsletterButton = styled.button`
	font-family: ProximaBold;
	height: 35px;
	color: white;
	font-size: 18px;
	font-weight: 600;
	background-color: black;
	border: 0;  
	@media (max-width: 800px){
		margin-top: 10px;
	}
`

const ContainerTop = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 180px; 
	background-color: white;
	margin: 16px 0;
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
	align-items: center;
	justify-content: center;
	height: 30px;
	background-color: #535353;
`

const DivSocial = styled.div`
	display: flex;
	flex-direction: column;
	width: 500px;
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
	width: 620px;
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
	width: 300px; 
	margin: 8px 32px;
	@media (max-width: 1200px){
		display: none;
	}
`
const Head = styled.p`
	font-size: 16px;
	font-weight: 700;
	color: rgb(33, 37, 41);
	margin: 0;
`

const Item = styled.p`
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

export default function FooterComponent({history}) {
	return(
		<>
			<Newsletter>
				<NewsletterLabel>Subscribe to Airline Tech Journals</NewsletterLabel><NewsletterInput placeholder='your@email.com'/><NewsletterButton>Subscribe</NewsletterButton>
			</Newsletter>
			<ContainerTop>
				<ContentContainer>
					<DivAirline>
						<DivRow>
							<div>
								<img src={AirlineLogo} height="45px" />
							</div>
							<ACallUs href="tel:1-800-999-7378">800-999-7378</ACallUs>
						</DivRow>
						<a target='_blank' rel='noopener noreferrer' href='https://www.google.com/maps/place/3557+Progress+Dr,+Bensalem,+PA+19020'><DivRow><FontAwesomeIcon icon='map-pin' size="sm" color="#535353"/><P>3557 Progress Drive, Bensalem, PA 19020</P></DivRow></a>
						<a href='tel:215-638-4700'><DivRow><FontAwesomeIcon icon='phone-alt' size="sm" color="#535353"/><P>215-638-4700</P></DivRow></a>
						<DivRow><FontAwesomeIcon icon='fax' size="sm" color="#535353"/><P>Fax: 215-638-1707</P></DivRow>
					</DivAirline>
					<DivMenu>
						<Head>Featured Brands</Head>
						<Item onClick={()=> history.push('/brands')}>SMC</Item>
						<Item onClick={()=> history.push('/brands')}>Hydraulics</Item>
						<Item onClick={()=> history.push('/brands')}>Gears</Item>
						<Item onClick={()=> history.push('/brands')}>Tubing</Item>
						<Item onClick={()=> history.push('/brands')}>Pumps</Item>
						<Item onClick={()=> history.push('/brands')}>Aluminum Framing</Item>
					</DivMenu>

					<DivMenu>
						<Head>Products</Head>
						<Item onClick={()=> history.push('/brands')}>Valves</Item>
						<Item onClick={()=> history.push('/brands')}>Hydraulics</Item>
						<Item onClick={()=> history.push('/brands')}>Gears</Item>
						<Item onClick={()=> history.push('/brands')}>Tubing</Item>
						<Item onClick={()=> history.push('/brands')}>Aluminum Framing</Item>
						<Item onClick={()=> history.push('/brands')}>Controls</Item>
					</DivMenu>

					<DivSocial>
						<DivSocialIcons>
							<ADim target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/Airlinehyd/"><FontAwesomeIcon icon={['fab', 'facebook']} size="2x" color="black"/></ADim>
							<ADim target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/company/airline-hydraulics-corporation"><FontAwesomeIcon icon={['fab', 'linkedin-in']} size="2x" color="black"/></ADim>
							<ADim target="_blank" rel="noopener noreferrer" href="https://twitter.com/AirlineHyd"><FontAwesomeIcon icon={['fab', 'twitter']} size="2x" color="black"/></ADim>
							<ADim target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/user/AirlineHydraulics"><FontAwesomeIcon icon={['fab', 'youtube']} size="2x" color="black"/></ADim>
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
		</>
	)
}