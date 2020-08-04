import React, { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ExistingCustomer from './existingCustomer'
import NewCustomer from './newCustomer'

const SignupPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 350px;
  margin: 0 auto;
  flex-grow: 99;
`

const PHelp = styled.p`
  display: flex;
  padding: 10px;
`

const HelpDiv = styled.div`
  display: flex;
  width: 300px;
  border-width: 0 0 0 3px;
  border-style: solid;
  border-color: #555;
`

const DivRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 500px;
  cursor: pointer;
  &:hover ${HelpDiv} {
    border-color: #DB1633;
  }
`

const IconDiv = styled.div`
  display: flex;
  background-image: url(https://www.airlinehyd.com/customer/aihyco/images/Home/CategoryBackground.jpg);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  margin: 10px;
  border: 1px solid black;
  border-radius: 2px;
  p {
    font-family: Proxima;
    color: white;
    margin-top: 16px;
    margin-botton: 0;
    font-size: 20px;
  }
`

export default function CustomerSelectPage() {
  const [signupType, setSignupType] = useState('');

  let pageComponents;
  if(signupType == 'existing') {
    pageComponents = <ExistingCustomer />
  } else if(signupType == 'new') {
    pageComponents = <NewCustomer />
  } else {
    pageComponents = (
      <SignupPageContainer>
        <DivRow onClick={()=>setSignupType('existing')}>
          <IconDiv >
            <FontAwesomeIcon icon="user" color="white" size="6x"/>
            <p>Existing Customer</p>
          </IconDiv>
          <HelpDiv>
            <PHelp>Your organization does business with Airline Hydraulics, and you need an account to login</PHelp>
          </HelpDiv>
        </DivRow>
        <DivRow onClick={()=>setSignupType('new')}>
          <IconDiv>
            <FontAwesomeIcon icon="user-plus" color="white" size="6x"/>
            <p>New Customer</p>
          </IconDiv>
          <HelpDiv>
            <PHelp>Your organization is new to Airline Hydraulics, and would like to set up an account</PHelp>
          </HelpDiv>
        </DivRow>
      </SignupPageContainer>
    );
  }

	return pageComponents;
}