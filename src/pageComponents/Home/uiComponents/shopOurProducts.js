import React from 'react'
import styled from 'styled-components'
import SectionHeader from '../../_common/sectionHeader.js'
import CategoryGrid from './categoryGrid'

const Div = styled.div`
	display: flex;
	justify-content: center;
	// margin-bottom: 20px;
 
`

export default function ShopOurProducts(props) {

	return (
		<>
			<div>
				<div>
					<SectionHeader
						text='Shop by Categories'
					/>
				</div>
				<Div>
					<CategoryGrid
						history={props.history}
					/>
				</Div>
			</div>
		</>
	)
}