import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AccountTree as AttributeIcon } from '@material-ui/icons'
import clsx from 'clsx'
import AttributeTypeFilter from './attributeTypeFilter'

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
	overflow: hidden;
`

const P = styled.p`
	margin: 0;
`

const AttributesDiv = styled.div`
	margin-left: 48px;
`

export default function AttributesPlugin({ attributes, setAttributes, classes, drawerOpen, setDrawerOpen }) {
    const [isOpen, setIsOpen] = useState(true)
	
    const toggleOpen = () => {
        if (!drawerOpen) setDrawerOpen(true)
        setIsOpen(!isOpen)
    }
	
    const handleUpdateAttributes = index => newAttr => {
        const newAttributes = attributes.slice()
        newAttributes[index] = newAttr
        setAttributes(newAttributes)
    }
	
    const attributeFilters = useMemo(() => attributes.map((attribute, index) => (
        <AttributeTypeFilter
            key={index}
            attribute={attribute}
            updateAttribute={handleUpdateAttributes(index)}
        />
    )), [attributes])
	
    return (
        <div>
            <DivTitle onClick={toggleOpen}>
                <AttributeIcon/>
                <P>Attributes</P>
                <FontAwesomeIcon icon={isOpen ? 'caret-up' : 'caret-down'} color="white"/>
            </DivTitle>
			
            <AttributesDiv className={clsx({
                [classes.expand]: drawerOpen || isOpen,
                [classes.collapse]: !isOpen || !drawerOpen
            })}
            >
                {attributeFilters}
            </AttributesDiv>
        </div>
    )
}
