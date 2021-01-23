import React from 'react'
import Popup from 'reactjs-popup'
import styled from 'styled-components'

const Container = styled.div`
  display: flex; 
  flex-direction: column;
  align-items: center;
  h4 {
    font-family: ProximaBold;
  }
  p {
    font-family: Proxima;
    text-align: center;
  }
`

export default () => (
  <Popup open={true} closeOnDocumentClick={true} contentStyle={{ 'maxWidth': '350px', 'borderRadius': '5px' }}>
    <Container>
      <h5>Order Failed</h5>
      <p>Please Contact us at 1-800-999-7378.</p>
    </Container>
  </Popup>
)