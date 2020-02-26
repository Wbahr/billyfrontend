import React, { useState, useEffect, useRef } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

const DivConfirmationBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  margin: auto;
`

export default function OrderCompletePage(props) {
  let { orderId } = useParams()

  return(
    <>
      <DivConfirmationBox>
        <p>Order Number ({orderId}) Confirmed</p>
        <p>We'll be sending out a confirmation email to test@email.com shortly.</p> 
      </DivConfirmationBox>
    </>
  )
}