import React from 'react'
import styled from 'styled-components'

const Banner = styled.div`
		background: ${(props) => props.bgColor};
		padding: 8px;
		text-align: center;
		color: white;
`

const Message = styled.div`
    font-size: 12px;
	margin: 0;
`

const styleOptions = {
    Notice: '#007BFF',
    Alert: '#B51029'
}

export default function AnnounceBanner(props) {
    const { alert } = props
    console.log(alert)
    return (
        <Banner bgColor={styleOptions[alert.style]}>
            <Message dangerouslySetInnerHTML={{ __html: alert.noteHtml }} />
        </Banner>
    )
}