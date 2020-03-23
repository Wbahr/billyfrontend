import React, {useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { StyledText0 } from '../../styles/fonts'
import FoodBeverage from './technologyTypePages/foodBeveragePage'


// import _ from 'lodash'

const Div = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding 0;
  background-color: grey;
`


export default function TechnologyPage({history}) {
  const [pageComponent, setPageComponent] = useState()
  let { page } = useParams()

  const technologyTypePages = [
    {
      'label': 'FoodBeverage',
      'page': 'food-beverage'
    },
    {
      'label': 'Adaptall',
      'page': 'adaptall'
    },
    {
      'label': 'Adsens',
      'page': 'adsens'
    }
  ]
  useEffect(() => {
    if(page === 'food-beverage'){
      setPageComponent(<FoodBeverage/>)
    } 
    
  }, [page])
      
  return(
    <> 
        {pageComponent}      
  

    </>
  )
}

TechnologyPage.propTypes = {
  history: PropTypes.object.isRequired
}