import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Context from '../../config/context'
import DebounceInput from 'react-debounce-input'
import { useQuery, useLazyQuery } from '@apollo/client'
import gql from 'graphql-tag'

const Container = styled.div`
  display: flex;
`

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  width: 40px;
  padding-right: 2px;
  border-radius: 0 30px 30px 0;
  // background-color: #007bff;;
  background-image: linear-gradient(to top left, #950f23, #DB1633);
`

const DivResults = styled.div`
  max-height: 500px;
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: white;
  top: 35px;
  z-index: 99;
  padding: 8px;
  border-radius: 2px;
  box-shadow: 1px 1px 5px grey;
  overflow: scroll;
  div {
    cursor: pointer;
    margin: 8px 0;
    &:hover {
      color: #007bff;
    }
  }
`

const DebounceInputStyle = {
	'width': '225px',
	'height': '25px',
	'border': 'none',
	'backgroundColor': 'white',
	'fontSize': '11px',
	'marginLeft': '20px',
	'padding': '4px 16px',
	'borderRadius': '30px 0 0 30px'
}

const IMPERSONATION_SEARCH = gql`
  query GetImpersonationCustomerList($searchString: String){
    getImpersonationCustomerList(searchString: $searchString){
      customerIdP21
      name
      id
    }
  }
`

export default function ImpersonationSearchComponent(props) {
	const [impersonationTerm, setImpersonationTerm] = useState('')
	const [searchResult, setSearchResult] = useState([])
	const context = useContext(Context)

	const [impersonationSearch, { loading, error, data }] = useLazyQuery(IMPERSONATION_SEARCH, {
		onCompleted: data => {
			setSearchResult(data.getImpersonationCustomerList)
		}
	})

	function handleEnterPress() {
		// If only 1 result and you press Enter, Impersonate that user
		if (searchResult.length === 1) {
			context.startImpersonation(searchResult[0].id)
		}
	}

	function handleBlur() {
		setTimeout(() => {setSearchResult([]), setImpersonationTerm('')}, 200)
	}

	useEffect(() => {
		if (impersonationTerm.length > 0) {
			impersonationSearch({variables: {'searchString': impersonationTerm}})
		} else {
			setSearchResult([])
		}
	},[impersonationTerm])

	let results = searchResult.map(result => {
		return(
			<div key={result.id} onClick={()=>{context.startImpersonation(result.id)}}>{`${result.name} - ${result.customerIdP21}`}</div>
		)
	})
  
	let searchResults = (
		<DivResults>
			{results}
		</DivResults>
	)

	return(
		<Container>
			<DebounceInput
				placeholder='Search by Customer Name or #'
				minLength={0}
				debounceTimeout={300}
				onChange={(e) => setImpersonationTerm(e.target.value)} 
				style={DebounceInputStyle}
				value={impersonationTerm}
				onKeyDown={(e)=>{e.key === 'Enter' ? handleEnterPress() : null}}
				onBlur={()=>{handleBlur()}}
			/>
			<Div onClick={()=>context.startImpersonation(impersonationTerm)}>
				<FontAwesomeIcon icon="user-circle" color="whitesmoke"/>
			</Div>
			{searchResult.length > 0 && searchResults}
		</Container>
	)
}