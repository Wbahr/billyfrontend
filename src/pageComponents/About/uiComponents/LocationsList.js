import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ListDiv = styled.div`
    display: flex;
    flex-direction: column;
    flex-direction: column;
    font-size: 20px;
`
const City = styled.div`
    font-weight: bold;
    font-size: 22px;
`
const Address = styled.a`
`
const Phone = styled.a`
    &:hover{
        text-decoration: none;
        color: #B51F2B;
    }
`
const Fax = styled.a`
    &:hover{
        text-decoration: none;
        color: #B51F2B;
    }
`

export default function LocationsList(props) {
  const {
    city,
    address,
    phone,
    fax
  } = props
  return (
    <ListDiv>
      <City>{city}</City>
      <Address href={address}><FontAwesomeIcon icon="map-marker-alt" /> {address}</Address>
      <Phone href={phone}><FontAwesomeIcon icon="phone-alt" size="2px" /> {phone}</Phone>
      <Fax href={fax}><FontAwesomeIcon icon="print" size="2px" /> {fax}</Fax>
      {/* <TollFree>Toll Free: {tollFree}</TollFree> */}
    </ListDiv>
  )
}
