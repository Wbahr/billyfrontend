import React from 'react'
import styled from 'styled-components'

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  // margin: 40px 0 20px;
  align-items: center;
`
const H1 = styled.h2`
  font-family: verdana;
  color: #333;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding-bottom: 15px;
  letter-spacing: 2px;
`
const ShortBorder = styled.div`
  border-bottom: 3px solid #B51F2B;
  width: 120px;
`
export default function Header(props) {
    return (
        <>
            <HeaderDiv>
                <H1>{props.text}</H1>
                <ShortBorder></ShortBorder>
            </HeaderDiv>
        </>
    )
}
