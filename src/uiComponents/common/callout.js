import React from 'react'
import styled from 'styled-components'

const StyledMainCallout = styled.div`
   width: auto;
   height: auto;
   color: #003966;
   font-size: 18px;
   background: #eff8ff;
   border: 2px solid #246696;
   border-radius: 1px;
   padding: 18px;
`

class Callout extends React.Component {
  render(){
    const {
      text
    } = this.props

    return(
      <StyledMainCallout>
        {text}
      </StyledMainCallout>
    )
  }
}

export default Callout
