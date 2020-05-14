import React from 'react'
import styled from 'styled-components'

const BannerPic = styled.img`
  width: 250px;
`
export default function BannerImg(props) {
	return (
		<BannerPic src={props.src}/>
	)
}
