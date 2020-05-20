import React from 'react'
import styled from 'styled-components'

const HeaderDetail = styled.div`
`
const Detail = styled.p`
`
export default function subDetail(props) {
	const {
		text,
	} = props
	return (
		<>
			<HeaderDetail>
				<Detail>{text}</Detail>
			</HeaderDetail>
		</>
	)
}
