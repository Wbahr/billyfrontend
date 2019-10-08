import React from 'react'
import styled from 'styled-components'

const DivItemResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 700px;
  height: 180px;
  margin: 100px auto;
`

const DivPartNumberRow = styled.div`
  width: 100%;
  height: 30px;
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
  height: 100%;
`

const DivPartImg = styled.div`
  width: 150px;
  background-color: white;
  border-left: 1px #F3F3F3 solid;
  border-bottom: 1px #F3F3F3 solid;
`

const DivPartDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  padding: 4px 8px;
`

const PpartTitle = styled.p`
  margin: 0;
  font-weight: 700;
  font-size: 16px;
  &:hover{
    cursor: pointer;
    color: #328EFC;
  }
`

const PpartDesc = styled.p`
  margin: 0 0 auto 0;
  font-size: 14px;
`

const PpartAvailability = styled.p`
  margin: 0;
  font-size: 13px;
`

const DivPartAction = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  padding: 4px 8px;
  align-items: flex-end;
`

const ButtonRed = styled.button`
  background-color: rgb(219, 22, 51);
  color: white;
  font-weight: 600;
  border: 0;
  padding: 4px 8px;
  box-shadow: 2px 2px 4px #000;
  &:hover{
    background-color: #b51029;
  }
  &:active{
    background-color: #b51029;
    box-shadow: 2px 2px 2px #000;
  }
`

const Div = styled.div`
  display: flex;
`

const InputQuantity = styled.input`
  width: 50px;
  height: 25px;
  margin-left: 4px;
`

const Pprice = styled.p`
  color: #328EFC
  font-weight: 700;
  padding: 0 4px;
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
        <DivPartAction>
          <Div><Pprice>$12.23</Pprice><p>/EA</p></Div>
          <Div><p>Quantity:</p><InputQuantity/></Div>
          <ButtonRed>Add to Cart</ButtonRed>
        </DivPartAction>
      </DivPartDetailsRow>
    </DivItemResultContainer>
  )
}