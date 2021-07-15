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
                        <Link href="https://blog.airlinehyd.com/fast-panel-wiring" target="_blank">
                            <ImgDiv>
                                <Img src="https://airlinemedia.airlinehyd.com/Static_pages/blog/thumbnail/3%20time%20saving%20technologies.png" />
                            </ImgDiv>
                        </Link>
                        <TextDiv>
                            <Details>Three Time-Saving Technologies for Control Panel Wiring
                                <ButtonDiv> <Button href="https://blog.airlinehyd.com/fast-panel-wiring" target="_blank">Read More</Button></ButtonDiv>
                            </Details>
                        </TextDiv>
                    </Row>
                    <Row>
                        <Link href="https://blog.airlinehyd.com/lean-manufacturing-principles" target="_blank">
                            <ImgDiv>
                                <Img src="https://airlinemedia.airlinehyd.com/Static_pages/blog/thumbnail/5%20lean%20principles%20copy.png" />
                            </ImgDiv>
                        </Link>
                        <TextDiv>
                            <Details>Five Lean Manufacturing Principles You Can Implement Today
                                <ButtonDiv>
                                    <Button href="https://blog.airlinehyd.com/lean-manufacturing-principles" target="_blank">Read More</Button>
                                </ButtonDiv>
                            </Details>
                        </TextDiv>
                    </Row>
                    <Row>
                        <Link href="https://blog.airlinehyd.com/lean-manufacturing-101" target="_blank">
                            <ImgDiv>
                                <Img src="https://airlinemedia.airlinehyd.com/Static_pages/blog/thumbnail/lean%20101.png" />
                            </ImgDiv>
                        </Link>
                        <TextDiv>
                            <Details>lean Manufacturing 101: Explaning Ergonomics, 5S, and Lean Principles
                                <ButtonDiv>
                                    <Button href="https://blog.airlinehyd.com/lean-manufacturing-101" target="_blank">Read More</Button>
                                </ButtonDiv>
                            </Details>
                        </TextDiv>
                    </Row>
                    <Row>
                        <Link href="https://blog.airlinehyd.com/employee-ownership" target="_blank">
                            <ImgDiv>
                                <Img src="https://airlinemedia.airlinehyd.com/Static_pages/blog/thumbnail/esop%20ownership.png" />
                            </ImgDiv>
                        </Link>
                        <TextDiv>
                            <Details>We're 100% Employee-Owened. But What Does That Mean?
                                <ButtonDiv>
                                    <Button href="https://blog.airlinehyd.com/employee-ownership" target="_blank">Read More</Button>
                                </ButtonDiv>
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