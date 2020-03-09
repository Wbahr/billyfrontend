import React from 'react'
import _ from 'lodash'
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

export default function OrderFailedModal() {

  return(
    <Popup open={true} closeOnDocumentClick={true} contentStyle={{'max-width': '350px', 'border-radius': '5px'}}>
      <Container>
        <h5>Order Failed</h5>
        <p>Please Contact us at 1-800-999-7378.</p>
      </Container>
    </Popup>
  )
}