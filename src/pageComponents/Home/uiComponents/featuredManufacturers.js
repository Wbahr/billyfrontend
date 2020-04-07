import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import { H2 } from '../../_common/text'
import SectionHeader from '../../_common/sectionHeader.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 1300px;
  margin: 0 auto 50px;
`
const Brandsdiv = styled.div`
  display: flex;
  width: 116px;
  height: 85px;
  // border: 3px solid #f2f3f4;
  border-radius: 50%;
  margin: 25px 35px;
  align-items: center;
  text-align: center;
`
const LogoImg = styled.img`
  max-width: 100%;
  padding: 5px;
`
const A = styled.a`
`

export default class CustomSlider extends Component {

  render() {
    return (
      <>
        <SectionHeader
          text='Featured Manufacturers'
        />
        <Wrapper>
          <Brandsdiv><A href=""><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured2.png" /></A></Brandsdiv>
          <Brandsdiv><A href=""><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured3.png" /></A></Brandsdiv>
          <Brandsdiv><A href=""><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured4.png" /></A></Brandsdiv>
          <Brandsdiv><A href=""><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured5.png" /></A></Brandsdiv>
          <Brandsdiv><A href=""><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured6.png" /></A></Brandsdiv>
          <Brandsdiv><A href=""><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured7.png" /></A></Brandsdiv>
          <Brandsdiv><A href=""><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured8.png" /></A></Brandsdiv>
          <Brandsdiv><A href=""><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured9.png" /></A></Brandsdiv>
          <Brandsdiv><A href=""><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured10.png" /></A></Brandsdiv>
          <Brandsdiv><A href=""><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured11.png" /></A></Brandsdiv>
          <Brandsdiv><A href=""><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured12.png" /></A></Brandsdiv>
          <Brandsdiv><A href=""><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured13.png" /></A></Brandsdiv>
          <Brandsdiv><A href=""><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/rittal.jpg" /></A></Brandsdiv>
          <Brandsdiv><A href=""><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured15.png" /></A></Brandsdiv>
          <Brandsdiv><A href=""><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured16.png" /></A></Brandsdiv>
          <Brandsdiv><A href=""><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured17.png" /></A></Brandsdiv>
          <Brandsdiv><A href=""><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured18.png" /></A></Brandsdiv>
        </Wrapper>
      </>
    )
  };
}