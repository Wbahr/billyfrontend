import React from 'react'
import _ from 'lodash'
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

const ContactUsDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 40px 0 20px;
  align-items: center;
`

const H1 = styled.h2`
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

{/* <Row>
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
            </Row> */}