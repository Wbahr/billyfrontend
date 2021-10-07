import React from 'react'
import styled from 'styled-components'
import SectionHeader from '../../_common/sectionHeader.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Container = styled.div`
		display: flex;
		flex-wrap: wrap;
        justify-content: space-around;
`
const Row = styled.div`
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		background-color: #f2f3f4;
		margin: 20px;
		justify-content: center;
        max-width: 300px;
        width: 100%;
        box-shadow: 0 1px 1px rgb(0 0 0 / 11%), 0 2px 2px rgb(0 0 0 / 11%), 0 4px 4px rgb(0 0 0 / 11%), 0 8px 8px rgb(0 0 0 / 11%), 0 16px 16px rgb(0 0 0 / 11%), 0 32px 32px rgb(0 0 0 / 11%);
`
const ImgDiv = styled.div`
`
const Img = styled.img`
		max-width: 100%; 
		object-fit: cover;
		@media (max-width: 345px) {
			width: 100%;
			height: auto;
		}
`
const Details = styled.div`
		margin: 0;
		font-size: 18px;
		@media (max-width: 800px) {
				font-size: 12px;
			} 
`
const TextDiv = styled.div`
		display: flex;
		padding: 10px;
		align-items: center;
`
const Button = styled.a`
		background: #0058a3;
		color: #fff;
		border: 0;
		font-size: 14px;
		user-select: none;
		padding: 10px;
		&:hover {
			text-decoration: none;
			color: white;
			border-color: #494949 !important;
		}
		@media (max-width: 800px) {
			font-size: 14px;
            padding: 5px 10px;
		 }
		`
const ButtonDiv = styled.div`
		padding: 20px 0;
		transition: 0.2s;
		&:hover {
			transform: translate(0, -4px);
		}
		@media (max-width: 800px) {
			padding: 15px 0;
		 }
`
const SeeAll = styled.div`
		padding: 17px;
		font-size: 22px;
		@media (max-width: 800px) {
			 font-size: 20px;
		}
`
const A = styled.a`
		color: #333;
`
const Link = styled.a`
		color: #333;
        &:hover{
            text-decoration: none;
            color: #333;
        }
`
const Wrapper = styled.div`
		margin-bottom: 50px;
		flex-wrap: wrap;
        width: 100%;
        margin: 0 auto;
        max-width: 1400px;
`

export default function TechnicallySpeaking() {
    

    return (
        <>
            <SectionHeader text='Technically Speaking' />
            <Wrapper>
                <Container>
                    <Row>
                        <Link href="https://blog.airlinehyd.com/understanding-cybersecurity" target="_blank">
                            <ImgDiv>
                                <Img src="https://airlinemedia.airlinehyd.com/Static_pages/blog/thumbnail/webinar%20homepage%20version%20thumbnail%20copy.png" />
                            </ImgDiv>
                        </Link>
                        <TextDiv>
                            <Details>Understanding Industrial Cybersecurity
                                <ButtonDiv>
                                    <Button href="https://blog.airlinehyd.com/understanding-cybersecurity" target="_blank">Read More</Button>
                                </ButtonDiv>
                            </Details>
                        </TextDiv>
                    </Row>
                    <Row>
                        <Link href="https://blog.airlinehyd.com/mguard" target="_blank">
                            <ImgDiv>
                                <Img src="https://airlinemedia.airlinehyd.com/Static_pages/blog/thumbnail/mGuard%20-%20homepage%20version%20copy.png" />
                            </ImgDiv>
                        </Link>
                        <TextDiv>
                            <Details> How to Establish & Secure a Remote Network
                                <ButtonDiv>
                                    <Button href="https://blog.airlinehyd.com/mguard" target="_blank">Read More</Button>
                                </ButtonDiv>
                            </Details>
                        </TextDiv>
                    </Row>
                    <Row>
                        <Link href="https://blog.airlinehyd.com/building-over-a-busy-highway-an-airline-success-story" target="_blank">
                            <ImgDiv>
                                <Img src="https://airlinemedia.airlinehyd.com/Static_pages/blog/thumbnail/Building%20vver%20a%20busy%20highway.jpg" />
                            </ImgDiv>
                        </Link>
                        <TextDiv>
                            <Details>Building over a busy highway
                                <ButtonDiv>
                                    <Button href="https://blog.airlinehyd.com/building-over-a-busy-highway-an-airline-success-story" target="_blank">Read More</Button>
                                </ButtonDiv>
                            </Details>
                        </TextDiv>
                    </Row>
                    <Row>
                        <Link href="https://blog.airlinehyd.com/airline-website-launch" target="_blank">
                            <ImgDiv>
                                <Img src="https://airlinemedia.airlinehyd.com/Static_pages/blog/thumbnail/new%20website%20blog%20post%20homepage%20version%20copy.png" />
                            </ImgDiv>
                        </Link>
                        <TextDiv>
                            <Details>New Site Launch and a Message from our Website Director
                                <ButtonDiv> <Button href="https://blog.airlinehyd.com/airline-website-launch" target="_blank">Read More</Button></ButtonDiv>
                            </Details>
                        </TextDiv>
                    </Row>
                </Container>

                <div>
                    <SeeAll>
                        <A href="https://blog.airlinehyd.com/" target="_blank">See All Blog Posts <FontAwesomeIcon icon='arrow-circle-right' size='1x' /></A>
                    </SeeAll>
                </div>
            </Wrapper>
        </>
    )
}