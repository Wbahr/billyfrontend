import React from 'react'
import styled from 'styled-components'
import { H1 } from '../H1'

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 30px 0 20px ;
`

const StyledHeaderDiv = styled.div`
   border-bottom: 3px solid #DB1633;
   width: max-content;

`

class PageHeader extends React.Component {
	render(){
		const {
			text
		} = this.props

		return(
      <Div>
        <StyledHeaderDiv>
          <H1>{text}</H1>
        </StyledHeaderDiv>
      </Div>
		)
	}
}

export default PageHeader;
