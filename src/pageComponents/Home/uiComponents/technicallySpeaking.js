import React from 'react'
import styled from 'styled-components'
import SectionHeader from '../../_common/sectionHeader.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Container = styled.div`
		display: flex;
		flex-wrap: wrap;
        justify-content: space-evenly;
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
const Wrapper = styled.div`
		margin-bottom: 50px;
		flex-wrap: wrap;
        // max-width: 1500px;
        width: 100%;
        margin: 0 auto;
`


export default function TechnicallySpeaking() {

    return (
        <>
            <SectionHeader text='Technically Speaking' />
            <Wrapper>
                <Container>
                    <Row>
                        <ImgDiv>
                            <Img src="https://airlinemedia.airlinehyd.com/Static_pages/blog/thumbnail/case%20lifters%20website%20thumb.png" />
                        </ImgDiv>
                        <TextDiv>
                            <Details>Electric Case Lifters: Helping Employee Safety, Productivity & Happiness
                                <ButtonDiv>
                                    <Button href="https://airlinehyd-8466844.hs-sites.com/airline-hydraulics-blog/electric-case-lifters" target="_blank">Read More</Button>
                                </ButtonDiv>
                            </Details>
                        </TextDiv>
                    </Row>
                    <Row>
                        <ImgDiv>
                            <Img src="https://airlinemedia.airlinehyd.com/Static_pages/blog/thumbnail/gas%20booster%20controls%20website%20thumb.png" />
                        </ImgDiv>
                        <TextDiv>
                            <Details>How to Set Gas Booster Controls: A Technical Guide for Control Selection & Plumbing
                                <ButtonDiv>
                                    <Button href="https://airlinehyd-8466844.hs-sites.com/airline-hydraulics-blog/how-to-set-gas-booster-controls" target="_blank">Read More</Button>
                                </ButtonDiv>
                            </Details>
                        </TextDiv>
                    </Row>
                    <Row>
                        <ImgDiv>
                            <Img src="https://airlinemedia.airlinehyd.com/Static_pages/blog/thumbnail/smart%20elements%20website%20thumb.png" />
                        </ImgDiv>
                        <TextDiv>
                            <Details>What you need to know about Phoenix Contact's new Axioline Smart Elements
                                <ButtonDiv> <Button href="https://airlinehyd-8466844.hs-sites.com/airline-hydraulics-blog/axioline-smart-elements" target="_blank">Read More</Button></ButtonDiv>
                            </Details>
                        </TextDiv>
                    </Row>
                    <Row>
                        <ImgDiv>
                            <Img src="https://airlinemedia.airlinehyd.com/Static_pages/blog/thumbnail/moisture%20website%20thumb.png" />
                        </ImgDiv>
                        <TextDiv>
                            <Details>How to Prevent & Remove Moisture in Compressed Air Lines
                                <ButtonDiv>
                                    <Button href="https://airlinehyd-8466844.hs-sites.com/airline-hydraulics-blog/air-line-moisture-removal" target="_blank">Read More</Button>
                                </ButtonDiv>
                            </Details>
                        </TextDiv>
                    </Row>
                </Container>

                <div>
                    <SeeAll>
                        <A href="https://airlinehyd-8466844.hs-sites.com/airline-hydraulics-blog" target="_blank">See All Blog Posts <FontAwesomeIcon icon='arrow-circle-right' size='1x' /></A>
                    </SeeAll>
                </div>
            </Wrapper>
        </>
    )
}