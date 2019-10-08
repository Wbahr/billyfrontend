import React from 'react'
import styled from 'styled-components'

const DivItemResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 700px;
  height: 100px;
  margin: 100px auto;
`

const DivPartNumberRow = styled.div`
  width: 100%;
  height:30px;
  display: flex;
  justify-content: space-between;
  background-color: #404040;
  color: #fff;
  padding: 5px;
  font-size: 12px;
  font-weight: bold;
  font-family: Arial, sans-serif;
`

const DivPartDetailsRow = styled.div`
  display: flex;
  background-color: #F3F3F3;
`

const DivPartImg = styled.div`
  width: 30%;
  background-color: white;
  border-left: 1px #F3F3F3 solid;
  border-bottom: 1px #F3F3F3 solid;
`

const DivPartDetails = styled.div`
  width: 50%;
  padding: 4px 8px;
`

const PpartTitle = styled.p`
  margin: 0;
  font-weight: 700;
  font-size: 16px;
`

const PpartDesc = styled.p`
  margin: 0;
  font-size: 14px;
`

const PpartAvailability = styled.p`
  margin: 0;
  font-size: 13px;
`

export function ItemResult(props) {
  return(
    <DivItemResultContainer>
      <DivPartNumberRow><p>Item ID: SMC SY3100-5U1</p><p>Airline #: 92382384</p></DivPartNumberRow>
      <DivPartDetailsRow>
        <DivPartImg />
        <DivPartDetails>
          <PpartTitle>SMC SY3100-5U1, 5 PORT SOLENOID VALVE</PpartTitle>
          <PpartDesc>SY3000, 2 POSITION - SINGLE SOLENOID, BASE MOUNTED, INTERNAL PILOT, 24 VDC</PpartDesc>
          <PpartAvailability>Availability: 9631 -- Locations</PpartAvailability>
        </DivPartDetails>
        <div>
          <p>$12.23/EA</p>
          <p>Quantity: 2</p>
          <button>Add to Cart</button>
        </div>
      </DivPartDetailsRow>
    </DivItemResultContainer>
  )
}