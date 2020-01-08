import React, { useState } from 'react'
import styled from 'styled-components'
import { H2 } from '../../_common/text'
import SectionHeader from '../../_common/sectionHeader.js'
import { Link, useHistory } from 'react-router-dom'
import CategoryGrid from './categoryGrid'

const Thing = styled.div`
  margin-top: -6px;
  width: 60px;
  height: 5px;
  background-color: #DB1633;
  margin-bottom: 20px;
`
const Div = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`

const DivRight = styled(Div)`
  justify-content: flex-start;

`

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center
  cursor: pointer;
  width: 200px;
  height: 60px;
  color: black;
  background-color: #f3f3f3;
  padding: 0 4px;
  margin: 0 10px;
  box-shadow: 1px 2px 2px rgba(0,0,0,.2);
`

const Suggestion = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center
  cursor: pointer;
  height: 45px;
  padding: 0px 8px;
  margin: 0 5px;
  border: 2px solid #dadada;
  color: #303030;
  &:hover {
    background-color: #328EFC;
    border: 2px solid #1E5597;
    color: white;
    transition: color 500ms;
    transition: border 500ms;
    transition: background-color 500ms;
  }
`

export default function ShopOurProducts(props) {

  function handleSearch(searchTerm) {
    props.history.push(`/search/?searchTerm=${encodeURIComponent(searchTerm)}&resultSize=10&resultPage=1&sortType=${encodeURIComponent('relevancy')}`)

  }

  return(
    <>
      <div>
        <SectionHeader
          text='Recommended For You'
        />
        <DivRight>
          <Suggestion onClick={()=>handleSearch('Solenoid Valve')} >
            Solenoid Valve
          </Suggestion>
          <Suggestion onClick={()=>handleSearch('SY Valve')}>
            SY Valve
          </Suggestion>
          <Suggestion onClick={()=>handleSearch('Manifold')}>
            Manifold
          </Suggestion>
          <Suggestion onClick={()=>handleSearch('Phoenix Terminal Block')}>
            Phoenix Terminal Block
          </Suggestion>
          <Suggestion onClick={()=>handleSearch('Valve')}>
            Valve
          </Suggestion>
        </DivRight>
      </div>
      <div>
        <div>
          <SectionHeader
            text='Categories'
          />
        </div>
        <Div>
          <CategoryGrid 
            history={props.history}
          />
        </Div>
      </div>
      
    </>
  )
}