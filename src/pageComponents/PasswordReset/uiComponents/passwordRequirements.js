import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px auto;
`
const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`

const P = styled.p`
  font-size: 14px;
  color: grey;
  margin: 0;
  margin-left: 4px;
`
export default function PasswordRequirements({password, confirmPassword, isValidPassword}) {
  const [validLength, setValidLength] = useState(false)
  const [validAlphaNum, setValidAlphaNum] = useState(false)
  const [validSymbols, setValidSymbols] = useState(false)
  const [validMatch, setValidMatch] = useState(false)

  useEffect(() => {
    // Must be 8 or more characters long
    if(password.length > 7){
      setValidLength(true)
    } else {
      setValidLength(false)
    }
    // Must contain both letters and numbers
    if (/\d/.test(password) && /[a-zA-Z]/.test(password)) {
      setValidAlphaNum(true)
    } else {
      setValidAlphaNum(false)
    }
    // Must contain one or more symbol
    if (/[ !@#$%^&*? ]/.test(password)) {
      setValidSymbols(true)
    } else {
      setValidSymbols(false)
    }
    // Password and Confirm Password must match
    if ( validLength && (password === confirmPassword)) {
      setValidMatch(true)
    } else {
      setValidMatch(false)
    }
    if (validLength && validAlphaNum && validSymbols && validMatch){
      isValidPassword(true)
    } else {
      isValidPassword(false)
    }
  })

  return(
    <Container>
      <Row>{validLength ? <FontAwesomeIcon icon={faCheckCircle} color="#007bff"/> : <FontAwesomeIcon icon={faTimesCircle} color="#950f23"/>}<P>Must be 8 or more characters long</P></Row>
      <Row>{validAlphaNum ? <FontAwesomeIcon icon={faCheckCircle} color="#007bff"/> : <FontAwesomeIcon icon={faTimesCircle} color="#950f23"/>}<P>Must contain both letters and numbers</P></Row>
      <Row>{validSymbols ? <FontAwesomeIcon icon={faCheckCircle} color="#007bff"/> : <FontAwesomeIcon icon={faTimesCircle} color="#950f23"/>}<P>Must contain one or more symbol (!@#$%^&*?)</P></Row>
      <Row>{validMatch ? <FontAwesomeIcon icon={faCheckCircle} color="#007bff"/> : <FontAwesomeIcon icon={faTimesCircle} color="#950f23"/>}<P>Password and Confirm Password must match</P></Row>
    </Container>
  )
}