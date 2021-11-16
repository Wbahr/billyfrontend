import React from 'react'
import styled from 'styled-components'

const DivDefault = styled.div`
  display: flex;
  cursor: pointer;
  height: 40px;
  width: 100%;
  background-color: #DB1633;
  align-items: center;
  padding-left: 32px;
  p {
    color: white;
    font-size: 16px;
  }
`

const DivLocation = styled(DivDefault)`
  background-color: black;
`

const DivDetails = styled.div`
  margin-left: 20px;
  margin-top: 5px;
`

const DivDelete = styled.div`
  flex-grow: 99;
  align-self: flex-end;
  text-align: right;
  margin-right: 12px;
  p {
    cursor: pointer;
  }
`

const DivRow = styled.div`
  display: flex;
`

export default function AddressCard({ deleteLocation, defaultLocation }) {
    const Div = styled.div`
    display: flex;
    flex-direction: column;
    width: 340px;
    height: 190px;
    border: ${defaultLocation ? '2px solid #DB1633' : '2px solid black'};
    margin: 0 16px;
    p {
      margin: 0;
      font-size: 14px;
    }
  `
    return (
        <Div>
            {defaultLocation ? <DivDefault><p>Default Shipping Location</p></DivDefault> : <DivLocation><p>Set as Default</p></DivLocation>}
            <DivRow>
                <DivDetails>
                    <p>Company Name</p>
                    <p>Robert Panczer</p>
                    <p>1234 Main Street</p>
                    <p>Nazareth, PA 18064</p>
                    <p>484-547-5664</p>
                    <p>bobby.panczer@gmail.com</p>
                </DivDetails>
                <DivDelete>
                    <p onClick={() => deleteLocation()}>Delete</p>
                </DivDelete>
            </DivRow>
        </Div>
    )
}