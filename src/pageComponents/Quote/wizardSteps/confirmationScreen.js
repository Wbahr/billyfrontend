import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import ShippingScheduleLineDisplay from '../uiComponents/scheduleLineDisplay'
import { packingBasis } from '../helpers/quoteDropdownData'
import FormikFieldArray from '../../_common/formik/fieldArray'
import FormikCheckbox from '../../_common/formik/checkBox'
import Context from '../../../config/context'

const SectionRow = styled.div`
  display: flew;
  justify-content: space-between;
`

const SectionContainer = styled.div`
  border: 1px solid whitesmoke;
  margin: 8px 0;
  padding: 8px 16px;
`

const SectionContainerBlue = styled(SectionContainer)`
  background-color: #e7f2ff;
`

const DivAddressSection = styled.div`
  margin-bottom: 10px;
  p {
    font-size: 16px;
  }
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

const P = styled.p`
  font-size: 14px;
  font-weight: 600;
  margin-right: 6px !important;
`

const Pbold = styled.p`
  font-size: 16px;
  font-weight: 600;
  line-height: 15px;
`

const DivTextRow = styled.div`
  display: flex;
`

export default function ConfirmationScreen(props) {
  const {
    values:{
      schedule,
      shipto
    },
    quoteDropdownDataLabels
  } = props

  let CartDates = schedule.cartWithDates.map((item, index) => (
    <ShippingScheduleLineDisplay item={item} index={index}/>
  ))

  let packingBasisIndex = packingBasis.findIndex(elem => elem.value === schedule.packingBasisName)
  let packingBasisName = packingBasis[packingBasisIndex].label

  let carrierIdIndex = quoteDropdownDataLabels.carriers.findIndex(elem => elem.value === shipto.carrierId)
  let carrierName = quoteDropdownDataLabels.carriers[carrierIdIndex].label

  return(
    <>
      <SectionContainer>
        <Context.Consumer>
          {({userInfo}) => {
            if (!_.isNil(userInfo) && (userInfo.role === "Impersonator" || userInfo.role === "AirlineEmployee")){
              return(
                <SectionContainerBlue>
                  <SectionTitle>Confirmation Email</SectionTitle>
                  <FormikCheckbox label={`Send confirmation email to ${shipto.email}?`} name="confirmationEmail.sendToShipTo"/>
                  <FormikFieldArray name="confirmationEmail.ccEmails" label="CC Emails" addMore="Add a CC email"/>
                  <FormikCheckbox label={`Include Images on Quotes?`} name="confirmationEmail.imagesOnQuote"/>
                </SectionContainerBlue>
              )
            }
          }}        
        </Context.Consumer>
        <SectionTitle>Ship To</SectionTitle>
        <SectionFields>
          <DivAddressSection>
            <Pbold>{shipto.firstName} {shipto.lastName}</Pbold>
            <Pbold>{shipto.address1}</Pbold>
            <Pbold>{shipto.address2}</Pbold>
            <Pbold>{shipto.city}, {shipto.stateOrProvince} {shipto.zip} {shipto.country === 'us' ? 'USA' : 'Canada'}</Pbold>
          </DivAddressSection>
          <p>{shipto.phone}</p>
          <p>{shipto.email}</p>
          <DivTextRow><P>Carrier:</P><p>{carrierName}</p></DivTextRow>
          <DivTextRow><P>Is Collect?</P><p>{shipto.isCollect === 0 ? 'No' : 'Yes'}</p></DivTextRow>
          {shipto.isCollect === 1 && <DivTextRow><P>Collect Number:</P><p>{shipto.collectNumber}</p></DivTextRow>}
        </SectionFields>
      </SectionContainer>
      <SectionContainer>
        <SectionTitle>Shipping Schedule</SectionTitle>
        <SectionFields>
        <DivTextRow><P>Packing Basis:</P><p>{packingBasisName}</p></DivTextRow>
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
