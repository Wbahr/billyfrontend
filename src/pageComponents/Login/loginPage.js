import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import AirlineLogoCircle from '../../imgs/airline/airline_circle_vector.png'
import { useLazyQuery } from '@apollo/client'
import Context from '../../setup/context'
import PasswordResetModal from '../_common/modals/resetPasswordModal'
import { ErrorAlert, InfoAlert } from '../../styles/alerts'
import { QUERY_LOGIN } from 'setup/providerGQL'

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

export default function LoginPage(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [infoMessage, setInfoMessage] = useState('')
    const [showPasswordResetModal, setShowPasswordResetModal] = useState(false)

    const {
        userInfo,
        loginUser,
        setPasswordResetEmail
    } = useContext(Context)
    const history = props.history

    // Account for delays in loading context
    useEffect(() => {
        if (userInfo) {
            const urlParams = new URLSearchParams(props.location.search)
            const redirect = urlParams.get('next')
            if (redirect) {
                history.push(redirect)
            }
        }
    }, [userInfo])

    const [executeLogIn, { loading, error }] = useLazyQuery(QUERY_LOGIN, {
        fetchPolicy: 'no-cache',
        onCompleted: data => {
            const requestData = data.submitLogin
            if (requestData.success) {
                // Need to reset password
                if (requestData.isPasswordReset) {
                    setPasswordResetEmail(email)
                    history.push('/password-reset')
                } else {
                    const mergeToken = localStorage.getItem('shoppingCartToken')
                    localStorage.setItem('apiToken', requestData.authorizationInfo.token)
                    localStorage.setItem('refreshToken', requestData.authorizationInfo.refreshToken)
                    localStorage.setItem('userInfo', JSON.stringify(requestData.authorizationInfo.userInfo))
                    loginUser(requestData.authorizationInfo.userInfo, mergeToken)
                    const urlParams = new URLSearchParams(props.location.search)
                    const redirect = urlParams.get('next')
                    if (redirect) {
                        history.push(redirect)
                    } else {
                        history.push('/')
                    }
                }
            } else {
                setErrorMessage(requestData.message)
                setPassword('')
            }
        }
    })
    
    const handleEnterPress = e => {
        if (e.key === 'Enter') handleSignIn()
    }

    function handleSignIn() {
        if (email.length === 0 || password.length === 0) {
            setErrorMessage('Email and Password Required')
        } else {
            setErrorMessage('')
            executeLogIn(
                {
                    variables: {
                        loginInfo: {
                            loginId: email,
                            password: password
                        }
                    }
                }
            )
        }
    }
	
    return (
        <LoginPageContainer>
            <PasswordResetModal 
                open={showPasswordResetModal} 
                hideModal={() => setShowPasswordResetModal(false)}
                history={history}
            />
            
            <Img src={AirlineLogoCircle} height='75px' onClick={() => history.push('/')}/>
            
            <P>Airline Hydraulics Login</P>
            
            {errorMessage.length > 0  && <ErrorAlert>{errorMessage}</ErrorAlert>}
            {infoMessage.length > 0  && <InfoAlert>{infoMessage}</InfoAlert>}
            {error && <p>An unexpected error has occured. Please try again or contact us.</p>}
            
            <DivInput>
                <Label htmlFor='email'>Username or Email</Label>
                <Input
                    id='email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    onKeyPress={handleEnterPress}
                />
            </DivInput>
            
            <DivInput>
                <Label htmlFor='password'>Password</Label>
                <Input
                    id='password'
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    onKeyPress={handleEnterPress}
                />
            </DivInput>
            
            <Button disabled={loading} onClick={handleSignIn}>
                {loading ? 'Logging In...' : 'Log In'}
            </Button>
            
            <A onClick={() => setShowPasswordResetModal(true)}>Forgot your Password?</A>
            
            <A onClick={() => history.push('/signup')}>Create an Account</A>
        </LoginPageContainer>
    )
}