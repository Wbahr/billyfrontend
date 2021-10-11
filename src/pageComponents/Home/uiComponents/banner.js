import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const BannerContainer = styled.div`
	display: flex;
	flex-direction: column;
`
const Col = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 10px;
`
const Img = styled.img`
	max-width: 80%;
`
const LgBanner = styled.div`
	display: flex;
	background-image: url(${props => props.large});
	height: 300px;
	background-color: #464646;
	background-size: cover;
	background-position: 50% 0;
	background-repeat: no-repeat;
	@media (max-width: 768px) {
		background-image: url(${props => props.medium});
		height: 240px;
	}
	@media (max-width: 400px) {
		background-image: url(${props => props.small});
		height: 190px;
	}
`
const LgImg = styled.img`
	width: 100%;
`
const SmBanner = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	margin: 15px 0;
	justify-content: center;
`
const BannerDiv = styled.div`
	display: flex;
	flex-wrap: wrap;
	background-color: #f2f3f4;
	justify-content: center;
	padding: 10px 20px;
	margin: 10px;
`
const P = styled.p`
	margin: 0;
	font-size: 16px;
	max-width: 100%;
	padding: 10px;
	@media (max-width: 800px) {
		font-size: 16px;
	}
`
const AboutAirline = styled.div`
	width: 240px;
	font-size: 14px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	@media (max-width: 800px) {
		width: 250px;
		font-size: 14px;
		text-align: center;
	}
`
const ImgDiv = styled.div`
	width: 120px;
	display: flex;
	align-items: center;
	justify-content: center;
	@media (max-width: 800px) {
		width: 100px;
		padding: 10px;
	}
`
const AboutP = styled.p`
    margin: 0;
    font-size: 20px;
	color: #B51F2B;
	@media (max-width: 800px) {
		font-size: 18px;
	}
`
const A = styled.a`
		color: black;
		&:hover{
			text-decoration: none;
		}
`

const key = 'ABOUT_SECTION'

export default function Banner({ homepage }) {

    const items = homepage.filter(h => h.key === key)
    const topBanner = homepage.filter(h => h.key === 'TOP_BANNER')
  
    const large = topBanner.filter(b => b.sort === 1)[0].imageUrl
    const medium = topBanner.filter(b => b.sort === 2)[0].imageUrl
    const small = topBanner.filter(b => b.sort === 3)[0].imageUrl
    const href = topBanner[0].Href
    
    const aboutSection = items.map(i => {
        return (
            <A href={i.href} key={i.sort} target="_blank">
                <BannerDiv>
                    <ImgDiv>
                        {i.imageUrl.slice(0, 4) === 'http' ?
                            <Img src={i.imageUrl} alt="otto" /> :
                            <FontAwesomeIcon icon={i.imageUrl} size='3x' />
                        }
                    </ImgDiv>
                    <AboutAirline>
                        <AboutP>{i.title}</AboutP>
                        <P>{i.html}</P>
                    </AboutAirline>
                </BannerDiv>
            </A>
        )
    })

    return (
        <BannerContainer>
            <Col>
                <A href={href} target="_blank">
                    <LgBanner {...{ large, medium, small, }} />
                </A>
                <SmBanner>
                    {aboutSection}
                </SmBanner>
            </Col>
        </BannerContainer>
    )
}