import React, {useState, useRef} from 'react'
import _ from 'lodash'
import Popup from 'reactjs-popup'
import styled from 'styled-components'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Loader from '../../_common/loader'
import Context from '../../../config/context'

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

export default function ProcessingOrderModal() {
  
  return(
    <Popup>
      <p>Processing Order... Please wait</p>
      <p>You will be redirected to a confirmation screen upon completion.</p>
    </Popup>
  )
}