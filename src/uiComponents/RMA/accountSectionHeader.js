import React from 'react'
import styled from 'styled-components'

const Header = styled.div`
   width: 100%;
   height: 32px;
   color: #DB1633;
   font-size: 18px;
   padding: 10px 0;
   border-bottom: 1px solid #ccc;
`

class accountSectionHeader extends React.Component {
  render(){

    return(
      <Header>
        <p>RMA - Return Management Account</p>
      </Header>
    )
  }
}

export default accountSectionHeader
