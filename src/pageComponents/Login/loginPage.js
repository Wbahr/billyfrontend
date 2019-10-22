import React from 'react'
import styled from 'styled-components'

const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 1200px;
  margin: 28px auto;
  justify-content: space-between;
  flex-grow: 99;
`

class LoginPage extends React.Component {

  render(){
    return(
      <LoginPageContainer>
        <p>Login</p>
      </LoginPageContainer>
    )
  }
}

export default LoginPage