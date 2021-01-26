import React from 'react'
import styled from 'styled-components'

const FramingDiv = styled.a`
    display: flex;
    flex-direction: column;
    width: 280px;
    margin: 20px;
		align-items: center;
    &:hover{
			transform: scale(1.1);
			transition: transform 400ms;
    }
`
const P = styled.p`
    margin-top: 10px;
    font-weight: bold;;
    font-size: 14px;
    color: #555555;
    padding: 0 15px;
`
export default function framing(props) {
    const {
        link,
        src,
        text,
    } = props
    return (
        <>
            <FramingDiv href={link} target="_blank">
                <div>
                    <img src={src} />
                </div>
                <P>{text}</P>
            </FramingDiv>
        </>
    )
}
