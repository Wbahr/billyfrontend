import React, {useEffect, useState} from 'react'
import styled from 'styled-components'

const SignupPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 350px;
  margin: 28px auto;
  flex-grow: 99;
`

const Div = styled.div`
  cursor: pointer;
  width: 200px;
  height: 200px;
  background-color: black;
  margin: 10px;
`

export default function CustomerSelectPage({selectCustomer}) {

  return(
    <SignupPageContainer>
      <Div onClick={()=>selectCustomer('existing')}>
        <p>Existing Customer</p>
      </Div>
      <Div onClick={()=>selectCustomer('new')}>
        <p>New Customer</p>
      </Div>
    </SignupPageContainer>
  )
}