import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Header from '../_common/header'

const Container = styled.div`
    max-width: 1300px;
    margin: 0 auto;
`
const SubTitle = styled.div`
    padding: 5px 0;
    // margin-bottom: 15px;
`
const MainDiv = styled.div`
    margin: 50px 0;
    display: flex;
    flex-wrap: wrap;
`
const P = styled.p`
    font-weight: bold;
    text-align: center;
    color: #B51F2B;
    margin: 0;
    padding: 0 5px;
    font-size: 20px;
`
const QuestionDiv = styled.div`
    margin: 20px 0;
`
const Question = styled.p`
    font-weight: bold;
    margin-bottom: 5px;
`
const Div_1 = styled.div`
    border-right: 3px solid #f2f3f4;
    display: flex;
    flex-direction: column;
    flex: 1;
`
const Div_2 = styled.div`
    margin-left:20px;
    display: flex;
    flex-direction: column;
    flex: 3;
`
const Answer = styled.p`
    margin-bottom: 0;
`
const Border = styled.div`
    border-bottom: 2px solid #f2f3f4;
    width: 5%;
`
const Contact = styled.p`
    margin-bottom: 0;
    font-size: 14px;
`
const PDF = styled.a`
    color: #246696;
    font-weight: bold;
`
const Email = styled.a`
    color: #246696;
    font-weight: bold;
`
const Span = styled.span`
    font-weight: bold;
`
const MoreInfo = styled.div`
    padding: 15px 0;
`
const SpecialistDiv = styled.div`
    margin-right: 20px;
`
const InfoDiv = styled.div`
    margin-top: 25px;
    background-color: #f2f3f4;
    margin-right: 20px;
`
const ContactSale = styled.p`
    font-weight: bold;
    color: #B51F2B;
    font-size: 14px;
    margin: 15px 0;
    text-align: center;
`
const Info = styled.p`
    font-weight: bold;
    text-align: center;
    margin-bottom: 0;
`
const InfoDetail = styled.p`
    text-align: center;
    font-size: 14px;
    padding: 0 15px;
`
const SaleImgDiv = styled.div`
    height: 100px;
    width: 100px;
    margin: 0 auto;
`
const Img = styled.img`
    width: 100%;
`
export default function GovermentSalesPage() {
    return (
        <Container>
            <Header text="Government sales" />
            <p>Airline provides innovative solutions for our customers who represent many different types of industries. In the government and defense sector, we provide fluid power and automation components, assemblies and systems to major defense contractors as a second- or third-tier supplier and also supply directly to U.S. government agencies as a small business.</p>
            <MainDiv>
                <Div_1>
                    <SpecialistDiv>
                        <SubTitle>
                            <SaleImgDiv>
                                <Img src="https://www.airlinehyd.com/customer/aihyco/images/icons/technical%20help.jpg" />
                            </SaleImgDiv>
                            <ContactSale>Contact one of our dedicated Government Sales Specialists.</ContactSale>
                        </SubTitle>
                        <Contact><Span>Airline Hydraulics Corporation Headquarters</Span></Contact>
                        <Contact><Span>Toll Free:</Span> 1-800-999-7378 or 215-638-4700 </Contact>
                        <Contact><Span>Email:</Span> <Email href="mailto:govsales@airlinehyd.com">govsales@airlinehyd.com</Email></Contact>
                        <PDF href="https://www.airlinehyd.com/literature_catalog/Airline/Airline_Capability_Statement.pdf" target= "_blank">Airline Capabillity Statement</PDF>
                    </SpecialistDiv>
                    <InfoDiv>
                        <MoreInfo>
                            <Info>Need more information?</Info>
                        </MoreInfo>
                        <InfoDetail><a href="#">Click here</a> to contact an Airline representative, or call us at (800) 999-7378</InfoDetail>
                    </InfoDiv>

                </Div_1>
                <Div_2>
                    <SubTitle>
                        <P>Frequently Asked Questions</P>
                    </SubTitle>
                    <QuestionDiv>
                        <Question><FontAwesomeIcon icon='question-circle' size='1x' /> Is Airline a registered vendor in the CCR database?</Question>
                        <Answer>Yes, our DUNS # is 00-231-9044</Answer>
                    </QuestionDiv>
                    <Border></Border>
                    <QuestionDiv>
                        <Question><FontAwesomeIcon icon='question-circle' size='1x' /> Does Airline have a CAGE Code?</Question>
                        <Answer>Yes, that number is 04962</Answer>
                    </QuestionDiv>
                    <Border></Border>
                    <QuestionDiv>
                        <Question><FontAwesomeIcon icon='question-circle' size='1x' /> What are your supported NAICS codes?</Question>
                        <Answer>Our main NAICS codes include: 331316, 332911, 332912, 333298, 333995, 333996, 333999, 423610, 423830, 423840,423990 and 811310.</Answer>
                    </QuestionDiv>
                    <Border></Border>
                    <QuestionDiv>
                        <Question><FontAwesomeIcon icon='question-circle' size='1x' /> Does Airline accept credit cards?</Question>
                        <Answer>Yes, we accept Visa, MasterCard, American Express and Discover cards.</Answer>
                    </QuestionDiv>
                    <Border></Border>
                    <QuestionDiv>
                        <Question><FontAwesomeIcon icon='question-circle' size='1x' /> What Government agencies has Airline sold to?</Question>
                        <Answer>
                            <ul>
                                <li>U.S. Coast Guard</li>
                                <li>Federal Aviation Administration</li>
                                <li>Department of Defense</li>
                                <li>Sheppard Air Force Base</li>
                            </ul>
                        </Answer>
                    </QuestionDiv>
                    <Border></Border>
                    <QuestionDiv>
                        <Question><FontAwesomeIcon icon='question-circle' size='1x' /> What types of products and services have you sold to government agencies?</Question>
                        <Answer>
                            <ul>
                                <li>Hydraulic components (pumps, cylinders, valves, etc.)</li>
                                <li>Hydraulic systems (engineering and fabrication)</li>
                                <li>Hose assemblies</li>
                                <li>Fluid connectors</li>
                                <li>Winches</li>
                                <li>Pneumatic components</li>
                                <li>Aluminum structural framing</li>
                                <li>Servo valves</li>
                                <li>Proximity sensors</li>
                                <li>Repair services</li>
                            </ul>
                        </Answer>
                    </QuestionDiv>
                    <Border></Border>
                </Div_2>
            </MainDiv>
        </Container>
    )
}
