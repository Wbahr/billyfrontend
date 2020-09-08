import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const DivTitle = styled.div`
	display: flex;
	cursor: pointer;
	width: 280px;
	height: 36px;
	padding: 0 16px;
	background-color: #f3f3f3;
	justify-content: space-between;
	align-items: center;
	margin-top: 8px;
`
const DivOptions = styled.div`
	display: flex; 
	flex-direction: column;
	max-height: 250px;
	overflow: scroll;
`

const DivOptionRow = styled.div`
	display: flex; 
	width: 250px;
	align-items: center;
	margin: 8px 0 0 24px;
`

const P = styled.p`
	margin: 0;
`

const Label = styled.label`
	margin: 0;
	color: #535353;
	font-size: 12px;
	margin-left: 4px;
	flex: 1;
`

const PCount = styled.p`
	margin: 0;
	color: #535353;
	font-size: 12px;
	margin-left: 4px;
`

const InputSearch = styled.input`
	margin: 4px 16px;
	width: 240px;
`

export default function AttributeFilter({open, attribute, updateAttribute}) {
	const [isOpen, setIsOpen] = useState(open)
	const toggleOpen = () => setIsOpen(!isOpen)
	const [filter, setFilter] = useState('')
	
	const handleFeatureClick = idx => ({target: {checked}}) => {
		const features = attribute.features.slice()
		features[idx].selected = checked
		updateAttribute({ ...attribute, features })
	}
	
	const searchFilter = f => f.featureName !== 'null' && (!filter.length || f.featureNameDisplay.toLowerCase().startsWith(filter))
	
	const AttributeOptions = () => (
		<DivOptions>
			{attribute.features
				.filter(searchFilter)
				.map(({selected, featureName, featureNameDisplay, featureCount}, idx) => (
					<DivOptionRow key={idx}>
						<input
							type="checkbox"
							checked={selected}
							onChange={handleFeatureClick(idx)}
						/>
						<Label htmlFor={featureName}>{featureNameDisplay}</Label>
						<PCount>({featureCount})</PCount>
					</DivOptionRow>
				))}
		</DivOptions>
	)

	const handleSearchChange = e => setFilter(e.target.value.toLowerCase())
	
	return (
		<div>
			<DivTitle onClick={toggleOpen}>
				<P>{attribute.attributeNameDisplay}</P>
				<FontAwesomeIcon icon={isOpen ? "caret-up" : "caret-down"} color="black"/>
			</DivTitle>
			{isOpen && (
				<>
					{attribute.features.length > 10 && (
						<InputSearch
							placeholder={`Search ${attribute.attributeNameDisplay}`}
							onChange={handleSearchChange}
							value={filter}
						/>
					)}
					<AttributeOptions/>
				</>
			)}
		</div>
	)
}

AttributeFilter.propTypes = {
	open: PropTypes.bool,
}
