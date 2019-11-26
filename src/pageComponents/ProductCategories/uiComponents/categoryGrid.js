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

const GET_CATEGORY_CHILDREN_SEARCH = gql`
  query CategoryChildrenByParentId($parentId: ID){
    getCategory(categoryUid: $parentId) {
      children {
        name
        uid
      }
    }
  }
`

export default function CategoryGrid({history}) {
  const [childGrid, setChildGrid] = useState([]);
  const loadingChildren = useRef(false);
  const [getChildGridQuery, { loading, error, data }] = useLazyQuery(GET_CATEGORY_CHILDREN_SEARCH, {
    onCompleted: data => {
      var categoryChildren = data.getCategory.children
      setChildGrid(categoryChildren)
    }
  })

  function getChildGrid(parentId){
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
          getChildGrid={()=>{getChildGrid()}}
        />
        <CategoryImage
          text='Electrical Components'
          src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
          history={history}
          getChildGrid={()=>{getChildGrid()}}
        />
        <CategoryImage
          text='Hose & Connectors'
          src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
          history={history}
          getChildGrid={()=>{getChildGrid()}}
        />
        <CategoryImage
          text='Hydraulic Components'
          src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
          history={history}
          getChildGrid={()=>{getChildGrid()}}
        />
        <CategoryImage
          text='Liquid & Gas Pressure Products'
          src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
          history={history}
          getChildGrid={()=>{getChildGrid()}}
        />
        <CategoryImage
          text='Lubrication'
          src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
          history={history}
          getChildGrid={()=>{getChildGrid()}}
        />
        <CategoryImage
          text='Machine Safety Products'
          src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
          history={history}
          getChildGrid={()=>{getChildGrid()}}
        />
        <CategoryImage
          text='Pneumatic Components'
          src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
          history={history}
          getChildGrid={()=>{getChildGrid()}}
        />
        <CategoryImage
          text='Process Control & Components'
          src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
          history={history}
          getChildGrid={()=>{getChildGrid()}}
        />
        <CategoryImage
          text='Winches & Gear Drives'
          src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
          history={history}
          getChildGrid={()=>{getChildGrid()}}
        />
        <CategoryImage
          text='Product Spotlights'
          src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
          history={history}
          getChildGrid={()=>{getChildGrid()}}
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
      {GridItems}
    </DivContainer>
  )
}