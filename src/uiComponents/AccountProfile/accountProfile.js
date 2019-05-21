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
      default:
    }

  }

  toggleEmail = () => {
    const {
      editingEmail,
      email,
      oldEmail
    } = this.state

    if (editingEmail) {
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

    this.setState({ editingPassword: !editingPassword})
  }

  savePassword = () => {
    const {
      password,
      confirmPassword,
      oldPassword
    } = this.state

    let validationErrors = this.validatePassword(password, confirmPassword)
    if(validationErrors.length === 0){
      const changePasswordData = {
        'ConfirmPassword': confirmPassword,
        'NewPassword': password,
        'OldPassword': oldPassword
      }
      // updatePassword(changePasswordData)
      this.setState({passwordError: '', editingPassword: false})
    } else {
      this.setState({passwordError: validationErrors})
    }
  }

  validatePassword = (password, confirmPassword) => {
    console.log('passwords', password, confirmPassword)
    if (password !== confirmPassword) {
      return 'Passwords do no match'
    } else if (password.length < 8) {
      return 'Passwords must be at least 8 characters'
    } else {
      return ''
    }
  }


  render(){
    const {
      editingEmail,
      editingPassword,
      passwordError,
      email,
      password,
      confirmPassword
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
                  <DisplayInput label='Password Hint' value={'model of first car'} /><P onClick={this.toggleUpdatePassword}>{editingPassword ? 'Cancel' : 'Change Password'}</P>
                </DivRow>
                {editingPassword &&
                  <DivNewPasswordContainer>
                    <Input  label='New Password' type='password' value={password} onChange={this.changeInput}/>
                    <Input  label='Confirm New Password' type='password' value={confirmPassword} onChange={this.changeInput}/>
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
