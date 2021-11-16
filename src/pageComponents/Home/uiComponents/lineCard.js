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

const key = 'LINE_CARDS'

export default function LineCards({ homepage }) {
    const items = homepage.filter(h => h.key === key)

    const cards = items.map(i => (
        <LineCardDiv key={i.sort}>
            <a href={i.href}>
                <ImgDiv>
                    <Img src={i.imageUrl} />
                </ImgDiv>
                <NameDiv><P>{i.html}</P></NameDiv>
            </a>
        </LineCardDiv>
    ))
    
    return (
        <>
            <SectionHeader text={items[0].sectionName} />
            <LineCardWrapper>
                {cards}
            </LineCardWrapper>
        </>
    )
}
