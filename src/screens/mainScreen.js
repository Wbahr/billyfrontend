import React from 'react'
import styled from 'styled-components'
import Button from '../common/components/button'
// import DatePicker from 'react-datepicker'

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding 0;
  background-color: grey;
`

const AccountContainer = styled.div`
  width: 744px;
  height: 647px;
  background-color: white;
`
class MainScreen extends React.Component {
  render(){
    return(
      <Background>
        <AccountContainer>
          This is a test of styled components
          <Button
            text={"Process Request"}
          />
        </AccountContainer>
      </Background>
    )
  }
}

export default MainScreen
