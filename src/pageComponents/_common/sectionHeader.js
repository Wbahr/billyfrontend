import React from 'react'
import styled from 'styled-components'
import { H1 } from './text'

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 30px 0;
  align-items: center;
`
const StyledHeaderDiv = styled.div`
   border-bottom: 2px solid #DB1633;
   width: 10%;
`
export function sectionHeader({ text }) {
    return (
        <Div>
            <H1>{text}</H1>
            <StyledHeaderDiv/>
        </Div>
    )
}

export default sectionHeader
