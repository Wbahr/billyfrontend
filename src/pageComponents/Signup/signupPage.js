import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import AirlineLogoCircle from '../../imgs/airline/airline_circle_vector.png'
import CustomerSelect from './uiComponents/customerSelect'

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

export default function LoginPage({ history }) {
  return (
    <SignupPageContainer>
      <Img src={AirlineLogoCircle} height='75px' onClick={() => history.push('/')}/>
      <P>Create an Airline Hydraulics Account</P>
      <CustomerSelect />
      <A onClick={() => history.push('/login')}>Already have an account?</A>
      <A onClick={() => history.push('/cart')}>Checkout as a guest</A>
    </SignupPageContainer>
  )
}

LoginPage.propTypes = {
  history: PropTypes.object.isRequired
}