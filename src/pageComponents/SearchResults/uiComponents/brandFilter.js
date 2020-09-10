import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const DivTitle = styled.div`
	display: flex;
	cursor: pointer;
	width: 280px;
	height: 36px;
	padding: 0 16px;
	background-color: #f3f3f3;
	color: white;
	font-weight: 600;
	letter-spacing: .1px;
	background-image: linear-gradient(to bottom right, rgb(219,22,51), #961427);
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

export default function BrandFilter({brands, setBrands}) {
	const [isOpen, setIsOpen] = useState(true)
	const [filter, setFilter] = useState('')

	const handleFeatureToggle = idx => ({target: {checked}}) => {
		const newBrands = brands.slice()
		newBrands[idx].selected = checked
		setBrands(newBrands)
	}
	
	const searchFilter = b => b.brandName !== 'null' && (!filter.length || b.brandName.toLowerCase().startsWith(filter))
	
	const toOption = ({selected, brandName, brandNameDisplay, brandCount}, idx) => (
		<DivOptionRow key={idx}>
			<input
				type="checkbox"
				checked={selected}
				onChange={handleFeatureToggle(idx)}
			/>
			<Label htmlFor={brandName}>{brandNameDisplay}</Label>
			<PCount>({brandCount})</PCount>
		</DivOptionRow>
	)
	
	const searchSortAndMapToOption = (accum, curVal, idx) => {
		if (searchFilter(curVal)) {
			if (curVal.selected) {
				accum.unshift(toOption(curVal, idx))
			} else {
				accum.push(toOption(curVal, idx))
			}
		}
		return accum
	}
	
	const BrandOptions = () => (
		<DivOptions>
			{brands.reduce(searchSortAndMapToOption, [])}
		</DivOptions>
	)
	
	const handleSearchChange = e => setFilter(e.target.value.toLowerCase())

	return (
		<div>
			<DivTitle onClick={() => setIsOpen(!isOpen)}>
				<P>Brands</P>
				<FontAwesomeIcon icon={isOpen ? "caret-up" : "caret-down"} color="black"/>
			</DivTitle>
			{isOpen && 
				<>
					{brands.length > 10 && (
						<InputSearch
							placeholder="Search Brands"
							onChange={handleSearchChange}
							value={filter}
						/>
					)}
					<BrandOptions/>
				</>
			}
		</div>
	)
}

BrandFilter.propTypes = {
	brands: PropTypes.array.isRequired,
}