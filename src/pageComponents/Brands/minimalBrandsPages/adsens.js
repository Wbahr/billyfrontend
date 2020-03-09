import React, { useState, useContext } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import Context from '../../../config/context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const PageContainer = styled.div`
    max-width: 1200px;
    width: 100%;
`;
const BrandHeaderDiv = styled.div`
    margin: 0 auto;
`;

const BrandHeaderH1 = styled.h1`
    font-weight: bold;
`;


const BrandDetailsDiv = styled.div`
    display: flex;
    flex-wrap: nowrap;
`;
const BrandLogo = styled.img`

`;
 
const BrandDetails = styled.p`

`;

const BrandNameSpan = styled.span`
    color: red;
    font-size: 16px;
    font-weight: bold;
`;


export default function AcmeElectric() {
    return (
        <PageContainer>
            <BrandHeaderDiv>
                <BrandHeaderH1>Acme AcmeElectric</BrandHeaderH1>
            </BrandHeaderDiv>

        <BrandDetailsDiv>
            <BrandLogo src="https://www.powermotionsales.com/wp-content/uploads/2018/01/AcmeElectric.png"></BrandLogo>
            <BrandDetails>
            <BrandNameSpan>Acme Electric</BrandNameSpan> is a manufacturer of dry-type distribution transformers that for decades has covered a full spectrum of applications including general commercial power distribution, high harmonic conditions, specific industrial motor drive/factory automation systems and low-voltage landscape lighting.
            </BrandDetails>
        
        </BrandDetailsDiv>
        

        </PageContainer>





    )
}