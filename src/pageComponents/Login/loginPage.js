import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import AirlineLogoCircle from '../../imgs/airline/airline_circle_vector.png'


const LoginPageContainer = styled.div`
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

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [forgotPassword, setforgotPassword] = useState(false)


  useEffect(() => {
  },[email, password])

  function handleSignin(){
    console.log('signing in')
  }

  function setToken() {
    console.log('setting token')
  }

  function handleForgotPassword(){
    console.log('forgot password')
  }

  return(
    <LoginPageContainer>
      <img src={AirlineLogoCircle} height='75px' onClick={()=> console.log('go home')}/>
      <P>Airline Hydraulics Login</P>
      <DivInput>
        <Label for='email'>Email Address</Label>
        <Input id='email' onChange={(e)=>setEmail(e.target.value)} value={email}/>
      </DivInput>
      <DivInput>
        <Label for='password'>Password</Label>
        <Input id='password' type='password' onChange={(e)=>setPassword(e.target.value)} value={password}/>
      </DivInput>
      <Button onClick={()=>handleSignin()}>Sign In</Button>
      <A onClick={()=>handleForgotPassword()}>Forgot your Password?</A>
      <A onClick={()=>handleForgotPassword()}>Create an Account</A>
    </LoginPageContainer>
  )
}