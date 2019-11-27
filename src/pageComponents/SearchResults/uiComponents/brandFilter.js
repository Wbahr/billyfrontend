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

export default function BrandFilter({brands, updatedBrandFilter}) {
  const [isOpen, setIsOpen] = useState(false)
  const [filter, setFilter] = useState('')
  const [allBrands, setBrands] = useState(brands)
  const [brandFilterValues, setBrandFilterValues] = useState([])

  const handleFeatureToggle = (e, brand) => {
    let newBrandFilterValues
    if(e.target.checked){
      newBrandFilterValues = [...brandFilterValues, brand]
      setBrandFilterValues(newBrandFilterValues)
    } else {
      newBrandFilterValues = _.pull(brandFilterValues, brand)
      newBrandFilterValues = _.without(brandFilterValues, brand)
      setBrandFilterValues(newBrandFilterValues)
    }
    updatedBrandFilter(newBrandFilterValues)
  }

  let BrandOptions = allBrands.map((brand, index) => {
    let disable = false

    if(brand.brandName.toLowerCase() !== 'null' && _.startsWith(brand.brandName.toLowerCase(), filter)){
      return (
        <DivOptionRow key={index}>
          <input type="checkbox" 
            onChange={(e) => handleFeatureToggle(e, brand.brandName)}
            disabled={disable}
          />
          {disable ?
            <DisabledLabel htmlFor={brand.brandName}>{brand.brandNameDisplay}</DisabledLabel>
          :
            <Label htmlFor={brand.brandName}>{brand.brandNameDisplay}</Label>
          }
        </DivOptionRow>
      )
    }
  })

  return(
    <>
      <DivTitle onClick={()=>(setIsOpen(!isOpen))}>
        <P>Brands</P>
        {isOpen ?  <FontAwesomeIcon icon="caret-up" color="black"/> : <FontAwesomeIcon icon="caret-down" color="black"/>}
      </DivTitle>
      {isOpen && 
        <>
          <div>
            {brands.length > 10 && <InputSearch placeholder={`Search Brands`} onChange={(e)=>{setFilter(e.target.value.toLowerCase())}} value={filter}></InputSearch>}
          </div>
          <DivOptions>
            {BrandOptions}
          </DivOptions>
        </>
      }
    </>
  )
}

BrandFilter.propTypes = {
  brands: PropTypes.array.isRequired,
  open: PropTypes.bool,
  toggleAttribute: PropTypes.func
}