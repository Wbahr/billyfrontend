import React from 'react'
import styled from 'styled-components'
import SectionHeader from '../../_common/sectionHeader.js'

const LineCardWrapper = styled.div`
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-evenly;
		margin: 25px 0 40px;
`
const LineCardDiv = styled.div`
		display: flex;
		flex-direction: column;
`
const ImgDiv = styled.div`
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
		width:  100%;
        max-width: 200px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        @media (max-width: 768px) {
            max-width: 260px;
       }
`
const P = styled.p`
		margin: 0;
		font-weight: bold;
		color: #212529;
`

export default function LineCards() {
    return (
        <>
            <SectionHeader text="Line Card &amp; Catalogs"/>
            <LineCardWrapper>
                <LineCardDiv>
                    <a href="/pages/resources/linecards">
                        <ImgDiv>
                            <Img src="https://airlinemedia.airlinehyd.com/Static_pages/home/line-card.png" />
                        </ImgDiv>
                        <NameDiv><P>View all line cards</P></NameDiv>
                    </a>
                </LineCardDiv>
                
                <LineCardDiv>
                    <a
                        href="//airlinemedia.airlinehyd.com/Literature/Airline_Hydraulic_Preferred_Products_Catalog.pdf"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <ImgDiv>
                            <Img src="https://airlinemedia.airlinehyd.com/Static_pages/home/hydraulic-catalog.png" />
                        </ImgDiv>
                        <NameDiv><P>Hydraulic Catalog</P></NameDiv>
                    </a>
                </LineCardDiv>
                
                <LineCardDiv>
                    <a
                        href="https://airlinemedia.airlinehyd.com/Literature/Airline_Automation_Solutions.pdf"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <ImgDiv>
                            <Img src="https://airlinemedia.airlinehyd.com/Static_pages/home/automation%20solutions.png" />
                        </ImgDiv>
                        <NameDiv><P>Automation Solutions</P></NameDiv>
                    </a>
                </LineCardDiv>
                <LineCardDiv>
                    <a
                        href="https://airlinemedia.airlinehyd.com/Literature/Airline_Hydraulics_Aftermarket_Brochure.pdf"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <ImgDiv>
                            <Img src="https://airlinemedia.airlinehyd.com/Static_pages/home/thumbnails/Airline_Hydraulics_Aftermarket_Brochure.pdf.png" />
                        </ImgDiv>
                        <NameDiv><P>Aftermarket Services</P></NameDiv>
                    </a>
                </LineCardDiv>
            </LineCardWrapper>
        </>
    )
}
