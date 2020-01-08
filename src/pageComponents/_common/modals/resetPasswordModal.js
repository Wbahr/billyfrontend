import React, {useState, useRef} from 'react'
import _ from 'lodash'
import Popup from 'reactjs-popup'
import styled from 'styled-components'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const QUERY_STOCK_AVAILABILITY = gql`
  mutation CheeseQuery($testvariable: PasswordResetRequestInputGraphType){
    requestPasswordReset(passwordResetRequest:$testvariable){
      message
      success
    }
  }
`

export default function SplitLineModal({open, index, hideSplitLineModal}) {
  const [email, setEmail] = useState('')

  function handleClose(){
    hideSplitLineModal()
    setLineCount(1)
    setLineQuantity(1)
  }

  function handleResetPassword(){

  }
  
  return(
    <Popup open={open} onClose={()=>handleClose()} closeOnDocumentClick>
      <p>Reset Password</p>
      <p>Email: </p><input value={email} onChange={(e)=> setEmail(e.target.value)}/>
      <button onClick={()=>{handleResetPassword()}}>Reset Password</button>
    </Popup>
  )
}