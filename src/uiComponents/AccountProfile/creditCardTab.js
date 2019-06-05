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

const PtagHeader = styled.p`
  font-family: verdana;
  font-weight: 400;
  font-size: 18px;
  line-height: 1.2;
  color: #666;
  margin: 0 0 8px 0;
`

const DivSavedCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px grey solid;
  border-radius: 2px;
  width 320px;
  height: 50px;
  padding: 10px;
  margin-bottom: 8px;
  :hover {
    box-shadow: 0 0 2px grey;
  }
  p {
    font-family: verdana;
    margin: 0;
  }
`

const DivAddNewCard = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: #f9f9ff;
  border: 2px #007aff solid;
  border-radius: 2px;
  width 320px;
  height: 50px;
  padding: 10px;
  :hover {
    box-shadow: 0 0 5px #3887FF;
  }
  p {
    font-family: verdana;
    margin: 0;
  }
`

const DivNewCardButtons = styled.div`
  display: flex;
`


const creditCardDataR = [
  {
    'token': 'FOKSDF34N4FE82NFE9239FE',
    'last4': '3435',
    'type': 'Visa',
    'exp': '12/23'
  },
  {
    'token': '9FD9FG9GS9FDS9FEWNH9D9',
    'last4': '5555',
    'type': 'Master',
    'exp': '05/21'
  }
  // }
]

class AccountInfoTab extends React.Component {

  state = {
    creditCardData: {},
    addingCard: false
  }

  // componentWillMount() {
  //   getCreditCardData().then(
  //     (response) => {
  //       if(response.ok) {
  //         this.setState({ creditCardData: response.json})
  //       }
  //     }
  //   )
  // }

  addCard = () => {
    this.setState({addingCard: true})
  }

  removeCard = (removeCard) => {
    let removeToken = creditCardDataR[removeCard].token
    // deleteCreditCard(removeToken).then((response) => (
    //   getCreditCardData().then((response) => (
    //     if (response.ok) {
    //       this.setState(creditCardData: response.json)
    //     }
    //   ))
    //   )
    // )
  }

  cancelNewCard = () => {
    this.setState({addingCard: false})
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

  render() {
    const {
      creditCardData,
      addingCard
    } = this.state
    let SavedCards = _.map(creditCardDataR, (card, index) => (
      <DivSavedCard>
        <p>{card.type + '-' + card.last4}</p>
        <p>{card.exp}</p>
        <p onClick={()=>{this.removeCard(index)}}>Remove</p>
      </DivSavedCard>
    ))


    let AddNewCard = (
      <DivAddNewCard onClick={this.addCard}>
        <p>+ Add a New Card</p>
      </DivAddNewCard>
    )

    console.log('creditCardDataR',creditCardDataR)
    console.log('Saved Cards', SavedCards)

    let NewCard = (
      <>
          <Input
            label={'Full Name on Card'}
            placeholder={'Otto Smith'}
          />
          <Input
            label={'Credit Card Number'}
            placeholder={'0000 0000 0000 0000'}
          />
          <Input
            label={'Expiration Date'}
            placeholder={'MM'}
          />
          <Input
            placeholder={'YY'}
          />
        <DivNewCardButtons><p onClick={this.cancelNewCard}>Close</p><p>Save</p></DivNewCardButtons>
      </>
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
            <PtagHeader>{addingCard ? 'Add a New Card' : 'Saved Credit Cards'}</PtagHeader>
            {(creditCardDataR.length > 0 && !addingCard) && SavedCards}
            {(creditCardDataR.length === 0) && <p>You have no Saved Credit Cards</p>}
            {addingCard ? NewCard : AddNewCard}
          </DivContainer>
        </React.Fragment>
      )
    }
  }
}

export default AccountInfoTab
