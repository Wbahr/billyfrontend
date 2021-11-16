import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ServiceHomepageDiv = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 30px;
`
const ServiceHomepage = styled.a`
    margin: 0 5px;
    font-size: 14px;
    font-weight: bold;
    color: #555555;
`
const EngineeredSystemHomepage = styled.a`
    margin: 0 5px;
    font-size: 14px;
    font-weight: bold;
    color: #555555;
`
const ServiceName = styled.p`
    margin-bottom: 0;
    font-size: 14px;
    font-weight: bold;
    margin: 0 8px;
    color: #555555;
`
export default function service(props) {
    const {
        text,
    } = props
    return (
        <>
            <ServiceHomepageDiv>
                <FontAwesomeIcon icon='home' size="1x" color="#555555" />
                <ServiceHomepage href="/services">Services &#10095;</ServiceHomepage>
                <EngineeredSystemHomepage href="/services/engineered-systems-and-assemblies"> Engineered Systems & Assemblies &#10095;</EngineeredSystemHomepage>
                <ServiceName>{text}</ServiceName>
            </ServiceHomepageDiv>
        </>
    )
}
