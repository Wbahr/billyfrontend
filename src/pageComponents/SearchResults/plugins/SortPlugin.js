import React from 'react'
import styled from "styled-components";

const DivResultsSearch = styled.div`
  display: flex;
  margin-bottom: 10px;
  margin-right: 8px;
`

export default function SortPlugin({sortType, setSortType}) {
	const handleSetSortType = e => setSortType(e.target.value)
	
	return (
		<DivResultsSearch>
			<select value={sortType} onChange={handleSetSortType}>
				<option value={'relevancy'}>Sort by Relevance</option>
				<option value={'availability'}>Sort by Availability</option>
				<option value={'popularity'}>Sort by Popularity</option>
			</select>
		</DivResultsSearch>
	)
}