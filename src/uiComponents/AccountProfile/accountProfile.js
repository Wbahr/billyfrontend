import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import AccountSectionHeader from '../_common/sectionHeader'
import 'react-table/react-table.css'
import { StyledText0, StyledText1 } from '../../styles/fonts'
import Loader from '../_common/loader'
import Input from '../_common/input'
import Button from '../_common/button'
import { getUserData, updatePassword, updateEmail } from '../../api-temp/apiCalls'

const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10px 10px 10px;
`

const DivContainerButton = styled.div`
  display: flex;
  justify-content: flex-end;
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
    editProfile: false,
  }

  componentWillMount() {
    getUserData().then(
      (response) => this.selectedOrderMutator(response)
    ).then(
      (mutatedResponse) => {this.setState({ selectedOrder: mutatedResponse })}
    )
  }

  toggleEdit = () => {
    const {
      editProfile
    } = this.state

    if(editProfile){
      this.saveProfile()
    }
    this.setState({ editProfile: !editProfile })
  }

  cancelEdit = () => {

  }

  changeInput = (e) => {
    const inputValue = e.target.value
    this.setState({ password:inputValue })
  }

  saveProfile = () => {
    const {
      newPassword,
      oldPassword,
      confirmPassword,
      oldEmail,
      newEmail
    } = this.state

    if(newPassword === confirmPassword) {
      const changePasswordData = {
        'ConfirmPassword': confirmPassword,
        'NewPassword': newPassword,
        'OldPassword': oldPassword
      }
      updatePassword(changePasswordData)
    }
    if(oldEmail !== newEmail){
      const changeEmailData = {
        'NewEmail': newEmail,
        'OldEmail': oldEmail
      }
      updateEmail(changeEmailData)
    }

  }

  render(){
    const {
  //  userData,
      editProfile
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
            <PtagHeader>Personal Information</PtagHeader>
              <DivInputContainer>
                <Input label='Name' value={userData.name} />
                <Input  label='Contact Email' disabled={!editProfile} id='email' value={this.state.email} onChange={this.changeInput}/>
              </DivInputContainer>
            <PtagHeader>Account Information</PtagHeader>
              <DivInputContainer>
                <Input label='Username' value={userData.username} />
                <Input label='Password' value={this.state.password} />
                {/*<input disabled={!editProfile} id='password' type='password' value={this.state.password} onChange={this.changeInput}/>*/}
                <Input label='Customer ID' value={userData.customerID} />
                <Input label='Minimum Purchase' value={userData.minPurchase}/>
              </DivInputContainer>
          </DivContainer>
          <DivContainerButton>
            {editProfile && <Button text='Clear Changes' onClick={this.cancelEdit} />}
            <Button text={ editProfile ? 'Save Changes' : 'Edit Profile' } onClick={this.toggleEdit} />
          </DivContainerButton>
        </React.Fragment>
      )
    }
  }
}

export default AccountProfile
