import React, { useState } from 'react'
import Popup from 'reactjs-popup'
import styled from 'styled-components'
import LoadingRing from '../../_common/loadingRing'
import { useInterval } from '../../_common/helpers/generalHelperFunctions'


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

export default function ProcessingOrderModal(props) {
    const { isQuote } = props
    const [timeElapsed, setTimeElapsed] = useState(0)
    const totalSeconds = 8
    useInterval(() => {
        setTimeElapsed(timeElapsed + .05)
    }, 50)

    return (
        <Popup open={true} closeOnDocumentClick={false} contentStyle={{ maxWidth: '350px', borderRadius: '5px' }}>
            <Container>
                <LoadingRing
                    complete={(timeElapsed/totalSeconds) >= .99 ? ((totalSeconds * 1000)* .99) : timeElapsed * 1000}
                    totalSeconds={totalSeconds * 1000}
                />
                <h5>Processing {isQuote ? 'Quote' : 'Order'}... Please wait</h5>
                <p>You will be redirected to the confirmation screen in a moment.</p>
            </Container>
        </Popup>
    )
}