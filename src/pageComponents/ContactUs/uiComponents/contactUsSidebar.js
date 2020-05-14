import React from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '../../_common/button'

// const EmailContainer = styled.div`
//     display: flex;
//     margin: 50px 0;
// `
// const EmailDiv = styled.div`
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     flex: 1;
//     align-items: center;
// `

const EmailListDiv = styled.div`
  padding: 0 12px; 
`

const EmailTo = styled.div`
  margin: 10px 0;
  font-size: 16px;
  font-weight: 500;
`
const Email = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
   
`
const EmailAddress = styled.a`
  margin: 0 10px;
  color: #246696;
`

const SideDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 25px;
`

const HeadquartersDiv = styled.div`
  display: flex;
  flex-direction: column;
`

const Text = styled.p`
  font-family: verdana;
  font-size: 18px;    
  margin: 10px 0;
  font-weight: bold;
  text-transform: uppercase;
`

const Address = styled.a`
  color: #246696;
  font-size: 14px;
`

const IconDiv = styled.div`
  font-size: 14px;
  margin: 2px 0;
`

const LocationImgDiv = styled.div`
  margin: 15px 0;
  max-width: 350px;
`

const Img = styled.img`
  width: 100%;
`

const CustomerServiceDiv = styled.div`
  display: flex;
`
const CustomerServiceBtn = styled.button`
  display: flex;
  border: none;
  font-size: 18px;
  font-family: verdana;
  border-radius: 7px;
  text-decoration: none;
  color: #FFFFFF;
  background-color: #B51F2B;
  transition: all 0.2s;
  padding: 12px 25px;
  // width: 86%;
  align-items: center;
  justify-content: center;
  &:hover{
    // background-color:#133752;
    transform: scale(1.1);
  }
`

const BtnText = styled.p`
  margin: 0 6px;
  font-weight: bold;
  font-size: 17px;
  text-transform: uppercase;
`

const CallCustomerServiceDiv = styled.div`
  display: flex;
  margin-bottom: 5px;
`

const OtherContactDiv = styled.div`
  margin: 30px 0 20px;
`

const PhoneNumber = styled.text`
  color: #B51F2B;
  font-size: 25px;
  font-weight: bold;
  letter-spacing: 2px;
`

const SaleDiv = styled.div`
  margin: 15px 0;
  flex-grow: 1;
`

const Border = styled.div`
  border-bottom: 3px solid #ebe7e7;
  width: 30%;
  margin: 0 auto;
` 

export default function ContactUsSidebar() {
	return (
		<SideDiv>
			<CallCustomerServiceDiv>
				<div><PhoneNumber>1-800-999-7378</PhoneNumber></div>
			</CallCustomerServiceDiv>
			<CustomerServiceDiv>
				<CustomerServiceBtn><FontAwesomeIcon icon="envelope" size="2x" /><BtnText> Customer Service</BtnText></CustomerServiceBtn>
			</CustomerServiceDiv>
			<OtherContactDiv>
				<Border></Border>
				<SaleDiv>
					<EmailTo><FontAwesomeIcon icon="envelope" size="1x" /> Government Sales </EmailTo>
					<EmailListDiv>
						<Email><EmailAddress href="#"> govsales@airlinehyd.com</EmailAddress></Email>
					</EmailListDiv>
				</SaleDiv>
				<SaleDiv>
					<EmailTo> <FontAwesomeIcon icon="envelope" size="1x" /> Credit</EmailTo>
					<EmailListDiv>
						<Email><EmailAddress href="#">credit@airlinehyd.com </EmailAddress></Email>
					</EmailListDiv>
				</SaleDiv>
				<SaleDiv>
					<EmailTo> <FontAwesomeIcon icon="envelope" size="1x" /> Marketing</EmailTo>
					<EmailListDiv>
						<Email><EmailAddress href="#">marketing@airlinehyd.com</EmailAddress></Email>
					</EmailListDiv>
				</SaleDiv>
				<SaleDiv>
					<EmailTo> <FontAwesomeIcon icon="envelope" size="1x" /> Repairs</EmailTo>
					<EmailListDiv>
						<Email><EmailAddress href="#">repair@airlinehyd.com </EmailAddress></Email>
					</EmailListDiv>
				</SaleDiv>
				<SaleDiv>
					<EmailTo> <FontAwesomeIcon icon="envelope" size="1x" /> Training</EmailTo>
					<EmailListDiv>
						<Email><EmailAddress href="#">training@airlinehyd.com</EmailAddress></Email>
					</EmailListDiv>
				</SaleDiv>
				<SaleDiv>
					<EmailTo><FontAwesomeIcon icon="envelope" size="1x" /> Sales</EmailTo>
					<EmailListDiv>
						<Email><EmailAddress href="#">sales@airlinehyd.com</EmailAddress></Email>
					</EmailListDiv>
				</SaleDiv>
				<Border></Border>
			</OtherContactDiv>
			<HeadquartersDiv>
				<Text>Headquarters</Text>
				<div><FontAwesomeIcon icon="map-marker-alt" /><Address href="https://www.google.com/maps/place/3557+Progress+Dr,+Bensalem,+PA+19020/@40.0862477,-74.9261714,17z/data=!3m1!4b1!4m5!3m4!1s0x89c14cfe538e2f31:0x59632a43cd81d74c!8m2!3d40.0861435!4d-74.9240374" target="_blank"> 3557 Progress Drive Bensalem, PA 19020</Address></div>
				<IconDiv><FontAwesomeIcon icon="phone-alt" size="2px" /> (215) 638-4700</IconDiv>
				<IconDiv><FontAwesomeIcon icon="print" size="2px" /> (215) 638-1707</IconDiv>
			</HeadquartersDiv>
			<LocationImgDiv>
				<Img src="https://www.airlinehyd.com/customer/aihyco/images/Headquarters_Map_2017.png" />
			</LocationImgDiv>
			<Button color="secondary" text="Branch Locations" />
		</SideDiv>      
	)
}