import React from 'react'
import styled from 'styled-components'

const DivContainer = styled.div`
  display: flex;
  height: 100%;
  max-width: 1400px;
  margin: 12px auto 0 auto;
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
      <DivContainer>
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
      </DivContainer>      
    </>
	)
}