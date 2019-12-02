import React, { useState } from 'react'
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

const DivOptionRow = styled.div`
  display: flex; 
  align-items: center;
  margin: 8px 0 0 24px;
`

const P = styled.p`
  margin: 0;
`

const Acategory = styled.p`
  cursor: pointer;
  margin: 0;
  color: #535353;
  font-size: 12px;
  :hover{
    color: #0056b3;
  }
`

const Label = styled.label`
  margin-bottom: 0;
  margin-left: 4px;
`

export default function CategoryFilter({parentCategories, childCategories, updatedCategoriesFilter}) {
  const [isOpen, setIsOpen] = useState(false)
  let categorieslevel
  let categories
  if (_.isNil(childCategories)){
    categorieslevel = 'parent'
    categories = parentCategories
  } else {
    categorieslevel = 'child'
    categories = childCategories
  }
  let FilterName = 'Categories'
  let CategoryOptions = _.map(categories, option => {
    if(_.isNil(childCategories)){
      return (
        <DivOptionRow>
          <Acategory value={option.parentCategoryName} onClick={(e)=>updatedCategoriesFilter(categorieslevel, e.target.innerText)}>{option.parentCategoryDisplayName}</Acategory>
        </DivOptionRow>
      )
    } else {
      return (
        <DivOptionRow>
          <Acategory value={option.childCategoryName} onClick={(e)=>updatedCategoriesFilter(categorieslevel, e.target.innerText)}>{option.childCategoryDisplayName}</Acategory>
        </DivOptionRow>
      )
    }
  })

  return(
    <>
      <DivTitle onClick={()=>(setIsOpen(!isOpen))}>
        <P>{FilterName}</P>
        {isOpen ?  <FontAwesomeIcon icon="caret-up" color="black"/> : <FontAwesomeIcon icon="caret-down" color="black"/>}
      </DivTitle>
      {isOpen && CategoryOptions}
    </>
  )
}