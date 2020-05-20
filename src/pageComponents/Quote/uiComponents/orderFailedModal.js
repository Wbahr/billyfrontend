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

export default function QuoteFailedModal() {

	return(
		<Popup open={true} closeOnDocumentClick={true} contentStyle={{'maxWidth': '350px', 'borderRadius': '5px'}}>
			<Container>
				<h5>Quote Failed</h5>
				<p>Please call Zach Linsell.</p>
			</Container>
		</Popup>
	)
}