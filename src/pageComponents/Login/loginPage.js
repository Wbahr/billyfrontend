import React, {useEffect, useState, useContext} from 'react'
import styled from 'styled-components'
import AirlineLogoCircle from '../../imgs/airline/airline_circle_vector.png'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Context from '../../config/context'
import PasswordResetModal from '../_common/modals/resetPasswordModal'
import { ErrorAlert, InfoAlert } from '../../styles/alerts'

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

const QUERY_LOGIN = gql`
  query SubmitLogin($loginInfo: LoginInputGraphType){
    submitLogin(login: $loginInfo){
      success
      message
      isPasswordReset
      authorizationInfo{
        token
        userInfo {
          firstName
          lastName
          companyName
          companyId
          role
          permissions
          limits {
            limitType
            limitValue
          }
        }
      }
    }
  }
`

export default function LoginPage({history}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [infoMessage, setInfoMessage] = useState('')
  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false)

  const context = useContext(Context);

  const [executeLogIn, { loading, error, data }] = useLazyQuery(QUERY_LOGIN, {
    onCompleted: data => {
      console.log('executeLogIn', data)
      let requestData = data.submitLogin
      if(requestData.success){
        // Need to reset password
        if(requestData.isPasswordReset){
          setErrorMessage('')
          setInfoMessage(requestData.message)
          setPassword('')
        } else {
          localStorage.setItem('apiToken', requestData.authorizationInfo.token)
          localStorage.setItem('userInfo', JSON.stringify(requestData.authorizationInfo.userInfo))
          context.loginUser(requestData.authorizationInfo.userInfo)
          history.push('/')
        }
      } else {
        setErrorMessage(requestData.message)
        setPassword('')
      }
    }
  })

  function handleSignin(){
    if(email.length === 0 || password.length === 0) {
      setErrorMessage('Email and Password Required')
    } else {
      executeLogIn(
        {
          variables: {
            "loginInfo": {
              "loginId": email,
              "password": password
            }
          }
        }
      )
    }
  }

  return(
    <LoginPageContainer>
      <PasswordResetModal 
        open={showPasswordResetModal} 
        hideModal={()=>{setShowPasswordResetModal(false)}}
      />
      <Img src={AirlineLogoCircle} height='75px' onClick={()=> history.push('/')}/>
      <P>Airline Hydraulics Login</P>
      {errorMessage.length > 0  && <ErrorAlert>{errorMessage}</ErrorAlert>}
      {infoMessage.length > 0  && <InfoAlert>{infoMessage}</InfoAlert>}
      {error && <p>An unexpected error has occured. Please try again or contact us.</p>}
      <DivInput>
        <Label htmlFor='email'>Username or Email</Label>
        <Input id='email' onChange={(e)=>setEmail(e.target.value)} value={email}/>
      </DivInput>
      <DivInput>
        <Label htmlFor='password'>Password</Label>
        <Input id='password' type='password' onChange={(e)=>setPassword(e.target.value)} value={password}/>
      </DivInput>
      <Button disabled={loading} onClick={()=>handleSignin()}>{loading ? 'Logging In...' : 'Log In'}</Button>
      <A onClick={()=>setShowPasswordResetModal(true)}>Forgot your Password?</A>
      <A onClick={()=> history.push('/signup')}>Create an Account</A>

    </LoginPageContainer>
  )
}