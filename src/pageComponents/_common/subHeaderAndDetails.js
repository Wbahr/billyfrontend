import React from 'react'
import styled from 'styled-components'

const Header = styled.div`  
    margin-top: 40px;
`
const H5 = styled.h5`
    font-weight: bold;
    color: #555555;
`
export default function subHeaderAndDetails(props) {
    const {
        text,
        details,
    } = props
    return (
        <Header>
            <H5>{text}</H5>
            <p>{details}</p>
        </Header>
    )
}
