import React, {useEffect, useState} from 'react'
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

const DivInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`

const P = styled.p`
  margin: 20px 0;
  border-bottom: 1px #ddd solid;
  width: 100%;
  text-align: center;
  font-size: 20px;
`

const Label = styled.label`
  color: grey;
  font-size: 14px;
  font-weight: 300;
  padding-left: 4px;
  margin: 0;
`

const Input = styled.input`
  width: 300px;
  height: 42px;
  padding: 0 8px;
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
  const [selectedCustomerType, selectCustomerType] = useState(false)
  const [customerType, setCustomerType] = useState('')
  let CustomerSignupForm = <NewCustomer />

  useEffect(() => {
    if(customerType === 'existing'){
      CustomerSignupForm = <ExistingCustomer />
    } else if (customerType === 'new') {
      CustomerSignupForm = <NewCustomer />
    }
  })

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
      {selectedCustomerType ? CustomerSignupForm :
        <CustomerSelect 
          selectCustomer={(value)=> handleCustomerSelect(value)}
        />
      }
      <A onClick={()=> history.push('/login')}>Have an Account? Login</A>
    </SignupPageContainer>
  )
}