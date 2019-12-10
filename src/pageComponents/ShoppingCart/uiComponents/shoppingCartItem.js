import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import _ from 'lodash'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const DivContainer = styled.div`
  display: flex;
`

export default function ShoppingCartItem({item}) {
  return(
    <DivContainer>
      <p>{item.freqno}</p>
    </DivContainer>
  )
}