import React from 'react'
import styled from 'styled-components'

const ImgDiv = styled.div`
		width: 250px;
		// height: 150px;
`
const Img = styled.img`
    width: 100%;
    object-fit: contain;
`
const TitleDiv = styled.div`
    padding: 10px 20px;
`
const Title = styled.p`
    font-weight: bold;
    font-size: 18px;
    text-align: center;
    color: #555555;
`
const TittleDetail = styled.p`
    color: black;
    font-size: 14px;
`
export default function engineerSystemsServices(props) {
	const {
		src,
		title,
		text, 
	} = props
	return (
		<>
			<div>
				<ImgDiv><Img src={src} /></ImgDiv>
			</div>
			<TitleDiv>
				<Title>{title}</Title>
				<TittleDetail>{text}</TittleDetail>
			</TitleDiv>
		</>
	)
}
