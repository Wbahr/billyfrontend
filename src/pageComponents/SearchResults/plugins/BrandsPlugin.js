import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Store as BrandIcon } from '@mui/icons-material'
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
const DivOptions = styled.div`
	display: flex;
	flex-direction: column;
	padding-right: 4px;
	overflow-y: auto;
	overflow-x: hidden;
	max-height: 500px;
`

const DivOptionRow = styled.div`
	cursor: pointer;
	display: flex;
	align-items: center;
	margin: 4px 0;
`

const P = styled.p`
	margin: 0;
`

const Label = styled.label`
	cursor: pointer;
	margin: 0;
	color: #535353;
	font-size: 11px;
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
	margin: 4px 0px;
	width: 215px;
`

const BrandsDiv = styled.div`
	margin-left: 48px;
`

export default function BrandsPlugin({ brands, setBrands, drawerOpen, setDrawerOpen, classes }) {
    const [isOpen, setIsOpen] = useState(true)
    const [filter, setFilter] = useState('')
	
    useEffect(() => {
        if (drawerOpen) setIsOpen(true)
    }, [drawerOpen])
	
    const handleFeatureToggle = idx => () => {
        const newBrands = brands.slice()
        newBrands[idx].selected = !brands[idx].selected
        setBrands(newBrands)
    }
	
    const searchFilter = b => b.brandName !== 'null' && (!filter.length || b.brandName.toLowerCase().startsWith(filter))
	
    const hasSelectedBrand = brands.find(f => f.selected)
    const shouldShowFeatureCount = selected => selected || !hasSelectedBrand
	
    const toOption = ({ selected, brandName, brandNameDisplay, brandCount }, idx) => (
        <DivOptionRow key={idx} onClick={handleFeatureToggle(idx)}>
            <input
                type="checkbox"
                defaultChecked={selected}
                style={{ cursor: 'pointer' }}
            />
            <Label htmlFor={brandName}>{brandNameDisplay}</Label>
            {
                shouldShowFeatureCount(selected)
                    ? <PCount>({brandCount})</PCount>
                    : <FontAwesomeIcon icon="plus" color="#535353"/>
            }
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
            <DivTitle onClick={() => {
                if (!drawerOpen) setDrawerOpen(true)
                setIsOpen(!isOpen)
            }}
            >
                <BrandIcon/>
                <P>Brands</P>
                <FontAwesomeIcon icon={isOpen ? 'caret-up' : 'caret-down'} color="white"/>
            </DivTitle>
			
            <BrandsDiv className={clsx({
                [classes.expand]: drawerOpen || isOpen,
                [classes.collapse]: !isOpen || !drawerOpen
            })}
            >
                {brands.length > 10 && (
                    <InputSearch
                        placeholder="Search Brands"
                        onChange={handleSearchChange}
                        value={filter}
                    />
                )}
                <BrandOptions/>
            </BrandsDiv>
        </div>
    )
}