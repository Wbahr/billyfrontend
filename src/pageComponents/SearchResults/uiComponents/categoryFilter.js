import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusSquare } from '@fortawesome/free-regular-svg-icons'
import Loader from '../../_common/loader'
import {Category as CategoryIcon} from '@material-ui/icons';
import clsx from "clsx";

const DivTitle = styled.div`
	display: flex;
	cursor: pointer;
	width: 281px;
	height: 36px;
	padding: 0 12px;
	background-color: #f3f3f3;
	color: white;
	font-weight: 600;
	letter-spacing: .1px;
	background-image: linear-gradient(to bottom right, rgb(219,22,51), #961427);
	justify-content: space-between;
	align-items: center;
`

const DivRow = styled.div`
	display: flex;
	flex: 1;
	align-items: center;
`

const DivOption = styled.div`
	display: flex;
	flex-direction: column;
	margin: 4px 0;
`

const DivOptionRow = styled.div`
	display: flex; 
	align-items: center;
	margin: 4px 0;
`

const P = styled.p`
	margin: 0;
`

const Acategory = styled.p`
	cursor: pointer;
	margin: 0 4px 0 0;
	color: #535353;
	font-size: 12px;
	:hover{
		color: #0056b3;
	}
`

const PCount = styled.p`
	margin: 0 4px 0 0;
	color: #535353;
	font-size: 12px;
`

const Row = styled.div`
	display: flex;
`

const CategoriesDiv = styled.div`
	margin-left: 48px;
`

export default function CategoryFilter({isSearching, parentCategories, childCategories, setParentCategories, setChildCategories, classes, drawerOpen}) {
	const [isOpen, setIsOpen] = useState(true)
	const selectedParentIdx = parentCategories.findIndex(category => category.selected)
	const selectedChildIdx = (childCategories || []).findIndex(category => category.selected)
	
	useEffect(() => {
		if (drawerOpen) setIsOpen(true)
	}, [drawerOpen])
	
	const handleUpdateCategories = (type, idx) => () => {
		const toggleSelected = (category, i) => ({ ...category, selected: i === idx ? !category.selected : false })
		const newCategories = type === 'parent' ? parentCategories.map(toggleSelected) : childCategories.map(toggleSelected)
		if (type === 'parent') {
			setParentCategories(newCategories)
		} else {
			setChildCategories(newCategories)
		}
	}
	
	const sortAndMapToOption = toOption => (accum, curVal, idx) => {
		if (curVal.selected) {
			accum.unshift(toOption(curVal, idx))
		} else {
			accum.push(toOption(curVal, idx))
		}
		return accum
	}
	
	const toChildCategory = ({childCategoryName, childCategoryDisplayName, childCategoryCount}, idx) => (
		<DivOptionRow key={childCategoryName}>
			<DivRow>
				<Acategory
					value={childCategoryName}
					onClick={handleUpdateCategories('child', idx)}
				>
					{childCategoryDisplayName}
				</Acategory>
				{selectedChildIdx === idx && !isSearching && (
					<span onClick={handleUpdateCategories('child', selectedChildIdx)}>
						<FontAwesomeIcon icon={faMinusSquare} color="#961427"/>
					</span>
				)}
			</DivRow>
			
			<PCount>({childCategoryCount})</PCount>
		</DivOptionRow>
	)
	
	const ChildCategories = () => <div>{(childCategories || []).reduce(sortAndMapToOption(toChildCategory), [])}</div>
	
	const toParentCategory = ({parentCategoryName, parentCategoryDisplayName, parentCategoryCount}, idx) => (
		<DivOption key={parentCategoryName}>
			<Row>
				<DivRow>
					<Acategory
						value={parentCategoryName}
						onClick={handleUpdateCategories('parent', idx)}
					>
						{parentCategoryDisplayName}
					</Acategory>
					{selectedParentIdx === idx && (
						<span onClick={handleUpdateCategories('parent', selectedParentIdx)}>
							<FontAwesomeIcon icon={faMinusSquare} color="#961427"/>
						</span>
					)}
				</DivRow>
				
				<PCount>({parentCategoryCount})</PCount>
			</Row>
			
			{selectedParentIdx === idx && !isSearching && <ChildCategories/>}
			{selectedParentIdx === idx && isSearching && <Loader/>}
		</DivOption>
	)
	
	const ParentCategories = () => <>{(parentCategories || []).reduce(sortAndMapToOption(toParentCategory), [])}</>

	return (
		<div>
			<DivTitle onClick={() => setIsOpen(!isOpen)}>
				<CategoryIcon/>
				<P>Categories</P>
				<FontAwesomeIcon icon={isOpen ? "caret-up" : "caret-down"} color="white"/>
			</DivTitle>
			
			<CategoriesDiv className={clsx({
				[classes.expand]: drawerOpen || isOpen,
				[classes.collapse]: !isOpen || !drawerOpen
			})}>
				<ParentCategories/>
			</CategoriesDiv>
		</div>
	)
}