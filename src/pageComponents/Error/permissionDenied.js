import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 99;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  img {
    margin: 0 auto;
  }
  h1 {
    height: max-content;
    margin: 0 auto;
  }
  h4 {
    color: rgb(219,22,51);
  }
`

export default function PermissionDeniedPage() {

    return (
        <Container>
            <img src="https://airlinemedia.airlinehyd.com/Graphics/images/error_message_image.png" width="325px" />
            <h1>Permission Denied.</h1>
        </Container>
    )
}