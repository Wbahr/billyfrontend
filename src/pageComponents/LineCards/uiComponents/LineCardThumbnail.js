import React from 'react'
import styled from 'styled-components'

const ThumbnailImgDiv = styled.div`
    width: 206px;
    height: 267px;
    box-shadow: 0px 2px 3px rgba(0,0,0,.13),
                1px 2px 2px rgba(0,0,0,.1),
                -1px -2px 2px rgba(0,0,0,.05) ;

`
const ThumbnailImg = styled.img`
    width: 100%;
`
const LineCardsNameDiv = styled.div`
    margin-top:5px;
    padding: 5px;
`
const P = styled.p`
`
export default function LineCardThumbnail(props) {
      
    return (
        <>
            <ThumbnailImgDiv>
                <ThumbnailImg src={props.src} />
            </ThumbnailImgDiv>
            <LineCardsNameDiv>
                <P>{props.text}</P>
            </LineCardsNameDiv>
        </>
    )
}
