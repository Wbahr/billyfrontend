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

const key = 'NEWS'

export default function NewsAndEvents({ homepage }) {
    const items = homepage.filter(h => h.key === key)

    const news = items.map(i => (
        <ArticlesDiv key={i.sort}>
            <ImgDiv>
                <Img src={i.imageUrl} />
            </ImgDiv>
            <TextDiv>
                <Title>{i.title}</Title>
                <Details>{i.html}</Details>
                <ReadMoreButton href={i.href} target="_blank">Read More &#10132;</ReadMoreButton>
            </TextDiv>
        </ArticlesDiv>
    ))
    return (
        <>
            <Wrapper>
                <NewsContainer>
                    <SectionHeader text={items[0].sectionName} />
                    <Row>
                        {news}
                    </Row>
                </NewsContainer>
            </Wrapper>
        </>
    )
}