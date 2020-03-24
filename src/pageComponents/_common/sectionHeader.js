import React from 'react'
import styled from 'styled-components'
import { H2 } from './text'

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: 1px solid #ccc;
  margin: 40px 0;
`

const StyledHeaderDiv = styled.div`
   border-bottom: 3px solid #DB1633;
   width: max-content;
`

class sectionHeader extends React.Component {
	render(){
		const {
			text
		} = this.props

		return(
      <Div>
        <StyledHeaderDiv>
          <H2>{text}</H2>
        </StyledHeaderDiv>
      </Div>
		)
	}
}

export default sectionHeader
