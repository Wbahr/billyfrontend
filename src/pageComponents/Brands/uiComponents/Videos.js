import React from 'react'
import styled from 'styled-components'


const Video = styled.div`
	display: flex;
	width: 380px;
	height: 250px;
	margin-bottom: 15px;
`
const ArticlesVideo = styled.iframe`
 width: 100%;
`

export default function Videos(props) {
    return (  
        <Video>
            <ArticlesVideo src={props.src} />
        </Video>	 
    )
}
