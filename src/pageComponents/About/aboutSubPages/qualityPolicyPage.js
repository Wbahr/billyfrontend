import React from 'react'
import styled from 'styled-components'
import Header from '../uiComponents/Header'

const MainContainer = styled.div`
    max-width: 1300px;
    margin: 50px auto;
    padding: 0 10px;
`
const DetailDiv = styled.div`
    display: flex;
    flex-direction: column;
    flex: 4;
`
const P = styled.p`
    margin-bottom: 0;
`
const Col = styled.div`
    display: flex;
    margin: 40px 0;
`
const InfoDiv = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    margin: 0 20px;
    background-color: #f2f3f4;
    padding: 40px;
`
const Info = styled.p`  
    color: #246696;
    font-weight: bold;
    text-align: center;
    margin-bottom: 5px;
    font-size: 17px;
`
const MoreInfo = styled.div`
    text-align: center;
    font-size: 17px;
`
const ClickHere = styled.a`
    color: #B51F2B;
`
const Span = styled.a`
    color: #B51F2B;
`
const Certification = styled.a`
    margin: 10px 0;
    color:  #246696;
`

export default function QualityPolicy() {
	return (
		<>
			<MainContainer>
				<Header text="Quality Policy"/>
				<Col>
					<DetailDiv>
						<P>Airline Hydraulics Corporation is committed to maintain a high level of customer satisfaction. We will achieve this goal through on-time delivery of high quality products and services, while promoting a continuous improvement environment supported by our Quality Program. We will assure consistent compliance with this policy through frequent communication and performance measurement.</P>
						<Certification href="#">Click to view our ISO 9001:2015 Certification</Certification>
					</DetailDiv>
					<InfoDiv>
						<Info>Need More Information?</Info>
						<MoreInfo><ClickHere href="#">Click Here</ClickHere> to contact an Airline representative, or call us at<Span href="tel:+18009997378"> (800) 999-7378</Span></MoreInfo>
					</InfoDiv>
				</Col>
			</MainContainer>
		</>
	)
}
