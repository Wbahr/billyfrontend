import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import _ from 'lodash'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag'
import ShippingScheduleLineDisplay from '../uiComponents/scheduleLineDisplay'
import { packingBasis } from '../helpers/checkoutDropdownData'

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

const DivAddressSection = styled.div`
  margin-bottom: 10px;
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
    line-height: 18px;
  }
`

const Pbold = styled.p`
  font-size: 16px;
  font-weight: 600;
  line-height: 15px;
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
    checkoutDropdownDataLabels
  } = props

  let CartDates = schedule.cartWithDates.map((item, index) => (
    <ShippingScheduleLineDisplay item={item} index={index}/>
  ))

  let packingBasisIndex = packingBasis.findIndex(elem => elem.value === schedule.packingBasis)
  let packingBasisName = packingBasis[packingBasisIndex].label

  let carrierNameIndex = checkoutDropdownDataLabels.carriers.findIndex(elem => elem.value === shipto.carrierName)
  let carrierName = checkoutDropdownDataLabels.carriers[carrierNameIndex].label

  return(
    <>
      <SectionRow>
        <SectionContainerHalf>
          <SectionTitle>Ship To</SectionTitle>
          <SectionFields>
            <DivAddressSection>
              <Pbold>{shipto.contactNameFirst} {shipto.contactNameLast}</Pbold>
              <Pbold>{shipto.address1}</Pbold>
              <Pbold>{shipto.address2}</Pbold>
              <Pbold>{shipto.city}, {shipto.stateOrProvince} {shipto.zip} {shipto.country === 'us' ? 'USA' : 'Canada'}</Pbold>
            </DivAddressSection>
            <p>{shipto.phone}</p>
            <p>{shipto.email}</p>
            <p>Carrier: {carrierName}</p>
            <p>Is Collect? {shipto.isCollect === '0' ? 'No' : 'Yes'}</p>
            {shipto.isCollect === '1' && <p>Collect Number: {shipto.collectNumber}</p>}
          </SectionFields>
        </SectionContainerHalf>
        <SectionContainerHalf>
          <SectionTitle>Bill To</SectionTitle>
          <SectionFields>
            <DivAddressSection>
              <Pbold>{billing.firstName} {billing.lastName}</Pbold>
              <Pbold>{billing.address1}</Pbold>
              <Pbold>{billing.address2}</Pbold>
              <Pbold>{billing.city}, {billing.stateOrProvince} {billing.zip} {shipto.country === 'us' ? 'USA' : 'Canada'}</Pbold>
            </DivAddressSection>
            <p>{billing.phone}</p>
            <p>{billing.email}</p>
            <p>Payment Method: {billing.paymentMethod === 'purchase_order' ? 'Purchase Order' : 'Credit Card'}</p>
            {billing.paymentMethod === 'credit_card' && <p>Card Type: {billing.cardType === 'new_card' ? 'New Card' : 'Saved Card'}</p>}
            <p>Purchase Order: {billing.purchaseOrder}</p>
          </SectionFields>
        </SectionContainerHalf>
      </SectionRow>
      <SectionContainer>
        <SectionTitle>Shipping Schedule</SectionTitle>
        <SectionFields>
          <p>Packing Basis: {packingBasisName}</p>
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
