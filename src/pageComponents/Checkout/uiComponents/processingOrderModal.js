import React, {useState, useRef, useEffect} from 'react'
import _ from 'lodash'
import Popup from 'reactjs-popup'
import styled from 'styled-components'
import LoadingRing from './loadingRing'


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

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default function ProcessingOrderModal() {
  const [timeElapsed, setTimeElapsed] = useState(0)
  const totalSeconds = 22
  useInterval(() => {
    setTimeElapsed(timeElapsed + .05)
  }, 50)

  return(
    <Popup open={true} closeOnDocumentClick={false} contentStyle={{'max-width': '350px', 'border-radius': '5px'}}>
      <Container>
        <LoadingRing
          complete={(timeElapsed/totalSeconds) >= .99 ? ((totalSeconds * 1000)* .99) : timeElapsed * 1000}
          totalSeconds={totalSeconds * 1000}
        />
        <h5>Processing Order... Please wait</h5>
        <p>You will be redirected to a confirmation screen upon completion.</p>
      </Container>
    </Popup>
  )
}