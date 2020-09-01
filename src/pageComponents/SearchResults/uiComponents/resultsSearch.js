import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Div = styled.div`
  display: flex;
  flex-direction: column;
`

const DivResultsSearch = styled.div`
  display: flex;
  margin-bottom: 10px;
  margin-right: 8px;
`

const InputSearch = styled.input`
  width: 300px;
  height: 30px;
  font-size: 14px;
  border-color: #dadada;
  border-top: 1px #dadada solid;
  border-left: 1px #dadada solid;
  border-bottom: 1px #e7e7e7 solid;
  border-right: 0px;
  padding: 0 4px;
  box-shadow: inset 0px 2px 3px #c1c1c1;
  border-radius: 3px 0 0 3px;
`

const ButtonSearch = styled.button`
  width: 70px;
  height: 30px;
  background-color: rgb(219, 22, 51);
  color: white;
  font-weight: 500;
  border: 0;
  border-radius: 0 3px 3px 0;
  box-shadow: inset 0px 2px 3px #7f0c1d;
  font-size: 14px;
`

export default function ResultsSearch({addSearchTerm, setSortType, sortType}) {
	const [searchTerm, setSearchTerm] = useState('')

	function handleUpdateSearchTerm() {
		addSearchTerm(searchTerm)
		setSearchTerm('')
	}

	const handleSetSearchTerm = e => setSearchTerm(e.target.value)
	
	const handleSetSortType = e => setSortType(e.target.value)
	
	const handleKeyPress = e => {
		if (e.key === 'Enter') handleUpdateSearchTerm()
	}
	
	return(
		<Div>
			<DivResultsSearch>
				<InputSearch placeholder="Add keywords to refine these results" onChange={handleSetSearchTerm} onKeyDown={handleKeyPress} value={searchTerm}/>
				<ButtonSearch onClick={handleUpdateSearchTerm}>Search</ButtonSearch>
			</DivResultsSearch>
			
			<DivResultsSearch>
				<select value={sortType} onChange={handleSetSortType}>
					<option value={'relevancy'}>Sort by Relevance</option>
					<option value={'availability'}>Sort by Availability</option>
					<option value={'popularity'}>Sort by Popularity</option>
				</select>
			</DivResultsSearch>
		</Div>
	)
}