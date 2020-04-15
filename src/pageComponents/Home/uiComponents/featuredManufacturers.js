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
  &:hover {
    transition: transform 200ms;
    transform: scale(1.1);
  }
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
          <Brandsdiv><A href="/Brands/featured/smc"><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured2.png" /></A></Brandsdiv>
          <Brandsdiv><A href="/Brands/featured/eaton"><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured3.png" /></A></Brandsdiv>
          <Brandsdiv><A href="/Brands/featured/hydac"><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured4.png" /></A></Brandsdiv>
          <Brandsdiv><A href="/Brands/featured/omron"><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured5.png" /></A></Brandsdiv>
          <Brandsdiv><A href="/Brands/featured/abb"><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured6.png" /></A></Brandsdiv>
          <Brandsdiv><A href="/Brands/featured/butech"><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured7.png" /></A></Brandsdiv>
          <Brandsdiv><A href="/Brands/featured/clippard"><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured8.png" /></A></Brandsdiv>
          <Brandsdiv><A href="/Brands/featured/haskel"><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured9.png" /></A></Brandsdiv>
          <Brandsdiv><A href="/Brands/featured/lincoln"><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured10.png" /></A></Brandsdiv>
          <Brandsdiv><A href="/Brands/featured/orientalmotor"><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured11.png" /></A></Brandsdiv>
          <Brandsdiv><A href="/Brands/featured/paccar"><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured12.png" /></A></Brandsdiv>
          <Brandsdiv><A href="/Brands/featured/parker"><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured13.png" /></A></Brandsdiv>
          <Brandsdiv><A href="/Brands/featured/rittal"><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/rittal.jpg" /></A></Brandsdiv>
          <Brandsdiv><A href="/Brands/featured/ross"><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured15.png" /></A></Brandsdiv>
          <Brandsdiv><A href="/Brands/featured/schmersal"><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured16.png" /></A></Brandsdiv>
          <Brandsdiv><A href="/Brands/featured/phoenixContact"><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured17.png" /></A></Brandsdiv>
          <Brandsdiv><A href="/Brands/featured/aventics"><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured18.png" /></A></Brandsdiv>
        </Wrapper>
      </>
     
    )
  };
}