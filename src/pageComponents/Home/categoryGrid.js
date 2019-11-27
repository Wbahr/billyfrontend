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

export default function CategoryGrid({history}) {
  return(
    <DivContainer>
      <CategoryImage
        text='Aluminum Structural Framing'
        src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
        history={history}
      />
      <CategoryImage
        text='Automation & Control Products'
        src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
        history={history}
      />
      <CategoryImage
        text='Electrical Components'
        src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
        history={history}
      />
      <CategoryImage
        text='Hose & Connectors'
        src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
        history={history}
      />
      <CategoryImage
        text='Hydraulic Components'
        src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
        history={history}
      />
      <CategoryImage
        text='Liquid & Gas Pressure Products'
        src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
        history={history}
      />
      <CategoryImage
        text='Lubrication'
        src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
        history={history}
      />
      <CategoryImage
        text='Machine Safety Products'
        src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
        history={history}
      />
      <CategoryImage
        text='Pneumatic Components'
        src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
        history={history}
      />
      <CategoryImage
        text='Process Control & Components'
        src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
        history={history}
      />
      <CategoryImage
        text='Winches & Gear Drives'
        src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
        history={history}
      />
      <CategoryImage
        text='Product Spotlights'
        src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
        history={history}
      />
    </DivContainer>
  )
}