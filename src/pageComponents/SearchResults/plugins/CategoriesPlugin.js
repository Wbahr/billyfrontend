import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusSquare } from '@fortawesome/free-regular-svg-icons'
import Loader from '../../_common/loader'
import { Category as CategoryIcon } from '@mui/icons-material'
import clsx from 'clsx'

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

export default function CategoriesPlugin({ isSearching, classes, drawerOpen, category, childCategories, setCategoryId }) {
    const [isOpen, setIsOpen] = useState(true)
	
    useEffect(() => {
        if (drawerOpen) setIsOpen(true)
    }, [drawerOpen])
	
    const toChildCategory = ({ categoryId, categoryName, categoryDisplayName, categoryCount }) => (
        <DivOptionRow key={categoryId}>
            <DivRow>
                <Acategory
                    value={categoryName}
                    onClick={() => setCategoryId(categoryId)}
                >
                    {categoryDisplayName}
                </Acategory>
            </DivRow>
        </DivOptionRow>
    )

    const SelectedCategory = () => (
        category
            ? (
                <DivOptionRow>
                    <DivRow>
                        <Acategory
                            value={category.categoryName}
                            onClick={() => setCategoryId(null)}
                        >
                            <span>{category.categoryDisplayName}</span>
                        </Acategory>

                        <FontAwesomeIcon icon="times" color="#535353" onClick={() => setCategoryId(null)} />
                    </DivRow>
                </DivOptionRow>
            )
            : <></>
    )
	
    const ChildCategories = () => <div>{(childCategories || []).map(toChildCategory)}</div>
	
    return (
        <div>
            <DivTitle onClick={() => setIsOpen(!isOpen)}>
                <CategoryIcon/>
                <P>Categories</P>
                <FontAwesomeIcon icon={isOpen ? 'caret-up' : 'caret-down'} color="white"/>
            </DivTitle>
			
            <CategoriesDiv className={clsx({
                [classes.expand]: drawerOpen || isOpen,
                [classes.collapse]: !isOpen || !drawerOpen
            })}
            >
                { !isSearching && (
                    <>
                        <SelectedCategory />
                        <ChildCategories/>
                    </>
                ) }
                { isSearching && <Loader/> }
            </CategoriesDiv>
        </div>
    )
}