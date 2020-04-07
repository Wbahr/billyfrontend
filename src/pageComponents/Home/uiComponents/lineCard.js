import React, { Component } from 'react'
import styled from 'styled-components'
import SectionHeader from '../../_common/sectionHeader.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LineCard from '../../../imgs/homepage/lineCard.png'
import Hydraulic from '../../../imgs/homepage/HydraulicCatalog.png'
import Automation from '../../../imgs/homepage/AutomationCatalog.png'

const LineCardWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin-bottom: 50px;
`
const LineCardDiv = styled.div`
    display: flex;
    flex-direction: column;
`
const ImgDiv = styled.div`
    width: 260px;
    height: 340px;
    display: flex;
    justify-content: center;
`
const NameDiv = styled.div`
    text-align: center;
    margin: 20px 0;
    color: #5a5a5a;
    &:hover{ 
        color: #246696;
    }
`
const Img = styled.img`
    width:  100%
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`
const P = styled.p`
    margin: 0;
    font-weight: bold;
    color: #5a5a5a;
`
const A = styled.a`
&:hover{
    text-decoration: none;
}
`
export default function LineCards() {

    return (
        <>
            <SectionHeader
                text='Line Card & Catalogs'
            />
            <LineCardWrapper>
                <LineCardDiv>
                    <A href="#">
                        <ImgDiv><Img src={LineCard} /></ImgDiv>
                        <NameDiv><P>Line Card</P></NameDiv>
                    </A>
                </LineCardDiv>
                <LineCardDiv>
                    <A href="#">
                        <ImgDiv><Img src={Hydraulic} /></ImgDiv>
                        <NameDiv><P>Hydraulic Catalog</P></NameDiv>
                    </A>
                </LineCardDiv>
                <LineCardDiv>
                    <A href="#">
                        <ImgDiv><Img src={Automation} /></ImgDiv>
                        <NameDiv><P>Automation Catalog</P></NameDiv>
                    </A>
                </LineCardDiv>
            </LineCardWrapper>
        </>
    )
}