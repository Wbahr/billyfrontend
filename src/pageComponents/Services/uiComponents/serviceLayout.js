import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'

const Div = styled.div`
    display: flex;
    width: 280px;
    margin: 12px;
`
const ImgDiv = styled.div`
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
const Span = styled.span`
    font-weight: bold;
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
                <ImgDiv>
                    <Img src={src} />
                    <DetailDiv>
                        <Detail><Span>{title} </Span> {text}</Detail>
                    </DetailDiv>
                </ImgDiv>
            </Div>
        </>
    )
}
