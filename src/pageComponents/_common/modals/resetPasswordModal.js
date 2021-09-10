import React, { useContext, useState } from 'react'
import Popup from 'reactjs-popup'
import styled from 'styled-components'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import AirlineInput from '../form/inputv2'
import Context from 'setup/context'

const MUTATION_RESET_PASSWORD_REQUEST = gql`
  mutation PasswordResetRequestMutation($resetInfo: PasswordResetRequestInputGraphType){
    requestPasswordReset(passwordResetRequest:$resetInfo){
      message
      success
    }
  }
`

const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px;
`
const ResetPasswordButton = styled.div`
    margin: 18px 0 10px;
    border: 1px solid #950f23;
    padding: 7px;
    background-image: linear-gradient(to top left,#950f23,#DB1633);
    color: white;
    cursor: pointer;
    text-align: center;
    &:hover{
        background-color: #DB1E34;
    }
`
const ResetPassword = styled.p`
    font-weight: bold;
`
export default function ResetPasswordModal({ open, hideModal, history }) {
    const {
        setPasswordResetEmail
    } = useContext(Context)

    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const [executePasswordResetRequest, { loading }] = useMutation(MUTATION_RESET_PASSWORD_REQUEST, {
        onCompleted: data => {
            const requestData = data.requestPasswordReset
            if (requestData.success){
                setMessage(requestData.message)
                handleClose()
                setPasswordResetEmail(email)
                history.push('/password-reset')
            } else {
                setMessage('An error has occured. Please check your email/username and try again or contact us.')
                setEmail('')
                setPasswordResetEmail('')
            }
        }
    })

    function handleClose(){
        hideModal()
        setEmail('')
        setMessage('')
    }

    function handleResetPassword(){
        executePasswordResetRequest(
            {
                variables: {
                    resetInfo: {
                        email: email
                    }
                }
            }
        )
    }
  
    return (
        <Popup open={open} onClose={() => handleClose()} closeOnDocumentClick contentStyle={{ maxWidth: '350px', borderRadius: '5px' }}>
            <DivContainer>
                <ResetPassword>Reset Password</ResetPassword>
                {message && <p>{message}</p>}
                <AirlineInput 
                    label="Email:"
                    type="text"
                    name="email"
                    value={email}
                    width='100%'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <ResetPasswordButton onClick={() => {handleResetPassword()}}>{loading ? 'Requesting Reset...' : 'Reset Password'}</ResetPasswordButton>
            </DivContainer>
        </Popup>
    )
}