
import React, { useState, useContext } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
// import Context from '../../../config/context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ContactContainer = styled.div`
    max-width: 1300px;
    margin: 50px auto;
 
`
const ContactUsContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
`
const ContactUsDiv = styled.div`
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
const DetailsDiv = styled.div`
    display: flex;
    justify-content: center;
    max-width: 60%;
    margin: 0 auto;
    font-size: 20px;
    text-align: center;
`
const ShortBorder = styled.div`
    border-bottom: 3px solid #B51F2B;
    width: 7%;
`
const P = styled.p`

`
const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 60px 0;
    flex-direction: row-reverse;
    justify-content: space-between;
`
const FormDiv = styled.div`
    display: flex; 
    flex-direction: column; 
    flex: 2;
    margin: 25px;
    padding: 20px;
    background-color: #f2f3f4;
    box-shadow: 0 1px 2px rgba(0,0,0,0.07), 
    0 2px 4px rgba(0,0,0,0.07), 
    0 4px 8px rgba(0,0,0,0.07), 
    0 8px 16px rgba(0,0,0,0.07),
    0 16px 32px rgba(0,0,0,0.07), 
    0 32px 64px rgba(0,0,0,0.07);
`
const Row = styled.div`
    display: flex;
    flex-direction: row;
`
const Label = styled.label`
    font-family: verdana;
    font-size: 16px;
    margin: 0;
    margin-bottom: 3px;
    
`
const Input = styled.input`
    margin-right: 5px;
    margin-bottom: 3px;
`
const InputDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin: 5px 10px 5px;
    width: 100%;
`
const CheckBoxDiv = styled.div`
    display: flex;
    flex-direction: row;
    margin: 15px 10px 5px;
    width: 100%;
    align-items: center;
`
const EmailContainer = styled.div`
    display: flex;
    margin: 50px 0;
`
const EmailDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    align-items: center;
`
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
const AddressDiv = styled.div`
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
const Button = styled.button`
    border: none;
    font-size: 16px;
    font-family: verdana;
    border-radius: 2em;
    text-decoration: none;
    font-weight: 300;
    color: #FFFFFF;
    background-color: #133752;
    transition: all 0.2s;
    width: 50%;
    padding: 8px 5px
    &:hover{
        background-color:#B51F2B;
    }
`
const Textarea = styled.textarea`
    height: 150px;
    font-size: 14px;
`
const ButtonDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 10px 10px;
`
const FormButton = styled.button`
    border: none;
    font-size: 16px;
    font-family: verdana;
    border-radius: 2em;
    text-decoration: none;
    font-weight: 300;
    color: #FFFFFF;
    background-color: #B51F2B;
    transition: all 0.2s;
    width: 20%;
    padding: 5px
    &:hover{
        background-color:#133752;
}
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
const CallDiv = styled.div`
    
`
const OtherContactDiv = styled.div`
    margin: 30px 0 20px;
`
const PhoneNumber = styled.text`
    color: #B51F2B;
    font-size: 25px;
    font-weight: bold;
    letter-spacing: 2px;
    padding-left: 40px;
`
const SaleDiv = styled.div`
    margin: 15px 0;
`
const Border = styled.div`
    border-bottom: 3px solid #ebe7e7;
    width: 30%;
    margin: 0 auto;

` 
export default function ContactUs() {

    return (
        <ContactContainer>
            <ContactUsContainer>
                <ContactUsDiv>
                    <H1> Contact us</H1>
                    <ShortBorder></ShortBorder>
                </ContactUsDiv>
                <DetailsDiv>
                    <P>You can contact us by phone, email or by submitting the form below. Our staff answers requests as promptly as possible during regular business hours.</P>
                </DetailsDiv>
            </ContactUsContainer>

            <FormContainer>
                <FormDiv>
                    <Row>
                        <InputDiv>
                            <Label>
                                Name
                        </Label>
                            <Input />
                        </InputDiv>
                        <InputDiv>
                            <Label>
                                Last Name
                        </Label>
                            <Input />
                        </InputDiv>
                    </Row>
                    <Row>
                        <InputDiv>
                            <Label>
                                Job tittle
                        </Label>
                            <Input />
                        </InputDiv>
                    </Row>
                    <Row>
                        <InputDiv>
                            <Label>
                                Company
                        </Label>
                            <Input />
                        </InputDiv>
                    </Row>
                    <Row>
                        <InputDiv>
                            <Label>
                                City
                        </Label>
                            <Input />
                        </InputDiv>
                    </Row>
                    <Row>
                        <InputDiv>
                            <Label>
                                State
                        </Label>
                            <Input />
                        </InputDiv>
                        <InputDiv>
                            <Label>
                                Zipcode
                        </Label>
                            <Input />
                        </InputDiv>
                    </Row>
                    <Row>
                        <InputDiv>
                            <Label>
                                Email
                        </Label>
                            <Input />
                        </InputDiv>
                    </Row>
                    <Row>
                        <InputDiv>
                            <Label>
                                Phone #
                        </Label>
                            <Input />
                        </InputDiv>
                    </Row>
                    <Row>
                        <InputDiv>
                            <Label>
                                Job PO Number
                        </Label>
                            <Input />
                        </InputDiv>
                    </Row>
                    <Row>
                        <InputDiv>
                            <Label>

                            </Label>
                            <Textarea placeholder="Please enter your message...."></Textarea>
                        </InputDiv>
                    </Row>

                    <Row>
                        <CheckBoxDiv>
                            <Input type="checkbox" />
                            <Label>
                                Subscribe to our mailing list?
                            </Label>
                        </CheckBoxDiv>
                    </Row>


                    <ButtonDiv> <FormButton>Submit</FormButton></ButtonDiv>
                </FormDiv>

                <SideDiv>
                    <CallCustomerServiceDiv>
                        <CallDiv><PhoneNumber>1-800-999-7378</PhoneNumber></CallDiv>
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
                        <AddressDiv><FontAwesomeIcon icon="map-marker-alt" /><Address href="https://www.google.com/maps/place/3557+Progress+Dr,+Bensalem,+PA+19020/@40.0862477,-74.9261714,17z/data=!3m1!4b1!4m5!3m4!1s0x89c14cfe538e2f31:0x59632a43cd81d74c!8m2!3d40.0861435!4d-74.9240374" target="_blank"> 3557 Progress Drive Bensalem, PA 19020</Address></AddressDiv>
                        <IconDiv><FontAwesomeIcon icon="phone-alt" size="2px" /> (215) 638-4700</IconDiv>
                        <IconDiv><FontAwesomeIcon icon="print" size="2px" /> (215) 638-1707</IconDiv>
                    </HeadquartersDiv>
                    <LocationImgDiv>
                        <Img src="https://www.airlinehyd.com/customer/aihyco/images/Headquarters_Map_2017.png" />
                    </LocationImgDiv>
                    <Button>Branch Locations</Button>
                </SideDiv>
            </FormContainer>
        </ContactContainer>
    )
}