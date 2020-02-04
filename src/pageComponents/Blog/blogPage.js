import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import _ from 'lodash'

const DivContainer = styled.div`
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  flex-grow: inherit;
`

export default function BlogPage({history}) {

  return(
    <DivContainer>
      <p>insert blog here</p>
    </DivContainer>
  )
}