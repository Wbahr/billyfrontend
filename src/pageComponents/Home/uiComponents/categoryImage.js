import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import _ from 'lodash'

const DivContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 350px;
  height: 140px;
  cursor: pointer;
  margin: 0 16px 16px 16px;
  background-image: url('');
  background-color: grey;
  font-family: ProximaBold;
  font-size: 20px;
  color: white;
`

function convertText(text){
  let mutatedText = text.toLowerCase()
  mutatedText = mutatedText.replace(/&\s/g,'') // remove &
  mutatedText = mutatedText.replace(/\s/g, '-') // convert spaces to -
  return(mutatedText)
}

export default function CategoryImage({text,src,history}) {
  let urlText = convertText(text)
  return(
    <DivContainer onClick={()=>history.push(`/search/categories/${urlText}`)}>
      {text}
    </DivContainer>
  )
}