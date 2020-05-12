import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import Header from '../_common/header'
import SubHeader from '../_common/subHeaderAndDetails'
import ContactForm from './uiComponents/contactForm'
import ProjectForm from './uiComponents/projectRequirementForm'

const Container = styled.div`
  max-width: 1300px;
  margin: 50px auto;
`
const Title_Div = styled.div`
    display: flex;
    align-items: center;
`
const Number_Div = styled.div`
    width: 50px;
`
const Number = styled.img`
    width: 100%;
`
const Topic_Div = styled.div`
`
const Topic = styled.p`
    font-weight: bold;
    font-size: 22px;
    margin-bottom: 0;
    text-transform: uppercase;
`
const Div = styled.div`
    display: flex;
    flex-direction: column;
    width: 350px;
    margin: 30px;
`
const ImgDiv = styled.div`
    width: 350px;
`
const Img = styled.img`
    width: 100%;
`
const SectionDiv = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 40px;
`
const DetailDiv = styled.div`
    // margin-top: 10px;
    background-color: #f2f3f4;
    padding: 20px;
    height: 248px;

`
const ContactDiv = styled.div`
    display: flex;
    flex-direction: column;
`
const ContactInfo = styled.p`
`
const Detail = styled.p`
`
const SubTitle = styled.div`
    text-align: center;
    display: flex;
    justify-content: center;
`
const H5 = styled.h4`
    color: #B51F2B;
    width: 55%;
`
const ContactSection = styled.div`
    display: flex;

`

export default function FramingRequestPage() {
    return (
        <Container>
            <Header text="framing request" />
            <SubHeader
                text="Let Airline's engineering and manufacturing team transform your ideas into reality."
                details="Structural framing can be configured to support a variety of applications including workstations, lean manufacturing cells, safety guards, large area enclosures, clean rooms, machine bases, solar racking an much more. Get the process started with a framing application in your facility by submitting the form below."
            />
            <SectionDiv>
                <Div>
                    <Title_Div>
                        <Number_Div>
                            <Number src="https://www.airlinehyd.com/customer/aihyco/images/Step-1.jpg" />
                        </Number_Div>
                        <Topic_Div>
                            <Topic>Design</Topic>
                        </Topic_Div>
                    </Title_Div>
                    <ImgDiv>
                        <Img src="https://www.airlinehyd.com/customer/aihyco/images/sketch.jpg" />
                    </ImgDiv>
                    <DetailDiv>
                        <Detail>
                            After completing the form below, an Airline Application Engineer will consult with you and develop concepts based on your needs. At Airline, an AutoCAD or Inventor drawing and proposal are generated for your review and approval. Once the order is placed; the design, BOM and details for production are finalized.
                    </Detail>
                    </DetailDiv>
                </Div>
                <Div>
                    <Title_Div>
                        <Number_Div>
                            <Number src="https://www.airlinehyd.com/customer/aihyco/images/Step-2.jpg" />
                        </Number_Div>
                        <Topic_Div>
                            <Topic>Fabrication</Topic>
                        </Topic_Div>
                    </Title_Div>
                    <ImgDiv>
                        <Img src="https://www.airlinehyd.com/customer/aihyco/images/FramingFabrication.jpg" />
                    </ImgDiv>
                    <DetailDiv>
                        <Detail>
                            Airline's fabrication facilities offer the best in local manufacturing support. We can supply pre-cut and pre-machined kitted parts ready for final assembly by your technicians or we can provide completely assembled structures for quick and easy installation.
                    </Detail>
                    </DetailDiv>
                </Div>
                <Div>
                    <Title_Div>
                        <Number_Div>
                            <Number src="https://www.airlinehyd.com/customer/aihyco/images/Step-3.jpg" />
                        </Number_Div>
                        <Topic_Div>
                            <Topic>Delivery/Installation</Topic>
                        </Topic_Div>
                    </Title_Div>
                    <ImgDiv>
                        <Img src="https://www.airlinehyd.com/customer/aihyco/images/FramingDelivery.jpg" />
                    </ImgDiv>
                    <DetailDiv>
                        <Detail>
                            If required, our field service team will deliver your designed and manufactured component to your location. Skilled technicians can install your new components and get you up and running in no time.
                    </Detail>
                    </DetailDiv>
                </Div>
            </SectionDiv>
            <SubTitle>
                <H5>Please enter the information about your guarding needs below. Required fields are marked with an asterisk (*)</H5>
            </SubTitle>
            <ContactSection>
                <ContactDiv>
                    <ContactForm text="Contact Information"/>
                </ContactDiv>
                <ContactDiv>
                    <ContactForm text="Project Requirements"/>
                </ContactDiv>
            </ContactSection>
            {/* <ProjectForm /> */}

        </Container>
    )
}
