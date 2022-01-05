import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
		display: flex;
		flex-wrap: wrap;
    justify-content: center;
		margin-bottom: 50px;
`
const Row = styled.div`
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		background-color: #f2f3f4;
		margin: 20px;
		justify-content: center;
    max-width: 220px;
    width: 100%;
    box-shadow: 0 1px 1px rgb(0 0 0 / 11%), 0 2px 2px rgb(0 0 0 / 11%), 0 4px 4px rgb(0 0 0 / 11%), 0 8px 8px rgb(0 0 0 / 11%), 0 16px 16px rgb(0 0 0 / 11%), 0 32px 32px rgb(0 0 0 / 11%);
		transition: 0.2s;
  	&:hover {
			transform: translate(0, -4px);
`
const ImgDiv = styled.div`
`
const Img = styled.img`
		max-width: 100%;
		@media (max-width: 345px) {
			width: 100%;
			height: auto;
		}
`
const Details = styled.div`
		margin: 0;
		font-size: 16px;
		font-weight: 500;
		text-align: center;
		@media (max-width: 800px) {
				font-size: 12px;
			} 
`
const TextDiv = styled.div`
		display: flex;
		padding: 10px;
		align-items: flex-start;
		justify-content: center;
`
const SeeAll = styled.div`
		padding: 17px;
		font-size: 22px;
		@media (max-width: 800px) {
			 font-size: 20px;
		}
`
const A = styled.a`
		color: #212529;
		&:hover{
			text-decoration: none;
			color: #212529;
		}
`
const Wrapper = styled.div`
		margin-bottom: 50px;
		flex-wrap: wrap;
    width: 100%;
    margin: 0 auto;
`

const key = 'BLOCKS'

export default function NewAndNoteworthy({ homepage }) {
    const items = homepage.filter(h => h.key === key)

    const blocks = items.map(i => {
        return (
            <Row key={i.sort}>
                <A href={i.href} target="_blank">
                    <ImgDiv>
                        <Img src={i.imageUrl} />
                    </ImgDiv>
                    <TextDiv>
                        <Details>{i.html}</Details>
                    </TextDiv>
                </A>
            </Row>
        )
    })

    return (
        <>
            {/* <SectionHeader text='New and Noteworthy' /> */}
            <Wrapper>
                <Container>
                    {blocks}
                </Container>
            </Wrapper>
        </>
    )
}