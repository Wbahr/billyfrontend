import React from 'react'
import styled from 'styled-components'

const StyledHeaderDiv = styled.div`
   width: 100%;
   height: 36px;
   border-bottom: 1px solid #ccc;
   margin-bottom: 16px;
`
const StyledHeaderText = styled.p`
   color: #DB1633;
   font-family: verdana;
   font-size: 18px;
   font-weight: bold;
   padding: 8px 0 8px 8px;
`
class accountSectionHeader extends React.Component {
  render(){
    const {
      text
    } = this.props

    return(
      <StyledHeaderDiv>
        <StyledHeaderText>{text}</StyledHeaderText>
      </StyledHeaderDiv>
    )
  }
}

export default accountSectionHeader
