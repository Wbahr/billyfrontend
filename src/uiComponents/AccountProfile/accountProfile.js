import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import AccountSectionHeader from '../_common/sectionHeader'
import 'react-table/react-table.css'
import { StyledText0, StyledText1 } from '../../styles/fonts'
import Loader from '../_common/loader'
import Input from '../_common/input'
import Button from '../_common/button'
import { getInvoice, updatePassword, updateEmail } from '../../api-temp/apiCalls'

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
  font-size: 16px;
  color: darkblue;
  margin: 0;
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
    // userData: null
    editProfile: false,
    password: userData.password, //BAD! Remove - did this for testing
    email: userData.password, //BAD! Remove - did this for testing
  }

  componentWillMount() {
    // const location = queryString.parse(location.search)
    // let invoice = _.get(location, 'invoice', '12209770')
    getInvoice('12209770').then(
      (response) => this.selectedOrderMutator(response)
    ).then(
      (mutatedResponse) => {this.setState({ selectedOrder: mutatedResponse }, ()=> console.log('selected order', this.state.selectedOrder))}
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
              <DivInputContainer><StyledText0>Name: </StyledText0><Input value={userData.name} /></DivInputContainer>
              <DivInputContainer><StyledText0>Contact Email: </StyledText0><Input  disabled={!editProfile} id='email' value={this.state.email} onChange={this.changeInput}/></DivInputContainer>
            <PtagHeader>Account Information</PtagHeader>
              <DivInputContainer><StyledText0>Username: </StyledText0><Input value={userData.username} /></DivInputContainer>
              <DivInputContainer><StyledText0>Password: </StyledText0><input disabled={!editProfile} id='password' type='password' value={this.state.password} onChange={this.changeInput}/></DivInputContainer>
              <DivInputContainer><StyledText0>Customer ID: </StyledText0><Input value={userData.customerID} /></DivInputContainer>
              <DivInputContainer><StyledText0>Minimum Purchase: </StyledText0><Input value={userData.minPurchase}/></DivInputContainer>
          </DivContainer>
          <DivContainerButton>
            {editProfile && <Button text='Clear Changes' onClick={this.setProfile} />}
            <Button text={ editProfile ? 'Save Changes' : 'Edit Profile' } onClick={this.toggleEdit} />
          </DivContainerButton>
        </React.Fragment>
      )
    }
  }
}

export default AccountProfile
