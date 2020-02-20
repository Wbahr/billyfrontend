import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import _ from 'lodash'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag'

const SectionContainer = styled.div`
  border: 1px solid whitesmoke;
  margin: 8px 0;
  padding: 8px 16px;
`

const SectionTitle = styled.p`
  margin: 0;
  margin-bottom: 4px;
  font-size: 16px;
  font-weight: 500;
`
const SectionFields = styled.div`
  padding-left: 20px;
  p {
    margin: 0;
    margin-bottom: 2px;
    font-size: 14px;
  }
`

const LineItem = styled.div`
  display: flex;
  background-color: whitesmoke;
  p {
    margin: 0 4px;
    padding: 4px 2px;
  }
`

export default function ConfirmationScreen(props) {
  const {
    values:{
      schedule,
      shipto,
      billing
    },
  } = props
  let CartDates = schedule.cart_with_dates.map((elem)=>{
    let datestring = elem.requestedShipDate.getMonth() + '/' + elem.requestedShipDate.getDate() + '/' + elem.requestedShipDate.getFullYear()
    return(
      <LineItem>
        <p>Frecno: {elem.frecno}</p>
        <p>Qty: {elem.quantity}</p>
        <p>Requested Date: {datestring}</p>
      </LineItem>
    )
  })
  return(
    <>
      <SectionContainer>
        <SectionTitle>Shipping Schedule</SectionTitle>
        <SectionFields>
          <p>Packing Basis:{schedule.packing_basis}</p>
          {(schedule.cart_with_dates.length > 0 && schedule.packing_basis === 4) && <p>Items</p>}
          {(schedule.cart_with_dates.length > 0 && schedule.packing_basis === 4) && CartDates}
        </SectionFields>
      </SectionContainer>
      <SectionContainer>
        <SectionTitle>Ship To</SectionTitle>
        <SectionFields>
          <p>Contact First Name:{shipto.contact_name_first}</p>
          <p>Contact Last Name:{shipto.contact_name_last}</p>
          <p>Address 1:{shipto.address1}</p>
          <p>Address 2:{shipto.address2}</p>
          <p>City:{shipto.city}</p>
          <p>State/Province:{shipto.state_or_province}</p>
          <p>Zip:{shipto.zip}</p>
          <p>Country:{shipto.country}</p>
          <p>Phone:{shipto.phone}</p>
          <p>Email:{shipto.email}</p>
          <p>Carrier Name:{shipto.carrier_name}</p>
          <p>Is Collect? {shipto.is_collect === '0' ? 'No' : 'Yes'}</p>
          {shipto.is_collect === '0' && <p>{shipto.collect_number}</p>}
        </SectionFields>
      </SectionContainer>
      <SectionContainer>
        <SectionTitle>Bill To</SectionTitle>
        <SectionFields>
          <p>Payment Method:{billing.payment_method}</p>
          <p>Purchase Order:{billing.purchase_order}</p>
          <p>First Name:{billing.first_name}</p>
          <p>Last Name:{billing.last_name}</p>
          <p>Address 1:{billing.address1}</p>
          <p>Address 2:{billing.address2}</p>
          <p>City:{billing.city}</p>
          <p>State/Province:{billing.state_or_province}</p>
          <p>Zip:{billing.zip}</p>
          <p>Country:{billing.country}</p>
          <p>Phone:{billing.phone}</p>
          <p>Email:{billing.email}</p>
          {billing.payment_method === 'credit_card' && <p>Card Type:{billing.card_type === 'new_card' ? 'New Card' : 'Saved Card'}</p>}
        </SectionFields>
      </SectionContainer>
    </>
  )
}
