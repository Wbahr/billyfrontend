import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import _ from 'lodash'

const DivContainer = styled.div`
  position: relative;
  text-align: center;
  cursor: pointer;
  margin: 0 16px 16px 16px;
`

const DivImgWrapper = styled.div`
  width: 165px;
  height: 140px;
`

const DivLense = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  transform: translate(0%, -100%);
  background-image: linear-gradient(transparent, black);
  opacity: .8;
  &:hover{
    background-image: linear-gradient(transparent, #0056b3);
  }
`

const DivText = styled.div`
  position: absolute;
  transform: translate(50%, -300%);
  color: white;
`

function convertText(text){
  let mutatedText = text.toLowerCase()
  mutatedText = mutatedText.replace(/&\s/g,'') // remove &
  mutatedText = mutatedText.replace(/,\s/g, '') // remove ,
  mutatedText = mutatedText.replace(/[()]/g, '') // remove ( and )
  mutatedText = mutatedText.replace(/[/]/g, '-') // convert / to -
  mutatedText = mutatedText.replace(/\s/g, '-') // convert spaces to -
  return(mutatedText)
}

export default function CategoryImage({text,src,getChildGrid,history,selectedParent}) {

  function searchCategory(){
    let urlChildText = convertText(text)
    let urlParentText = convertText(selectedParent)
    history.push(`/search/categories/${urlParentText}/${urlChildText}`)
  }
  return(
    <DivContainer onClick={_.isNil(selectedParent) ? ()=>{getChildGrid()} : ()=>searchCategory()}>
      <DivImgWrapper>
        <img src={src} width='165px' height='140px'/>
      </DivImgWrapper>
      <DivLense />
      <DivText>
        {text}
      </DivText>
    </DivContainer>
  )
}