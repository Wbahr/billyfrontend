import React, { Component } from 'react'
import styled from 'styled-components'
import SectionHeader from '../../_common/sectionHeader.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const LineCardWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    height: 350px;
    align-items: center;

`;

const LineCardDiv = styled.div`
    display: flex;
    flex-direction: column;
 
`;

const ImgDiv = styled.div`
`;

const NameDiv = styled.div`
    text-align: center;
    margin: 20px 0;
    color: #5a5a5a;
    font-weight: bold;
    &:hover{
       
        color: #246696;
    }
`;

const Img = styled.img`
// box-shadow: 0px 2px 3px rgba(0,0,0,.13) ,
//             1px 2px 2px rgba(0,0,0,.1) ,
//             -1px -2px 2px rgba(0,0,0,.05) ;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

const P = styled.p`
    margin: 0;
`;

const A = styled.a`
&:hover{
    text-decoration: none;
}
`;

export default function LineCards() {

    return (

        <>
            <SectionHeader
                text='Line Card & Catalogs'
            />
            <LineCardWrapper>
                <LineCardDiv>
                    <A href="#">
                        <ImgDiv><Img src="https://www.airlinehyd.com/literature_catalog/Airline/Thumbnails/Airline%20line%20card%20thumb.jpg" /></ImgDiv>
                        <NameDiv><P>Line Card</P></NameDiv>
                    </A>
                </LineCardDiv>


                <LineCardDiv>
                    <A href="#">
                        <ImgDiv><Img src="https://www.airlinehyd.com/literature_catalog/Airline/Thumbnails/Hydraulic_Preferred_Stock_Catalog.jpg" /></ImgDiv>
                        <NameDiv><P>Hydraulic Catalog</P></NameDiv>
                    </A>
                </LineCardDiv>

                <LineCardDiv>
                    <A href="#">
                        <ImgDiv><Img src="https://www.airlinehyd.com/customer/aihyco/images/Automation_preferred_stock_catalog_thumbnail.png" /></ImgDiv>
                        <NameDiv><P>Automation Catalog</P></NameDiv>
                    </A>
                </LineCardDiv>
            </LineCardWrapper>



        </>

    )
}