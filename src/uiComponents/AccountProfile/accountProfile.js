import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import AccountSectionHeader from '../_common/sectionHeader'
import 'react-table/react-table.css'
import { StyledText0, StyledText1 } from '../../styles/fonts'
import Loader from '../_common/loader'
import Input from '../_common/input'
import DisplayInput from '../_common/displayInput'
import Button from '../_common/button'
import { getUserData, updatePassword, updateEmail } from '../../api-temp/apiCalls'

const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10px 10px 10px;
`

const DivRow = styled.div`
  display: flex;
  align-items: flex-end;
`

const PtagHeader = styled.p`
  font-family: verdana;
  font-weight: 400;
  font-size: 18px;
  line-height: 1.2;
  color: #666;
  margin: 0 0 8px 0;
`

const DivInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
`

const DivNewPasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #cce5ff;
  border: 1px #b8daff solid;
  border-radius: 3px;
  align-items: center;
  padding: 8px 0;
  margin: 0 0 8px 0;
  width: 50%;
`

const DivPasswordAction = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 20px;
  margin-right: 40px;
`

const P = styled.p`
  cursor: pointer;
  font-family: verdana;
  color: darkblue;
  font-size: 14px;
  text-decoration: underline;
  margin-left: 4px;
`

const DivError = styled.div`
  border: 1px #f5c6cb solid;
  background-color: #f8d7da;
  color: #721c24;
`

const userData = {
  'username': 'bpanczer@airlinehyd.com',
  'password': 'Efewsffosd',
  'name': 'Bobby Panczer',
  'email': 'bpanczer@airlinehyd.com',
  'customerID': '523523',
  'minPurchase': 'No Minimum'
}

class AccountProfile extends React.Component {

  state = {
    passwordError: '',
    editingEmail: false,
    editingPassword: false
  }

  componentWillMount() {
    getUserData().then(
      (response) => this.selectedOrderMutator(response)
    ).then(
      (mutatedResponse) => {this.setState({ selectedOrder: mutatedResponse })}
    )
  }

  changeInput = (e) => {
    const inputValue = e.target.value
    this.setState({ password:inputValue })
  }

  toggleEmail = () => {
    const {
      editingEmail,
      newEmail,
      oldEmail
    } = this.state

    if (editingEmail) {
      const changeEmailData = {
        'NewEmail': newEmail,
        'OldEmail': oldEmail
      }
      updateEmail(changeEmailData)
    }
    this.setState({ editingEmail: !editingEmail})
  }

  toggleUpdatePassword = () => {
    const {
      editingPassword,
    } = this.state

    this.setState({ editingPassword: !editingPassword})
  }

  savePassword = () => {
    const {
      confirmPassword,
      newPassword,
      oldPassword
    } = this.state

    let validationErrors = this.validatePassword(newPassword, confirmPassword)
    if(validationErrors.length === 0){
      const changePasswordData = {
        'ConfirmPassword': confirmPassword,
        'NewPassword': newPassword,
        'OldPassword': oldPassword
      }
      // updatePassword(changePasswordData)
    } else {
      this.setState({passwordError: validationErrors})
    }
  }

  validatePassword = (newPassword, confirmPassword) => {
    if (newPassword !== confirmPassword) {
      return 'Passwords do no match'
    }
    if (newPassword.length < 8) {
      return 'Passwords must be at least 8 characters'
    }
    return ''
  }


  render(){
    const {
      editingEmail,
      editingPassword,
      passwordError,
    } = this.state

    if (_.isNil(userData)) {
      return (
        <Loader />
      )
    } else {
      return (
        <React.Fragment>
          <AccountSectionHeader
            text={`My Account Profile`}
          />
          <DivContainer>
            <PtagHeader>Account Information</PtagHeader>
              <DivInputContainer>
                <DisplayInput label='Account Holder Name' value={userData.name} />
                <DivRow>
                  { editingEmail ?
                    <Input  label='Username / Contact Email' id='email' value={userData.username} onChange={this.changeInput}/>
                    : <DisplayInput label='Username / Contact Email' value={userData.username} />}
                  <P onClick={this.toggleEmail}>{editingEmail ? 'Save' : 'Edit'}</P>
                </DivRow>
                <DivRow>
                  <DisplayInput label='Password Hint' value={'model of first car'} /><P onClick={this.toggleUpdatePassword}>{editingPassword ? 'Cancel' : 'Change Password'}</P>
                </DivRow>
                {editingPassword &&
                  <DivNewPasswordContainer>
                    <Input  label='New Password' id='new_password' value={userData.username} onChange={this.changeInput}/>
                    <Input  label='Confirm New Password' id='confirm_new_password' value={userData.username} onChange={this.changeInput}/>
                    <DivPasswordAction>
                      <DivError>{passwordError}</DivError>
                      <P onClick={this.savePassword}>Save</P>
                    </DivPasswordAction>
                  </DivNewPasswordContainer>
                }
                <DisplayInput label='Customer ID' value={userData.customerID} />
              </DivInputContainer>
          </DivContainer>
        </React.Fragment>
      )
    }
  }
}

export default AccountProfile
