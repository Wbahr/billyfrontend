import React, {useState} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import AirlineLogoCircle from '../../imgs/airline/airline_circle_vector.png'
import CustomerSelect from './uiComponents/customerSelect'
import NewCustomer from './uiComponents/newCustomer'
import ExistingCustomer from './uiComponents/existingCustomer'

const SignupPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 350px;
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

const Button = styled.button`
  background-color: black;
  color: white;
  border: none;
  font-size: 20px;
  padding: 8px 16px;
  &:hover{
    background-color: #DB1633;
    transition: background-color 300ms;
  }
`

export default function LoginPage({history}) {
  const [customerType, setCustomerType] = useState('')

  const renderContent = () => {
    if (customerType === 'existing') {
      return (
        <ExistingCustomer />
      )
    } else if (customerType === 'new') {
      return (
        <NewCustomer />
      )
    } else {
      return(
        <CustomerSelect 
          selectCustomer={(value)=> handleCustomerSelect(value)}
        />
      )
    }
  }

  function handleCustomerSelect(value){
    if(value === 'existing'){
      setCustomerType('existing')
    } else {
      setCustomerType('new')
    }
    selectCustomerType(true)
  }

  return(
    <SignupPageContainer>
      <Img src={AirlineLogoCircle} height='75px' onClick={()=> history.push('/')}/>
      <P>Airline Hydraulics Signup</P>
      {renderContent()}
      <A onClick={()=> history.push('/login')}>Have an Account? Login</A>
      <A onClick={()=> history.push('/itemCreation')}>Go to this other page! Login</A>
    </SignupPageContainer>
  )
}

LoginPage.propTypes = {
  history: PropTypes.object.isRequired
}