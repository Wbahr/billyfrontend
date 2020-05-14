import React from 'react'
import styled from 'styled-components'
import { H4 } from './textH4'

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
//   border-bottom: 1px solid #ccc;
  margin: 30px 0 20px ;
  
`

const StyledHeaderDiv = styled.div`
//    border-bottom: 3px solid #DB1633;
   width: max-content;
   
}


`

class smallSectionHeader extends React.Component {
	render(){
		const {
			text
		} = this.props

		return(
			<Div>
				<StyledHeaderDiv>
					<H4>{text}</H4>
				</StyledHeaderDiv>
			</Div>
		)
	}
}

export default smallSectionHeader
