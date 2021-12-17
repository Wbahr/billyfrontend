import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import styled from 'styled-components'
import AirlineLogoCircle from '../../imgs/airline/airline_circle_vector.png'
import CustomerSelect from './uiComponents/customerSelect'
import ExistingCustomer from './uiComponents/existingCustomer'
import NewCustomer from './uiComponents/newCustomer'

const SignupPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 28px auto;
  flex-grow: 99;
`

const P = styled.p`
  margin: 20px 0;
  border-bottom: 1px #ddd solid;
  width: 100%;
  text-align: center;
  font-size: 20px;
`

const A = styled.a`
  cursor: pointer;
  margin-top: 8px;
  color: grey;
  &:hover{
    color: blue;
  }
`

const Img = styled.img`
  cursor: pointer;
`
const Div = styled.div`
  margin: 20px 0 14px;
`
const H5 = styled.h5`
`
const CreateAccount = styled.p`
`
const Ul = styled.ul`
`
const Link = styled.a`
`
export default function LoginPage() { 
    const navigate = useNavigate()
    const [signupType, setSignupType] = useState('')
    if (signupType == 'existing') {
        return (<ExistingCustomer />)
    } else if (signupType == 'new') {
        return (<NewCustomer />)
    } else {
        return (
            <SignupPageContainer>
                <Img src={AirlineLogoCircle} height='75px' onClick={() => navigate('/')}/>
                <P>Create an Airline Hydraulics Account</P>
                <CustomerSelect />
                <Div>
                    <H5>&#10065; Why create an account?</H5>
                    <CreateAccount>There’s a lot of reasons to make an Airline web account. Not only is checking out faster, but you can also:</CreateAccount>
                    <Ul>
                        <li>Access order status and history </li>
                        <li>Receive special pricing, discounts, and promotions (for select volume customers) </li>
                        <li>Set up business shipping accounts for LTL, collect, and retail shipping services </li>
                        <li>Save account information like billing and shipping addresses </li>
                        <li>Manage payment methods and tax-exemptions (if applicable) </li>
                        <li>Get support for large or complicated orders </li>
                        <li>Discuss pricing and availability with a sales engineer </li>
                    </Ul>
                    <CreateAccount>Get started by completing the signup form for <Link onClick={() => setSignupType('existing')}>existing Airline customers</Link> or <Link onClick={() => setSignupType('new')}>new Airline customers</Link></CreateAccount>
                </Div>
                <A onClick={() => navigate('/login')}>Already have an account?</A>
                <A onClick={() => navigate('/cart')}>Checkout as a guest</A>
            </SignupPageContainer>
        )
    }
}