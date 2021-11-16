import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import Context from '../../../../setup/context'
import DebounceInput from 'react-debounce-input'
import { FormikStyleLabel } from '../../../../pageComponents/_common/formik/input_v2'
import { useLazyQuery } from '@apollo/client'
import { IMPERSONATION_SEARCH } from 'setup/providerGQL'

const Container = styled.div`
    display: flex;
`

const Close = styled.span`
    cursor: pointer;
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
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
    width: 400px;
    max-width: 100%;
    height: 40px;
    border: 1px solid #e1e1e1;
    border-radius: 1px;
    background-color: white;
    font-size: 16px;
    padding: 10px 8px;
    
`

const DebounceInputStyle = {
    width: '400px',
    maxWidth: '100%',
    height: '40px',
    border: '1px solid #e1e1e1',
    borderRadius: '1px',
    backgroundColor: 'white',
    fontSize: '16px',
    padding: '0px 8px',
}

export default function CustomerSearch(props) {
    const { customer, setCustomer } = props

    const [impersonationTerm, setImpersonationTerm] = useState('')
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
            context.startImpersonation(searchResult[0].id)
        }
    }

    function handleBlur() {
        setTimeout(() => {
            setSearchResult([])
            setImpersonationTerm('')
        }, 200)
    }
    
    useEffect(() => {
        if (impersonationTerm.length > 0 && context.userInfo?.isAirlineEmployee) {
            impersonationSearch({ variables: { searchString: impersonationTerm } })
        } else {
            setSearchResult([])
        }
    }, [impersonationTerm])

    const results = searchResult.map(result => (
        <div key={result.id} onClick={() => { 
            setCustomer(result) 
            context.startImpersonation(result.id) 
        }}
        >
            {result.name} - {result.customerIdP21}
        </div>
    ))

    function clearCustomer() {
        setCustomer({})
        context.cancelImpersonation()
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
        <Container>
            <FormikStyleLabel label='Customer'>
                {
                    customer.id ?
                        (
                            <Selected>
                                {customer.name} - {customer.customerIdP21} <Close onClick={clearCustomer}>X</Close>
                            </Selected>
                        )
                        :
                        (
                            <Column>
                                <DebounceInput
                                    placeholder='Search by Customer Name or #'
                                    minLength={0}
                                    debounceTimeout={300}
                                    onChange={(e) => setImpersonationTerm(e.target.value)}
                                    style={DebounceInputStyle}
                                    value={impersonationTerm}
                                    onKeyDown={handleKeyDown}
                                    onBlur={handleBlur}
                                />
                                {searchResult.length > 0 && searchResults}
                            </Column>
                        )
                }
            </FormikStyleLabel>
        </Container>
    )
}