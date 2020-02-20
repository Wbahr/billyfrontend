import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import _ from 'lodash'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag'
import ShippingScheduleLineDisplay from '../uiComponents/scheduleLineDisplay'

const SectionRow = styled.div`
  display: flew;
  justify-content: space-between;
`

const SectionContainer = styled.div`
  border: 1px solid whitesmoke;
  margin: 8px 0;
  padding: 8px 16px;
`

const SectionContainerHalf = styled(SectionContainer)`
  width: 49%;
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

  let CartDates = schedule.cartWithDates.map((item, index) => (
    <ShippingScheduleLineDisplay item={item} index={index}/>
  ))

  return(
    <>
      <SectionRow>
        <SectionContainerHalf>
          <SectionTitle>Ship To</SectionTitle>
          <SectionFields>
            <p>{shipto.contactNameFirst} {shipto.contactNameLast}</p>
            <p>{shipto.address1}</p>
            <p>{shipto.address2}</p>
            <p>{shipto.city}, {shipto.stateOrProvince} {shipto.zip} {shipto.country === 'us' ? 'US' : 'Canada'}</p>
            <p>Phone: {shipto.phone}</p>
            <p>Email: {shipto.email}</p>
            <p>Carrier Name: {shipto.carrierName}</p>
            <p>Is Collect? {shipto.isCollect === '0' ? 'No' : 'Yes'}</p>
            {shipto.isCollect === '0' && <p>Collect Number: {shipto.collectNumber}</p>}
          </SectionFields>
        </SectionContainerHalf>
        <SectionContainerHalf>
          <SectionTitle>Bill To</SectionTitle>
          <SectionFields>
            <p>{billing.firstName} {billing.lastName}</p>
            <p>{billing.address1}</p>
            <p>{billing.address2}</p>
            <p>{billing.city}, {billing.stateOrProvince} {billing.zip} {shipto.country === 'us' ? 'US' : 'Canada'}</p>
            <p>Phone: {billing.phone}</p>
            <p>Email: {billing.email}</p>
            <p>Payment Method: {billing.paymentMethod === 'purchase_order' ? 'Purchase Order' : 'Credit Card'}</p>
            {billing.paymentMethod === 'credit_card' && <p>Card Type: {billing.cardType === 'new_card' ? 'New Card' : 'Saved Card'}</p>}
            <p>Purchase Order: {billing.purchaseOrder}</p>
          </SectionFields>
        </SectionContainerHalf>
      </SectionRow>
      <SectionContainer>
        <SectionTitle>Shipping Schedule</SectionTitle>
        <SectionFields>
          <p>Packing Basis:{schedule.packingBasis}</p>
        </SectionFields>
      </SectionContainer>
      <SectionContainer>
        <SectionTitle>Items</SectionTitle>
        <SectionFields>
          {CartDates}
        </SectionFields>
      </SectionContainer>
    </>
  )
}
