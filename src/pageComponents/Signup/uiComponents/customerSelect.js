import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
  display: flex;
  background-image: url(https://www.airlinehyd.com/customer/aihyco/images/Home/CategoryBackground.jpg);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 200px;
  height: 200px;
  margin: 10px;
  border: 1px solid black;
  border-radius: 2px;
  p {
    font-family: Proxima;
    color: white;
    margin-top: 16px;
    margin-botton: 0;
    font-size: 20px;
  }
`

export default function CustomerSelectPage({selectCustomer}) {

	return(
		<SignupPageContainer>
			<Div onClick={()=>selectCustomer('existing')}>
				<FontAwesomeIcon icon="user" color="white" size="6x"/>
				<p>Existing Customer</p>
			</Div>
			<Div onClick={()=>selectCustomer('new')}>
				<FontAwesomeIcon icon="user-plus" color="white" size="6x"/>
				<p>New Customer</p>
			</Div>
		</SignupPageContainer>
	)
}