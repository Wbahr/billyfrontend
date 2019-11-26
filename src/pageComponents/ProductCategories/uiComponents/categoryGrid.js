import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import CategoryImage from './categoryImage'
import gql from 'graphql-tag'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import Loader from 'pageComponents/_common/loader'

const DivContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 800px;
`

const DivRow = styled.div`
  display: flex;
  width: 100%;
`

const GET_CATEGORY_CHILDREN_SEARCH = gql`
  query CategoryChildrenByParentId($parentId: ID){
    getCategory(categoryUid: $parentId) {
      name
      children {
        name
        uid
      }
    }
  }
`

export default function CategoryGrid({history}) {
  const [childGrid, setChildGrid] = useState([]);
  const [selectedParent, setSeletedParent] = useState('')
  const loadingChildren = useRef(false);
  const [getChildGridQuery, { loading, error, data }] = useLazyQuery(GET_CATEGORY_CHILDREN_SEARCH, {
    onCompleted: data => {
      var getCategory = data.getCategory
      setChildGrid(getCategory.children)
      setSeletedParent(getCategory.name)
      loadingChildren.current = false
    }
  })

  function getChildGrid(parentId){
    loadingChildren.current = true
    getChildGridQuery({ variables: { parentId: parentId }})
  }

  let GridItems
  if(childGrid.length === 0 && !loadingChildren.current){
    GridItems = (
      <>
        <CategoryImage
          text='Aluminum Structural Framing'
          src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
          history={history}
          getChildGrid={()=>{getChildGrid(1)}}
        />
        <CategoryImage
          text='Automation & Control Products'
          src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
          history={history}
          getChildGrid={()=>{getChildGrid(2)}}
        />
        <CategoryImage
          text='Electrical Components'
          src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
          history={history}
          getChildGrid={()=>{getChildGrid(3)}}
        />
        <CategoryImage
          text='Hose & Connectors'
          src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
          history={history}
          getChildGrid={()=>{getChildGrid(4)}}
        />
        <CategoryImage
          text='Hydraulic Components'
          src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
          history={history}
          getChildGrid={()=>{getChildGrid(5)}}
        />
        <CategoryImage
          text='Liquid & Gas Pressure Products'
          src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
          history={history}
          getChildGrid={()=>{getChildGrid(6)}}
        />
        <CategoryImage
          text='Lubrication'
          src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
          history={history}
          getChildGrid={()=>{getChildGrid(7)}}
        />
        <CategoryImage
          text='Machine Safety Products'
          src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
          history={history}
          getChildGrid={()=>{getChildGrid(8)}}
        />
        <CategoryImage
          text='Pneumatic Components'
          src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
          history={history}
          getChildGrid={()=>{getChildGrid(9)}}
        />
        <CategoryImage
          text='Process Control & Components'
          src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
          history={history}
          getChildGrid={()=>{getChildGrid(10)}}
        />
        <CategoryImage
          text='Winches & Gear Drives'
          src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
          history={history}
          getChildGrid={()=>{getChildGrid(11)}}
        />
        <CategoryImage
          text='Product Spotlights'
          src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
          history={history}
          getChildGrid={()=>{getChildGrid(12)}}
        />
      </>
    )
  } else if (childGrid.length === 0 && loadingChildren.current) {
    GridItems = <Loader />
  } else {
    GridItems = _.map(childGrid, (child) => {
      return(
        <CategoryImage
          text={child.name}
          src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
          history={history}
        />
      )
    })
  }
  return(
    <DivContainer>
      {childGrid.length > 0 && <DivRow><p onClick={()=>{setChildGrid([])}}>Back</p><p>{selectedParent}</p></DivRow>}
      {GridItems}
    </DivContainer>
  )
}