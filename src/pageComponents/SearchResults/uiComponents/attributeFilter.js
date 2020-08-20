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
`

const InputSearch = styled.input`
	margin: 4px 16px;
	width: 240px;
`

export default function AttributeFilter({categoryAttribute, open, checkedAttributeFilters, setCheckedAttributeFilters}) {
	const [isOpen, setIsOpen] = useState(open)
	const toggleOpen = () => setIsOpen(!isOpen)
	const [filter, setFilter] = useState('')
	const [attribute, setAttribute] = useState(null)

	useEffect(() => {
		const inputAttribute = checkedAttributeFilters.find(attr => attr.field === categoryAttribute.categoryName)
		setAttribute({
			field: categoryAttribute.categoryName,
			values: inputAttribute?.values || []
		})
	}, [categoryAttribute, checkedAttributeFilters])

	const handleFeatureToggle = (e, option) => {
		//Add or remove the feature from the field category, depending on the checked status.
		const newAttribute = {
			...attribute,
			values: e.target.checked
				? [...new Set([...attribute.values, option.featureName])]
				: attribute.values.filter(val => val !== option.featureName)
		}
		//Create a new array with all the attribute category filter selections.
		//Temporarily remove this attribute category
		//Re-add the new category attribute values if any features of the category are
		//selected for filtering
		const newCheckedAttributeFilters = checkedAttributeFilters
			.filter(f => f.field !== newAttribute.field)
			.concat(newAttribute.values.length ? newAttribute : [])
		
		setCheckedAttributeFilters(newCheckedAttributeFilters)
	}

	const AttributeOptions = () => (
		<DivOptions>
			{
				categoryAttribute.features
					.filter(f => f.featureName !== 'null' && (!filter.length || f.featureNameDisplay.toLowerCase().startsWith(filter)))
					.map((feature, idx) => (
						<DivOptionRow key={idx}>
							<input
								type="checkbox"
								checked={attribute && attribute.values.includes(feature.featureName)}
								onChange={(e) => handleFeatureToggle(e, feature)}
							/>
							<Label htmlFor={feature.featureName}>{feature.featureNameDisplay}</Label>
						</DivOptionRow>
					))
			}
		</DivOptions>
	)

	const handleSearchChange = (e) => {
		setFilter(e.target.value.toLowerCase())
	}
	
	return (
		<div>
			<DivTitle onClick={toggleOpen}>
				<P>{categoryAttribute.categoryNameDisplay}</P>
				{isOpen ?  <FontAwesomeIcon icon="caret-up" color="black"/> : <FontAwesomeIcon icon="caret-down" color="black"/>}
			</DivTitle>
			{isOpen && 
				<>
					<div>
						{categoryAttribute.features.length > 10 && (
							<InputSearch placeholder={`Search ${categoryAttribute.categoryNameDisplay}`} onChange={handleSearchChange} value={filter}/>
						)}
					</div>
					
					<AttributeOptions/>
				</>
			}
		</div>
	)
}

AttributeFilter.propTypes = {
	categoryAttribute: PropTypes.object.isRequired,
	open: PropTypes.bool,
}
