import React, { useState } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { buildSearchString } from 'pageComponents/_common/helpers/generalHelperFunctions'

const ImgDiv = styled.div`
	display: flex;
	flex: 1;
	justify-content: center;
	height: 250px;
`

const Img = styled.img`
	width: 100%;
	max-width: 180px;
	object-fit: contain;
`

const ProductsDetails = styled.div`
	display: flex;
	flex-wrap: wrap;
	font-size: 16px;
	margin: 0px 30px 0 30px;
	align-content: center;
	flex-direction: column;
	flex: 2;
`

const ProductsH4 = styled.a`
	margin: 0 auto;
	color: 	#000000;
	margin-bottom: 15px;
	font-size: 24px;
	font-weight: bold;
	&:hover{
		color: #b51029;
		text-decoration: none;
	}
`

const ShopProducts = styled.a`
	color: #246696;
	font-size: 14px;
	margin-top: 10px;
`

const ShowMoreBtn = styled.button`
	font-size: 14px;
	border: none;
	border-radius:2em;
	padding: 4px 10px;
	outline: none;
	background-color: #f2f3f4;
	text-align: left;
`

const ProductsDiv = styled.div`
display: flex;  
flex-wrap: nowrap;
margin: 20px 0 20px 0;
background-color:  #f2f3f4;
padding: 15px;
width: 100%;
flex-direction: ${ props => props.reverse ? 'row-reverse' : 'row'}; 
`

export default function ProductItems(props) {
    const [showText, setShowText] = useState(false)
    const {
        text,
        src,
        additionalText,
        title,
        reverse,
        searchTerm,
        learnMoreLink,
    } = props
		
    const searchItem = { searchTerm: searchTerm + ' ' + title }
    const searchForItem = buildSearchString(searchItem)

    return (
        <ProductsDiv reverse={reverse}>
            <ImgDiv><Img src={src} /></ImgDiv>
            <ProductsDetails>
                <ProductsH4 href={learnMoreLink ? learnMoreLink : searchForItem } target="_blank">{title}</ProductsH4>
                {text}
                {(additionalText) &&
                    <ShowMoreBtn onClick={() => setShowText(!showText)}>{showText ? <><FontAwesomeIcon icon='minus-circle' size='1x' /> Show Less </> : <><FontAwesomeIcon icon='plus-circle' size='1x' /> Show More  </>}</ShowMoreBtn>
                }
                {showText && additionalText}
                <ShopProducts href={learnMoreLink ? learnMoreLink : searchForItem } target="_blank"><FontAwesomeIcon icon='arrow-circle-right' size='1x' /> {learnMoreLink ? 'Learn more and Shop for' : 'Shop for'} {title}</ShopProducts>
            </ProductsDetails>
        </ProductsDiv>

    )
}
