import React, { useState } from 'react'
import Popup from 'reactjs-popup'
import styled from 'styled-components'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import AirlineInput from '../form/inputv2'

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
    text-align: center;
    &:hover{
        background-color: #DB1E34;
    }
`
const ResetPassword = styled.p`
    font-weight: bold;
`
export default function ResetPasswordModal({ open, hideModal }) {
    const [username, setUsername] = useState('')
    const [message, setMessage] = useState('')

    const [executePasswordResetRequest, { loading }] = useMutation(MUTATION_RESET_PASSWORD_REQUEST, {
        onCompleted: data => {
            const requestData = data.requestPasswordReset
            if (requestData.success){
                setMessage(requestData.message)
                setTimeout(() => {
                    handleClose()
                    history.push('/login')
                }, 5000)
            } else {
                setMessage('An error has occured. Please check your email/username and try again or contact us.')
                setUsername('')
            }
        }
    })

    function handleClose(){
        hideModal()
        setUsername('')
        setMessage('')
    }

    function handleResetPassword(){
        executePasswordResetRequest(
            {
                variables: {
                    resetInfo: {
                        username: username
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
                    label="Username / Email:"
                    type="text"
                    name="username"
                    value={username}
                    width='100%'
                    onChange={(e) => setUsername(e.target.value)}
                />
                <ResetPasswordButton onClick={() => {handleResetPassword()}}>{loading ? 'Requesting Reset...' : 'Reset Password'}</ResetPasswordButton>
            </DivContainer>
        </Popup>
    )
}