import React, { useState } from 'react'
import styled from 'styled-components'
import SearchTermChip from '../uiComponents/SearchTermChip'

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
  width: 120px;
  height: 30px;
  background-color: rgb(219, 22, 51);
  color: white;
  font-weight: 500;
  border: 0;
  border-radius: 0 3px 3px 0;
  box-shadow: inset 0px 2px 3px #7f0c1d;
  font-size: 14px;
  line-height: 27px;
`

const SearchChipDiv = styled.div`
	display: flex;
 	margin: 5px 0px;
`
const ClearButton = styled.button`
    color: #db1633;
    font-weight: bold;
    background-color: white;
    border: 1px solid #db1633;
    font-size: 14px;
    margin: 0 5px;
`

export default function SearchTermsPlugin({ searchTerms, setSearchTerms, clearFilter }) {
    const [searchTerm, setSearchTerm] = useState('')
    const innerSearchTermsArray = searchTerms ? searchTerms.split(',') : []
	
    const handleUpdateSearchTerm = () => {
        if (searchTerm?.trim()?.length) {
            setSearchTerms([...innerSearchTermsArray, ...searchTerm.split(' ')])
            setSearchTerm('')
        }
    }
	
    const handleRemoveSearchTerm = (idx) => () => {
        const innerSearchTermsCopy = innerSearchTermsArray.slice()
        innerSearchTermsCopy.splice(idx, 1)
        setSearchTerms(innerSearchTermsCopy)
    }
	
    const handleSetSearchTerm = e => setSearchTerm(e.target.value)
	
    const handleKeyPress = e => {
        if (e.key === 'Enter') handleUpdateSearchTerm()
    }
    const handleClearButton = () => {
        clearFilter ()
    }
    return (
        <Div>
            <SearchChipDiv>
                {innerSearchTermsArray.map((term, idx) => (
                    <SearchTermChip key={idx} label={term} onClose={handleRemoveSearchTerm(idx)}/>
                ))}
            </SearchChipDiv>
			
            <DivResultsSearch>
                <InputSearch
                    placeholder="Add keywords to refine results"
                    onChange={handleSetSearchTerm}
                    onKeyDown={handleKeyPress}
                    value={searchTerm}
                />
                <ButtonSearch onClick={handleUpdateSearchTerm}>Refine Search</ButtonSearch>
                <ClearButton type='button' onClick={handleClearButton}>Clear All Filters</ClearButton>
            </DivResultsSearch>
        </Div>
    )
}