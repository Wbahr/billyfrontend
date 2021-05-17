import React, { useState } from 'react'
import styled from 'styled-components'
import AirlineLogoCircle from '../../imgs/airline/airline_circle_vector.png'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { useParams } from 'react-router-dom'
import PasswordResetModal from '../_common/modals/resetPasswordModal'
import PasswordRequirements from './uiComponents/passwordRequirements'
import { ErrorAlert, InfoAlert } from '../../styles/alerts'

const PasswordResetPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 350px;
  margin: 28px auto;
  flex-grow: 99;
`
const Marge = styled.div`
    margin: 16px auto;
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

const MUTATION_PASSWORD_RESET = gql`
  mutation SubmitPasswordReset($passwordInfo: PasswordResetSubmitInputGraphType){
    submitPasswordReset(passwordReset: $passwordInfo){
      success
      message
    }
  }
`

export default function PasswordResetPage({ history }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [infoMessage, setInfoMessage] = useState('')
    const [showResendToken, setShowResendToken] = useState(false)
    const [showPasswordResetModal, setShowPasswordResetModal] = useState(false)
    const [passwordIsValid, setPasswordIsValid] = useState(false)
    const { passwordToken } = useParams()


    const [executePasswordReset, { loading, error }] = useMutation(MUTATION_PASSWORD_RESET, {
        onCompleted: data => {
            const responseData = data.submitPasswordReset
            if (responseData.success) {
                setUsername('')
                setShowResendToken('')
                setErrorMessage('')
                setInfoMessage(responseData.message)
                setTimeout(() => history.push('/login'), 1500)
            } else {
                setErrorMessage(responseData.message)
                setShowResendToken(true)
                setPassword('')
                setConfirmPassword('')
            }
        }
    })

    function handlePasswordReset() {
        if (password !== confirmPassword) {
            setErrorMessage('Passwords Do Not Match')
        } else {
            executePasswordReset(
                {
                    variables: {
                        passwordInfo: {
                            token: passwordToken,
                            username: username,
                            newPassword: password
                        }
                    }
                }
            )
        }
    }

    return (
        <PasswordResetPageContainer>
            <PasswordResetModal
                open={showPasswordResetModal}
                hideModal={() => { setShowPasswordResetModal(false) }}
            />
            <Img src={AirlineLogoCircle} height='75px' onClick={() => history.push('/')} />
            <P>Airline Hydraulics Password Reset</P>
            {errorMessage.length > 0 && <ErrorAlert>{errorMessage}</ErrorAlert>}
            {infoMessage.length > 0 && <InfoAlert>{infoMessage}</InfoAlert>}
            {showResendToken && <A onClick={() => { setShowPasswordResetModal(true) }}>Token Expired? Click here to send a new one</A>}
            {error && <ErrorAlert>An unexpected error has occured. Please try again or contact us.</ErrorAlert>}
            <DivInput>
                <Label htmlFor='username'>Username</Label>
                <Input id='username' onChange={(e) => setUsername(e.target.value)} value={username} />
            </DivInput>
            <DivInput>
                <Label htmlFor='password'>New Password</Label>
                <Input id='password' type='password' onChange={(e) => { setPassword(e.target.value.replace(/\s/g, '')) }} value={password} />
            </DivInput>
            <DivInput>
                <Label htmlFor='confirm_password'>Confirm Password</Label>
                <Input id='confirm_password' type='password' onChange={(e) => setConfirmPassword(e.target.value.replace(/\s/g, ''))} value={confirmPassword} />
            </DivInput>
            <Marge>
                <PasswordRequirements
                    password={password}
                    confirmPassword={confirmPassword}
                    isValidPassword={(isValid) => setPasswordIsValid(isValid)}
                />
            </Marge>
            <Button disabled={loading || !passwordIsValid} onClick={() => handlePasswordReset()}>{loading ? 'Resetting Password...' : 'Reset Password'}</Button>
            <A onClick={() => history.push('/signup')}>Create an Account</A>
        </PasswordResetPageContainer>
    )
}