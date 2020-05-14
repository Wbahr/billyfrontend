import React from 'react'
import styled from 'styled-components'

const DistributorDetails = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;
`
export default function BrandDetail(props) {
	return (
		<DistributorDetails>{props.text}</DistributorDetails>
	)
}
