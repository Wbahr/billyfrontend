import React from 'react'
import styled from 'styled-components'

const ImgDiv = styled.div`
  display: flex;
  flex: 1;
  max-width: 350px;
  height: 250px;
`
const Img = styled.img`
  width: 100%;
  object-fit: contain;
`
export default function ProductImg(props) {
    return (
       <ImgDiv>
            <Img src={props.src} />
       </ImgDiv>
    )
}
