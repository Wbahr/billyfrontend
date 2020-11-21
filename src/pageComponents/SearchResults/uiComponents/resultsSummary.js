import React from 'react'
import styled from 'styled-components'

const DivResultsSummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Div = styled.div`
  display: flex;
`

const Pgrey = styled.p`
  font-size: 20px;
  color: black;
  margin: 0;
  font-weight: 700;
`

const Red = styled.span`
  color: rgb(219, 22, 51);
  padding: 0 4px;
`

export default ({searchTerm, totalResults, isSearching}) => (
	<DivResultsSummaryContainer>
		<Div>
			{
				isSearching ? (
					<Pgrey>Searching for: <Red>{searchTerm}</Red></Pgrey>
				) : (
					<Pgrey>{totalResults >= 10000 ?  '10,000+' : totalResults} results returned for: <Red>{searchTerm}</Red></Pgrey>
				)
			}
		</Div>
	</DivResultsSummaryContainer>
)