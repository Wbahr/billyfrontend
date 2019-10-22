import React from 'react'
import styled from 'styled-components'

const SignupPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 1200px;
  margin: 28px auto;
  justify-content: space-between;
  flex-grow: 99;
`

class SignupPage extends React.Component {

  render(){
    return(
      <SignupPageContainer>
        <p>Signup Page</p>
      </SignupPageContainer>
    )
  }
}

export default SignupPage