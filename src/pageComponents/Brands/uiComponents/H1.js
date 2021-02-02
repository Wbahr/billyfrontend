import React from 'react'
import styled from 'styled-components'

const Header = styled.h1`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  margin-top: 40px;
`
export default function H1(props) {
    return (
        <Header>{props.text}</Header>
    )
}
