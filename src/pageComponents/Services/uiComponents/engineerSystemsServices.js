import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'

const ImgDiv = styled.div`
    width: 450px;
`
const Img = styled.img`
    width: 100%;
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
            <ImgDiv>
                <Img src={src} />
            </ImgDiv>
            <TitleDiv>
                <Title>{title}</Title>
                <TittleDetail>{text}</TittleDetail>
            </TitleDiv>
        </>
    )
}
