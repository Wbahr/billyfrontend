import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const RelatedLinkCircle = styled.div`
  margin: 0 auto;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
 `
const LinkStyleDiv = styled.div`
  display: flex;
  justify-content: center;
  height: 200px;
  width: 200px;
`
const LinkStyle = styled.a`
  color: #246696;
  font-size: 16px;
  position: absolute;
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
  padding: 0 15px;
  background-color: #f2f3f4;
  width: 200px;
  height: 200px;    
  border-radius: 50%;
  &:hover{
    color: #133752 ;
    text-decoration: none;
  }
 `
const FontAwesomeDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 20px;
  color: #DB1633;
  &:hover{
  color: #555555;
  }
`
export default function RelatedLink(props) {
	const {
		href,
		icon,
		text,
	} = props
	return (
		<RelatedLinkCircle>
			<LinkStyleDiv>
				<LinkStyle href={href} target="_blank" rel="noopener noreferrer">
					<FontAwesomeDiv>
						<FontAwesomeIcon icon={icon} size='4x' />
					</FontAwesomeDiv>
					{text}</LinkStyle>
			</LinkStyleDiv>
		</RelatedLinkCircle>
	)
}
