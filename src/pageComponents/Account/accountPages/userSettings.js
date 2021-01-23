import React, { useContext, useEffect, useState } from 'react'
import Context from '../../../config/context'
import { FormikStyleInput } from 'pageComponents/_common/formik/input_v2'
import { ButtonRed } from 'styles/buttons'
import { useMutation } from '@apollo/client'
import { ShowInfoAlert, ShowErrorAlert, InfoAlert } from 'styles/alerts'
import { CHANGE_PASSWORD } from 'config/providerGQL'
import styled from 'styled-components'
import PasswordRequirements from 'pageComponents/PasswordReset/uiComponents/passwordRequirements'

const DivRow = styled.div`
    margin: 1rem
`

const DivContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
`
const DivChild = styled.div`

`

export default function UserSettingsPage() {
  const context = useContext(Context)
  const [changePasswordDisabled, setChangePasswordDisabled] = useState(false)
  const [changePasswordForm, setChangePasswordForm] = useState({ orig: '', new1: '', new2: '' })
  const [alertMessage, setAlertMessage] = useState(null)
  const [passwordIsValid, setPasswordIsValid] = useState(false)

  const handleChangePasswordFormChange = (e) => {
    setChangePasswordForm({
      ...changePasswordForm,
      [e.target.name]: e.target.value
    })
  }

  const validatePassword = (e) => {
    if ((changePasswordForm.new1 && changePasswordForm.new2 && changePasswordForm.new1 != changePasswordForm.new2)
            || (changePasswordForm.new1 && !changePasswordForm.new2)
            || (changePasswordForm.new2 && !changePasswordForm.new1)) {
      setAlertMessage('Passwords must match')
      return false
    } else if (!changePasswordForm.orig) {
      setAlertMessage('Your current password is required to change it.')
      return false
    } else if (!isStrongPassword(changePasswordForm.new1)) {
      setAlertMessage('Your new password is not strong enough.')
      return false
    } else {
      setAlertMessage(null)
      return true
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validatePassword()) {
      doPasswordChange({
        variables: {
          changePasswordInfo: {
            currentPassword: changePasswordForm.orig,
            newPassword: changePasswordForm.new1
          }
        }
      })
    }
  }

  const [doPasswordChange, { loading, error }] = useMutation(CHANGE_PASSWORD, {
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      if (data && data.changePassword) {
        if (data.changePassword.success === true) {
          setAlertMessage(data.changePassword.message)
          setChangePasswordDisabled(true)
        } else {
          setAlertMessage(data.changePassword.message)
        }
      } else {
        setAlertMessage('There was a problem processing your request.')
      }
    }
  })

  useEffect(() => {
    if (context.userInfo.role === 'AirlineEmployee' || context.userInfo.role === 'Impersonator') {
      setAlertMessage('This screen is intended for web customer users only.')
      setChangePasswordDisabled(true)
    }
  }, [])

  return (
    <div>
      {alertMessage && <ShowInfoAlert message={alertMessage} />}
      {error && error.networkError && <ShowErrorAlert message={JSON.stringify(error)} />}
      {error && !error.networkError && <ShowErrorAlert message="An error occurred" />}
      <div>
        <strong>Change your password</strong>
      </div>
      <DivContainer>

        <DivChild>
          <form onSubmit={handleSubmit}>
            <FormikStyleInput disabled={changePasswordDisabled} type="password" value={changePasswordForm.orig} name="orig" label="Current Password:" onChange={handleChangePasswordFormChange} />
            <FormikStyleInput disabled={changePasswordDisabled} type="password" value={changePasswordForm.new1} name="new1" label="New Password:" onChange={handleChangePasswordFormChange} onBlur={validatePassword} />
            <FormikStyleInput disabled={changePasswordDisabled} type="password" value={changePasswordForm.new2} name="new2" label="Confirm New Password:" onChange={handleChangePasswordFormChange} onBlur={validatePassword} />
            <DivRow>
              <ButtonRed disabled={changePasswordDisabled}>Change Password</ButtonRed>
            </DivRow>
          </form>
        </DivChild>
        <DivRow>
          <PasswordRequirements
            password={changePasswordForm.new1}
            confirmPassword={changePasswordForm.new2}
            isValidPassword={(isValid) => setPasswordIsValid(isValid)}
          />
        </DivRow>
      </DivContainer>
    </div>
  )
}

