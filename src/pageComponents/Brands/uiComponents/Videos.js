import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'


const Video = styled.div`
  display: flex;
  width: 380px;
  height: 250px;
  margin-bottom: 15px;
`
const ArticlesVideo = styled.iframe`
 width: 100%;
`
const Container = styled.div`
    display: flex
`
export default function Videos(props) {
    return (
        
          <Video><ArticlesVideo src={props.src}></ArticlesVideo></Video>
     
    )
}
