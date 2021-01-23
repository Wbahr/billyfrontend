import React from 'react'
import styled from 'styled-components'

const Name = styled.p`
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;

`
export default function lineCardName(props) {
  return (
    <div>
      <div>
        <Name>{props.text}</Name>
      </div>
    </div>
  )
}
