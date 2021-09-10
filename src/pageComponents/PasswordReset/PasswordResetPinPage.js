import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import AirlineLogoCircle from '../../imgs/airline/airline_circle_vector.png'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import PasswordRequirements from './uiComponents/passwordRequirements'
import Context from 'setup/context'

const MUTATION_PASSWORD_RESET = gql`
  mutation SubmitPasswordReset($passwordInfo: PasswordResetSubmitInputGraphType){
    submitPasswordReset(passwordReset: $passwordInfo){
      success
      message
    }
  }
`

const ResetPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  margin: 28px auto;
  flex-grow: 99;
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
  margin-top: 10px;
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

const DivInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`

const PasswordResetPinPage = (props) => {
    const {
        passwordResetEmail,
        setPasswordResetEmail
    } = useContext(Context)

    const {
        history
    } = props

    const [resetPin, setResetPin] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isPasswordValid, setIsPasswordValid] = useState(false)

    const [executePasswordReset, { loading, error }] = useMutation(MUTATION_PASSWORD_RESET, {
        onCompleted: data => {
            const responseData = data.submitPasswordReset
            if (responseData.success) {
                setPasswordResetEmail('')
                history.push('/login?passwordReset=true')
            } else {
                setErrorMessage(responseData.message)
                setPassword('')
                setConfirmPassword('')
            }
        }
    })

    const handlePasswordReset = () => {
        if (password !== confirmPassword) {
            //passwords do not match
        } else {
            executePasswordReset(
                {
                    variables: {
                        passwordInfo: {
                            resetPin: resetPin,
                            email: passwordResetEmail,
                            newPassword: password
                        }
                    }
                }
            )
        }
    }

    return (
        <ResetPageContainer>

            <Img src={AirlineLogoCircle} height='75px' onClick={() => history.push('/')} />
            
            <p>You will receive a password reset link shortly at your {passwordResetEmail} email address.</p>

            <DivInput>
                <Label>PIN from Email</Label>
                <Input type='text' value={resetPin} onChange={(evt) => { setResetPin(evt.target.value) }} />
            </DivInput>

            <DivInput>
                <Label>Password</Label>
                <Input type='password' value={password} onChange={(evt) => { setPassword(evt.target.value) }} />
            </DivInput>

            <DivInput>
                <Label>Confirm Password</Label>
                <Input type='password' value={confirmPassword} onChange={(evt) => { setConfirmPassword(evt.target.value) }} />
            </DivInput>
            
            <PasswordRequirements
                password={password}
                confirmPassword={confirmPassword}
                isValidPassword={(isValid) => setIsPasswordValid(isValid)}
            />

            <Button onClick={() => { handlePasswordReset() }}>Submit Password Reset</Button>
        </ResetPageContainer>
    )
}


export default PasswordResetPinPage