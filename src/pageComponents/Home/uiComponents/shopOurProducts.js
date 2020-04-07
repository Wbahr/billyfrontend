import React, { useState } from 'react'
import styled from 'styled-components'
import { H2 } from '../../_common/text'
import SectionHeader from '../../_common/sectionHeader.js'
import SmallSectionHeader from '../../_common/smallSectionHeader.js'
import { Link, useHistory } from 'react-router-dom'
import CategoryGrid from './categoryGrid'
import Banner from './banner'

const Div = styled.div`
  display: flex;
  justify-content: center;
  // margin-bottom: 20px;
 
`
const DivRight = styled(Div)`
  display: flex;
  flex: 2;
  justify-content: center;
  margin-bottom: 50px;
 
`
const Suggestion = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center
  cursor: pointer;
  height: 45px;
  padding: 0px 8px;
  margin: 10px 0;
  // border: 1px solid #dadada;
  color: #303030;
  width: 150px;
  font-size: 14px;
  &:hover {
    background-color: #328EFC;
    // border: 1px solid #1E5597;
    color: white;
    transition: color 500ms;
    transition: border 500ms;
    transition: background-color 500ms;
  }
`
const Wrapper = styled.div`
  // border-bottom: 1px solid lightgray;
`
const P = styled.p`
  margin: 0;
`
const ImgDiv = styled.div`
  width: 150px;
  height: 150px;
  border: 1px solid black;
  display: flex;
  

`
const Img = styled.img`
  max-width: 100%;
  padding: 10px;
  margin: 0 auto;
 
`
const ImgDetailsDiv = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  
`
export default function ShopOurProducts(props) {

  function handleSearch(searchTerm) {
    props.history.push(`/search/?searchTerm=${encodeURIComponent(searchTerm)}&resultSize=10&resultPage=1&sortType=${encodeURIComponent('relevancy')}`)

  }

  return (
    <>
      <div>
        <div>
          <SectionHeader
            text='Shop by Categories'
          />
        </div>
        <Div>
          <CategoryGrid
            history={props.history}
          />
        </Div>
      </div>

      {/* <Wrapper>
        <SectionHeader
          text='Recommended For You'
        />
        <DivRight>
          <ImgDetailsDiv>
            <ImgDiv> <Img src="https://www.airlinehyd.com/customer/aihyco/corvus/images/items/HYDAC%203000249_t.jpg" /></ImgDiv>
            <Suggestion onClick={() => handleSearch('Solenoid Valve')} >
              Solenoid Valve
          </Suggestion>
          </ImgDetailsDiv>
          <ImgDetailsDiv>
            <ImgDiv><Img src="https://www.airlinehyd.com/customer/aihyco/corvus/images/items/SMC%20SY100-30-A_t.jpg" /></ImgDiv>
            <Suggestion onClick={() => handleSearch('SY Valve')}>
              SY Valve
          </Suggestion>
          </ImgDetailsDiv>
          <ImgDetailsDiv>
            <ImgDiv><Img src="https://www.airlinehyd.com/customer/aihyco/corvus/images/items/SMC%20SY50M-2-1DA-C0_t.jpg"/></ImgDiv>
            <Suggestion onClick={() => handleSearch('Manifold')}>
              Manifold
          </Suggestion>
          </ImgDetailsDiv>
          <ImgDetailsDiv>
            <ImgDiv><Img src="https://www.airlinehyd.com/customer/aihyco/corvus/images/items/PHOENIX%203044814_t.jpg" /></ImgDiv>
            <Suggestion onClick={() => handleSearch('Phoenix Terminal Block')}>
              Phoenix Terminal Block
          </Suggestion>
          </ImgDetailsDiv>
          <ImgDetailsDiv>
            <ImgDiv><Img src="https://www.airlinehyd.com/customer/aihyco/corvus/images/items/SMC%20VHS5510-N10B-Z_t.jpg"/></ImgDiv>
            <Suggestion onClick={() => handleSearch('Valve')}>
              Valve
          </Suggestion>
          </ImgDetailsDiv>
        </DivRight>
      </Wrapper> */}

    </>
  )
}