import React from 'react'
import styled from 'styled-components'
import ContactUsForm from './uiComponents/contactUsForm'
import Sidebar from './uiComponents/contactUsSidebar'
import Header from '../_common/header'

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1300px;
  margin: 0 auto;
`

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
`

const DetailsDiv = styled.div`
  display: flex;
  justify-content: center;
  max-width: 60%;
  margin: 0 auto;
  font-size: 20px;
  text-align: center;
`

export default function ContactUsPage() {
    return (
        <ContactContainer>
            <HeaderContainer>
                <Header text="contact us" />
                <DetailsDiv>
                    <p>You can contact us by phone, email or by submitting the form below. Our staff answers requests as promptly as possible during regular business hours.</p>
                </DetailsDiv>
            </HeaderContainer>
            <ContentContainer>
                <Sidebar />
                <ContactUsForm />
            </ContentContainer>
        </ContactContainer>
    )
}
