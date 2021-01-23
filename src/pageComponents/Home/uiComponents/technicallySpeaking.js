import React from 'react'
import styled from 'styled-components'
import SectionHeader from '../../_common/sectionHeader.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Container = styled.div`
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
`
const Row = styled.div`
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		background-color: #f2f3f4;
		flex: 1;
		margin: 20px;
`
const Img = styled.img`
		width: 305px;
		height: 290px;
		@media (max-width: 345px) {
			width: 100%;
			height: auto;
		}
`
const Details = styled.div`
		margin: 0;
		font-family: Verdana;
		font-size: 22px;
		@media (max-width: 800px) {
				font-size: 25px;
			} 
`
const TextDiv = styled.div`
		display: flex;
		padding: 20px 10px;
		align-items: center;
`
const Button = styled.button`
		background: #0058a3;
		color: #fff;
		border: 0;
		font-size: 14px;
		user-select: none;
		padding: 10px;
		&:hover {
			color: white;
			border-radius: 50px;
			border-color: #494949 !important;
			transition: all 0.3s ease 0s;
		}
		@media (max-width: 800px) {
			font-size: 20px;
		 }
		`
const ButtonDiv = styled.div`
		padding: 30px 0;
		@media (max-width: 800px) {
			padding: 15px 0;
		 }
`
const SeeAll = styled.div`
		padding: 17px;
		font-size: 22px;
		@media (max-width: 800px) {
			 font-size: 25px;
		}
`
const A = styled.a`
		color: #333;
`
const Wrapper = styled.div`
		margin-bottom: 50px;
`
export default function TechnicallySpeaking() {

  return (
    <>
      <SectionHeader text='Technically Speaking'/>
      <Wrapper>
        <Container>
          <Row>
            <div>
              <Img src="https://world-nuclear-news.org/originalimages/uploads/1/MHI-steam_generators.jpg" />
            </div>
						
            <TextDiv> 
              <Details >Lorem Ipsum has been the industry's standard dummy text 
                <ButtonDiv> <Button>Watch More</Button></ButtonDiv>
              </Details> 
            </TextDiv>
          </Row>
					
          <Row>
            <div>
              <Img src="https://www.power-eng.com/wp-content/uploads/content/dam/pe/online-articles/2016/04/LNG-solution.jpg" />
            </div>
						
            <TextDiv>
              <Details>
                Lorem Ipsum has been the industry's standard dummy text
                <ButtonDiv>
                  <Button>Read More</Button>
                </ButtonDiv>
              </Details>
            </TextDiv>
          </Row>
        </Container>
				
        <div>
          <SeeAll>
            <A href="#">See all videos and articles <FontAwesomeIcon icon='arrow-circle-right' size='1x' /></A>
          </SeeAll>
        </div>
      </Wrapper>
    </>
  )
}