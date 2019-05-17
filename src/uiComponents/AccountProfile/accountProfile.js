import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import AccountSectionHeader from '../_common/sectionHeader'
import 'react-table/react-table.css'
import { StyledText0, StyledText1 } from '../../styles/fonts'
import Loader from '../_common/loader'
import Input from '../_common/input'
import Button from '../_common/button'
import { getInvoice } from '../../api-temp/apiCalls'

const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10px 10px 10px;
`

const PtagHeader = styled.p`
  font-family: verdana;
  font-size: 16px;
  margin: 0;
`

const DivInputContainer = styled.div`
  display: flex;
  flex-direction: column;
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
    this.setState({ editProfile: !this.state.editProfile })
  }

  setProfile = () => {

  }

  changeInput = (e) => {
    const inputValue = e.target.value
    this.setState({ password:inputValue })
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
              <DivInputContainer><StyledText1>Name: </StyledText1><Input value={userData.name} /></DivInputContainer>
              <DivInputContainer><StyledText1>Contact Email: </StyledText1><Input  disabled={!editProfile} id='email' value={this.state.email} onChange={this.changeInput}/></DivInputContainer>
            <PtagHeader>Account Information</PtagHeader>
              <DivInputContainer><StyledText1>Username: </StyledText1><Input value={userData.username} /></DivInputContainer>
              <DivInputContainer><StyledText1>Password: </StyledText1><input disabled={!editProfile} id='password' type='password' value={this.state.password} onChange={this.changeInput}/></DivInputContainer>
              <DivInputContainer><StyledText1>Customer ID: </StyledText1><Input value={userData.customerID} /></DivInputContainer>
              <DivInputContainer><StyledText1>Minimum Purchase: </StyledText1><Input value={userData.minPurchase}/></DivInputContainer>
          </DivContainer>
          <Button text={ editProfile ? 'Save Changes' : 'Edit Profile' } onClick={this.toggleEdit} />
          <Button text='Clear Changes' onClick={this.setProfile} />
        </React.Fragment>
      )
    }
  }
}

export default AccountProfile
