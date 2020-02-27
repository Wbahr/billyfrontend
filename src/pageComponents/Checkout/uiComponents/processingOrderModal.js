import React, {useState, useRef, useEffect} from 'react'
import _ from 'lodash'
import Popup from 'reactjs-popup'
import styled from 'styled-components'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Loader from '../../_common/loader'
import Context from '../../../config/context'
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
// const Table = styled.table`
//   margin: 0 16px;
//   table-layout: fixed;
//   width: 90%;
// `

// const TR = styled.tr`
//   border-top: 1px lightgrey solid;
//   border-bottom: 1px lightgrey solid;
// `

// const TDGrey = styled.td`
//   padding: 4px 8px 4px 24px;
//   font-weight: 500;
//   background-color: whitesmoke;
// `

// const TDWhite = styled.td`
// padding: 4px 24px 4px 8px;
// `

// const Div = styled.div`
//   display: flex;
//   flex-direction: column;
//   p {
//     text-align: center;
//   }
// `
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