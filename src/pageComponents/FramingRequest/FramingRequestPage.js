import React from 'react'
import styled from 'styled-components'
import Header from '../_common/header'
import SubHeader from '../_common/subHeaderAndDetails'
import ContactForm from './uiComponents/contactForm'
import ProjectForm from './uiComponents/projectRequirementForm'

const Container = styled.div`
  max-width: 1300px;
  margin: 0 auto;
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
    align-self: start;
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
              <Number src="https://airlinemedia.airlinehyd.com/Static_pages/contact/framing-request/Step-1.jpg" />
            </Number_Div>
            <div>
              <Topic>Design</Topic>
            </div>
          </Title_Div>
          <ImgDiv>
            <Img src="https://airlinemedia.airlinehyd.com/Static_pages/contact/framing-request/sketch.jpg" />
          </ImgDiv>
          <DetailDiv>
            <p>
              After completing the form below, an Airline Application Engineer will consult with you and develop concepts based on your needs. At Airline, an AutoCAD or Inventor drawing and proposal are generated for your review and approval. Once the order is placed; the design, BOM and details for production are finalized.
            </p>
          </DetailDiv>
        </Div>
        <Div>
          <Title_Div>
            <Number_Div>
              <Number src="https://airlinemedia.airlinehyd.com/Static_pages/contact/framing-request/Step-2.jpg" />
            </Number_Div>
            <div>
              <Topic>Fabrication</Topic>
            </div>
          </Title_Div>
          <ImgDiv>
            <Img src="https://airlinemedia.airlinehyd.com/Static_pages/contact/framing-request/FramingFabrication.jpg" />
          </ImgDiv>
          <DetailDiv>
            <p>
              Airline's fabrication facilities offer the best in local manufacturing support. We can supply pre-cut and pre-machined kitted parts ready for final assembly by your technicians or we can provide completely assembled structures for quick and easy installation.
            </p>
          </DetailDiv>
        </Div>
        <Div>
          <Title_Div>
            <Number_Div>
              <Number src="https://airlinemedia.airlinehyd.com/Static_pages/contact/framing-request/Step-3.jpg" />
            </Number_Div>
            <div>
              <Topic>Delivery/Installation</Topic>
            </div>
          </Title_Div>
          <ImgDiv>
            <Img src="https://airlinemedia.airlinehyd.com/Static_pages/contact/framing-request/FramingDelivery.jpg" />
          </ImgDiv>
          <DetailDiv>
            <p>
              If required, our field service team will deliver your designed and manufactured component to your location. Skilled technicians can install your new components and get you up and running in no time.
            </p>
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
          <ProjectForm text="Project Requirements"/>
        </ContactDiv>
      </ContactSection>
    </Container>
  )
}
