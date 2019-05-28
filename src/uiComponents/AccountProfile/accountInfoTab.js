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
  background-color: #f9f9ff;
  border: 2px #007aff solid;
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
  'minPurchase': 'No Minimum',
  'passwordHint': 'model of first car'
}

class AccountInfoTab extends React.Component {

  state = {
    email: userData.email,
    passwordError: '',
    editingEmail: false,
    editingPassword: false,
    hint: userData.passwordHint,
    newhint: userData.passwordHint

  }

  componentWillMount() {
    getUserData().then(
      (response) => this.selectedOrderMutator(response)
    ).then(
      (mutatedResponse) => {this.setState({ selectedOrder: mutatedResponse })}
    )
  }

  changeInput = (e) => {
    let name =  e.target.name
    switch(name){
      case('Username / Contact Email'):
        this.setState({ email: e.target.value })
        break
      case('New Password'):
        this.setState({ password: e.target.value })
        break
      case('Confirm New Password'):
        this.setState({ confirmPassword: e.target.value })
        break
      case('Password Hint'):
        this.setState({ newhint: e.target.value })
        break
      default:
    }
  }

  toggleEmail = () => {
    const {
      editingEmail,
      email,
      oldEmail
    } = this.state

    let emailValid = this.validateEmail(email)
    if (editingEmail && emailValid) {
      const changeEmailData = {
        'NewEmail': email,
        'OldEmail': oldEmail
      }
      // updateEmail(changeEmailData)
    }
    this.setState({ editingEmail: !editingEmail, email: email})
  }

  toggleUpdatePassword = () => {
    const {
      editingPassword,
    } = this.state

    if (editingPassword) {
      this.setState({ password: '', confirmPassword: ''})
    }
    this.setState({ editingPassword: !editingPassword})
  }

  savePassword = () => {
    const {
      password,
      confirmPassword,
      newhint
    } = this.state

    let validationErrors = this.validatePassword(password, confirmPassword, newhint)
    console.log('errors', validationErrors)
    if(validationErrors.length === 0){
      // const changePasswordData = {
      //   'ConfirmPassword': confirmPassword,
      //   'NewPassword': password,
      //   'PasswordHint': newhint
      // }
      // updatePassword(changePasswordData)
      this.setState({passwordError: '', password: '', confirmPassword: '', editingPassword: false, hint: newhint})
    } else {
      this.setState({passwordError: validationErrors})
    }
  }

  validatePassword = (password, confirmPassword, hint) => {
    if (password !== confirmPassword) {
      return 'Passwords do no match'
    } else if (!_.isNil(password) && password.length < 8) {
      return 'Passwords must be at least 8 characters'
    } else if (password.length < 8) {
      return 'Passwords must be at least 8 characters'
    } else if (hint.length > 24) {
      return 'Hint must be less than 25 characters'
    }
    else {
      return ''
    }
  }

  validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }


  render(){
    const {
      editingEmail,
      editingPassword,
      passwordError,
      email,
      password,
      confirmPassword,
      hint,
      newhint
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
                    <Input  label='Username / Contact Email' id='email' value={email} onChange={this.changeInput}/>
                    : <DisplayInput label='Username / Contact Email' value={email} />}
                  <P onClick={this.toggleEmail}>{editingEmail ? 'Save' : 'Edit'}</P>
                </DivRow>
                <DivRow>
                  <DisplayInput label='Password Hint' value={hint} /><P onClick={this.toggleUpdatePassword}>{editingPassword ? 'Cancel' : 'Change Password'}</P>
                </DivRow>
                {editingPassword &&
                  <DivNewPasswordContainer>
                    <Input  label='New Password' type='password' value={password} onChange={this.changeInput}/>
                    <Input  label='Confirm New Password' type='password' value={confirmPassword} onChange={this.changeInput}/>
                    <Input  label='Password Hint' value={newhint} onChange={this.changeInput}/>
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

export default AccountInfoTab
