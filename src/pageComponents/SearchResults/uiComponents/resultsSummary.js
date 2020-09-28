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

const Pblue = styled.p`
  font-size: 20px;
  color: rgb(219, 22, 51);
  padding: 0 4px;
  margin: 0;
  font-weight: 700;
`

export default ({searchTerm, totalResults, isSearching}) => (
	<DivResultsSummaryContainer>
		<Div>
			{
				isSearching ? (
					<>
						<Pgrey>Searching for:</Pgrey>
						<Pblue>{searchTerm}</Pblue>
					</>
				) : (
					<>
						<Pgrey>{totalResults >= 10000 ?  '10,000+' : totalResults} results returned for:</Pgrey>
						<Pblue>{searchTerm}</Pblue>
					</>
				)
			}
		</Div>
	</DivResultsSummaryContainer>
)