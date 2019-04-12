import React from 'react'
import styled from 'styled-components'
import AccountSectionHeader from '../uiComponents/RMA/accountSectionHeader'
// import Button from '../common/components/button'
// import DatePicker from 'react-datepicker'

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding 0;
  background-color: grey;
`

const AccountContainer = styled.div`
  width: 744px;
  height: 75vh;
  background-color: white;
  padding: 10px;
`
class MainScreen extends React.Component {
  // state = {
  //   startDate: new Date()
  // }

  // handleChange = () => {
  //   const {
  //     startDate
  //   } = this.state
  //
  //   console.log({startDate})
  // }
  render(){
    return(
      <Background>
        <AccountContainer>
          <AccountSectionHeader />
        </AccountContainer>
      </Background>
    )
  }
}

export default MainScreen
