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
`

const InputSearch = styled.input`
	margin: 4px 16px;
	width: 240px;
`

export default function BrandFilter({brands, updatedBrandFilter}) {
	const [isOpen, setIsOpen] = useState(false)
	const [filter, setFilter] = useState('')
	const [brandFilterValues, setBrandFilterValues] = useState([])

	const handleFeatureToggle = (e, brand) => {
		const newBrandFilterValues = e.target.checked
			? [...brandFilterValues, brand]
			: brandFilterValues.filter(b => b !== brand)
		setBrandFilterValues(newBrandFilterValues)
		updatedBrandFilter(newBrandFilterValues)
	}
	
	const BrandOptions = () => (
		<DivOptions>
			{brands
				.filter(b => b.brandName !== 'null' && (!filter.length || b.brandName.toLowerCase().startsWith(filter)))
				.map((brand, idx) => (
					<DivOptionRow key={idx}>
						<input type="checkbox" onChange={(e) => handleFeatureToggle(e, brand.brandName)}/>
						<Label htmlFor={brand.brandName}>{brand.brandNameDisplay}</Label>
					</DivOptionRow>
			))}
		</DivOptions>
	)
	
	const handleSearchChange = e => {
		setFilter(e.target.value.toLowerCase())
	}

	return (
		<div>
			<DivTitle onClick={() => setIsOpen(!isOpen)}>
				<P>Brands</P>
				<FontAwesomeIcon icon={isOpen ? "caret-up" : "caret-down"} color="black"/>
			</DivTitle>
			{isOpen && 
				<>
					<div>
						{brands.length > 10 && (
							<InputSearch placeholder={'Search Brands'} onChange={handleSearchChange} value={filter}/>
						)}
					</div>
					
					<BrandOptions/>
				</>
			}
		</div>
	)
}

BrandFilter.propTypes = {
	brands: PropTypes.array.isRequired,
}