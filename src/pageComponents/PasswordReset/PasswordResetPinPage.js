import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import AirlineLogoCircle from '../../imgs/airline/airline_circle_vector.png'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import PasswordResetModal from '../_common/modals/resetPasswordModal'
import PasswordRequirements from './uiComponents/passwordRequirements'
import { ErrorAlert, InfoAlert } from '../../styles/alerts'
import Context from 'setup/context'

const MUTATION_PASSWORD_RESET = gql`
  mutation SubmitPasswordReset($passwordInfo: PasswordResetSubmitInputGraphType){
    submitPasswordReset(passwordReset: $passwordInfo){
      success
      message
    }
  }
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
        <>
            <p>You will receive a password reset link shortly at your {passwordResetEmail} email address.</p>

            <div>
                <label>PIN from Email</label>
                <input type='text' value={resetPin} onChange={(evt) => { setResetPin(evt.target.value) }} />
            </div>

            <div>
                <label>Password</label>
                <input type='password' value={password} onChange={(evt) => { setPassword(evt.target.value) }} />
            </div>

            <div>
                <label>Confirm Password</label>
                <input type='password' value={confirmPassword} onChange={(evt) => { setConfirmPassword(evt.target.value) }} />
            </div>
            

            <PasswordRequirements
                password={password}
                confirmPassword={confirmPassword}
                isValidPassword={(isValid) => setIsPasswordValid(isValid)}
            />

            <button onClick={() => { handlePasswordReset() }}>Submit Password Reset</button>
        </>
    )
}


export default PasswordResetPinPage