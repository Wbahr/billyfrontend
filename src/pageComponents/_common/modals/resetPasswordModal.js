import React, {useState, useRef} from 'react'
import _ from 'lodash'
import Popup from 'reactjs-popup'
import styled from 'styled-components'
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const MUTATION_RESET_PASSWORD_REQUEST = gql`
  mutation PasswordResetRequestMutation($resetInfo: PasswordResetRequestInputGraphType){
    requestPasswordReset(passwordResetRequest:$resetInfo){
      message
      success
    }
  }
`

export default function ResetPasswordModal({open, hideModal}) {
  const [username, setUsername] = useState('')
  const [message, setMessage] = useState('')

  const [executePasswordResetRequest, { loading, error, data }] = useMutation(MUTATION_RESET_PASSWORD_REQUEST, {
    onCompleted: data => {
      let requestData = data.requestPasswordReset
      if(requestData.success){
        setMessage(`We are sending instructions to reset your password. If you do not receive an email,  please check your spam folder and call us at 1-800-999-7378.`)
        setTimeout(()=>{handleClose(), history.push('/login')}, 5000)
      } else {
        setMessage(`An error has occured. Please check your email/username and try again or contact us.`)
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
          "resetInfo": {
            "username": username
          }
        }
      }
    )
  }
  
  return(
    <Popup open={open} onClose={()=>handleClose()} closeOnDocumentClick>
      <p>Reset Password</p>
      {message && <p>{message}</p>}
      <p>Username / Email: </p><input value={username} onChange={(e)=> setUsername(e.target.value)}/>
      <button onClick={()=>{handleResetPassword()}}>{loading ? 'Requesting Reset...' : 'Reset Password'}</button>
    </Popup>
  )
}