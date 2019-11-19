import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { Transition } from "react-transition-group"

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

const DisabledLabel = styled(Label)`
  color: whitesmoke;
`

const InputSearch = styled.input`
  margin: 4px 16px;
  width: 240px;
`

const defaultStyle = {
  transition: `opacity 300ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 1 },
  entered:  { opacity: 1 },
  exiting:  { opacity: 0 },
  exited:  { opacity: 0 },
};

export default function AttributeFilter({name: attributeCategoryName, displayName, options, open, attributeFeatureToggleStates, updatedFeatureToggleEvent, filteredAttributeCategories}) {
  const [isOpen, setIsOpen] = useState(open)
  const [filter, setFilter] = useState('')
  const [attribute, setAttribute] = useState(null)
  const [filteredAttributeValues, setFilteredAttributeValues] = useState([])
  const [] = useState(false)

  useEffect(() => {
    let inputAttribute = attributeFeatureToggleStates.find(attr => attr.field === attributeCategoryName)
    filteredAttributeCategories.map(filterAttrObj => {
      if(filterAttrObj.categoryName === attributeCategoryName) {
        let newAttributeFeatureNames = [] 
        filterAttrObj.features.map(feature => {
          newAttributeFeatureNames.push(feature.featureName)
        })
        setFilteredAttributeValues(newAttributeFeatureNames)
      } else {
        setFilteredAttributeValues([])
      }
    })

    setAttribute({
      field: attributeCategoryName,
      values: inputAttribute ? [...inputAttribute.values] : []
    })

  }, [attributeFeatureToggleStates])

  const handleFeatureToggle = (e, option) => {
    var newAttribute = {
      ...attribute
    };
    
    //Add or remove the feature from the field category, depending on the checked status.
    if(e.target.checked){
      newAttribute.values = [...new Set([...newAttribute.values, option.featureName])]
    } else {
      newAttribute.values = newAttribute.values.filter(val => val !== option.featureName)
    }

    //Create a new array with all the attribute category filter selections.
    //Temporarily remove this attribute category
    var newToggleStates = [
      ...attributeFeatureToggleStates.filter(f => f.field !== newAttribute.field)
    ]

    //Re-add the new category attribute values if any features of the category are
    //selected for filtering
    if(newAttribute.values.length !== 0){
      newToggleStates = [
        ...newToggleStates,
        newAttribute
      ]
    }

    updatedFeatureToggleEvent(newToggleStates)
  }

  let AttributeOptions = options.map((option, index) => {
    let disable = filteredAttributeValues.includes(option)

    if(option.featureName.toLowerCase() !== 'null' && _.startsWith(option.featureNameDisplay, filter)){
      return (
        <DivOptionRow key={index}>
          <input type="checkbox" 
            checked={attribute && attribute.values.indexOf(option.featureName) > -1}
            onChange={(e) => handleFeatureToggle(e, option)}
            disabled={disable}
          />
          {disable ?
            <DisabledLabel htmlFor={option.featureName}>{option.featureNameDisplay}</DisabledLabel>
          :
            <Label htmlFor={option.featureName}>{option.featureNameDisplay}</Label>
          }
        </DivOptionRow>
      )
    }
  })

  return(
    <>
      <DivTitle onClick={()=>(setIsOpen(!isOpen))}>
        <P>{displayName}</P>
        {isOpen ?  <FontAwesomeIcon icon="caret-up" color="black"/> : <FontAwesomeIcon icon="caret-down" color="black"/>}
      </DivTitle>
      {isOpen && 
        <>
          <div>
            {options.length > 10 && <InputSearch placeholder={`Search ${displayName}`} onChange={(e)=>{setFilter(e.target.value)}} value={filter}></InputSearch>}
          </div>
          <DivOptions>
            {AttributeOptions}
          </DivOptions>
        </>
      }
    </>
  )
}

AttributeFilter.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array,
  open: PropTypes.bool,
  toggleAttribute: PropTypes.func
}
