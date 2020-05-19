import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'

const HeaderDetail = styled.div`
    display: flex;
    flex-direction: column;
`
const Detail = styled.p`
`
const Title = styled.p`
    font-weight: bold;
`
export default function productLayout(props) {
    const {
        text,
        title,
    } = props
    return (
        <>
            <HeaderDetail>
                 <Title>{title}</Title>
                <Detail>{text}</Detail>
            </HeaderDetail>
        </>
    )
}
