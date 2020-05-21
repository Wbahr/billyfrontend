import React from 'react'
import styled from 'styled-components'

const Img = styled.img`
    width: 250px;
    height: 150px;
    object-fit: fill;
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
				<Img src={src} />
			</div>
			<TitleDiv>
				<Title>{title}</Title>
				<TittleDetail>{text}</TittleDetail>
			</TitleDiv>
		</>
	)
}
