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
import { getCreditCardData, deleteCreditCard, addCreditCard} from '../../api-temp/apiCalls'

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

const creditCardDataR = [
  {
    'token': 'FOKSDF34N4FE82NFE9239FE',
    'last4': '3435',
    'type': 'visa',
    'exp': '12/23'
  },
  {
    'token': '9FD9FG9GS9FDS9FEWNH9D9',
    'last4': '5555',
    'type': 'master',
    'exp': '05/21'
  },
]

class AccountInfoTab extends React.Component {

  state = {
    creditCardData: {},
    addingCard: false
  }

  componentWillMount() {
    getCreditCardData().then(
      (response) => {
        if(response.ok) {
          this.setState({ creditCardData: response.json})
        }
      }
    )
  }

  addCard = () => {
    this.setState({addingCard: true})
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

  render(){
    const {
      creditCardData,
      addingCard
    } = this.state
    let SavedCards = _.map(creditCardDataR, (card) => {
      <div>
        <p>{card.type + ' ' + card.last4}</p>
        <p>{card.exp}</p>
      </div>
    })

    let AddNewCard = (
      <div onClick={this.addCard}>
        <p>Add a New Card</p>
      </div>
    )

    let NewCard = (
      <div>
        <Input
          label={'First Name'}
          placeholder={'Otto'}
        />
        <Input
          label={'Last Name'}
          placeholder={'Mechanic'}
        />
        <Input
          label={'Credit Card Number'}
          placeholder={'0000 0000 0000 0000'}
        />
        <Input
          label={'MM'}
          placeholder={'MM'}
        />
        <Input
          label={'YY'}
          placeholder={'YY'}
        />
        <Input
          label={'Security Code'}
          placeholder={'123'}
        />
      </div>
    )

    if (_.isNil(creditCardData)) {
      return (
        <Loader />
      )
    } else {
      return (
        <React.Fragment>
        <AccountSectionHeader
          text={`Manage Credit Cards`}
        />
          <DivContainer>
            <PtagHeader>Saved Credit Cards</PtagHeader>
            {creditCardData.length && SavedCards}
            {addingCard ? NewCard : AddNewCard}
          </DivContainer>
        </React.Fragment>
      )
    }
  }
}

export default AccountInfoTab
