import React from 'react'
import styled from 'styled-components'
import { H2 } from './text'

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 40px 0;
  align-items: center;
`
const StyledHeaderDiv = styled.div`
   border-bottom: 2px solid #DB1633;
   width: 10%;
`
class sectionHeader extends React.Component {
  render(){
    const {
      text
    } = this.props

    return (
      <Div>
        <H2>{text}</H2>
        <StyledHeaderDiv>
        </StyledHeaderDiv>

      </Div>
    )
  }
}

export default sectionHeader
