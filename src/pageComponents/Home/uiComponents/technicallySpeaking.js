import React, { Component } from 'react'
import styled from 'styled-components'
import SectionHeader from '../../_common/sectionHeader.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Container = styled.div`
    display: flex;
    flex-direction: row;
`
const Row = styled.div`
    display: flex;
    flex-direction: row;
    background-color: #f5f5f5;
    flex: 1;
    margin: 0 20px;  
`
const Img = styled.img`
    width: 290px;
    height: 290px;
`
const Details = styled.p`
    margin: 0;
    font-family: Verdana;
    font-size: 22px; 
`
const BoxDiv = styled.div`

`
const TextDiv = styled.div`
    display: flex;
    padding: 20px 10px;
    align-items: center;
`
const Button = styled.button`
    background: #0058a3;
    color: #fff;
    border: 0;
    font-size: 14px;
    user-select: none;
    padding: 10px;
    &:hover{
        color: white;
    border-radius: 50px;
    border-color: #494949 !important;
    transition: all 0.3s ease 0s;
    }
    `
const ButtonDiv = styled.div`
    padding: 30px 0;
`
const Div = styled.div`
`
const SeeAll = styled.div`
    padding: 17px;
    font-size: 24px;
    `
const A = styled.a`
`
const Wrapper = styled.div`
`
export default function TechnicallySpeaking() {

    return (
        <>
            <SectionHeader
                text='Technically Speaking'
            />
            <Wrapper>
          <Container>
              <Row>
              <BoxDiv><Img src="https://world-nuclear-news.org/originalimages/uploads/1/MHI-steam_generators.jpg" /></BoxDiv>
               <TextDiv> 
                   <Details >Lorem Ipsum has been the industry's standard dummy text 
                   <ButtonDiv> <Button>Watch More</Button></ButtonDiv>
                   </Details> 
               </TextDiv>
              </Row>
              <Row>
                <BoxDiv><Img src="https://www.power-eng.com/wp-content/uploads/content/dam/pe/online-articles/2016/04/LNG-solution.jpg" /></BoxDiv>
               <TextDiv> <Details > Lorem Ipsum has been the industry's standard dummy text 
               <ButtonDiv> <Button>Read More</Button></ButtonDiv>
               </Details>
               </TextDiv>
               </Row>
          </Container>
            <Div>
                <SeeAll>
                    <A href="#">See all videos and articles</A>
                </SeeAll>
            </Div>
          </Wrapper>
        </>
    )
}