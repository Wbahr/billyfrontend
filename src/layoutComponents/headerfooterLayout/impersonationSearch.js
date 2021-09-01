import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons'
import Context from '../../setup/context'
import DebounceInput from 'react-debounce-input'
import { useLazyQuery } from '@apollo/client'
import { GET_ALL_USER_CARTS, IMPERSONATION_SEARCH } from 'setup/providerGQL'
import { CartsDropdownMenu, DropDownMenuAction } from 'pageComponents/_common/dropdown-menu/DropdownMenu'
import Loader from 'pageComponents/_common/loader'

const Container = styled.div`
  display: flex;
  margin: 0 10px;
`

const Div = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 25px;
    width: 40px;
    padding-right: 2px;
    background-image: linear-gradient(to top left, #950f23, #DB1633);
`

const DivLast = styled(Div)`
  border-radius: 0 30px 30px 0;
  cursor: pointer;
`

const DivResults = styled.div`
  max-height: 500px;
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: white;
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

const DivResultsContainer = styled.div`
  position: relative;
`

const DebounceInputStyle = {
    width: '225px',
    height: '25px',
    border: 'none',
    backgroundColor: 'white',
    fontSize: '11px',
    padding: '4px 16px',
    borderRadius: '30px 0 0 30px'
}

export default function ImpersonationSearchComponent() {
    const [impersonationTerm, setImpersonationTerm] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [showOtherCartsDropdown, setShowOtherCartsDropdown] = useState(false)
    const [userCartsData, setUserCartsData] = useState(null)
    const context = useContext(Context)

    const [impersonationSearch] = useLazyQuery(IMPERSONATION_SEARCH, {
        fetchPolicy: 'no-cache',
        onCompleted: data => {
            setSearchResult(data.getImpersonationCustomerList)
        }
    })
    
    const [usersCarts, { loading: userCartsDataLoading }] = useLazyQuery(GET_ALL_USER_CARTS, {
        fetchPolicy: 'no-cache',
        onCompleted: data => {
            setUserCartsData(data.employeeCarts)
        }
    })

    function handleEnterPress() {
    // If only 1 result and you press Enter, Impersonate that user
        if (searchResult.length === 1) {
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
        <div key={result.id} onClick={() => context.startImpersonation(result.id)}>{result.name} - {result.customerIdP21}</div>
    ))
  
    const searchResults = (
        <DivResults>
            {results}
        </DivResults>
    )

    const handleKeyDown = (e) => e.key === 'Enter' && handleEnterPress()
    
    return (
        <Container>
            <div>
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
                {searchResult.length > 0 && <DivResultsContainer>{searchResults}</DivResultsContainer>}
            </div>
            <Div onClick={() => context.startImpersonation(impersonationTerm)}>
                <FontAwesomeIcon icon="user-circle" color="whitesmoke"/>
            </Div>
            <DivLast
                tabIndex={1}
                onClick={() => {
                    usersCarts()
                    setShowOtherCartsDropdown(true)}
                }
                onBlur={() => { setShowOtherCartsDropdown(false)}}
            >
                <FontAwesomeIcon icon={faCartArrowDown} color="whitesmoke"/>
                <CartsDropdownMenu className={showOtherCartsDropdown ? 'visible' : ''}>
                    {userCartsData && userCartsData.map((itm, idx) =>  
                        (
                            <DropDownMenuAction key={idx} linkText={itm.customerName + ' - ' + itm.shoppingCartItemCount} 
                                onClick={() => {
                                    context.startImpersonation(itm.customerId) 
                                    setShowOtherCartsDropdown(false)
                                }}
                            />
                        )
                    )}
                    {userCartsDataLoading && <Loader />}
                </CartsDropdownMenu>
            </DivLast>
        </Container>
    )
}