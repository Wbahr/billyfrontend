import React from 'react'
import styled from 'styled-components'

const Banner = styled.div`
    height: 200px;
    background-image: url('https://www.airlinehyd.com/customer/aihyco/images/Headers/Basic_Background.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    `
const Title = styled.h1`
    text-align: center;
    margin-top: 80px;
    color: white;
    text-transform: uppercase;
    font-family: verdana;
    letter-spacing: 2px;
`
export default function banner(props) {
  return (
    <Banner>
      <Title>{props.text}</Title>
    </Banner>
  )
}
