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
import { updateAccountNotifications, updateMarketingNotifications } from '../../api-temp/apiCalls'

const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10px 10px 10px;
`

const DivInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
`

const PtagHeader = styled.p`
  font-family: verdana;
  font-weight: 400;
  font-size: 18px;
  line-height: 1.2;
  color: #666;
  margin: 0 0 8px 0;
`

const Label = styled.label`
  font-family: verdana;
  font-size: 16px;
  padding-left: 4px;
`

class AccountInfoTab extends React.Component {

  state = {
    invoiceReminders: false,
    ExpirationWarning: false,
    Expiration: false,
    Pickup: false,
    Shipment: false,
    hydTech: false,
    Automation: false,
    Safety: false
  }

  componentWillMount() {

  }

  changeInput = (e) => {
    let checkBox = {}
    let field = e.target.name
    checkBox[field] = !this.state[field]
    this.setState(checkBox)
  }

  handleAccountNotificationsSave = () => {
    const {
      invoiceReminders,
      ExpirationWarning,
      Expiration,
      Pickup,
      Shipment,
    } = this.state
    const data = {
      'invoiceReminders': invoiceReminders,
      'ExpirationWarning': ExpirationWarning,
      'Expiration': Expiration,
      'Pickup': Pickup,
      'Shipment': Shipment,
    }
    updateAccountNotifications(data)

  }

  handleMarketingNotificationsSave = () => {
    const {
      hydTech,
      Automation,
      Safety
    } = this.state
    const data = {
      'hydTech': hydTech,
      'Automation': Automation,
      'Safety': Safety
    }
    updateMarketingNotifications(data)
  }

  render(){
    const {
      invoiceReminders,
      ExpirationWarning,
      Expiration,
      Pickup,
      Shipment,
      hydTech,
      Automation,
      Safety
    } = this.state

    if (_.isNil('te')) {
      return (
        <Loader />
      )
    } else {
      return (
        <React.Fragment>
        <AccountSectionHeader
          text={`Manage Notifications`}
        />
          <DivContainer>
            <span><PtagHeader>Account Notifications</PtagHeader><button onClick={this.handleAccountNotificationsSave}>Save</button></span>
            <DivInputContainer>
              <span>
                <input type='checkbox' name='invoiceReminders' id='invoiceReminders' value={invoiceReminders} onChange={this.changeInput}/>
                <Label htmlFor='invoiceReminders'>Invoice Reminders</Label>
              </span>
              <span>
                <input type='checkbox' name='ExpirationWarning' id='ExpirationWarning' value={ExpirationWarning} onChange={this.changeInput}/>
                <Label htmlFor='ExpirationWarning'>Quote 24hr Expiration Alert</Label>
              </span>
              <span>
                <input type='checkbox' name='Expiration' id='Expiration' value={Expiration} onChange={this.changeInput}/>
                <Label htmlFor='Expiration'>Quote Expiration Alert</Label>
              </span>
              <span>
                <input type='checkbox' name='Pickup' id='Pickup' value={Pickup} onChange={this.changeInput}/>
                <Label htmlFor='Pickup'>Pickup Notifications</Label>
              </span>
              <span>
                <input type='checkbox' name='Shipment' id='Shipment' value={Shipment} onChange={this.changeInput}/>
                <Label htmlFor='Shipment'>Shipment Notifications</Label>
              </span>
            </DivInputContainer>
            <span><PtagHeader>Marketing Notifications</PtagHeader><button onClick={this.handleMarketingNotificationsSave}>Save</button></span>
            <DivInputContainer>
              <span>
                <input type='checkbox' name='hydTech' id='hydTech' value={hydTech} onChange={this.changeInput}/>
                <Label htmlFor='hydTech'>Hydraulic Tech Journal</Label>
              </span>
              <span>
                <input type='checkbox' name='Automation' id='Automation' value={Automation} onChange={this.changeInput}/>
                <Label htmlFor='Automation'>Automation Tech Journal</Label>
              </span>
              <span>
                <input type='checkbox' name='Safety' id='Safety' value={Safety} onChange={this.changeInput}/>
                <Label htmlFor='Safety'>Machine Safety Review</Label>
              </span>
            </DivInputContainer>
          </DivContainer>
        </React.Fragment>
      )
    }
  }
}

export default AccountInfoTab
