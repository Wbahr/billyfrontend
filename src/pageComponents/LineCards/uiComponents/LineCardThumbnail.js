import React from 'react'
import styled from 'styled-components'

const ThumbnailImgDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 206px;
    width: 100%;
    padding: 20px;
    justify-content: center;
    box-shadow: 0px 2px 3px rgba(0,0,0,.13),
                            1px 2px 2px rgba(0,0,0,.1),
                            -1px -2px 2px rgba(0,0,0,.05);
`
const ThumbnailImg = styled.img`
	max-width: 160px;
    width: 100%;
`
const LineCardsNameDiv = styled.div`
    margin-top:5px;
    padding: 5px;
    display: flex;
`
const P = styled.p`
    font-weight: bold;
`
export default function LineCardThumbnail(props) {
			
    return (
        <>
            <ThumbnailImgDiv>
                <ThumbnailImg src={props.src} alt={props.alt} title={props.alt} />
            </ThumbnailImgDiv>
            <LineCardsNameDiv>
                <P>{props.text}</P>
            </LineCardsNameDiv>
        </>
    )
}
