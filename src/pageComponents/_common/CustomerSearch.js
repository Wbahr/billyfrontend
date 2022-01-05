import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import Context from 'setup/context'
import DebounceInput from 'react-debounce-input'
import { useLazyQuery } from '@apollo/client'
import { IMPERSONATION_SEARCH } from 'setup/providerGQL'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const FlexContainer = styled.div`
    display: flex;
`

const Results = styled.div`
    width: 100%;
    max-height: 500px;
    position: absolute;
    z-index: 99;
    z-index: 99;
    padding: 8px;
    border-radius: 2px;
    box-shadow: 1px 1px 5px grey;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    background-color: white;
    div {
        cursor: pointer;
        margin: 8px 0;
        &:hover {
        color: #007bff;
        }
    }
`

const ResultsContainer = styled.div`
    position: relative;
`

const Selected = styled.div`
    font-size: 14px;
    padding-top: 2px;
`

const Label = styled.label`
    padding-top: 2px;
    margin-right: 5px;
    font-size: 14px;
`

const Margin = styled.span`
    display: inline-block;
    margin-top: ${ props => props.top };
    margin-left: ${ props => props.left };
`

export default function CustomerSearch(props) {
    const { 
        customer, 
        setCustomer,
        label
    } = props

    const effectiveCustomer = customer || {}

    const [searchTerm, setSearchTerm] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const context = useContext(Context)

    const [impersonationSearch] = useLazyQuery(IMPERSONATION_SEARCH, {
        onCompleted: data => {
            setSearchResult(data.getImpersonationCustomerList)
        }
    })

    function handleEnterPress() {
        if (searchResult.length === 1) {
            setCustomer(searchResult[0])
        }
    }

    function handleBlur() {
        setTimeout(() => {
            setSearchResult([])
            setSearchTerm('')
        }, 200)
    }
    
    useEffect(() => {
        if (searchTerm.length > 0 && context.userInfo?.isAirlineEmployee) {
            impersonationSearch({ variables: { searchString: searchTerm } })
        } else {
            setSearchResult([])
        }
    }, [searchTerm])

    const results = searchResult.map(result => (
        <div key={result.id} onClick={() => { 
            setCustomer(result)
        }}
        >
            {result.name} - {result.customerIdP21}
        </div>
    ))

    function clearCustomer() {
        setCustomer(null)
    }

    const searchResults = (
        <ResultsContainer>
            <Results>
                {results}
            </Results>
        </ResultsContainer>
    )

    const handleKeyDown = (e) => e.key === 'Enter' && handleEnterPress()

    return (
        <FlexContainer>
            {
                label && <Label>{label}:</Label>
            }
            {
                effectiveCustomer.id ?
                    (
                        <Selected>
                            {effectiveCustomer.name} - {effectiveCustomer.customerIdP21}
                            <Margin left='3px'><FontAwesomeIcon onClick={clearCustomer} icon="times-circle" color="black" style={{ cursor: 'pointer' }} /></Margin>
                        </Selected>
                    )
                    :
                    (
                        <div>
                            <DebounceInput
                                placeholder='Search by Customer Name or #'
                                minLength={0}
                                debounceTimeout={750}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                value={searchTerm}
                                style={{ width: '300px' }}
                                onKeyDown={handleKeyDown}
                                onBlur={handleBlur}
                            />
                            {searchResult.length > 0 && searchResults}
                        </div>
                    )
            }
        </FlexContainer>
    )
}