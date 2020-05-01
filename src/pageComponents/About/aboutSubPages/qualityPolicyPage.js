import React from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import Header from '../uiComponents/Header'

const MainContainer = styled.div`
    width: 1300px;
    margin: 0 auto;
    padding: 0 10px;
`

const DetailDiv = styled.div`
    margin: 40px 0;
`
const P = styled.p`
    margin-bottom: 0;
`


export default function QualityPolicy() {
    return (
        <MainContainer>
            <Header text="Quality Policy"/>
            <Col>
            <DetailDiv>
                <P>Airline Hydraulics Corporation is committed to maintain a high level of customer satisfaction. We will achieve this goal through on-time delivery of high quality products and services, while promoting a continuous improvement environment supported by our Quality Program. We will assure consistent compliance with this policy through frequent communication and performance measurement.</P>
            </DetailDiv>
            <InfoDiv>
                <Info>Need More Information?</Info>
                <MoreInfo></MoreInfo>
            </InfoDiv>
            </Col>
        </MainContainer>
    )
}
