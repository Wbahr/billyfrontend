import React, { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  width: 40px;
  padding-right: 2px;
  border-radius: 0 30px 30px 0;
  // background-color: #007bff;;
  background-image: linear-gradient(to top left,#950f23,#DB1633);
`
const Input = styled.input`
  width: 225px;
  height: 25px;
  border: none;
  background-color: white;
  font-size: 11px;
  margin-left: 20px;
  padding: 4px 16px;
  border-radius: 30px 0 0 30px;
`

export default function ImpersonationSearchComponent(props) {
  const [impersonationTerm, setImpersonationTerm] = useState('')

  return(
    <>
    <Input placeholder="Search by Customer Name or #" value={impersonationTerm} onChange={e=>{setImpersonationTerm(e.target.value)}}></Input>
    <Div>
      <FontAwesomeIcon icon="user-circle" color="whitesmoke"/>
    </Div>
    </>
  )
}