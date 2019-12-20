import React from 'react'
import styled from 'styled-components'
import AirlineLogo from '../../imgs/airline/airline_vector.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Newsletter = styled.div`
  background-color: black;
  height: 70px;
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
  align-items: center;
  justify-content: space-between;
  width: 1000px;
  margin: 0 auto;
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
  justify-content: space-between;
  width: 150px;
  height: 30px;
`

const DivAirline = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: center;
  justify-content: space-between;
  width: 500px;
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
  margin-top: 6px;
`

const ACallUs = styled.a`
  height: 100%;
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 0 8px;
`

export default function FooterComponent() {
  
  return(
    <>
      <Newsletter>

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
            <DivRow><FontAwesomeIcon icon='map-pin' size="sm" color="#535353"/><P>3557 Progress Drive, Bensalem, PA 19020</P></DivRow>
            <DivRow><FontAwesomeIcon icon='phone-alt' size="sm" color="#535353"/><P>215-638-4700</P></DivRow>
            <DivRow><FontAwesomeIcon icon='fax' size="sm" color="#535353"/><P>Fax: 215-638-1707</P></DivRow>
          </DivAirline>

          <DivSocial>
            <ADim target="_blank" href="https://www.youtube.com/user/AirlineHydraulics"><FontAwesomeIcon icon={['fab', 'facebook']} size="2x" color="black"/></ADim>
            <ADim target="_blank" href="https://www.youtube.com/user/AirlineHydraulics"><FontAwesomeIcon icon={['fab', 'linkedin-in']} size="2x" color="black"/></ADim>
            <ADim target="_blank" href="https://www.youtube.com/user/AirlineHydraulics"><FontAwesomeIcon icon={['fab', 'twitter']} size="2x" color="black"/></ADim>
            <ADim target="_blank" href="https://www.youtube.com/user/AirlineHydraulics"><FontAwesomeIcon icon={['fab', 'youtube']} size="2x" color="black"/></ADim>
          </DivSocial>
        </ContentContainer>
      </ContainerTop>
      <Container>
        <Pcopyright> © Airline Hydraulics Corporation, 2020</Pcopyright> |
        <Pcopyright>Privacy Policy</Pcopyright> |
        <Pcopyright>Terms & Conditions</Pcopyright> |
        <Pcopyright>Legal Disclaimer</Pcopyright> |
        <Pcopyright>Help Center</Pcopyright>
      </Container>
    </>
  )
}