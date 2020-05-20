import React from 'react'
import styled from 'styled-components'

const SectionDiv = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  margin: 25px 0;
  align-items: center;
`
const SectionName = styled.div`
  font-size: 25px;
  color: #555555;
  text-transform: uppercase;
  letter-spacing: 2px;
  display: flex;
  flex-wrap: nowrap;
  margin-right: 20px;
  min-width: max-content;
`
const Border = styled.div`
  display: flex;
  border-bottom: 1px solid #555555;
  flex-grow: 99;
  `
export default function SectionHeader(props) {
	return (
		<SectionDiv>
			<SectionName>{props.text}</SectionName>
			<Border></Border>
		</SectionDiv>
	)
}
