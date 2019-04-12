import React from 'react'
import styled from 'styled-components'

const Header = styled.div`
   width: 100%;
   height: 36px;
   border-bottom: 1px solid #ccc;
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
      <Header>
        <StyledHeaderText>{text}</StyledHeaderText>
      </Header>
    )
  }
}

export default accountSectionHeader
