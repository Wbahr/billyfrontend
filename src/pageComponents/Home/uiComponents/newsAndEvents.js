import { Container } from '@material-ui/core'
import Articles from 'pageComponents/Brands/uiComponents/Articles.js'
import React from 'react'
import styled from 'styled-components'
import SectionHeader from '../../_common/sectionHeader.js'

const Wrapper = styled.div`
		margin-bottom: 50px;
		flex-wrap: wrap;
    // max-width: 1500px;
    width: 100%;
`
const NewsContainer = styled.div`
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
    // justify-content: space-evenly;
		margin: 0 auto;
		max-width: 1400px;
		width: 100%;
`
const Row = styled.div`
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		padding: 15px 0;
		background-color: #f2f3f4;
		margin: 20px;
		justify-content: center;
    width: 100%;
`
const Link = styled.a`
		color: #333;
        &:hover{
            text-decoration: none;
            color: #333;
        }
`
const ImgDiv = styled.div`
		width: 150px;
    max-width: 100%;

`
const ArticlesDiv = styled.div`
		display: flex;
		max-width: 600px;
		width: 100%;
		margin: 15px 10px;
` 

const Img = styled.img`
		width: 100%; 
		object-fit: cover;
		@media (max-width: 345px) {
			width: 100%;
			height: auto;
		}
`
const Details = styled.div`
		margin: 0 0 5px;
		font-size: 14px;
		@media (max-width: 800px) {
				font-size: 12px;
			} 
`
const TextDiv = styled.div`
		display: flex;
		padding: 0 10px;
		max-width: 440px;
		width: 100%;
		flex-direction: column;
`
const Title = styled.p`
		font-size: 16px;
		font-weight: 600;
`
const ReadMoreButton = styled.a`
		width: 25%;
`
export default function NewsAndEvents() {
    return (
        <>
            
            <Wrapper>
                <NewsContainer>
                    <SectionHeader text='News and Events' />
                    <Row>
                        <ArticlesDiv>
                            <ImgDiv>
                                <Img src="https://airlinemedia.airlinehyd.com/Static_pages/images/articles/PR.png" />
                            </ImgDiv>
                            <TextDiv>
                                <Title>Airline Acquires Hy-Performance Hydraulics</Title>
                                <Details>Airline Hydraulics (Airline) is pleased to announce the acquisition of Hy-Performance Hydraulics (Hy-Performance).</Details>
                                <ReadMoreButton href="https://info.airlinehyd.com/hy-performance-acquisition" target="_blank">Read More &#10132;</ReadMoreButton>
                            </TextDiv>
                        </ArticlesDiv>
                        <ArticlesDiv>
                            <ImgDiv>
                                <Img src="https://airlinemedia.airlinehyd.com/Static_pages/images/articles/Aest-donation.png" />
                            </ImgDiv>
                            <TextDiv>
                                <Title>Airline Hydraulics Donation Supports AEST Majors</Title>
                                <Details>Research may soon fly forward in Osburn Hall, thanks to a recent donation. Millersville ‘University’s Department of Applied Engineering, Safety and Technology (AEST) recently received industrial networking and controls hardware from Todd Huber of Airline Hydraulics.</Details>
                                <ReadMoreButton href="https://blogs.millersville.edu/news/2021/06/30/airline-hydraulics-donation-supports-aest-majors/" target="_blank">Read More &#10132;</ReadMoreButton>
                            </TextDiv>
                        </ArticlesDiv>
                        <ArticlesDiv>
                            <ImgDiv>
                                <Img src="https://airlinemedia.airlinehyd.com/Static_pages/images/articles/york-college.png" />
                            </ImgDiv>
                            <TextDiv>
                                <Title>Airline and York College Partner in Manufacturing Initiative</Title>
                                <Details>Airline is proud to partner with York College's "Developing Modular Cobot Automation Solutions for the Testing Environment" project, which aims to use robots in a laboratory setting to increase efficiency, reduce technician exposure to harmful chemicals, and increase reproducibility. </Details>
                                <ReadMoreButton href="https://info.airlinehyd.com/pa-manufacturing-initiative-partnership" target="_blank">Read More &#10132;</ReadMoreButton>
                            </TextDiv>
                        </ArticlesDiv>
                        <ArticlesDiv>
                            <ImgDiv>
                                <Img src="https://airlinemedia.airlinehyd.com/Static_pages/images/articles/tech%20traveler.png" />
                            </ImgDiv>
                            <TextDiv>
                                <Title>Airline's Tech Traveler</Title>
                                <Details>Experience the latest innovations in automation and fluid power, right at your doorstep, with Airline's Tech Traveler. </Details>
                                <ReadMoreButton href="https://info.airlinehyd.com/book-tech-traveler" target="_blank">Read More &#10132;</ReadMoreButton>
                            </TextDiv>
                        </ArticlesDiv>
                    
                    </Row>
                </NewsContainer>
            </Wrapper>
        </>
    )
}