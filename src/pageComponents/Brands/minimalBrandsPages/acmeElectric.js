import React, { useState, useContext } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import Context from '../../../config/context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube, faFontAwesome } from '@fortawesome/free-brands-svg-icons'


const PageContainer = styled.div`
    max-width: 1200px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    // background-color: #ebe7e7;
`;
const BrandHeaderDiv = styled.div`
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    margin-top: 47px;
    
`;

const BrandHeaderH1 = styled.h1`
    font-weight: bold;

`;

const ShortLine = styled.div`
  display: flex;
  border-bottom: 2px solid #555555;
  width: 20%;
  margin: 0 auto;
  margin-top: 20px;
 
  
  `;

const BrandDetailsDiv = styled.div`
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    height: 204px;
`;
const BrandLogo = styled.img`
    margin: 0 10px;
    height: 98%;
`;

const BrandDetails = styled.p`
    width: 63%;
    `;

const BrandNameSpan = styled.span`
    font-size: 20px;
    font-weight: bold;
`;



const LinkDetailDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  color: #DB1633;
  margin: 0 30px;
//   position: relative;
  &:hover{
  color: #555555;   
`


const Div = styled.div`
    display: flex;
    flex-wrap: nowrap; 
    justify-content: center;
    width: 100%;
    margin-top: 40px;
`;
const IconDiv = styled.div`
display: flex;
  justify-content: center;
  color: #555555;
  padding-bottom: 10px;
  &:hover{
  color: #DB1633 ;
    
  }
`;

const LinkStyleDiv = styled.div`
  display: flex;
  justify-content: center;
  
`;

const LinkStyle = styled.a`
color: #246696;
  font-size: 12px;
  text-transform: capitalize;
  font-weight: bold;
  text-align: center;
  &:hover{
    color: #133752 ;
    text-decoration: none;
  }
 
`;

const RelatedLinkDiv = styled.div`
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    // margin-top: 47px;
    
`;

const RelatedLinkH6 = styled.h6`
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;

`;
export default function AcmeElectric() {
    return (
        <PageContainer>
            <BrandHeaderDiv>
                <BrandHeaderH1>Acme Electric</BrandHeaderH1>
                <ShortLine></ShortLine>
            </BrandHeaderDiv>

            <BrandDetailsDiv>
                <BrandLogo src="https://www.powermotionsales.com/wp-content/uploads/2018/01/AcmeElectric.png"></BrandLogo>
                <BrandDetails>
                    <BrandNameSpan>Acme Electric</BrandNameSpan> is a manufacturer of dry-type distribution transformers that for decades has covered a full spectrum of applications including general commercial power distribution, high harmonic conditions, specific industrial motor drive/factory automation systems and low-voltage landscape lighting.
            </BrandDetails>
            </BrandDetailsDiv>

            <RelatedLinkDiv>
                <RelatedLinkH6>Related Links</RelatedLinkH6>
              <ShortLine></ShortLine>
            </RelatedLinkDiv> 

            

            <Div>
                <LinkDetailDiv>
                    <LinkStyleDiv>
                        <LinkStyle href="https://www.hubbell.com/acmeelectric/en/" target="_blank">
                            <IconDiv>
                                <FontAwesomeIcon icon='globe-americas' size='2x' />
                            </IconDiv>
                            Acme Electric's Website</LinkStyle>
                    </LinkStyleDiv>
                </LinkDetailDiv>

                <LinkDetailDiv>
                    <LinkStyleDiv>
                        <LinkStyle href="#" target="_blank">
                            <IconDiv>
                            <FontAwesomeIcon icon='shopping-cart' size='2x' />
                            </IconDiv>
                            Shop Acme Electric Products</LinkStyle>
                    </LinkStyleDiv>
                </LinkDetailDiv>


                <LinkDetailDiv>
                    <LinkStyleDiv>
                        <LinkStyle href="#" target="_blank">
                            <IconDiv>
                            <FontAwesomeIcon icon='address-book' size='2x' />
                            </IconDiv>
                            Acme Electric Catalogs</LinkStyle>
                    </LinkStyleDiv>
                </LinkDetailDiv>
            </Div>
        </PageContainer>





    )
}

