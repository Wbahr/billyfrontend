import React from 'react'
import styled from 'styled-components'

const SmallArticlesContent = styled.div`
  display: flex
  flex-wrap: nowrap;
  max-width: 380px;
  margin-bottom: 30px;
`
const ArticlesContentDiv = styled.div`
  text-align: center;
  padding: 15px 0;
`
const ArticlesImgDiv = styled.div`
  max-width: 350px;
  padding: 20px;
  height: 300px;
  overflow: hidden;
`
const ArticlesTopic = styled.h6`
  color: #B51F2B;
  font-weight: bold;
  margin: 25px 15px;
  font-size: 18px;
  text-align: left;
`
const ArticlesShortLine = styled.div`
  display: flex;
  border-bottom: 2px solid #555555;
  width: 15%;
  margin: 25px 0 0;
  `
const ArticlesPicture = styled.img`
  width: 100%;
  min-height: 100%;
  object-fit: cover;
`
const ArticlesContentDetails = styled.p`
  margin: 0 15px;
  text-align: left;
  font-size: 14px;
`
const A = styled.a`
`
export default function Articles(props) {
    const {
        text,
        src,
        detail,
        Link,
    } = props

    return (
        <SmallArticlesContent>
            <ArticlesContentDiv>
                <ArticlesImgDiv>
                    <ArticlesPicture src={src} />
                </ArticlesImgDiv>
                <ArticlesTopic>
                    {text}
                    <ArticlesShortLine></ArticlesShortLine>
                </ArticlesTopic>
                <ArticlesContentDetails>{detail}</ArticlesContentDetails>
                <A href={Link} target="_blank">Read More >></A>
            </ArticlesContentDiv>
        </SmallArticlesContent>
    )
}
