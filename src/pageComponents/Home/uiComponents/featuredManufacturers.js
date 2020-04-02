import React, { Component } from 'react'
import styled, {keyframes} from 'styled-components'
import { H2 } from '../../_common/text'
import SectionHeader from '../../_common/sectionHeader.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import $ from 'jquery';
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
}
`
const ImgSlide = keyframes`
  0%{
    transform: translate3d(0, 0, 0);
  }
  100%{
    transform: translate3d(-3000px, 0, 0);
  }
`
const Brandsdiv = styled.div`
  height: 120px;
  width: 150px;
  font-size: 25px;
  margin: 20px 40px;
  display: inline-block;
  display: flex;
  align-items: center;
`
const LogoImg = styled.img`
  width: 150px;
  height: auto;
`
const divStyle = {
  overflowX: "hidden",
  overflowY: "hidden",
  width: "80%",
  display: "flex"
};

const ImageContainer = styled.div`
  width: 80%;
  display: flex;
`

const IconDiv = styled.div`
  cursor: pointer;
  color: black;
  transition: 0.6s ease;
  margin: 0 25px;
  &:hover{
    color: #555555;
    height: 100%;
  }
`
const A = styled.a`
`
const Button = styled.button`
  border: 0;
  border-radius: 50%;
  padding: 10px 16px;
  background-color: white;
`
export default class CustomSlider extends Component {
  constructor() {
    super()
    this.scroll = this.scroll.bind(this)
  }
  scroll(direction) {
    const far = $(".image-container").width() / 2 * direction;
    const pos = $(".image-container").scrollLeft() + far;
    $(".image-container").animate({ scrollLeft: pos }, 1000)
  }

  render() {
    return (
      <>
        <SectionHeader
          text='Featured Manufacturers'
        />
        <Wrapper>
        {/* <IconDiv><Button onClick={this.scroll.bind(null, -1)}> <FontAwesomeIcon icon='chevron-left' size='2x' /></Button></IconDiv>
          <div className="image-container" style={divStyle}>  */}
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
         {/* </div>
          <IconDiv><Button onClick={this.scroll.bind(null, 1)}><FontAwesomeIcon icon='chevron-right' size='2x' /></Button></IconDiv> */}
        </Wrapper>
      </>
    )
  };
}