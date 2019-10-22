import React, {useEffect} from 'react'
import styled from 'styled-components'

const SignupPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  max-width: 1200px;
  margin: 28px auto;
  flex-grow: 99;
`

const DivInput = styled.div`
  display: flex;
  flex-direction: column;
`
export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
  },[email, password])

  function handleSignin(){
    console.log('signing in')
  }

  function setToken() {
    console.log('setting token')
  }

  function handleForgotPassword(){
    console.log('forgot password')
  }

  return(
    <SignupPageContainer>
      <p>Logo</p>
      <p>Login</p>
      <DivInput>
        <label for='email'>Email Address</label>
        <input id='email' onChange={(e)=>setEmail(e.target.value)} value={email}/>
      </DivInput>
      <DivInput>
        <label for='password'>Password</label>
        <input id='password' type='password' onChange={(e)=>setPassword(e.target.value)} value={password}/>
      </DivInput>
      <a onClick={()=>handleForgotPassword()}>Forgot your Password?</a>
      <a onClick={()=>handleForgotPassword()}>Don't have an Account? Create one here</a>
      <button onClick={()=>handleSignin()}>Sign In</button>
    </SignupPageContainer>
  )
}