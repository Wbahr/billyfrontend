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

export default function ResetPasswordModal({open, hideModal}) {
	const [username, setUsername] = useState('')
	const [message, setMessage] = useState('')

	const [executePasswordResetRequest, { loading }] = useMutation(MUTATION_RESET_PASSWORD_REQUEST, {
		onCompleted: data => {
			let requestData = data.requestPasswordReset
			if(requestData.success){
				setMessage(requestData.message)
				setTimeout(()=>{handleClose(), history.push('/login')}, 5000)
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
					'resetInfo': {
						'username': username
					}
				}
			}
		)
	}
  
	return(
		<Popup open={open} onClose={()=>handleClose()} closeOnDocumentClick contentStyle={{'maxWidth': '350px', 'borderRadius': '5px'}}>
			<DivContainer>
				<p>Reset Password</p>
				{message && <p>{message}</p>}
				<AirlineInput 
					label="Username / Email:"
					type="text"
					name="username"
					value={username}
					width='300px'
					onChange={(e)=> setUsername(e.target.value)}
				/>
				<button onClick={()=>{handleResetPassword()}}>{loading ? 'Requesting Reset...' : 'Reset Password'}</button>
			</DivContainer>
		</Popup>
	)
}