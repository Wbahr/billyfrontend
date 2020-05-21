import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
    display: flex;
    width: 280px;
    margin: 12px;
`
const Img = styled.img`
    width: 100%;
`
const DetailDiv = styled.div`
    padding: 15px 15px;
    background-color: #f2f3f4;
    height: 240px;
`
const Detail = styled.p`
    font-size: 13px;
`
const Span = styled.p`
		font-weight: bold;
		margin-bottom: 5px;
		font-size: 13px;
`
export default function serviceLayout(props) {
	const {
		src,
		title,
		text,
	} = props
	return (
		<>
			<Div>
				<div>
					<Img src={src} />
					<DetailDiv>
						<Span>{title} </Span>
						<Detail> {text}</Detail>
					</DetailDiv>
				</div>
			</Div>
		</>
	)
}
