import React from 'react'
import styled from 'styled-components'

const DivContainer = styled.div`
    display flex;
    flex-direction: column;
  `

const P = styled.p`
   font-family: verdana;
   width: 300px;
   // height: 32px;
   font-size: 16px;
   padding-left: 8px;
   padding-bottom: 6px;
   border-bottom: 1px #191919 solid;
   // margin: 12px 0; 
   color: #191919;
`

const Label = styled.label`
  font-family: verdana;
  color: #111;
  font-size: 13px;
  padding-left: 2px;
  font-weight: 700;
`

class Input extends React.Component {

	render(){
		const {
			value,
			label,
		} = this.props

		return(
			<DivContainer>
				{label && <Label for={label}>{`${label}:`}</Label>}
				<P>{value}</P>
			</DivContainer>
		)
	}
}

export default Input
